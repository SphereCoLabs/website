"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import {
  Wallet,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  User,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useBasename } from "@/lib/web3/hooks/useBasename";
import { generateUserDataWithBasename } from "@/lib/web3/basename";

type UserRole = "organizer" | "influencer";

export default function SignInPage() {
  const router = useRouter();
  const { address, isConnected, isConnecting } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  // Basename hook for resolving ENS names
  const {
    basename,
    avatar,
    displayName,
    hasBasename,
    isBaseNetwork,
    isLoading: basenameLoading,
  } = useBasename();

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("sphereco_user");
    if (userData && isConnected) {
      try {
        const user = JSON.parse(userData);
        if (user.role === "organizer") {
          router.push("/organizer");
        } else {
          router.push("/influencer");
        }
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("sphereco_user");
      }
    }
  }, [isConnected, router]);

  // Show role selection after wallet connection
  useEffect(() => {
    if (isConnected && address && !showRoleSelection) {
      setShowRoleSelection(true);
    }
  }, [isConnected, address, showRoleSelection]);

  const handleWalletConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const injectedConnector = connectors.find((c) => c.type === "injected");
      if (injectedConnector) {
        await connectAsync({ connector: injectedConnector });
      } else {
        // If no injected connector, try the first available
        if (connectors.length > 0) {
          await connectAsync({ connector: connectors[0] });
        }
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      setError(error?.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async (role: UserRole) => {
    if (!address) return;

    setIsLoading(true);

    try {
      // Generate user data with Basename integration
      const userData = await generateUserDataWithBasename(
        address,
        role,
        chainId
      );

      // Store user data
      localStorage.setItem("sphereco_user", JSON.stringify(userData));

      // Redirect based on role
      setTimeout(() => {
        if (role === "organizer") {
          router.push("/organizer");
        } else {
          router.push("/influencer");
        }
      }, 1000);
    } catch (error) {
      console.error("Error generating user data:", error);
      // Fallback to basic user data if Basename fails
      const fallbackUserData = {
        name: `User ${address.slice(0, 6)}`,
        email: `${address.slice(0, 8)}@wallet.user`,
        role: role,
        walletAddress: address,
        signedInAt: new Date().toISOString(),
      };
      localStorage.setItem("sphereco_user", JSON.stringify(fallbackUserData));

      setTimeout(() => {
        if (role === "organizer") {
          router.push("/organizer");
        } else {
          router.push("/influencer");
        }
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowRoleSelection(false);
    setSelectedRole(null);
    localStorage.removeItem("sphereco_user");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/30"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">Web3 Sign In</span>
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Already Have an Account?
          </h1>
          <p className="text-white/80 text-lg">
            Sign in securely with your Web3 wallet
          </p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {!isConnected ? (
            /* Wallet Connection Step */
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Connect Wallet
                </h2>
                <p className="text-gray-600">
                  Use your Web3 wallet to sign in securely
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Why Connect Wallet?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Secure, decentralized authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>No passwords or personal data required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                    <span>Access to blockchain features</span>
                  </li>
                </ul>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-900">
                      <p className="font-semibold mb-1">Connection Failed</p>
                      <p className="text-red-800 mb-2">{error}</p>
                      {error.includes("Provider not found") && (
                        <p className="text-red-700">
                          Please install{" "}
                          <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-semibold"
                          >
                            MetaMask
                          </a>{" "}
                          or try another wallet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Connect Button */}
              <button
                onClick={handleWalletConnect}
                disabled={isConnecting || isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting || isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>

              {/* Alternative Login */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-3">
                  Need to create an account?
                </p>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Sign up with traditional form →
                </Link>
              </div>
            </div>
          ) : !showRoleSelection ? (
            /* Loading State */
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Wallet Connected!
              </h3>
              <p className="text-gray-600 mb-4">Setting up your account...</p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            /* Role Selection Step */
            <div className="p-8">
              {/* Wallet Status */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-green-800">
                        {basenameLoading ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Resolving Basename...
                          </span>
                        ) : hasBasename ? (
                          <span className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {displayName}
                          </span>
                        ) : (
                          "Wallet Connected"
                        )}
                      </p>
                      {!isBaseNetwork && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Switch to Base for Basename
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-green-700 font-mono">
                      {hasBasename && basename
                        ? basename
                        : `${address?.slice(0, 8)}...${address?.slice(-6)}`}
                    </p>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="text-green-700 hover:text-green-800 text-sm font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Choose Your Role
                </h2>
                <p className="text-gray-600">
                  Select how you want to use SphereCo
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {/* Organizer Role */}
                <button
                  onClick={() => setSelectedRole("organizer")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedRole === "organizer"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        Brand & Organizer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Create and manage influencer marketing campaigns
                      </p>
                    </div>
                    {selectedRole === "organizer" && (
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </button>

                {/* Influencer Role */}
                <button
                  onClick={() => setSelectedRole("influencer")}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedRole === "influencer"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        Content Creator
                      </h3>
                      <p className="text-sm text-gray-600">
                        Apply to campaigns and create engaging content
                      </p>
                    </div>
                    {selectedRole === "influencer" && (
                      <CheckCircle className="w-6 h-6 text-pink-600" />
                    )}
                  </div>
                </button>
              </div>

              {/* Continue Button */}
              <button
                onClick={() =>
                  selectedRole && handleRoleSelection(selectedRole)
                }
                disabled={!selectedRole || isLoading}
                className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedRole === "organizer"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    : selectedRole === "influencer"
                    ? "bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Setting up account...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white/80 hover:text-white text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
