'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsClickable(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--text-primary)] pointer-events-none z-[9999] mix-blend-difference items-center justify-center hidden lg:flex"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        scale: isClickable ? 2.5 : 1,
        backgroundColor: isClickable ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
      }}
    >
       {isClickable && (
         <motion.span 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-[4px] uppercase font-bold tracking-widest text-black"
         >
           View
         </motion.span>
       )}
    </motion.div>
  );
}
