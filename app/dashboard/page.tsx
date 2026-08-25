import { MetricsChart } from "@/modules/dashboard/components/metrics-chart";
import { SqlEditor } from "@/modules/dashboard/components/sql-editor";
import { BarChart3, Sparkles } from "lucide-react";

export const metadata = {
  title: "Blockchain Data Dashboard | Nexus Web3 Portfolio",
  description: "Dune-style SQL Analytics terminal and EVM protocol metrics.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Module 04 • On-Chain Relational Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Blockchain Data Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing protocol TVL trends, daily active wallets, gas burn charts, and Dune-style SQL terminal.
          </p>
        </div>
      </div>

      {/* Protocol Metrics & Visual Recharts */}
      <MetricsChart />

      {/* Dune Analytics SQL Console */}
      <SqlEditor />

    </div>
  );
}
