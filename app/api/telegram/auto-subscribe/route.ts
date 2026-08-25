import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        { ok: false, error: "Bot Token belum dikonfigurasi di server .env.local / Vercel." },
        { status: 400 }
      );
    }

    // Query Telegram getUpdates API to automatically capture recent users who clicked /start
    const url = `https://api.telegram.org/bot${botToken.trim()}/getUpdates`;
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json(
        { ok: false, error: data.description || "Gagal membaca updates dari Telegram." },
        { status: 500 }
      );
    }

    const results = data.result || [];
    
    // Find the latest message/chat from recent users
    let latestChatId = "";
    let firstName = "";
    let username = "";

    for (let i = results.length - 1; i >= 0; i--) {
      const update = results[i];
      const chat = update?.message?.chat || update?.my_chat_member?.chat;
      if (chat && chat.id) {
        latestChatId = String(chat.id);
        firstName = chat.first_name || "";
        username = chat.username || "";

        // Capture deep-linking payload parameter if user clicked /start with params
        const text = update?.message?.text || "";
        if (text.startsWith("/start")) {
          const startParam = text.split(" ")[1] || "default_web3_suite";
          console.log(`[Telegram Bot] User ${latestChatId} deep-linked with payload: ${startParam}`);
        }
        break;
      }
    }


    // Fallback to default server TELEGRAM_CHAT_ID if set
    if (!latestChatId && process.env.TELEGRAM_CHAT_ID) {
      latestChatId = process.env.TELEGRAM_CHAT_ID;
    }

    if (!latestChatId) {
      return NextResponse.json({
        ok: false,
        error: "Belum ada user yang menekan START. Silakan klik link bot @web3_ilhampradani_bot lalu tekan START di Telegram!",
      });
    }

    // Automatically send welcome message to detected Chat ID
    const payloadToHash = `${latestChatId}:${Date.now()}`;
    const sha256Signature = crypto.createHash("sha256").update(payloadToHash).digest("hex");

    const textToSend = (
      `🚨 *MIJ DIGITAL WEB3 ENTERPRISE ALERT*\n\n` +
      `🎉 *Selamat ${firstName || "User"}! Telegram Anda Terhubung 1-Click!*\n` +
      `• *Chat ID Auto-Detected*: \`${latestChatId}\`\n` +
      `• *Status Bot*: Active (@web3_ilhampradani_bot)\n` +
      `• *SHA-256 Hash*: \`${sha256Signature.substring(0, 16)}...\`\n\n` +
      `Anda tidak perlu mengisi Chat ID manual. Notifikasi transaksi on-chain siap dikirim ke Telegram Anda!`
    );

    const sendUrl = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`;
    const sendRes = await fetch(sendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: latestChatId,
        text: textToSend,
        parse_mode: "Markdown",
      }),
    });

    const sendData = await sendRes.json();

    return NextResponse.json({
      ok: true,
      chatId: latestChatId,
      firstName,
      username,
      sha256Hash: sha256Signature,
      message: `Terdeteksi 1-Click! Terhubung ke Telegram ${firstName ? firstName : "User"} (Chat ID: ${latestChatId})`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
