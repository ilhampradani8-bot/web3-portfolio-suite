"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/context/notification-context";
import { 
  Bell, 
  Check, 
  Trash2, 
  X, 
  ExternalLink, 
  Waves, 
  Coins, 
  ArrowLeftRight, 
  Rocket, 
  Activity 
} from "lucide-react";

export const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "WHALE":
        return <Waves className="h-3.5 w-3.5 text-cyan-600" />;
      case "STAKING":
        return <Coins className="h-3.5 w-3.5 text-emerald-600" />;
      case "ARBITRAGE":
        return <ArrowLeftRight className="h-3.5 w-3.5 text-purple-600" />;
      case "DEPLOYER":
        return <Rocket className="h-3.5 w-3.5 text-red-600" />;
      default:
        return <Activity className="h-3.5 w-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="relative">
      
      {/* Bell Button with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-white border border-slate-400 hover:bg-slate-100 text-slate-900 flex items-center justify-center"
        title="On-Chain Live Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center bg-red-700 text-white font-mono text-[10px] font-bold border border-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Drawer / Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-2 border-slate-900 shadow-2xl z-50 p-4 space-y-3 font-serif">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">NOTIFIKASI ON-CHAIN</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-100 text-red-800 font-bold border border-red-300">
                  {unreadCount} Baru
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-mono text-slate-600 hover:text-slate-900 underline"
                >
                  Tandai Dibaca
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* List Notifications */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-500">
                Tidak ada notifikasi on-chain baru.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`p-3 border transition-all text-xs font-serif ${
                    item.read
                      ? "bg-slate-50 border-slate-200 text-slate-600 opacity-75"
                      : "bg-white border-slate-900 text-slate-900 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      {getCategoryIcon(item.category)}
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-700 leading-normal mb-2">
                    {item.message}
                  </p>

                  {item.link && (
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-red-700 font-bold hover:underline"
                    >
                      <span>Buka Modul</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {notifications.length > 0 && (
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>Alchemy WebSocket Active</span>
              <button
                onClick={clearAll}
                className="text-red-700 hover:underline font-bold flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Hapus Semua
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
