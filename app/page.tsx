import Link from "next/link";
import { 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Code2,
  Building2,
  LineChart,
  Lock
} from "lucide-react";

export const metadata = {
  title: "Nexus Web3 Enterprise Suite | Decentralized Financial Analytics & Protocol Tools",
  description: "Institutional-grade Web3 platform featuring On-Chain Whale Stream, Decentralized Liquid Staking, Multi-DEX Arbitrage Engine, and Relational Blockchain Data Console.",
  keywords: ["Web3 Platform", "Decentralized Finance", "Whale Tracker", "ETH Staking", "DEX Scanner", "Dune Analytics SQL"],
};

export default function Home() {
  const projects = [
    {
      title: "1. Institutional On-Chain Whale Tracker",
      subtitle: "High-Frequency Real-Time Blockchain Stream",
      description: "Monitors high-value capital transfers (> $500,000 USD) across Ethereum, Arbitrum, and Polygon mainnets with direct Etherscan transaction audit links.",
      href: "/whale-tracker",
      icon: Waves,
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30",
      badge: "EVM Live Stream",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    },
    {
      title: "2. Non-Custodial ETH Staking Protocol",
      subtitle: "Liquid Staking & Real-Time Yield Compounder",
      description: "Non-custodial liquid staking interface offering 12.4% APY. Features real-time reward accrual ticker, compound yield calculator, and smart contract interaction.",
      href: "/staking",
      icon: Coins,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-emerald-500/30",
      badge: "12.4% APY Yield",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      title: "3. Multi-DEX Arbitrage Scanner",
      subtitle: "Cross-AMM Price Disparity & Flashloan Engine",
      description: "Real-time pricing matrix scanning Uniswap v3, Sushiswap, Curve, and PancakeSwap. Includes Flashloan ROI calculator with gas fee and slippage modeling.",
      href: "/arbitrage",
      icon: ArrowLeftRight,
      gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
      borderColor: "border-purple-500/30",
      badge: "Atomic Flashloan",
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    {
      title: "4. Enterprise Blockchain Data Console",
      subtitle: "Dune-Style Relational SQL Analytics Terminal",
      description: "Relational blockchain analytics suite featuring custom SQL terminal query execution, protocol TVL trends, active wallet metrics, and gas burn visualizer.",
      href: "/dashboard",
      icon: BarChart3,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-amber-500/30",
      badge: "Relational SQL",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
  ];

  return (
    <div className="space-y-12 py-4">
      
      {/* Hero Banner with Institutional Corporate Copywriting */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            <Building2 className="h-3.5 w-3.5" />
            <span>Nexus Enterprise Financial Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Decentralized Financial Analytics & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Protocol Suite</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Nexus Platform delivers institutional-grade Web3 data visibility and non-custodial protocol interaction. Powered by Next.js App Router, Viem, Ethers.js, and public EVM RPC nodes — operating 100% database-free with zero private key retention.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-200 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>EVM RPC Direct Connect</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Lock className="h-4 w-4 text-purple-400" />
              <span>Non-Custodial Architecture</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Vercel Edge Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Projects Grid Showcase */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Enterprise Protocol Modules</h2>
            <p className="text-xs text-slate-400">Select an active module below to explore protocol capabilities:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.href}
                href={project.href}
                className={`group relative overflow-hidden rounded-3xl border ${project.borderColor} bg-slate-900/80 p-6 sm:p-8 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between`}
              >
                <div className={`absolute top-0 right-0 h-48 w-48 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`}></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                      <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span>{project.title}</span>
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 mt-1 font-semibold">
                      {project.subtitle}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Launch Enterprise Module</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
}
