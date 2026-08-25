"use client";

import React from "react";
import { useSidebar } from "@/context/sidebar-context";
import { Sidebar } from "@/components/shared/sidebar";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDesktopCollapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isDesktopCollapsed ? "lg:pl-0" : "lg:pl-64"
        }`}
      >
        <Navbar />
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
