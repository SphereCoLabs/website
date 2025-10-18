"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Globe, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Welcome to SphereCo
          </h1>
          <p className="text-2xl text-white/90 mb-12">
            AI-Powered Influencer Marketing Platform
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/organizer"
              className="block bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Organizer
              </h2>
              <p className="text-gray-600 mb-6">
                Create and manage influencer marketing campaigns with AI-powered
                insights
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/browse"
              className="block bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Globe className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Browse Campaigns
              </h2>
              <p className="text-gray-600 mb-6">
                Discover and apply to active campaigns from brands worldwide
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 transition-all">
                <span>Explore Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/influencer"
              className="block bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors">
                <TrendingUp className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Influencer
              </h2>
              <p className="text-gray-600 mb-6">
                Track your campaigns, earnings, and performance metrics
              </p>
              <div className="flex items-center text-pink-600 font-semibold group-hover:gap-3 transition-all">
                <span>View Dashboard</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Documentation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-md mx-auto"
        >
          <a
            href="https://sphereco.gitbook.io/sphereco-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
              <BookOpen className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Documentation
            </h2>
            <p className="text-gray-600 mb-6">
              Learn how to use SphereCo platform with our comprehensive guides
              and tutorials
            </p>
            <div className="flex items-center text-green-600 font-semibold group-hover:gap-3 transition-all">
              <span>Read Docs</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
