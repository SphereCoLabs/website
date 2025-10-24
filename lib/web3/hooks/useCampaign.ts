import {
  useContractRead,
  useContractWrite,
  useTransactionReceipt,
} from "./useContract";
import type { Campaign, CreateCampaignParams } from "../types";
import { parseEther } from "viem";
import { useEffect, useState } from "react";

/**
 * Hook to get a campaign by ID
 */
export function useGetCampaign(campaignId: bigint) {
  return useContractRead<Campaign>("getCampaign", [campaignId]);
}

/**
 * Hook to get all campaign IDs
 */
export function useGetAllCampaignIds() {
  return useContractRead<bigint[]>("getAllCampaignIds");
}

/**
 * Hook to get campaign count
 */
export function useGetCampaignCount() {
  return useContractRead<bigint>("getCampaignCount");
}

/**
 * Hook to get all campaigns with full data
 * This fetches all campaign IDs and their complete data
 */
export function useGetAllCampaigns() {
  const {
    data: idsData,
    isLoading: idsLoading,
    error: idsError,
  } = useGetAllCampaignIds();
  const [campaigns, setCampaigns] = useState<
    Array<{ id: bigint; data: Campaign | null }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (idsData && Array.isArray(idsData)) {
      setIsLoading(false);
      // Initial setup with IDs
      setCampaigns(idsData.map((id: bigint) => ({ id, data: null })));
    } else if (!idsLoading && !idsData) {
      setIsLoading(false);
      setCampaigns([]);
    }
  }, [idsData, idsLoading]);

  return {
    campaigns,
    isLoading: idsLoading || isLoading,
    error: idsError,
  };
}

/**
 * Hook to create a campaign
 */
export function useCreateCampaign() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const createCampaign = (params: CreateCampaignParams) => {
    write(
      "createCampaign",
      [
        params.title,
        params.description,
        params.brief,
        params.goal,
        params.startDate,
        params.endDate,
        params.targetPlatform,
        params.contentTypes,
        params.targetAudience,
        params.guideline,
      ],
      params.value // Payment value
    );
  };

  return {
    createCampaign,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to cancel a campaign
 */
export function useCancelCampaign() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const cancelCampaign = (campaignId: bigint) => {
    write("cancelCampaign", [campaignId]);
  };

  return {
    cancelCampaign,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to complete a campaign
 */
export function useCompleteCampaign() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const completeCampaign = (campaignId: bigint) => {
    write("completeCampaign", [campaignId]);
  };

  return {
    completeCampaign,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to withdraw campaign funds
 */
export function useWithdrawCampaign() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const withdrawCampaign = (campaignId: bigint) => {
    write("withdrawCampaign", [campaignId]);
  };

  return {
    withdrawCampaign,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to refund campaign
 */
export function useRefundCampaign() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const refundCampaign = (campaignId: bigint) => {
    write("refundCampaign", [campaignId]);
  };

  return {
    refundCampaign,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
