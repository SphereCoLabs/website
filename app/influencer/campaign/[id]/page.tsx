"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Upload,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Image as ImageIcon,
  BarChart3,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Mock campaign data
const getCampaignWorkData = (id: string) => {
  return {
    id,
    title: "Summer Fashion Collection Launch",
    brand: "Fashion Brand Co.",
    status: "in-progress",
    deadline: "2025-12-31",
    deliverables: [
      { id: 1, type: "Instagram Post", quantity: 3, status: "pending" },
      { id: 2, type: "Instagram Stories", quantity: 5, status: "pending" },
      { id: 3, type: "Reels", quantity: 2, status: "pending" },
    ],
    submissions: [
      {
        id: 1,
        type: "content-plan",
        title: "Content Plan - Week 1",
        status: "approved",
        submittedAt: "2025-10-18",
        reviewedAt: "2025-10-19",
        feedback: "Great plan! Love the creative angles you've proposed.",
      },
      {
        id: 2,
        type: "draft",
        title: "Instagram Post Draft #1",
        status: "pending",
        submittedAt: "2025-10-20",
        reviewedAt: null,
        feedback: null,
      },
    ],
  };
};

type SubmissionType = "content-plan" | "draft" | "published" | "analytics";

export default function KOLCampaignWorkspace() {
  const params = useParams();
  const campaign = getCampaignWorkData(params.id as string);

  const [activeTab, setActiveTab] = useState<SubmissionType>("content-plan");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form states for different submission types
  const [contentPlan, setContentPlan] = useState({
    title: "",
    description: "",
    contentIdeas: "",
    timeline: "",
  });

  const [draftContent, setDraftContent] = useState({
    title: "",
    caption: "",
    hashtags: "",
    mediaFiles: [] as File[],
  });

  const [publishedContent, setPublishedContent] = useState({
    postUrl: "",
    publishDate: "",
    notes: "",
    screenshotFiles: [] as File[],
  });

  const [analytics, setAnalytics] = useState({
    postUrl: "",
    impressions: "",
    reach: "",
    likes: "",
    comments: "",
    shares: "",
    saves: "",
    screenshotFiles: [] as File[],
  });

  const handleSubmitContentPlan = () => {
    console.log("Submitting content plan:", contentPlan);
    alert("Content plan submitted for review!");
    setShowUploadModal(false);
  };

  const handleSubmitDraft = () => {
    console.log("Submitting draft:", draftContent);
    alert("Draft submitted for review!");
    setShowUploadModal(false);
  };

  const handleSubmitPublished = () => {
    console.log("Submitting published content:", publishedContent);
    alert("Published content submitted!");
    setShowUploadModal(false);
  };

  const handleSubmitAnalytics = () => {
    console.log("Submitting analytics:", analytics);
    alert("Analytics submitted successfully!");
    setShowUploadModal(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: "bg-green-100 text-green-700 border-green-300",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      rejected: "bg-red-100 text-red-700 border-red-300",
    };
    const icons = {
      approved: <CheckCircle2 className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderUploadForm = () => {
    switch (activeTab) {
      case "content-plan":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Submit Content Plan
            </h3>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Plan Title
              </label>
              <input
                type="text"
                value={contentPlan.title}
                onChange={(e) =>
                  setContentPlan({ ...contentPlan, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="e.g., Week 1 Content Strategy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Description
              </label>
              <textarea
                value={contentPlan.description}
                onChange={(e) =>
                  setContentPlan({
                    ...contentPlan,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                placeholder="Describe your overall content strategy..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Ideas & Concepts
              </label>
              <textarea
                value={contentPlan.contentIdeas}
                onChange={(e) =>
                  setContentPlan({
                    ...contentPlan,
                    contentIdeas: e.target.value,
                  })
                }
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                placeholder="List your content ideas, themes, and creative concepts..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposed Timeline
              </label>
              <textarea
                value={contentPlan.timeline}
                onChange={(e) =>
                  setContentPlan({ ...contentPlan, timeline: e.target.value })
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                placeholder="When do you plan to publish each piece of content?"
              />
            </div>

            <button
              onClick={handleSubmitContentPlan}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Content Plan
            </button>
          </div>
        );

      case "draft":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Submit Draft Content
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Title
              </label>
              <input
                type="text"
                value={draftContent.title}
                onChange={(e) =>
                  setDraftContent({ ...draftContent, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="e.g., Instagram Post #1 - Product Showcase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Caption/Text
              </label>
              <textarea
                value={draftContent.caption}
                onChange={(e) =>
                  setDraftContent({ ...draftContent, caption: e.target.value })
                }
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                placeholder="Write your caption here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hashtags
              </label>
              <input
                type="text"
                value={draftContent.hashtags}
                onChange={(e) =>
                  setDraftContent({
                    ...draftContent,
                    hashtags: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="#fashion #summer #sustainable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Media Files
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, MP4 up to 10MB
                </p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,video/*"
                />
              </div>
            </div>

            <button
              onClick={handleSubmitDraft}
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Draft for Review
            </button>
          </div>
        );

      case "published":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Submit Published Content
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post URL
              </label>
              <input
                type="url"
                value={publishedContent.postUrl}
                onChange={(e) =>
                  setPublishedContent({
                    ...publishedContent,
                    postUrl: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="https://instagram.com/p/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="date"
                value={publishedContent.publishDate}
                onChange={(e) =>
                  setPublishedContent({
                    ...publishedContent,
                    publishDate: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={publishedContent.notes}
                onChange={(e) =>
                  setPublishedContent({
                    ...publishedContent,
                    notes: e.target.value,
                  })
                }
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
                placeholder="Any additional notes about the published content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Screenshots
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">
                  Upload screenshots of published content
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>

            <button
              onClick={handleSubmitPublished}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Submit Published Content
            </button>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Submit Analytics Report
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post URL
              </label>
              <input
                type="url"
                value={analytics.postUrl}
                onChange={(e) =>
                  setAnalytics({ ...analytics, postUrl: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="https://instagram.com/p/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  Impressions
                </label>
                <input
                  type="number"
                  value={analytics.impressions}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, impressions: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Reach
                </label>
                <input
                  type="number"
                  value={analytics.reach}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, reach: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Heart className="w-4 h-4 text-red-600" />
                  Likes
                </label>
                <input
                  type="number"
                  value={analytics.likes}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, likes: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  Comments
                </label>
                <input
                  type="number"
                  value={analytics.comments}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, comments: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  Shares
                </label>
                <input
                  type="number"
                  value={analytics.shares}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, shares: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                  Saves
                </label>
                <input
                  type="number"
                  value={analytics.saves}
                  onChange={(e) =>
                    setAnalytics({ ...analytics, saves: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Analytics Screenshots
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-1">
                  Upload screenshots of analytics dashboard
                </p>
                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                />
              </div>
            </div>

            <button
              onClick={handleSubmitAnalytics}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Submit Analytics Report
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <Link
          href="/influencer"
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
            {campaign.title}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-600">{campaign.brand}</p>
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <Calendar className="w-4 h-4" />
              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2"
            >
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setActiveTab("content-plan")}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === "content-plan"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <FileText className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Content Plan</span>
                </button>
                <button
                  onClick={() => setActiveTab("draft")}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === "draft"
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ImageIcon className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Draft</span>
                </button>
                <button
                  onClick={() => setActiveTab("published")}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === "published"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Published</span>
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === "analytics"
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <BarChart3 className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Analytics</span>
                </button>
              </div>
            </motion.div>

            {/* Submission History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Submission History
              </h2>
              <div className="space-y-4">
                {campaign.submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {submission.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Submitted: {submission.submittedAt}
                        </p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>
                    {submission.feedback && (
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          Feedback:
                        </p>
                        <p className="text-sm text-gray-700">
                          {submission.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6"
            >
              {!showUploadModal ? (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    New Submission
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      New Submission
                    </h3>
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  {renderUploadForm()}
                </div>
              )}
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Deliverables
              </h3>
              <div className="space-y-3">
                {campaign.deliverables.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.type}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
