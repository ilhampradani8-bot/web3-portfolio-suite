"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useWallet } from "./wallet-context";

export interface OnChainNotification {
  id: string;
  title: string;
  message: string;
  category: "WHALE" | "STAKING" | "ARBITRAGE" | "DEPLOYER" | "SYSTEM";
  timestamp: string;
  read: boolean;
  txHash?: string;
  link?: string;
}

interface NotificationContextType {
  notifications: OnChainNotification[];
  unreadCount: number;
  addNotification: (notif: Omit<OnChainNotification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearAll: () => {},
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, isConnected } = useWallet();
  const [notifications, setNotifications] = useState<OnChainNotification[]>([]);

  // Default initial live event notifications
  const defaultNotifications: OnChainNotification[] = [
    {
      id: "notif-1",
      title: "Whale Movement Alert",
      message: "Large transfer of 1,450.5 ETH ($4,714,125 USD) detected on Ethereum Mainnet Block #19842100",
      category: "WHALE",
      timestamp: "2 mins ago",
      read: false,
      txHash: "0x8f2a6b31c9d4e5f7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4",
      link: "/whale-tracker",
    },
    {
      id: "notif-2",
      title: "Arbitrage Opportunity Detected",
      message: "0.50% ETH/USDC price spread available between Uniswap v3 and Sushiswap ($463.50 Net Profit)",
      category: "ARBITRAGE",
      timestamp: "5 mins ago",
      link: "/arbitrage",
      read: false,
    },
    {
      id: "notif-3",
      title: "Node Connection Active",
      message: "Successfully connected to Alchemy WebSockets Real-Time Stream (alch_DXNMW...)",
      category: "SYSTEM",
      timestamp: "10 mins ago",
      read: true,
    },
  ];

  // Load notifications dynamically per connected wallet address
  useEffect(() => {
    if (isConnected && address) {
      const storageKey = `web3_notifications_${address.toLowerCase()}`;
      const savedRaw = localStorage.getItem(storageKey);
      if (savedRaw) {
        try {
          const parsed = JSON.parse(savedRaw);
          setNotifications(parsed);
          return;
        } catch (e) {
          console.warn("Could not parse stored notifications", e);
        }
      }
      // If no custom notifications yet for this address, save defaults
      setNotifications(defaultNotifications);
      localStorage.setItem(storageKey, JSON.stringify(defaultNotifications));
    } else {
      setNotifications(defaultNotifications);
    }
  }, [isConnected, address]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notif: Omit<OnChainNotification, "id" | "timestamp" | "read">) => {
    const newNotif: OnChainNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      if (isConnected && address) {
        const storageKey = `web3_notifications_${address.toLowerCase()}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });

    // Play Audio Chime Sound Alert if enabled
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      if (isConnected && address) {
        const storageKey = `web3_notifications_${address.toLowerCase()}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      if (isConnected && address) {
        const storageKey = `web3_notifications_${address.toLowerCase()}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    if (isConnected && address) {
      const storageKey = `web3_notifications_${address.toLowerCase()}`;
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
