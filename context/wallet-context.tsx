"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isDemo: boolean;
  balanceETH: string;
  chainName: string;
  connectWallet: () => Promise<void>;
  connectDemoWallet: () => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isDemo: false,
  balanceETH: "0.00",
  chainName: "Ethereum Mainnet",
  connectWallet: async () => {},
  connectDemoWallet: () => {},
  disconnectWallet: () => {},
});

const DEMO_WALLET = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [balanceETH, setBalanceETH] = useState<string>("12.450");
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet");

  useEffect(() => {
    // Check if ethereum window object is present
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum.on?.("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setIsDemo(false);
        } else {
          disconnectWallet();
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setIsDemo(false);
          setBalanceETH("2.845");
          setChainName("Ethereum Mainnet");
        }
      } catch (err) {
        console.error("User rejected wallet connection", err);
      }
    } else {
      // Fallback to Demo mode if no Web3 wallet extension is installed
      connectDemoWallet();
    }
  };

  const connectDemoWallet = () => {
    setAddress(DEMO_WALLET);
    setIsConnected(true);
    setIsDemo(true);
    setBalanceETH("12.450");
    setChainName("Ethereum Mainnet (Demo)");
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setIsDemo(false);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isDemo,
        balanceETH,
        chainName,
        connectWallet,
        connectDemoWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
