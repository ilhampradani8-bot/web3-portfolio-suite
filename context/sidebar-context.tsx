"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  toggleDesktopSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isDesktopCollapsed: false,
  isMobileOpen: false,
  toggleDesktopSidebar: () => {},
  toggleMobileSidebar: () => {},
  closeMobileSidebar: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedState = localStorage.getItem("mij_sidebar_collapsed");
    if (savedState !== null) {
      setIsDesktopCollapsed(savedState === "true");
    } else {
      // Default to hidden on first load
      setIsDesktopCollapsed(true);
    }
  }, []);


  const toggleDesktopSidebar = () => {
    setIsDesktopCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("mij_sidebar_collapsed", String(next));
      return next;
    });
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isDesktopCollapsed,
        isMobileOpen,
        toggleDesktopSidebar,
        toggleMobileSidebar,
        closeMobileSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
