import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygonAmoy, base, baseSepolia } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";

// Define the chains you want to support
export const chains = [sepolia, polygonAmoy, base, baseSepolia] as const;

// WalletConnect Project ID (get from https://cloud.walletconnect.com/)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

// RPC URLs from environment variables
const baseRpcUrl =
  process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org";
const baseSepoliaRpcUrl =
  process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org";

export const config = createConfig({
  chains: [sepolia, polygonAmoy, base, baseSepolia],
  connectors: [
    injected({
      target: "metaMask",
    }),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
    coinbaseWallet({
      appName: "SphereCo",
      appLogoUrl: "https://sphereco.app/favicon.svg",
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [base.id]: http(baseRpcUrl),
    [baseSepolia.id]: http(baseSepoliaRpcUrl),
  },
});

// Declare module for wagmi config type
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
