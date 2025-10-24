"use client";

import { useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { ReactNode } from "react";

interface NetworkGuardProps {
  children: ReactNode;
  showWarning?: boolean;
}

export function NetworkGuard({
  children,
  showWarning = true,
}: NetworkGuardProps) {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const isCorrectNetwork = chainId === baseSepolia.id;

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: baseSepolia.id });
    } catch (error) {
      console.error("Error switching network:", error);
      alert(
        "Please manually switch your wallet to Base Sepolia network (Chain ID: 84532)"
      );
    }
  };

  if (!isCorrectNetwork && showWarning) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Wrong Network Detected
          </h2>

          <p className="text-gray-600 mb-6">
            You are currently connected to{" "}
            <span className="font-semibold">
              {getCurrentNetworkName(chainId)}
            </span>
            .
            <br />
            Please switch to{" "}
            <span className="font-semibold text-blue-600">Base Sepolia</span> to
            continue.
          </p>

          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-semibold">Base Sepolia</span>
              </div>
              <div className="flex justify-between">
                <span>Chain ID:</span>
                <span className="font-semibold">84532</span>
              </div>
              <div className="flex justify-between">
                <span>RPC URL:</span>
                <span className="font-semibold text-xs">sepolia.base.org</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSwitchNetwork}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <RefreshCcw className="w-5 h-5 animate-spin" />
                <span>Switching Network...</span>
              </>
            ) : (
              <>
                <RefreshCcw className="w-5 h-5" />
                <span>Switch to Base Sepolia</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            If automatic switching doesn't work, please switch manually in your
            wallet
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function getCurrentNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: "Ethereum Mainnet",
    11155111: "Ethereum Sepolia",
    80002: "Polygon Amoy",
    8453: "Base Mainnet",
    84532: "Base Sepolia",
  };

  return networks[chainId] || `Unknown Network (${chainId})`;
}
