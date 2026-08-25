# PANDUAN PENGEMBANGAN & ARSITEKTUR PLATFORM
## MIJ Digital • Web3 Enterprise Portfolio & Financial Suite

Dokumen ini berisi panduan komprehensif struktur kode, tahapan pembaruan (*changelog*), arsitektur modular, integrasi 8 jaringan EVM **Alchemy RPC**, integrasi **Telegram Bot 1-Click Auto-Connect**, serta arsitektur **SHA-256 Security & Zero-Database Vercel Edge**.

---

## 🏛️ 1. Struktur Arsitektur Proyek (Clean Architecture)

Seluruh fitur utama dipisahkan ke dalam folder `modules/` dan rute `app/` untuk menjaga kode tetap modular, independen, dan mudah dipelihara (*clean code principle*):

```
web3/
├── app/                        # Next.js App Router (Rute & Layout)
│   ├── api/                    # Serverless Edge API Routes
│   │   └── telegram/           # API Proxy Telegram (/send & /auto-subscribe)
│   ├── arbitrage/              # Page: DEX Arbitrage Scanner
│   ├── contract-deployer/      # Page: Smart Contract Deployer Studio
│   ├── dashboard/              # Page: Relational Blockchain Analytics
│   ├── notification-settings/  # Page: Telegram Bot Hub & Event Filters
│   ├── staking/                # Page: Decentralized Staking dApp
│   ├── whale-tracker/          # Page: On-Chain Whale Tracker (8 EVM Chains)
│   ├── globals.css             # Base Theme Classic Banking & Sharp Card Styling
│   └── layout.tsx              # Root Layout + Context Providers
├── components/
│   └── shared/                 # Komponen Bersama (Sidebar, Navbar, NotificationBell, QuickSettingsModal)
├── context/
│   ├── notification-context.tsx# State Notifikasi On-Chain Real-Time
│   ├── sidebar-context.tsx     # State Desktop Sidebar Collapse/Expand Toggle
│   ├── theme-context.tsx       # Theme Provider (Classic Banking Paper)
│   └── wallet-context.tsx      # Provider Dompet MetaMask 100% Real
├── lib/
│   ├── rpc-client.ts           # Viem EVM RPC Client & 8 Alchemy Node Setup
│   └── utils.ts                # Helper Format Currency, Address, & Styling
├── modules/
│   ├── arbitrage/              # Modul 03: DEX Arbitrage Scanner
│   ├── contract-deployer/      # Modul 05: Smart Contract Deployer Studio
│   ├── dashboard/              # Modul 04: Relational SQL Blockchain Analytics
│   ├── staking/                # Modul 02: Non-Custodial Liquid Staking
│   └── whale-tracker/          # Modul 01: Live EVM Whale Stream
├── public/                     # Aset Gambar Background, Logo & Ikon Web3
├── .env.example                # Template Variabel Lingkungan (Environment Variables)
├── .env.local                  # Variabel Lingkungan Lokal (Server-Only Secrets)
├── package.json                # Dependensi Proyek & Skrip Build
└── PANDUAN.md                  # Dokumentasi & Panduan Pengembang
```

---

## 📜 2. Tahapan Pembaruan & Riwayat Fitur (Feature Timeline)

### 🔹 Tahap 1: Inisialisasi Proyek & Struktur Modular
- Menginisialisasi proyek berbasis **Next.js 16 (App Router)**, **TypeScript**, dan **Tailwind CSS**.
- Membuat struktur modul utama di folder `modules/` dengan pemisahan `services/`, `components/`, dan `types/`.

### 🔹 Tahap 2: Tampilan Classic Sharp UI ("Card Kotak Bukan Tumpul")
- Menerapkan tema **Classic Banking Style (`#f8f6f0` & `#ffffff`)** dengan sudut kartu kotak presisi (`border-radius: 0px !important`).
- Menambahkan **Hero Banner Full-Width** dengan gambar background edge-to-edge (`public/assets/baground.png`).

### 🔹 Tahap 3: Fitur Sembunyikan Sidebar Desktop (Initial Hidden Sidebar)
- Memperbarui `context/sidebar-context.tsx` sehingga sidebar desktop diawali dalam keadaan **Hidden / Collapsed** pada kunjungan pertama.
- Menyediakan tombol *Toggle Sidebar* (`PanelLeft` / `PanelLeftClose`) di Top Navbar dan Header Sidebar.

### 🔹 Tahap 4: Ekspansi 8 Jaringan EVM Alchemy RPC
- Memperluas client RPC Viem di `lib/rpc-client.ts` untuk mendukung **8 Jaringan EVM**:
  1. Ethereum Mainnet (`ETH`)
  2. Sepolia Testnet (`ETH`)
  3. Arbitrum One L2 (`ETH/USDC`)
  4. Polygon PoS (`POL/MATIC`)
  5. OP Mainnet Optimism (`ETH`)
  6. Base Coinbase L2 (`ETH/USDC`)
  7. BNB Smart Chain (`BNB/USDT`)
  8. Avalanche C-Chain (`AVAX/USDC`)

### 🔹 Tahap 5: Integrasi Telegram Bot Studio & Serverless Proxy
- Membuat Bot resmi **`@web3_ilhampradani_bot`** (`https://t.me/web3_ilhampradani_bot`).
- Membuat Serverless Next.js API Routes:
  - `/api/telegram/send`: Mengirim notifikasi via Server Proxy tanpa mengekspos token di browser client.
  - `/api/telegram/auto-subscribe`: Otomatis menangkap `chat_id` pengguna yang mengeklik `/start` secara **1-Click Auto-Connect** tanpa perlu mengetik ID manual.
- **SHA-256 Signature Proof**: Menandai setiap pesan notifikasi dengan hash SHA-256 (`crypto.createHash('sha256')`).
- **100% Zero-Database**: Berjalan statelessly di Vercel Edge Serverless menggunakan `TELEGRAM_BOT_TOKEN`.

---

## 🤖 3. Cara Kerja Bot Telegram 1-Click

Pengunjung web **TIDAK PERLU membuat bot sendiri** atau mengetik Chat ID manual:

1. **Pengunjung Tekan START**:
   - Pengunjung membuk link **[t.me/web3_ilhampradani_bot](https://t.me/web3_ilhampradani_bot)** -> tekan **START**.
2. **1-Click Auto-Connect di Web**:
   - Di halaman web `/notification-settings` atau modal menu `=`, pengunjung cukup menekan **[2. ⚡ Deteksi Otomatis & Hubungkan 1-Click!]**.
   - Backend API Route `/api/telegram/auto-subscribe` secara otomatis membaca `chat_id` pengguna terbaru dari API Telegram dan mengirimkan pesan tes konfirmasi live.

---

## 🔒 4. Keamanan Web3 & Deployment Vercel

1. **Proteksi Token (`.gitignore`)**:
   - `TELEGRAM_BOT_TOKEN` disimpan di `.env.local` di tingkat server tanpa awalan `NEXT_PUBLIC_`.
   - File `.env.local` secara otomatis diabaikan oleh Git (`.gitignore` baris 32), sehingga token tidak akan pernah bocor ke GitHub publik.
2. **Pengaturan di Vercel Dashboard**:
   - Di Vercel Dashboard -> **Project Settings** -> **Environment Variables**:
     - `TELEGRAM_BOT_TOKEN` = `8821015524:AAEcyqLy1KKMP5oDItw6QSGuKcGgiDjxwDw`
   - Vercel mengelola variabel lingkungan ini di tingkat serverless edge secara otomatis tanpa membutuhkan database.

---

## 🚀 5. Perintah Push GitHub & Auto-Deployment

Untuk memperbarui aplikasi publik di Vercel:

```bash
git add .
git commit -m "docs: Update PANDUAN.md and README.md with 8 EVM chains, Telegram 1-Click setup, and SHA-256 architecture"
git push origin main
```

Vercel akan mendeteksi push baru di GitHub dan secara otomatis melakukan **Auto-Deployment dalam ~45 detik**!
