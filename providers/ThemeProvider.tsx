"use client";

import React, { ReactNode } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

type Mode = 'dark' | 'light';  // Define the type for theme modes

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>("dark");

  const toggle = () => {
    setMode(prevMode => prevMode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};
