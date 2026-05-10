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

export default function PilatesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans min-h-screen transition-colors duration-700 overflow-x-hidden">
      
      {/* Navigation: Responsive Spacing */}
      <header className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center pointer-events-none gap-4 md:gap-0">
        <Link href="/" className="pointer-events-auto hover:opacity-50 transition-all uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center gap-4 font-bold text-[var(--text-primary)]">
          <span className="text-lg leading-none">←</span> Haus
        </Link>
        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <div className="uppercase tracking-[0.4em] text-[10px] md:text-xs opacity-60 font-bold text-[var(--text-primary)]">Chapter II — Pilates</div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero: Fluid Typography */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-pitchBlack text-boneWhite">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image src="/images/seena-reformer.jpg" alt="Reformer Studio" fill className={`object-cover ${theme === 'light' ? 'grayscale-[0.4] opacity-70' : 'grayscale-0 opacity-100'}`} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-pitchBlack via-transparent to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 md:pb-24 z-10 pointer-events-none pt-[140px]">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-6 max-w-6xl">
            <motion.div variants={fadeUp} className="w-16 h-16 md:w-24 md:h-24 relative opacity-100 bg-white/10 rounded-full p-2 backdrop-blur-sm">
              <Image src="/images/logo/logo2.jpeg" alt="Pilates Logo" fill className="object-cover rounded-full grayscale" />
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display italic text-[14vw] md:text-[9vw] lg:text-[7vw] xl:text-[8rem] leading-[0.85] tracking-tighter">
              Reformer Studio.
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex gap-4 md:gap-8 items-center mt-4 flex-wrap">
              <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-70 font-bold">Est. 2026</span>
              <div className="w-8 md:w-12 h-[2px] bg-boneWhite/30" />
              <span className="font-display italic text-xl md:text-3xl opacity-100">Where movement becomes meditation.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Schedule: Optimized List Layout */}
      <section className="relative z-20 bg-[var(--bg-primary)] w-full transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 lg:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
          
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-48 flex flex-col gap-8 md:gap-12">
              <h2 className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-40 border-b border-[var(--border-color)] pb-6 font-bold">Chapter II</h2>
              <h3 className="font-display italic text-5xl md:text-7xl lg:text-8xl">The Schedule</h3>
              <p className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed opacity-80 max-w-sm">
                Transform both body and mind in a space crafted for your absolute wellbeing. 14 classes per week.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-0">
            {[
              { time: '06:00 — 06:45', slots: 5, label: 'Dawn' },
              { time: '07:15 — 08:00', slots: 5, label: 'Morning' },
              { time: '08:30 — 09:15', slots: 5, label: 'Morning' },
              { time: '09:30 — 10:15', slots: 5, label: 'Mid-Morning' },
            ].map((session, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group flex flex-col md:flex-row md:items-center justify-between border-t border-[var(--border-color)] py-10 lg:py-16 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[var(--accent-subtle)] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 lg:gap-24 relative z-10">
                  <span className="uppercase tracking-[0.4em] text-[10px] md:text-xs opacity-40 group-hover:opacity-100 font-bold w-24">{session.label}</span>
                  <div className="font-display text-4xl md:text-6xl lg:text-8xl opacity-80 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700 ease-[0.16,1,0.3,1]">{session.time}</div>
                </div>
                <div className="flex items-center gap-8 md:gap-12 mt-8 md:mt-0 relative z-10">
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40 font-bold">{session.slots} Slots</span>
                  <button className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold border-b border-transparent group-hover:border-[var(--text-primary)] pb-2 transition-all duration-500">Reserve</button>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-[var(--border-color)]" />
          </div>
        </div>

        {/* Private Hire: Refined Typography */}
        <div className={`w-full relative py-32 md:py-48 overflow-hidden transition-colors duration-700 ${theme === 'light' ? 'bg-[var(--bg-primary)]' : 'bg-pitchBlack'}`}>
          <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen">
            <Image src="/images/seena-reformer.jpg" alt="Pilates Background" fill className="object-cover grayscale" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-12">
            <h2 className={`font-display italic text-6xl md:text-8xl lg:text-9xl ${theme === 'light' ? 'text-[var(--text-primary)]' : 'text-boneWhite'}`}>Private 1-on-1</h2>
            <p className={`font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-2xl ${theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-boneWhite/90'}`}>
              Personalised reformer sessions tailored to your body's specific needs and goals.
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
