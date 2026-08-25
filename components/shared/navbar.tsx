"use client";

import React, { useState } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { useSidebar } from "@/context/sidebar-context";
import { shortenAddress, getAddressColor } from "@/lib/utils";
import { NotificationBell } from "@/components/shared/notification-bell";
import { QuickSettingsModal } from "@/components/shared/quick-settings-modal";
import { 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  Wallet, 
  LogOut, 
  CheckCircle2,
  Menu,
  X,
  Rocket,
  AlertCircle,
  ExternalLink,
  PanelLeft,
  PanelLeftClose,
  Bell,
  Bot
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { address, isConnected, balanceETH, hasMetaMask, walletError, connectWallet, disconnectWallet, clearWalletError } = useWallet();
  const { isDesktopCollapsed, toggleDesktopSidebar } = useSidebar();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);

  const navLinks = [
    { name: "Whale Tracker", href: "/whale-tracker", icon: Waves, badge: "Live Stream" },
    { name: "Staking dApp", href: "/staking", icon: Coins, badge: "12.4% APY" },
    { name: "DEX Scanner", href: "/arbitrage", icon: ArrowLeftRight, badge: "Arbitrage" },
    { name: "Data Dashboard", href: "/dashboard", icon: BarChart3, badge: "Analytics" },
    { name: "Contract Deployer", href: "/contract-deployer", icon: Rocket, badge: "Deploy" },
    { name: "Notif Settings", href: "/notification-settings", icon: Bell, badge: "Telegram" },
  ];

  // Get active page name
  const activePage = navLinks.find(link => link.href === pathname)?.name || "Web3 Suite";

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-300 bg-white">
        <div className="w-full max-w-full items-center justify-between px-4 sm:px-6 lg:px-8 flex py-3 gap-3">
          
          {/* Left Action: Desktop Sidebar Collapse/Expand Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDesktopSidebar}
              title={isDesktopCollapsed ? "Tampilkan Sidebar (Desktop)" : "Sembunyikan Sidebar (Desktop)"}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all"
            >
              {isDesktopCollapsed ? (
                <>
                  <PanelLeft className="h-4 w-4 text-indigo-600" />
                  <span>Show Sidebar</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="h-4 w-4 text-slate-600" />
                  <span>Hide Sidebar</span>
                </>
              )}
            </button>

            {/* Active Module Indicator */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1.5 border border-slate-300">
              <span className="h-2 w-2 bg-indigo-600"></span>
              <span>Module: {activePage}</span>
            </div>
          </div>

          {/* Top Right Action Area: Telegram Hub Button, Notification Bell & Wallet Connect */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Telegram & Quick Settings Button (=) */}
            <button
              onClick={() => setShowQuickSettings(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-mono font-bold shadow-xs transition-all"
              title="Buka Telegram Hub & Quick Settings"
            >
              <Bot className="h-4 w-4 text-indigo-600" />
              <span className="hidden md:inline">Telegram & Settings</span>
              <span className="font-mono text-xs bg-indigo-600 text-white px-1.5 py-0.2 font-extrabold">=</span >
            </button>

            {/* Notification Bell */}
            <NotificationBell align="navbar" />

            {/* Wallet Connect / Login Button */}
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1.5">
                  <div className="text-right text-xs font-mono">
                    <div className="text-slate-900 font-bold">{balanceETH} ETH</div>
                    <div className="text-[10px] text-emerald-700 font-bold">{shortenAddress(address || "")}</div>
                  </div>
                  <div className={`h-7 w-7 bg-gradient-to-br ${getAddressColor(address || "")} border border-emerald-400 flex items-center justify-center font-mono text-xs text-white font-bold`}>
                    {address?.substring(2, 4).toUpperCase()}
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="p-2 bg-white text-slate-700 border border-slate-300 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  clearWalletError();
                  setShowWalletModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 transition-all shadow-xs"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Real Wallet</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Quick Settings & Telegram Control Modal */}
      <QuickSettingsModal
        isOpen={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />


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



