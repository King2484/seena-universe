'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const columns = [
  {
    id: 'raiyas',
    title: 'Raiyas',
    subtitle: 'The Coffee Hub',
    image: '/images/raiyas-interior.jpg',
    logo: '/images/logo/logo1.jpeg',
    color: 'bg-raiyasBurgundy',
    href: '/raiyas'
  },
  {
    id: 'pilates',
    title: 'Pilates',
    subtitle: 'Reformer Studio',
    image: '/images/seena-reformer.jpg',
    logo: '/images/logo/logo2.jpeg',
    color: 'bg-pilatesSand',
    href: '/pilates'
  },
  {
    id: 'art',
    title: 'Art Studio',
    subtitle: 'Creative Space',
    image: '/images/canvas-art.jpg',
    logo: '/images/logo/logo3.jpeg',
    color: 'bg-artTerracotta',
    href: '/art'
  }
];

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <main className="h-[100dvh] w-full bg-[var(--bg-primary)] overflow-hidden flex flex-col relative text-[var(--text-primary)] font-sans transition-colors duration-700">

      {/* Optimized Header: Better spacing & Fluidity */}
      <header className="absolute top-0 w-full z-50 px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center pointer-events-none gap-6 md:gap-0">
        <div className="font-display italic text-3xl md:text-5xl lg:text-6xl tracking-widest uppercase text-[var(--text-primary)] px-2">
          455 Haus
        </div>
        
        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <nav className="flex gap-6 md:gap-12 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs font-bold text-[var(--text-primary)]">
            <Link href="/raiyas" className="hover:opacity-50 transition-all">Raiyas</Link>
            <Link href="/pilates" className="hover:opacity-50 transition-all">Pilates</Link>
            <Link href="/art" className="hover:opacity-50 transition-all">Art</Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* The Architectural Grid: Optimized for all screens */}
      <div className="flex-1 flex flex-col lg:flex-row w-full h-full pt-[160px] lg:pt-0">
        {columns.map((col, index) => {
          const isHovered = hoveredId === col.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== col.id;

          return (
            <motion.div
              key={col.id}
              className={`relative flex-1 border-b lg:border-b-0 lg:border-r border-[var(--border-color)] overflow-hidden cursor-pointer transition-all duration-[1200ms] ease-[0.16,1,0.3,1] ${isOtherHovered ? 'lg:flex-[0.7]' : isHovered ? 'lg:flex-[1.6]' : 'lg:flex-1'}`}
              onMouseEnter={() => setHoveredId(col.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ willChange: 'flex' }}
            >
              <Link href={col.href} className="absolute inset-0 z-30" />

              {/* Background Image: Fluid scaling */}
              <div className="absolute inset-0 z-0 origin-center overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: isHovered ? 1.05 : 1.15,
                    opacity: isHovered ? (theme === 'dark' ? 1 : 0.8) : (theme === 'dark' ? 0.4 : 0.2),
                    filter: theme === 'light' ? 'grayscale(0.5) contrast(0.8)' : 'grayscale(0) contrast(1.1)'
                  }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  <Image src={col.image} alt={col.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-[var(--bg-primary)] opacity-40 mix-blend-multiply transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent transition-colors duration-700" />
                </motion.div>
              </div>

              {/* Color Bloom: Optimized opacity */}
              <motion.div
                className={`absolute inset-0 z-10 ${col.color} mix-blend-color`}
                animate={{ opacity: isHovered ? (theme === 'dark' ? 0.6 : 0.2) : 0 }}
                transition={{ duration: 1 }}
                style={{ willChange: 'opacity' }}
              />

              {/* Content Grid: Refined padding & hierarchy */}
              <div className={`absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-12 lg:p-16 text-[var(--text-primary)] ${index === 0 ? 'lg:pt-48' : 'pt-6 lg:pt-48'}`}>

                {/* Top Details */}
                <div className="flex justify-between items-start h-16 md:h-20">
                  <span className="text-[10px] md:text-xs tracking-[0.8em] opacity-40 uppercase font-bold">0{index + 1}</span>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -10 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border border-[var(--border-color)] p-2 bg-[var(--bg-primary)] transition-colors duration-700 shadow-2xl"
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                           <Image src={col.logo} alt={`${col.title} Logo`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" sizes="120px" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Main Typography Group: Dramatic Scaling on Hover */}
                <motion.div 
                  animate={{ 
                    scale: isHovered ? 1.2 : isOtherHovered ? 0.85 : 1,
                    opacity: isHovered ? 1 : isOtherHovered ? 0.4 : 1,
                    y: isHovered ? -20 : 0
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3 lg:gap-6 origin-bottom-left"
                >
                  <h2 className="font-display italic text-[14vw] md:text-[7vw] lg:text-[4.5vw] xl:text-[5.5rem] tracking-tighter leading-[0.9] max-w-min">
                    {col.title}.
                  </h2>
                  
                  <div className="flex flex-col gap-2">
                    <motion.div
                      animate={{ 
                        opacity: isHovered ? 0 : isOtherHovered ? 0.2 : 0.6, 
                        height: isHovered ? 0 : 'auto' 
                      }}
                      className="overflow-hidden"
                    >
                      <span className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold">
                        {col.subtitle}
                      </span>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.4 }}
                          className={`text-[10px] md:text-xs tracking-[0.6em] uppercase overflow-hidden font-bold`}
                        >
                          <span className="inline-block mt-2 border-b border-[var(--text-primary)] pb-2 transition-colors duration-700">
                            Explore
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
