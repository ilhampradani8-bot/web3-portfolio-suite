"use client";

import React, { useState } from "react";
import { PRESET_SQL_QUERIES } from "../services/fetch-analytics";
import { SqlQueryPreset } from "../types/analytics";
import { Terminal, Play, CheckCircle2, Clock, Database, Copy } from "lucide-react";

export const SqlEditor = () => {
  const [selectedPreset, setSelectedPreset] = useState<SqlQueryPreset>(PRESET_SQL_QUERIES[0]);
  const [customSql, setCustomSql] = useState<string>(PRESET_SQL_QUERIES[0].sqlQuery);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeResults, setActiveResults] = useState<any[]>(PRESET_SQL_QUERIES[0].sampleResults);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setActiveResults(selectedPreset.sampleResults);
    }, 600);
  };

  const handleSelectPreset = (preset: SqlQueryPreset) => {
    setSelectedPreset(preset);
    setCustomSql(preset.sqlQuery);
    setActiveResults(preset.sampleResults);
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(customSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-6">
      
      {/* Console Header & Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">On-Chain SQL Query Terminal</h3>
            <p className="text-xs text-slate-400">Dune Analytics style EVM relational database query editor</p>
          </div>
        </div>

        {/* Preset Query Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {PRESET_SQL_QUERIES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedPreset.id === preset.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {preset.title.split(" ")[0]} Query
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Area */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-cyan-400" />
            <span>schema: ethereum.dex_pools</span>
          </span>
          <button
            onClick={copyQuery}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "Copied!" : "Copy SQL"}</span>
          </button>
        </div>

        <textarea
          rows={7}
          value={customSql}
          onChange={(e) => setCustomSql(e.target.value)}
          className="w-full bg-transparent font-mono text-xs text-cyan-300 focus:outline-none resize-none leading-relaxed"
        />

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{selectedPreset.executionTimeMs}ms execution time</span>
            </span>
            <span>•</span>
            <span>{activeResults.length} rows returned</span>
          </div>

          <button
            onClick={handleRunQuery}
            disabled={isExecuting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isExecuting ? (
              <>
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent"></span>
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run Query</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Query Result Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase">
            <tr>
              {Object.keys(activeResults[0] || {}).map((key) => (
                <th key={key} className="p-3">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {activeResults.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                {Object.values(row).map((val: any, vIdx) => (
                  <td key={vIdx} className="p-3 text-slate-200">
                    {typeof val === "number" ? val.toLocaleString() : String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
