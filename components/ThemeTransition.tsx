'use client';

import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeTransition() {
  const { isTransitioning } = useTheme();

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {/* Layer 1: The Fast Lead */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-[var(--text-primary)] opacity-10"
              style={{ willChange: 'transform' }}
            />
            
            {/* Layer 2: The Main Reveal Curtain */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
              className="absolute inset-0 bg-[var(--bg-primary)] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex items-center justify-center border-l border-[var(--border-color)]"
              style={{ willChange: 'transform' }}
            >
               <motion.div 
                 initial={{ opacity: 0, letterSpacing: '2em' }}
                 animate={{ opacity: 0.1, letterSpacing: '0.5em' }}
                 exit={{ opacity: 0, letterSpacing: '2em' }}
                 transition={{ duration: 0.8 }}
                 className="font-display italic text-[15vw] text-[var(--text-primary)] select-none uppercase"
               >
                 Haus
               </motion.div>
            </motion.div>

            {/* Layer 3: The Trailing Glow */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="absolute inset-0 bg-[var(--text-primary)] opacity-[0.02]"
              style={{ willChange: 'transform' }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
