"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  Users,
  TrendingUp,
  CheckCircle,
  X,
  Sparkles,
} from "lucide-react";

interface KOL {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  engagementRate: number;
  audienceMatch: number;
  platforms: string[];
  rate: number;
  aiScore: number;
  proposal: string;
}

interface KOLSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (selectedKOLs: string[]) => void;
}

export default function KOLSelectionModal({
  isOpen,
  onClose,
  onApprove,
}: KOLSelectionModalProps) {
  const [selectedKOLs, setSelectedKOLs] = useState<string[]>([]);

  const kolCandidates: KOL[] = [
    {
      id: "kol-1",
      name: "Sarah Lifestyle",
      username: "@sarah_lifestyle",
      avatar: "👩‍💼",
      followers: 125000,
      engagementRate: 8.5,
      audienceMatch: 94,
      platforms: ["Instagram", "TikTok"],
      rate: 2500,
      aiScore: 95,
      proposal:
        "Konsep konten: Fashion haul dengan styling tips untuk musim panas. Target 3 posts + 5 stories dengan aesthetic minimalis sesuai brand guideline.",
    },
    {
      id: "kol-2",
      name: "Maya Fashion",
      username: "@maya_fashion",
      avatar: "🧚‍♀️",
      followers: 89000,
      engagementRate: 9.2,
      audienceMatch: 88,
      platforms: ["Instagram", "YouTube"],
      rate: 1800,
      aiScore: 91,
      proposal:
        "Video lookbook dengan 3 outfit combinations untuk berbagai occasion. Plus tutorial styling yang detail dengan voice-over profesional.",
    },
    {
      id: "kol-3",
      name: "Rina Trendy",
      username: "@rina_trendy",
      avatar: "💃",
      followers: 156000,
      engagementRate: 7.8,
      audienceMatch: 82,
      platforms: ["TikTok", "Instagram"],
      rate: 3200,
      aiScore: 87,
      proposal:
        "Trending challenge dengan hashtag custom untuk brand. Mix antara dance content dan fashion showcase untuk viral potential.",
    },
  ];

  const handleKOLToggle = (kolId: string) => {
    setSelectedKOLs((prev) =>
      prev.includes(kolId)
        ? prev.filter((id) => id !== kolId)
        : [...prev, kolId]
    );
  };

  const handleApprove = () => {
    onApprove(selectedKOLs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white border border-gray-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  AI KOL Recommendations
                </h2>
                <p className="text-gray-600">
                  Top 3 KOLs berdasarkan Engagement Rate + Audience Match
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {kolCandidates.map((kol, index) => (
              <motion.div
                key={kol.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  selectedKOLs.includes(kol.id)
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{kol.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {kol.name}
                        {index === 0 && (
                          <span className="px-2 py-1 bg-blue-600 text-xs rounded-full text-white font-medium">
                            TOP PICK
                          </span>
                        )}
                      </h3>
                      <p className="text-purple-600">{kol.username}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {kol.followers.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {kol.engagementRate}%
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {kol.audienceMatch}% match
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      ${kol.rate}
                    </div>
                    <div className="text-sm text-gray-400">per campaign</div>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full">
                        AI Score: {kol.aiScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex items-center space-x-2 mb-4">
                  {kol.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                {/* Proposal */}
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-purple-300 mb-2">
                    Proposal Konten:
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {kol.proposal}
                  </p>
                </div>

                {/* Selection Button */}
                <button
                  onClick={() => handleKOLToggle(kol.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    selectedKOLs.includes(kol.id)
                      ? "bg-gradient-success text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {selectedKOLs.includes(kol.id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Selected
                    </span>
                  ) : (
                    "Select KOL"
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {selectedKOLs.length} KOL(s) selected
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={selectedKOLs.length === 0}
                className="px-6 py-3 bg-gradient-primary hover:opacity-90 text-white rounded-lg font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve Selected KOLs
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
