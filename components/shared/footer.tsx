import React from "react";
import Link from "next/link";
import { Sparkles, GitBranch, ExternalLink, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-12">
        
        {/* Left Side Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-200">
              Web3 Developer Portfolio Suite
            </div>
            <div className="text-xs text-slate-500">
              Built with Next.js, Viem, Ethers, & Tailwind CSS • Non-custodial & Zero-Database
            </div>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Vercel Ready</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <GitBranch className="h-4 w-4" />
            <span>Open Source Repository</span>
            <ExternalLink className="h-3 w-3 text-slate-500" />
          </a>
        </div>

      </div>
    </footer>
  );
};
