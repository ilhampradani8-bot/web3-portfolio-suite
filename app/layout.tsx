import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/wallet-context";
import { ThemeProvider } from "@/context/theme-context";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Nexus Web3 Portfolio Suite | Developer Showcase",
  description: "A high-performance Web3 developer suite featuring On-Chain Whale Tracker, Staking dApp, DEX Arbitrage Scanner, and Blockchain Analytics Console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <ThemeProvider>
          <WalletProvider>
            <Navbar />
            <main className="flex-1 w-full max-w-full px-4 sm:px-6 lg:px-12 py-8">
              {children}
            </main>
            <Footer />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
