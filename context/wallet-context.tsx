"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet, sepolia } from "viem/chains";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  balanceETH: string;
  chainName: string;
  chainId: number;
  hasMetaMask: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (chainIdHex: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  balanceETH: "0.00",
  chainName: "Ethereum Mainnet",
  chainId: 1,
  hasMetaMask: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balanceETH, setBalanceETH] = useState<string>("0.00");
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet");
  const [chainId, setChainId] = useState<number>(1);
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);

  // Fetch REAL ETH Balance from Blockchain RPC
  const updateRealBalance = async (userAddr: string, currentChainId: number) => {
    try {
      const targetChain = currentChainId === 11155111 ? sepolia : mainnet;
      const client = createPublicClient({
        chain: targetChain,
        transport: http(),
      });
      const balanceBigInt = await client.getBalance({ address: userAddr as `0x${string}` });
      const formatted = parseFloat(formatEther(balanceBigInt)).toFixed(4);
      setBalanceETH(formatted);
    } catch (err) {
      console.warn("Could not fetch real balance from RPC", err);
      setBalanceETH("0.0000");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ethereum = (window as any).ethereum;
      if (ethereum) {
        setHasMetaMask(true);

        // Auto-detect existing connected accounts
        ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            updateRealBalance(accounts[0], chainId);
          }
        }).catch(() => {});

        // Listen for account changes
        ethereum.on?.("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            updateRealBalance(accounts[0], chainId);
          } else {
            disconnectWallet();
          }
        });

        // Listen for network changes
        ethereum.on?.("chainChanged", (chainIdHex: string) => {
          const numericChainId = parseInt(chainIdHex, 16);
          setChainId(numericChainId);
          if (numericChainId === 11155111) {
            setChainName("Sepolia Testnet");
          } else {
            setChainName("Ethereum Mainnet");
          }
          if (address) {
            updateRealBalance(address, numericChainId);
          }
        });
      } else {
        setHasMetaMask(false);
      }
    }
  }, [address, chainId]);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          const userAddr = accounts[0];
          setAddress(userAddr);
          setIsConnected(true);
          await updateRealBalance(userAddr, chainId);
        }
      } catch (err) {
        console.error("User rejected wallet connection", err);
      }
    } else {
      setHasMetaMask(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
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
        balanceETH,
        chainName,
        chainId,
        hasMetaMask,
        connectWallet,
        disconnectWallet,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
