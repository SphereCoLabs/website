"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Wallet, LogOut } from "lucide-react";

export function Web3ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

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
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
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
              await connectAsync({ connector });
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
