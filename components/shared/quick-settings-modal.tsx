"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ExternalLink, 
  Sliders, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  Rocket, 
  Info,
  Menu,
  HelpCircle
} from "lucide-react";

interface QuickSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettingsModal: React.FC<QuickSettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"telegram" | "filters" | "info">("telegram");
  
  // Settings State
  const [telegramChatId, setTelegramChatId] = useState<string>("");
  const [whaleThresholdUSD, setWhaleThresholdUSD] = useState<number>(1000000);
  const [enableWhaleAlerts, setEnableWhaleAlerts] = useState<boolean>(true);
  const [enableSoundAlerts, setEnableSoundAlerts] = useState<boolean>(true);

  // Test Connection State
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testMessageResponse, setTestMessageResponse] = useState<string>("");
  const [sha256Hash, setSha256Hash] = useState<string>("");

  useEffect(() => {
    const savedChatId = localStorage.getItem("mij_telegram_chat_id");
    const savedThreshold = localStorage.getItem("mij_whale_threshold");
    const savedWhale = localStorage.getItem("mij_alert_whale");
    const savedSound = localStorage.getItem("mij_alert_sound");

    if (savedChatId) setTelegramChatId(savedChatId);
    if (savedThreshold) setWhaleThresholdUSD(Number(savedThreshold));
    if (savedWhale !== null) setEnableWhaleAlerts(savedWhale === "true");
    if (savedSound !== null) setEnableSoundAlerts(savedSound === "true");
  }, []);

  const handleSaveAndTest = async () => {
    localStorage.setItem("mij_telegram_chat_id", telegramChatId.trim());
    localStorage.setItem("mij_whale_threshold", String(whaleThresholdUSD));
    localStorage.setItem("mij_alert_whale", String(enableWhaleAlerts));
    localStorage.setItem("mij_alert_sound", String(enableSoundAlerts));

    setTestStatus("testing");
    setTestMessageResponse("");
    setSha256Hash("");

    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: telegramChatId.trim() || undefined,
          message: (
            `🚨 *MIJ DIGITAL WEB3 ENTERPRISE ALERT*\n\n` +
            `✅ *Koneksi Telegram Connected ke @web3_ilhampradani_bot!*\n` +
            `• *Timestamp*: ${new Date().toLocaleString()}\n` +
            `• *Recipient Chat ID*: \`${telegramChatId.trim() || "Default Owner"}\`\n` +
            `• *Architecture*: 100% Stateless & Database-Free\n\n` +
            `Anda telah terhubung untuk menerima alert transaksi on-chain!`
          ),
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setTestStatus("success");
        setTestMessageResponse("Pesan tes berhasil dikirim ke Telegram Anda!");
        if (data.sha256Hash) setSha256Hash(data.sha256Hash);
      } else {
        setTestStatus("error");
        setTestMessageResponse(`Gagal: ${data.error || "Periksa kembali Chat ID Anda."}`);
      }
    } catch (err: any) {
      setTestStatus("error");
      setTestMessageResponse(`Terjadi kesalahan: ${err?.message || "Coba lagi."}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 font-sans">
      <div className="relative w-full max-w-xl border-2 border-slate-900 bg-white p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-900 text-white">
              <Bot className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">
                Control Panel & Telegram Hub
              </h2>
              <p className="text-xs text-slate-500 font-medium">Pengaturan Notifikasi, Telegram Bot, & Informasi Sistem</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 font-mono text-xs font-bold">
          <button
            onClick={() => setActiveTab("telegram")}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-2 ${
              activeTab === "telegram"
                ? "border-slate-900 bg-slate-100 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Bot className="h-4 w-4 text-indigo-600" />
            <span>1. Telegram Bot</span>
          </button>

          <button
            onClick={() => setActiveTab("filters")}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-2 ${
              activeTab === "filters"
                ? "border-slate-900 bg-slate-100 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Sliders className="h-4 w-4 text-emerald-600" />
            <span>2. Ambang Notif</span>
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2.5 border-b-2 flex items-center gap-2 ${
              activeTab === "info"
                ? "border-slate-900 bg-slate-100 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Info className="h-4 w-4 text-cyan-600" />
            <span>3. Info System</span>
          </button>
        </div>

        {/* Tab 1: Telegram Bot Hub */}
        {activeTab === "telegram" && (
          <div className="space-y-4">
            
            {/* Step 1: Open Bot Link */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono space-y-2">
              <div className="font-bold flex items-center justify-between">
                <span>Langkah 1: Tekan START di Bot Telegram</span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 font-bold">1-Click Auto</span>
              </div>
              <p className="text-[11px] font-sans text-indigo-800 leading-relaxed">
                Buka bot Telegram <strong>@web3_ilhampradani_bot</strong> lalu tekan <strong>START</strong>:
              </p>
              <a
                href="https://t.me/web3_ilhampradani_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs border border-indigo-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Buka Bot (@web3_ilhampradani_bot) & Klik START</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* 1-Click Auto Connect Button */}
            <button
              onClick={async () => {
                setTestStatus("testing");
                setTestMessageResponse("");
                setSha256Hash("");
                try {
                  const res = await fetch("/api/telegram/auto-subscribe");
                  const data = await res.json();
                  if (data.ok && data.chatId) {
                    setTelegramChatId(data.chatId);
                    localStorage.setItem("mij_telegram_chat_id", data.chatId);
                    setTestStatus("success");
                    setTestMessageResponse(data.message);
                    if (data.sha256Hash) setSha256Hash(data.sha256Hash);
                  } else {
                    setTestStatus("error");
                    setTestMessageResponse(data.error || "Belum terdeteksi. Silakan klik START di Telegram dulu!");
                  }
                } catch (err: any) {
                  setTestStatus("error");
                  setTestMessageResponse("Kesalahan jaringan. Coba lagi.");
                }
              }}
              disabled={testStatus === "testing"}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs border border-emerald-700 flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{testStatus === "testing" ? "Mendeteksi..." : "Langkah 2: Deteksi Otomatis & Hubungkan 1-Click!"}</span>
            </button>

            {/* Optional Manual Override Accordion */}
            <div className="pt-2">
              <details className="text-[11px] font-mono text-slate-500 border border-slate-200 p-2.5">
                <summary className="cursor-pointer font-bold text-slate-700">Opsi Manual (Input Chat ID):</summary>
                <div className="mt-2 space-y-2">
                  <input
                    type="text"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="Chat ID (Opsional)"
                    className="w-full font-mono text-xs"
                  />
                  <button
                    onClick={handleSaveAndTest}
                    className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold w-full"
                  >
                    Simpan Manual
                  </button>
                </div>
              </details>
            </div>

            {/* Feedback Status */}
            {testStatus !== "idle" && (
              <div className={`p-4 border font-mono text-xs space-y-2 ${
                testStatus === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : testStatus === "error"
                  ? "bg-red-50 border-red-300 text-red-900"
                  : "bg-indigo-50 border-indigo-200 text-indigo-900"
              }`}>
                <div className="font-bold flex items-center gap-2">
                  {testStatus === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  {testStatus === "error" && <AlertCircle className="h-4 w-4 text-red-600" />}
                  {testStatus === "testing" && <Bot className="h-4 w-4 text-indigo-600 animate-spin" />}
                  <span>{testStatus === "success" ? "Terhubung 1-Click!" : testStatus === "error" ? "Perlu Klik START" : "Mendeteksi..."}</span>
                </div>
                <div className="text-[11px] leading-relaxed font-sans">{testMessageResponse}</div>

                {sha256Hash && (
                  <div className="pt-2 border-t border-emerald-200 text-[10px] font-mono text-emerald-800 space-y-0.5">
                    <span className="font-bold">SHA-256 Verified Hash Signature:</span>
                    <div className="bg-white p-1 border border-emerald-300 text-slate-800 break-all select-all">
                      {sha256Hash}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}


        {/* Tab 2: Notification Threshold Filters */}
        {activeTab === "filters" && (
          <div className="space-y-4">
            
            <div className="p-4 bg-slate-50 border border-slate-300 space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase">
                Batas Minimal Notifikasi Whale (USD):
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">$</span>
                <input
                  type="number"
                  step={100000}
                  value={whaleThresholdUSD}
                  onChange={(e) => setWhaleThresholdUSD(Number(e.target.value))}
                  className="w-full font-mono text-xs font-bold"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(500000)}
                  className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $500k
                </button>
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(1000000)}
                  className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $1.0M
                </button>
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(3000000)}
                  className="px-2.5 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $3.0M
                </button>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableWhaleAlerts}
                  onChange={(e) => setEnableWhaleAlerts(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="font-bold text-slate-900">Whale Tracker Transfers (&gt; ${whaleThresholdUSD.toLocaleString()})</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableSoundAlerts}
                  onChange={(e) => setEnableSoundAlerts(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  {enableSoundAlerts ? <Volume2 className="h-4 w-4 text-indigo-600" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                  <span>Audio Chime Sound Effects</span>
                </span>
              </label>
            </div>

            <Link
              href="/notification-settings"
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-bold text-xs border border-slate-300 flex items-center justify-center gap-2"
            >
              <Sliders className="h-4 w-4 text-slate-600" />
              <span>Buka Halaman Pengaturan Lengkap</span>
            </Link>

          </div>
        )}

        {/* Tab 3: System Info */}
        {activeTab === "info" && (
          <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-sans">
            <div className="p-4 bg-slate-50 border border-slate-300 space-y-2">
              <div className="font-mono font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>MIJ Digital Web3 Architecture Overview</span>
              </div>
              <ul className="space-y-1 text-[11px] list-disc pl-4 text-slate-600">
                <li><strong>Next.js 16 App Router & Viem EVM Client</strong></li>
                <li><strong>100% Non-Custodial & Zero-Database Architecture</strong></li>
                <li><strong>Alchemy Dedicated Multichain Nodes (8 Active EVM Chains)</strong></li>
                <li><strong>SHA-256 Signed Telegram Webhook Server Proxy</strong></li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-900 space-y-1">
              <div className="font-mono font-bold flex items-center gap-1">
                <Bot className="h-4 w-4 text-indigo-600" />
                <span>Official Bot: @web3_ilhampradani_bot</span>
              </div>
              <p className="text-[11px]">
                Bot ini siap mengirimkan notifikasi transaksi ke seluruh pengunjung tanpa perlu konfigurasi backend terpisah.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">MIJ Digital Web3 Suite</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white font-bold text-xs border border-slate-900"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
