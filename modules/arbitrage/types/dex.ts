export interface DexPairPrice {
  pairSymbol: string; // e.g. "ETH/USDT"
  baseToken: string;
  quoteToken: string;
  dexName: "Uniswap v3" | "Sushiswap" | "Curve" | "PancakeSwap";
  priceUSD: number;
  liquidityUSD: number;
  feeTierPercentage: number;
  lastUpdated: string;
}

export interface ArbitrageOpportunity {
  id: string;
  pairSymbol: string;
  buyDex: string;
  buyPrice: number;
  sellDex: string;
  sellPrice: number;
  spreadPercentage: number;
  estimatedGrossProfitUSD: number;
  estimatedGasFeeUSD: number;
  netProfitUSD: number;
  netRoiPercentage: number;
}
