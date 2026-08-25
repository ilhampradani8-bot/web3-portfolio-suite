"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "futuristic" | "classic";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "futuristic",
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>("futuristic");

  useEffect(() => {
    const savedTheme = localStorage.getItem("nexus_web3_theme") as ThemeMode;
    if (savedTheme && (savedTheme === "futuristic" || savedTheme === "classic")) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("nexus_web3_theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "futuristic" ? "classic" : "futuristic";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className={theme === "classic" ? "theme-classic" : "theme-futuristic"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
