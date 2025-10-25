"use client";

import { useState } from "react";
import { useCreateCampaign } from "@/lib/web3/hooks/useCampaign";
import { parseEther } from "viem";
import { CampaignPlatform, CampaignContentType } from "@/lib/web3/types";

export default function CreateTestCampaign() {
  const [isCreating, setIsCreating] = useState(false);
  const { createCampaign, isPending, isConfirming, isSuccess, error, hash } =
    useCreateCampaign();

  const handleCreateTestCampaign = async () => {
    if (isCreating || isPending) return;

    setIsCreating(true);

    try {
      const now = Math.floor(Date.now() / 1000);
      const testCampaign = {
        title: "Test Campaign " + Date.now(),
        description: "This is a test campaign created from the frontend",
        brief: "Test campaign brief for testing purposes",
        goal: "To test the campaign creation functionality",
        startDate: BigInt(now + 300), // Start 5 minutes from now
        endDate: BigInt(now + 86400 * 30), // 30 days from now
        targetPlatform: CampaignPlatform.Instagram, // Single platform
        contentTypes: CampaignContentType.Post, // Single content type
        targetAudience: "Test audience",
        guideline: "Test guidelines",
        value: parseEther("0.0001"), // 0.0001 ETH
      };

      console.log("Creating test campaign:", testCampaign);
      createCampaign(testCampaign);
    } catch (err) {
      console.error("Error creating test campaign:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">
        Create Test Campaign
      </h3>

      <div className="space-y-3">
        <p className="text-sm text-blue-700">
          If you don't see any campaigns, create a test campaign to populate the
          smart contract.
        </p>

        <button
          onClick={handleCreateTestCampaign}
          disabled={isCreating || isPending || isConfirming}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isCreating || isPending
            ? "Creating..."
            : isConfirming
            ? "Confirming..."
            : "Create Test Campaign"}
        </button>

        {hash && (
          <div className="mt-3 p-3 bg-blue-100 rounded text-xs">
            <p className="font-semibold text-blue-800">Transaction Hash:</p>
            <p className="break-all text-blue-600">{hash}</p>
          </div>
        )}

        {isSuccess && (
          <div className="mt-3 p-3 bg-green-100 rounded text-sm text-green-800">
            ✅ Campaign created successfully! Refresh the page to see it.
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-100 rounded text-sm text-red-800">
            ❌ Error: {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
