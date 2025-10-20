"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Users,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Star,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Instagram,
  DollarSign,
  Target,
  BarChart3,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Mock proposals data - In production, fetch from API
const getProposalsData = (campaignId: string) => {
  return {
    campaign: {
      id: campaignId,
      title: "Summer Fashion Collection Launch",
      budget: 15000,
      applicationsCount: 47,
      spotsAvailable: 10,
    },
    proposals: [
      {
        id: "1",
        influencer: {
          name: "Sarah Johnson",
          username: "@sarahjstyle",
          avatar: "SJ",
          followers: 125000,
          engagementRate: 4.8,
          previousCampaigns: 15,
        },
        proposal:
          "I'm excited about this sustainable fashion campaign! My audience loves eco-friendly content and I have experience with similar brands.",
        reach: "150K impressions",
        estimatedROI: "320%",
        aiScore: 95,
        aiInsights: [
          "High engagement rate with fashion content",
          "Audience demographics perfectly match target",
          "Strong history of successful brand collaborations",
          "Consistent posting schedule with quality content",
        ],
        status: "pending",
        appliedAt: "2025-10-15",
      },
      {
        id: "2",
        influencer: {
          name: "Michael Chen",
          username: "@mikelifestyle",
          avatar: "MC",
          followers: 89000,
          engagementRate: 3.2,
          previousCampaigns: 8,
        },
        proposal:
          "Looking forward to collaborating! I can create engaging reels and posts that showcase your collection.",
        reach: "95K impressions",
        estimatedROI: "245%",
        aiScore: 82,
        aiInsights: [
          "Good engagement with lifestyle content",
          "Growing follower base with upward trend",
          "Active in target demographic locations",
          "Consistent content quality",
        ],
        status: "pending",
        appliedAt: "2025-10-16",
      },
      {
        id: "3",
        influencer: {
          name: "Emma Rodriguez",
          username: "@emmasstyle",
          avatar: "ER",
          followers: 210000,
          engagementRate: 5.2,
          previousCampaigns: 23,
        },
        proposal:
          "I absolutely love your sustainable approach! My followers are very engaged with fashion content and I have a proven track record with similar campaigns.",
        reach: "280K impressions",
        estimatedROI: "385%",
        aiScore: 98,
        aiInsights: [
          "Exceptional engagement rate and content quality",
          "Perfect audience alignment with target demographics",
          "Extensive experience with fashion brands",
          "High conversion rates on previous campaigns",
          "Active and responsive community",
        ],
        status: "pending",
        appliedAt: "2025-10-14",
      },
      {
        id: "4",
        influencer: {
          name: "David Kim",
          username: "@davidkstyle",
          avatar: "DK",
          followers: 45000,
          engagementRate: 2.8,
          previousCampaigns: 5,
        },
        proposal:
          "I'd love to be part of this campaign. I can provide authentic content for my audience.",
        reach: "52K impressions",
        estimatedROI: "180%",
        aiScore: 68,
        aiInsights: [
          "Moderate engagement rate",
          "Limited fashion content experience",
          "Smaller but engaged audience",
          "Room for growth in collaboration skills",
        ],
        status: "pending",
        appliedAt: "2025-10-17",
      },
    ],
  };
};

export default function AIProposalReviewPage() {
  const params = useParams();
  const router = useRouter();
  const data = getProposalsData(params.id as string);

  const [sortBy, setSortBy] = useState<"aiScore" | "followers" | "engagement">(
    "aiScore"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [proposals, setProposals] = useState(data.proposals);

  const sortedProposals = [...proposals].sort((a, b) => {
    if (sortBy === "aiScore") return b.aiScore - a.aiScore;
    if (sortBy === "followers")
      return b.influencer.followers - a.influencer.followers;
    if (sortBy === "engagement")
      return b.influencer.engagementRate - a.influencer.engagementRate;
    return 0;
  });

  const filteredProposals = sortedProposals.filter((p) =>
    filterStatus === "all" ? true : p.status === filterStatus
  );

  const handleApprove = (proposalId: string) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId ? { ...p, status: "approved" as const } : p
      )
    );
  };

  const handleReject = (proposalId: string) => {
    setProposals(
      proposals.map((p) =>
        p.id === proposalId ? { ...p, status: "rejected" as const } : p
      )
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 75) return "text-blue-600 bg-blue-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/organizer"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {data.campaign.title}
              </h1>
              <p className="text-gray-600 text-lg">
                Review and manage campaign applications with AI assistance
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Total Applications
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data.campaign.applicationsCount}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Approved
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {proposals.filter((p) => p.status === "approved").length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {proposals.filter((p) => p.status === "pending").length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Spots Left
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {data.campaign.spotsAvailable -
                proposals.filter((p) => p.status === "approved").length}
            </p>
          </div>
        </motion.div>

        {/* AI Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-white">
              <h3 className="text-2xl font-bold mb-2">
                AI-Powered Recommendations
              </h3>
              <p className="text-purple-100 text-lg">
                Our AI has analyzed all proposals based on engagement rates,
                audience demographics, content quality, and campaign fit. Top
                matches are highlighted with detailed insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "aiScore" | "followers" | "engagement"
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="aiScore">AI Score (Highest)</option>
                <option value="followers">Followers (Most)</option>
                <option value="engagement">Engagement Rate (Highest)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Filter:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus("pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === "pending"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilterStatus("approved")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === "approved"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setFilterStatus("rejected")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === "rejected"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
                proposal.aiScore >= 90
                  ? "border-green-300 shadow-green-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {proposal.influencer.avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {proposal.influencer.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {proposal.influencer.username}
                      </p>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-4 py-2 rounded-xl font-bold text-lg ${getScoreColor(
                          proposal.aiScore
                        )}`}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          AI Score: {proposal.aiScore}
                        </div>
                      </div>

                      {proposal.aiScore >= 90 && (
                        <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          Top Match
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">
                        Followers
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {(proposal.influencer.followers / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">
                        Engagement
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {proposal.influencer.engagementRate}%
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">
                        Est. Reach
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {proposal.reach}
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="text-xs text-gray-600 mb-1">Est. ROI</div>
                      <div className="text-lg font-bold text-gray-900">
                        {proposal.estimatedROI}
                      </div>
                    </div>
                  </div>

                  {/* Proposal Text */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Proposal:
                    </h4>
                    <p className="text-gray-700">{proposal.proposal}</p>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-purple-900">AI Insights</h4>
                    </div>
                    <ul className="space-y-2">
                      {proposal.aiInsights.map((insight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {proposal.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(proposal.id)}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <ThumbsUp className="w-5 h-5" />
                          Approve Application
                        </button>
                        <button
                          onClick={() => handleReject(proposal.id)}
                          className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <ThumbsDown className="w-5 h-5" />
                          Reject
                        </button>
                      </>
                    )}
                    {proposal.status === "approved" && (
                      <div className="flex-1 py-3 px-6 bg-green-100 text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Approved
                      </div>
                    )}
                    {proposal.status === "rejected" && (
                      <div className="flex-1 py-3 px-6 bg-red-100 text-red-700 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Rejected
                      </div>
                    )}
                    <button className="py-3 px-6 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-semibold transition-all flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
