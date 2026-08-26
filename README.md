# MIJ Digital • Web3 Enterprise Portfolio & Financial Suite

Decentralized Financial Analytics & Protocol Suite built with **Next.js 16 (App Router)**, **Viem EVM RPC Clients**, **TypeScript**, and **Vanilla Tailwind CSS**.

> 🟢 **Production Build**: Verified & Auto-Deployed on **Vercel Serverless Edge** with **Alchemy Multichain Nodes**.

---

## 🏛️ Key Features & Architecture Highlights

### ⚡ 1-Click Telegram Bot Connection Studio (`@web3_ilhampradani_bot`)
- **Official Bot**: [`@web3_ilhampradani_bot`](https://t.me/web3_ilhampradani_bot)
- **1-Click Auto-Connect**: Zero manual typing of Chat IDs or tokens. Visitors simply press **START** in Telegram and click **Deteksi Otomatis 1-Click** on the web!
- **Serverless API Proxy (`/api/telegram/send` & `/api/telegram/auto-subscribe`)**: Raw bot tokens are stored strictly on the server side (`TELEGRAM_BOT_TOKEN`), preventing client-side credential leakage.
- **SHA-256 Cryptographic Signature**: Every alert message is signed with a verified SHA-256 hash (`crypto.createHash('sha256')`).
- **100% Zero-Database**: Runs statelessly on Vercel Edge using Environment Variables.

### 🌐 8 Supported EVM Networks (Alchemy Multichain RPC)
1. **Ethereum Mainnet** (`ETH`)
2. **Sepolia Testnet** (`ETH`)
3. **Arbitrum One (L2)** (`ETH/USDC`)
4. **Polygon PoS** (`POL/MATIC`)
5. **OP Mainnet (Optimism)** (`ETH`)
6. **Base (Coinbase L2)** (`ETH/USDC`)
7. **BNB Smart Chain (BSC)** (`BNB/USDT`)
8. **Avalanche C-Chain** (`AVAX/USDC`)

### 🎨 Classic Web3 Banking Design System
- **Sharp Classic UI ("Card Kotak Bukan Tumpul")**: Enforced `border-radius: 0px !important` for a high-contrast, institutional banking aesthetic.
- **Full-Width Hero Section**: Edge-to-edge background banner (`assets/baground.png`) with dark backdrop blur overlays.
- **Collapsible Desktop Sidebar**: Initialized in a hidden state on first load, with toggle buttons (`PanelLeft` / `PanelLeftClose`) in top navbar and sidebar header.
- **Modernized Web3 Icons**: Built with clean Lucide icons (`ShieldCheck`, `Layers`, `Cpu`, `Lock`, `Database`, `Code2`).

---

## 🛠️ Local Development & Running Locally

```bash
# Clone repository
git clone https://github.com/ilhampradani8-bot/web3-portfolio-suite.git
cd web3-portfolio-suite

# Install dependencies
npm install

# Run dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🔑 Environment Variables (.env.local / Vercel)

Create a `.env.local` file in the root directory or configure in Vercel Dashboard:

```env
# Alchemy Multichain Node Key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here

# Telegram Bot Integration Secrets (Server-Only - Never exposed to client JS)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

---

## 🚀 Deployment to Vercel

1. Push latest code to GitHub:
   ```bash
   git add .
   git commit -m "feat: Add Telegram Bot 1-Click Auto-Connect, SHA-256 Security, and 8 EVM Chains"
   git push origin main
   ```
2. Vercel automatically detects the push and triggers Continuous Deployment (CD).
