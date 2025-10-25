"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useGetCampaign } from "@/lib/web3/hooks/useCampaign";
import { CampaignStatus } from "@/lib/web3/types";
import { Calendar, Users, Coins, Eye, MoreVertical, BarChart3 } from "lucide-react";

interface CampaignItemProps {
  campaignId: bigint;
  onStatusFilter: (status: string) => boolean;
}

export default function CampaignItem({
  campaignId,
  onStatusFilter,
}: CampaignItemProps) {
  const { data: campaignData, isLoading, error } = useGetCampaign(campaignId);

  const processedCampaign = useMemo(() => {
    if (!campaignData) return null;

    // Map campaign status to tab status
    const mapStatusToTab = (status?: CampaignStatus) => {
      if (!status && status !== 0) return "pending";
      switch (status) {
        case CampaignStatus.Draft:
        case CampaignStatus.Published:
          return "pending";
        case CampaignStatus.Active:
          return "running";
        case CampaignStatus.Completed:
          return "done";
        case CampaignStatus.Cancelled:
          return "done";
        default:
          return "pending";
      }
    };

    // Generate some dummy data based on campaign ID for better presentation
    const campaignIdNum = Number(campaignId);
    const mockKols = Math.max(1, (campaignIdNum % 5) + 1); // 1-5 KOLs based on ID
    const mockApplicants = Math.max(3, (campaignIdNum % 15) + 5); // 5-19 applicants based on ID
    
    return {
      id: String(campaignId),
      title: campaignData.title || `Campaign ${String(campaignId)}`,
      status: mapStatusToTab(campaignData.status),
      kols: campaignData.status === CampaignStatus.Active ? mockKols : 
            campaignData.status === CampaignStatus.Completed ? mockKols : 0,
      applicants: campaignData.status === CampaignStatus.Published || 
                  campaignData.status === CampaignStatus.Active || 
                  campaignData.status === CampaignStatus.Completed ? mockApplicants : 0,
      budget: campaignData.reward
        ? `${(Number(campaignData.reward) / 1e18).toFixed(4)} ETH`
        : "0 ETH",
      deadline: campaignData.endDate
        ? new Date(Number(campaignData.endDate) * 1000)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
        : "No deadline",
      engagement: campaignData.status === CampaignStatus.Active || campaignData.status === CampaignStatus.Completed
        ? `${Math.max(10, (campaignIdNum % 50) + 20)}%` 
        : "0%", // Mock engagement rate
      description: campaignData.description || campaignData.brief || "No description available for this campaign",
      brief: campaignData.brief || campaignData.description || "",
      rawData: campaignData,
    };
  }, [campaignData, campaignId]);

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      running: "bg-green-100 text-green-700",
      done: "bg-gray-100 text-gray-700",
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Error state
  if (error || !processedCampaign) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-200">
        <p className="text-red-600 text-sm">
          Failed to load campaign {campaignId.toString()}
        </p>
        <p className="text-red-500 text-xs mt-1">
          {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  // Filter by status
  if (!onStatusFilter(processedCampaign.status)) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {processedCampaign.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {processedCampaign.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {processedCampaign.rawData?.targetAudience || "General Audience"}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {processedCampaign.rawData?.targetPlatform && processedCampaign.rawData.targetPlatform.length > 0
                ? ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook'][processedCampaign.rawData.targetPlatform[0]] || 'Social Media'
                : 'Social Media'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
              processedCampaign.status
            )}`}
          >
            {processedCampaign.status.charAt(0).toUpperCase() +
              processedCampaign.status.slice(1)}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
            <Users className="w-4 h-4" />
            <span>KOLs</span>
          </div>
          <p className="font-bold text-lg text-gray-900">
            {processedCampaign.kols}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
            <Eye className="w-4 h-4" />
            <span>Applicants</span>
          </div>
          <p className="font-bold text-lg text-gray-900">
            {processedCampaign.applicants}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
            <Coins className="w-4 h-4" />
            <span>Budget</span>
          </div>
          <p className="font-bold text-lg text-gray-900">
            {processedCampaign.budget}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Deadline</span>
          </div>
          <p className="font-bold text-lg text-gray-900">
            {processedCampaign.deadline}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Engagement</span>
          </div>
          <p className="font-bold text-lg text-gray-900">
            {processedCampaign.engagement}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/organizer/campaign/${processedCampaign.id}`}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
        >
          View Details
        </Link>
        <Link
          href={`/organizer/review/${processedCampaign.id}`}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
        >
          {processedCampaign.status === 'done' ? 'Review' : 'Manage'}
        </Link>
      </div>
    </div>
  );
}
