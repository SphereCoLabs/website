"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle, Sparkles } from "lucide-react";

interface DashboardProps {
  stats: {
    totalCampaigns: number;
    ongoing: number;
    completed: number;
    aiSuggestions: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      icon: TrendingUp,
      label: "Total Campaign",
      value: stats.totalCampaigns,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
    },
    {
      icon: Clock,
      label: "Ongoing",
      value: stats.ongoing,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: stats.completed,
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
    },
    {
      icon: Sparkles,
      label: "AI Suggestions",
      value: stats.aiSuggestions,
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-600",
    },
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Campaign Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor dan kelola campaign workflow dengan AI-powered insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${card.bgColor} border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.iconBg}`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  {card.value}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm font-medium">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
