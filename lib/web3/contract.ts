import contractData from "@/contract.json";

// Contract Address - Update this based on your deployment network
export const CONTRACT_ADDRESS = contractData.address as `0x${string}`;

// Contract ABI
export const CONTRACT_ABI = contractData.abi;

// Helper to get contract config for wagmi hooks
export const getContractConfig = () => ({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
});
