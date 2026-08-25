import { StakingPoolInfo, UserStakingAccount, StakingTxHistoryItem } from "../types/staking";

// Sepolia Liquid Vault Contract Info
export const SEPOLIA_STAKING_CONTRACT_ADDRESS = "0x358AA13c52544EC2c6e12302686277F3763f4739";

export const STAKING_POOLS: StakingPoolInfo[] = [
  {
    id: "sepolia-eth",
    poolName: "Sepolia Testnet Liquid Vault",
    networkName: "Sepolia Testnet",
    chainId: 11155111,
    chainIdHex: "0xaa36a7",
    tokenSymbol: "ETH",
    totalStaked: 48250.75,
    apyPercentage: 12.4,
    lockPeriodDays: 0,
    rewardTokenSymbol: "NEXUS",
    contractAddress: "0x358AA13c52544EC2c6e12302686277F3763f4739",
    explorerUrl: "https://sepolia.etherscan.io",
    isTestnet: true,
    badge: "🟢 Free Testnet • Verified",
  },
  {
    id: "mainnet-eth",
    poolName: "Ethereum Mainnet Institutional Vault",
    networkName: "Ethereum Mainnet",
    chainId: 1,
    chainIdHex: "0x1",
    tokenSymbol: "ETH",
    totalStaked: 184520.0,
    apyPercentage: 4.8,
    lockPeriodDays: 0,
    rewardTokenSymbol: "stETH",
    contractAddress: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
    explorerUrl: "https://etherscan.io",
    isTestnet: false,
    badge: "🔴 Mainnet Protocol",
  },
  {
    id: "arbitrum-eth",
    poolName: "Arbitrum One L2 Yield Protocol",
    networkName: "Arbitrum One (L2)",
    chainId: 42161,
    chainIdHex: "0xa4b1",
    tokenSymbol: "ETH",
    totalStaked: 94100.5,
    apyPercentage: 8.5,
    lockPeriodDays: 7,
    rewardTokenSymbol: "ARB-YIELD",
    contractAddress: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    explorerUrl: "https://arbiscan.io",
    isTestnet: false,
    badge: "🔴 Mainnet L2",
  },
  {
    id: "polygon-matic",
    poolName: "Polygon PoS Liquid Staking",
    networkName: "Polygon PoS",
    chainId: 137,
    chainIdHex: "0x89",
    tokenSymbol: "POL",
    totalStaked: 5200000.0,
    apyPercentage: 7.1,
    lockPeriodDays: 0,
    rewardTokenSymbol: "stPOL",
    contractAddress: "0x0000000000000000000000000000000000001010",
    explorerUrl: "https://polygonscan.com",
    isTestnet: false,
    badge: "🔴 Mainnet PoS",
  },
  {
    id: "base-eth",
    poolName: "Base Coinbase L2 Yield Vault",
    networkName: "Base (Coinbase L2)",
    chainId: 8453,
    chainIdHex: "0x2105",
    tokenSymbol: "ETH",
    totalStaked: 61200.0,
    apyPercentage: 9.8,
    lockPeriodDays: 0,
    rewardTokenSymbol: "BASE-YIELD",
    contractAddress: "0x4200000000000000000000000000000000000006",
    explorerUrl: "https://basescan.org",
    isTestnet: false,
    badge: "🔴 Mainnet L2",
  },
  {
    id: "optimism-eth",
    poolName: "OP Mainnet Yield Protocol",
    networkName: "OP Mainnet (Optimism)",
    chainId: 10,
    chainIdHex: "0xa",
    tokenSymbol: "ETH",
    totalStaked: 41800.0,
    apyPercentage: 8.2,
    lockPeriodDays: 0,
    rewardTokenSymbol: "OP-YIELD",
    contractAddress: "0x4200000000000000000000000000000000000006",
    explorerUrl: "https://optimistic.etherscan.io",
    isTestnet: false,
    badge: "🔴 Mainnet L2",
  },
  {
    id: "bsc-bnb",
    poolName: "BNB Smart Chain High Yield Vault",
    networkName: "BNB Smart Chain (BSC)",
    chainId: 56,
    chainIdHex: "0x38",
    tokenSymbol: "BNB",
    totalStaked: 14200.0,
    apyPercentage: 11.2,
    lockPeriodDays: 3,
    rewardTokenSymbol: "stBNB",
    contractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    explorerUrl: "https://bscscan.com",
    isTestnet: false,
    badge: "🔴 Mainnet BSC",
  },
  {
    id: "avalanche-avax",
    poolName: "Avalanche C-Chain Liquid Vault",
    networkName: "Avalanche C-Chain",
    chainId: 43114,
    chainIdHex: "0xa86a",
    tokenSymbol: "AVAX",
    totalStaked: 210000.0,
    apyPercentage: 10.5,
    lockPeriodDays: 0,
    rewardTokenSymbol: "sAVAX",
    contractAddress: "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0ea4bE",
    explorerUrl: "https://snowtrace.io",
    isTestnet: false,
    badge: "🔴 Mainnet AVAX",
  },
];

export const SEPOLIA_FAUCETS = [
  {
    name: "Google Cloud Sepolia Faucet (Zero Login)",
    url: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
    description: "Dapatkan 0.05 Sepolia ETH secara instan tanpa perlu login.",
    badge: "Tercepat • Direkomendasikan",
  },
  {
    name: "Alchemy Sepolia Faucet",
    url: "https://www.alchemy.com/faucets/ethereum-sepolia",
    description: "Dapatkan 0.5 Sepolia ETH setiap hari dengan akun Alchemy gratis.",
    badge: "Jumlah Tinggi",
  },
  {
    name: "Chainlink Faucet",
    url: "https://faucets.chain.link/sepolia",
    description: "Dapatkan Sepolia ETH dan token LINK testnet.",
    badge: "Resmi Chainlink",
  },
  {
    name: "QuickNode Sepolia Faucet",
    url: "https://faucet.quicknode.com/drip",
    description: "Pengiriman langsung Sepolia ETH ke alamat dompet Anda.",
    badge: "Alternatif",
  },
];

export const DEFAULT_STAKING_POOL = STAKING_POOLS[0]; // Sepolia Testnet Pool

export function getExplorerTxUrl(explorerUrl: string, txHash: string): string {
  return `${explorerUrl}/tx/${txHash}`;
}

export function getExplorerAddressUrl(explorerUrl: string, address: string): string {
  return `${explorerUrl}/address/${address}`;
}

/**
 * Automatically fetch real on-chain staking transactions from Alchemy EVM RPC Node
 */
export async function fetchRealOnChainStakingTxs(userAddress: string): Promise<StakingTxHistoryItem[]> {
  if (!userAddress) return [];

  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "alch_DXNMWIMwQ-2-KsLr5ywty";
  const alchemyRpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`;

  try {
    const res = await fetch(alchemyRpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: userAddress,
            toAddress: SEPOLIA_STAKING_CONTRACT_ADDRESS,
            category: ["external"],
            order: "desc",
          },
        ],
      }),
    });

    const data = await res.json();
    const transfers = data?.result?.transfers || [];

    if (transfers.length > 0) {
      return transfers.map((tx: any, idx: number) => ({
        id: tx.hash || `alchemy-tx-${idx}`,
        txHash: tx.hash,
        amount: parseFloat(tx.value || 0),
        poolName: "Sepolia Testnet Liquid Vault",
        networkName: "Sepolia Testnet",
        explorerUrl: "https://sepolia.etherscan.io",
        contractAddress: SEPOLIA_STAKING_CONTRACT_ADDRESS,
        timestamp: tx.blockNum ? `Block #${parseInt(tx.blockNum, 16)}` : "Verified On-Chain",
        blockNumber: tx.blockNum ? parseInt(tx.blockNum, 16) : undefined,
        status: "Success" as const,
      }));
    }
  } catch (err) {
    console.warn("Could not query Alchemy asset transfers", err);
  }

  return [];
}

export async function getUserStakingInfo(address: string | null): Promise<UserStakingAccount> {
  if (!address) {
    return {
      address: "",
      stakedBalance: 0,
      earnedRewards: 0,
      pendingYield: 0,
      dailyYield: 0,
      monthlyYield: 0,
    };
  }

  return {
    address,
    stakedBalance: 0,
    earnedRewards: 0,
    pendingYield: 0,
    dailyYield: 0,
    monthlyYield: 0,
  };
}

export function calculateYield(amount: number, apy: number, days: number): number {
  return (amount * (apy / 100) * days) / 365;
}
