"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Eye,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

export type StepStatus =
  | "pending"
  | "in-progress"
  | "waiting-approval"
  | "completed"
  | "rejected"
  | "ai-assisted"
  | "content-live";

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  actor: "organizer" | "kol" | "ai" | "system";
  timestamp?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "success" | "danger";
  };
  metadata?: {
    kolName?: string;
    contentLink?: string;
    analytics?: {
      reach: number;
      engagement: string;
      roi: string;
    };
  };
}

interface WorkflowStepCardProps {
  step: WorkflowStep;
  index: number;
  isLast: boolean;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  "in-progress": {
    icon: RefreshCw,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  "waiting-approval": {
    icon: Eye,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  completed: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  rejected: {
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  "ai-assisted": {
    icon: Sparkles,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  "content-live": {
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
};

const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
};

export default function WorkflowStepCard({
  step,
  index,
  isLast,
}: WorkflowStepCardProps) {
  const config = statusConfig[step.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Connection Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-200" />
      )}

      <div
        className={`relative bg-white ${config.borderColor} border rounded-xl p-6 hover:shadow-md transition-all duration-300 group`}
      >
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}
            >
              <StatusIcon className={`w-5 h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.actor === "ai" && "AI-Powered"}
                {step.actor === "organizer" && "Organizer"}
                {step.actor === "kol" && "KOL"}
                {step.actor === "system" && "System"}
              </p>
            </div>
          </div>

          {step.timestamp && (
            <span className="text-xs text-gray-500">{step.timestamp}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>

        {/* Metadata */}
        {step.metadata?.kolName && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-purple-700">
              <span className="font-medium">KOL:</span> {step.metadata.kolName}
            </p>
          </div>
        )}

        {step.metadata?.analytics && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="text-sm font-medium text-green-700 mb-2">
              📊 Analytics
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Reach:</span>
                <p className="font-medium text-gray-900">
                  {step.metadata.analytics.reach.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Engagement:</span>
                <p className="font-medium text-gray-900">
                  {step.metadata.analytics.engagement}
                </p>
              </div>
              <div>
                <span className="text-gray-600">ROI:</span>
                <p className="font-medium text-green-600">
                  {step.metadata.analytics.roi}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {step.actionButton && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={step.actionButton.onClick}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              buttonVariants[step.actionButton.variant || "primary"]
            }`}
          >
            {step.actionButton.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
