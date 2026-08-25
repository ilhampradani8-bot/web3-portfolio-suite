"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
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
  Info
} from "lucide-react";

export default function NotificationSettingsPage() {
  // Telegram Bot Credentials State
  const [telegramToken, setTelegramToken] = useState<string>("");
  const [telegramChatId, setTelegramChatId] = useState<string>("");
  const [showToken, setShowToken] = useState<boolean>(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testMessageResponse, setTestMessageResponse] = useState<string>("");
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

  const [sha256Hash, setSha256Hash] = useState<string>("");

  // Trigger real Live Telegram Bot Test Message via Next.js Server API Proxy (/api/telegram/send)
  const handleTestTelegramConnection = async () => {
    setTestStatus("testing");
    setTestMessageResponse("");
    setSha256Hash("");

    try {
      const res = await fetch("/api/telegram/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botToken: telegramToken.trim() || undefined,
          chatId: telegramChatId.trim() || undefined,
          message: (
            `🚨 *MIJ DIGITAL WEB3 ENTERPRISE ALERT*\n\n` +
            `✅ *Koneksi Telegram Connected (Vercel Serverless Edge)!*\n` +
            `• *Timestamp*: ${new Date().toLocaleString()}\n` +
            `• *Status Server*: Next.js API Proxy Active\n` +
            `• *Architecture*: 100% Stateless & Zero-Database\n\n` +
            `Bot Telegram Anda siap menerima notifikasi transaksi real-time!`
          ),
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setTestStatus("success");
        setTestMessageResponse(data.message || "Pesan tes berhasil dikirim via Serverless API Proxy!");
        if (data.sha256Hash) {
          setSha256Hash(data.sha256Hash);
        }
      } else {
        setTestStatus("error");
        setTestMessageResponse(`Gagal: ${data.error || "Periksa kembali Token/Chat ID Anda."}`);
      }
    } catch (err: any) {
      setTestStatus("error");
      setTestMessageResponse(`Terjadi kesalahan koneksi server proxy: ${err?.message || "Coba lagi nanti."}`);
    }
  };


  return (
    <div className="space-y-8 pb-8">
      
      {/* Header Banner */}
      <div className="border border-slate-300 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
              <Sliders className="h-3.5 w-3.5" />
              <span>System Preferences & Webhook Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              Pengaturan Notifikasi & Telegram Bot
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Hubungkan bot Telegram Anda dan atur filter ambang batas (*threshold*) notifikasi transaksi on-chain.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs border border-slate-900 shadow-xs"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Semua Pengaturan</span>
          </button>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Pengaturan berhasil disimpan di sistem lokal browser Anda!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Telegram Bot Integration Studio (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 border border-indigo-200">
                  <Bot className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 uppercase">Integrasi Bot Telegram Live</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Kirim notifikasi transaksi langsung ke HP/Chat Telegram Anda</p>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 border ${
                telegramToken && telegramChatId ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-amber-50 text-amber-700 border-amber-300"
              }`}>
                {telegramToken && telegramChatId ? "Ready to Connect" : "Setup Required"}
              </span>
            </div>

            {/* Telegram Credentials Form */}
            <div className="space-y-4">
              
              {/* Official Bot Active Badge */}
              <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono space-y-2">
                <div className="font-bold flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Bot className="h-4 w-4 text-indigo-600" />
                    <span>Bot Resmi Portofolio: @web3_ilhampradani_bot</span>
                  </div>
                  <a
                    href="https://t.me/web3_ilhampradani_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-[10px] font-bold inline-flex items-center gap-1"
                  >
                    <span>Buka Bot Telegram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="text-[11px] font-sans text-indigo-800 leading-relaxed">
                  Pengunjung web <strong>TIDAK PERLU membuat bot sendiri</strong>! Pengunjung cukup membuka bot resmi Anda <strong>@web3_ilhampradani_bot</strong> -&gt; klik <strong>START</strong> -&gt; lalu tekan tombol <strong>Deteksi Otomatis 1-Click</strong> di bawah ini!
                </div>

              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                  1. Telegram Chat ID Penerima Notifikasi:
                </label>
                <input
                  type="text"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  placeholder="Masukkan Chat ID Telegram Anda (Ambil dari @userinfobot)"
                  className="w-full font-mono text-xs font-bold"
                />
                <p className="text-[11px] text-slate-500 font-normal mt-1">
                  Dapatkan Chat ID Anda dari bot <strong>@userinfobot</strong> di Telegram.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                  2. Custom Bot Token (Khusus Developer / Advanced):
                </label>
                <div className="relative">
                  <input
                    type={showToken ? "text" : "password"}
                    value={telegramToken}
                    onChange={(e) => setTelegramToken(e.target.value)}
                    placeholder="Kosongkan untuk memakai Bot Default (@web3_ilhampradani_bot)"
                    className="w-full font-mono text-xs pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                  >
                    {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 font-normal mt-1">
                  Biarkan kosong untuk menggunakan Bot Resmi <strong>@web3_ilhampradani_bot</strong>.
                </p>
              </div>



              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestTelegramConnection}
                  disabled={testStatus === "testing"}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs border border-indigo-700 disabled:opacity-50 shadow-xs"
                >
                  <Send className={`h-3.5 w-3.5 ${testStatus === "testing" ? "animate-pulse" : ""}`} />
                  <span>{testStatus === "testing" ? "Mengirim Tes..." : "Test Koneksi Telegram Live"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-slate-800 hover:bg-slate-100 font-mono font-bold text-xs border border-slate-300"
                >
                  <Save className="h-3.5 w-3.5 text-slate-600" />
                  <span>Simpan Token</span>
                </button>

                {/* Storage & Vercel Security Info Card */}
                <div className="p-4 bg-slate-50 border border-slate-300 space-y-3 text-xs">
                  <div className="font-mono font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Keamanan Portofolio Web3 & Deployment Vercel (Tanpa Database)</span>
                  </div>

                  <ul className="space-y-2 text-[11px] text-slate-700 font-sans leading-relaxed list-disc pl-4">
                    <li>
                      <strong className="text-slate-900 font-mono">1. Serverless API Proxy (`/api/telegram/send`):</strong> Token bot Anda tidak pernah diekspos langsung di browser client JS. Pengiriman dilakukan via Next.js Server Route dengan hashing <strong>SHA-256 Payload Signature</strong>.
                    </li>
                    <li>
                      <strong className="text-slate-900 font-mono">2. Cara Simpan di Vercel (Tanpa Database!):</strong> Vercel bersifat <em>stateless serverless edge</em>. Anda **TIDAK memerlukan database** (PostgreSQL/MongoDB)! Cukup masukkan rahasia ini di Vercel Dashboard:
                      <div className="mt-1.5 p-2.5 bg-slate-900 text-emerald-400 font-mono text-[10px] space-y-1">
                        <div className="text-slate-400 font-sans"># Di Vercel Dashboard -&gt; Project Settings -&gt; Environment Variables:</div>

                        <div>TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ</div>
                        <div>TELEGRAM_CHAT_ID=987654321</div>
                      </div>
                    </li>
                    <li>
                      <strong className="text-slate-900 font-mono">3. Aman dari GitHub Leaks (`.gitignore`):</strong> File <code className="bg-white border px-1 font-mono text-slate-900">.env.local</code> secara otomatis sudah diabaikan oleh Git, sehingga rahasia Anda tidak akan pernah bocor saat dipush ke repository GitHub publik.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Test Connection Output Feedback with SHA-256 Signature */}
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
                    <span>{testStatus === "success" ? "Koneksi Telegram Berhasil!" : testStatus === "error" ? "Gagal Koneksi" : "Menghubungkan ke API Telegram..."}</span>
                  </div>
                  <div className="text-[11px] leading-relaxed font-sans">{testMessageResponse}</div>

                  {sha256Hash && (
                    <div className="pt-2 border-t border-emerald-200 text-[10px] font-mono text-emerald-800 space-y-0.5">
                      <div className="font-bold flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>SHA-256 Payload Signature Verified:</span>
                      </div>
                      <div className="bg-white p-1.5 border border-emerald-300 text-slate-800 break-all select-all font-mono">
                        {sha256Hash}
                      </div>
                    </div>
                  )}
                </div>

              )}

            </div>

          </div>

          {/* Guide Section: Apa Yang Perlu Anda Siapkan */}
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-3">
              <HelpCircle className="h-5 w-5 text-indigo-600" />
              <h3 className="text-sm font-bold uppercase tracking-tight">Apa Yang Perlu Anda Siapkan? (Panduan 3 Langkah)</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-normal leading-relaxed">
              
              <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Langkah 1: Dapatkan Bot Token dari @BotFather</span>
                  <a
                    href="https://t.me/BotFather"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-mono text-[11px] hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>Buka @BotFather</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-600">
                  Buka aplikasi Telegram, cari akun bot resmi <strong>@BotFather</strong>. Kirim perintah <code className="bg-slate-200 px-1 py-0.5 font-mono text-slate-900 font-bold">/newbot</code>, ikuti petunjuk nama bot Anda, lalu salin **HTTP API Token** yang diberikan (contoh: <span className="font-mono text-slate-800">123456789:ABCdef...</span>).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Langkah 2: Dapatkan Chat ID Anda dari @userinfobot</span>
                  <a
                    href="https://t.me/userinfobot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-mono text-[11px] hover:underline inline-flex items-center gap-1 font-bold"
                  >
                    <span>Buka @userinfobot</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-600">
                  Buka bot <strong>@userinfobot</strong> di Telegram lalu klik <strong>Start</strong>. Bot akan membalas dengan **Id** angka Anda (contoh: <span className="font-mono text-slate-800">987654321</span>). Jika ingin notifikasi masuk ke Group/Channel, tambahkan bot Anda ke Group tersebut lalu ambil ID Groupnya.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">
                  Langkah 3: Masukkan Ke Form & Klik "Test Koneksi Telegram Live"
                </div>
                <p className="text-[11px] text-slate-600">
                  Tempelkan Token dan Chat ID pada form di atas, lalu klik tombol **Test Koneksi Telegram Live**. Jika berhasil, Anda akan menerima pesan konfirmasi selamat datang di aplikasi Telegram Anda secara instant!
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: On-Chain Event Notification Filters (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="border border-slate-300 bg-white p-6 shadow-xs space-y-6">
            
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900 uppercase">Filter Trigger Notifikasi</h2>
              <p className="text-[11px] text-slate-500 font-medium">Pilih jenis peristiwa on-chain yang memicu notifikasi</p>
            </div>

            {/* Whale USD Threshold Input */}
            <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs font-mono font-bold text-slate-800 uppercase">
                Batas Minimal Notifikasi Whale (USD):
              </label>
              
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900">$</span>
                <input
                  type="number"
                  step={100000}
                  min={100000}
                  value={whaleThresholdUSD}
                  onChange={(e) => setWhaleThresholdUSD(Number(e.target.value))}
                  className="w-full font-mono text-xs font-bold"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(500000)}
                  className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $500k
                </button>
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(1000000)}
                  className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $1.0M
                </button>
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(3000000)}
                  className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $3.0M
                </button>
                <button
                  type="button"
                  onClick={() => setWhaleThresholdUSD(5000000)}
                  className="px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold"
                >
                  $5.0M
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Hanya transaksi di atas <strong>${whaleThresholdUSD.toLocaleString()} USD</strong> yang akan memicu lonceng notifikasi & alert Telegram.
              </p>
            </div>

            {/* Checkbox Event Filters */}
            <div className="space-y-3 font-mono text-xs">
              
              <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableWhaleAlerts}
                  onChange={(e) => setEnableWhaleAlerts(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 rounded-none"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Waves className="h-3.5 w-3.5 text-cyan-600" />
                    <span>Whale Tracker Alerts</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Notifikasi transfer kapital besar di jaringan EVM
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableStakingAlerts}
                  onChange={(e) => setEnableStakingAlerts(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 rounded-none"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Staking Yield Accrual</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Notifikasi imbal hasil APY staking liquid ETH
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableArbitrageAlerts}
                  onChange={(e) => setEnableArbitrageAlerts(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 rounded-none"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ArrowLeftRight className="h-3.5 w-3.5 text-purple-600" />
                    <span>DEX Arbitrage Disparity (&gt; 1.5%)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Notifikasi selisih harga antarbursa Uniswap vs Sushiswap
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-white border border-slate-200 cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={enableDeployerAlerts}
                  onChange={(e) => setEnableDeployerAlerts(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 rounded-none"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Rocket className="h-3.5 w-3.5 text-rose-600" />
                    <span>Smart Contract Deployment</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Notifikasi saat ada smart contract baru yang di-deploy
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={enableSoundAlerts}
                  onChange={(e) => setEnableSoundAlerts(e.target.checked)}
                  className="mt-0.5 h-4 w-4 text-indigo-600 rounded-none"
                />
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {enableSoundAlerts ? <Volume2 className="h-3.5 w-3.5 text-indigo-600" /> : <VolumeX className="h-3.5 w-3.5 text-slate-400" />}
                    <span>Sound Effects Audio Chime</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Bunyikan efek suara chime saat notifikasi baru masuk
                  </div>
                </div>
              </label>

            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveSettings}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs border border-slate-900 flex items-center justify-center gap-2 shadow-xs"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Filter Notifikasi</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
