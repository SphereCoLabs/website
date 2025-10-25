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
  // Minimal valid ABI fallback - prevents wagmi from crashing
  const minimalAbi = [
    {
      type: "function",
      name: "placeholder",
      inputs: [],
      outputs: [],
      stateMutability: "view",
    },
  ];

  // Check validity - CONTRACT_ABI sudah guaranteed array dari contract.ts
  const isAbiValid =
    CONTRACT_ABI && Array.isArray(CONTRACT_ABI) && CONTRACT_ABI.length > 0;
  const isAddressValid =
    CONTRACT_ADDRESS &&
    CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
  const isValidConfig = isAddressValid && isAbiValid;

  // Safe values - guaranteed to be valid types
  const safeAddress: `0x${string}` = isAddressValid
    ? CONTRACT_ADDRESS
    : "0x0000000000000000000000000000000000000000";
  const safeAbi: any[] = isAbiValid ? CONTRACT_ABI : minimalAbi;
  const safeFunctionName: string = isAbiValid ? functionName : "placeholder";
  const safeArgs: readonly unknown[] | undefined = args
    ? (args as readonly unknown[])
    : undefined;

  // Build config object explicitly
  const contractConfig = {
    address: safeAddress,
    abi: safeAbi,
    functionName: safeFunctionName,
    ...(safeArgs ? { args: safeArgs } : {}),
    chainId: baseSepolia.id, // Explicitly set chainId to Base Sepolia
    query: {
      enabled: isValidConfig,
    },
  };

  // Always call the hook - React rules
  const result = useReadContract(contractConfig);

  // Return error state if invalid config, otherwise return result
  if (!isValidConfig) {
    return {
      data: undefined as T,
      isLoading: false,
      error: new Error("Contract configuration is invalid"),
      refetch: () => Promise.resolve({ data: undefined }),
    } as any;
  }

  return result as any;
}

/**
 * Hook to write to the smart contract
 */
export function useContractWrite() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const chainId = useChainId();

  const write = (functionName: string, args?: any[], value?: bigint) => {
    // Validate contract configuration before using
    const isValidConfig =
      CONTRACT_ADDRESS &&
      CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000" &&
      CONTRACT_ABI &&
      Array.isArray(CONTRACT_ABI) &&
      CONTRACT_ABI.length > 0;

    if (!isValidConfig) {
      console.error("Contract configuration is invalid:", {
        address: CONTRACT_ADDRESS,
        hasAddress: !!CONTRACT_ADDRESS,
        hasAbi: !!CONTRACT_ABI,
        isArray: Array.isArray(CONTRACT_ABI),
        abiLength: CONTRACT_ABI?.length,
      });
      throw new Error("Contract configuration is invalid");
    }

    try {
      const config: any = {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName,
        chainId: baseSepolia.id, // Explicitly set chainId to Base Sepolia
      };

      if (args && args.length > 0) {
        config.args = args;
      }

      if (value) {
        config.value = value;
      }

      writeContract(config);
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
