"use client";

/**
 * EXAMPLE: Create Campaign dengan Smart Contract
 *
 * File ini adalah contoh implementasi untuk membuat campaign baru
 * dan mengirim transaksi ke smart contract.
 */

import { useState } from "react";
import { useCreateCampaign } from "@/lib/web3/hooks";
import { parseEther } from "viem";
import { CampaignPlatform, CampaignContentType } from "@/lib/web3/types";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function CreateCampaignExample() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brief: "",
    goal: "",
    targetAudience: "",
    guideline: "",
    rewardAmount: "",
  });

  const { createCampaign, isPending, isConfirming, isSuccess, error, hash } =
    useCreateCampaign();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Calculate start and end dates
      const startDate = BigInt(Math.floor(Date.now() / 1000)); // Now
      const endDate = BigInt(Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60); // 30 days from now

      // Parse reward amount to Wei
      const rewardInWei = parseEther(formData.rewardAmount);

      // Create campaign
      createCampaign({
        title: formData.title,
        description: formData.description,
        brief: formData.brief,
        goal: formData.goal,
        startDate,
        endDate,
        targetPlatform: CampaignPlatform.Instagram, // You can make this dynamic
        contentTypes: CampaignContentType.Post,
        targetAudience: formData.targetAudience,
        guideline: formData.guideline,
        value: rewardInWei,
      });
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Campaign</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Brief */}
        <div>
          <label className="block text-sm font-medium mb-2">Brief</label>
          <input
            type="text"
            value={formData.brief}
            onChange={(e) =>
              setFormData({ ...formData, brief: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium mb-2">Goal</label>
          <input
            type="text"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Target Audience
          </label>
          <input
            type="text"
            value={formData.targetAudience}
            onChange={(e) =>
              setFormData({ ...formData, targetAudience: e.target.value })
            }
            placeholder="e.g., 18-35 years old"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Guideline */}
        <div>
          <label className="block text-sm font-medium mb-2">Guideline</label>
          <textarea
            value={formData.guideline}
            onChange={(e) =>
              setFormData({ ...formData, guideline: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        {/* Reward Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Reward Amount (ETH)
          </label>
          <input
            type="number"
            step="0.001"
            value={formData.rewardAmount}
            onChange={(e) =>
              setFormData({ ...formData, rewardAmount: e.target.value })
            }
            placeholder="0.1"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            This amount will be locked in the smart contract
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Waiting for wallet...</span>
            </>
          )}
          {isConfirming && (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Confirming transaction...</span>
            </>
          )}
          {!isPending && !isConfirming && <span>Create Campaign</span>}
        </button>
      </form>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">
              Campaign created successfully!
            </p>
            <p className="text-sm text-green-700 mt-1">
              Transaction hash:{" "}
              <code className="text-xs bg-green-100 px-2 py-1 rounded">
                {hash}
              </code>
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Transaction failed</p>
            <p className="text-sm text-red-700 mt-1">{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
