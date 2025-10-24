import contractData from "@/contract.json";

// Contract Address - Prefer environment variable for easy network switching
export const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) ||
  (contractData.address as `0x${string}`);

// Contract ABI
export const CONTRACT_ABI = contractData.abi;

// Helper to get contract config for wagmi hooks
export const getContractConfig = () => ({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
});
