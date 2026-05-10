'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function RaiyasPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans min-h-screen transition-colors duration-700 overflow-x-hidden">
      
      {/* Navigation: Responsive Spacing */}
      <header className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center pointer-events-none gap-4 md:gap-0">
        <Link href="/" className="pointer-events-auto hover:opacity-50 transition-all uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center gap-4 font-bold text-[var(--text-primary)]">
          <span className="text-lg leading-none">←</span> Haus
        </Link>
        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <div className="uppercase tracking-[0.4em] text-[10px] md:text-xs opacity-60 font-bold text-[var(--text-primary)]">Chapter I — Raiyas</div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero: Fluid Typography */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-pitchBlack text-boneWhite">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image src="/images/raiyas-interior.jpg" alt="Raiyas Interior" fill className={`object-cover ${theme === 'light' ? 'grayscale-[0.3] contrast-[0.9]' : 'grayscale-0 contrast-[1.1]'}`} priority />
          <div className="absolute inset-0 bg-pitchBlack/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-pitchBlack via-pitchBlack/20 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 md:pb-24 z-10 pt-[140px]">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-6 max-w-6xl">
            <motion.div variants={fadeUp} className="w-16 h-16 md:w-24 md:h-24 relative opacity-100 bg-white/10 rounded-full p-2 backdrop-blur-sm">
              <Image src="/images/logo/logo1.jpeg" alt="Raiyas Logo" fill className="object-cover rounded-full grayscale" />
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display italic text-[14vw] md:text-[9vw] lg:text-[7vw] xl:text-[8rem] leading-[0.85] tracking-tighter">
              The Coffee Hub.
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex gap-4 md:gap-8 items-center mt-4 flex-wrap">
              <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-70 font-bold">Est. 2026</span>
              <div className="w-8 md:w-12 h-[2px] bg-boneWhite/30" />
              <span className="font-display italic text-xl md:text-3xl opacity-100">Dark chocolate & plum roasts.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content: Optimized Grids */}
      <section className="relative z-20 bg-[var(--bg-primary)] w-full transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 lg:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-48 flex flex-col gap-6 md:gap-12">
              <h2 className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-40 border-b border-[var(--border-color)] pb-6 font-bold">Chapter I</h2>
              <h3 className="font-display italic text-5xl md:text-7xl lg:text-8xl">The Roast</h3>
              <p className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed opacity-80 max-w-sm">
                A sanctuary of flavour. Artisanal baking and an atmosphere meticulously crafted for the intimate.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            {[
              { name: 'Haus Espresso', desc: 'Single origin, dark chocolate & plum', price: '£3.5' },
              { name: 'Velvet Flat White', desc: 'Double ristretto, micro-textured milk', price: '£4.2' },
              { name: 'Rose Matcha', desc: 'Ceremonial grade matcha, rose petal', price: '£5.5' },
              { name: 'Pour Over', desc: 'Rotating guest roasters', price: '£6.0' }
            ].map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-baseline justify-between border-b border-[var(--border-color)] pb-8 pt-4 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-raiyasBurgundy opacity-0 group-hover:opacity-10 transition-all duration-700" />
                <div className="flex flex-col gap-2 relative z-10">
                  <h4 className="font-display italic text-3xl md:text-5xl lg:text-6xl group-hover:text-raiyasBurgundy transition-colors duration-500">{item.name}</h4>
                  <p className="uppercase tracking-[0.2em] text-[10px] opacity-50 group-hover:opacity-100 font-bold">{item.desc}</p>
                </div>
                <div className="relative z-10 mt-4 md:mt-0 font-sans text-lg tracking-widest opacity-60 font-bold">{item.price}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Venue Hire: Refined Typography */}
        <div className={`w-full relative py-32 md:py-48 overflow-hidden transition-colors duration-700 ${theme === 'light' ? 'bg-[var(--bg-primary)]' : 'bg-raiyasBurgundy'}`}>
          <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply">
            <Image src="/images/raiyas-interior.jpg" alt="Raiyas Venue" fill className="object-cover grayscale" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-12">
            <h2 className={`font-display italic text-6xl md:text-8xl lg:text-9xl ${theme === 'light' ? 'text-[var(--text-primary)]' : 'text-boneWhite'}`}>Private Hire</h2>
            <p className={`font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-2xl ${theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-boneWhite/90'}`}>
              Host your private event or intimate gathering in our beautifully designed space.
            </p>
            
            <form className="flex flex-col gap-8 w-full max-w-lg mt-8">
              <input type="text" placeholder="Your Name" className="w-full bg-[var(--input-bg)] border-b border-[var(--border-color)] py-5 text-center text-[10px] md:text-xs uppercase tracking-widest focus:outline-none focus:border-[var(--text-primary)] transition-all placeholder:text-[var(--input-placeholder)] font-bold text-[var(--text-primary)]" />
              <input type="email" placeholder="Email Address" className="w-full bg-[var(--input-bg)] border-b border-[var(--border-color)] py-5 text-center text-[10px] md:text-xs uppercase tracking-widest focus:outline-none focus:border-[var(--text-primary)] transition-all placeholder:text-[var(--input-placeholder)] font-bold text-[var(--text-primary)]" />
              <button type="button" className="uppercase tracking-[0.5em] text-[10px] md:text-xs mt-8 font-bold border border-[var(--border-color)] px-10 py-5 hover:border-[var(--text-primary)] rounded-full transition-all text-[var(--text-primary)]">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
