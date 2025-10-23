"use client";

import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Target,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function InfluencerBrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock data untuk campaigns
  const campaigns = [
    {
      id: 1,
      title: "Summer Fashion Collection Launch",
      brand: "FashionCo",
      reward: "$5,000",
      engagement: "125K",
      deadline: "2025-11-15",
      category: "Fashion",
      status: "Active",
      requirements: "10K+ followers",
    },
    {
      id: 2,
      title: "Tech Product Review Campaign",
      brand: "TechGear",
      reward: "$3,000",
      engagement: "85K",
      deadline: "2025-10-30",
      category: "Technology",
      status: "Active",
      requirements: "5K+ followers",
    },
    {
      id: 3,
      title: "Fitness Challenge #30Days",
      brand: "FitLife",
      reward: "$4,000",
      engagement: "200K",
      deadline: "2025-12-01",
      category: "Health & Fitness",
      status: "Active",
      requirements: "15K+ followers",
    },
    {
      id: 4,
      title: "Food & Travel Vlog Series",
      brand: "TravelTaste",
      reward: "$6,000",
      engagement: "150K",
      deadline: "2025-11-20",
      category: "Travel & Food",
      status: "Active",
      requirements: "20K+ followers",
    },
    {
      id: 5,
      title: "Beauty Product Launch",
      brand: "GlowUp",
      reward: "$4,500",
      engagement: "95K",
      deadline: "2025-11-10",
      category: "Beauty",
      status: "Active",
      requirements: "8K+ followers",
    },
    {
      id: 6,
      title: "Gaming Livestream Series",
      brand: "GameZone",
      reward: "$7,000",
      engagement: "180K",
      deadline: "2025-12-05",
      category: "Gaming",
      status: "Active",
      requirements: "25K+ followers",
    },
  ];

  const categories = [
    "All",
    "Fashion",
    "Technology",
    "Health & Fitness",
    "Travel & Food",
    "Beauty",
    "Gaming",
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Campaigns
          </h1>
          <p className="text-gray-600">
            Discover and apply to campaigns that match your profile
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search campaigns or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-pink-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredCampaigns.length}
                </p>
                <p className="text-sm text-gray-600">Available Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$29.5K</p>
                <p className="text-sm text-gray-600">Total Rewards</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">845K</p>
                <p className="text-sm text-gray-600">Total Engagement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full mb-2">
                        {campaign.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-gray-600">{campaign.brand}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Reward</span>
                      <span className="font-bold text-green-600">
                        {campaign.reward}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target Engagement</span>
                      <span className="font-semibold text-gray-900">
                        {campaign.engagement}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Requirements</span>
                      <span className="font-semibold text-gray-900">
                        {campaign.requirements}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {campaign.deadline}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/influencer/browse/${campaign.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all"
                  >
                    View Details & Apply
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
