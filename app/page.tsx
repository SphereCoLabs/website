"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Globe,
  BookOpen,
  Sparkles,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">AI-Powered Platform</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              SphereCo
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect Brands with Influencers on Web3
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            The next generation influencer marketing platform powered by
            blockchain and AI
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="flex"
          >
            <Link
              href="/login"
              className="flex flex-col w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  CAMPAIGNER
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Brand & Organizer
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Create and manage influencer marketing campaigns with AI-powered
                insights and analytics
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all mt-auto">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="flex"
          >
            <Link
              href="/login"
              className="flex flex-col w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                  INFLUENCERS
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Browse Campaigns
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Login as Influencer to discover and apply for active campaigns
                from brands worldwide
              </p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 transition-all mt-auto">
                <span>Login to Browse</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="flex"
          >
            <Link
              href="/login"
              className="flex flex-col w-full bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all group border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">
                  KOL / INFLUENCER
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Content Creator
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                Work on campaigns, create content, and track your earnings &
                performance
              </p>
              <div className="flex items-center text-pink-600 font-semibold group-hover:gap-3 transition-all mt-auto">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Web3 Sign In Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-white/30">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span className="text-white font-medium text-sm">
                    Web3 Native
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Already Have an Account?
                </h2>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-6">
                  Connect with your Web3 wallet to sign in instantly. Secure,
                  decentralized authentication without passwords or forms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    href="/signin"
                    className="inline-flex items-center gap-3 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Sign In with Wallet</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
                  >
                    <span>Create New Account</span>
                  </Link>
                </div>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl border border-white/30">
                  <Wallet className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Documentation Card - Full Width Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <a
            href="https://sphereco.gitbook.io/sphereco-docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.01] group relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Icon and Badge Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl border border-white/30">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Documentation & Guides
                  </h2>
                  <div className="bg-yellow-300/30 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-300/50">
                    <span className="text-white font-semibold text-xs">
                      📚 New
                    </span>
                  </div>
                </div>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl">
                  Learn how to use SphereCo platform with our comprehensive
                  guides, tutorials, and API references. Everything you need to
                  get started with Web3 influencer marketing.
                </p>
              </div>

              {/* CTA Section */}
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/30 group-hover:bg-white/30 transition-all">
                  <div className="flex items-center text-white font-bold text-lg gap-2">
                    <span>Read Docs</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
