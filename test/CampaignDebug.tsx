"use client";

import {
  useGetCampaign,
  useGetAllCampaignIds,
} from "@/lib/web3/hooks/useCampaign";

// Simple summary card for individual campaigns
function CampaignSummaryCard({ campaignId }: { campaignId: bigint }) {
  const { data: campaign, isLoading, error } = useGetCampaign(campaignId);

  if (isLoading) {
    return (
      <div className="p-3 bg-gray-50 rounded border">
        <p className="text-sm">Loading campaign {campaignId.toString()}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-50 rounded border border-red-200">
        <p className="text-sm text-red-600">
          Campaign {campaignId.toString()}: Error loading
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white rounded border">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-sm">
            #{campaignId.toString()} - {campaign?.title || "Untitled"}
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            Status: {campaign?.status !== undefined ? 
              ['Draft', 'Published', 'Active', 'Completed', 'Cancelled'][campaign.status] || `Unknown (${campaign.status})`
              : "Unknown"}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          Reward: {campaign?.reward ? `${Number(campaign.reward) / 1e18} ETH` : "0 ETH"}
        </div>
      </div>
    </div>
  );
}

export default function CampaignDebug() {
  const {
    data: campaignIds,
    isLoading: idsLoading,
    error: idsError,
  } = useGetAllCampaignIds();

  // Get the first campaign ID if available (campaigns usually start from 1)
  const firstCampaignId =
    campaignIds && campaignIds.length > 0 ? campaignIds[0] : BigInt(1);

  // Debug logging
  console.log("CampaignDebug - campaignIds:", campaignIds);
  console.log("CampaignDebug - firstCampaignId:", firstCampaignId.toString());

  const {
    data: campaign,
    isLoading: campaignLoading,
    error: campaignError,
  } = useGetCampaign(firstCampaignId);

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Campaign Debug Info</h2>

      {/* Campaign IDs */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Campaign IDs:</h3>
        {idsLoading ? (
          <p>Loading campaign IDs...</p>
        ) : idsError ? (
          <p className="text-red-500">Error: {idsError.message}</p>
        ) : (
          <div>
            <p>Count: {campaignIds?.length || 0}</p>
            <p>
              IDs:{" "}
              {campaignIds?.map((id: bigint) => id.toString()).join(", ") ||
                "None"}
            </p>
          </div>
        )}
      </div>

      {/* First Available Campaign Data */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">
          Campaign {firstCampaignId.toString()} Data:
        </h3>
        {campaignIds && campaignIds.length === 0 ? (
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
            <p className="text-yellow-800">
              No campaigns found in the contract.
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Use the "Create Test Campaign" button below to create a campaign.
            </p>
          </div>
        ) : campaignLoading ? (
          <p>Loading campaign {firstCampaignId.toString()}...</p>
        ) : campaignError ? (
          <p className="text-red-500">Error: {campaignError.message}</p>
        ) : (
          <div>
            <pre className="bg-white p-4 rounded text-sm overflow-auto">
              {JSON.stringify(
                campaign,
                (key, value) =>
                  typeof value === "bigint" ? value.toString() : value,
                2
              )}
            </pre>

            {campaign && (
              <div className="mt-4">
                <p>
                  <strong>Title:</strong> {campaign.title || "No title"}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {campaign.description || "No description"}
                </p>
                <p>
                  <strong>Brief:</strong>{" "}
                  {campaign.brief || "No brief"}
                </p>
                <p>
                  <strong>Goal:</strong>{" "}
                  {campaign.goal || "No goal"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {campaign.status?.toString() || "No status"}
                </p>
                <p>
                  <strong>Reward:</strong>{" "}
                  {campaign.reward ? `${Number(campaign.reward) / 1e18} ETH` : "No reward"}
                </p>
                <p>
                  <strong>Target Audience:</strong>{" "}
                  {campaign.targetAudience || "No target audience"}
                </p>
                <p>
                  <strong>Platforms:</strong>{" "}
                  {campaign.targetPlatform?.length > 0 ? 
                    campaign.targetPlatform.map((p: number) => 
                      ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook'][p] || `Platform ${p}`
                    ).join(", ") : "None"}
                </p>
                <p>
                  <strong>Content Types:</strong>{" "}
                  {campaign.contentTypes?.length > 0 ? 
                    campaign.contentTypes.map((c: number) => 
                      ['Post', 'Story', 'Reel', 'Video', 'Article'][c] || `Type ${c}`
                    ).join(", ") : "None"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* All Campaigns Summary */}
      {campaignIds && campaignIds.length > 1 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">All Campaigns Summary:</h3>
          <div className="grid gap-2">
            {campaignIds.map((id: bigint) => (
              <CampaignSummaryCard key={id.toString()} campaignId={id} />
            ))}
          </div>
        </div>
      )}

      {/* Raw Contract Debug */}
      <div className="text-xs text-gray-600">
        <p>✅ Connected to smart contract successfully!</p>
        <p>Found {campaignIds?.length || 0} campaign(s) in the contract.</p>
        {campaignIds && campaignIds.length === 0 && (
          <p className="text-yellow-600 mt-1">
            💡 Create a test campaign using the button below to populate the
            contract.
          </p>
        )}
      </div>
    </div>
  );
}
