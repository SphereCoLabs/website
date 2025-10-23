import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import {
  resolveBasename,
  BasenameResult,
  formatAddressWithBasename,
} from "../basename";
import { base, baseSepolia } from "wagmi/chains";

/**
 * Hook to resolve and manage Basename for the connected wallet
 */
export function useBasename() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [basename, setBasename] = useState<BasenameResult>({
    name: null,
    avatar: null,
    description: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBasename() {
      if (!address || !isConnected) {
        setBasename({ name: null, avatar: null, description: null });
        return;
      }

      // Only resolve on Base networks
      if (chainId !== base.id && chainId !== baseSepolia.id) {
        setBasename({ name: null, avatar: null, description: null });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await resolveBasename(address, chainId);
        setBasename(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to resolve Basename"
        );
        setBasename({ name: null, avatar: null, description: null });
      } finally {
        setIsLoading(false);
      }
    }

    fetchBasename();
  }, [address, isConnected, chainId]);

  return {
    basename: basename.name,
    avatar: basename.avatar,
    description: basename.description,
    displayName: address ? formatAddressWithBasename(address, basename) : null,
    isLoading,
    error,
    hasBasename: Boolean(basename.name),
    isBaseNetwork: chainId === base.id || chainId === baseSepolia.id,
  };
}
