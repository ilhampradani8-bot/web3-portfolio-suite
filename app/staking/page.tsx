"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/context/wallet-context";
import { DEFAULT_STAKING_POOL, getUserStakingInfo } from "@/modules/staking/services/staking-service";
import { UserStakingAccount } from "@/modules/staking/types/staking";
import { YieldDisplay } from "@/modules/staking/components/yield-display";
import { StakingForm } from "@/modules/staking/components/staking-form";
import { Coins, Sparkles } from "lucide-react";

export default function StakingPage() {
  const { address } = useWallet();
  const [userAccount, setUserAccount] = useState<UserStakingAccount>({
    address: "",
    stakedBalance: 5.5,
    earnedRewards: 142.85,
    pendingYield: 0.0412,
    dailyYield: 0.0018,
    monthlyYield: 0.054,
  });

  useEffect(() => {
    if (address) {
      getUserStakingInfo(address).then(setUserAccount);
    }
  }, [address]);

  const handleStakeSuccess = (amount: number) => {
    setUserAccount((prev) => ({
      ...prev,
      stakedBalance: prev.stakedBalance + amount,
      dailyYield: ((prev.stakedBalance + amount) * 0.124) / 365,
    }));
  };

  const handleUnstakeSuccess = (amount: number) => {
    setUserAccount((prev) => ({
      ...prev,
      stakedBalance: Math.max(0, prev.stakedBalance - amount),
      dailyYield: (Math.max(0, prev.stakedBalance - amount) * 0.124) / 365,
    }));
  };

  const handleClaimRewards = () => {
    setUserAccount((prev) => ({
      ...prev,
      earnedRewards: prev.earnedRewards + prev.pendingYield,
      pendingYield: 0,
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Coins className="h-3.5 w-3.5" />
            <span>Module 02 • Non-Custodial Yield Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Decentralized Staking dApp
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stake ETH liquid assets, compound rewards real-time, and manage non-custodial vault balances.
          </p>
        </div>
      </div>

      {/* Yield Display Banner (Tampilkan Data) */}
      <YieldDisplay
        pool={DEFAULT_STAKING_POOL}
        account={userAccount}
        onClaimRewards={handleClaimRewards}
      />

      {/* Interactive Form Component */}
      <div className="max-w-2xl mx-auto pt-4">
        <StakingForm
          onStakeSuccess={handleStakeSuccess}
          onUnstakeSuccess={handleUnstakeSuccess}
        />
      </div>

    </div>
  );
}
