"use client";

import React, { useState } from "react";
import { StakingPoolInfo } from "../types/staking";
import { STAKING_POOLS } from "../services/staking-service";
import { Layers, ChevronDown, Check, Globe } from "lucide-react";

interface PoolSelectorProps {
  selectedPool: StakingPoolInfo;
  onSelectPool: (pool: StakingPoolInfo) => void;
}

export const PoolSelector: React.FC<PoolSelectorProps> = ({
  selectedPool,
  onSelectPool,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-slate-900 bg-white p-5 shadow-md space-y-3">
      
      {/* Label Header */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-slate-900 flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-600" />
          <span>Pilih Pool Staking EVM (List 8 Jaringan):</span>
        </label>

        <span className="text-[11px] font-mono font-bold text-slate-600 hidden sm:inline">
          Active: <strong className="text-slate-900">{selectedPool.networkName}</strong> ({selectedPool.apyPercentage}% APY)
        </span>
      </div>

      {/* Select List Dropdown Input */}
      <div className="relative">
        
        {/* Selected Pool Trigger Box */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 p-3.5 text-left font-mono transition-all"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span
              className={`px-2 py-0.5 text-[10px] font-bold uppercase shrink-0 ${
                selectedPool.isTestnet
                  ? "bg-emerald-400 text-slate-900"
                  : "bg-red-500 text-white"
              }`}
            >
              {selectedPool.networkName}
            </span>

            <span className="font-bold text-slate-900 text-sm truncate">
              {selectedPool.poolName}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="font-black text-emerald-800 text-sm">
              {selectedPool.apyPercentage}% APY
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-900 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </button>

        {/* Dropdown Options List */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white border-2 border-slate-900 shadow-2xl divide-y divide-slate-200 max-h-80 overflow-y-auto">
            {STAKING_POOLS.map((pool) => {
              const isSelected = pool.id === selectedPool.id;
              return (
                <button
                  key={pool.id}
                  type="button"
                  onClick={() => {
                    onSelectPool(pool);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3.5 flex items-center justify-between text-left font-mono transition-all hover:bg-slate-100 ${
                    isSelected ? "bg-slate-900 text-white hover:bg-slate-800" : "text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase shrink-0 ${
                        pool.isTestnet
                          ? isSelected
                            ? "bg-emerald-400 text-slate-900"
                            : "bg-emerald-100 text-emerald-900"
                          : isSelected
                          ? "bg-red-500 text-white"
                          : "bg-red-100 text-red-900"
                      }`}
                    >
                      {pool.networkName}
                    </span>

                    <div>
                      <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                        {pool.poolName}
                      </div>
                      <div className={`text-[11px] ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        Token: {pool.tokenSymbol} • Reward: {pool.rewardTokenSymbol} • TVL: {pool.totalStaked.toLocaleString()} {pool.tokenSymbol}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-sm font-black ${isSelected ? "text-emerald-300" : "text-emerald-800"}`}>
                      {pool.apyPercentage}% APY
                    </span>
                    {isSelected && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
