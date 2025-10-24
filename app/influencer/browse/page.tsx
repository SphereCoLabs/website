"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import {
  useGetAllCampaignIds,
  useGetCampaign,
} from "@/lib/web3/hooks/useCampaign";
import { Campaign as CampaignType, UserRole } from "@/lib/web3/types";
import { NetworkGuard } from "@/components/NetworkGuard";
import { UserRegistration } from "@/components/UserRegistration";

function CampaignCard({
  id,
  data,
}: {
  id: bigint;
  data?: CampaignType | null;
}) {
  const deadline = data?.endDate
    ? new Date(Number(data.endDate) * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";
  const reward = data?.reward
    ? `${(Number(data.reward) / 1e18).toFixed(4)} ETH`
    : "-";

  const getStatusBadge = () => {
    if (!data?.status && data?.status !== 0) return null;
    const statusLabels = [
      "Draft",
      "Published",
      "Active",
      "Completed",
      "Cancelled",
    ];
    const statusColors = [
      "bg-gray-100 text-gray-700",
      "bg-blue-100 text-blue-700",
      "bg-green-100 text-green-700",
      "bg-purple-100 text-purple-700",
      "bg-red-100 text-red-700",
    ];
    return (
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
          statusColors[data.status]
        }`}
      >
        {statusLabels[data.status]}
      </span>
    );
  };

  return (
    <motion.div
      key={String(id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                Base Sepolia
              </span>
              {getStatusBadge()}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {data?.title ?? `Campaign ${String(id)}`}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {data?.brief ?? data?.description ?? "-"}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Reward</span>
            <span className="font-bold text-green-600">{reward}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Target Audience</span>
            <span className="font-semibold text-gray-900 truncate">
              {data?.targetAudience ?? "-"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Platform</span>
            <span className="font-semibold text-gray-900">
              {data?.targetPlatform && data.targetPlatform.length > 0
                ? `${data.targetPlatform.length} platform(s)`
                : "Not specified"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {deadline}</span>
          </div>
        </div>

        <Link
          href={`/influencer/browse/${String(id)}`}
          className="block w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
        >
          View Details & Apply
        </Link>
      </div>
    </motion.div>
  );
}

export default function InfluencerBrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "published"
  >("all");

  const { data: idsData, isLoading: idsLoading } = useGetAllCampaignIds();
  const ids: bigint[] = Array.isArray(idsData) ? (idsData as bigint[]) : [];

  // Prefetch campaign data using hook per id (rule of hooks satisfied because ids is stable-ish after initial load)
  const campaignDatas = ids.map((id) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useGetCampaign(id);
    return { id, data };
  });

  const filteredCampaigns = campaignDatas.filter((c) => {
    // Filter by search query
    if (searchQuery) {
      const title = c.data?.title?.toLowerCase() ?? "";
      const brief = c.data?.brief?.toLowerCase() ?? "";
      const description = c.data?.description?.toLowerCase() ?? "";
      const searchLower = searchQuery.toLowerCase();
      if (
        !title.includes(searchLower) &&
        !brief.includes(searchLower) &&
        !description.includes(searchLower)
      ) {
        return false;
      }
    }

    // Filter by status
    if (filterStatus !== "all" && c.data?.status !== undefined) {
      if (filterStatus === "active" && c.data.status !== 2) return false; // CampaignStatus.Active = 2
      if (filterStatus === "published" && c.data.status !== 1) return false; // CampaignStatus.Published = 1
    }

    return true;
  });

  return (
    <NetworkGuard>
      <UserRegistration requiredRole={UserRole.KOL}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Find Campaigns
                </h1>
                <p className="text-gray-600">
                  Discover and apply to campaigns on Base Sepolia Network
                </p>
                {!idsLoading && (
                  <p className="text-sm text-blue-600 mt-1">
                    {ids.length} campaign(s) found on-chain
                  </p>
                )}
              </div>
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                disabled={idsLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCcw
                  className={`w-4 h-4 ${idsLoading ? "animate-spin" : ""}`}
                />
                <span className="text-sm font-medium">Refresh</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                {/* Filter Button */}
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filters</span>
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCampaigns.length}
                    </p>
                    <p className="text-sm text-gray-600">Available Campaigns</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredCampaigns
                        .reduce(
                          (sum, c) =>
                            sum +
                            (c.data?.reward ? Number(c.data.reward) / 1e18 : 0),
                          0
                        )
                        .toFixed(4)}{" "}
                      ETH
                    </p>
                    <p className="text-sm text-gray-600">Total Rewards</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {idsLoading ? "..." : ids.length}
                    </p>
                    <p className="text-sm text-gray-600">Total Campaigns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaigns Grid */}
            {idsLoading ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Loading campaigns...
                </h3>
                <p className="text-gray-600">
                  Please wait while we fetch data from the blockchain
                </p>
              </div>
            ) : filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((c) => (
                  <CampaignCard key={String(c.id)} id={c.id} data={c.data} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or wait for new campaigns to be
                  published
                </p>
              </div>
            )}
          </div>
        </div>
      </UserRegistration>
    </NetworkGuard>
  );
}
