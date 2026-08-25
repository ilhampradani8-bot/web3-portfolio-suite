"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { useTheme } from "@/context/theme-context";
import { shortenAddress, getAddressColor } from "@/lib/utils";
import { 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  BarChart3, 
  Wallet, 
  Sparkles, 
  LogOut, 
  CheckCircle2,
  Menu,
  X,
  Building2
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { address, isConnected, isDemo, balanceETH, connectWallet, connectDemoWallet, disconnectWallet } = useWallet();
  const { theme, toggleTheme } = useTheme();
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
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="w-full max-w-full items-center justify-between px-4 sm:px-6 lg:px-12 flex py-3">
          
          {/* Logo MIJ Digital & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-slate-800 to-black p-[1px] shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white overflow-hidden p-0.5">
                <img
                  src="/logo.jpeg"
                  alt="MIJ Digital Logo"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                MIJ<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Digital</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-slate-400">Web3 Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/50"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: UI Theme Switcher, Wallet Connect & Network Status */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* UI Theme Toggle Button (Futuristic vs Classic Paper White) */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === "futuristic" ? "Classic Paper White" : "Futuristic Dark"} UI`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors"
            >
              {theme === "futuristic" ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Futuristic UI</span>
                </>
              ) : (
                <>
                  <Building2 className="h-3.5 w-3.5 text-amber-600" />
                  <span>Paper White UI</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>ETH Mainnet</span>
            </div>

            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1 pl-3 rounded-xl">
                  <div className="text-right text-xs">
                    <div className="font-mono text-slate-200 font-bold">{balanceETH} ETH</div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center justify-end gap-1">
                      {isDemo ? (
                        <span className="text-amber-400 bg-amber-400/10 px-1 rounded">Demo Wallet</span>
                      ) : (
                        <span className="text-emerald-400">Connected</span>
                      )}
                    </div>
                  </div>
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${getAddressColor(address || "")} flex items-center justify-center font-mono text-xs text-white font-bold shadow-md`}>
                    {address?.substring(2, 4).toUpperCase()}
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 border border-slate-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 transform active:scale-95"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold ${
                      isActive ? "bg-slate-900 text-cyan-400 border border-slate-800" : "text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
              >
                <span>UI Theme Mode</span>
                <span className="text-cyan-400 font-bold uppercase">{theme}</span>
              </button>

              {isConnected ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-xs font-mono text-slate-200">{shortenAddress(address || "")}</div>
                    <div className="text-xs font-mono text-cyan-400 font-bold">{balanceETH} ETH</div>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="p-2 text-red-400 bg-red-400/10 rounded-lg text-xs"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowWalletModal(true);
                  }}
                  className="w-full py-3 text-center text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-xl"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-500/10">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-2 mb-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 overflow-hidden p-1">
                <img src="/logo.jpeg" alt="MIJ Digital" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-lg font-bold text-white">Connect Web3 Wallet</h3>
              <p className="text-xs text-slate-400">
                Choose a wallet to interact with on-chain features or enter Demo Mode instantly.
              </p>
            </div>

            <div className="space-y-3">
              {/* MetaMask Option */}
              <button
                onClick={async () => {
                  await connectWallet();
                  setShowWalletModal(false);
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 font-bold">
                    🦊
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-400">MetaMask / Injected</div>
                    <div className="text-[11px] text-slate-400">Connect via browser extension</div>
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-slate-600 group-hover:text-cyan-400" />
              </button>

              {/* Instant Demo Wallet Option */}
              <button
                onClick={() => {
                  connectDemoWallet();
                  setShowWalletModal(false);
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-purple-950/40 hover:from-cyan-900/40 hover:to-purple-900/40 border border-cyan-500/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-cyan-300">Instant Demo Mode</div>
                    <div className="text-[11px] text-slate-400">Pre-funded test wallet (No extension needed)</div>
                  </div>
                </div>
                <span className="text-xs font-mono px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Recommended
                </span>
              </button>
            </div>

            <div className="mt-6 text-center text-[11px] text-slate-500">
              By connecting, you agree to inspect on-chain public data.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
