export interface StakingPoolInfo {
  poolName: string;
  tokenSymbol: string;
  totalStaked: number;
  apyPercentage: number;
  lockPeriodDays: number;
  rewardTokenSymbol: string;
}

export interface UserStakingAccount {
  address: string;
  stakedBalance: number;
  earnedRewards: number;
  pendingYield: number;
  dailyYield: number;
  monthlyYield: number;
}
