"use client";

import React, { useState, useEffect } from "react";
import { WhaleTransaction } from "../types/whale";
import { getWhaleTransactions } from "../services/fetch-whale-data";
import { WhaleCard } from "./whale-card";
import { formatUSD } from "@/lib/utils";
import { 
  Filter, 
  RefreshCw, 
  Activity, 
  DollarSign, 
  Zap, 
  TrendingUp 
} from "lucide-react";

export const WhaleFeed = () => {
  const [transactions, setTransactions] = useState<WhaleTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [minAmountFilter, setMinAmountFilter] = useState<number>(0);
  const [tokenFilter, setTokenFilter] = useState<string>("ALL");
  const [networkFilter, setNetworkFilter] = useState<string>("ALL");
  const [totalVolumeUSD, setTotalVolumeUSD] = useState<number>(0);

  const fetchRealData = () => {
    setIsLoading(true);
    getWhaleTransactions({
      minUSD: minAmountFilter,
      tokenFilter,
      networkFilter,
    }).then((data) => {
      setTransactions(data);
      const sum = data.reduce((acc, t) => acc + t.amountUSD, 0);
      setTotalVolumeUSD(sum);
      setIsLoading(false);
    });
  };

  // Load real on-chain transactions on mount & filter change
  useEffect(() => {
    fetchRealData();
  }, [minAmountFilter, tokenFilter, networkFilter]);

  return (
    <div className="space-y-6">
      
      {/* Top Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase font-bold">On-Chain Volume Tracked</span>
            <DollarSign className="h-4 w-4 text-red-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {formatUSD(totalVolumeUSD)}
          </div>
          <div className="text-[11px] font-mono text-emerald-700 mt-1 flex items-center gap-1 font-bold">
            <TrendingUp className="h-3 w-3" />
            <span>Viem Public RPC Node Active</span>
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase font-bold">RPC Connection</span>
            <Activity className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 flex items-center gap-2">
            <span>Live Ethereum RPC</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 mt-1">
            Direct On-Chain Log Stream
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-600 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Filtered Transactions</span>
            <Zap className="h-4 w-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {transactions.length} <span className="text-xs font-normal text-slate-600 font-sans">txs</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 mt-1">
            Min threshold: {formatUSD(minAmountFilter || 0)}
          </div>
        </div>

      </div>

      {/* Control Bar: Refresh & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white border border-slate-300">
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchRealData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-mono border border-slate-900 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>{isLoading ? "Fetching EVM Logs..." : "Refresh On-Chain Logs"}</span>
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>

          <select
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(Number(e.target.value))}
            className="bg-white text-slate-900 border border-slate-400 px-3 py-2 focus:outline-none focus:border-red-700"
          >
            <option value={0}>All Amounts ($0+)</option>
            <option value={1000000}>&gt; $1,000,000</option>
            <option value={3000000}>&gt; $3,000,000</option>
            <option value={5000000}>&gt; $5,000,000 (Mega)</option>
          </select>

          <select
            value={tokenFilter}
            onChange={(e) => setTokenFilter(e.target.value)}
            className="bg-white text-slate-900 border border-slate-400 px-3 py-2 focus:outline-none focus:border-red-700"
          >
            <option value="ALL">All Tokens</option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="WBTC">WBTC</option>
          </select>

          <select
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
            className="bg-white text-slate-900 border border-slate-400 px-3 py-2 focus:outline-none focus:border-red-700"
          >
            <option value="ALL">All Networks</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>

      </div>

      {/* Transaction Feed Cards */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-12 border border-slate-300 bg-white text-slate-600 text-xs font-mono">
            No on-chain transactions match your filter options. Try adjusting filters.
          </div>
        ) : (
          transactions.map((tx) => (
            <WhaleCard key={tx.id} tx={tx} />
          ))
        )}
      </div>

    </div>
  );
};
