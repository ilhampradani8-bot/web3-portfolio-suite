import { StakingPoolInfo, UserStakingAccount } from "../types/staking";

export const DEFAULT_STAKING_POOL: StakingPoolInfo = {
  poolName: "Ethereum Liquid Vault",
  tokenSymbol: "ETH",
  totalStaked: 48250.75,
  apyPercentage: 12.4,
  lockPeriodDays: 0, // Flexible / No lock
  rewardTokenSymbol: "NEXUS",
};

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

  // Pre-configured state for demo wallet or connected user
  const stakedBalance = 5.50; // 5.5 ETH staked
  const apy = DEFAULT_STAKING_POOL.apyPercentage;
  const annualReturn = (stakedBalance * apy) / 100;
  const dailyYield = annualReturn / 365;
  const monthlyYield = annualReturn / 12;

  return {
    address,
    stakedBalance,
    earnedRewards: 142.85,
    pendingYield: 0.0412,
    dailyYield,
    monthlyYield,
  };
}

export function calculateYield(amount: number, apy: number, days: number): number {
  return (amount * (apy / 100) * days) / 365;
}
