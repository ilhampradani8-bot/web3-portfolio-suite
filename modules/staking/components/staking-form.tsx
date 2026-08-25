"use client";

import React, { useState } from "react";
import { useWallet } from "@/context/wallet-context";
import { formatUSD } from "@/lib/utils";
import { ArrowDown, Coins, Lock, Unlock, CheckCircle, AlertCircle } from "lucide-react";

interface StakingFormProps {
  onStakeSuccess: (amount: number) => void;
  onUnstakeSuccess: (amount: number) => void;
}

export const StakingForm: React.FC<StakingFormProps> = ({ onStakeSuccess, onUnstakeSuccess }) => {
  const { isConnected, balanceETH, connectDemoWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    setTxHash(null);

    // Simulate On-Chain Smart Contract Execution delay
    setTimeout(() => {
      setIsProcessing(false);
      const fakeHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
      setTxHash(fakeHash);

      const numAmount = parseFloat(amount);
      if (activeTab === "stake") {
        onStakeSuccess(numAmount);
      } else {
        onUnstakeSuccess(numAmount);
      }
      setAmount("");
    }, 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
      
      {/* Tabs Header: Stake vs Unstake */}
      <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
        <button
          onClick={() => {
            setActiveTab("stake");
            setTxHash(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold font-mono transition-all duration-200 ${
            activeTab === "stake"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>Stake ETH</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("unstake");
            setTxHash(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold font-mono transition-all duration-200 ${
            activeTab === "unstake"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Unlock className="h-4 w-4" />
          <span>Unstake ETH</span>
        </button>
      </div>

      {/* Form Input */}
      <form onSubmit={handleAction} className="space-y-4">
        
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>Amount to {activeTab === "stake" ? "Deposit" : "Withdraw"}</span>
            <span>Available: <strong className="text-slate-200">{balanceETH} ETH</strong></span>
          </div>

          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 text-white font-mono text-xl font-bold rounded-2xl border border-slate-800 p-4 pr-24 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAmount("1.0")}
                className="px-2 py-1 rounded-lg text-[10px] font-mono bg-slate-800 text-cyan-400 hover:bg-slate-700"
              >
                1 ETH
              </button>
              <button
                type="button"
                onClick={() => setAmount(balanceETH)}
                className="px-2 py-1 rounded-lg text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
              >
                MAX
              </button>
            </div>
          </div>

          {amount && (
            <div className="text-[11px] font-mono text-slate-500 mt-1 text-right">
              ≈ {formatUSD(parseFloat(amount) * 3200)}
            </div>
          )}
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>APY Yield Rate</span>
            <span className="text-emerald-400 font-bold">12.4%</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Estimated Gas Fee</span>
            <span className="text-slate-200">~$4.20 (14 Gwei)</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Reward Token</span>
            <span className="text-cyan-400 font-bold">NEXUS Token</span>
          </div>
        </div>

        {/* Action Button */}
        {!isConnected ? (
          <button
            type="button"
            onClick={connectDemoWallet}
            className="w-full py-4 rounded-2xl font-bold font-mono text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-lg transition-all"
          >
            Connect Wallet to {activeTab === "stake" ? "Stake" : "Unstake"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            className={`w-full py-4 rounded-2xl font-bold font-mono text-xs text-slate-950 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "stake"
                ? "bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-cyan-500/20"
                : "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 hover:from-purple-300 hover:to-rose-300 shadow-purple-500/20"
            } disabled:opacity-50`}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></span>
                <span>Broadcasting On-Chain Tx...</span>
              </>
            ) : (
              <>
                <Coins className="h-4 w-4" />
                <span>Confirm {activeTab === "stake" ? "Staking" : "Unstaking"}</span>
              </>
            )}
          </button>
        )}

      </form>

      {/* Success Notification */}
      {txHash && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="overflow-hidden">
            <div className="font-bold text-white">Transaction Confirmed On-Chain!</div>
            <div className="text-[11px] text-slate-400 truncate mt-0.5">
              Tx Hash: {txHash}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
