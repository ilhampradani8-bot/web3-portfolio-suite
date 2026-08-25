import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/wallet-context";
import { ThemeProvider } from "@/context/theme-context";
import { NotificationProvider } from "@/context/notification-context";
import { SidebarProvider } from "@/context/sidebar-context";
import { AppContainer } from "@/components/shared/app-container";

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
  description: "Institutional-grade Web3 platform featuring On-Chain Whale Stream, Decentralized Liquid Staking, Multi-DEX Arbitrage Engine, Relational Blockchain Data Console, and Smart Contract Deployer Studio.",
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
            <NotificationProvider>
              <SidebarProvider>
                <AppContainer>
                  {children}
                </AppContainer>
              </SidebarProvider>
            </NotificationProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


