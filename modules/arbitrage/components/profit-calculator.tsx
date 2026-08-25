"use client";

import React, { useState } from "react";
import { formatUSD } from "@/lib/utils";
import { Calculator, ArrowRight, ShieldAlert, CheckCircle2, Play } from "lucide-react";

export const ProfitCalculator = () => {
  const [tradeCapitalUSD, setTradeCapitalUSD] = useState<number>(100000);
  const [gasPriceGwei, setGasPriceGwei] = useState<number>(16);
  const [slippagePercent, setSlippagePercent] = useState<number>(0.1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedResult, setSimulatedResult] = useState<any>(null);

  // Spread calculations
  const buyPrice = 3244.50; // PancakeSwap
  const sellPrice = 3262.10; // Sushiswap
  const spreadPercent = (sellPrice - buyPrice) / buyPrice;

  const grossProfitUSD = tradeCapitalUSD * spreadPercent;
  const gasFeeUSD = (gasPriceGwei * 210000 * 0.000000001) * 3245; // ~210k gas for flashloan swap
  const slippageCostUSD = tradeCapitalUSD * (slippagePercent / 100);
  const netProfitUSD = grossProfitUSD - gasFeeUSD - slippageCostUSD;
  const netROI = (netProfitUSD / tradeCapitalUSD) * 100;

  const handleSimulateFlashloan = () => {
    setIsSimulating(true);
    setSimulatedResult(null);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulatedResult({
        status: "SUCCESS",
        txHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
        profitETH: (netProfitUSD / 3245).toFixed(4),
        profitUSD: netProfitUSD.toFixed(2),
        executionTimeMs: 142,
      });
    }, 1500);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-6">
      
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Arbitrage Profit & Gas Calculator</h3>
          <p className="text-xs text-slate-400">Estimate Flashloan net ROI after Gas fees and Slippage</p>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">Trade Capital (USD)</label>
          <input
            type="number"
            step="10000"
            value={tradeCapitalUSD}
            onChange={(e) => setTradeCapitalUSD(Number(e.target.value))}
            className="w-full bg-slate-950 text-white font-mono text-sm font-bold rounded-2xl border border-slate-800 p-3 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">Gas Price (Gwei)</label>
          <input
            type="number"
            value={gasPriceGwei}
            onChange={(e) => setGasPriceGwei(Number(e.target.value))}
            className="w-full bg-slate-950 text-white font-mono text-sm font-bold rounded-2xl border border-slate-800 p-3 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-2">Max Slippage (%)</label>
          <input
            type="number"
            step="0.05"
            value={slippagePercent}
            onChange={(e) => setSlippagePercent(Number(e.target.value))}
            className="w-full bg-slate-950 text-white font-mono text-sm font-bold rounded-2xl border border-slate-800 p-3 focus:outline-none focus:border-purple-500"
          />
        </div>

      </div>

      {/* Real-time Profit Breakdown */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Gross Arbitrage Profit</span>
          <span className="text-white font-bold">+{formatUSD(grossProfitUSD)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Estimated Flashloan Gas Cost</span>
          <span className="text-red-400">-{formatUSD(gasFeeUSD)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Slippage Buffer ({slippagePercent}%)</span>
          <span className="text-amber-400">-{formatUSD(slippageCostUSD)}</span>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-200">Estimated Net ROI</span>
          <div className="text-right">
            <span className={`text-xl font-black ${netProfitUSD > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {formatUSD(netProfitUSD)}
            </span>
            <span className="block text-[11px] text-slate-400">
              ({netROI > 0 ? "+" : ""}{netROI.toFixed(2)}% Net Return)
            </span>
          </div>
        </div>
      </div>

      {/* Simulate Arbitrage Execution Button */}
      <button
        onClick={handleSimulateFlashloan}
        disabled={isSimulating}
        className="w-full py-4 rounded-2xl font-bold font-mono text-xs text-slate-950 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300 shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSimulating ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-slate-950 border-t-transparent"></span>
            <span>Simulating Atomic Flashloan Execution...</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4 fill-current" />
            <span>Simulate Flashloan Arbitrage Route</span>
          </>
        )}
      </button>

      {/* Simulation Result Output */}
      {simulatedResult && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="overflow-hidden space-y-1">
            <div className="font-bold text-white">Flashloan Execution Simulation Passed!</div>
            <div>Profit: +{simulatedResult.profitETH} ETH ({formatUSD(Number(simulatedResult.profitUSD))})</div>
            <div className="text-[10px] text-slate-500 truncate">
              Execution Time: {simulatedResult.executionTimeMs}ms • Tx Hash: {simulatedResult.txHash}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
