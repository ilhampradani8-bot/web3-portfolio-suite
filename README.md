# MIJ Digital Web3 Enterprise Suite

Platform analisis data Web3 & eksekusi smart contract *on-chain* berbasis **Next.js 16 (App Router)**, **Viem EVM RPC**, **Tailwind CSS**, dan **TypeScript**.

> 🟢 **Build Status**: Verified for Cloudflare Pages Deployment with Alchemy WebSockets API (`alch_DXNMWIMwQ-2-KsLr5ywty`).

---

## 🔑 Terpasang: Alchemy API Key (WebSockets & Real-Time Stream)

API Key Alchemy Anda (`alch_DXNMWIMwQ-2-KsLr5ywty`) telah terpasang dan aktif di `lib/rpc-client.ts` untuk HTTP RPC dan WebSocket streaming (`wss://`):
- **HTTP Endpoint**: `https://eth-mainnet.g.alchemy.com/v2/alch_DXNMWIMwQ-2-KsLr5ywty`
- **WebSocket Endpoint**: `wss://eth-mainnet.g.alchemy.com/v2/alch_DXNMWIMwQ-2-KsLr5ywty`

---

## 🛠️ Langkah Deployment Cloudflare Pages

1. Buka **[dash.cloudflare.com](https://dash.cloudflare.com)** ➔ Pilih **Workers & Pages** ➔ Klik **web3-portfolio-suite**.
2. Di **Build configuration**:
   - **Build command**: `npm run build`
   - **Deploy command**: `npm run cf:deploy`
3. Tambahkan variable: `NEXT_PUBLIC_ALCHEMY_API_KEY` = `alch_DXNMWIMwQ-2-KsLr5ywty`
4. Di tab **Deployments**, pilih **Clear build cache and deploy**.

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
