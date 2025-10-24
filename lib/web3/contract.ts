import contractData from "../../contract.json";

// Ensure contractData is loaded
if (!contractData) {
  throw new Error("Failed to load contract.json");
}

// Contract Address - Prefer environment variable for easy network switching
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ||
  contractData.address ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

// Contract ABI - ensure it's always an array, never undefined
export const CONTRACT_ABI = (
  Array.isArray(contractData.abi) ? contractData.abi : []
) as any[];

// Validate on load
if (CONTRACT_ABI.length === 0) {
  console.error("WARNING: Contract ABI is empty!");
}

// Debug logging - will show in browser console and server logs
if (typeof window !== "undefined") {
  console.log("Contract Configuration (Client):", {
    address: CONTRACT_ADDRESS,
    abiLength: CONTRACT_ABI.length,
    hasAbi: CONTRACT_ABI.length > 0,
    firstFunction: CONTRACT_ABI[0]?.name,
  });
} else {
  console.log("Contract Configuration (Server):", {
    address: CONTRACT_ADDRESS,
    abiLength: CONTRACT_ABI.length,
    hasAbi: CONTRACT_ABI.length > 0,
  });
}

// Helper to get contract config for wagmi hooks
export const getContractConfig = () => {
  // Validate configuration before returning
  if (
    !CONTRACT_ADDRESS ||
    CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000"
  ) {
    throw new Error("Invalid contract address");
  }

  if (!Array.isArray(CONTRACT_ABI) || CONTRACT_ABI.length === 0) {
    throw new Error("Invalid contract ABI");
  }

  return {
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
  };
};
