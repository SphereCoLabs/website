"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  Users,
  Target,
  CheckCircle2,
  Clock,
  TrendingUp,
  Send,
  Link as LinkIcon,
  Instagram,
  Twitter,
  Youtube,
  Sparkles,
  Wallet,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useAccount, useConnect } from "wagmi";

// Mock campaign data - In production, fetch from API
const getCampaignData = (id: string) => {
  return {
    id,
    title: "Summer Fashion Collection Launch",
    brand: "Fashion Brand Co.",
    status: "Active",
    budget: 15000,
    timeline: {
      start: "2025-11-01",
      end: "2025-12-31",
    },
    platforms: ["Instagram", "TikTok", "YouTube"],
    contentType: ["Posts", "Reels", "Stories"],
    description:
      "We're launching our new summer collection and looking for fashion influencers to showcase our latest designs. The campaign focuses on sustainable fashion and modern aesthetics.",
    requirements: [
      "Minimum 10K followers on Instagram",
      "Fashion or lifestyle content focus",
      "Previous brand collaboration experience",
      "Active engagement rate above 3%",
    ],
    deliverables: [
      "3 Instagram Posts",
      "5 Instagram Stories",
      "2 Reels featuring products",
      "Weekly engagement reports",
    ],
    guidelines:
      "Content must align with our brand values of sustainability and modern aesthetics. Use hashtags #SummerVibes and #SustainableFashion. Tag @fashionbrandco in all posts.",
    targetAudience: "Fashion-conscious individuals aged 18-35, urban lifestyle",
    applicationsCount: 47,
    spotsAvailable: 10,
    spotsRemaining: 3,
  };
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    proposal: "",
    socialLinks: {
      instagram: "",
      twitter: "",
      youtube: "",
    },
    reachEstimate: "",
    previousWork: "",
  });

  const campaign = getCampaignData(params.id as string);

  const handleApplyClick = () => {
    if (!isConnected) {
      setShowConnectModal(true);
      return;
    }
    setShowApplicationForm(true);
  };

  const handleConnectWallet = () => {
    const injectedConnector = connectors.find((c) => c.type === "injected");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
      setShowConnectModal(false);
      setShowApplicationForm(true);
    }
  };

  const handleSubmitApplication = () => {
    // In production, submit to API
    console.log("Application submitted:", applicationData);
    alert("Application submitted successfully! We'll review it soon.");
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Campaigns</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
                    <Clock className="w-4 h-4" />
                    {campaign.status}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {campaign.title}
                  </h1>
                  <p className="text-xl text-gray-600">{campaign.brand}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-sm font-medium">Budget</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${campaign.budget.toLocaleString()}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-purple-600 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-medium">Applications</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaign.applicationsCount}
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-600 mb-2">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-medium">Spots Left</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaign.spotsRemaining}/{campaign.spotsAvailable}
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(campaign.timeline.start).toLocaleDateString()} -
                    <br />
                    {new Date(campaign.timeline.end).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Campaign Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Campaign Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {campaign.description}
              </p>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {campaign.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Deliverables
              </h2>
              <ul className="space-y-3">
                {campaign.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Campaign Guidelines
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {campaign.guidelines}
              </p>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 sticky top-6"
            >
              <div className="text-white mb-6">
                <h3 className="text-2xl font-bold mb-2">Ready to Apply?</h3>
                <p className="text-blue-100">
                  Submit your application and showcase your creativity
                </p>
              </div>

              {/* Wallet Connection Status */}
              {isConnected && (
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Wallet Connected
                    </span>
                  </div>
                  <p className="text-white/80 text-xs font-mono mt-1">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
              )}

              {!showApplicationForm ? (
                <>
                  {!isConnected && (
                    <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-3 mb-4">
                      <div className="flex items-start gap-2 text-white">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">
                          Connect your wallet to apply for this campaign
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleApplyClick}
                    className="w-full py-3 px-6 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isConnected ? (
                      <>
                        <Send className="w-5 h-5" />
                        Apply Now
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5" />
                        Connect & Apply
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Your Proposal
                    </label>
                    <textarea
                      value={applicationData.proposal}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          proposal: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white focus:outline-none resize-none backdrop-blur-sm"
                      placeholder="Tell us why you're perfect for this campaign..."
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Instagram Profile
                    </label>
                    <input
                      type="text"
                      value={applicationData.socialLinks.instagram}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          socialLinks: {
                            ...applicationData.socialLinks,
                            instagram: e.target.value,
                          },
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white focus:outline-none backdrop-blur-sm"
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Estimated Reach
                    </label>
                    <input
                      type="text"
                      value={applicationData.reachEstimate}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          reachEstimate: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:border-white focus:outline-none backdrop-blur-sm"
                      placeholder="e.g., 50K impressions"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitApplication}
                      className="flex-1 py-3 px-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="py-3 px-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Campaign Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Campaign Details
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">Platforms</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Content Types</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaign.contentType.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">Target Audience</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {campaign.targetAudience}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Connect Wallet Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600">
                Connect your Web3 wallet to apply for this campaign
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Why connect wallet?</p>
                  <p className="text-blue-800">
                    Your wallet proves your identity on the blockchain and
                    enables secure, transparent application processing.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConnectWallet}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>

              <button
                onClick={() => setShowConnectModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              You can also connect from your profile dropdown
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
