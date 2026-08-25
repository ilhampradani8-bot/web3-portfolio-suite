"use client";

import React, { useState } from "react";
import { PRESET_SQL_QUERIES } from "../services/fetch-analytics";
import { SqlQueryPreset } from "../types/analytics";
import { Terminal, Play, Clock, Database, Copy, Check } from "lucide-react";

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
    }, 500);
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
    <div className="border-2 border-slate-900 bg-white p-4 sm:p-6 shadow-md space-y-6 font-mono">
      
      {/* Console Header & Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">On-Chain SQL Query Terminal</h3>
            <p className="text-xs text-slate-600">Dune Analytics style relational database query engine for EVM indexed data</p>
          </div>
        </div>

        {/* Preset Query Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700 w-full sm:w-auto">Presets:</span>
          {PRESET_SQL_QUERIES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold border-2 transition-all ${
                selectedPreset.id === preset.id
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-slate-50 text-slate-800 border-slate-300 hover:bg-slate-100"
              }`}
            >
              {preset.title.split(" ")[0]} Query
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Area */}
      <div className="border-2 border-slate-900 bg-slate-950 p-4 text-white space-y-3 shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>schema: ethereum.dex_pools</span>
          </span>
          <button
            onClick={copyQuery}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy SQL"}</span>
          </button>
        </div>

        <textarea
          rows={6}
          value={customSql}
          onChange={(e) => setCustomSql(e.target.value)}
          className="w-full bg-transparent font-mono text-xs text-emerald-400 focus:outline-none resize-none leading-relaxed"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-800 gap-3">
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
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
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-500 shadow-xs transition-all disabled:opacity-50 w-full sm:w-auto"
          >
            {isExecuting ? (
              <>
                <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></span>
                <span>Executing Query...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Run SQL Query</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Query Result Data Table (Mobile Responsive) */}
      <div className="border-2 border-slate-900 bg-white shadow-md overflow-x-auto max-w-full">
        <div className="p-3 bg-slate-100 border-b-2 border-slate-900 font-bold text-xs text-slate-900 flex items-center justify-between">
          <span>Query Result Set ({activeResults.length} Records)</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 border border-emerald-300">Relational Output</span>
        </div>

        <div className="min-w-[640px]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-white uppercase text-[11px]">
              <tr>
                {Object.keys(activeResults[0] || {}).map((key) => (
                  <th key={key} className="p-3">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {activeResults.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  {Object.values(row).map((val: any, vIdx) => (
                    <td key={vIdx} className="p-3 text-slate-900 font-bold whitespace-nowrap">
                      {typeof val === "number" ? val.toLocaleString() : String(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
