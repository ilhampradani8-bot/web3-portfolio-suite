# Nexus Web3 Portfolio Suite 🚀

Proyek **Web3 Portfolio Suite** terpadu yang memuat 4 aplikasi Web3 interaktif berbasis **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, dan library **Viem / Ethers.js**. 

Aplikasi ini dibangun **100% Tanpa Database (Zero DB)**, langsung membaca data *on-chain* dari RPC Public EVM & API publik real-time, serta siap di-push ke GitHub dan di-deploy ke Vercel dengan 1-click.

---

## 📂 Architecture & Clean Modular Structure

Seluruh kode disusun menggunakan **Feature-Driven Clean Architecture**, memisahkan ke-4 proyek ke folder masing-masing di dalam `modules/` serta memisahkan fungsi **Ambil Data** (`services/`) dan **Tampilkan Data** (`components/`):

```
web3/
├── app/                        # Next.js App Router (Rute & Shell Global)
│   ├── layout.tsx              # Root Layout + Web3 Context Shell
│   ├── page.tsx                # Landing Page Hub Portofolio Web3
│   ├── whale-tracker/page.tsx  # Rute Modul 1: Whale Tracker
│   ├── staking/page.tsx        # Rute Modul 2: Staking dApp
│   ├── arbitrage/page.tsx      # Rute Modul 3: DEX Scanner
│   └── dashboard/page.tsx      # Rute Modul 4: Data Dashboard
│
├── modules/                    # 📌 PEMISAHAN 4 PROYEK WEBS TERPISAH
│   │
│   ├── whale-tracker/          # 1. ON-CHAIN WHALE TRACKER
│   │   ├── services/           # [AMBIL DATA] API & Stream Transaksi On-Chain
│   │   │   └── fetch-whale-data.ts
│   │   ├── components/         # [TAMPILKAN DATA] Live Feed UI & Whale Card
│   │   │   ├── whale-feed.tsx
│   │   │   └── whale-card.tsx
│   │   └── types/              # Defini Tipe Transaksi
│   │       └── whale.ts
│   │
│   ├── staking/                # 2. DECENTRALIZED STAKING dAPP
│   │   ├── services/           # [AMBIL DATA] Contract State & Yield Calculator
│   │   │   └── staking-service.ts
│   │   ├── components/         # [TAMPILKAN DATA] Form Stake & Ticker Yield
│   │   │   ├── staking-form.tsx
│   │   │   └── yield-display.tsx
│   │   └── types/
│   │       └── staking.ts
│   │
│   ├── arbitrage/              # 3. DEX ARBITRAGE SCANNER
│   │   ├── services/           # [AMBIL DATA] Multi-DEX Price Matrix (Uniswap/Sushiswap)
│   │   │   └── fetch-dex-prices.ts
│   │   ├── components/         # [TAMPILKAN DATA] Matrix Harga & Calculator Profit
│   │   │   ├── price-matrix.tsx
│   │   │   └── profit-calculator.tsx
│   │   └── types/
│   │       └── dex.ts
│   │
│   └── dashboard/              # 4. BLOCKCHAIN DATA DASHBOARD
│       ├── services/           # [AMBIL DATA] Query Protocol Metrics & Analytics
│       │   └── fetch-analytics.ts
│       ├── components/         # [TAMPILKAN DATA] SQL Terminal & Recharts Visualizer
│       │   ├── sql-editor.tsx
│       │   └── metrics-chart.tsx
│       └── types/
│           └── analytics.ts
│
├── components/                 # Shared Components (Navbar, Wallet Modal, Footer)
├── context/                    # State Dompet Web3 (MetaMask + Demo Mode)
└── lib/                        # Helper Formatters & RPC Client EVM
```

---

## 🌟 Detail 4 Modul Web3

1. 🐋 **On-Chain Whale Tracker**
   - Transaksi besar (> $500,000) terdeteksi secara real-time.
   - Dilengkapi filter token (ETH, USDC, USDT, WBTC), filter network (Ethereum, Arbitrum, Polygon), dan tautan langsung ke Etherscan.

2. 🥩 **Decentralized Staking dApp**
   - Non-custodial ETH liquid staking dengan integrasi wallet (MetaMask & Demo Mode).
   - Ticker reward beranimasi real-time, kalkulator compound yield (12.4% APY), serta modal konfirmasi transaksi smart contract.

3. ⚡ **DEX Arbitrage Scanner**
   - Monitor selisih harga pasangan token real-time antar DEX (Uniswap v3, Sushiswap, Curve, PancakeSwap).
   - Profit & Gas Calculator untuk estimasi net ROI Flashloan setelah dipotong gas fee & slippage.

4. 📊 **Blockchain Data Dashboard**
   - Terminal SQL Query ala Dune Analytics untuk menjalankan kueri relasional blockchain.
   - Visualisasi tren TVL, Daily Active Wallets, dan Gas Price menggunakan Recharts.

---

## 🛠️ Cara Menjalankan Lokal

```bash
# 1. Jalankan server lokal
npm run dev

# 2. Buka browser di http://localhost:3000
```

---

## 📤 Cara Push ke GitHub & Hosting di Vercel

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "feat: complete Web3 portfolio suite with 4 modules"
git branch -M main
git remote add origin https://github.com/username/web3-portfolio-suite.git
git push -u origin main
```

### 2. Deploy Gratis ke Vercel (1-Click Deployment)
1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New Project"** ➔ Pilih repository GitHub Anda (`web3-portfolio-suite`).
3. Vercel akan otomatis mendeteksi framework **Next.js**.
4. Klik **"Deploy"**. Dalam ~1 menit situs Web3 Portofolio Anda sudah aktif di domain `.vercel.app`!
