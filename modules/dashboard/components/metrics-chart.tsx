"use client";

import React, { useState, useEffect } from "react";
import { ProtocolMetric } from "../types/analytics";
import { getProtocolMetrics } from "../services/fetch-analytics";
import { formatUSD } from "@/lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { BarChart3, TrendingUp, Users, Fuel, DollarSign } from "lucide-react";

export const MetricsChart = () => {
  const [metrics, setMetrics] = useState<ProtocolMetric[]>([]);

  useEffect(() => {
    getProtocolMetrics().then(setMetrics);
  }, []);

  const latestMetric = metrics[metrics.length - 1] || {
    tvlMillions: 55.8,
    dailyActiveWallets: 538000,
    gasPriceGwei: 12,
    dexVolumeMillions: 1940,
  };

  return (
    <div className="space-y-6">
      
      {/* 4 Protocol Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Total Value Locked</span>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            ${latestMetric.tvlMillions}M
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+14.2% this week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Daily Active Wallets</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {latestMetric.dailyActiveWallets.toLocaleString()}
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>All-Time High</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">DEX Trading Volume</span>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            ${latestMetric.dexVolumeMillions}M
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>24h Liquidity Flow</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase">Network Gas Price</span>
            <Fuel className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {latestMetric.gasPriceGwei} <span className="text-xs text-slate-400 font-normal">Gwei</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            Low Base Fee (Fast Finality)
          </div>
        </div>

      </div>

      {/* Interactive Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TVL Growth Chart */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              Protocol TVL Growth ($ Millions)
            </h4>
            <span className="text-xs font-mono text-slate-400">7-Day Trend</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(value: any) => [`$${value}M`, "TVL"]}
                />
                <Area type="monotone" dataKey="tvlMillions" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#tvlGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Active Wallets Bar Chart */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              Daily Active Wallets
            </h4>
            <span className="text-xs font-mono text-slate-400">On-Chain Users</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                  formatter={(value: any) => [value.toLocaleString(), "Active Wallets"]}
                />
                <Bar dataKey="dailyActiveWallets" fill="#c084fc" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
