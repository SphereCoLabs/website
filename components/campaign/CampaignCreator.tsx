"use client";

import { motion } from "framer-motion";
import { useState } from "react";
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
} from "lucide-react";
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

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn"];
const contentTypes = ["Posts", "Stories", "Reels", "Videos", "Live Streams"];

export default function CampaignCreator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "connecting" | "signing" | "verified" | "error"
  >("idle");

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
    { title: "Web3 Verification", icon: Sparkles },
    { title: "Campaign Basics", icon: Target },
    { title: "Budget & Timeline", icon: DollarSign },
    { title: "Platform & Content", icon: Globe },
    { title: "Guidelines", icon: Eye },
    { title: "Review & Publish", icon: ArrowRight },
  ];

  const handleConnect = async () => {
    setVerificationStatus("connecting");
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setWalletAddress("0x742d35Cc6633C0532925a3b8D3dD3e8f8C5c7a");
      setVerificationStatus("idle");
    }, 2000);
  };

  const handleSign = async () => {
    setVerificationStatus("signing");
    // Simulate signing
    setTimeout(() => {
      setVerificationStatus("verified");
      setCurrentStep(1);
    }, 3000);
  };

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Web3Verification
            isConnected={isConnected}
            address={walletAddress}
            onConnect={handleConnect}
            onSign={handleSign}
            verificationStatus={verificationStatus}
          />
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="Summer Fashion Collection Campaign"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Brief
              </label>
              <textarea
                value={form.brief}
                onChange={(e) => handleFormChange("brief", e.target.value)}
                rows={4}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Describe your campaign objectives, target audience, and key messages..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Goal
              </label>
              <input
                type="text"
                value={form.goal}
                onChange={(e) => handleFormChange("goal", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="Increase brand awareness, drive sales, launch new product..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Total Budget (USD)
              </label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) =>
                  handleFormChange("budget", Number(e.target.value))
                }
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="5000"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Target Platforms
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => handleArrayToggle("platforms", platform)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      form.platforms.includes(platform)
                        ? "bg-gradient-primary border-purple-500 text-white"
                        : "bg-white/10 border-white/20 text-gray-300 hover:border-white/40"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Content Types
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleArrayToggle("contentType", type)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      form.contentType.includes(type)
                        ? "bg-gradient-primary border-purple-500 text-white"
                        : "bg-white/10 border-white/20 text-gray-300 hover:border-white/40"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience
              </label>
              <textarea
                value={form.targetAudience}
                onChange={(e) =>
                  handleFormChange("targetAudience", e.target.value)
                }
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Age range, interests, demographics, location..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Guidelines
              </label>
              <textarea
                value={form.guidelines}
                onChange={(e) => handleFormChange("guidelines", e.target.value)}
                rows={6}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="Brand guidelines, dos and don'ts, content requirements, hashtags, mentions..."
              />
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
              <h4 className="font-medium text-purple-300 mb-2">
                💡 AI Suggestions
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Include brand hashtag #YourBrand in all posts</li>
                <li>• Tag official account @yourbrand</li>
                <li>• Use consistent brand color palette</li>
                <li>• Include clear call-to-action</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-card rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                Campaign Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Title:</span>
                    <p className="font-medium text-white">
                      {form.title || "Untitled Campaign"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Budget:</span>
                    <p className="font-medium text-green-400">
                      ${form.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <p className="font-medium text-white">
                      {form.timeline.start && form.timeline.end
                        ? `${form.timeline.start} - ${form.timeline.end}`
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Platforms:</span>
                    <p className="font-medium text-purple-300">
                      {form.platforms.length > 0
                        ? form.platforms.join(", ")
                        : "None selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Content Types:</span>
                    <p className="font-medium text-purple-300">
                      {form.contentType.length > 0
                        ? form.contentType.join(", ")
                        : "None selected"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <p className="font-medium text-yellow-400">
                      Ready to Publish
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => console.log("Save as draft")}
                className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save as Draft</span>
              </button>

              <button
                onClick={() => console.log("Publish campaign")}
                className="py-3 px-6 bg-gradient-primary hover:opacity-90 text-white rounded-lg font-medium transition-opacity flex items-center justify-center space-x-2"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Publish Campaign</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
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
              className={`flex items-center space-x-2 ${
                index <= currentStep ? "text-purple-400" : "text-gray-500"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  index < currentStep
                    ? "bg-gradient-primary"
                    : index === currentStep
                    ? "bg-purple-500/20 border border-purple-500"
                    : "bg-gray-700"
                }`}
              >
                <step.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
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
      {currentStep > 0 && verificationStatus === "verified" && (
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="py-3 px-6 bg-gradient-primary hover:opacity-90 text-white rounded-lg font-medium transition-opacity flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
