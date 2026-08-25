export interface DexPairPrice {
  pairSymbol: string; // e.g. "ETH/USDT"
  baseToken: string;
  quoteToken: string;
  dexName: string;
  networkName: string;
  priceUSD: number;
  liquidityUSD: number;
  feeTierPercentage: number;
  poolAddress?: string;
  volume24hUSD?: number;
  lastUpdated: string;
}

export interface ArbitrageOpportunity {
  id: string;
  pairSymbol: string;
  networkName: string;
  buyDex: string;
  buyPrice: number;
  sellDex: string;
  sellPrice: number;
  spreadPercentage: number;
  estimatedGrossProfitUSD: number;
  estimatedGasFeeUSD: number;
  netProfitUSD: number;
  netRoiPercentage: number;
  timestamp: string;
}
