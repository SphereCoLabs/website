"use client";

/**
 * EXAMPLE: Submit Application ke Campaign
 *
 * Contoh untuk KOL/Influencer yang ingin apply ke campaign
 */

import { useState } from "react";
import { useSubmitApplication } from "@/lib/web3/hooks";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function SubmitApplicationExample({
  campaignId,
}: {
  campaignId: bigint;
}) {
  const [formData, setFormData] = useState({
    title: "",
    proposal: "",
  });

  const { submitApplication, isPending, isConfirming, isSuccess, error, hash } =
    useSubmitApplication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      submitApplication({
        campaignId,
        title: formData.title,
        proposal: formData.proposal,
      });
    } catch (err) {
      console.error("Error submitting application:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Apply to Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Application Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Application Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Why I'm perfect for this campaign"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Proposal */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Proposal
          </label>
          <textarea
            value={formData.proposal}
            onChange={(e) =>
              setFormData({ ...formData, proposal: e.target.value })
            }
            placeholder="Describe your content ideas, expected reach, timeline, etc."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
            rows={6}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Explain why you're the best fit for this campaign
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isConfirming}
          className="w-full py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
              <span>Submitting application...</span>
            </>
          )}
          {!isPending && !isConfirming && <span>Submit Application</span>}
        </button>
      </form>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900">
              Application submitted successfully!
            </p>
            <p className="text-sm text-green-700 mt-1">
              The brand will review your application soon.
            </p>
            <p className="text-xs text-green-600 mt-2">
              Transaction: {hash?.slice(0, 10)}...{hash?.slice(-8)}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Submission failed</p>
            <p className="text-sm text-red-700 mt-1">{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
