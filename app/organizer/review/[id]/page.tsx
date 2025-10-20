"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  XCircle,
  DollarSign,
  Target,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Award,
  AlertCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

// Mock data for content submissions with analytics
const getContentReviewData = (campaignId: string) => {
  return {
    campaign: {
      id: campaignId,
      title: "Summer Fashion Collection Launch",
      budget: 15000,
      targetMetrics: {
        impressions: 500000,
        reach: 300000,
        engagement: 15000,
        conversions: 500,
      },
    },
    submissions: [
      {
        id: 1,
        influencer: {
          name: "Sarah Johnson",
          username: "@sarahjstyle",
          avatar: "SJ",
        },
        contentType: "Instagram Post",
        postUrl: "https://instagram.com/p/ABC123",
        publishedDate: "2025-10-15",
        analytics: {
          impressions: 125000,
          reach: 98000,
          likes: 8500,
          comments: 450,
          shares: 320,
          saves: 1200,
          engagement: 10470,
          engagementRate: 10.68,
        },
        budget: 3000,
        status: "pending-review",
        targetHit: {
          impressions: true,
          reach: true,
          engagement: true,
        },
      },
      {
        id: 2,
        influencer: {
          name: "Emma Rodriguez",
          username: "@emmasstyle",
          avatar: "ER",
        },
        contentType: "Instagram Reels",
        postUrl: "https://instagram.com/reel/XYZ789",
        publishedDate: "2025-10-18",
        analytics: {
          impressions: 210000,
          reach: 165000,
          likes: 15200,
          comments: 890,
          shares: 1250,
          saves: 2100,
          engagement: 19440,
          engagementRate: 11.78,
        },
        budget: 5000,
        status: "pending-review",
        targetHit: {
          impressions: true,
          reach: true,
          engagement: true,
        },
      },
      {
        id: 3,
        influencer: {
          name: "Michael Chen",
          username: "@mikelifestyle",
          avatar: "MC",
        },
        contentType: "Instagram Stories",
        postUrl: "https://instagram.com/stories/highlights/123",
        publishedDate: "2025-10-19",
        analytics: {
          impressions: 45000,
          reach: 38000,
          likes: 0,
          comments: 0,
          shares: 180,
          saves: 0,
          engagement: 180,
          engagementRate: 0.47,
        },
        budget: 1500,
        status: "pending-review",
        targetHit: {
          impressions: false,
          reach: false,
          engagement: false,
        },
      },
    ],
  };
};

export default function CampaignerReviewAnalytics() {
  const params = useParams();
  const data = getContentReviewData(params.id as string);

  const [submissions, setSubmissions] = useState(data.submissions);

  const handleMarkAsDone = (submissionId: number) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === submissionId ? { ...s, status: "approved" } : s
      )
    );
    alert("Content marked as done! Reward will be sent to the influencer.");
  };

  const handleReject = (submissionId: number) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === submissionId ? { ...s, status: "rejected" } : s
      )
    );
    alert("Content rejected. Influencer will be notified.");
  };

  // Calculate if targets are being met overall
  const calculateOverallProgress = () => {
    const totalImpressions = submissions.reduce(
      (sum, s) => sum + s.analytics.impressions,
      0
    );
    const totalReach = submissions.reduce(
      (sum, s) => sum + s.analytics.reach,
      0
    );
    const totalEngagement = submissions.reduce(
      (sum, s) => sum + s.analytics.engagement,
      0
    );

    return {
      impressions:
        (totalImpressions / data.campaign.targetMetrics.impressions) * 100,
      reach: (totalReach / data.campaign.targetMetrics.reach) * 100,
      engagement:
        (totalEngagement / data.campaign.targetMetrics.engagement) * 100,
    };
  };

  const progress = calculateOverallProgress();

  const getAISuggestion = (submission: (typeof submissions)[0]) => {
    const { targetHit, analytics } = submission;
    const allTargetsMet =
      targetHit.impressions && targetHit.reach && targetHit.engagement;

    if (allTargetsMet && analytics.engagementRate > 10) {
      return {
        recommendation: "approve",
        score: 95,
        message:
          "Exceptional performance! All targets exceeded with outstanding engagement rate. This influencer delivered excellent results.",
        details: [
          `Engagement rate of ${analytics.engagementRate.toFixed(
            2
          )}% is above industry average`,
          "All target metrics successfully achieved",
          "Strong audience interaction with high saves and shares",
          "Recommended for future campaigns",
        ],
      };
    } else if (allTargetsMet) {
      return {
        recommendation: "approve",
        score: 85,
        message:
          "Good performance! All primary targets met. Content successfully delivered expected results.",
        details: [
          "All target metrics achieved",
          "Solid engagement metrics",
          "Consistent with campaign objectives",
          "Ready for reward distribution",
        ],
      };
    } else {
      const missedTargets = [];
      if (!targetHit.impressions) missedTargets.push("impressions");
      if (!targetHit.reach) missedTargets.push("reach");
      if (!targetHit.engagement) missedTargets.push("engagement");

      return {
        recommendation: "review",
        score: 65,
        message: `Performance below target. Missed: ${missedTargets.join(
          ", "
        )}. Review before approval.`,
        details: [
          `Failed to meet ${missedTargets.length} out of 3 target metrics`,
          "Consider discussing with influencer",
          "May need content optimization strategy",
          "Review budget allocation for this deliverable",
        ],
      };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 75) return "text-blue-600 bg-blue-100";
    return "text-yellow-600 bg-yellow-100";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-600";
    if (percentage >= 75) return "bg-blue-600";
    if (percentage >= 50) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <Link
          href="/organizer"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Review Campaign Analytics
          </h1>
          <p className="text-gray-600 text-lg">{data.campaign.title}</p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 shadow-xl text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Campaign Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Impressions</span>
                <span className="font-bold">
                  {progress.impressions.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    progress.impressions
                  )} transition-all duration-500`}
                  style={{ width: `${Math.min(progress.impressions, 100)}%` }}
                />
              </div>
              <p className="text-sm text-blue-100 mt-1">
                Target:{" "}
                {data.campaign.targetMetrics.impressions.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Reach</span>
                <span className="font-bold">{progress.reach.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    progress.reach
                  )} transition-all duration-500`}
                  style={{ width: `${Math.min(progress.reach, 100)}%` }}
                />
              </div>
              <p className="text-sm text-blue-100 mt-1">
                Target: {data.campaign.targetMetrics.reach.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Engagement</span>
                <span className="font-bold">
                  {progress.engagement.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(
                    progress.engagement
                  )} transition-all duration-500`}
                  style={{ width: `${Math.min(progress.engagement, 100)}%` }}
                />
              </div>
              <p className="text-sm text-blue-100 mt-1">
                Target:{" "}
                {data.campaign.targetMetrics.engagement.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Submissions */}
        <div className="space-y-6">
          {submissions.map((submission, index) => {
            const aiSuggestion = getAISuggestion(submission);

            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                        {submission.influencer.avatar}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {submission.influencer.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {submission.influencer.username}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {submission.publishedDate}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                            {submission.contentType}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Budget</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${submission.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Analytics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <Eye className="w-5 h-5" />
                        <span className="text-xs font-medium">Impressions</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(submission.analytics.impressions / 1000).toFixed(1)}K
                      </div>
                      {submission.targetHit.impressions && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                      )}
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-purple-600 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-xs font-medium">Reach</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(submission.analytics.reach / 1000).toFixed(1)}K
                      </div>
                      {submission.targetHit.reach && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                      )}
                    </div>

                    <div className="bg-red-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-red-600 mb-2">
                        <Heart className="w-5 h-5" />
                        <span className="text-xs font-medium">Likes</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {(submission.analytics.likes / 1000).toFixed(1)}K
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-600 mb-2">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-xs font-medium">Comments</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {submission.analytics.comments}
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-amber-600 mb-2">
                        <Share2 className="w-5 h-5" />
                        <span className="text-xs font-medium">Shares</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {submission.analytics.shares}
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-indigo-600 mb-2">
                        <BarChart3 className="w-5 h-5" />
                        <span className="text-xs font-medium">Engagement</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {submission.analytics.engagementRate.toFixed(2)}%
                      </div>
                      {submission.targetHit.engagement && (
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-1" />
                      )}
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border-2 border-purple-200">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-xl font-bold text-gray-900">
                            AI Performance Analysis
                          </h4>
                          <div
                            className={`px-4 py-1 rounded-full font-bold text-sm ${getScoreColor(
                              aiSuggestion.score
                            )}`}
                          >
                            Score: {aiSuggestion.score}/100
                          </div>
                        </div>

                        <p className="text-gray-700 font-medium mb-4">
                          {aiSuggestion.message}
                        </p>

                        <div className="space-y-2">
                          {aiSuggestion.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              {aiSuggestion.recommendation === "approve" ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              )}
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>

                        {aiSuggestion.recommendation === "approve" && (
                          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800 font-semibold">
                              <Award className="w-5 h-5" />
                              AI Recommendation: Approve & Send Reward
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <a
                      href={submission.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Post
                    </a>

                    {submission.status === "pending-review" && (
                      <>
                        <button
                          onClick={() => handleReject(submission.id)}
                          className="flex-1 py-3 px-6 bg-white border-2 border-red-300 text-red-700 hover:bg-red-50 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <ThumbsDown className="w-5 h-5" />
                          Reject
                        </button>

                        <button
                          onClick={() => handleMarkAsDone(submission.id)}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <DollarSign className="w-5 h-5" />
                          Mark as Done & Send Reward
                        </button>
                      </>
                    )}

                    {submission.status === "approved" && (
                      <div className="flex-1 py-3 px-6 bg-green-100 text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Approved - Reward Sent
                      </div>
                    )}

                    {submission.status === "rejected" && (
                      <div className="flex-1 py-3 px-6 bg-red-100 text-red-700 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Rejected
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
