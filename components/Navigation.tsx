"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Home, Plus, BarChart3, Settings, Bell, User } from "lucide-react";

export default function Navigation() {
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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span>
                <Image
                  src="/favicon.svg"
                  alt="SphereCo Logo"
                  width={32}
                  height={32}
                />
              </span>
            </div>
            <span className="text-xl font-bold">SphereCo</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/organizer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Organizer</span>
            </Link>

            <Link
              href="/browse"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Browse Campaigns</span>
            </Link>

            <Link
              href="/influencer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Influencer</span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  John Organizer
                </p>
                <p className="text-xs text-gray-500">0x1234...abcd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
