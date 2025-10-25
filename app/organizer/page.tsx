"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles,
  Calendar,
  Users,
  MoreVertical,
  Eye,
  BarChart3,
  PlayCircle,
  CheckCircle2,
  FileText,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import { useGetAllCampaigns } from "@/lib/web3/hooks/useCampaign";
import { CampaignStatus } from "@/lib/web3/types";
import { useAccount } from "wagmi";
import { NetworkGuard } from "@/components/NetworkGuard";
import CampaignItem from "@/components/campaign/CampaignItem";

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState<"pending" | "running" | "done">(
    "pending"
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const { address } = useAccount();
  const { campaigns: campaignDatas, isLoading: idsLoading } =
    useGetAllCampaigns();

  // Simple stats based on campaign count
  const stats = useMemo(() => {
    const totalCampaigns = campaignDatas.length;
    return {
      totalCampaigns,
      ongoing: 0, // Will be calculated by individual CampaignItem components
      completed: 0, // Will be calculated by individual CampaignItem components
      aiSuggestions: 0, // Placeholder
    };
  }, [campaignDatas]);

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

  // Status filter function for CampaignItem components
  const statusFilter = (status: string) => status === activeTab;

  const getTabCount = (status: string) => {
    // For now return 0, will be dynamically calculated by individual components
    return 0;
  };

  return (
    <NetworkGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Organizer Dashboard
                </h1>
                <p className="text-gray-600">
                  Create and manage your influencer marketing campaigns on Base
                  Sepolia
                </p>
              </div>
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                disabled={idsLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {idsLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCcw className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>
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
                <p className="text-gray-600 text-sm font-medium">
                  {card.label}
                </p>
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
              <h2 className="text-2xl font-bold text-gray-900">
                Your Campaigns
              </h2>
            </div>

            {/* Tabs Filter */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === "pending"
                    ? "text-yellow-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Pending Review</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getTabCount("pending")}
                  </span>
                </div>
                {activeTab === "pending" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("running")}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === "running"
                    ? "text-green-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  <span>Running</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "running"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getTabCount("running")}
                  </span>
                </div>
                {activeTab === "running" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("done")}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === "done"
                    ? "text-gray-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === "done"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getTabCount("done")}
                  </span>
                </div>
                {activeTab === "done" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700"
                  />
                )}
              </button>
            </div>

            <div className="space-y-4">
              {idsLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">
                    Loading campaigns from Base Sepolia...
                  </p>
                </div>
              ) : campaignDatas.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {activeTab === "pending" && (
                      <FileText className="w-8 h-8 text-gray-400" />
                    )}
                    {activeTab === "running" && (
                      <PlayCircle className="w-8 h-8 text-gray-400" />
                    )}
                    {activeTab === "done" && (
                      <CheckCircle2 className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No {activeTab} campaigns
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "pending" &&
                      "You don't have any campaigns waiting for review."}
                    {activeTab === "running" &&
                      "You don't have any active campaigns running."}
                    {activeTab === "done" &&
                      "You don't have any completed campaigns yet."}
                  </p>
                  {activeTab === "pending" && (
                    <Link
                      href="/organizer/create"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Create New Campaign
                    </Link>
                  )}
                </div>
              ) : (
                campaignDatas.map(({ id }: { id: bigint }) => (
                  <CampaignItem
                    key={id.toString()}
                    campaignId={id}
                    onStatusFilter={statusFilter}
                  />
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </NetworkGuard>
  );
}
