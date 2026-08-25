"use client";

import React, { useState, useEffect } from "react";
import { DexPairPrice } from "../types/dex";
import { getDexPairPrices } from "../services/fetch-dex-prices";
import { formatUSD } from "@/lib/utils";
import { ArrowLeftRight, TrendingUp, RefreshCw, Zap } from "lucide-react";

export const PriceMatrix = () => {
  const [prices, setPrices] = useState<DexPairPrice[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>("ETH/USDT");

  useEffect(() => {
    getDexPairPrices().then(setPrices);
  }, []);

  const filteredPrices = prices.filter((p) => p.pairSymbol === selectedPair);

  // Determine lowest (Buy) and highest (Sell) prices
  const sortedByPrice = [...filteredPrices].sort((a, b) => a.priceUSD - b.priceUSD);
  const lowestPrice = sortedByPrice[0];
  const highestPrice = sortedByPrice[sortedByPrice.length - 1];
  const spreadUSD = highestPrice && lowestPrice ? highestPrice.priceUSD - lowestPrice.priceUSD : 0;
  const spreadPercent = lowestPrice ? (spreadUSD / lowestPrice.priceUSD) * 100 : 0;

  return (
    <div className="space-y-6">
      
      {/* Selector & Top Spread Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <ArrowLeftRight className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Live Multi-DEX Price Matrix</h3>
            <p className="text-xs text-slate-400">Comparing real-time orderbook & AMM pool pricing</p>
          </div>
        </div>

        {/* Pair Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {["ETH/USDT", "WBTC/USDC"].map((pair) => (
            <button
              key={pair}
              onClick={() => setSelectedPair(pair)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedPair === pair
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {pair}
            </button>
          ))}
        </div>

      </div>

      {/* Arbitrage Opportunity Highlight Banner */}
      {spreadPercent > 0.1 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Zap className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Arbitrage Opportunity Detected!
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Buy on <span className="text-cyan-400">{lowestPrice?.dexName}</span> @ ${lowestPrice?.priceUSD.toFixed(2)} → Sell on <span className="text-purple-400">{highestPrice?.dexName}</span> @ ${highestPrice?.priceUSD.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="text-right sm:text-right shrink-0">
            <div className="text-2xl font-black font-mono text-emerald-400">
              +{spreadPercent.toFixed(2)}% Spread
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Gross Spread: +${spreadUSD.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* DEX Price Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase">
            <tr>
              <th className="p-4">DEX Exchange</th>
              <th className="p-4">Price (USD)</th>
              <th className="p-4">Pool Liquidity</th>
              <th className="p-4">Fee Tier</th>
              <th className="p-4 text-right">Arbitrage Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredPrices.map((item) => {
              const isBuyTarget = item.dexName === lowestPrice?.dexName;
              const isSellTarget = item.dexName === highestPrice?.dexName;

              return (
                <tr key={item.dexName} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                    {item.dexName}
                  </td>
                  <td className="p-4 font-bold text-slate-200 text-sm">
                    ${item.priceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-slate-400">
                    {formatUSD(item.liquidityUSD)}
                  </td>
                  <td className="p-4 text-slate-400">
                    {item.feeTierPercentage}%
                  </td>
                  <td className="p-4 text-right">
                    {isBuyTarget && (
                      <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        BEST BUY TARGET
                      </span>
                    )}
                    {isSellTarget && (
                      <span className="px-3 py-1 rounded-xl text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        BEST SELL TARGET
                      </span>
                    )}
                    {!isBuyTarget && !isSellTarget && (
                      <span className="text-slate-500">Market Rate</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
