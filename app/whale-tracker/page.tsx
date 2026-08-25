import { WhaleFeed } from "@/modules/whale-tracker/components/whale-feed";
import { Waves, Sparkles } from "lucide-react";

export const metadata = {
  title: "On-Chain Whale Tracker | Nexus Web3 Portfolio",
  description: "Real-time Ethereum & EVM whale transaction tracker.",
};

export default function WhaleTrackerPage() {
  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Waves className="h-3.5 w-3.5" />
            <span>Module 01 • EVM On-Chain Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            On-Chain Whale Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitoring live large transactions (&gt; $500,000 USD) across Ethereum, Arbitrum, and Polygon.
          </p>
        </div>
      </div>

      {/* Main Module Content (Tampilkan Data Feed Component) */}
      <WhaleFeed />

    </div>
  );
}
