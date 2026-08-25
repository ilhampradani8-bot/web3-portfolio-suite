import Link from "next/link";
import { 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Lock,
  Zap,
  Globe,
  Database,
  Code2,
  Rocket
} from "lucide-react";

export const metadata = {
  title: "MIJ Digital Web3 Enterprise Suite | Decentralized Financial Analytics & Protocol Tools",
  description: "Institutional-grade Web3 platform featuring On-Chain Whale Stream, Decentralized Liquid Staking, Multi-DEX Arbitrage Engine, Relational Blockchain Data Console, and Smart Contract Deployer Studio.",
};

export default function Home() {

  const projects = [
    {
      title: "1. Institutional On-Chain Whale Tracker",
      subtitle: "High-Frequency Real-Time EVM Stream",
      description: "Monitors high-value capital transfers (> $500,000 USD) across Ethereum, Arbitrum, and Polygon mainnets with direct Etherscan transaction audit links.",
      href: "/whale-tracker",
      icon: Waves,
      badge: "Live Stream",
      badgeColor: "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]",
    },
    {
      title: "2. Non-Custodial ETH Staking Protocol",
      subtitle: "Liquid Staking & Real-Time Yield Compounder",
      description: "Non-custodial liquid staking interface offering 12.4% APY. Features real-time reward accrual ticker, compound yield calculator, and smart contract interaction.",
      href: "/staking",
      icon: Coins,
      badge: "12.4% APY Yield",
      badgeColor: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
    },
    {
      title: "3. Multi-DEX Arbitrage Scanner",
      subtitle: "Cross-AMM Price Disparity & Flashloan Engine",
      description: "Real-time pricing matrix scanning Uniswap v3, Sushiswap, Curve, and PancakeSwap. Includes Flashloan ROI calculator with gas fee and slippage modeling.",
      href: "/arbitrage",
      icon: ArrowLeftRight,
      badge: "Atomic Flashloan",
      badgeColor: "bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]",
    },
    {
      title: "4. Enterprise Blockchain Data Console",
      subtitle: "Dune-Style Relational SQL Analytics Terminal",
      description: "Relational blockchain analytics suite featuring custom SQL terminal query execution, protocol TVL trends, active wallet metrics, and gas burn visualizer.",
      href: "/dashboard",
      icon: BarChart3,
      badge: "Relational SQL",
      badgeColor: "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]",
    },
    {
      title: "5. Smart Contract Deployer Studio",
      subtitle: "No-Code EVM Contract Deployment Pipeline",
      description: "One-click deployment studio for ERC-20 Tokens, NFT Collections, Staking Vaults, and custom Solidity bytecodes directly to Sepolia Testnet or Ethereum Mainnet.",
      href: "/contract-deployer",
      icon: Rocket,
      badge: "EVM Deployer",
      badgeColor: "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]",
    },
  ];

  const techFeatures = [
    {
      icon: Lock,
      title: "100% Non-Custodial Security (Aman)",
      description: "Bebas dari risiko simpanan private key atau database terpusat. Seluruh transaksi dan saldo dibaca 100% langsung dari dompet browser MetaMask via Viem EVM RPC Client.",
      color: "text-emerald-700 bg-emerald-50 border-emerald-300",
    },
    {
      icon: Zap,
      title: "Lightweight Edge Architecture (Ringan)",
      description: "Dibangun dengan Next.js 16 App Router & Tailwind CSS tanpa bloatware. Render halaman instan di edge server Vercel & Cloudflare Pages dengan konsumsi bandwidth minimal.",
      color: "text-indigo-700 bg-indigo-50 border-indigo-300",
    },
    {
      icon: Cpu,
      title: "Alchemy Multichain WebSockets (Live)",
      description: "Terhubung ke Alchemy Dedicated Node Provider (300 Juta CU/Bulan) via WebSocket (`wss://`) untuk streaming blok dan transfer capital whale tanpa jeda delay.",
      color: "text-cyan-700 bg-cyan-50 border-cyan-300",
    },
    {
      icon: Globe,
      title: "Integrasi Real Public Open APIs",
      description: "Terhubung langsung ke DexScreener Open API (`api.dexscreener.com`) untuk harga real-time WETH/USDC dan DefiLlama Open API (`api.llama.fi`) untuk analisis TVL on-chain.",
      color: "text-purple-700 bg-purple-50 border-purple-300",
    },
  ];

  return (
    <div className="space-y-8 pb-4">
      
      {/* 100% Edge-to-Edge Full-Width Classic Banner with Background Image */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 mb-8 relative border-b border-slate-300 bg-slate-900 overflow-hidden text-white">
        
        {/* Full-Width Background Image Tag (Bulletproof Rendering) */}
        <img 
          src="/assets/baground.png" 
          alt="MIJ Digital Web3 Background" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Dark Overlay gradient for contrast & readability */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-10"></div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-bold bg-indigo-950/90 text-indigo-300 border border-indigo-500/50">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <span>MIJ DIGITAL • Web3 Enterprise Portfolio & Financial Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight uppercase">
            Decentralized Financial Analytics & <span className="text-indigo-400">Protocol Suite</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-4xl">
            Platform finansial Web3 modern bergaya institusional yang menggabungkan analisis data *on-chain real-time*, protokol *liquid staking non-custodial*, scanner arbitrase multi-DEX, hingga studio deployment *smart contract* Solidity.
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-white bg-slate-900/90 px-3.5 py-2 border border-slate-700 font-bold">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>Next.js 16 & Viem Client</span>
            </div>
            <div className="flex items-center gap-2 text-white bg-slate-900/90 px-3.5 py-2 border border-slate-700 font-bold">
              <Lock className="h-4 w-4 text-emerald-400" />
              <span>100% Non-Custodial Architecture</span>
            </div>
            <div className="flex items-center gap-2 text-white bg-slate-900/90 px-3.5 py-2 border border-slate-700 font-bold">
              <Database className="h-4 w-4 text-cyan-400" />
              <span>Alchemy RPC Node Direct</span>
            </div>
          </div>

        </div>
      </div>



      {/* Techstack & Security Architecture Section ("Aman & Ringan") */}
      <div className="space-y-4">
        <div className="border-b-2 border-slate-900 pb-2">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 uppercase">
            <Code2 className="h-5 w-5 text-indigo-600" />
            <span>Arsitektur Techstack (Aman, Ringan, & Modern)</span>
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Mengapa suite ini aman dari risiko keamanan dan cepat dijalankan di lingkungan lokal maupun cloud deployment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {techFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 bg-white border border-slate-300 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 border ${feat.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 Enterprise Protocol Modules Grid Showcase */}
      <div className="space-y-4 pt-2">
        <div className="border-b-2 border-slate-900 pb-2">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight uppercase">Enterprise Protocol Modules</h2>
          <p className="text-xs text-slate-600 font-medium">Pilih modul di bawah ini untuk berinteraksi langsung secara live:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white border border-slate-300 p-5 sm:p-6 transition-all duration-150 shadow-xs hover:border-slate-900 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 bg-slate-100 flex items-center justify-center border border-slate-300 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 border ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs font-mono text-indigo-700 font-bold mt-1">
                      {project.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Buka Modul Enterprise</span>
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




