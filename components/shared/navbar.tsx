"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/context/wallet-context";
import { useSidebar } from "@/context/sidebar-context";
import { shortenAddress, getAddressColor, formatUSD } from "@/lib/utils";
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
  Bot,
  Copy,
  Check,
  RefreshCw,
  Coins as CoinIcon,
  Radio,
  Loader2
} from "lucide-react";

interface DetectedToken {
  symbol: string;
  name: string;
  network: string;
  balance: string;
  numericBalance: number;
  usdValue: number;
  icon: string;
}

export const Navbar = () => {
  const pathname = usePathname();
  const {
    address,
    isConnected,
    balanceETH,
    chainName,
    chainId,
    hasMetaMask,
    isDetecting,
    isConnecting,
    detectionStatus,
    walletError,
    connectWallet,
    disconnectWallet,
    clearWalletError,
    refreshBalance,
  } = useWallet();

  const { isDesktopCollapsed, toggleDesktopSidebar } = useSidebar();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navLinks = [
    { name: "Whale Tracker", href: "/whale-tracker", icon: Waves, badge: "Live Stream" },
    { name: "Staking dApp", href: "/staking", icon: Coins, badge: "12.4% APY" },
    { name: "DEX Scanner", href: "/arbitrage", icon: ArrowLeftRight, badge: "Arbitrage" },
    { name: "Data Dashboard", href: "/dashboard", icon: BarChart3, badge: "Analytics" },
    { name: "Contract Deployer", href: "/contract-deployer", icon: Rocket, badge: "Deploy" },
    { name: "Notif Settings", href: "/notification-settings", icon: Bell, badge: "Telegram" },
  ];

  const activePage = navLinks.find((link) => link.href === pathname)?.name || "Web3 Suite";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Build real list of detected coins/tokens (CRITICAL FILTER: ONLY BALANCE > 0)
  const numEth = parseFloat(balanceETH) || 0;

  const allPossibleTokens: DetectedToken[] = [
    {
      symbol: chainId === 11155111 ? "Sepolia ETH" : "ETH",
      name: chainId === 11155111 ? "Ethereum Sepolia Testnet" : "Ethereum Native Token",
      network: chainName,
      balance: balanceETH,
      numericBalance: numEth,
      usdValue: numEth * 3200,
      icon: "Ξ",
    },
    {
      symbol: "USDC",
      name: "USD Coin (Circle)",
      network: chainName,
      balance: "0.00",
      numericBalance: 0,
      usdValue: 0,
      icon: "💵",
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      network: chainName,
      balance: "0.00",
      numericBalance: 0,
      usdValue: 0,
      icon: "💲",
    },
    {
      symbol: "NEXUS",
      name: "Nexus Reward Token",
      network: chainName,
      balance: "0.00",
      numericBalance: 0,
      usdValue: 0,
      icon: "💎",
    },
  ];

  // MANDATORY FILTER: ONLY SHOW TOKENS THAT HAVE BALANCE > 0
  const detectedTokensWithBalance = allPossibleTokens.filter((token) => token.numericBalance > 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-300 bg-white">
        <div className="w-full max-w-full items-center justify-between px-4 sm:px-6 lg:px-8 flex py-3 gap-3">
          
          {/* Left Action: Desktop Sidebar Collapse/Expand Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDesktopSidebar}
              title={isDesktopCollapsed ? "Show Sidebar" : "Hide Sidebar"}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all font-mono"
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

          {/* Top Right Action Area */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Telegram & Quick Settings Button (=) */}
            <button
              onClick={() => setShowQuickSettings(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-mono font-bold shadow-xs transition-all"
              title="Open Telegram Hub & Quick Settings"
            >
              <Bot className="h-4 w-4 text-indigo-600" />
              <span className="hidden md:inline">Telegram & Settings</span>
              <span className="font-mono text-xs bg-indigo-600 text-white px-1.5 py-0.2 font-extrabold">=</span >
            </button>

            {/* Notification Bell */}
            <NotificationBell align="navbar" />

            {/* Connected Wallet Profile Trigger */}
            {isConnected ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 text-left transition-all group"
                  title="Click to view Wallet Profile & Detected Coin Balances"
                >
                  <div className="text-right text-xs font-mono">
                    <div className="text-slate-900 font-bold group-hover:text-indigo-700">{balanceETH} ETH</div>
                    <div className="text-[10px] text-emerald-700 font-bold">{shortenAddress(address || "")}</div>
                  </div>
                  <div className={`h-7 w-7 bg-gradient-to-br ${getAddressColor(address || "")} border border-emerald-400 flex items-center justify-center font-mono text-xs text-white font-bold shrink-0`}>
                    {address?.substring(2, 4).toUpperCase()}
                  </div>
                </button>

                <button
                  onClick={disconnectWallet}
                  title="Disconnect Wallet"
                  className="p-2 bg-white text-slate-700 border border-slate-300 hover:bg-red-50 hover:text-red-700 transition-all"
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
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 transition-all shadow-xs font-mono"
              >
                {isConnecting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                ) : (
                  <Wallet className="h-4 w-4" />
                )}
                <span>{isConnecting ? "Connecting..." : "Connect Real Wallet"}</span>
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

      {/* Connected Wallet Profile Popup Modal */}
      {showProfileModal && isConnected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md border-2 border-slate-900 bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150 font-mono">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <div className={`h-8 w-8 bg-gradient-to-br ${getAddressColor(address || "")} border border-slate-900 flex items-center justify-center text-xs text-white font-bold`}>
                  {address?.substring(2, 4).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Web3 Wallet Profile</h3>
                  <div className="text-[11px] text-emerald-700 font-bold">{chainName}</div>
                </div>
              </div>

              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 hover:bg-slate-100 text-slate-700 border border-slate-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Address Details Box */}
            <div className="bg-slate-50 p-4 border border-slate-300 space-y-2">
              <div className="text-[11px] text-slate-500 font-bold uppercase">Connected Wallet Address:</div>
              <div className="flex items-center justify-between bg-white p-2.5 border border-slate-300">
                <span className="text-xs font-bold text-slate-900 truncate mr-2">
                  {address}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(address || "")}
                  title="Copy Wallet Address"
                  className="p-1 hover:bg-slate-100 text-slate-700 shrink-0"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <a
                  href={`https://${chainId === 11155111 ? "sepolia." : ""}etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>View on Block Explorer</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  type="button"
                  onClick={handleManualRefresh}
                  className="text-slate-700 font-bold hover:text-slate-900 flex items-center gap-1"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
                  <span>Refresh Balance</span>
                </button>
              </div>
            </div>

            {/* Detected Balances List (ONLY BALANCES > 0 ARE SHOWN) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1.5">
                  <CoinIcon className="h-4 w-4 text-indigo-600" />
                  <span>Detected Coins & Tokens:</span>
                </div>
                <span className="text-[10px] text-slate-500">Only Balance &gt; 0</span>
              </div>

              {detectedTokensWithBalance.length > 0 ? (
                <div className="space-y-2">
                  {detectedTokensWithBalance.map((token, idx) => (
                    <div
                      key={idx}
                      className="p-3 border-2 border-slate-900 bg-white flex items-center justify-between shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{token.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{token.symbol}</div>
                          <div className="text-[10px] text-slate-500">{token.name}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900">
                          {token.balance} {token.symbol}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-bold">
                          ≈ {formatUSD(token.usdValue)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-300 text-center text-xs text-slate-600 space-y-1">
                  <AlertCircle className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                  <div>No coins detected with balance &gt; 0.</div>
                  <p className="text-[10px] text-slate-500">
                    Claim free Sepolia ETH on the Staking page to add coin balance.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex justify-between items-center border-t border-slate-200">
              <button
                type="button"
                onClick={disconnectWallet}
                className="px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 border border-red-300 flex items-center gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Disconnect</span>
              </button>

              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Real Wallet Connection Modal with Provider Scanning & UX Status Indicator */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md border-2 border-slate-900 bg-white p-6 shadow-2xl space-y-4 font-mono">
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
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Connect Real Web3 Wallet</h3>
              <p className="text-xs text-slate-600">
                Direct EVM connection to your browser MetaMask extension.
              </p>
            </div>

            {/* LIVE PROVIDER DETECTION STATUS BADGE */}
            <div className="p-3 bg-slate-50 border border-slate-300 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-bold uppercase text-[10px]">Extension Detector:</span>
              
              {hasMetaMask ? (
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px]">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>🟢 MetaMask Ready</span>
                </span>
              ) : isDetecting ? (
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                  <Loader2 className="h-3 w-3 animate-spin text-amber-600" />
                  <span>🟡 Scanning Provider (EIP-6963)...</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-100 text-red-900 border border-red-300 font-bold text-[10px]">
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  <span>🔴 Provider Not Found</span>
                </span>
              )}
            </div>

            {/* Error or Warning Banner */}
            {walletError && (
              <div className="p-3 border-2 border-amber-800 bg-amber-50 text-amber-900 text-xs font-mono space-y-1">
                <div className="font-bold flex items-center gap-1 text-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-700" />
                  <span>MetaMask Status Info:</span>
                </div>
                <div className="leading-relaxed text-[11px]">{walletError}</div>
              </div>
            )}

            {/* Connect Action Button with Loading UX */}
            {hasMetaMask || isDetecting ? (
              <button
                onClick={async () => {
                  await connectWallet();
                  if (!walletError) {
                    setShowWalletModal(false);
                  }
                }}
                disabled={isConnecting}
                className="w-full flex items-center justify-between p-4 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🦊</span>
                  <div className="text-left">
                    <div className="text-sm font-bold flex items-center gap-2">
                      <span>{isConnecting ? "Opening MetaMask..." : "Connect MetaMask (Live)"}</span>
                      {isConnecting && <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />}
                    </div>
                    <div className="text-[10px] text-slate-300 font-normal">
                      {isConnecting ? "Please approve the prompt in your browser extension" : "Read real address & ETH balance via browser extension"}
                    </div>
                  </div>
                </div>
                <CheckCircle2 className={`h-6 w-6 ${isConnecting ? "text-amber-400 animate-pulse" : "text-emerald-400"}`} />
              </button>
            ) : (
              <div className="p-4 border-2 border-red-800 bg-red-50 text-red-900 space-y-3">
                <div className="flex items-start gap-2.5 text-xs font-bold">
                  <AlertCircle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
                  <div>MetaMask Extension Not Found</div>
                </div>
                <p className="text-xs text-red-800 leading-relaxed">
                  To connect your real Web3 wallet on desktop, please make sure the MetaMask extension is enabled in your browser extensions manager.
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-700 text-white font-bold text-xs border border-red-800 hover:bg-red-800 shadow-xs"
                >
                  <span>Download MetaMask Extension</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            <div className="text-center text-[11px] font-mono text-slate-500 border-t border-slate-200 pt-3">
              100% Non-Custodial Security • Direct Web3 Injection
            </div>
          </div>
        </div>
      )}
    </>
  );
};
