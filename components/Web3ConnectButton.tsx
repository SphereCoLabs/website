"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { Wallet, LogOut, AlertTriangle } from "lucide-react";
import { baseSepolia } from "wagmi/chains";

export function Web3ConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const isCorrectNetwork = chainId === baseSepolia.id;

  const handleSwitchNetwork = async () => {
    try {
      await switchChain({ chainId: baseSepolia.id });
    } catch (error) {
      console.error("Error switching network:", error);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        {/* Network Indicator */}
        <div
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
            isCorrectNetwork
              ? "bg-green-50 border border-green-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isCorrectNetwork ? "bg-green-500" : "bg-yellow-500"
            }`}
          ></div>
          <span className="text-sm font-medium text-gray-700">
            {chain?.name || "Unknown Network"}
          </span>
        </div>

        {/* Wrong Network Warning */}
        {!isCorrectNetwork && (
          <button
            onClick={handleSwitchNetwork}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors animate-pulse"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="hidden md:inline">Switch to Base Sepolia</span>
            <span className="md:hidden">Wrong Network</span>
          </button>
        )}

        {/* Address Display */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>

        {/* Disconnect Button */}
        <button
          onClick={handleDisconnect}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={async () => {
            try {
              const result = await connectAsync({
                connector,
                chainId: baseSepolia.id, // Force connect to Base Sepolia
              });

              // If connected but wrong network, prompt to switch
              if (result.chainId !== baseSepolia.id) {
                try {
                  await switchChain({ chainId: baseSepolia.id });
                } catch (switchError) {
                  console.error(
                    "Error switching to Base Sepolia:",
                    switchError
                  );
                  alert(
                    "Please manually switch your wallet to Base Sepolia network"
                  );
                }
              }
            } catch (error) {
              console.error("Error connecting wallet:", error);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect {connector.name}</span>
        </button>
      ))}
    </div>
  );
}
