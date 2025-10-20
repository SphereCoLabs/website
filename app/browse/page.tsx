"use client";

import { motion } from "framer-motion";
import { Search, Filter, Calendar, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data untuk global campaigns
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection Launch",
      brand: "FashionCo",
      budget: "$50,000",
      engagement: "125K",
      deadline: "2025-11-15",
      category: "Fashion",
      status: "Active",
    },
    {
      id: 2,
      title: "Tech Product Review Campaign",
      brand: "TechGear",
      budget: "$30,000",
      engagement: "85K",
      deadline: "2025-10-30",
      category: "Technology",
      status: "Active",
    },
    {
      id: 3,
      title: "Fitness Challenge #30Days",
      brand: "FitLife",
      budget: "$25,000",
      engagement: "200K",
      deadline: "2025-12-01",
      category: "Health & Fitness",
      status: "Active",
    },
    {
      id: 4,
      title: "Food & Travel Vlog Series",
      brand: "TravelTaste",
      budget: "$40,000",
      engagement: "150K",
      deadline: "2025-11-20",
      category: "Travel & Food",
      status: "Active",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            All Campaigns
          </h1>
          <p className="text-gray-600">
            Browse and apply to active influencer marketing campaigns
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-xl flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                {/* Campaign Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-2">
                      {campaign.status}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{campaign.brand}</p>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg">
                    {campaign.category}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">
                      {campaign.budget}
                    </div>
                    <div className="text-xs text-gray-500">Budget</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-gray-900">
                      <Users className="w-4 h-4" />
                      {campaign.engagement}
                    </div>
                    <div className="text-xs text-gray-500">Reach</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-gray-900">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/browse/${campaign.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href={`/browse/${campaign.id}`}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
