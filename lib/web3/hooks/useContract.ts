import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
} from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract";
import { baseSepolia } from "wagmi/chains";

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
  const chainId = useChainId();

  const write = (functionName: string, args?: any[], value?: bigint) => {
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName,
        args,
        value,
        chainId: baseSepolia.id, // Explicitly set chainId to Base Sepolia
      });
    } catch (err) {
      console.error("Error writing to contract:", err);
      throw err;
    }
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
