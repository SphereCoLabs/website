"use client";

/**
 * EXAMPLE: Campaign List dari Smart Contract
 *
 * File ini adalah contoh implementasi untuk menampilkan daftar campaign
 * dari smart contract menggunakan Web3 hooks.
 *
 * Cara pakai:
 * 1. Copy code ini ke halaman yang ingin menampilkan campaign dari blockchain
 * 2. Sesuaikan UI dengan design system aplikasi
 * 3. Tambahkan filter, search, dll sesuai kebutuhan
 */

import { motion } from "framer-motion";
import { useGetAllCampaignIds, useGetCampaign } from "@/lib/web3/hooks";
import { formatEther } from "viem";
import { Calendar, DollarSign, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

// Component untuk menampilkan single campaign card
function CampaignCard({ campaignId }: { campaignId: bigint }) {
  const { data: campaign, isLoading, error } = useGetCampaign(campaignId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return null;
  }

  const statusColors = {
    0: "bg-gray-100 text-gray-700", // Draft
    1: "bg-blue-100 text-blue-700", // Published
    2: "bg-green-100 text-green-700", // Active
    3: "bg-purple-100 text-purple-700", // Completed
    4: "bg-red-100 text-red-700", // Cancelled
  };

  const statusText = ["Draft", "Published", "Active", "Completed", "Cancelled"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {campaign.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {campaign.description}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[campaign.status]
          }`}
        >
          {statusText[campaign.status]}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold">
            {formatEther(campaign.reward)} ETH
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(Number(campaign.startDate) * 1000).toLocaleDateString()} -{" "}
            {new Date(Number(campaign.endDate) * 1000).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4" />
          <span>{campaign.targetAudience}</span>
        </div>
      </div>

      <Link
        href={`/browse/${campaignId}`}
        className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
      >
        View Details
      </Link>
    </motion.div>
  );
}

// Main component untuk halaman browse campaigns
export default function BrowseCampaignsFromBlockchain() {
  const { data: campaignIds, isLoading, error } = useGetAllCampaignIds();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Campaigns (Blockchain)
          </h1>
          <p className="text-gray-600">
            Discover active campaigns from smart contract
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">
              Failed to load campaigns
            </p>
            <p className="text-red-500 text-sm">{error.message}</p>
            <p className="text-gray-500 text-xs mt-2">
              Make sure you're connected to the correct network
            </p>
          </div>
        )}

        {/* Campaigns Grid */}
        {campaignIds && campaignIds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignIds.map((id) => (
              <CampaignCard key={id.toString()} campaignId={id} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {campaignIds && campaignIds.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No campaigns yet
            </h3>
            <p className="text-gray-600">
              Be the first to create a campaign and start collaborating with
              influencers!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
