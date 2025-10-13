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
          color: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-300",
          message: "Connecting to wallet...",
        };
      case "signing":
        return {
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-300",
          message: "Please sign the transaction in your wallet",
        };
      case "verified":
        return {
          color: "text-emerald-700",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-300",
          message: "Verified Organizer",
        };
      case "error":
        return {
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-300",
          message: "Verification failed. Please try again.",
        };
      default:
        return {
          color: "text-gray-700",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-300",
          message: "Connect wallet to verify identity",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-lg ${config.bgColor} ${config.borderColor} border-2 shadow-sm`}
          >
            <Shield className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Web3 Identity Verification
            </h3>
            <p className={`text-sm font-medium ${config.color}`}>
              {config.message}
            </p>
          </div>
        </div>

        {verificationStatus === "verified" && (
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        )}
      </div>

      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={verificationStatus === "connecting"}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
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
          <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Connected Address:
                </p>
                <p className="font-mono text-blue-700 text-sm font-semibold mt-1">
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "Loading..."}
                </p>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                title="View Details"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {verificationStatus !== "verified" && (
            <button
              onClick={onSign}
              disabled={verificationStatus === "signing"}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
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
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
            >
              <h4 className="font-semibold text-blue-900 mb-3">
                Transaction Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600 font-medium">Network:</span>
                  <span className="text-blue-700 font-semibold">
                    Ethereum Mainnet
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600 font-medium">Contract:</span>
                  <span className="font-mono text-blue-700 font-semibold">
                    0x742d...5c7a
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-gray-600 font-medium">Function:</span>
                  <span className="text-blue-700 font-semibold">
                    verifyOrganizer
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 font-medium">
                    Gas Estimate:
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    ~0.003 ETH
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {verificationStatus === "error" && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">
              Transaction failed. Please check your wallet and try again.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
