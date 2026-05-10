'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // Midpoint: the curtain is fully down (1s duration)
    // We swap the theme at 0.8s for a seamless blend
    setTimeout(() => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }, 800);

    // End transition state after the exit wipe is complete
    // Wipe duration is 1s, we start exit at 1.2s
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
