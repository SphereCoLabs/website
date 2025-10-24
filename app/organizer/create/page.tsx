"use client";

import CampaignCreator from "@/components/campaign/CampaignCreator";
import { useAccount, useConnect } from "wagmi";
import { motion } from "framer-motion";
import { Wallet, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export default function CreateCampaignPage() {
  const { address, isConnected } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async (connector: any) => {
    try {
      setIsConnecting(true);
      setError(null);
      await connectAsync({ connector });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setError(error?.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  // Show wallet connection prompt if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-white" />
            </div>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 text-center mb-8">
              To create a campaign on-chain, you need to connect your Web3
              wallet first
            </p>

            {/* Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Why do I need to connect?</p>
                <p className="text-blue-800">
                  Campaign creation is stored on the blockchain to ensure
                  transparency and security. Your wallet signature proves
                  ownership.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-900">
                  <p className="font-semibold mb-1">Connection Failed</p>
                  <p className="text-red-800">{error}</p>
                  <p className="text-red-700 mt-2">
                    {error.includes("Provider not found") && (
                      <>
                        Please install{" "}
                        <a
                          href="https://metamask.io/download/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-semibold"
                        >
                          MetaMask
                        </a>{" "}
                        or use WalletConnect below.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Connect Buttons */}
            <div className="space-y-3 mb-6">
              {connectors && connectors.length > 0 ? (
                connectors.map((connector) => (
                  <button
                    key={connector.id}
                    onClick={() => handleConnect(connector)}
                    disabled={isConnecting}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>
                      {isConnecting
                        ? "Connecting..."
                        : `Connect ${connector.name}`}
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Loading wallet options...
                </div>
              )}
            </div>

            {/* Or connect from profile */}
            <p className="text-center text-sm text-gray-500 mt-6">
              You can also connect your wallet from your{" "}
              <span className="text-blue-600 font-semibold">
                profile dropdown
              </span>{" "}
              in the navigation bar
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Connected Badge */}
        <div className="mb-6 flex justify-end">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Wallet Connected</span>
            <span className="text-green-600 font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
          </div>
        </div>

        <CampaignCreator />
      </div>
    </div>
  );
}
