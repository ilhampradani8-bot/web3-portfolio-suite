"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { useSidebar } from "@/context/sidebar-context";
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
  Rocket,
  PanelLeftClose,
  Bell
} from "lucide-react";
import { NotificationBell } from "@/components/shared/notification-bell";

export const Sidebar = () => {

  const pathname = usePathname();
  const { address, isConnected, balanceETH, hasMetaMask, walletError, connectWallet, disconnectWallet, clearWalletError } = useWallet();
  const { isDesktopCollapsed, isMobileOpen, toggleDesktopSidebar, toggleMobileSidebar, closeMobileSidebar } = useSidebar();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const navLinks = [
    { name: "Whale Tracker", href: "/whale-tracker", icon: Waves, badge: "Live Stream" },
    { name: "Staking dApp", href: "/staking", icon: Coins, badge: "12.4% APY" },
    { name: "DEX Scanner", href: "/arbitrage", icon: ArrowLeftRight, badge: "Arbitrage" },
    { name: "Data Dashboard", href: "/dashboard", icon: BarChart3, badge: "Analytics" },
    { name: "Contract Deployer", href: "/contract-deployer", icon: Rocket, badge: "Deploy" },
    { name: "Notif Settings", href: "/notification-settings", icon: Bell, badge: "Telegram" },
  ];


  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="lg:hidden sticky top-0 z-40 w-full bg-white border-b border-slate-300 p-4 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="MIJ Digital Logo" className="h-8 w-auto object-contain" />
          <span className="font-extrabold text-slate-900 text-base tracking-tight">MIJ Digital</span>
        </Link>

        <button
          onClick={toggleMobileSidebar}
          className="p-2 border border-slate-300 bg-slate-50 text-slate-800"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Left Sidebar Navigation Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-300 flex flex-col justify-between transition-transform duration-300 ${
        isMobileOpen
          ? "translate-x-0"
          : isDesktopCollapsed
          ? "-translate-x-full lg:-translate-x-full"
          : "-translate-x-full lg:translate-x-0"
      }`}>
        
        <div>
          {/* Full-Width Logo Header Section (No Card Wrapper) */}
          <div className="p-5 border-b border-slate-300 bg-slate-50 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 w-full">
              <img src="/logo.jpeg" alt="MIJ Digital Logo" className="h-9 w-auto object-contain shrink-0" />
              <div className="min-w-0">
                <div className="font-black text-slate-900 text-base tracking-tight leading-none truncate">MIJ DIGITAL</div>
                <div className="text-[10px] uppercase font-mono text-indigo-600 font-bold tracking-wider mt-1">
                  Web3 Enterprise
                </div>
              </div>
            </Link>

            {/* Desktop Hide/Collapse Sidebar Toggle Button */}
            <button
              onClick={toggleDesktopSidebar}
              title="Sembunyikan Sidebar"
              className="hidden lg:flex p-1.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 ml-2"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-4 space-y-1">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Platform Modules
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileSidebar}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition-all border ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className={`text-[9px] font-mono px-2 py-0.5 border font-bold ${
                      isActive ? "bg-white text-slate-900 border-white" : "bg-slate-100 text-slate-600 border-slate-300"
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
        <div className="p-4 border-t border-slate-300 bg-slate-50 space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-700">
            <span className="flex items-center gap-2 font-bold">
              <span className={`h-2 w-2 ${isConnected ? "bg-emerald-600 animate-pulse" : "bg-slate-400"}`}></span>
              {isConnected ? "MetaMask Active" : "Disconnected"}
            </span>
            <NotificationBell align="sidebar" />
          </div>

          {isConnected ? (
            <div className="p-3 border border-slate-900 bg-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-900">{shortenAddress(address || "")}</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 border border-emerald-200">{balanceETH} ETH</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[11px] font-mono">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Connected
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
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-900 flex items-center justify-center gap-2 shadow-xs"
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Real Wallet</span>
            </button>
          )}

          <div className="text-[10px] font-mono text-slate-500 text-center font-semibold">
            Non-Custodial EVM Protocol
          </div>

        </div>

      </aside>

      {/* Real Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md border-2 border-slate-900 bg-white p-6 shadow-2xl space-y-4">
            <button
              onClick={() => {
                clearWalletError();
                setShowWalletModal(false);
              }}
              className="absolute top-4 right-4 p-1.5 border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-300 bg-white p-1">
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
                  <span className="text-2xl">🦊</span>
                  <div className="text-left">
                    <div className="text-sm font-bold">Hubungkan MetaMask (Live)</div>
                    <div className="text-[10px] text-slate-300 font-normal">Membaca alamat & saldo ETH asli via browser extension</div>
                  </div>
                </div>
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-700 text-white font-bold text-xs border border-red-800 hover:bg-red-800"
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



