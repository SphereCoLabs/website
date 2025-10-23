import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygonAmoy, base, baseSepolia } from "wagmi/chains";
import {
  injected,
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

// Define the chains you want to support
export const chains = [sepolia, polygonAmoy, base, baseSepolia] as const;

// WalletConnect Project ID (get from https://cloud.walletconnect.com/)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const config = createConfig({
  chains: [sepolia, polygonAmoy, base, baseSepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
    coinbaseWallet({
      appName: "SphereCo",
      appLogoUrl: "https://sphereco.app/favicon.svg",
    }),
  ],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Declare module for wagmi config type
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
