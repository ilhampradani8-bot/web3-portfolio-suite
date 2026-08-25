"use client";

import React, { useState, useEffect } from "react";
import { UserStakingAccount, StakingPoolInfo } from "../types/staking";
import { formatCrypto, formatUSD } from "@/lib/utils";
import { Coins, Sparkles, TrendingUp, Gift, ShieldCheck, Clock } from "lucide-react";

interface YieldDisplayProps {
  pool: StakingPoolInfo;
  account: UserStakingAccount;
  onClaimRewards: () => void;
}

export const YieldDisplay: React.FC<YieldDisplayProps> = ({ pool, account, onClaimRewards }) => {
  const [liveReward, setLiveReward] = useState<number>(account.pendingYield);

  // Real-time micro-yield counter ticking animation
  useEffect(() => {
    setLiveReward(account.pendingYield);
    const interval = setInterval(() => {
      setLiveReward((prev) => prev + 0.000014);
    }, 1000);

    return () => clearInterval(interval);
  }, [account.pendingYield]);

  return (
    <div className="space-y-6">
      
      {/* Top Highlight Banner: APY & Live Rewards */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 p-6 shadow-xl shadow-cyan-500/10">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* Pool Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {pool.poolName}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3" />
                Audited Smart Contract
              </span>
            </div>

            <div className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-3">
              <span>{pool.apyPercentage}% APY</span>
              <span className="text-sm font-sans font-normal text-slate-400">Fixed Compound Yield</span>
            </div>

            <div className="text-xs font-mono text-slate-400 mt-2 flex items-center gap-4">
              <span>Total Value Locked: <strong className="text-slate-200">{pool.totalStaked.toLocaleString()} ETH</strong></span>
              <span>Lock: <strong className="text-emerald-400">Flexible (0 Days)</strong></span>
            </div>
          </div>

          {/* Real-time Ticking Rewards */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
              <span>Pending Rewards</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </div>

            <div className="text-2xl font-black font-mono text-cyan-400 tracking-tight my-1">
              {liveReward.toFixed(6)} {pool.rewardTokenSymbol}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-500">
                ≈ {formatUSD(liveReward * 12.5)}
              </span>

              <button
                onClick={onClaimRewards}
                disabled={liveReward <= 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50"
              >
                <Gift className="h-3.5 w-3.5" />
                <span>Claim</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Yield Breakdown Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="text-xs font-mono text-slate-400 mb-1">Your Staked Balance</div>
          <div className="text-xl font-bold font-mono text-white">
            {account.stakedBalance} ETH
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            ≈ {formatUSD(account.stakedBalance * 3200)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="text-xs font-mono text-slate-400 mb-1">Estimated Daily Yield</div>
          <div className="text-xl font-bold font-mono text-emerald-400">
            +{account.dailyYield.toFixed(4)} ETH
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            ≈ {formatUSD(account.dailyYield * 3200)} / day
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <div className="text-xs font-mono text-slate-400 mb-1">Total Claimed Earnings</div>
          <div className="text-xl font-bold font-mono text-purple-400">
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
