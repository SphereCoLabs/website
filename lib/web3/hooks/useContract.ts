import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract";

/**
 * Hook to read from the smart contract
 */
export function useContractRead<T = any>(functionName: string, args?: any[]) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName,
    args,
  }) as { data: T; isLoading: boolean; error: Error | null };
}

/**
 * Hook to write to the smart contract
 */
export function useContractWrite() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const write = (functionName: string, args?: any[], value?: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName,
      args,
      value,
    });
  };

  return {
    write,
    hash,
    isPending,
    error,
  };
}

/**
 * Hook to wait for transaction confirmation
 */
export function useTransactionReceipt(hash?: `0x${string}`) {
  return useWaitForTransactionReceipt({
    hash,
  });
}
