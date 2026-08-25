"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { shortenAddress } from "@/lib/utils";
import { 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  Wallet, 
  LogOut, 
  CheckCircle2,
  X,
  Menu,
  ShieldCheck,
  Building2
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { address, isConnected, isDemo, balanceETH, connectWallet, connectDemoWallet, disconnectWallet } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Whale Tracker", href: "/whale-tracker", icon: Waves, badge: "Live" },
    { name: "Staking dApp", href: "/staking", icon: Coins, badge: "12.4% APY" },
    { name: "DEX Scanner", href: "/arbitrage", icon: ArrowLeftRight, badge: "Arbitrage" },
    { name: "Data Dashboard", href: "/dashboard", icon: BarChart3, badge: "Analytics" },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-white border-b border-slate-300 p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="MIJ Digital Logo" className="h-8 w-8 object-contain border border-slate-300" />
          <span className="font-bold text-slate-900 text-base">MIJ Digital</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 border border-slate-400 bg-slate-100 text-slate-900"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r-2 border-slate-900 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        
        <div className="p-6 space-y-6">
          
          {/* Logo & Platform Header */}
          <Link href="/" className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
            <div className="h-10 w-10 border border-slate-400 p-0.5 bg-white">
              <img src="/logo.jpeg" alt="MIJ Digital Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base tracking-tight leading-none">MIJ DIGITAL</div>
              <div className="text-[10px] uppercase font-mono text-red-700 tracking-wider font-bold mt-1">Web3 Enterprise</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
              Platform Modules
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 border text-xs font-bold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 border ${
                      isActive ? "border-white text-white" : "border-slate-400 text-slate-600"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Bottom Sidebar Wallet Action & Network Status */}
        <div className="p-6 border-t-2 border-slate-900 bg-slate-50 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              Mainnet RPC
            </span>
            <span className="text-[10px] text-slate-500">Public Node</span>
          </div>

          {isConnected ? (
            <div className="p-3 border border-slate-400 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">{shortenAddress(address || "")}</span>
                <span className="text-emerald-700 font-bold">{balanceETH} ETH</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] font-mono">
                <span className={isDemo ? "text-amber-700 font-bold" : "text-emerald-700 font-bold"}>
                  {isDemo ? "Demo Sandbox" : "MetaMask Live"}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="text-red-700 hover:underline font-bold"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowWalletModal(true)}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-900 flex items-center justify-center gap-2 shadow-sm"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </button>
          )}

          <div className="text-[10px] font-mono text-slate-500 text-center">
            Non-Custodial Protocol
          </div>

        </div>

      </aside>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md border-2 border-slate-900 bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-400 bg-white p-1">
                <img src="/logo.jpeg" alt="MIJ Digital" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Connect Web3 Wallet</h3>
              <p className="text-xs text-slate-600">
                Pilih opsi di bawah ini untuk menghubungkan dompet Web3 Anda atau menguji via Instant Sandbox.
              </p>
            </div>

            <div className="space-y-3">
              {/* Real MetaMask Option */}
              <button
                onClick={async () => {
                  await connectWallet();
                  setShowWalletModal(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 border-2 border-slate-900 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 border border-orange-400 bg-orange-50 flex items-center justify-center text-orange-700 font-bold">
                    🦊
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">MetaMask / Injected (Dompet ASLI)</div>
                    <div className="text-[11px] text-slate-500">Membaca alamat & saldo ETH asli via Extension</div>
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-slate-400 group-hover:text-emerald-600" />
              </button>

              {/* Instant Sandbox Demo Option */}
              <button
                onClick={() => {
                  connectDemoWallet();
                  setShowWalletModal(false);
                }}
                className="w-full flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100/60 border-2 border-amber-800 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 border border-amber-600 bg-amber-200/60 flex items-center justify-center text-amber-900 font-bold">
                    ⚡
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-amber-900">Instant Demo Sandbox</div>
                    <div className="text-[11px] text-amber-800">Pre-funded test wallet (Tanpa perlu MetaMask)</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-200 text-amber-900 font-bold border border-amber-600">
                  Penguji
                </span>
              </button>
            </div>

            <div className="mt-6 text-center text-[11px] font-mono text-slate-500 border-t border-slate-200 pt-3">
              Keamanan 100% Non-Custodial • Tidak Menyimpan Private Key
            </div>
          </div>
        </div>
      )}
    </>
  );
};
