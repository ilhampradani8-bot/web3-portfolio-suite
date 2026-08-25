# MIJ Digital Web3 Enterprise Suite

Platform analisis data Web3 & eksekusi smart contract *on-chain* berbasis **Next.js 16 (App Router)**, **Viem EVM RPC**, **Tailwind CSS**, dan **TypeScript**.

---

## 🚀 Fitur Modul (5 Module Suite)

1. 🐋 **On-Chain Whale Tracker (`/whale-tracker`)**: Monitoring live transaksi whale di Ethereum Mainnet via Viem RPC.
2. 🥩 **Decentralized Staking dApp (`/staking`)**: Non-custodial ETH liquid staking dengan perhitungan APY real-time.
3. ⚡ **DEX Arbitrage Scanner (`/arbitrage`)**: Pemantauan spread harga real-time Uniswap v3 vs Sushiswap via DexScreener Public API.
4. 📊 **Blockchain Data Dashboard (`/dashboard`)**: Analytics Total Value Locked (TVL) real-time via DefiLlama Open API.
5. 🚀 **Smart Contract Deployer Studio (`/contract-deployer`)**: Studio untuk mendeploy smart contract ERC-20, NFT, & Staking Vault satu per satu secara langsung ke blockchain via MetaMask.

---

## ⚡ Konfigurasi Alchemy API Key (WebSockets & Real-Time Stream)

Platform ini secara otomatis terhubung ke Node RPC publik (Cloudflare Web3 RPC). Untuk performa maksimal tanpa rate limit dan streaming data real-time via **WebSockets (`wss://`)**:

1. Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Dapatkan API Key gratis di **[dashboard.alchemy.com](https://dashboard.alchemy.com)**.
3. Isikan API Key Anda di `.env.local`:
   ```env
   NEXT_PUBLIC_ALCHEMY_API_KEY=masukkan_alchemy_key_anda_di_sini
   ```

---

## ☁️ Panduan Deployment ke Cloudflare Pages

Platform ini dirancang khusus untuk berjalan di edge network **Cloudflare Pages**:

### Metode 1: Hubungkan GitHub ke Cloudflare Dashboard (Otomatis / Recommended)
1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)** ➔ Pilih **Workers & Pages** ➔ **Create Application** ➔ **Pages** ➔ **Connect to Git**.
2. Pilih repositori GitHub: `ilhampradani8-bot/web3-portfolio-suite`.
3. Atur Build settings:
   - **Framework preset**: `Next.js`
   - **Build command**: `npx @cloudflare/next-on-pages` (atau `npm run build`)
   - **Build output directory**: `.next`
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_ALCHEMY_API_KEY` = (Alchemy Key Anda)
5. Klik **Save and Deploy**. Situs Anda akan langsung aktif dengan SSL gratis dan CDN edge global Cloudflare!

---

## 🛠️ Menjalankan Secara Lokal

```bash
# Clone repositori
git clone https://github.com/ilhampradani8-bot/web3-portfolio-suite.git
cd web3-portfolio-suite

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka `http://localhost:3000` di browser Anda.
