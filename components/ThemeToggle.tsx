'use client';

import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full border border-[var(--border-color)] flex items-center px-1 pointer-events-auto overflow-hidden group bg-[var(--card-bg)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Theme"
    >
      {/* Decorative track */}
      <div className="absolute inset-0 flex justify-around items-center opacity-20 text-[8px] tracking-tighter uppercase font-bold select-none pointer-events-none">
        <span>Dark</span>
        <span>Light</span>
      </div>

      <motion.div
        className="w-5 h-5 rounded-full bg-[var(--text-primary)] z-10 shadow-lg flex items-center justify-center overflow-hidden"
        animate={{ x: theme === 'dark' ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
           animate={{ rotate: theme === 'dark' ? 0 : 180 }}
           className="w-full h-full flex items-center justify-center"
        >
           {/* Minimal Dot or Icon could go here */}
           <div className="w-1 h-1 bg-[var(--bg-primary)] rounded-full" />
        </motion.div>
      </motion.div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    </motion.button>
  );
}
