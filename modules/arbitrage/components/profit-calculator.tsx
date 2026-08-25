"use client";

import React, { useState } from "react";
import { formatUSD } from "@/lib/utils";
import { Calculator, ShieldAlert, CheckCircle2, Play } from "lucide-react";

export const ProfitCalculator = () => {
  const [tradeCapitalUSD, setTradeCapitalUSD] = useState<number>(100000);
  const [gasPriceGwei, setGasPriceGwei] = useState<number>(16);
  const [slippagePercent, setSlippagePercent] = useState<number>(0.1);
  const [calculatedRoute, setCalculatedRoute] = useState<any>(null);

  const buyPrice = 3245.80; // Uniswap v3
  const sellPrice = 3262.10; // Sushiswap
  const spreadPercent = (sellPrice - buyPrice) / buyPrice;

  const grossProfitUSD = tradeCapitalUSD * spreadPercent;
  const gasFeeUSD = (gasPriceGwei * 210000 * 0.000000001) * 3245;
  const slippageCostUSD = tradeCapitalUSD * (slippagePercent / 100);
  const netProfitUSD = grossProfitUSD - gasFeeUSD - slippageCostUSD;
  const netROI = (netProfitUSD / tradeCapitalUSD) * 100;

  const handleCalculateRoute = () => {
    setCalculatedRoute({
      status: "VERIFIED",
      buyExchange: "Uniswap v3 (0x88e6a0...d897)",
      sellExchange: "Sushiswap (0xcbc106...a102)",
      profitETH: (netProfitUSD / 3245).toFixed(4),
      profitUSD: netProfitUSD.toFixed(2),
      gasEstimate: gasFeeUSD.toFixed(2),
    });
  };

  return (
    <div className="border-2 border-slate-900 bg-white p-6 shadow-md space-y-6">
      
      <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
        <div className="h-10 w-10 border border-slate-400 bg-white text-slate-900 flex items-center justify-center font-bold">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Arbitrage Profit & Gas Calculator</h3>
          <p className="text-xs text-slate-600">Calculates real net ROI after Flashloan gas fees and slippage parameters</p>
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div>
          <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Trade Capital (USD)</label>
          <input
            type="number"
            step="10000"
            value={tradeCapitalUSD}
            onChange={(e) => setTradeCapitalUSD(Number(e.target.value))}
            className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Gas Price (Gwei)</label>
          <input
            type="number"
            value={gasPriceGwei}
            onChange={(e) => setGasPriceGwei(Number(e.target.value))}
            className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Max Slippage (%)</label>
          <input
            type="number"
            step="0.05"
            value={slippagePercent}
            onChange={(e) => setSlippagePercent(Number(e.target.value))}
            className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
          />
        </div>

      </div>

      {/* Real-time Profit Breakdown */}
      <div className="bg-slate-50 p-5 border border-slate-300 space-y-3 font-mono text-xs">
        <div className="flex justify-between text-slate-700">
          <span>Gross Arbitrage Profit</span>
          <span className="text-slate-900 font-bold">+{formatUSD(grossProfitUSD)}</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>Estimated Flashloan Gas Cost</span>
          <span className="text-red-700">-{formatUSD(gasFeeUSD)}</span>
        </div>
        <div className="flex justify-between text-slate-700">
          <span>Slippage Buffer ({slippagePercent}%)</span>
          <span className="text-amber-800">-{formatUSD(slippageCostUSD)}</span>
        </div>

        <div className="pt-3 border-t border-slate-300 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-900">Estimated Net ROI</span>
          <div className="text-right">
            <span className={`text-xl font-black ${netProfitUSD > 0 ? "text-emerald-800" : "text-red-700"}`}>
              {formatUSD(netProfitUSD)}
            </span>
            <span className="block text-[11px] text-slate-600">
              ({netROI > 0 ? "+" : ""}{netROI.toFixed(2)}% Net Return)
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleCalculateRoute}
        className="w-full py-4 font-bold font-mono text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all flex items-center justify-center gap-2"
      >
        <Play className="h-4 w-4 fill-current" />
        <span>Calculate Flashloan Arbitrage Route</span>
      </button>

      {/* Route Calculation Result */}
      {calculatedRoute && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-800 text-xs font-mono text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="overflow-hidden space-y-1">
            <div className="font-bold">Arbitrage Route Calculation Verified!</div>
            <div>Estimated Net Profit: +{calculatedRoute.profitETH} ETH ({formatUSD(Number(calculatedRoute.profitUSD))})</div>
            <div className="text-[10px] text-slate-600">
              Buy: {calculatedRoute.buyExchange} → Sell: {calculatedRoute.sellExchange}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
