import { http, createConfig } from "wagmi";
import { mainnet, sepolia, polygonAmoy } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// Define the chains you want to support
export const chains = [sepolia, polygonAmoy] as const;

// WalletConnect Project ID (get from https://cloud.walletconnect.com/)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

export const config = createConfig({
  chains: [sepolia, polygonAmoy],
  connectors: [injected(), metaMask(), walletConnect({ projectId })],
  transports: {
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

// Declare module for wagmi config type
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
