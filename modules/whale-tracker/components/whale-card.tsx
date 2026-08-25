import React from "react";
import { WhaleTransaction } from "../types/whale";
import { formatUSD, shortenAddress, getAddressColor } from "@/lib/utils";
import { ArrowRight, ExternalLink, ShieldAlert, ArrowUpRight, Zap } from "lucide-react";

interface WhaleCardProps {
  tx: WhaleTransaction;
}

export const WhaleCard: React.FC<WhaleCardProps> = ({ tx }) => {
  const isHugeAlert = tx.amountUSD >= 5000000;

  return (
    <div className={`group relative overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
      isHugeAlert 
        ? "bg-gradient-to-r from-red-950/20 via-slate-900 to-slate-900 border-red-500/40 shadow-lg shadow-red-500/5 hover:border-red-500/70"
        : "bg-slate-900/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900"
    }`}>
      
      {/* Top Bar: Network, Type & Etherscan Link */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/60 text-xs">
        <div className="flex items-center gap-2">
          <span className={`font-mono px-2 py-0.5 rounded-full text-[10px] font-bold ${
            tx.network === "Ethereum" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
            tx.network === "Polygon" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
            "bg-blue-500/10 text-blue-400 border border-blue-500/20"
          }`}>
            {tx.network}
          </span>
          <span className="font-mono text-slate-400 px-2 py-0.5 rounded-md bg-slate-800/60">
            {tx.transactionType}
          </span>
          {isHugeAlert && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full font-bold animate-pulse">
              <ShieldAlert className="h-3 w-3" />
              MEGA WHALE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-500">{tx.timestamp}</span>
          <a
            href={tx.etherscanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>Explorer</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Main Amount & USD Value */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="text-2xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
            <span>{formatUSD(tx.amountUSD)}</span>
            <span className="text-sm font-semibold text-slate-400 font-sans">
              ({tx.amount.toLocaleString()} {tx.tokenSymbol})
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5">
            Tx Fee: ~${tx.txFeeUSD} • Block #{tx.blockNumber}
          </div>
        </div>

        <div className="self-start sm:self-center">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono ${
            tx.tokenSymbol === "ETH" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" :
            tx.tokenSymbol === "WBTC" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" :
            "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          }`}>
            <Zap className="h-3.5 w-3.5" />
            {tx.tokenSymbol}
          </span>
        </div>
      </div>

      {/* Movement Details: Sender -> Receiver */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/40">
        
        {/* Sender */}
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getAddressColor(tx.sender)} flex items-center justify-center font-mono text-[10px] text-white font-bold shrink-0 shadow`}>
            FROM
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-200 truncate">
              {tx.senderLabel || "Unknown Wallet"}
            </div>
            <div className="text-[11px] font-mono text-slate-500 truncate">
              {shortenAddress(tx.sender, 6)}
            </div>
          </div>
        </div>

        {/* Direction Arrow & Receiver */}
        <div className="flex items-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-800/60 sm:pl-3">
          <ArrowRight className="h-4 w-4 text-cyan-500 shrink-0 hidden sm:block" />
          <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getAddressColor(tx.receiver)} flex items-center justify-center font-mono text-[10px] text-white font-bold shrink-0 shadow`}>
            TO
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-200 truncate">
              {tx.receiverLabel || "Unknown Wallet"}
            </div>
            <div className="text-[11px] font-mono text-slate-500 truncate">
              {shortenAddress(tx.receiver, 6)}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
