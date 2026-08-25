# MIJ Digital Web3 Enterprise Suite

Platform analisis data Web3 & eksekusi smart contract *on-chain* berbasis **Next.js 16 (App Router)**, **Viem EVM RPC**, **Tailwind CSS**, dan **TypeScript**.

---

## 🔑 Terpasang: Alchemy API Key (WebSockets & Real-Time Stream)

API Key Alchemy Anda (`alch_DXNMWIMwQ-2-KsLr5ywty`) telah terpasang dan aktif di `lib/rpc-client.ts` untuk HTTP RPC dan WebSocket streaming (`wss://`):
- **HTTP Endpoint**: `https://eth-mainnet.g.alchemy.com/v2/alch_DXNMWIMwQ-2-KsLr5ywty`
- **WebSocket Endpoint**: `wss://eth-mainnet.g.alchemy.com/v2/alch_DXNMWIMwQ-2-KsLr5ywty`
- **Dukungan Multi-Chain**: Sangat mudah beralih ke Sepolia, Polygon, Arbitrum (Cukup ganti prefix `eth-sepolia.g.alchemy.com`, `polygon-mainnet.g.alchemy.com`).

---

## 🛠️ Solusi & Cara Fix Deployment Cloudflare Pages Error

Error `The entry-point file at "workers-site/index.js" was not found` terjadi karena di Cloudflare Pages Dashboard, **Deploy Command** terisi `npx wrangler deploy` (yang merupakan perintah untuk Workers, bukan Pages).

### Langkah Memperbaiki di Cloudflare Dashboard:

1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)** ➔ Pilih **Workers & Pages** ➔ Klik proyek **web3-portfolio-suite**.
2. Masuk ke tab **Settings** ➔ **Builds & deployments** ➔ Klik **Edit configuration**.
3. Ubah pengaturan Build menjadi sebagai berikut:
   - **Framework preset**: `Next.js` (atau `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Deployment Command (Deploy Command)**: Kosongkan / Kosongkan perintah wrangler manual.
4. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_ALCHEMY_API_KEY` = `alch_DXNMWIMwQ-2-KsLr5ywty`
5. Klik **Save and Retry Deployment**. Deployment akan langsung **SUCCESS 100%**!

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
