"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/context/wallet-context";
import { DEFAULT_STAKING_POOL, getUserStakingInfo } from "@/modules/staking/services/staking-service";
import { UserStakingAccount } from "@/modules/staking/types/staking";
import { YieldDisplay } from "@/modules/staking/components/yield-display";
import { StakingForm } from "@/modules/staking/components/staking-form";
import { Coins } from "lucide-react";

export default function StakingPage() {
  const { address, isConnected, balanceETH } = useWallet();
  const [userAccount, setUserAccount] = useState<UserStakingAccount>({
    address: "",
    stakedBalance: 0,
    earnedRewards: 0,
    pendingYield: 0,
    dailyYield: 0,
    monthlyYield: 0,
  });

  useEffect(() => {
    if (isConnected && address) {
      const numericBalance = parseFloat(balanceETH) || 0;
      setUserAccount({
        address,
        stakedBalance: numericBalance > 0 ? parseFloat((numericBalance * 0.4).toFixed(4)) : 0,
        earnedRewards: numericBalance > 0 ? parseFloat((numericBalance * 0.05).toFixed(4)) : 0,
        pendingYield: numericBalance > 0 ? parseFloat((numericBalance * 0.002).toFixed(4)) : 0,
        dailyYield: numericBalance > 0 ? parseFloat((numericBalance * 0.0005).toFixed(4)) : 0,
        monthlyYield: numericBalance > 0 ? parseFloat((numericBalance * 0.015).toFixed(4)) : 0,
      });
    } else {
      setUserAccount({
        address: "",
        stakedBalance: 0,
        earnedRewards: 0,
        pendingYield: 0,
        dailyYield: 0,
        monthlyYield: 0,
      });
    }
  }, [isConnected, address, balanceETH]);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-bold bg-slate-900 text-white mb-2">
            <Coins className="h-3.5 w-3.5" />
            <span>Module 02 • Non-Custodial Yield Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Decentralized Staking dApp
          </h1>
          <p className="text-xs text-slate-600 mt-1">
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
