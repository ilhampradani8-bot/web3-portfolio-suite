import { MetricsChart } from "@/modules/dashboard/components/metrics-chart";
import { SqlEditor } from "@/modules/dashboard/components/sql-editor";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Blockchain Data Dashboard | MIJ Digital Web3 Suite",
  description: "Dune-style SQL Analytics terminal and EVM protocol metrics.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 font-mono pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-slate-900 text-white mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Module 04 • On-Chain Relational Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Blockchain Data Dashboard
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Real DefiLlama Protocol TVL Trends, EVM Active Wallets, and Dune-Style SQL Analytics
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
