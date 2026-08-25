import { PriceMatrix } from "@/modules/arbitrage/components/price-matrix";
import { ProfitCalculator } from "@/modules/arbitrage/components/profit-calculator";
import { ArrowLeftRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "DEX Arbitrage Scanner | Nexus Web3 Portfolio",
  description: "Cross-DEX price disparity monitor and Flashloan ROI calculator.",
};

export default function ArbitragePage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Module 03 • DeFi Arbitrage Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            DEX Arbitrage Scanner
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scans price discrepancies across Uniswap, Sushiswap, Curve, and PancakeSwap in real-time.
          </p>
        </div>
      </div>

      {/* Component 1: Price Matrix */}
      <PriceMatrix />

      {/* Component 2: Flashloan Profit & Gas ROI Calculator */}
      <ProfitCalculator />

    </div>
  );
}
