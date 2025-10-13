"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";

export default function KOLDashboard() {
  // Mock data untuk KOL
  const kolStats = {
    totalEarnings: "$12,450",
    activeCampaigns: 3,
    completedCampaigns: 12,
    rating: 4.8,
    followers: "125K",
    engagementRate: "8.5%",
  };

  const activeCampaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection",
      brand: "FashionCo",
      payment: "$2,500",
      deadline: "2025-11-15",
      progress: 65,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Tech Product Review",
      brand: "TechGear",
      payment: "$1,800",
      deadline: "2025-10-30",
      progress: 30,
      status: "In Progress",
    },
    {
      id: 3,
      title: "Fitness Challenge",
      brand: "FitLife",
      payment: "$3,200",
      deadline: "2025-12-01",
      progress: 15,
      status: "Just Started",
    },
  ];

  const recentEarnings = [
    {
      campaign: "Beauty Product Launch",
      amount: "$1,500",
      date: "Oct 5, 2025",
      status: "Completed",
    },
    {
      campaign: "Gaming Stream Series",
      amount: "$2,200",
      date: "Oct 1, 2025",
      status: "Completed",
    },
    {
      campaign: "Food Review Campaign",
      amount: "$900",
      date: "Sep 28, 2025",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            KOL Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your campaigns and track your performance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600 font-semibold">
                +12.5%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {kolStats.totalEarnings}
            </h3>
            <p className="text-gray-600 text-sm">Total Earnings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {kolStats.activeCampaigns}
            </h3>
            <p className="text-gray-600 text-sm">Active Campaigns</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {kolStats.rating} ⭐
            </h3>
            <p className="text-gray-600 text-sm">Rating</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {kolStats.followers}
            </h3>
            <p className="text-gray-600 text-sm">Total Followers</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Campaigns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Active Campaigns
            </h2>
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-gray-600">{campaign.brand}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {campaign.status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">
                        {campaign.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Due: {campaign.deadline}
                    </span>
                    <span className="font-bold text-green-600">
                      {campaign.payment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Earnings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Earnings
            </h2>
            <div className="space-y-4">
              {recentEarnings.map((earning, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {earning.campaign}
                      </p>
                      <p className="text-xs text-gray-500">{earning.date}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="font-bold text-green-600">{earning.amount}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              View All Transactions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
