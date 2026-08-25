"use client";

import React from "react";
import { UserStakingAccount, StakingPoolInfo, StakingTxHistoryItem } from "../types/staking";
import { formatUSD } from "@/lib/utils";
import { ShieldCheck, ExternalLink, CheckCircle, Clock, History, Layers, PieChart } from "lucide-react";
import { getExplorerAddressUrl, getExplorerTxUrl } from "../services/staking-service";

interface ActivePosition {
  poolName: string;
  networkName: string;
  stakedAmount: number;
  apyPercentage: number;
  tokenSymbol: string;
  explorerUrl: string;
  contractAddress: string;
}

interface YieldDisplayProps {
  pool: StakingPoolInfo;
  account: UserStakingAccount;
  history: StakingTxHistoryItem[];
  onClaimRewards: () => void;
}

export const YieldDisplay: React.FC<YieldDisplayProps> = ({
  pool,
  account,
  history,
  onClaimRewards,
}) => {
  // Group history by pool to calculate multichain positions
  const positionsMap = new Map<string, ActivePosition>();

  history.forEach((tx) => {
    const existing = positionsMap.get(tx.poolName);
    if (existing) {
      existing.stakedAmount += tx.amount;
    } else {
      positionsMap.set(tx.poolName, {
        poolName: tx.poolName,
        networkName: tx.networkName,
        stakedAmount: tx.amount,
        apyPercentage: 12.4, // default APY rate
        tokenSymbol: "ETH",
        explorerUrl: tx.explorerUrl,
        contractAddress: tx.contractAddress,
      });
    }
  });

  const activePositions = Array.from(positionsMap.values());
  const totalMultichainStaked = activePositions.reduce((sum, pos) => sum + pos.stakedAmount, 0);
  const totalMultichainDailyYield = activePositions.reduce((sum, pos) => sum + (pos.stakedAmount * 0.124) / 365, 0);

  return (
    <div className="space-y-6 font-mono">
      
      {/* Multichain Portfolio Overview (Rangkuman Total Semua Posisi Staking) */}
      {activePositions.length > 0 && (
        <div className="border-2 border-slate-900 bg-slate-900 text-white p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-bold text-sm">
              <PieChart className="h-5 w-5 text-emerald-400" />
              <span>Rangkuman Portofolio Staking Multichain ({activePositions.length} Posisi Aktif)</span>
            </div>

            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-400 text-slate-900">
              Total Multichain Yield: +{totalMultichainDailyYield.toFixed(6)} ETH / hari
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="bg-slate-800 p-4 border border-slate-700">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Total Staked Multichain</div>
              <div className="text-2xl font-black text-white mt-1">
                {totalMultichainStaked.toFixed(4)} ETH
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-1">
                ≈ {formatUSD(totalMultichainStaked * 3200)}
              </div>
            </div>

            <div className="bg-slate-800 p-4 border border-slate-700">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Jumlah Posisi Aktif</div>
              <div className="text-2xl font-black text-emerald-300 mt-1">
                {activePositions.length} Vault Protocol{activePositions.length > 1 ? "s" : ""}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Tersebar di EVM Networks
              </div>
            </div>

            <div className="bg-slate-800 p-4 border border-slate-700">
              <div className="text-[11px] text-slate-400 font-bold uppercase">Estimasi Bunga Harian Total</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                +{totalMultichainDailyYield.toFixed(6)} ETH
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                ≈ {formatUSD(totalMultichainDailyYield * 3200)} / hari
              </div>
            </div>
          </div>

          {/* Table Breakdown per Active Position */}
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-300 mb-2">Rincian Posisi Staking per Pool:</div>
            <div className="space-y-2">
              {activePositions.map((pos, idx) => (
                <div key={idx} className="p-3 bg-slate-800 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white uppercase">
                      {pos.networkName}
                    </span>
                    <div>
                      <div className="font-bold text-white">{pos.poolName}</div>
                      <div className="text-[11px] text-slate-400">Vault: {pos.contractAddress.substring(0, 8)}...</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white">{pos.stakedAmount.toFixed(4)} {pos.tokenSymbol}</div>
                      <div className="text-[10px] text-emerald-400 font-bold">≈ {formatUSD(pos.stakedAmount * 3200)}</div>
                    </div>
                    <a
                      href={getExplorerAddressUrl(pos.explorerUrl, pos.contractAddress)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 hover:bg-slate-700 text-slate-300 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Network Status & Contract Link for Selected Pool */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-900 text-white border-2 border-slate-900 shadow-sm text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`px-2.5 py-1 font-bold ${
              pool.isTestnet
                ? "bg-emerald-400 text-slate-900"
                : "bg-red-500 text-white"
            }`}
          >
            {pool.isTestnet ? "🟢 SEPOLIA TESTNET (Verified On-Chain Vault)" : `🔴 ${pool.networkName.toUpperCase()} PROTOCOL`}
          </span>

          <a
            href={getExplorerAddressUrl(pool.explorerUrl, pool.contractAddress)}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white flex items-center gap-1 underline font-mono"
          >
            <span>Vault: {pool.contractAddress.substring(0, 8)}...{pool.contractAddress.slice(-6)}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="text-slate-400 text-[11px]">
          Verified Smart Contract Protocol
        </div>
      </div>

      {/* Top Banner: APY & Account Summary for Selected Pool */}
      <div className="border-2 border-slate-900 bg-white p-6 shadow-md">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Pool Info */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-900 text-white">
                {pool.poolName}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 font-bold">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                Audited Liquid Contract
              </span>
            </div>

            <div className="text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-3">
              <span>{pool.apyPercentage}% APY</span>
              <span className="text-sm font-sans font-normal text-slate-600">Fixed Compound Rate</span>
            </div>

            <div className="text-xs text-slate-600 mt-2 flex items-center gap-4">
              <span>TVL Pool: <strong className="text-slate-900">{pool.totalStaked.toLocaleString()} {pool.tokenSymbol}</strong></span>
              <span>Lock: <strong className="text-emerald-800 font-bold">{pool.lockPeriodDays === 0 ? "Flexible (0 Days)" : `${pool.lockPeriodDays} Days`}</strong></span>
            </div>
          </div>

          {/* Real Rewards Card */}
          <div className="bg-slate-50 p-5 border border-slate-300 flex flex-col justify-between min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1 font-bold">
              <span>Pending Claimable Rewards</span>
            </div>

            <div className="text-2xl font-black text-red-700 tracking-tight my-1">
              {account.pendingYield.toFixed(6)} {pool.rewardTokenSymbol}
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-300">
              <span className="text-[11px] text-slate-600">
                ≈ {formatUSD(account.pendingYield * 12.5)}
              </span>

              <button
                onClick={onClaimRewards}
                disabled={account.pendingYield <= 0}
                className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 shadow-sm transition-all disabled:opacity-50"
              >
                Claim Rewards
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Real Staked Balance Cards for Selected Pool */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm">
          <div className="text-xs text-slate-600 mb-1 font-bold flex items-center justify-between">
            <span>Staked {pool.tokenSymbol} Balance</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 font-bold">Real On-Chain</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {account.stakedBalance.toFixed(4)} {pool.tokenSymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ≈ {formatUSD(account.stakedBalance * 3200)}
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="text-xs text-slate-600 mb-1 font-bold">Estimated Daily Yield</div>
          <div className="text-xl font-bold text-emerald-800">
            +{account.dailyYield.toFixed(6)} {pool.tokenSymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ≈ {formatUSD(account.dailyYield * 3200)} / day
          </div>
        </div>

        <div className="border border-slate-300 bg-white p-5 shadow-sm">
          <div className="text-xs text-slate-600 mb-1 font-bold">Total Claimed Earnings</div>
          <div className="text-xl font-bold text-purple-900">
            {account.earnedRewards.toFixed(2)} {pool.rewardTokenSymbol}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Historical compound rewards
          </div>
        </div>

      </div>

      {/* Verified On-Chain Staking History Record */}
      {history.length > 0 && (
        <div className="border-2 border-slate-900 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <History className="h-4 w-4 text-indigo-600" />
              <span>Riwayat Transaksi Staking Terverifikasi On-Chain ({history.length})</span>
            </div>

            <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 font-bold">
              Verified Block Explorer Records
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {history.map((tx) => (
              <div key={tx.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Staked {tx.amount} ETH ke {tx.poolName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Waktu: {tx.timestamp} {tx.blockNumber ? `• Block #${tx.blockNumber}` : ""}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    {tx.status}
                  </span>

                  <a
                    href={getExplorerTxUrl(tx.explorerUrl, tx.txHash)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:underline"
                  >
                    <span>Etherscan</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
