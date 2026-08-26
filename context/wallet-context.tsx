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
  isDetecting: boolean;
  isConnecting: boolean;
  detectionStatus: "DETECTED" | "SCANNING" | "NOT_FOUND";
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
  isDetecting: true,
  isConnecting: false,
  detectionStatus: "SCANNING",
  walletError: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  clearWalletError: () => {},
  switchNetwork: async () => {},
  refreshBalance: async () => {},
});

// Helper function to dynamically resolve MetaMask provider from window, providers array, or EIP-6963
const getMetaMaskProvider = (): any => {
  if (typeof window === "undefined") return null;

  const win = window as any;

  // 1. Direct window.ethereum check
  if (win.ethereum) {
    // Multi-wallet extension array handling (Phantom + MetaMask + Coinbase)
    if (win.ethereum.providers?.length) {
      const mmProvider = win.ethereum.providers.find((p: any) => p.isMetaMask);
      if (mmProvider) return mmProvider;
    }
    if (win.ethereum.isMetaMask) return win.ethereum;
    return win.ethereum;
  }

  // 2. Check EIP-6963 announced providers fallback
  if (win.__eip6963Providers?.length) {
    const eipProvider = win.__eip6963Providers.find((p: any) => p.info?.rdns?.includes("metamask") || p.provider?.isMetaMask);
    if (eipProvider) return eipProvider.provider;
  }

  return null;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [balanceETH, setBalanceETH] = useState<string>("0.00");
  const [chainName, setChainName] = useState<string>("Ethereum Mainnet");
  const [chainId, setChainId] = useState<number>(1);
  const [hasMetaMask, setHasMetaMask] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(true);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [detectionStatus, setDetectionStatus] = useState<"DETECTED" | "SCANNING" | "NOT_FOUND">("SCANNING");
  const [walletError, setWalletError] = useState<string | null>(null);

  // Fetch REAL ETH Balance directly from provider or Viem RPC Node
  const updateRealBalance = async (userAddr: string, targetChainId?: number) => {
    if (!userAddr) return;

    const provider = getMetaMaskProvider();
    if (provider) {
      try {
        const hexBalance = await provider.request({
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

  // Robust Async Detection Engine: EIP-6963 + Polling + Event Listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const win = window as any;

    const detectProvider = () => {
      const ethereum = getMetaMaskProvider();
      if (ethereum) {
        setHasMetaMask(true);
        setIsDetecting(false);
        setDetectionStatus("DETECTED");

        // Fetch active Chain ID
        ethereum
          .request({ method: "eth_chainId" })
          .then((hexChainId: string) => {
            const numericChainId = parseInt(hexChainId, 16);
            setChainId(numericChainId);
            setChainName(numericChainId === 11155111 ? "Sepolia Testnet" : "Ethereum Mainnet");
          })
          .catch(() => {});

        // Auto-check if MetaMask already unlocked and connected
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
      } else {
        setHasMetaMask(false);
      }
    };

    // 1. EIP-6963 Standard Listener for instant extension announcement without reload
    const handleAnnounce = (event: any) => {
      if (!win.__eip6963Providers) win.__eip6963Providers = [];
      win.__eip6963Providers.push(event.detail);
      detectProvider();
    };

    window.addEventListener("eip6963:announceProvider", handleAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // 2. Immediate & Event Detection Attempts
    detectProvider();
    window.addEventListener("ethereum#initialized", detectProvider, { once: true });

    // 3. Continuous polling up to 3 seconds after page mount
    let count = 0;
    const interval = setInterval(() => {
      detectProvider();
      count++;
      if (count > 15) {
        clearInterval(interval);
        setIsDetecting(false);
        if (!getMetaMaskProvider()) {
          setDetectionStatus("NOT_FOUND");
        }
      }
    }, 200);

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleAnnounce);
      window.removeEventListener("ethereum#initialized", detectProvider);
      clearInterval(interval);
    };
  }, [address]);

  // Connect Wallet Function with Dynamic On-The-Fly Provider Resolution & Loading UX
  const connectWallet = async () => {
    setWalletError(null);
    setIsConnecting(true);

    // Dynamic resolution at the exact moment user clicks "Connect"
    let ethereum = getMetaMaskProvider();

    // If not detected immediately on click, wait 300ms and try one more dynamic check
    if (!ethereum && typeof window !== "undefined") {
      window.dispatchEvent(new Event("eip6963:requestProvider"));
      await new Promise((resolve) => setTimeout(resolve, 300));
      ethereum = getMetaMaskProvider();
    }

    if (ethereum) {
      setHasMetaMask(true);
      setDetectionStatus("DETECTED");
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const hexChainId = await ethereum.request({
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
          setWalletError("Connection Canceled: You closed or rejected the MetaMask prompt.");
        } else if (err?.code === -32002) {
          setWalletError("MetaMask prompt is already open in your browser. Please click the MetaMask extension icon in the top right to approve.");
        } else {
          setWalletError("Failed to connect to MetaMask. Make sure your extension is unlocked and try again.");
        }
      } finally {
        setIsConnecting(false);
      }
    } else {
      setHasMetaMask(false);
      setDetectionStatus("NOT_FOUND");
      setIsConnecting(false);
      
      // Mobile Browser handling vs Desktop
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        setWalletError("MetaMask is not injected in this mobile browser. Redirecting to open inside MetaMask Mobile App...");
        window.location.href = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      } else {
        setWalletError("MetaMask extension not detected. Please make sure the MetaMask extension is enabled in your browser extensions manager.");
        window.open("https://metamask.io/download/", "_blank");
      }
    }
  };

  const clearWalletError = () => {
    setWalletError(null);
  };

  const switchNetwork = async (chainIdHex: string) => {
    const ethereum = getMetaMaskProvider();
    if (ethereum) {
      try {
        await ethereum.request({
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
        isDetecting,
        isConnecting,
        detectionStatus,
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
