import {
  useContractRead,
  useContractWrite,
  useTransactionReceipt,
} from "./useContract";
import type { DraftWork } from "../types";

/**
 * Hook to get draft work by ID
 */
export function useGetDraftWork(draftWorkId: bigint) {
  return useContractRead<DraftWork>("getDraftWork", [draftWorkId]);
}

/**
 * Hook to submit draft work (KOL)
 */
export function useSubmitDraftWork() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const submitDraftWork = (campaignId: bigint, data: string) => {
    write("submitDraftWork", [campaignId, data]);
  };

  return {
    submitDraftWork,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to approve draft work (Organizer)
 */
export function useApproveDraftWork() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const approveDraftWork = (campaignId: bigint, draftWorkId: bigint) => {
    write("approveDraftWork", [campaignId, draftWorkId]);
  };

  return {
    approveDraftWork,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to reject draft work (Organizer)
 */
export function useRejectDraftWork() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const rejectDraftWork = (campaignId: bigint, draftWorkId: bigint) => {
    write("rejectDraftWork", [campaignId, draftWorkId]);
  };

  return {
    rejectDraftWork,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to publish content (KOL)
 */
export function usePublishContent() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const publishContent = (campaignId: bigint, data: string) => {
    write("publishContent", [campaignId, data]);
  };

  return {
    publishContent,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to share analytics (KOL)
 */
export function useShareAnalytic() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const shareAnalytic = (campaignId: bigint, data: string) => {
    write("shareAnalytic", [campaignId, data]);
  };

  return {
    shareAnalytic,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
