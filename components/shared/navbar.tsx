"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { shortenAddress, getAddressColor } from "@/lib/utils";
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
  Rocket
} from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const { address, isConnected, balanceETH, connectWallet, disconnectWallet } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Whale Tracker", href: "/whale-tracker", icon: Waves, badge: "Live" },
    { name: "Staking dApp", href: "/staking", icon: Coins, badge: "12.4% APY" },
    { name: "DEX Scanner", href: "/arbitrage", icon: ArrowLeftRight, badge: "Arbitrage" },
    { name: "Data Dashboard", href: "/dashboard", icon: BarChart3, badge: "Analytics" },
    { name: "Contract Deployer", href: "/contract-deployer", icon: Rocket, badge: "Deploy" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-300 bg-white">
        <div className="w-full max-w-full items-center justify-between px-4 sm:px-6 lg:px-12 flex py-3">
          
          {/* Logo MIJ Digital & Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 border border-slate-400 p-0.5 bg-white">
              <img
                src="/logo.jpeg"
                alt="MIJ Digital Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1">
                MIJ<span className="text-red-700 font-black">Digital</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-slate-500">Web3 Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 border border-slate-300">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Wallet Connect */}
          <div className="hidden sm:flex items-center gap-3">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white border-2 border-slate-900 p-1 pl-3">
                  <div className="text-right text-xs font-mono">
                    <div className="text-slate-900 font-bold">{balanceETH} ETH</div>
                    <div className="text-[10px] text-emerald-700 font-bold">MetaMask Connected</div>
                  </div>
                  <div className={`h-8 w-8 bg-gradient-to-br ${getAddressColor(address || "")} flex items-center justify-center font-mono text-xs text-white font-bold`}>
                    {address?.substring(2, 4).toUpperCase()}
                  </div>
                </div>

                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="p-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-sm"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>

        </div>
      </header>
    </>
  );
};
