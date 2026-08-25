import React from "react";
import Link from "next/link";
import { Layers, GitBranch, ExternalLink, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-300 bg-white text-slate-600 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-12">
        
        {/* Left Side Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white border border-slate-900">
            <Layers className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
              MIJ DIGITAL WEB3 ENTERPRISE SUITE
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Built with Next.js 16, Viem, Ethers, & Tailwind CSS • Non-custodial & Zero-Database Architecture
            </div>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Vercel & Cloudflare Ready</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-slate-100 text-slate-800 border border-slate-300 px-3.5 py-1.5 hover:bg-slate-200 transition-all"
          >
            <GitBranch className="h-4 w-4 text-slate-600" />
            <span>Open Source Repository</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          </a>
        </div>

      </div>
    </footer>
  );
};



