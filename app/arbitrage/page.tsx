import { PriceMatrix } from "@/modules/arbitrage/components/price-matrix";
import { ProfitCalculator } from "@/modules/arbitrage/components/profit-calculator";
import { ArrowLeftRight } from "lucide-react";

export const metadata = {
  title: "DEX Arbitrage Scanner | MIJ Digital Web3 Suite",
  description: "Cross-DEX price disparity monitor and Flashloan ROI calculator.",
};

export default function ArbitragePage() {
  return (
    <div className="space-y-8 font-mono pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-slate-900 text-white mb-2">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Module 03 • DeFi Arbitrage Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            DEX Arbitrage Scanner
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real-Time Cross-DEX Price Discrepancy Monitor & Flashloan ROI Simulator
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
