"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Wallet,
  Shield,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface Web3VerificationProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
  onSign: () => void;
  verificationStatus: "idle" | "connecting" | "signing" | "verified" | "error";
}

export default function Web3Verification({
  isConnected,
  address,
  onConnect,
  onSign,
  verificationStatus,
}: Web3VerificationProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case "connecting":
        return {
          color: "text-blue-400",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30",
          message: "Connecting to wallet...",
        };
      case "signing":
        return {
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/30",
          message: "Please sign the transaction in your wallet",
        };
      case "verified":
        return {
          color: "text-green-400",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30",
          message: "Verified Organizer ✅",
        };
      case "error":
        return {
          color: "text-red-400",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30",
          message: "Verification failed. Please try again.",
        };
      default:
        return {
          color: "text-gray-400",
          bgColor: "bg-gray-500/10",
          borderColor: "border-gray-500/20",
          message: "Connect wallet to verify identity",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bgColor} ${config.borderColor} border backdrop-blur-sm rounded-xl p-6 mb-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-lg ${config.bgColor} ${config.borderColor} border`}
          >
            <Shield className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Web3 Identity Verification
            </h3>
            <p className={`text-sm ${config.color}`}>{config.message}</p>
          </div>
        </div>

        {verificationStatus === "verified" && (
          <CheckCircle className="w-8 h-8 text-green-400" />
        )}
      </div>

      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={verificationStatus === "connecting"}
          className="w-full py-3 px-4 bg-gradient-primary hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium transition-opacity flex items-center justify-center space-x-2"
        >
          <Wallet className="w-5 h-5" />
          <span>
            {verificationStatus === "connecting"
              ? "Connecting..."
              : "Connect Wallet"}
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Connected Address:</p>
                <p className="font-mono text-purple-300 text-sm">
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "Loading..."}
                </p>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {verificationStatus !== "verified" && (
            <button
              onClick={onSign}
              disabled={verificationStatus === "signing"}
              className="w-full py-3 px-4 bg-gradient-success hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium transition-opacity"
            >
              {verificationStatus === "signing"
                ? "Signing..."
                : "Sign & Verify Identity"}
            </button>
          )}

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20"
            >
              <h4 className="font-medium text-purple-300 mb-2">
                Transaction Details:
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-purple-300">Ethereum Mainnet</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract:</span>
                  <span className="font-mono text-purple-300">
                    0x742d...5c7a
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Function:</span>
                  <span className="text-purple-300">verifyOrganizer</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Estimate:</span>
                  <span className="text-green-400">~0.003 ETH</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-300 text-sm">
              Transaction failed. Please check your wallet and try again.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
