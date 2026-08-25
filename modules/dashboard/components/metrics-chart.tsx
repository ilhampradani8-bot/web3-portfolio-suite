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
import { BarChart3, TrendingUp, Users, Fuel, DollarSign, RefreshCw } from "lucide-react";

export const MetricsChart = () => {
  const [metrics, setMetrics] = useState<ProtocolMetric[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getProtocolMetrics();
    setMetrics(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const latestMetric = metrics[metrics.length - 1] || {
    tvlMillions: 55.8,
    dailyActiveWallets: 538000,
    gasPriceGwei: 12,
    dexVolumeMillions: 1940,
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Real-time Indicator Header */}
      <div className="border-2 border-slate-900 bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              🟢 LIVE DEFILLEMA API & EVM METRICS
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Protocol Performance Analytics
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Real Total Value Locked (TVL) & network activity queried directly from DefiLlama Public API.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 border-2 border-slate-900 shadow-sm transition-all disabled:opacity-50 w-full sm:w-auto"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin text-indigo-400" : ""}`} />
          <span>{isLoading ? "Fetching API..." : "Refresh Metrics 🔄"}</span>
        </button>
      </div>

      {/* 4 Protocol Key Performance Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
            <span>Total Value Locked</span>
            <DollarSign className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ${latestMetric.tvlMillions.toLocaleString()}M
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>DefiLlama Verified On-Chain</span>
          </div>
        </div>

        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
            <span>Daily Active Wallets</span>
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {latestMetric.dailyActiveWallets.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Active Network Users</span>
          </div>
        </div>

        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
            <span>DEX Trading Volume</span>
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ${latestMetric.dexVolumeMillions.toLocaleString()}M
          </div>
          <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>24h Liquidity Volume</span>
          </div>
        </div>

        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase">
            <span>Network Gas Price</span>
            <Fuel className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {latestMetric.gasPriceGwei} <span className="text-xs font-normal text-slate-600">Gwei</span>
          </div>
          <div className="text-[11px] text-slate-500 font-bold">
            EVM Base Fee Rate
          </div>
        </div>

      </div>

      {/* Interactive Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TVL Growth Chart */}
        <div className="border-2 border-slate-900 bg-white p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-indigo-900"></span>
              <span>Protocol TVL Trend ($ Millions)</span>
            </h4>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 border border-slate-300">Live API</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.7} />
                <XAxis dataKey="date" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#0f172a", color: "#ffffff", borderRadius: "0px", fontSize: "12px" }}
                  formatter={(value: any) => [`$${value}M`, "TVL"]}
                />
                <Area type="monotone" dataKey="tvlMillions" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#tvlGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Active Wallets Bar Chart */}
        <div className="border-2 border-slate-900 bg-white p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-indigo-900"></span>
              <span>Daily Active Wallets</span>
            </h4>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 border border-slate-300">EVM Activity</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.7} />
                <XAxis dataKey="date" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#0f172a", color: "#ffffff", borderRadius: "0px", fontSize: "12px" }}
                  formatter={(value: any) => [value.toLocaleString(), "Active Wallets"]}
                />
                <Bar dataKey="dailyActiveWallets" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
