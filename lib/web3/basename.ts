import { base, baseSepolia } from "wagmi/chains";

/**
 * Basename utility functions for resolving ENS names on Base network
 */

export interface BasenameResult {
  name: string | null;
  avatar: string | null;
  description: string | null;
}

/**
 * Resolve Basename from wallet address
 * @param address - Wallet address to resolve
 * @param chainId - Chain ID (base or baseSepolia)
 * @returns Promise<BasenameResult>
 */
export async function resolveBasename(
  address: string,
  chainId: number = base.id
): Promise<BasenameResult> {
  try {
    // Use Base's public resolver endpoint
    const baseUrl =
      chainId === base.id
        ? "https://resolver-api.basename.app"
        : "https://resolver-api-sepolia.basename.app";

    const response = await fetch(`${baseUrl}/v1/name/${address}`);

    if (!response.ok) {
      return { name: null, avatar: null, description: null };
    }

    const data = await response.json();

    return {
      name: data.name || null,
      avatar: data.avatar || null,
      description: data.description || null,
    };
  } catch (error) {
    console.warn("Failed to resolve Basename:", error);
    return { name: null, avatar: null, description: null };
  }
}

/**
 * Format address with Basename if available
 * @param address - Wallet address
 * @param basename - Basename result
 * @returns Formatted display name
 */
export function formatAddressWithBasename(
  address: string,
  basename: BasenameResult
): string {
  if (basename.name) {
    return basename.name;
  }

  // Fallback to shortened address
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Generate user data with Basename integration
 * @param address - Wallet address
 * @param role - User role
 * @param chainId - Chain ID
 * @returns Promise<UserData>
 */
export async function generateUserDataWithBasename(
  address: string,
  role: "organizer" | "influencer",
  chainId: number = base.id
) {
  const basename = await resolveBasename(address, chainId);

  const displayName = basename.name || `User ${address.slice(0, 6)}`;
  const email = basename.name
    ? `${basename.name.replace(".base.eth", "")}@basename.user`
    : `${address.slice(0, 8)}@wallet.user`;

  return {
    name: displayName,
    email: email,
    role: role,
    walletAddress: address,
    basename: basename.name,
    avatar: basename.avatar,
    description: basename.description,
    signedInAt: new Date().toISOString(),
    chainId: chainId,
  };
}
