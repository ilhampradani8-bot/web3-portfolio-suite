import { WhaleTransaction, WhaleFilterOptions } from "../types/whale";
import { NETWORK_EXPLORERS } from "@/lib/rpc-client";

// Known Labels for Whales & Exchanges
const KNOWN_WALLETS: Record<string, string> = {
  "0x28c6c06298d514db089934071355e5743bf21d60": "Binance Hot Wallet 14",
  "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be": "Binance Hot Wallet 6",
  "0xdfd5293d8e347dfe59e90efd55b2956a1343963d": "Kraken Exchange",
  "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503": "Binance Cold Storage",
  "0x742d35cc6634c0532925a3b844bc454e4438f44e": "Bitfinex Wallet",
  "0x1db3439a222c519ab44bb1144fc28167b4fa6ee6": "Uniswap v3 Router",
  "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8": "Binance 7",
  "0xa0ab3715e7f1b62a4b0812be98f79f4c39f1c79c": "Coinbase Prime",
};

// Initial Initial Seed Data for Instant View
const INITIAL_WHALE_TRANSACTIONS: WhaleTransaction[] = [
  {
    id: "tx-1",
    hash: "0x8f2a6b31c9d4e5f7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
    blockNumber: 19842105,
    timestamp: "Just now",
    sender: "0x28c6c06298d514db089934071355e5743bf21d60",
    senderLabel: "Binance Hot Wallet 14",
    receiver: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    receiverLabel: "Whale Wallet #409",
    tokenSymbol: "ETH",
    amount: 1450.5,
    amountUSD: 4641600,
    txFeeUSD: 14.2,
    transactionType: "Transfer",
    network: "Ethereum",
    etherscanUrl: "https://etherscan.io/tx/0x8f2a6b31c9d4e5f7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
  },
  {
    id: "tx-2",
    hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    blockNumber: 19842101,
    timestamp: "2 mins ago",
    sender: "0x1db3439a222c519ab44bb1144fc28167b4fa6ee6",
    senderLabel: "Uniswap v3 Router",
    receiver: "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
    receiverLabel: "Kraken Exchange",
    tokenSymbol: "USDC",
    amount: 2500000,
    amountUSD: 2500000,
    txFeeUSD: 18.5,
    transactionType: "Swap",
    network: "Ethereum",
    etherscanUrl: "https://etherscan.io/tx/0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
  },
  {
    id: "tx-3",
    hash: "0x3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e",
    blockNumber: 19842095,
    timestamp: "5 mins ago",
    sender: "0xa0ab3715e7f1b62a4b0812be98f79f4c39f1c79c",
    senderLabel: "Coinbase Prime",
    receiver: "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503",
    receiverLabel: "Binance Cold Storage",
    tokenSymbol: "WBTC",
    amount: 85.4,
    amountUSD: 5465600,
    txFeeUSD: 22.1,
    transactionType: "Transfer",
    network: "Ethereum",
    etherscanUrl: "https://etherscan.io/tx/0x3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e",
  },
  {
    id: "tx-4",
    hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    blockNumber: 19842080,
    timestamp: "8 mins ago",
    sender: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
    senderLabel: "Whale Wallet #102",
    receiver: "0x1db3439a222c519ab44bb1144fc28167b4fa6ee6",
    receiverLabel: "Uniswap v3 Liquidity Pool",
    tokenSymbol: "ETH",
    amount: 820.0,
    amountUSD: 2624000,
    txFeeUSD: 11.4,
    transactionType: "Deposit",
    network: "Arbitrum",
    etherscanUrl: "https://arbiscan.io/tx/0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
  },
];

// Service function: Ambil Data Whale Transactions (dengan support Real-Time Generator Simulation)
export async function getWhaleTransactions(filters?: WhaleFilterOptions): Promise<WhaleTransaction[]> {
  let txs = [...INITIAL_WHALE_TRANSACTIONS];

  if (filters) {
    if (filters.minUSD > 0) {
      txs = txs.filter((t) => t.amountUSD >= filters.minUSD);
    }
    if (filters.tokenFilter && filters.tokenFilter !== "ALL") {
      txs = txs.filter((t) => t.tokenSymbol === filters.tokenFilter);
    }
    if (filters.networkFilter && filters.networkFilter !== "ALL") {
      txs = txs.filter((t) => t.network === filters.networkFilter);
    }
  }

  return txs;
}

// Function to generate a new live synthetic whale transaction for real-time WebSocket simulation
export function generateLiveWhaleTransaction(): WhaleTransaction {
  const tokens: Array<"ETH" | "USDC" | "USDT" | "WBTC"> = ["ETH", "USDC", "USDT", "WBTC"];
  const networks: Array<"Ethereum" | "Polygon" | "Arbitrum"> = ["Ethereum", "Polygon", "Arbitrum"];
  const types: Array<"Transfer" | "Swap" | "Deposit"> = ["Transfer", "Swap", "Deposit"];
  
  const token = tokens[Math.floor(Math.random() * tokens.length)];
  const network = networks[Math.floor(Math.random() * networks.length)];
  const txType = types[Math.floor(Math.random() * types.length)];

  let amount = 0;
  let amountUSD = 0;

  if (token === "ETH") {
    amount = parseFloat((Math.random() * 2000 + 100).toFixed(2));
    amountUSD = Math.round(amount * 3200);
  } else if (token === "WBTC") {
    amount = parseFloat((Math.random() * 100 + 10).toFixed(2));
    amountUSD = Math.round(amount * 64000);
  } else {
    amount = Math.round(Math.random() * 5000000 + 500000);
    amountUSD = amount;
  }

  const randomHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  const senderAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  const receiverAddress = "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

  return {
    id: `tx-live-${Date.now()}`,
    hash: randomHash,
    blockNumber: Math.floor(19842100 + Math.random() * 100),
    timestamp: "Just now",
    sender: senderAddress,
    senderLabel: KNOWN_WALLETS[senderAddress] || `Whale Wallet #${Math.floor(Math.random() * 900 + 100)}`,
    receiver: receiverAddress,
    receiverLabel: KNOWN_WALLETS[receiverAddress] || `Exchange / Vault #${Math.floor(Math.random() * 900 + 100)}`,
    tokenSymbol: token,
    amount,
    amountUSD,
    txFeeUSD: parseFloat((Math.random() * 25 + 5).toFixed(2)),
    transactionType: txType,
    network,
    etherscanUrl: `https://${network === "Arbitrum" ? "arbiscan.io" : network === "Polygon" ? "polygonscan.com" : "etherscan.io"}/tx/${randomHash}`,
  };
}
