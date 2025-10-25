import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { getContractConfig } from "../contract";
import type { Campaign, CreateCampaignParams } from "../types";
import { parseEther } from "viem";
import { useEffect, useState, useMemo } from "react";
import { baseSepolia } from "wagmi/chains";

/**
 * Parser function to convert raw contract data array to Campaign object
 */
function parseCampaignData(rawData: any[]): Campaign | null {
  if (!Array.isArray(rawData) || rawData.length < 12) {
    console.warn("Invalid campaign data format:", rawData);
    return null;
  }

  try {
    return {
      title: rawData[0] || "",
      description: rawData[1] || "",
      brief: rawData[2] || "",
      goal: rawData[3] || "",
      startDate: BigInt(rawData[4] || 0),
      endDate: BigInt(rawData[5] || 0),
      targetPlatform: Array.isArray(rawData[6]) ? rawData[6] : [],
      contentTypes: Array.isArray(rawData[7]) ? rawData[7] : [],
      targetAudience: rawData[8] || "",
      guideline: rawData[9] || "",
      reward: BigInt(rawData[10] || 0),
      status: Number(rawData[11] || 0),
    };
  } catch (error) {
    console.error("Error parsing campaign data:", error, rawData);
    return null;
  }
}

/**
 * Hook to get a campaign by ID
 */
export function useGetCampaign(campaignId: bigint) {
  try {
    const contractConfig = getContractConfig();

    // Debug: Log when campaign ID 0 is being requested
    if (campaignId === BigInt(0)) {
      console.warn("🚨 WARNING: useGetCampaign called with campaignId 0!");
      console.trace("Stack trace for campaignId 0 call:");
    }

    console.log("useGetCampaign called with:", {
      campaignId: campaignId.toString(),
      contractConfig,
    });

    // Prevent calling contract with campaign ID 0 as it doesn't exist
    if (campaignId === BigInt(0)) {
      return {
        data: undefined,
        isLoading: false,
        error: new Error(
          "Campaign ID 0 does not exist. Campaigns start from ID 1."
        ),
      } as any;
    }

    const result = useReadContract({
      ...contractConfig,
      functionName: "getCampaign",
      args: [campaignId],
      chainId: baseSepolia.id,
    }) as { data: any[]; isLoading: boolean; error: Error | null };

    // Parse the raw data into Campaign object
    const parsedData = result.data ? parseCampaignData(result.data) : null;

    console.log("useGetCampaign result:", {
      campaignId: campaignId.toString(),
      rawData: result.data,
      parsedData,
      isLoading: result.isLoading,
      error: result.error,
    });

    return {
      ...result,
      data: parsedData,
    } as { data: Campaign | null; isLoading: boolean; error: Error | null };
  } catch (error) {
    console.error("Error in useGetCampaign:", error);
    return {
      data: null,
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
    const result = useReadContract({
      ...contractConfig,
      functionName: "getAllCampaignIds",
      chainId: baseSepolia.id,
    }) as { data: bigint[]; isLoading: boolean; error: Error | null };

    console.log("useGetAllCampaignIds result:", {
      data: result.data,
      dataLength: result.data?.length,
      isLoading: result.isLoading,
      error: result.error,
    });

    return result;
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
 * This is a simple implementation that returns IDs with placeholder data
 * In a real implementation, you would use useReadContracts to batch fetch all campaigns
 */
export function useGetAllCampaigns() {
  const {
    data: idsData,
    isLoading: idsLoading,
    error: idsError,
  } = useGetAllCampaignIds();

  const campaigns = useMemo(() => {
    if (!idsData || !Array.isArray(idsData)) return [];

    // For now, return campaign structure with IDs but no actual data
    // This will trigger the fallback title in the UI: `Campaign ${String(id)}`
    return idsData.map((id: bigint) => ({
      id,
      data: null, // Data akan di-fetch individual oleh components yang membutuhkannya
    }));
  }, [idsData]);

  return {
    campaigns,
    isLoading: idsLoading,
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
