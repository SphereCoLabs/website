import {
  useContractRead,
  useContractWrite,
  useTransactionReceipt,
} from "./useContract";
import type { Application, SubmitApplicationParams } from "../types";

/**
 * Hook to get an application by ID
 */
export function useGetApplication(applicationId: bigint) {
  return useContractRead<Application>("getApplication", [applicationId]);
}

/**
 * Hook to get all applications for a campaign
 */
export function useGetAllApplications(campaignId: bigint) {
  return useContractRead<bigint[]>("getAllApplication", [campaignId]);
}

/**
 * Hook to submit an application
 */
export function useSubmitApplication() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const submitApplication = (params: SubmitApplicationParams) => {
    write("submitApplication", [
      params.campaignId,
      params.title,
      params.proposal,
    ]);
  };

  return {
    submitApplication,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to approve an application (Organizer only)
 */
export function useApproveApplication() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const approveApplication = (campaignId: bigint, applicationId: bigint) => {
    write("approveApplication", [campaignId, applicationId]);
  };

  return {
    approveApplication,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to reject an application (Organizer only)
 */
export function useRejectApplication() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const rejectApplication = (campaignId: bigint, applicationId: bigint) => {
    write("rejectApplication", [campaignId, applicationId]);
  };

  return {
    rejectApplication,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to cancel an application (Applicant only)
 */
export function useCancelApplication() {
  const { write, hash, isPending, error } = useContractWrite();
  const { isLoading: isConfirming, isSuccess } = useTransactionReceipt(hash);

  const cancelApplication = (campaignId: bigint, applicationId: bigint) => {
    write("cancelApplication", [campaignId, applicationId]);
  };

  return {
    cancelApplication,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}
