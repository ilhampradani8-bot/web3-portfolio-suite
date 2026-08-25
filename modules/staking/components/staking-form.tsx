"use client";

import React, { useState } from "react";
import { useWallet } from "@/context/wallet-context";
import { formatUSD } from "@/lib/utils";
import {
  Coins,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Droplet,
  X,
  RefreshCw,
  Globe,
} from "lucide-react";
import { StakingPoolInfo } from "../types/staking";
import {
  SEPOLIA_FAUCETS,
  getExplorerTxUrl,
} from "../services/staking-service";

interface StakingFormProps {
  selectedPool: StakingPoolInfo;
  onStakeSuccess: (amount: number, txHash?: string) => void;
  onUnstakeSuccess: (amount: number) => void;
  isFaucetOpen: boolean;
  setIsFaucetOpen: (val: boolean) => void;
}

export const StakingForm: React.FC<StakingFormProps> = ({
  selectedPool,
  onStakeSuccess,
  onUnstakeSuccess,
  isFaucetOpen,
  setIsFaucetOpen,
}) => {
  const {
    isConnected,
    balanceETH,
    connectWallet,
    chainId,
    switchNetwork,
    refreshBalance,
  } = useWallet();

  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMatchedNetwork = chainId === selectedPool.chainId;
  const numBalance = parseFloat(balanceETH) || 0;
  const numAmount = parseFloat(amount) || 0;

  // Format helper to strictly limit decimal places to 3 (e.g., 0.2329 -> 0.232)
  const formatMax3Decimals = (val: number): string => {
    if (val <= 0) return "0.000";
    return (Math.floor(val * 1000) / 1000).toFixed(3);
  };

  // Check if balance is insufficient for real on-chain transaction
  const isInsufficientBalance = isConnected && numAmount > numBalance;

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleMaxClick = () => {
    if (numBalance > 0) {
      setAmount(formatMax3Decimals(numBalance));
    } else {
      setAmount("0.05");
    }
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || numAmount <= 0) return;

    setIsProcessing(true);
    setTxHash(null);
    setErrorMessage(null);

    // Real On-Chain Execution via MetaMask pointing to selected pool contract
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error("MetaMask tidak terdeteksi di browser Anda.");
      }

      // If network mismatch, switch network first
      if (!isMatchedNetwork) {
        await switchNetwork(selectedPool.chainIdHex);
      }

      // Convert ETH string to Hex wei value (e.g. 0.01 ETH = 10000000000000000 wei)
      const weiValue = BigInt(Math.floor(numAmount * 1e18)).toString(16);

      // Send real EVM transaction to Vault Contract Address
      const hash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: (await ethereum.request({ method: "eth_accounts" }))[0],
            to: selectedPool.contractAddress,
            value: "0x" + weiValue,
            data: activeTab === "stake" ? "0xd0e30db0" : "0x2e1a7d4d", // deposit() or withdraw()
          },
        ],
      });

      setIsProcessing(false);
      setTxHash(hash);

      if (activeTab === "stake") {
        onStakeSuccess(numAmount, hash);
      } else {
        onUnstakeSuccess(numAmount);
      }
      setAmount("");
      // Refresh balance after transaction
      await refreshBalance();
    } catch (err: any) {
      console.error("Staking Tx Error:", err);
      setIsProcessing(false);
      if (err?.code === 4001) {
        setErrorMessage("Transaksi dibatalkan di pop-up MetaMask.");
      } else {
        setErrorMessage(
          err?.message || `Gagal mengirim transaksi ke jaringan ${selectedPool.networkName}.`
        );
      }
    }
  };

  return (
    <div className="space-y-6 font-mono">
      
      {/* Network Switch Prompt (If connected but not on selected pool chain) */}
      {isConnected && !isMatchedNetwork && (
        <div className="p-4 bg-amber-50 border-2 border-amber-500 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold">
              Perhatian: Wallet Anda tidak terhubung ke {selectedPool.networkName}
            </div>
            <div className="text-[11px] text-amber-800 mt-0.5">
              Untuk melakukan staking di pool ini, silakan alihkan jaringan MetaMask ke <strong>{selectedPool.networkName}</strong>.
            </div>
            <button
              onClick={() => switchNetwork(selectedPool.chainIdHex)}
              className="mt-2.5 px-3 py-1 bg-amber-800 hover:bg-amber-900 text-white font-bold text-[11px] transition-all flex items-center gap-1.5"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Switch Network ke {selectedPool.networkName}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mainnet Warning Notice */}
      {!selectedPool.isTestnet && (
        <div className="p-3 bg-red-50 border border-red-300 text-xs text-red-900 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-700 shrink-0" />
          <span>
            🔴 <strong>Mainnet Protocol Notice:</strong> Pool ini berada di jaringan produksi <strong>{selectedPool.networkName}</strong> (membutuhkan saldo aset asli).
          </span>
        </div>
      )}

      {/* Main Staking Form Card */}
      <div className="border-2 border-slate-900 bg-white p-6 shadow-md space-y-6">
        
        {/* Header Pool Name */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
          <span className="font-bold text-slate-900 flex items-center gap-2">
            <Coins className="h-4 w-4 text-indigo-600" />
            <span>Target Vault: {selectedPool.poolName}</span>
          </span>
          <span className="px-2 py-0.5 bg-slate-100 border border-slate-300 font-bold">
            {selectedPool.tokenSymbol} Vault
          </span>
        </div>

        {/* Tabs Header: Stake vs Unstake */}
        <div className="flex bg-slate-100 p-1 border border-slate-300">
          <button
            onClick={() => {
              setActiveTab("stake");
              setTxHash(null);
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all ${
              activeTab === "stake"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Lock className="h-4 w-4" />
            <span>Stake {selectedPool.tokenSymbol}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("unstake");
              setTxHash(null);
              setErrorMessage(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold transition-all ${
              activeTab === "unstake"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Unlock className="h-4 w-4" />
            <span>Unstake {selectedPool.tokenSymbol}</span>
          </button>
        </div>

        {/* Form Input */}
        <form onSubmit={handleAction} className="space-y-4">
          
          <div>
            <div className="flex items-center justify-between text-xs text-slate-700 mb-2 flex-wrap gap-2">
              <span>Jumlah untuk di-{activeTab === "stake" ? "Deposit" : "Tarik"}</span>
              
              <div className="flex items-center gap-2">
                <span>
                  Saldo Tersedia: <strong className="text-slate-900">{formatMax3Decimals(numBalance)} {selectedPool.tokenSymbol}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleRefreshBalance}
                  title="Cek Ulang Saldo dari Jaringan"
                  className="p-1 hover:bg-slate-200 text-slate-700 transition-all border border-slate-300 rounded-none"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.001"
                min="0.001"
                placeholder="0.000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white text-slate-900 font-mono text-xl font-bold border-2 border-slate-900 p-4 pr-36 focus:outline-none focus:border-indigo-600"
              />
              <div className="absolute right-3 top-3 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setAmount("0.010")}
                  className="px-2 py-1 text-[10px] bg-slate-100 text-slate-900 border border-slate-400 hover:bg-slate-200 font-bold"
                >
                  0.01
                </button>
                <button
                  type="button"
                  onClick={() => setAmount("0.050")}
                  className="px-2 py-1 text-[10px] bg-slate-100 text-slate-900 border border-slate-400 hover:bg-slate-200 font-bold"
                >
                  0.05
                </button>
                <button
                  type="button"
                  onClick={handleMaxClick}
                  className="px-2 py-1 text-[10px] bg-slate-900 text-white font-bold hover:bg-slate-800"
                >
                  MAX
                </button>
              </div>
            </div>

            {amount && (
              <div className="text-[11px] text-slate-600 mt-1 text-right">
                ≈ {formatUSD(numAmount * 3200)}
              </div>
            )}
          </div>

          {/* Insufficient Balance Notice */}
          {isInsufficientBalance && (
            <div className="p-3 bg-red-50 border border-red-300 text-xs text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertCircle className="h-4 w-4 text-red-700 shrink-0" />
                <span>Saldo {selectedPool.tokenSymbol} kurang dari nominal staking ({amount} {selectedPool.tokenSymbol})</span>
              </div>
              <p className="text-[11px] text-slate-700">
                {selectedPool.isTestnet
                  ? "Klaim Sepolia ETH gratis terlebih dahulu melalui Faucet resmi, lalu klik Refresh Saldo 🔄 di atas."
                  : `Top-up saldo ${selectedPool.tokenSymbol} di wallet Anda pada jaringan ${selectedPool.networkName}.`}
              </p>
              {selectedPool.isTestnet && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsFaucetOpen(true)}
                    className="px-3 py-1.5 text-xs font-bold bg-indigo-700 text-white hover:bg-indigo-600 shadow-sm"
                  >
                    💧 Klaim Sepolia Faucet Gratis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Transaction Summary Card */}
          <div className="bg-slate-50 p-4 border border-slate-300 space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>APY Yield Rate</span>
              <span className="text-emerald-800 font-bold">{selectedPool.apyPercentage}% APY</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Estimasi Gas Fee</span>
              <span className="text-slate-900">
                {selectedPool.isTestnet ? "~$0.15 (Sepolia Testnet Gas)" : "~$2.50 (Mainnet Network Gas)"}
              </span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Reward Token</span>
              <span className="text-red-700 font-bold">{selectedPool.rewardTokenSymbol}</span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Target Contract</span>
              <span className="text-slate-900 font-bold text-[11px]">
                {selectedPool.contractAddress.substring(0, 8)}...
                {selectedPool.contractAddress.slice(-6)}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {!isConnected ? (
            <button
              type="button"
              onClick={connectWallet}
              className="w-full py-4 font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all"
            >
              Hubungkan MetaMask untuk {activeTab === "stake" ? "Staking" : "Unstaking"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isProcessing || numAmount <= 0 || isInsufficientBalance}
              className="w-full py-4 font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  <span>Mengirim Transaksi ke {selectedPool.networkName}...</span>
                </>
              ) : (
                <>
                  <Coins className="h-4 w-4" />
                  <span>
                    Konfirmasi {activeTab === "stake" ? "Staking" : "Unstaking"} On-Chain ({selectedPool.networkName})
                  </span>
                </>
              )}
            </button>
          )}

        </form>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border-2 border-red-700 text-xs text-red-900 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Gagal Mengirim Transaksi</div>
              <div className="text-[11px] text-red-800 mt-0.5">{errorMessage}</div>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {txHash && (
          <div className="p-4 bg-emerald-50 border-2 border-emerald-800 text-xs text-emerald-900 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="overflow-hidden flex-1">
              <div className="font-bold">
                Transaksi On-Chain Berhasil Di-broadcast!
              </div>
              <div className="text-[11px] text-slate-700 truncate mt-0.5">
                Tx Hash: {txHash}
              </div>

              <div className="mt-2 pt-2 border-t border-emerald-200 flex items-center gap-3">
                <a
                  href={getExplorerTxUrl(selectedPool.explorerUrl, txHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 hover:underline"
                >
                  <span>Verifikasi di {selectedPool.networkName} Explorer</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Faucet Drawer Modal */}
      {isFaucetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-900 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Droplet className="h-5 w-5 text-indigo-600" />
                <span>Klaim Sepolia ETH Gratis</span>
              </div>
              <button
                onClick={() => setIsFaucetOpen(false)}
                className="p-1 hover:bg-slate-100 text-slate-700 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Pilih salah satu Faucet resmi di bawah ini untuk klaim Sepolia ETH gratis ke wallet Anda. Setelah klaim, klik tombol <strong>Refresh Saldo 🔄</strong> di form staking.
            </p>

            <div className="space-y-3">
              {SEPOLIA_FAUCETS.map((faucet, idx) => (
                <a
                  key={idx}
                  href={faucet.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3.5 border border-slate-300 hover:border-slate-900 bg-slate-50 hover:bg-white transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 flex items-center gap-1.5">
                      <span>{faucet.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-900">
                      {faucet.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {faucet.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsFaucetOpen(false)}
                className="px-4 py-2 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all"
              >
                Tutup Modal Faucet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
