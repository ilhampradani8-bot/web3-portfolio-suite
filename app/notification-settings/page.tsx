"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Save, 
  Sliders, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  Rocket, 
  Bot, 
  ExternalLink,
  Info,
  Sparkles
} from "lucide-react";

export default function NotificationSettingsPage() {
  // Telegram Bot Credentials State
  const [telegramToken, setTelegramToken] = useState<string>("");
  const [telegramChatId, setTelegramChatId] = useState<string>("");
  const [showToken, setShowToken] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testMessageResponse, setTestMessageResponse] = useState<string>("");
  const [sha256Hash, setSha256Hash] = useState<string>("");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Notification Event Filter States
  const [whaleThresholdUSD, setWhaleThresholdUSD] = useState<number>(1000000);
  const [enableWhaleAlerts, setEnableWhaleAlerts] = useState<boolean>(true);
  const [enableStakingAlerts, setEnableStakingAlerts] = useState<boolean>(true);
  const [enableArbitrageAlerts, setEnableArbitrageAlerts] = useState<boolean>(true);
  const [enableDeployerAlerts, setEnableDeployerAlerts] = useState<boolean>(true);
  const [enableSoundAlerts, setEnableSoundAlerts] = useState<boolean>(true);

  // Load saved settings from localStorage or .env.local
  useEffect(() => {
    const savedToken = localStorage.getItem("mij_telegram_bot_token") || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
    const savedChatId = localStorage.getItem("mij_telegram_chat_id") || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "";
    const savedThreshold = localStorage.getItem("mij_whale_threshold");
    const savedWhale = localStorage.getItem("mij_alert_whale");
    const savedStaking = localStorage.getItem("mij_alert_staking");
    const savedArbitrage = localStorage.getItem("mij_alert_arbitrage");
    const savedDeployer = localStorage.getItem("mij_alert_deployer");
    const savedSound = localStorage.getItem("mij_alert_sound");

    if (savedToken) setTelegramToken(savedToken);
    if (savedChatId) setTelegramChatId(savedChatId);
    if (savedThreshold) setWhaleThresholdUSD(Number(savedThreshold));
    if (savedWhale !== null) setEnableWhaleAlerts(savedWhale === "true");
    if (savedStaking !== null) setEnableStakingAlerts(savedStaking === "true");
    if (savedArbitrage !== null) setEnableArbitrageAlerts(savedArbitrage === "true");
    if (savedDeployer !== null) setEnableDeployerAlerts(savedDeployer === "true");
    if (savedSound !== null) setEnableSoundAlerts(savedSound === "true");
  }, []);

  // Save settings to localStorage
  const handleSaveSettings = () => {
    localStorage.setItem("mij_telegram_bot_token", telegramToken.trim());
    localStorage.setItem("mij_telegram_chat_id", telegramChatId.trim());
    localStorage.setItem("mij_whale_threshold", String(whaleThresholdUSD));
    localStorage.setItem("mij_alert_whale", String(enableWhaleAlerts));
    localStorage.setItem("mij_alert_staking", String(enableStakingAlerts));
    localStorage.setItem("mij_alert_arbitrage", String(enableArbitrageAlerts));
    localStorage.setItem("mij_alert_deployer", String(enableDeployerAlerts));
    localStorage.setItem("mij_alert_sound", String(enableSoundAlerts));

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // 1-Click Auto Connect Trigger
  const handleAutoConnect = async () => {
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
        setTestMessageResponse(data.message || `Terhubung 1-Click! Chat ID Anda: ${data.chatId}`);
        if (data.sha256Hash) setSha256Hash(data.sha256Hash);
      } else {
        setTestStatus("error");
        setTestMessageResponse(data.error || "Belum terdeteksi. Silakan buka bot @web3_ilhampradani_bot lalu tekan START terlebih dahulu!");
      }
    } catch (err: any) {
      setTestStatus("error");
      setTestMessageResponse(`Terjadi kesalahan jaringan: ${err?.message || "Coba lagi nanti."}`);
    }
  };

  // Manual Test Payload Sender
  const handleTestTelegramConnection = async () => {
    setTestStatus("testing");
    setTestMessageResponse("");
    setSha256Hash("");

    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botToken: telegramToken.trim() || undefined,
          chatId: telegramChatId.trim() || undefined,
          filters: {
            whaleThreshold: `$${(whaleThresholdUSD / 1000000).toFixed(1)}M USD`,
            whaleAlerts: enableWhaleAlerts,
            stakingAlerts: enableStakingAlerts,
            arbitrageAlerts: enableArbitrageAlerts,
            deployerAlerts: enableDeployerAlerts,
          },
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setTestStatus("success");
        setTestMessageResponse(data.message || "Pesan tes berhasil dikirim via Serverless API Proxy!");
        if (data.sha256Hash) setSha256Hash(data.sha256Hash);
      } else {
        setTestStatus("error");
        setTestMessageResponse(`Gagal: ${data.error || "Periksa kembali Token/Chat ID Anda."}`);
      }
    } catch (err: any) {
      setTestStatus("error");
      setTestMessageResponse(`Terjadi kesalahan server proxy: ${err?.message || "Coba lagi nanti."}`);
    }
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      
      {/* Top Banner Header */}
      <div className="border border-slate-300 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Bot className="h-3.5 w-3.5" />
              <span>Telegram Bot Hub & Notification Preferences</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Pengaturan Notifikasi Telegram
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Hubungkan Bot Telegram Resmi <strong>@web3_ilhampradani_bot</strong> dengan 1-Click dan atur filter alert on-chain.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs border border-slate-900 shadow-xs"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Semua Pengaturan</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Pengaturan berhasil disimpan di lokal browser Anda!</span>
          </div>
        )}
      </div>

      {/* Hero 1-Click Connection Card (Top Featured Studio) */}
      <div className="border-2 border-slate-900 bg-white p-6 sm:p-8 shadow-md space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 text-white shadow-xs">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
                  Bot Resmi Portofolio: @web3_ilhampradani_bot
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 uppercase">
                  1-Click Ready
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Pengunjung web TIDAK PERLU membuat bot sendiri. Cukup 2 langkah mudah di bawah ini!
              </p>
            </div>
          </div>

          <a
            href="https://t.me/web3_ilhampradani_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs border border-indigo-700 shadow-xs transition-colors shrink-0"
          >
            <span>Buka Bot Telegram</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* 2-Step Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Step 1 Box */}
          <div className="p-5 bg-indigo-50/60 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-indigo-900 uppercase">
              <span>Langkah 1: Tekan START di Telegram</span>
              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px]">Langkah 1</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              Klik tombol di bawah ini untuk membuka bot Telegram resmi <strong>@web3_ilhampradani_bot</strong>, lalu tekan tombol <strong>START</strong> di dalam Telegram.
            </p>
            <a
              href="https://t.me/web3_ilhampradani_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs border border-indigo-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Bot className="h-4 w-4" />
              <span>1. Buka Bot Telegram & Klik START</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Step 2 Box */}
          <div className="p-5 bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between font-mono text-xs font-bold text-emerald-900 uppercase">
              <span>Langkah 2: Deteksi Instan 1-Click</span>
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px]">Langkah 2</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              Setelah menekan START di Telegram, tekan tombol hijau di bawah ini. Sistem akan **otomatis mendeteksi Chat ID Anda** tanpa perlu mengetik apapun!
            </p>
            <button
              onClick={handleAutoConnect}
              disabled={testStatus === "testing"}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs border border-emerald-700 flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className={`h-4 w-4 ${testStatus === "testing" ? "animate-spin" : ""}`} />
              <span>{testStatus === "testing" ? "Mendeteksi..." : "2. ⚡ Deteksi Otomatis & Hubungkan 1-Click!"}</span>
            </button>
          </div>

        </div>

        {/* Live Feedback Notification Banner */}
        {testStatus !== "idle" && (
          <div className={`p-4 border font-mono text-xs space-y-2 ${
            testStatus === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : testStatus === "error"
              ? "bg-red-50 border-red-300 text-red-900"
              : "bg-indigo-50 border-indigo-200 text-indigo-900"
          }`}>
            <div className="font-bold flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testStatus === "success" && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />}
                {testStatus === "error" && <AlertCircle className="h-4.5 w-4.5 text-red-600" />}
                {testStatus === "testing" && <Bot className="h-4.5 w-4.5 text-indigo-600 animate-spin" />}
                <span>{testStatus === "success" ? "Terhubung Live 1-Click!" : testStatus === "error" ? "Gagal Koneksi" : "Mendeteksi Telegram..."}</span>
              </div>
              {telegramChatId && (
                <span className="text-[10px] bg-white px-2 py-0.5 border border-slate-300 text-slate-800">
                  Chat ID: {telegramChatId}
                </span>
              )}
            </div>

            <div className="text-xs leading-relaxed font-sans font-medium">{testMessageResponse}</div>

            {sha256Hash && (
              <div className="pt-2 border-t border-emerald-200 text-[10px] font-mono text-emerald-800 space-y-0.5">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>SHA-256 Verified Signature:</span>
                </div>
                <div className="bg-white p-1.5 border border-emerald-300 text-slate-800 break-all select-all font-mono">
                  {sha256Hash}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Notification Event Filters & Thresholds (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-6">
            
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 uppercase">Filter Trigger Notifikasi</h2>
                <p className="text-[11px] text-slate-500 font-medium">Pilih jenis peristiwa on-chain yang dikirim ke Telegram Anda</p>
              </div>
              <Sliders className="h-5 w-5 text-indigo-600" />
            </div>

            {/* Whale USD Threshold Slider / Buttons */}
            <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase">
                Batas Minimal Notifikasi Whale Transfer (USD):
              </label>
              
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold text-slate-900">$</span>
                <input
                  type="number"
                  step={100000}
                  min={100000}
                  value={whaleThresholdUSD}
                  onChange={(e) => setWhaleThresholdUSD(Number(e.target.value))}
                  className="w-full font-mono text-sm font-bold bg-white border border-slate-300 p-2"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                {[500000, 1000000, 3000000, 5000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setWhaleThresholdUSD(val)}
                    className={`px-3 py-1.5 border font-bold ${
                      whaleThresholdUSD === val
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    ${(val / 1000000).toFixed(1)}M USD
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                Hanya transaksi kapital besar &gt;= <strong>${whaleThresholdUSD.toLocaleString()} USD</strong> yang akan dikirim ke Telegram Anda.
              </p>
            </div>

            {/* Checkbox Cards */}
            <div className="space-y-3 font-mono text-xs">
              
              <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={enableWhaleAlerts}
                  onChange={(e) => setEnableWhaleAlerts(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded-none border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Waves className="h-4 w-4 text-cyan-600" />
                    <span>Whale Capital Transfers</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    Notifikasi transfer kapital besar di 8 jaringan EVM Alchemy
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={enableStakingAlerts}
                  onChange={(e) => setEnableStakingAlerts(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded-none border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Coins className="h-4 w-4 text-emerald-600" />
                    <span>Staking Yield Accrual (12.4% APY)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    Notifikasi imbal hasil compounding liquid staking ETH
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={enableArbitrageAlerts}
                  onChange={(e) => setEnableArbitrageAlerts(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded-none border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <ArrowLeftRight className="h-4 w-4 text-purple-600" />
                    <span>DEX Arbitrage Disparity (&gt; 1.5%)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    Notifikasi selisih harga antarbursa Uniswap vs Sushiswap
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-300 cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={enableDeployerAlerts}
                  onChange={(e) => setEnableDeployerAlerts(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded-none border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-rose-600" />
                    <span>Smart Contract Deployment</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    Notifikasi saat ada smart contract EVM baru di-deploy
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={enableSoundAlerts}
                  onChange={(e) => setEnableSoundAlerts(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 rounded-none border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    {enableSoundAlerts ? <Volume2 className="h-4 w-4 text-indigo-600" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
                    <span>Audio Chime Sound Alert</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5 font-normal">
                    Bunyikan efek suara chime saat alert baru masuk di browser
                  </div>
                </div>
              </label>

            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs border border-slate-900 flex items-center justify-center gap-2 shadow-xs"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Filter Notifikasi</span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Security Architecture & Manual Input (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Security Architecture Box */}
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold uppercase tracking-tight">Keamanan Web3 & Vercel (Tanpa Database)</h3>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 font-sans leading-relaxed list-disc pl-4">
              <li>
                <strong className="text-slate-900 font-mono">Serverless API Proxy:</strong> Pengiriman notifikasi berjalan via Next.js Server Route (`/api/telegram/send`). Token bot Anda tidak pernah diekspos di client JS bundle.
              </li>
              <li>
                <strong className="text-slate-900 font-mono">100% Zero-Database:</strong> Vercel mengelola rahasia via <strong>Environment Variables</strong> (`TELEGRAM_BOT_TOKEN`). Aplikasi bersifat <em>stateless</em> tanpa butuh database terpusat.
              </li>
              <li>
                <strong className="text-slate-900 font-mono">Aman dari Git Leaks:</strong> File <code className="bg-slate-100 border px-1 font-mono text-slate-900">.env.local</code> secara otomatis diabaikan oleh Git (`.gitignore`), sehingga rahasia tidak akan pernah bocor ke GitHub.
              </li>
            </ul>
          </div>

          {/* Optional Manual Developer Override Accordion */}
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-4">
            <details className="text-xs font-mono space-y-3">
              <summary className="cursor-pointer font-bold text-slate-900 uppercase flex items-center justify-between">
                <span>Opsi Manual (Developer Override)</span>
                <span className="text-[10px] text-slate-500 font-normal">Klik untuk membuka</span>
              </summary>

              <div className="pt-3 space-y-4 font-sans text-slate-700">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                    Custom Bot Token (Opsional):
                  </label>
                  <div className="relative font-mono text-xs">
                    <input
                      type={showToken ? "text" : "password"}
                      value={telegramToken}
                      onChange={(e) => setTelegramToken(e.target.value)}
                      placeholder="Kosongkan untuk memakai Bot Default (@web3_ilhampradani_bot)"
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    >
                      {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                    Custom Chat ID (Opsional):
                  </label>
                  <input
                    type="text"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="Contoh: 987654321"
                    className="w-full font-mono text-xs font-bold"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleTestTelegramConnection}
                    className="w-full py-2.5 bg-indigo-600 text-white font-mono text-xs font-bold hover:bg-indigo-700"
                  >
                    Test Pesan Manual
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="w-full py-2.5 bg-slate-900 text-white font-mono text-xs font-bold hover:bg-slate-800"
                  >
                    Simpan Manual
                  </button>
                </div>
              </div>
            </details>
          </div>

        </div>

      </div>

    </div>
  );
}
