"use client";

import React from "react";
import { UserStakingAccount, StakingPoolInfo } from "../types/staking";
import { formatUSD } from "@/lib/utils";
import { Coins, Gift, ShieldCheck } from "lucide-react";

interface YieldDisplayProps {
  pool: StakingPoolInfo;
  account: UserStakingAccount;
  onClaimRewards: () => void;
}

export const YieldDisplay: React.FC<YieldDisplayProps> = ({ pool, account, onClaimRewards }) => {
  return (
    <div className="space-y-6">
      
      {/* Top Banner: APY & Account Summary */}
      <div className="border-2 border-slate-900 bg-white p-6 shadow-md">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Pool Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-900 text-white">
                {pool.poolName}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                Audited Liquid Contract
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-3">
              <span>{pool.apyPercentage}% APY</span>
              <span className="text-sm font-sans font-normal text-slate-600">Fixed Compound Rate</span>
            </div>

            <div className="text-xs font-mono text-slate-600 mt-2 flex items-center gap-4">
              <span>TVL Pool: <strong className="text-slate-900">{pool.totalStaked.toLocaleString()} ETH</strong></span>
              <span>Lock: <strong className="text-emerald-800 font-bold">Flexible (0 Days)</strong></span>
            </div>
          </div>

          {/* Real Rewards Card */}
          <div className="bg-slate-50 p-5 border border-slate-300 flex flex-col justify-between min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-600 font-mono mb-1 font-bold">
              <span>Pending Claimable Rewards</span>
            </div>

            <div className="text-2xl font-black font-mono text-red-700 tracking-tight my-1">
              {account.pendingYield.toFixed(6)} {pool.rewardTokenSymbol}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-300">
              <span className="text-[11px] font-mono text-slate-600">
                ≈ {formatUSD(account.pendingYield * 12.5)}
              </span>

              <button
                onClick={onClaimRewards}
                disabled={account.pendingYield <= 0}
                className="px-3 py-1.5 text-xs font-bold font-mono text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 shadow-sm transition-all disabled:opacity-50"
              >
                Claim Rewards
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Real Balance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-mono text-slate-600 mb-1 font-bold">Staked ETH Balance</div>
          <div className="text-xl font-bold font-mono text-slate-900">
            {account.stakedBalance} ETH
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            ≈ {formatUSD(account.stakedBalance * 3200)}
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-mono text-slate-600 mb-1 font-bold">Estimated Daily Yield</div>
          <div className="text-xl font-bold font-mono text-emerald-800">
            +{account.dailyYield.toFixed(4)} ETH
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            ≈ {formatUSD(account.dailyYield * 3200)} / day
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-mono text-slate-600 mb-1 font-bold">Total Claimed Earnings</div>
          <div className="text-xl font-bold font-mono text-purple-900">
            {account.earnedRewards} {pool.rewardTokenSymbol}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            Historical compound rewards
          </div>
        </div>

      </div>

    </div>
  );
};
