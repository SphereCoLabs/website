"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Target,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Campaigns",
      value: "24",
      change: "+12%",
      isPositive: true,
      icon: Target,
      color: "blue",
    },
    {
      title: "Total Reach",
      value: "2.4M",
      change: "+23%",
      isPositive: true,
      icon: Eye,
      color: "purple",
    },
    {
      title: "Engagement Rate",
      value: "8.5%",
      change: "+3.2%",
      isPositive: true,
      icon: Activity,
      color: "green",
    },
    {
      title: "Total Spend",
      value: "$45.2K",
      change: "-5%",
      isPositive: false,
      icon: DollarSign,
      color: "pink",
    },
  ];

  const campaigns = [
    {
      name: "Summer Product Launch",
      status: "Active",
      reach: "856K",
      engagement: "9.2%",
      spend: "$12.5K",
      roi: "+245%",
    },
    {
      name: "Brand Awareness Q4",
      status: "Active",
      reach: "642K",
      engagement: "7.8%",
      spend: "$8.3K",
      roi: "+189%",
    },
    {
      name: "New Year Campaign",
      status: "Completed",
      reach: "523K",
      engagement: "8.9%",
      spend: "$9.8K",
      roi: "+312%",
    },
    {
      name: "Holiday Special",
      status: "Completed",
      reach: "412K",
      engagement: "6.5%",
      spend: "$7.2K",
      roi: "+156%",
    },
  ];

  const topInfluencers = [
    {
      name: "Sarah Johnson",
      campaigns: 8,
      reach: "485K",
      engagement: "12.3%",
      avatar: "SJ",
    },
    {
      name: "Mike Chen",
      campaigns: 6,
      reach: "392K",
      engagement: "10.8%",
      avatar: "MC",
    },
    {
      name: "Emma Davis",
      campaigns: 5,
      reach: "315K",
      engagement: "9.5%",
      avatar: "ED",
    },
    {
      name: "James Wilson",
      campaigns: 4,
      reach: "268K",
      engagement: "8.9%",
      avatar: "JW",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Track your campaign performance and insights
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}
                >
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.isPositive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Performance Over Time
              </h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="text-center">
                <Activity className="w-16 h-16 text-blue-300 mx-auto mb-3" />
                <p className="text-gray-500">Chart visualization</p>
                <p className="text-sm text-gray-400">
                  Integration with charting library
                </p>
              </div>
            </div>
          </motion.div>

          {/* Campaign Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Campaign Distribution
              </h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-purple-300 mx-auto mb-3" />
                <p className="text-gray-500">Pie chart visualization</p>
                <p className="text-sm text-gray-400">Campaign breakdown</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Campaigns Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Campaign Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reach
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Spend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ROI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {campaigns.map((campaign, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          campaign.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {campaign.reach}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {campaign.engagement}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {campaign.spend}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-green-600 font-semibold">
                        {campaign.roi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Influencers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Top Performing Influencers
            </h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topInfluencers.map((influencer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {influencer.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {influencer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {influencer.campaigns} campaigns
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {influencer.reach}
                  </p>
                  <p className="text-sm text-green-600">
                    {influencer.engagement} engagement
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
