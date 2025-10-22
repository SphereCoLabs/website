"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Web3ConnectButton } from "./Web3ConnectButton";
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
} from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Hide navigation on home page
  if (pathname === "/") {
    return null;
  }

  // Determine user role based on current path
  const isOrganizer = pathname.startsWith("/organizer");
  const isInfluencer = pathname.startsWith("/influencer");
  const isBrowse = pathname.startsWith("/browse");

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
    // Default (Browse)
    return {
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-600",
      textColor: "text-purple-600",
      hoverBg: "hover:bg-purple-50",
      activeBg: "bg-purple-100",
      badge: "bg-purple-500",
      roleName: "Explorer",
      userName: "Guest",
    };
  };

  const roleStyle = getRoleStyle();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          <div className="hidden md:flex items-center space-x-2">
            {isOrganizer && (
              <>
                <Link
                  href="/organizer"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/organizer/create"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Campaign</span>
                </Link>

                <Link
                  href="/analytics"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/analytics"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Link>
              </>
            )}

            {isInfluencer && (
              <>
                <Link
                  href="/influencer"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/influencer"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>My Campaigns</span>
                </Link>

                <Link
                  href="/browse"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/browse"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Find Campaigns</span>
                </Link>

                <Link
                  href="/influencer/earnings"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
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

            {isBrowse && !isOrganizer && !isInfluencer && (
              <>
                <Link
                  href="/browse"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    pathname === "/browse"
                      ? `${roleStyle.activeBg} ${roleStyle.textColor} font-medium`
                      : `text-gray-600 ${roleStyle.hoverBg}`
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Campaigns</span>
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Web3 Connect Button */}
            <Web3ConnectButton />

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
                    {roleStyle.userName}
                  </p>
                  <p className="text-xs text-gray-500">0x1234...abcd</p>
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
                            {roleStyle.userName}
                          </p>
                          <p className="text-sm opacity-90">
                            {roleStyle.roleName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm bg-white/20 rounded-lg px-3 py-2">
                        <Wallet className="w-4 h-4" />
                        <span className="font-mono">0x1234...abcd</span>
                      </div>
                    </div>

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
                      <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors w-full text-left group">
                        <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                        <span className="text-sm text-gray-700 group-hover:text-red-600">
                          Disconnect Wallet
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
