import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/wallet-context";
import { ThemeProvider } from "@/context/theme-context";
import { Sidebar } from "@/components/shared/sidebar";
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
  title: "MIJ Digital Web3 Enterprise Suite | Decentralized Financial Platform",
  description: "Institutional-grade Web3 platform featuring On-Chain Whale Stream, Decentralized Liquid Staking, Multi-DEX Arbitrage Engine, and Relational Blockchain Data Console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-50 text-slate-900 flex min-h-screen">
        <ThemeProvider>
          <WalletProvider>
            
            {/* Left Sidebar Navigation */}
            <Sidebar />

            {/* Right Main Content Workspace Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
              <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
                {children}
              </main>
              <Footer />
            </div>

          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
