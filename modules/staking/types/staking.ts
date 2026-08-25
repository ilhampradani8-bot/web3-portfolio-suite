export interface StakingPoolInfo {
  id: string;
  poolName: string;
  networkName: string;
  chainId: number;
  chainIdHex: string;
  tokenSymbol: string;
  totalStaked: number;
  apyPercentage: number;
  lockPeriodDays: number;
  rewardTokenSymbol: string;
  contractAddress: string;
  explorerUrl: string;
  isTestnet: boolean;
  badge: string;
}

export interface UserStakingAccount {
  address: string;
  stakedBalance: number;
  earnedRewards: number;
  pendingYield: number;
  dailyYield: number;
  monthlyYield: number;
}

export interface StakingTxHistoryItem {
  id: string;
  txHash: string;
  amount: number;
  poolName: string;
  networkName: string;
  explorerUrl: string;
  contractAddress: string;
  timestamp: string;
  blockNumber?: number;
  status: "Success" | "Pending";
}
