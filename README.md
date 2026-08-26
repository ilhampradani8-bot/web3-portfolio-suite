# 🏦 MIJ Digital • Web3 Enterprise Portfolio & Financial Suite

[![Live Production Web](https://img.shields.io/badge/Live%20Web-web3.ilhampradani.me-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://web3.ilhampradani.me)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.23-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Viem](https://img.shields.io/badge/Viem-EVM%20Client-blueviolet?style=for-the-badge)](https://viem.sh/)
[![Telegram Bot](https://img.shields.io/badge/Telegram%20Bot-1--Click%20Ready-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/web3_ilhampradani_bot)

A state-of-the-art, non-custodial **Web3 Enterprise Financial Analytics & Protocol Suite** engineered with Next.js 16 (App Router), Viem EVM RPC clients, Real-Time Binance WebSockets, Alchemy Multichain Asset Transfers, and a Classic Institutional Banking Design System.

---

## 🌐 Live Production Modules (`web3.ilhampradani.me`)

| Module Name | Live Direct Link | Core Functionality |
| :--- | :--- | :--- |
| **Smart Contract Deployer Studio** | [`web3.ilhampradani.me/contract-deployer`](https://web3.ilhampradani.me/contract-deployer) | 1-Click EVM Solidity Smart Contract Compilation & Deployment (100% Free on Sepolia Testnet) |
| **Decentralized Staking dApp** | [`web3.ilhampradani.me/staking`](https://web3.ilhampradani.me/staking) | Real On-Chain EVM Staking Vaults with Second-by-Second Yield Accrual Engine |
| **DEX Arbitrage Scanner** | [`web3.ilhampradani.me/arbitrage`](https://web3.ilhampradani.me/arbitrage) | Sub-Second WebSocket Live Price Ticker & Aave v3 On-Chain Flashloan Executor |
| **Whale Movement Tracker** | [`web3.ilhampradani.me/whale-tracker`](https://web3.ilhampradani.me/whale-tracker) | Real-Time On-Chain Capital Flow Monitor via Alchemy EVM RPC |
| **Blockchain Data Dashboard** | [`web3.ilhampradani.me/dashboard`](https://web3.ilhampradani.me/dashboard) | Live DefiLlama Protocol TVL Trends & Dune Analytics Style SQL Query Terminal |
| **Telegram Notification Studio** | [`web3.ilhampradani.me/notification-settings`](https://web3.ilhampradani.me/notification-settings) | 1-Click Telegram Bot Connection (`@web3_ilhampradani_bot`) with SHA-256 Signatures |

---

## 🏛️ Enterprise Modules Architecture

### 🚀 1. On-Chain Smart Contract Deployer Studio (`/contract-deployer`)
* **100% Free Sepolia Deployment**: Deploy custom ERC-20 Tokens, NFT Collections, or Staking Vaults directly to the Ethereum Sepolia Testnet for **free** using testnet faucet ETH.
* **MetaMask On-Chain Broadcasting**: Initiates real EVM bytecode contract deployment transactions via `viem` & MetaMask without custodial intermediaries.
* **Instant Explorer Verification**: Returns deterministic deployed contract addresses and direct links to Sepolia Etherscan block explorers.

### 💰 2. Non-Custodial Liquid Staking dApp (`/staking`)
* **Real EVM Vault Transactions**: Executes real `eth_sendTransaction` calls to protocol vault `0x358AA13c52544Ec2C6e12302686277F3763f4739`.
* **On-Chain Alchemy RPC Scanner**: Automatically detects past transfers on the Sepolia blockchain using `alchemy_getAssetTransfers`.
* **Per-Second Yield Engine**: Real-time ticker accrues compound staking rewards every 1000ms based on active staked balances.
* **8 Supported EVM Chains**: Multichain portfolio breakdown across Sepolia, Mainnet, Arbitrum, Polygon, Base, OP, BSC, and Avalanche.

### ⚡ 3. Real-Time DEX Arbitrage Scanner & Flashloan Executor (`/arbitrage`)
* **Sub-Second WebSocket Feed**: Streamed live via Binance Public Ticker WebSocket (`wss://stream.binance.com:9443`) for sub-second price updates.
* **Live Exchange Orderbook Ticker**: Features dynamic flashing up/down price indicators (`▲ UP` / `▼ DOWN`) and 24h percentage change tracking.
* **On-Chain Flashloan Executor**: Triggers real EVM flashloans via Aave v3 Liquidity Pools directly through MetaMask.
* **Mobile-Native Card View**: Dedicated vertical card layout for mobile viewports (< 640px) and full table view for desktop screens.

### 🐋 4. On-Chain Whale Movement Tracker (`/whale-tracker`)
* **Alchemy Asset Transfer API**: Monitors large-capital transfers across Ethereum Mainnet and major EVM L2s.
* **Etherscan Direct Integration**: Instant transaction verification with live block explorer links.

### 📊 5. Blockchain Data Analytics Dashboard (`/dashboard`)
* **DefiLlama Public Open API**: Real-time Total Value Locked (TVL) metrics and protocol trends queried directly from `api.llama.fi`.
* **Dune Analytics Style SQL Terminal**: Interactive SQL query engine for indexing liquidity pools and gas burn analytics.
* **Personal Staking Analytics**: Wallet-bound portfolio cards displaying total personal staked balance and daily yield estimates.

### 🤖 6. 1-Click Telegram Bot Connection Studio (`@web3_ilhampradani_bot`)
* **1-Click Auto-Connect**: Zero manual typing of Chat IDs or tokens. Visitors simply press **START** in Telegram and click **Deteksi Otomatis 1-Click** on the web.
* **Serverless API Proxy (`/api/telegram/send`)**: Bot credentials are managed strictly on the server side (`TELEGRAM_BOT_TOKEN`), preventing client-side exposure.
* **SHA-256 Cryptographic Hashes**: Every alert message includes a verified SHA-256 cryptographic signature (`crypto.createHash('sha256')`).

---

## 🎨 Design System & UX Standards

* **Classic Institutional Banking Aesthetics**: Enforced sharp rectangular container geometry (`border-2 border-slate-900`, `bg-white`, font-mono) for high contrast and executive readability.
* **100% English Localization**: Fully localized text across all dApp modules.
* **Full Mobile Responsiveness**: Dual-display architecture rendering mobile-native card views on smartphones (< 640px) and data tables on desktop viewports.

---

## 🛠️ Local Installation & Development

```bash
# 1. Clone repository
git clone https://github.com/ilhampradani8-bot/web3-portfolio-suite.git
cd web3-portfolio-suite

# 2. Install dependencies
npm install

# 3. Launch Next.js dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🔑 Environment Variables (.env.local)

Create a `.env.local` file in your local root directory:

```env
# Alchemy Multichain RPC Key
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key_here

# Telegram Bot Integration Secrets (Serverless Proxy Only)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id_here
```

---

## 🚀 Continuous Deployment (Vercel Edge)

1. Commit and push updates to GitHub:
   ```bash
   git add .
   git commit -m "feat: Update enterprise documentation and live web links"
   git push origin main
   ```
2. Vercel automatically detects pushes to `main` and triggers Continuous Deployment to [`web3.ilhampradani.me`](https://web3.ilhampradani.me).

---

© 2026 **MIJ Digital**. Built for Web3 Enterprise Financial Infrastructure.
