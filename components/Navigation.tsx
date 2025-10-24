"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useBasename } from "@/lib/web3/hooks/useBasename";
// import { Web3ConnectButton } from "./Web3ConnectButton";
import {
  Home,
  Plus,
  BarChart3,
  Settings,
  Bell,
  User,
  Briefcase,
  TrendingUp,
  FileText,
  Award,
  Search,
  CheckCircle,
  LogOut,
  ChevronDown,
  Wallet,
  UserCircle,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Web3 hooks
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { basename, displayName, hasBasename } = useBasename();

  // Determine display name based on basename or default
  const getUserDisplayName = () => {
    if (hasBasename && basename) {
      return basename;
    }
    if (isOrganizer) {
      return "Brand Manager";
    }
    if (isInfluencer) {
      return "Influencer";
    }
    return "User";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hide navigation on home page and login page
  if (pathname === "/" || pathname === "/login") {
    return null;
  }

  // Determine user role based on current path
  const isOrganizer = pathname.startsWith("/organizer");
  const isInfluencer = pathname.startsWith("/influencer");

  // Get role-specific styling
  const getRoleStyle = () => {
    if (isOrganizer) {
      return {
        gradient: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-600",
        textColor: "text-blue-600",
        hoverBg: "hover:bg-blue-50",
        activeBg: "bg-blue-100",
        badge: "bg-blue-500",
        roleName: "Campaigner",
        userName: "Brand Manager",
      };
    }
    if (isInfluencer) {
      return {
        gradient: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-600",
        textColor: "text-pink-600",
        hoverBg: "hover:bg-pink-50",
        activeBg: "bg-pink-100",
        badge: "bg-pink-500",
        roleName: "KOL / Influencer",
        userName: "Content Creator",
      };
    }
    // Default - should not reach here (navigation only shows for organizer/influencer)
    return {
      gradient: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-600",
      textColor: "text-gray-600",
      hoverBg: "hover:bg-gray-50",
      activeBg: "bg-gray-100",
      badge: "bg-gray-500",
      roleName: "Unknown",
      userName: "Unknown",
    };
  };

  const roleStyle = getRoleStyle();

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle disconnect
  const handleDisconnect = () => {
    try {
      disconnect();
      setIsWalletModalOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      // Still close modals even if disconnect fails
      setIsWalletModalOpen(false);
      setIsDropdownOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 bg-gradient-to-br ${roleStyle.gradient} rounded-lg flex items-center justify-center`}
            >
              <span>
                <Image
                  src="/favicon.svg"
                  alt="SphereCo Logo"
                  width={32}
                  height={32}
                />
              </span>
            </div>
            <div>
              <span className="text-xl font-bold">SphereCo</span>
              <span
                className={`ml-2 text-xs font-semibold ${roleStyle.textColor} px-2 py-1 rounded-full ${roleStyle.activeBg}`}
              >
                {roleStyle.roleName}
              </span>
            </div>
          </Link>

          {/* Navigation Links - Different for each role */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-3xl">
            {isOrganizer && (
              <>
                <Link
                  href="/organizer"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/organizer"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/organizer/create"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/organizer/create"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Campaign</span>
                </Link>

                <Link
                  href="/organizer/analytics"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/organizer/analytics"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>

                {/* <Link
                  href="/influencer/browse"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/influencer/browse" ||
                    pathname.startsWith("/influencer/browse/")
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Browse</span>
                </Link> */}
              </>
            )}

            {isInfluencer && (
              <>
                <Link
                  href="/influencer"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/influencer"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>My Campaigns</span>
                </Link>

                <Link
                  href="/influencer/browse"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/influencer/browse" ||
                    pathname.startsWith("/influencer/browse/")
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Browse</span>
                </Link>

                <Link
                  href="/influencer/earnings"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    pathname === "/influencer/earnings"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Earnings</span>
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Web3 Connect Button - Commented out, moved to profile dropdown */}
            {/* <Web3ConnectButton /> */}

            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${roleStyle.gradient} rounded-full flex items-center justify-center shadow-md`}
                >
                  {isOrganizer ? (
                    <Briefcase className="w-4 h-4 text-white" />
                  ) : isInfluencer ? (
                    <TrendingUp className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserDisplayName()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isConnected && address
                      ? hasBasename && basename
                        ? `${address.slice(0, 6)}...${address.slice(-4)}`
                        : `${address.slice(0, 6)}...${address.slice(-4)}`
                      : "Not Connected"}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    {/* Current Role Info */}
                    <div
                      className={`bg-gradient-to-br ${roleStyle.gradient} p-4 text-white`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          {isOrganizer ? (
                            <Briefcase className="w-6 h-6" />
                          ) : isInfluencer ? (
                            <TrendingUp className="w-6 h-6" />
                          ) : (
                            <User className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-lg">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-sm opacity-90">
                            {roleStyle.roleName}
                          </p>
                        </div>
                      </div>

                      {/* Wallet Status */}
                      {isConnected && address ? (
                        <button
                          onClick={() => setIsWalletModalOpen(true)}
                          className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2 w-full hover:bg-white/30 transition-colors"
                        >
                          <Wallet className="w-4 h-4" />
                          <span className="font-mono flex-1 text-left">
                            {address.slice(0, 6)}...{address.slice(-4)}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
                          <Wallet className="w-4 h-4" />
                          <span className="text-xs opacity-75">
                            Not Connected
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Connect Wallet Section (if not connected) */}
                    {!isConnected && (
                      <div className="p-3 border-b border-gray-200 bg-blue-50">
                        <p className="text-xs font-semibold text-blue-900 mb-2">
                          CONNECT WALLET
                        </p>
                        <div className="space-y-2">
                          {connectors && connectors.length > 0 ? (
                            connectors.map((connector) => (
                              <button
                                key={connector.id}
                                onClick={async () => {
                                  try {
                                    await connectAsync({ connector });
                                    setIsDropdownOpen(false);
                                  } catch (error) {
                                    console.error(
                                      "Error connecting wallet:",
                                      error
                                    );
                                  }
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
                              >
                                <Wallet className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-900">
                                  {connector.name}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 px-3 py-2">
                              Loading wallets...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Switch Role Section */}
                    <div className="p-2 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 px-3 py-2">
                        SWITCH ROLE
                      </p>
                      {!isOrganizer && (
                        <Link
                          href="/organizer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              Campaigner
                            </p>
                            <p className="text-xs text-gray-500">
                              Create & manage campaigns
                            </p>
                          </div>
                          {isOrganizer && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </Link>
                      )}
                      {!isInfluencer && (
                        <Link
                          href="/influencer"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              KOL / Influencer
                            </p>
                            <p className="text-xs text-gray-500">
                              Work on campaigns & earn
                            </p>
                          </div>
                          {isInfluencer && (
                            <CheckCircle className="w-5 h-5 text-pink-600" />
                          )}
                        </Link>
                      )}
                    </div>

                    {/* Account Actions */}
                    <div className="p-2">
                      <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full text-left">
                        <UserCircle className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          Profile Settings
                        </span>
                      </button>

                      {isConnected && (
                        <button
                          onClick={handleDisconnect}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors w-full text-left group"
                        >
                          <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                          <span className="text-sm text-gray-700 group-hover:text-red-600">
                            Disconnect Wallet
                          </span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Info Modal */}
      <AnimatePresence>
        {isWalletModalOpen && isConnected && address && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWalletModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div
                className={`bg-gradient-to-br ${roleStyle.gradient} p-6 text-white`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Wallet Connected</h3>
                  <button
                    onClick={() => setIsWalletModalOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <span className="text-2xl leading-none">&times;</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm opacity-90">Wallet Address</p>
                    <p className="font-mono text-sm">
                      {address.slice(0, 10)}...{address.slice(-8)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Full Address */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Full Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-xs font-mono text-gray-900 flex-1 break-all">
                      {address}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                      title="Copy address"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 mt-1">
                      Copied to clipboard!
                    </p>
                  )}
                </div>

                {/* Network Info */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Network
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-900">Connected Network</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Make sure you're on the correct network
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setIsWalletModalOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
