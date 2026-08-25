import { DeployerForm } from "@/modules/contract-deployer/components/deployer-form";
import { Rocket } from "lucide-react";

export const metadata = {
  title: "On-Chain Smart Contract Deployer Studio | MIJ Digital Web3 Suite",
  description: "Deploy custom Solidity Smart Contracts (ERC-20, NFT, Staking) directly to EVM blockchains via MetaMask.",
};

export default function ContractDeployerPage() {
  return (
    <div className="space-y-8 font-mono pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold bg-slate-900 text-white mb-2">
            <Rocket className="h-3.5 w-3.5 text-emerald-400" />
            <span>Module 05 • EVM Contract Execution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            On-Chain Smart Contract Deployer Studio
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Compile & Deploy custom EVM Smart Contracts (ERC-20 Tokens, NFT Collections, Staking Vaults) 100% FREE on Sepolia Testnet
          </p>
        </div>
      </div>

      {/* Main Deployer Studio Component */}
      <DeployerForm />

    </div>
  );
}
