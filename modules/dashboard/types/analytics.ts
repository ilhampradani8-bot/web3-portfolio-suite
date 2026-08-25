export interface ProtocolMetric {
  date: string;
  tvlMillions: number;
  dailyActiveWallets: number;
  gasPriceGwei: number;
  dexVolumeMillions: number;
}

export interface SqlQueryPreset {
  id: string;
  title: string;
  description: string;
  sqlQuery: string;
  executionTimeMs: number;
  rowsCount: number;
  sampleResults: Array<Record<string, any>>;
}
