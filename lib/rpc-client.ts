import { createPublicClient, http } from "viem";
import { mainnet, sepolia, polygon, arbitrum, optimism, base, bsc, avalanche } from "viem/chains";

// Alchemy API Key
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "alch_DXNMWIMwQ-2-KsLr5ywty";

export const ALCHEMY_HTTP_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
export const ALCHEMY_WS_URL = `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Viem Multi-Chain Public Clients powered by Alchemy EVM Nodes
export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(`https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http(`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(`https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const baseClient = createPublicClient({
  chain: base,
  transport: http(`https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const bscClient = createPublicClient({
  chain: bsc,
  transport: http(`https://bnb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const avalancheClient = createPublicClient({
  chain: avalanche,
  transport: http(`https://avax-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const isWebSocketEnabled = (): boolean => true;
export const getAlchemyWsUrl = (): string => ALCHEMY_WS_URL;

