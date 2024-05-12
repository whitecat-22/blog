"use client"

import React, { createContext, useState } from "react";

interface ThemeContextType {
  toggle: () => void;
  mode: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
