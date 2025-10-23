"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Target,
  DollarSign,
  Calendar,
  Globe,
  FileText,
  Users,
  CheckCircle2,
  Lightbulb,
  Hash,
  AtSign,
  Palette,
  TrendingUp,
  Wallet,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { parseEther } from "viem";
import { useCreateCampaign } from "@/lib/web3/hooks/useCampaign";
import { CampaignPlatform, CampaignContentType } from "@/lib/web3/types";
import { useRouter } from "next/navigation";
import Web3Verification from "./Web3Verification";

interface CampaignForm {
  title: string;
  brief: string;
  goal: string;
  budget: number;
  timeline: {
    start: string;
    end: string;
  };
  platforms: string[];
  guidelines: string;
  targetAudience: string;
  contentType: string[];
}

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook"];
const contentTypes = ["Post", "Story", "Reel", "Video", "Article"];

// Helper functions to convert string to enum
const platformToEnum = (platform: string): CampaignPlatform => {
  const map: Record<string, CampaignPlatform> = {
    Instagram: CampaignPlatform.Instagram,
    TikTok: CampaignPlatform.TikTok,
    YouTube: CampaignPlatform.YouTube,
    Twitter: CampaignPlatform.Twitter,
    Facebook: CampaignPlatform.Facebook,
  };
  return map[platform] ?? CampaignPlatform.Instagram;
};

const contentTypeToEnum = (contentType: string): CampaignContentType => {
  const map: Record<string, CampaignContentType> = {
    Post: CampaignContentType.Post,
    Story: CampaignContentType.Story,
    Reel: CampaignContentType.Reel,
    Video: CampaignContentType.Video,
    Article: CampaignContentType.Article,
  };
  return map[contentType] ?? CampaignContentType.Post;
};

export default function CampaignCreator() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [currentStep, setCurrentStep] = useState(0);

  // Web3 hook for creating campaign
  const { createCampaign, hash, isPending, isConfirming, isSuccess, error } =
    useCreateCampaign();

  const [form, setForm] = useState<CampaignForm>({
    title: "",
    brief: "",
    goal: "",
    budget: 0,
    timeline: {
      start: "",
      end: "",
    },
    platforms: [],
    guidelines: "",
    targetAudience: "",
    contentType: [],
  });

  const steps = [
    { title: "Campaign Basics", icon: FileText },
    { title: "Budget & Timeline", icon: Calendar },
    { title: "Platform & Content", icon: Globe },
    { title: "Guidelines", icon: CheckCircle2 },
    { title: "Review & Publish", icon: Eye },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (field: keyof CampaignForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (
    field: "platforms" | "contentType",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  // Handle campaign submission to smart contract
  const handlePublishCampaign = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      // Convert dates to Unix timestamps
      const startDate = BigInt(
        Math.floor(new Date(form.timeline.start).getTime() / 1000)
      );
      const endDate = BigInt(
        Math.floor(new Date(form.timeline.end).getTime() / 1000)
      );

      // Use first platform and content type (smart contract expects single value)
      const primaryPlatform =
        form.platforms.length > 0
          ? platformToEnum(form.platforms[0])
          : CampaignPlatform.Instagram;

      const primaryContentType =
        form.contentType.length > 0
          ? contentTypeToEnum(form.contentType[0])
          : CampaignContentType.Post;

      // Prepare campaign data for smart contract
      createCampaign({
        title: form.title,
        description: form.brief,
        brief: form.brief,
        goal: form.goal,
        startDate: startDate,
        endDate: endDate,
        targetPlatform: primaryPlatform,
        contentTypes: primaryContentType,
        targetAudience: form.targetAudience,
        guideline: form.guidelines,
        value: parseEther(form.budget.toString()), // Convert budget to Wei
      });
    } catch (err) {
      console.error("Error creating campaign:", err);
      alert("Failed to create campaign. Please try again.");
    }
  };

  // Handle success - redirect to organizer dashboard (move side-effect into useEffect)
  useEffect(() => {
    if (isSuccess && hash) {
      const t = setTimeout(() => router.push("/organizer"), 3000);
      return () => clearTimeout(t);
    }
  }, [isSuccess, hash, router]);

  const renderStepContent = () => {
    console.log("Current Step:", currentStep);
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Campaign Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="e.g., Summer Fashion Collection Campaign"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Campaign Brief
              </label>
              <textarea
                value={form.brief}
                onChange={(e) => handleFormChange("brief", e.target.value)}
                rows={4}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none transition-all"
                placeholder="Describe your campaign objectives, target audience, and key messages..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                Campaign Goal
              </label>
              <input
                type="text"
                value={form.goal}
                onChange={(e) => handleFormChange("goal", e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                placeholder="e.g., Increase brand awareness, drive sales, launch new product..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Total Budget (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) =>
                    handleFormChange("budget", Number(e.target.value))
                  }
                  className="w-full pl-8 pr-3 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="5000"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={form.timeline.start}
                  onChange={(e) =>
                    handleFormChange("timeline", {
                      ...form.timeline,
                      start: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  End Date
                </label>
                <input
                  type="date"
                  value={form.timeline.end}
                  onChange={(e) =>
                    handleFormChange("timeline", {
                      ...form.timeline,
                      end: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Globe className="w-4 h-4 text-blue-600" />
                Target Platforms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleArrayToggle("platforms", platform)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      form.platforms.includes(platform)
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                Content Types
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleArrayToggle("contentType", type)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      form.contentType.includes(type)
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                Target Audience
              </label>
              <textarea
                value={form.targetAudience}
                onChange={(e) =>
                  handleFormChange("targetAudience", e.target.value)
                }
                rows={3}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none transition-all"
                placeholder="e.g., Age 18-35, fashion enthusiasts, urban lifestyle, US & Europe..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Campaign Guidelines
              </label>
              <textarea
                value={form.guidelines}
                onChange={(e) => handleFormChange("guidelines", e.target.value)}
                rows={6}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none transition-all"
                placeholder="Enter brand guidelines, dos and don'ts, content requirements, hashtags, mentions..."
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    AI Suggestions
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <Hash className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Include brand hashtag #YourBrand in all posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AtSign className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Tag official account @yourbrand</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Palette className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Use consistent brand color palette</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Include clear call-to-action</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        console.log("Rendering case 4 - Review & Publish");
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Campaign Summary
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">Title</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">
                      {form.title || "Untitled Campaign"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Budget</span>
                    </div>
                    <p className="font-semibold text-green-600 ml-6">
                      ${form.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="font-semibold text-gray-900 ml-6">
                      {form.timeline.start && form.timeline.end
                        ? `${form.timeline.start} - ${form.timeline.end}`
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">Platforms</span>
                    </div>
                    <p className="font-semibold text-blue-600 ml-6">
                      {form.platforms.length > 0
                        ? form.platforms.join(", ")
                        : "None selected"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">Content Types</span>
                    </div>
                    <p className="font-semibold text-blue-600 ml-6">
                      {form.contentType.length > 0
                        ? form.contentType.join(", ")
                        : "None selected"}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">Status</span>
                    </div>
                    <p className="font-semibold text-emerald-600 ml-6">
                      Ready to Publish
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => console.log("Save as draft")}
                disabled={isPending || isConfirming}
                className="py-3 px-6 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>Save as Draft</span>
              </button>

              <button
                onClick={handlePublishCampaign}
                disabled={isPending || isConfirming || isSuccess}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Confirm in Wallet...</span>
                  </>
                )}
                {isConfirming && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                )}
                {isSuccess && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Published!</span>
                  </>
                )}
                {!isPending && !isConfirming && !isSuccess && (
                  <>
                    <span>Publish Campaign</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Transaction Status */}
            {(isPending || isConfirming || isSuccess || error) && (
              <div className="mt-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800">
                    <p className="font-semibold mb-1">Transaction Error</p>
                    <p className="text-sm">{error.message}</p>
                  </div>
                )}
                {isSuccess && hash && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Campaign Created Successfully!
                    </p>
                    <p className="text-sm text-green-700 mb-2">
                      Transaction Hash:{" "}
                      <code className="bg-green-100 px-2 py-1 rounded text-xs">
                        {hash.slice(0, 10)}...{hash.slice(-8)}
                      </code>
                    </p>
                    <p className="text-sm text-green-600">
                      Redirecting to dashboard in 3 seconds...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        console.log("Default case triggered! Current step:", currentStep);
        return (
          <div className="text-center py-8">
            <p className="text-red-600 font-semibold">
              Error: Step {currentStep} not found
            </p>
            <p className="text-gray-600 mt-2">
              Please refresh the page or contact support
            </p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Create New Campaign
        </h1>
        <p className="text-gray-600">
          Setup your influencer marketing campaign dengan AI-powered
          recommendations
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={`p-3 rounded-full transition-all duration-300 ${
                  index < currentStep
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                    : index === currentStep
                    ? "bg-blue-500 shadow-lg ring-4 ring-blue-100"
                    : "bg-gray-200"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 ${
                    index <= currentStep ? "text-white" : "text-gray-400"
                  }`}
                />
              </div>
              <span
                className={`text-xs font-medium text-center hidden md:block ${
                  index <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm"
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="py-3 px-6 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm hover:shadow"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
        )}

        {currentStep < steps.length - 1 && (
          <button
            onClick={handleNext}
            className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-lg ml-auto"
          >
            <span>Next Step</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
