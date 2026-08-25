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
  Activity,
  Sliders
} from "lucide-react";


interface NotificationBellProps {
  align?: "sidebar" | "navbar";
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ align = "sidebar" }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "WHALE":
        return <Waves className="h-4 w-4 text-cyan-600" />;
      case "STAKING":
        return <Coins className="h-4 w-4 text-emerald-600" />;
      case "ARBITRAGE":
        return <ArrowLeftRight className="h-4 w-4 text-purple-600" />;
      case "DEPLOYER":
        return <Rocket className="h-4 w-4 text-rose-600" />;
      default:
        return <Activity className="h-4 w-4 text-slate-500" />;
    }
  };

  const popoverPositionClass = 
    align === "sidebar"
      ? "bottom-full mb-3 left-0 w-[280px] sm:w-[320px]"
      : "top-full mt-3 right-0 w-80 sm:w-96";

  return (
    <div className="relative">
      
      {/* Bell Button with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs transition-all flex items-center justify-center"
        title="On-Chain Live Notifications"
      >
        <Bell className="h-4 w-4 text-slate-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center bg-rose-500 text-white font-mono text-[10px] font-bold border-2 border-white rounded-full shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Drawer / Popover */}
      {isOpen && (
        <div className={`absolute ${popoverPositionClass} bg-white border border-slate-200 shadow-xl rounded-2xl z-[100] p-4 space-y-3 font-sans`}>
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-xs tracking-tight uppercase font-mono">Notifikasi On-Chain</span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-rose-50 text-rose-600 font-bold border border-rose-200 rounded-md">
                  {unreadCount} Baru
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-mono font-semibold text-slate-500 hover:text-indigo-600 underline"
                >
                  Tandai Dibaca
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* List Notifications */}
          <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono font-semibold text-slate-400">
                Tidak ada notifikasi on-chain baru.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`p-3 border rounded-xl transition-all text-xs cursor-pointer ${
                    item.read
                      ? "bg-slate-50/60 border-slate-100 text-slate-500 opacity-75"
                      : "bg-indigo-50/40 border-indigo-100 text-slate-900 font-medium shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      {getCategoryIcon(item.category)}
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0 bg-white px-1.5 py-0.5 border border-slate-200 rounded">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug mb-2 font-normal">
                    {item.message}
                  </p>

                  {item.link && (
                    <Link
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors"
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
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500">
            <Link
              href="/notification-settings"
              onClick={() => setIsOpen(false)}
              className="text-indigo-600 hover:underline font-bold flex items-center gap-1"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Pengaturan Telegram</span>
            </Link>

            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-rose-600 hover:underline font-bold flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Hapus Semua
              </button>
            )}
          </div>

        </div>
      )}


    </div>
  );
};



