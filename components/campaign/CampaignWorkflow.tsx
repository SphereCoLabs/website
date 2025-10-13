"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import WorkflowStepCard, { WorkflowStep } from "./WorkflowStepCard";
import KOLSelectionModal from "./KOLSelectionModal";

interface CampaignWorkflowProps {
  campaignId: string;
  campaignTitle: string;
}

export default function CampaignWorkflow({
  campaignId,
  campaignTitle,
}: CampaignWorkflowProps) {
  const [showKOLModal, setShowKOLModal] = useState(false);
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "wallet-connect",
      title: "Connect Wallet & Verification",
      description:
        "Organizer connect wallet → sign transaction untuk verifikasi identitas & membuat hash campaign di blockchain (on-chain proof of campaign origin).",
      status: "completed",
      actor: "organizer",
      timestamp: "2 hours ago",
    },
    {
      id: "create-campaign",
      title: "Create Campaign",
      description:
        "Organizer membuat campaign baru: isi brief, goal, budget, timeline, platform target (TikTok, IG, YouTube), dan guideline.",
      status: "completed",
      actor: "organizer",
      timestamp: "1 hour ago",
    },
    {
      id: "review-publish",
      title: "Review & Publish",
      description:
        'Campaign dalam status "🟢 Campaign Live — Open for KOLs". Siap menerima aplikasi dari KOL.',
      status: "completed",
      actor: "system",
      timestamp: "45 minutes ago",
    },
    {
      id: "kol-applications",
      title: "KOL Applications",
      description:
        'KOL submit proposal: konsep konten, rate card, dan insight audience mereka. AI sorting module menampilkan "Top 3 Recommended KOLs based on Engagement Rate + Audience Match".',
      status: "ai-assisted",
      actor: "ai",
      timestamp: "30 minutes ago",
      actionButton: {
        label: "Review AI Recommendations",
        onClick: () => setShowKOLModal(true),
        variant: "primary",
      },
    },
    {
      id: "approval-stage",
      title: "KOL Approval Stage",
      description:
        'Menunggu organizer untuk approve atau reject KOL yang direkomendasikan AI. Status akan berubah ke "KOL Approved — Waiting for Draft".',
      status: "waiting-approval",
      actor: "organizer",
      actionButton: {
        label: "Approve Selected KOLs",
        onClick: () => handleApproveKOL(),
        variant: "success",
      },
    },
    {
      id: "draft-submission",
      title: "KOL Submit Draft Content",
      description:
        'KOL upload preview draft (caption + link + file). Organizer dapat reject untuk "Need Resubmit" atau approve untuk lanjut ke "Publish Stage".',
      status: "pending",
      actor: "kol",
      metadata: {
        kolName: "@sarah_lifestyle",
      },
    },
    {
      id: "content-publish",
      title: "Publish Content",
      description:
        'KOL post konten di platform mereka dan upload link bukti posting. Status: "📢 Published".',
      status: "pending",
      actor: "kol",
    },
    {
      id: "analytics-sharing",
      title: "Share Analytics",
      description:
        'KOL upload insight (reach, views, engagement). AI Analyzer membantu mengecek performa dengan "Content reached 92% of target audience. ROI score: A−".',
      status: "pending",
      actor: "ai",
      metadata: {
        analytics: {
          reach: 45000,
          engagement: "8.5%",
          roi: "A−",
        },
      },
    },
    {
      id: "final-review",
      title: "Organizer Review & Reward",
      description:
        'Organizer dapat reject dengan AI suggestion atau approve. Jika approve, smart contract langsung kirim reward ke wallet KOL. Status: "✅ Completed — Reward Sent".',
      status: "pending",
      actor: "organizer",
    },
  ]);

  const handleApproveKOL = () => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === "approval-stage"
          ? { ...step, status: "completed" as const, timestamp: "Just now" }
          : step.id === "draft-submission"
          ? { ...step, status: "in-progress" as const }
          : step
      )
    );
  };

  const handleKOLSelection = (selectedKOLs: string[]) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === "kol-applications"
          ? { ...step, status: "completed" as const, timestamp: "Just now" }
          : step.id === "approval-stage"
          ? { ...step, status: "completed" as const, timestamp: "Just now" }
          : step.id === "draft-submission"
          ? { ...step, status: "in-progress" as const }
          : step
      )
    );
  };

  const completedSteps = steps.filter(
    (step) => step.status === "completed"
  ).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Campaign Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {campaignTitle}
            </h2>
            <p className="text-gray-600">Campaign ID: {campaignId}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-sm text-gray-600">Progress</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>
            {completedSteps} of {steps.length} steps completed
          </span>
          <span>Estimated completion: 2-3 days</span>
        </div>
      </motion.div>

      {/* Workflow Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <WorkflowStepCard
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-600">
            <span className="text-white text-lg">🤖</span>
          </div>
          <h3 className="font-semibold text-gray-900">AI Campaign Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-medium text-purple-700 mb-2">
              Performance Prediction
            </h4>
            <p className="text-gray-700">
              Based on KOL audience match, predicted reach: 80K-120K with 7-9%
              engagement rate.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-medium text-purple-700 mb-2">Next Actions</h4>
            <p className="text-gray-700">
              Consider reviewing KOL applications within 24 hours for optimal
              campaign timing.
            </p>
          </div>
        </div>
      </motion.div>

      {/* KOL Selection Modal */}
      <KOLSelectionModal
        isOpen={showKOLModal}
        onClose={() => setShowKOLModal(false)}
        onApprove={handleKOLSelection}
      />
    </div>
  );
}
