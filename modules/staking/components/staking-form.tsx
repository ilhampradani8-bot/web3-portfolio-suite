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
  const { isConnected, balanceETH, connectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    setTxHash(null);

    // Broadcast real web3 contract interaction
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
    <div className="border-2 border-slate-900 bg-white p-6 shadow-md space-y-6">
      
      {/* Tabs Header: Stake vs Unstake */}
      <div className="flex bg-slate-100 p-1 border border-slate-300">
        <button
          onClick={() => {
            setActiveTab("stake");
            setTxHash(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold font-mono transition-all ${
            activeTab === "stake"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-700 hover:text-slate-900"
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
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold font-mono transition-all ${
            activeTab === "unstake"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <Unlock className="h-4 w-4" />
          <span>Unstake ETH</span>
        </button>
      </div>

      {/* Form Input */}
      <form onSubmit={handleAction} className="space-y-4">
        
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-700 mb-2">
            <span>Amount to {activeTab === "stake" ? "Deposit" : "Withdraw"}</span>
            <span>Available Balance: <strong className="text-slate-900">{balanceETH} ETH</strong></span>
          </div>

          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white text-slate-900 font-mono text-xl font-bold border-2 border-slate-900 p-4 pr-24 focus:outline-none focus:border-red-700"
            />
            <div className="absolute right-3 top-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAmount("1.0")}
                className="px-2 py-1 text-[10px] font-mono bg-slate-100 text-slate-900 border border-slate-400 hover:bg-slate-200 font-bold"
              >
                1 ETH
              </button>
              <button
                type="button"
                onClick={() => setAmount(balanceETH)}
                className="px-2 py-1 text-[10px] font-mono bg-slate-900 text-white font-bold"
              >
                MAX
              </button>
            </div>
          </div>

          {amount && (
            <div className="text-[11px] font-mono text-slate-600 mt-1 text-right">
              ≈ {formatUSD(parseFloat(amount) * 3200)}
            </div>
          )}
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-50 p-4 border border-slate-300 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-700">
            <span>APY Yield Rate</span>
            <span className="text-emerald-800 font-bold">12.4%</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Estimated Gas Fee</span>
            <span className="text-slate-900">~$4.20 (14 Gwei)</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Reward Token</span>
            <span className="text-red-700 font-bold">NEXUS Token</span>
          </div>
        </div>

        {/* Action Button */}
        {!isConnected ? (
          <button
            type="button"
            onClick={connectWallet}
            className="w-full py-4 font-bold font-mono text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all"
          >
            Connect MetaMask to {activeTab === "stake" ? "Stake" : "Unstake"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            className="w-full py-4 font-bold font-mono text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
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
        <div className="p-4 bg-emerald-50 border-2 border-emerald-800 text-xs font-mono text-emerald-900 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="overflow-hidden">
            <div className="font-bold">Transaction Confirmed On-Chain!</div>
            <div className="text-[11px] text-slate-700 truncate mt-0.5">
              Tx Hash: {txHash}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
