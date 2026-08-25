"use client";

import React, { useState, useEffect } from "react";
import { WhaleTransaction } from "../types/whale";
import { getWhaleTransactions, generateLiveWhaleTransaction } from "../services/fetch-whale-data";
import { WhaleCard } from "./whale-card";
import { formatUSD } from "@/lib/utils";
import { 
  Waves, 
  Play, 
  Pause, 
  Filter, 
  RefreshCw, 
  Activity, 
  DollarSign, 
  Zap, 
  TrendingUp 
} from "lucide-react";

export const WhaleFeed = () => {
  const [transactions, setTransactions] = useState<WhaleTransaction[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [minAmountFilter, setMinAmountFilter] = useState<number>(0);
  const [tokenFilter, setTokenFilter] = useState<string>("ALL");
  const [networkFilter, setNetworkFilter] = useState<string>("ALL");
  const [totalVolumeUSD, setTotalVolumeUSD] = useState<number>(0);

  // Load initial seed transactions via Service (Ambil Data)
  useEffect(() => {
    getWhaleTransactions().then((data) => {
      setTransactions(data);
      calculateVolume(data);
    });
  }, []);

  // Real-time WebSocket simulation interval
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newTx = generateLiveWhaleTransaction();
      setTransactions((prev) => {
        const updated = [newTx, ...prev.slice(0, 19)];
        calculateVolume(updated);
        return updated;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const calculateVolume = (txs: WhaleTransaction[]) => {
    const sum = txs.reduce((acc, t) => acc + t.amountUSD, 0);
    setTotalVolumeUSD(sum);
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (minAmountFilter > 0 && tx.amountUSD < minAmountFilter) return false;
    if (tokenFilter !== "ALL" && tx.tokenSymbol !== tokenFilter) return false;
    if (networkFilter !== "ALL" && tx.network !== networkFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Live Volume Tracked</span>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {formatUSD(totalVolumeUSD)}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Real-time On-Chain Flow</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Whale Stream Status</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white flex items-center gap-2">
            <span>{isStreaming ? "Streaming" : "Paused"}</span>
            {isStreaming && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            Auto-fetching RPC logs every 6s
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Active Alerts</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {filteredTransactions.length} <span className="text-xs font-normal text-slate-400 font-sans">txs</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-1">
            Min threshold: {formatUSD(minAmountFilter || 0)}
          </div>
        </div>

      </div>

      {/* Control Bar: Stream Toggle & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        
        {/* Stream Play/Pause Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 ${
              isStreaming
                ? "bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause Feed</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Resume Feed</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              const newTx = generateLiveWhaleTransaction();
              setTransactions((prev) => [newTx, ...prev]);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Simulate Tx</span>
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>

          {/* Min Amount Dropdown */}
          <select
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(Number(e.target.value))}
            className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value={0}>All Amounts ($0+)</option>
            <option value={1000000}>&gt; $1,000,000</option>
            <option value={3000000}>&gt; $3,000,000</option>
            <option value={5000000}>&gt; $5,000,000 (Mega)</option>
          </select>

          {/* Token Filter */}
          <select
            value={tokenFilter}
            onChange={(e) => setTokenFilter(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Tokens</option>
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="WBTC">WBTC</option>
          </select>

          {/* Network Filter */}
          <select
            value={networkFilter}
            onChange={(e) => setNetworkFilter(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
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
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-sm">
            No whale transactions match your active filters. Try resetting filters.
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <WhaleCard key={tx.id} tx={tx} />
          ))
        )}
      </div>

    </div>
  );
};
