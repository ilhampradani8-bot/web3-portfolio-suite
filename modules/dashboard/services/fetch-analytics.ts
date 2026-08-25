import { ProtocolMetric, SqlQueryPreset } from "../types/analytics";

// Sample historical 7-day protocol metric data
const INITIAL_METRICS: ProtocolMetric[] = [
  { date: "Aug 19", tvlMillions: 48.2, dailyActiveWallets: 420500, gasPriceGwei: 24, dexVolumeMillions: 1240 },
  { date: "Aug 20", tvlMillions: 49.5, dailyActiveWallets: 445000, gasPriceGwei: 19, dexVolumeMillions: 1350 },
  { date: "Aug 21", tvlMillions: 51.0, dailyActiveWallets: 462100, gasPriceGwei: 16, dexVolumeMillions: 1480 },
  { date: "Aug 22", tvlMillions: 50.8, dailyActiveWallets: 438900, gasPriceGwei: 21, dexVolumeMillions: 1290 },
  { date: "Aug 23", tvlMillions: 52.4, dailyActiveWallets: 489000, gasPriceGwei: 15, dexVolumeMillions: 1620 },
  { date: "Aug 24", tvlMillions: 54.1, dailyActiveWallets: 512400, gasPriceGwei: 14, dexVolumeMillions: 1810 },
  { date: "Aug 25", tvlMillions: 55.8, dailyActiveWallets: 538000, gasPriceGwei: 12, dexVolumeMillions: 1940 },
];

export const PRESET_SQL_QUERIES: SqlQueryPreset[] = [
  {
    id: "query-1",
    title: "Top DEX Liquidity Pools by TVL",
    description: "Queries Uniswap v3 & Sushiswap liquidity contracts on Ethereum Mainnet",
    sqlQuery: `SELECT 
  pool_address, 
  token0_symbol, 
  token1_symbol, 
  SUM(reserve_usd) AS tvl_usd,
  COUNT(DISTINCT swapper_address) AS unique_swappers
FROM ethereum.dex_pools
WHERE block_timestamp >= NOW() - INTERVAL '7 DAYS'
GROUP BY 1, 2, 3
ORDER BY tvl_usd DESC
LIMIT 5;`,
    executionTimeMs: 248,
    rowsCount: 5,
    sampleResults: [
      { pool_address: "0x88e6a0...d897", token0_symbol: "WETH", token1_symbol: "USDC", tvl_usd: 285400000, unique_swappers: 42800 },
      { pool_address: "0xcbc106...a102", token0_symbol: "WBTC", token1_symbol: "WETH", tvl_usd: 194200000, unique_swappers: 28400 },
      { pool_address: "0x3416cf...b541", token0_symbol: "USDC", token1_symbol: "USDT", tvl_usd: 152800000, unique_swappers: 64100 },
      { pool_address: "0x4e901a...c210", token0_symbol: "WETH", token1_symbol: "USDT", tvl_usd: 124500000, unique_swappers: 31900 },
      { pool_address: "0x11b815...e890", token0_symbol: "DAI", token1_symbol: "USDC", tvl_usd: 98400000, unique_swappers: 18900 },
    ],
  },
  {
    id: "query-2",
    title: "Gas Burn Analytics by Contract",
    description: "Identifies top gas burning smart contracts over the last 24 hours",
    sqlQuery: `SELECT 
  to_address AS contract_address,
  label AS contract_name,
  SUM(gas_used * gas_price) / 1e18 AS eth_burned
FROM ethereum.transactions
WHERE block_timestamp >= NOW() - INTERVAL '24 HOURS'
GROUP BY 1, 2
ORDER BY eth_burned DESC
LIMIT 5;`,
    executionTimeMs: 185,
    rowsCount: 5,
    sampleResults: [
      { contract_address: "0x00000000006c3852cbef3e08e8df289169ede581", contract_name: "Seaport (OpenSea)", eth_burned: 428.5 },
      { contract_address: "0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b", contract_name: "Uniswap Universal Router", eth_burned: 395.2 },
      { contract_address: "0xdac17f958d2ee523a2206206994597c13d831ec7", contract_name: "Tether USD (USDT)", eth_burned: 284.1 },
      { contract_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", contract_name: "USD Coin (USDC)", eth_burned: 215.8 },
      { contract_address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84", contract_name: "Lido Staked ETH", eth_burned: 189.4 },
    ],
  },
];

// Service function: Ambil Data Protocol Metrics
export async function getProtocolMetrics(): Promise<ProtocolMetric[]> {
  return INITIAL_METRICS;
}
