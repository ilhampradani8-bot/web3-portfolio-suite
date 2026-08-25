import { createPublicClient, http } from "viem";
import { mainnet, polygon, arbitrum, optimism } from "viem/chains";

// Public RPC Clients for EVM Chains
export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http("https://cloudflare-eth.com"),
});

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http("https://polygon-rpc.com"),
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http("https://arb1.arbitrum.io/rpc"),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http("https://mainnet.optimism.io"),
});

export const NETWORK_EXPLORERS: Record<string, string> = {
  ethereum: "https://etherscan.io",
  polygon: "https://polygonscan.com",
  arbitrum: "https://arbiscan.io",
  optimism: "https://optimistic.etherscan.io",
};
