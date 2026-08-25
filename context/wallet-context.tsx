"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet, sepolia } from "viem/chains";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isDemo: boolean;
  balanceETH: string;
  chainName: string;
  chainId: number;
  connectWallet: () => Promise<void>;
  connectDemoWallet: () => void;
  disconnectWallet: () => void;
  switchNetwork: (chainIdHex: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isDemo: false,
  balanceETH: "0.00",
  chainName: "Ethereum Mainnet",
  chainId: 1,
  connectWallet: async () => {},
  connectDemoWallet: () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
});

const DEMO_WALLET = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [balanceETH, setBalanceETH] = useState<string>("12.450");
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet");
  const [chainId, setChainId] = useState<number>(1);

  // Fetch real balance from RPC if real wallet connected
  const updateRealWalletBalance = async (addr: string) => {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const client = createPublicClient({
          chain: chainId === 11155111 ? sepolia : mainnet,
          transport: http(),
        });
        const balanceBigInt = await client.getBalance({ address: addr as `0x${string}` });
        const formatted = parseFloat(formatEther(balanceBigInt)).toFixed(4);
        setBalanceETH(formatted);
      }
    } catch (err) {
      console.warn("Using cached balance view", err);
    }
  };

  useEffect(() => {
    // Check if window.ethereum exists in browser
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;

      // Handle account change in MetaMask
      ethereum.on?.("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setIsDemo(false);
          updateRealWalletBalance(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      // Handle chain change in MetaMask
      ethereum.on?.("chainChanged", (chainIdHex: string) => {
        const numericChainId = parseInt(chainIdHex, 16);
        setChainId(numericChainId);
        if (numericChainId === 11155111) {
          setChainName("Sepolia Testnet");
        } else {
          setChainName("Ethereum Mainnet");
        }
        if (address) {
          updateRealWalletBalance(address);
        }
      });
    }
  }, [address, chainId]);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          const userAddress = accounts[0];
          setAddress(userAddress);
          setIsConnected(true);
          setIsDemo(false);
          await updateRealWalletBalance(userAddress);
        }
      } catch (err) {
        console.error("User rejected wallet connection or closed modal", err);
      }
    } else {
      // Fallback to pre-funded Demo Mode if extension is not installed
      connectDemoWallet();
    }
  };

  const connectDemoWallet = () => {
    setAddress(DEMO_WALLET);
    setIsConnected(true);
    setIsDemo(true);
    setBalanceETH("12.450");
    setChainName("Sepolia (Demo)");
    setChainId(11155111);
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setIsDemo(false);
    setBalanceETH("0.00");
  };

  const switchNetwork = async (chainIdHex: string) => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      } catch (err) {
        console.error("Failed to switch network", err);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isDemo,
        balanceETH,
        chainName,
        chainId,
        connectWallet,
        connectDemoWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
