import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getContractConfig } from "../contract";
import type { Campaign, CreateCampaignParams } from "../types";
import { parseEther } from "viem";
import { useEffect, useState } from "react";
import { baseSepolia } from "wagmi/chains";

/**
 * Hook to get a campaign by ID
 */
export function useGetCampaign(campaignId: bigint) {
  try {
    const contractConfig = getContractConfig();
    return useReadContract({
      ...contractConfig,
      functionName: "getCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    }) as { data: Campaign; isLoading: boolean; error: Error | null };
  } catch (error) {
    console.error("Error in useGetCampaign:", error);
    return {
      data: undefined,
      isLoading: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    } as any;
  }
}

/**
 * Hook to get all campaign IDs
 */
export function useGetAllCampaignIds() {
  try {
    const contractConfig = getContractConfig();
    return useReadContract({
      ...contractConfig,
      functionName: "getAllCampaignIds",
      chainId: baseSepolia.id,
    }) as { data: bigint[]; isLoading: boolean; error: Error | null };
  } catch (error) {
    console.error("Error in useGetAllCampaignIds:", error);
    return {
      data: undefined,
      isLoading: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    } as any;
  }
}

/**
 * Hook to get campaign count
 */
export function useGetCampaignCount() {
  try {
    const contractConfig = getContractConfig();
    return useReadContract({
      ...contractConfig,
      functionName: "getCampaignCount",
      chainId: baseSepolia.id,
    }) as { data: bigint; isLoading: boolean; error: Error | null };
  } catch (error) {
    console.error("Error in useGetCampaignCount:", error);
    return {
      data: undefined,
      isLoading: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    } as any;
  }
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
  const contractConfig = getContractConfig();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createCampaign = (params: CreateCampaignParams) => {
    writeContract({
      ...contractConfig,
      functionName: "createCampaign",
      args: [
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
      value: params.value, // Payment value
      chainId: baseSepolia.id,
    });
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
  const contractConfig = getContractConfig();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const cancelCampaign = (campaignId: bigint) => {
    writeContract({
      ...contractConfig,
      functionName: "cancelCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    });
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
  const contractConfig = getContractConfig();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const completeCampaign = (campaignId: bigint) => {
    writeContract({
      ...contractConfig,
      functionName: "completeCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    });
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
  const contractConfig = getContractConfig();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdrawCampaign = (campaignId: bigint) => {
    writeContract({
      ...contractConfig,
      functionName: "withdrawCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    });
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
  const contractConfig = getContractConfig();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const refundCampaign = (campaignId: bigint) => {
    writeContract({
      ...contractConfig,
      functionName: "refundCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    });
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
