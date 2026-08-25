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
  CheckCircle2,
  X,
  Menu,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();
  const { address, isConnected, balanceETH, hasMetaMask, walletError, connectWallet, disconnectWallet, clearWalletError } = useWallet();
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

      {/* Left Sidebar Navigation */}
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

        {/* Bottom Sidebar Real Wallet Status */}
        <div className="p-6 border-t-2 border-slate-900 bg-slate-50 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-700">
            <span className="flex items-center gap-1.5 font-bold">
              <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-emerald-600 animate-pulse" : "bg-slate-400"}`}></span>
              {isConnected ? "MetaMask Active" : "Wallet Disconnected"}
            </span>
          </div>

          {isConnected ? (
            <div className="p-3 border-2 border-slate-900 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">{shortenAddress(address || "")}</span>
                <span className="text-emerald-700 font-bold">{balanceETH} ETH</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] font-mono">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  MetaMask Connected
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
              onClick={() => {
                clearWalletError();
                setShowWalletModal(true);
              }}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-900 flex items-center justify-center gap-2 shadow-sm"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Real Wallet</span>
            </button>
          )}

          <div className="text-[10px] font-mono text-slate-500 text-center">
            Non-Custodial EVM Direct
          </div>

        </div>

      </aside>

      {/* Real Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md border-2 border-slate-900 bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => {
                clearWalletError();
                setShowWalletModal(false);
              }}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-400 bg-white p-1">
                <img src="/logo.jpeg" alt="MIJ Digital" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Hubungkan Dompet Real (MetaMask)</h3>
              <p className="text-xs text-slate-600">
                Aplikasi ini terhubung 100% secara langsung ke dompet Web3 MetaMask Anda.
              </p>
            </div>

            {walletError && (
              <div className="p-3 border-2 border-amber-800 bg-amber-50 text-amber-900 text-xs font-mono space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-700" />
                  <span>Petunjuk Koneksi MetaMask:</span>
                </div>
                <div className="leading-relaxed text-[11px]">{walletError}</div>
              </div>
            )}

            {hasMetaMask ? (
              <button
                onClick={async () => {
                  await connectWallet();
                  if (!walletError) {
                    setShowWalletModal(false);
                  }
                }}
                className="w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 font-bold text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🦊</span>
                  <div className="text-left">
                    <div>Hubungkan MetaMask (Live)</div>
                    <div className="text-[10px] text-slate-300 font-normal">Membaca alamat & saldo ETH asli via browser extension</div>
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </button>
            ) : (
              <div className="p-4 border-2 border-red-800 bg-red-50 text-red-900 space-y-3">
                <div className="flex items-start gap-2.5 text-xs font-bold">
                  <AlertCircle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
                  <div>MetaMask Tidak Terdeteksi di Browser Anda</div>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  Sistem tidak menemukan extension dompet MetaMask di browser Anda. Untuk berinteraksi secara real dengan blockchain, silakan pasang extension MetaMask.
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white font-bold text-xs hover:bg-red-800"
                >
                  <span>Download Extension MetaMask</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            <div className="text-center text-[11px] font-mono text-slate-500 border-t border-slate-200 pt-3">
              Keamanan 100% Non-Custodial • Bebas Dari Simpanan Private Key
            </div>
          </div>
        </div>
      )}
    </>
  );
};
