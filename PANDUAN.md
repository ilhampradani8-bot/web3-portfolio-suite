# PANDUAN PENGEMBANGAN & ARSITEKTUR PLATFORM
## MIJ Digital Web3 Enterprise Suite

Dokumen ini berisi panduan komprehensif struktur kode, tahapan pembaruan (*changelog*), arsitektur modular, serta petunjuk integrasi **Alchemy RPC** dan **Telegram Bot Notification**.

---

## 🏛️ 1. Struktur Arsitektur Proyek (Clean Architecture)

Seluruh fitur utama dipisahkan ke dalam folder `modules/` untuk menjaga kode tetap modular, independen, dan mudah dipelihara (*clean code principle*):

```
web3/
├── app/                        # Next.js App Router (Rute & Layout)
│   ├── arbitrage/              # Page: DEX Arbitrage Scanner
│   ├── contract-deployer/      # Page: Smart Contract Deployer Studio
│   ├── dashboard/              # Page: Blockchain Data Dashboard
│   ├── staking/                # Page: Decentralized Staking dApp
│   ├── whale-tracker/          # Page: On-Chain Whale Tracker
│   ├── globals.css             # Base Theme Paper White & Banking Styling
│   └── layout.tsx              # Root Layout + Context Providers
├── components/
│   └── shared/                 # Komponen Bersama (Sidebar, Footer, NotificationBell)
├── context/
│   ├── notification-context.tsx# State Notifikasi On-Chain Real-Time
│   ├── theme-context.tsx       # Theme Provider (Classic Paper White)
│   └── wallet-context.tsx      # Provider Dompet MetaMask 100% Real
├── lib/
│   ├── rpc-client.ts           # Viem EVM RPC Client & Alchemy Node Setup
│   └── utils.ts                # Helper Format Currency, Address, & Styling
├── modules/
│   ├── arbitrage/              # Modul 03: DEX Arbitrage Scanner
│   ├── contract-deployer/      # Modul 05: Smart Contract Deployer Studio
│   ├── dashboard/              # Modul 04: Relational SQL Blockchain Analytics
│   ├── staking/                # Modul 02: Non-Custodial Liquid Staking
│   └── whale-tracker/          # Modul 01: Live EVM Whale Stream
├── public/                     # Aset Gambar Logo & Ikon Vektor SVG Web3
├── .env.example                # Template Variabel Lingkungan (Environment Variables)
├── package.json                # Dependensi Proyek & Skrip Build
└── PANDUAN.md                  # Dokumentasi & Panduan Pengembang
```

---

## 📜 2. Tahapan Pembaruan & Riwayat Fitur (Feature Timeline)

### 🔹 Tahap 1: Inisialisasi Proyek & Struktur Modular
- Menginisialisasi proyek berbasis **Next.js 15 (App Router)**, **TypeScript**, dan **Tailwind CSS**.
- Membuat struktur 4 modul utama di folder `modules/` dengan pemisahan `services/`, `components/`, dan `types/`.

### 🔹 Tahap 2: UI Classic Paper White & Navigasi Left Sidebar
- Menerapkan tema **Classic Paper White (`#f8f6f0` & `#ffffff`)** dengan font **Times New Roman** dan sudut kartu kotak presisi (*sharp edges*) ala portal institusi perbankan.
- Memindahkan navigasi utama dari top navbar menjadi **Left Sidebar Navigation** yang bersih dan responsif.

### 🔹 Tahap 3: Pembersihan Mode Simulasi & Integrasi MetaMask 100% ASLI
- Menghapus total seluruh mode demo/simulasi tiruan.
- Menghubungkan aplikasi **100% langsung ke browser extension MetaMask** via Viem EVM RPC Client untuk membaca alamat dompet (`0x...`) dan saldo ETH asli dari jaringan.

### 🔹 Tahap 4: Integrasi Live Public APIs (DexScreener, DefiLlama, Viem RPC)
- **DEX Arbitrage**: Terhubung ke **DexScreener Open API** (`api.dexscreener.com`) untuk membaca harga real-time WETH/USDC/USDT.
- **Blockchain Analytics**: Terhubung ke **DefiLlama Open API** (`api.llama.fi`) untuk membaca Total Value Locked (TVL) real-time.
- **Whale Tracker**: Terhubung ke **Viem Public Client (`getBlockNumber()`)** untuk membaca nomor blok live Ethereum Mainnet.

### 🔹 Tahap 5: Modul 05 - Smart Contract Deployer Studio
- Membuat modul `/contract-deployer` untuk mendeploy smart contract Solidity satu per satu (ERC-20 Token, NFT Collection, Staking Vault, Custom Bytecode) langsung ke Ethereum/Sepolia/Polygon via MetaMask.

### 🔹 Tahap 6: Integrasi Alchemy API Key & WebSockets (`wss://`)
- Memasang Alchemy API Key (`alch_DXNMWIMwQ-2-KsLr5ywty`) pada `lib/rpc-client.ts` untuk mengaktifkan streaming WebSockets dan kuota 300 Juta Compute Units/Bulan.

### 🔹 Tahap 7: Pusat Notifikasi On-Chain Real-Time
- Membuat `context/notification-context.tsx` dan `components/shared/notification-bell.tsx` dengan indikator lonceng, unread counter badge (`🔴`), dan popover list notifikasi transaksi whale/staking/deployer.

---

## 📡 3. Jawaban & Integrasi Alchemy ke Telegram Bot

### Q1: Apakah Alchemy hanya sekadar penghubung on-chain?
**Jawab**: Alchemy adalah **Infrastructure Node Provider Multichain** yang berfungsi sebagai pintu gerbang (gateway) antara aplikasi web kita dengan jaringan blockchain. 

### Q2: Apakah Alchemy bisa disetting agar aktif di semua jaringan?
**Jawab**: **Bisa!** Di Alchemy Dashboard ([dashboard.alchemy.com](https://dashboard.alchemy.com)):
1. Alchemy mendukung **Ethereum Mainnet, Sepolia Testnet, Polygon, Arbitrum, Optimism, Base, Solana, dan BNB Chain**.
2. Anda cukup membuat Apps atau mengaktifkan jaringannya di Alchemy Dashboard. Di aplikasi ini, Anda tinggal mengganti prefix URL di `lib/rpc-client.ts` (contoh: `eth-mainnet.g.alchemy.com`, `polygon-mainnet.g.alchemy.com`, `arb-mainnet.g.alchemy.com`).

### Q3: Bagaimana cara menghubungkan notifikasi on-chain ke Telegram Bot?
Untuk mengirim notifikasi pergerakan Whale atau transaksi langsung ke HP/Group Telegram Anda:

1. **Buat Bot Telegram**:
   - Chat `@BotFather` di Telegram ➔ Ketik `/newbot` ➔ Simpan **Bot Token** (Contoh: `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`).
   - Dapatkan **Chat ID** Telegram Anda (bisa via `@userinfobot`).

2. **Gunakan Fitur Alchemy Notify (Webhooks)**:
   - Buka Alchemy Dashboard ➔ Masuk ke menu **Notify** ➔ Klik **Create Webhook**.
   - Pilih jenis event: **Address Activity** (jika ada transaksi di dompet tertentu) atau **Custom Webhook**.
   - Masukkan URL Webhook server Anda atau URL Telegram Bot API:
     `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=ALERT: Large Whale Transaction Detected!`
3. **Hasil**: Setiap kali ada transaksi besar terjadi di blockchain, Alchemy akan otomatis menembak API Telegram dan pesan notifikasi langsung masuk ke aplikasi Telegram Anda.

---

## 🛠️ 4. Panduan Pengembang (Cara Mengubah Kode Tanpa Error)

Jika Anda atau AI ingin menambah/mengubah fitur di masa depan, ikuti aturan berikut agar tidak merusak kode yang ada:

1. **Menambah Modul Baru**:
   - Buat folder baru di dalam `modules/nama-modul/`.
   - Buat sub-folder: `components/`, `services/`, dan `types/`.
   - Tambahkan halaman rute baru di `app/nama-modul/page.tsx`.
   - Daftarkan link modul baru di `navLinks` pada file `components/shared/sidebar.tsx`.

2. **Menambah Notifikasi Baru**:
   - Panggil hook `useNotifications()` di komponen Anda:
     ```tsx
     const { addNotification } = useNotifications();
     addNotification({
       title: "Judul Notifikasi",
       message: "Pesan rinci transaksi on-chain",
       category: "WHALE", // WHALE | STAKING | ARBITRAGE | DEPLOYER | SYSTEM
       link: "/rute-modul"
     });
     ```

3. **Aturan Git Push**:
   - Jalankan `npm run build` terlebih dahulu secara lokal untuk memastikan tidak ada error TypeScript.
   - **HANYA LAKUKAN `git push origin main` JIKA DIMINTA SECARA EKSPLISIT OLEH USER.**

---

## 🌐 5. Lingkungan Deployment (Vercel & Local)

- **Local Server**: Run `npm run dev` ➔ Buka `http://localhost:3000`.
- **Vercel Production**: Repositori terhubung langsung dengan Vercel dengan variabel lingkungan `NEXT_PUBLIC_ALCHEMY_API_KEY`.
