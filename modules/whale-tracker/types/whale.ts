export interface WhaleTransaction {
  id: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  sender: string;
  senderLabel?: string;
  receiver: string;
  receiverLabel?: string;
  tokenSymbol: "ETH" | "USDC" | "USDT" | "WBTC";
  amount: number;
  amountUSD: number;
  txFeeUSD: number;
  transactionType: "Transfer" | "Swap" | "Deposit" | "Mint";
  network: "Ethereum" | "Polygon" | "Arbitrum";
  etherscanUrl: string;
}

export interface WhaleFilterOptions {
  minUSD: number;
  tokenFilter: string;
  networkFilter: string;
}
