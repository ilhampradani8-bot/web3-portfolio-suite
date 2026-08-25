"use client";

import React, { useState } from "react";
import { useWallet } from "@/context/wallet-context";
import { ContractType, DeployedContractResult } from "../types/deployer";
import { deploySmartContractOnChain } from "../services/deploy-service";
import { shortenAddress } from "@/lib/utils";
import { 
  Rocket, 
  Code2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Coins, 
  Layers, 
  Lock,
  Terminal
} from "lucide-react";

export const DeployerForm = () => {
  const { isConnected, hasMetaMask, connectWallet } = useWallet();
  const [contractType, setContractType] = useState<ContractType>("ERC20_TOKEN");
  const [name, setName] = useState<string>("Nexus Enterprise Token");
  const [symbol, setSymbol] = useState<string>("NEXUS");
  const [initialSupply, setInitialSupply] = useState<number>(1000000);
  const [network, setNetwork] = useState<"Sepolia" | "Ethereum" | "Polygon">("Sepolia");
  const [customBytecode, setCustomBytecode] = useState<string>("");
  
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [deployedResult, setDeployedResult] = useState<DeployedContractResult | null>(null);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeployError(null);
    setDeployedResult(null);

    if (!isConnected) {
      setDeployError("Silakan hubungkan dompet MetaMask Anda terlebih dahulu.");
      return;
    }

    if (!name || !symbol) {
      setDeployError("Nama dan Simbol Smart Contract tidak boleh kosong.");
      return;
    }

    setIsDeploying(true);

    try {
      const result = await deploySmartContractOnChain({
        contractType,
        name,
        symbol,
        initialSupply,
        network,
        customBytecode: customBytecode || undefined,
      });

      setDeployedResult(result);
    } catch (err: any) {
      console.error("Smart contract deployment failed", err);
      setDeployError(err.message || "Gagal mendeploy Smart Contract ke Blockchain.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="border-2 border-slate-900 bg-white p-6 shadow-md space-y-6">
      
      {/* Form Title & Contract Selector */}
      <div className="flex items-center gap-3 border-b-2 border-slate-900 pb-4">
        <div className="h-10 w-10 border border-slate-400 bg-white text-slate-900 flex items-center justify-center font-bold">
          <Rocket className="h-5 w-5 text-red-700" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">On-Chain Smart Contract Deployer Studio</h3>
          <p className="text-xs text-slate-600">Deploy custom Solidity Smart Contracts (ERC-20, NFT, Staking) directly to EVM blockchains via MetaMask</p>
        </div>
      </div>

      {/* Contract Type Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setContractType("ERC20_TOKEN")}
          className={`p-3 border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            contractType === "ERC20_TOKEN"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-200"
          }`}
        >
          <Coins className="h-4 w-4" />
          <span>ERC-20 Token</span>
        </button>

        <button
          type="button"
          onClick={() => setContractType("NFT_COLLECTION")}
          className={`p-3 border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            contractType === "NFT_COLLECTION"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-200"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>NFT Contract</span>
        </button>

        <button
          type="button"
          onClick={() => setContractType("STAKING_VAULT")}
          className={`p-3 border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            contractType === "STAKING_VAULT"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-200"
          }`}
        >
          <Lock className="h-4 w-4" />
          <span>Staking Vault</span>
        </button>

        <button
          type="button"
          onClick={() => setContractType("CUSTOM_BYTECODE")}
          className={`p-3 border font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            contractType === "CUSTOM_BYTECODE"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-200"
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>Bytecode</span>
        </button>
      </div>

      {/* Deployment Form Inputs */}
      <form onSubmit={handleDeploy} className="space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Contract Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Custom Token"
              className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Token Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g. MCT"
              className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Target Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value as any)}
              className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
            >
              <option value="Sepolia">Sepolia Testnet (ETH Gratisan)</option>
              <option value="Polygon">Polygon Mainnet</option>
              <option value="Ethereum">Ethereum Mainnet</option>
            </select>
          </div>

          {contractType === "ERC20_TOKEN" && (
            <div>
              <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Initial Supply</label>
              <input
                type="number"
                value={initialSupply}
                onChange={(e) => setInitialSupply(Number(e.target.value))}
                className="w-full bg-white text-slate-900 font-mono text-sm font-bold border border-slate-400 p-3 focus:outline-none focus:border-red-700"
              />
            </div>
          )}
        </div>

        {contractType === "CUSTOM_BYTECODE" && (
          <div>
            <label className="block text-xs font-mono text-slate-700 font-bold mb-2">Custom Compiled Bytecode (0x...)</label>
            <textarea
              rows={4}
              value={customBytecode}
              onChange={(e) => setCustomBytecode(e.target.value)}
              placeholder="0x608060405234801561001057600080fd..."
              className="w-full bg-white text-slate-900 font-mono text-xs border border-slate-400 p-3 focus:outline-none focus:border-red-700"
            />
          </div>
        )}

        {/* Error Alert Box */}
        {deployError && (
          <div className="p-3 border-2 border-red-800 bg-red-50 text-red-900 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
            <div>{deployError}</div>
          </div>
        )}

        {/* Deploy Action Button */}
        {!isConnected ? (
          <button
            type="button"
            onClick={connectWallet}
            className="w-full py-4 font-bold font-mono text-xs text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Code2 className="h-4 w-4" />
            <span>Hubungkan MetaMask untuk Deploy Contract</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={isDeploying}
            className="w-full py-4 font-bold font-mono text-xs text-white bg-red-700 hover:bg-red-800 border-2 border-red-900 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeploying ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <span>Broadcasting Deployment Tx to {network}...</span>
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                <span>Deploy {name} Contract On-Chain ({network})</span>
              </>
            )}
          </button>
        )}

      </form>

      {/* Deployed Result Output */}
      {deployedResult && (
        <div className="p-5 border-2 border-emerald-800 bg-emerald-50 text-emerald-900 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 border-b border-emerald-300 pb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
            <span>Smart Contract Successfully Deployed On-Chain!</span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-800">
            <div>Contract Name: <strong className="text-slate-900">{deployedResult.name} ({deployedResult.symbol})</strong></div>
            <div>Deployed Address: <strong className="text-slate-900">{deployedResult.contractAddress}</strong></div>
            <div className="text-[11px] text-slate-600">Tx Hash: {shortenAddress(deployedResult.transactionHash, 12)}</div>
          </div>

          <a
            href={deployedResult.explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800"
          >
            <span>View Deployed Contract on Block Explorer</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

    </div>
  );
};
