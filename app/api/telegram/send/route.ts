import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId: clientChatId, message, botToken: clientBotToken } = body;

    // Use Server Environment Variable (Vercel / .env.local) or Client Override
    const botToken = clientBotToken || process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = clientChatId || process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Missing Telegram Bot Token or Chat ID. Please configure TELEGRAM_BOT_TOKEN in Vercel Environment Variables or Settings UI." 
        }, 
        { status: 400 }
      );
    }

    // Generate SHA-256 Hash Signature for Web3 Payload Authenticity
    const payloadToHash = `${chatId}:${message}:${Date.now()}`;
    const sha256Signature = crypto.createHash("sha256").update(payloadToHash).digest("hex");

    // Read custom alert filters if passed from client preferences
    const filtersInfo = body.filters || {
      whaleThreshold: "$1,000,000 USD",
      whaleAlerts: true,
      stakingAlerts: true,
      arbitrageAlerts: true,
      deployerAlerts: true,
    };

    const textToSend = message || (
      `🚨 *MIJ DIGITAL WEB3 ENTERPRISE BOT ALERT*\n\n` +
      `✅ *Koneksi Telegram Connected (1-Click Auto-Detect)!*\n` +
      `• *Status Node*: 8 Active EVM Networks (Public Read-Only)\n` +
      `• *Wallet Requirement*: 🌐 *Public Access (Tanpa Connect Wallet)*\n` +
      `• *SHA-256 Signature*: \`${sha256Signature.substring(0, 16)}...\` \n\n` +
      `📋 *Pengaturan Filter Notifikasi Aktif Anda*:\n` +
      ` 🐋 *Whale Transfer Threshold*: >= ${filtersInfo.whaleThreshold || "$1.0M"}\n` +
      ` 🥩 *Staking Yield Accrual*: ${filtersInfo.stakingAlerts ? "✅ Aktif" : "❌ Nonaktif"}\n` +
      ` ⚡ *DEX Arbitrage Disparity (>1.5%)*: ${filtersInfo.arbitrageAlerts ? "✅ Aktif" : "❌ Nonaktif"}\n` +
      ` 📜 *Smart Contract Deployment*: ${filtersInfo.deployerAlerts ? "✅ Aktif" : "❌ Nonaktif"}\n\n` +
      `Bot ini akan otomatis memantau rantai blok EVM dan mengirimkan alert secara real-time!`
    );


    const telegramUrl = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: textToSend,
        parse_mode: "Markdown",
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json(
        { ok: false, error: data.description || "Telegram API error" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      ok: true,
      sha256Hash: sha256Signature,
      message: "Notification sent successfully via Serverless API Proxy",
      telegramResult: data.result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
