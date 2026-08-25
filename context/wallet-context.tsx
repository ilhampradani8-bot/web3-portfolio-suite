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
  walletError: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  clearWalletError: () => void;
  switchNetwork: (chainIdHex: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  balanceETH: "0.00",
  chainName: "Ethereum Mainnet",
  chainId: 1,
  hasMetaMask: false,
  walletError: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  clearWalletError: () => {},
  switchNetwork: async () => {},
  refreshBalance: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balanceETH, setBalanceETH] = useState<string>("0.00");
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet");
  const [chainId, setChainId] = useState<number>(1);
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  // Fetch REAL ETH Balance directly from MetaMask provider or Viem RPC Node
  const updateRealBalance = async (userAddr: string, targetChainId?: number) => {
    if (!userAddr) return;

    // 1. Try directly asking active MetaMask provider first
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const hexBalance = await (window as any).ethereum.request({
          method: "eth_getBalance",
          params: [userAddr, "latest"],
        });
        if (hexBalance) {
          const formatted = (parseFloat(BigInt(hexBalance).toString()) / 1e18).toFixed(4);
          setBalanceETH(formatted);
          return;
        }
      } catch (e) {
        console.warn("Direct eth_getBalance warning, falling back to Viem RPC", e);
      }
    }

    // 2. Fallback to Viem RPC client
    try {
      const activeChainId = targetChainId || chainId;
      const targetChain = activeChainId === 11155111 ? sepolia : mainnet;
      const client = createPublicClient({
        chain: targetChain,
        transport: http(),
      });
      const balanceBigInt = await client.getBalance({ address: userAddr as `0x${string}` });
      const formatted = parseFloat(formatEther(balanceBigInt)).toFixed(4);
      setBalanceETH(formatted);
    } catch (err) {
      console.warn("Could not fetch balance from RPC node", err);
      setBalanceETH("0.0000");
    }
  };

  const refreshBalance = async () => {
    if (address) {
      await updateRealBalance(address, chainId);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
    setBalanceETH("0.00");
    setWalletError(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ethereum = (window as any).ethereum;
    if (ethereum) {
      setHasMetaMask(true);

      // 1. Fetch active Chain ID on load
      ethereum
        .request({ method: "eth_chainId" })
        .then((hexChainId: string) => {
          const numericChainId = parseInt(hexChainId, 16);
          setChainId(numericChainId);
          setChainName(numericChainId === 11155111 ? "Sepolia Testnet" : "Ethereum Mainnet");
        })
        .catch(() => {});

      // 2. Auto-check if MetaMask already unlocked and connected
      ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            updateRealBalance(accounts[0]);
          }
        })
        .catch(() => {});

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setWalletError(null);
          updateRealBalance(accounts[0]);
        } else {
          disconnectWallet();
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        const numericChainId = parseInt(chainIdHex, 16);
        setChainId(numericChainId);
        setChainName(numericChainId === 11155111 ? "Sepolia Testnet" : "Ethereum Mainnet");
        if (address) {
          updateRealBalance(address, numericChainId);
        }
      };

      ethereum.on?.("accountsChanged", handleAccountsChanged);
      ethereum.on?.("chainChanged", handleChainChanged);

      return () => {
        ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
        ethereum.removeListener?.("chainChanged", handleChainChanged);
      };
    } else {
      setHasMetaMask(false);
    }
  }, [address]);

  const connectWallet = async () => {
    setWalletError(null);
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        const hexChainId = await (window as any).ethereum.request({
          method: "eth_chainId",
        });
        const numericChainId = parseInt(hexChainId, 16);
        setChainId(numericChainId);
        setChainName(numericChainId === 11155111 ? "Sepolia Testnet" : "Ethereum Mainnet");

        if (accounts && accounts.length > 0) {
          const userAddr = accounts[0];
          setAddress(userAddr);
          setIsConnected(true);
          setWalletError(null);
          await updateRealBalance(userAddr, numericChainId);
        }
      } catch (err: any) {
        console.warn("MetaMask Connection Warning:", err);

        if (err?.code === 4001) {
          setWalletError("Koneksi dibatalkan: Anda menutup/menolak pop-up MetaMask.");
        } else if (err?.code === -32002) {
          setWalletError("Pop-up MetaMask sudah terbuka di browser Anda. Silakan buka icon MetaMask di pojok kanan atas browser untuk menyetujui koneksi.");
        } else {
          setWalletError("Gagal terhubung ke MetaMask. Pastikan extension MetaMask Anda dalam keadaan terbuka (unlocked) dan coba klik lagi.");
        }
      }
    } else {
      setHasMetaMask(false);
      setWalletError("MetaMask tidak terdeteksi di browser Anda. Silakan pasang extension MetaMask terlebih dahulu.");
    }
  };

  const clearWalletError = () => {
    setWalletError(null);
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
        walletError,
        connectWallet,
        disconnectWallet,
        clearWalletError,
        switchNetwork,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
