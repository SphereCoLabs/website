"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  Calendar,
  Users,
  DollarSign,
  MoreVertical,
} from "lucide-react";

export default function OrganizerDashboard() {
  const stats = {
    totalCampaigns: 24,
    ongoing: 8,
    completed: 15,
    aiSuggestions: 12,
  };

  // Mock data untuk campaign list
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection Launch",
      status: "active",
      kols: 5,
      budget: "$50,000",
      progress: 65,
      deadline: "2025-11-15",
      engagement: "125K",
    },
    {
      id: 2,
      title: "Tech Product Review Campaign",
      status: "active",
      kols: 3,
      budget: "$30,000",
      progress: 45,
      deadline: "2025-10-30",
      engagement: "85K",
    },
    {
      id: 3,
      title: "Fitness Challenge #30Days",
      status: "active",
      kols: 8,
      budget: "$25,000",
      progress: 80,
      deadline: "2025-12-01",
      engagement: "200K",
    },
    {
      id: 4,
      title: "Food & Travel Vlog Series",
      status: "pending",
      kols: 0,
      budget: "$40,000",
      progress: 0,
      deadline: "2025-11-20",
      engagement: "0",
    },
    {
      id: 5,
      title: "Beauty Product Launch Q4",
      status: "completed",
      kols: 6,
      budget: "$35,000",
      progress: 100,
      deadline: "2025-10-05",
      engagement: "180K",
    },
  ];

  const statCards = [
    {
      icon: TrendingUp,
      label: "Total Campaigns",
      value: stats.totalCampaigns,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: Clock,
      label: "Ongoing",
      value: stats.ongoing,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: stats.completed,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      icon: Sparkles,
      label: "AI Suggestions",
      value: stats.aiSuggestions,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      completed: "bg-gray-100 text-gray-700",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Organizer Dashboard
          </h1>
          <p className="text-gray-600">
            Create and manage your influencer marketing campaigns
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.iconBg}`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <p className="text-gray-600 text-sm font-medium">{card.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/organizer/create"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Campaign</span>
          </Link>
        </motion.div>

        {/* Campaigns List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Campaigns</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Sort
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {campaign.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          campaign.status
                        )}`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Campaign Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {campaign.kols}
                      </div>
                      <div className="text-xs text-gray-500">KOLs</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {campaign.budget}
                      </div>
                      <div className="text-xs text-gray-500">Budget</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {campaign.engagement}
                      </div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {new Date(campaign.deadline).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </div>
                      <div className="text-xs text-gray-500">Deadline</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">
                      {campaign.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
