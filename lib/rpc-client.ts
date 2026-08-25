import { createPublicClient, http, webSocket } from "viem";
import { mainnet, sepolia } from "viem/chains";

// Your Alchemy API Key
export const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "alch_DXNMWIMwQ-2-KsLr5ywty";

export const ALCHEMY_HTTP_URL = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;
export const ALCHEMY_WS_URL = `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Viem Public Client powered by Alchemy EVM Node
export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(ALCHEMY_HTTP_URL),
});

// Viem Sepolia Testnet Public Client
export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`),
});

export const isWebSocketEnabled = (): boolean => true;
export const getAlchemyWsUrl = (): string => ALCHEMY_WS_URL;
