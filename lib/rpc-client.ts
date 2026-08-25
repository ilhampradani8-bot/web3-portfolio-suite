import { createPublicClient, http, webSocket } from "viem";
import { mainnet, sepolia, polygon } from "viem/chains";

// Detect Alchemy Key from Environment Variables
const ALCHEMY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";
const ALCHEMY_HTTP_URL = ALCHEMY_KEY
  ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
  : "https://cloudflare-eth.com"; // Cloudflare Web3 Public RPC Node

const ALCHEMY_WS_URL = ALCHEMY_KEY
  ? `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
  : null;

// Viem Public Client powered by Alchemy HTTP RPC Node
export const ethereumClient = createPublicClient({
  chain: mainnet,
  transport: http(ALCHEMY_HTTP_URL),
});

// Viem Sepolia Testnet Public Client
export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Helper to check if WebSocket is available with Alchemy Key
export const isWebSocketEnabled = (): boolean => {
  return Boolean(ALCHEMY_WS_URL);
};

export const getAlchemyWsUrl = (): string | null => {
  return ALCHEMY_WS_URL;
};
