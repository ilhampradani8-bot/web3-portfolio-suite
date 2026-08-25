import { DexPairPrice, ArbitrageOpportunity } from "../types/dex";

// Initial Seed Data for DEX Price Matrix across DEXes
const INITIAL_DEX_PRICES: DexPairPrice[] = [
  {
    pairSymbol: "ETH/USDT",
    baseToken: "ETH",
    quoteToken: "USDT",
    dexName: "Uniswap v3",
    priceUSD: 3245.80,
    liquidityUSD: 45800000,
    feeTierPercentage: 0.05,
    lastUpdated: "Just now",
  },
  {
    pairSymbol: "ETH/USDT",
    baseToken: "ETH",
    quoteToken: "USDT",
    dexName: "Sushiswap",
    priceUSD: 3262.10, // Higher price -> Arbitrage opportunity!
    liquidityUSD: 18200000,
    feeTierPercentage: 0.30,
    lastUpdated: "Just now",
  },
  {
    pairSymbol: "ETH/USDT",
    baseToken: "ETH",
    quoteToken: "USDT",
    dexName: "Curve",
    priceUSD: 3246.20,
    liquidityUSD: 24100000,
    feeTierPercentage: 0.04,
    lastUpdated: "1s ago",
  },
  {
    pairSymbol: "ETH/USDT",
    baseToken: "ETH",
    quoteToken: "USDT",
    dexName: "PancakeSwap",
    priceUSD: 3244.50,
    liquidityUSD: 12500000,
    feeTierPercentage: 0.25,
    lastUpdated: "2s ago",
  },
  {
    pairSymbol: "WBTC/USDC",
    baseToken: "WBTC",
    quoteToken: "USDC",
    dexName: "Uniswap v3",
    priceUSD: 64120.00,
    liquidityUSD: 85200000,
    feeTierPercentage: 0.30,
    lastUpdated: "Just now",
  },
  {
    pairSymbol: "WBTC/USDC",
    baseToken: "WBTC",
    quoteToken: "USDC",
    dexName: "Sushiswap",
    priceUSD: 64510.00, // Spread $390/BTC!
    liquidityUSD: 14500000,
    feeTierPercentage: 0.30,
    lastUpdated: "Just now",
  },
];

// Service function: Ambil Data DEX Prices
export async function getDexPairPrices(): Promise<DexPairPrice[]> {
  return INITIAL_DEX_PRICES;
}

// Service function: Scan Arbitrage Opportunities
export function scanArbitrageOpportunities(tradeAmountUSD = 100000): ArbitrageOpportunity[] {
  const opportunities: ArbitrageOpportunity[] = [
    {
      id: "arb-1",
      pairSymbol: "ETH/USDT",
      buyDex: "PancakeSwap",
      buyPrice: 3244.50,
      sellDex: "Sushiswap",
      sellPrice: 3262.10,
      spreadPercentage: 0.54,
      estimatedGrossProfitUSD: 542.40,
      estimatedGasFeeUSD: 42.50,
      netProfitUSD: 499.90,
      netRoiPercentage: 0.50,
    },
    {
      id: "arb-2",
      pairSymbol: "WBTC/USDC",
      buyDex: "Uniswap v3",
      buyPrice: 64120.00,
      sellDex: "Sushiswap",
      sellPrice: 64510.00,
      spreadPercentage: 0.61,
      estimatedGrossProfitUSD: 608.20,
      estimatedGasFeeUSD: 55.00,
      netProfitUSD: 553.20,
      netRoiPercentage: 0.55,
    },
  ];

  return opportunities;
}
