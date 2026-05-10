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

export default function ArtStudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main ref={containerRef} className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans min-h-screen transition-colors duration-700 overflow-x-hidden selection:bg-artTerracotta selection:text-white">
      
      {/* Navigation: Responsive Spacing */}
      <header className="fixed top-0 w-full z-50 px-6 md:px-12 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center pointer-events-none gap-4 md:gap-0">
        <Link href="/" className="pointer-events-auto hover:opacity-50 transition-all uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center gap-4 font-bold text-[var(--text-primary)]">
          <span className="text-lg leading-none">←</span> Haus
        </Link>
        <div className="flex items-center gap-6 md:gap-12 pointer-events-auto">
          <div className="uppercase tracking-[0.4em] text-[10px] md:text-xs opacity-60 font-bold text-[var(--text-primary)]">Chapter III — Art Studio</div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero: Fluid Typography */}
      <section className="relative w-full h-[100dvh] overflow-hidden bg-pitchBlack text-boneWhite">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <Image src="/images/canvas-art.jpg" alt="Canvas Painting" fill className={`object-cover ${theme === 'light' ? 'grayscale-[0.5] opacity-60' : 'grayscale-0 opacity-100'}`} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-pitchBlack via-transparent to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 md:pb-24 z-10 pointer-events-none pt-[140px]">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="flex flex-col gap-6 max-w-6xl">
            <motion.div variants={fadeUp} className="w-16 h-16 md:w-24 md:h-24 relative opacity-100 bg-white/10 rounded-full p-2 backdrop-blur-sm">
              <Image src="/images/logo/logo3.jpeg" alt="Art Studio Logo" fill className="object-cover rounded-full grayscale" />
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display italic text-[14vw] md:text-[9vw] lg:text-[7vw] xl:text-[8rem] leading-[0.85] tracking-tighter">
              Creative Space.
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex gap-4 md:gap-8 items-center mt-4 flex-wrap">
              <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-70 font-bold">Est. 2026</span>
              <div className="w-8 md:w-12 h-[2px] bg-boneWhite/30" />
              <span className="font-display italic text-xl md:text-3xl opacity-100">Where creativity lives and breathes.</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content: Optimized Asymmetrical Schedule */}
      <section className="relative z-20 bg-[var(--bg-primary)] w-full transition-colors duration-700">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 lg:py-48 flex flex-col gap-32 lg:gap-48">
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 lg:gap-32">
            <div className="flex flex-col gap-8 max-w-xl">
              <h2 className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-40 border-b border-[var(--border-color)] pb-6 font-bold">Chapter III</h2>
              <h3 className="font-display italic text-5xl md:text-7xl lg:text-8xl leading-tight">The Exhibition.</h3>
              <p className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed opacity-80">
                Join our open studio sessions and discover your inner canvas. An unbound space for raw expression.
              </p>
            </div>
            
            <div className="w-full lg:w-[45%] relative aspect-square lg:aspect-[4/5] bg-pitchBlack text-boneWhite p-10 md:p-14 flex flex-col justify-between overflow-hidden group rounded-sm shadow-2xl">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <Image src="/images/canvas-art.jpg" alt="Canvas Texture" fill className="object-cover grayscale" />
              </div>
              <div className="relative z-10 flex flex-col gap-4">
                <h4 className="uppercase tracking-[0.3em] text-[10px] opacity-40 border-b border-white/20 pb-6 font-bold">01 — Free Paint</h4>
                <div className="font-display italic text-5xl md:text-7xl text-artTerracotta mt-4">Mon — Sun</div>
                <div className="font-sans text-xl md:text-2xl tracking-widest uppercase opacity-90 font-bold">20:00 — 23:00</div>
              </div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mt-12">
                <div className="flex flex-col text-[10px] uppercase tracking-[0.3em] opacity-60 gap-2 font-bold">
                  <span>18 Slots Available</span>
                  <span className="text-artTerracotta">£12 Entry Fee</span>
                </div>
                <button className="uppercase tracking-[0.4em] text-[10px] md:text-xs border-b-2 border-artTerracotta text-artTerracotta pb-2 font-bold hover:tracking-[0.6em] transition-all">
                  Reserve
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 pt-24 border-t border-[var(--border-color)]">
            <div className="lg:w-1/4">
               <h3 className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-40 font-bold">Guided Sessions</h3>
            </div>
            <div className="lg:w-3/4 flex flex-col gap-24 md:gap-32">
              {[
                { day: 'Wednesdays', times: ['18:00 — 19:15', '19:45 — 21:00'] },
                { day: 'Fri, Sat, Sun', times: ['11:00 — 12:15', '12:45 — 14:00', '18:00 — 19:15'] }
              ].map((group) => (
                <div key={group.day} className="flex flex-col gap-10">
                  <h4 className="font-display italic text-5xl md:text-7xl lg:text-8xl">{group.day}</h4>
                  <div className="flex flex-col gap-4">
                    {group.times.map(time => (
                      <div key={time} className="flex flex-col md:flex-row md:items-center justify-between group border-b border-[var(--border-color)] pb-8 pt-4 cursor-pointer relative overflow-hidden transition-all">
                        <div className="absolute inset-0 bg-artTerracotta/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700" />
                        <span className="font-sans text-xl md:text-2xl tracking-widest uppercase opacity-70 group-hover:opacity-100 group-hover:text-artTerracotta transition-all font-bold relative z-10">{time}</span>
                        <button className="uppercase tracking-[0.3em] text-[10px] md:text-xs opacity-40 md:opacity-0 md:group-hover:opacity-100 transition-all font-bold relative z-10">Book Session</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Studio Hire: Refined Typography */}
        <div className={`w-full relative py-32 md:py-48 overflow-hidden transition-colors duration-700 ${theme === 'light' ? 'bg-[var(--bg-primary)]' : 'bg-artTerracotta'}`}>
          <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply">
            <Image src="/images/canvas-art.jpg" alt="Art Venue" fill className="object-cover grayscale" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-12">
            <h2 className={`font-display italic text-6xl md:text-8xl lg:text-9xl ${theme === 'light' ? 'text-[var(--text-primary)]' : 'text-boneWhite'}`}>Studio Hire</h2>
            <p className={`font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed max-w-2xl ${theme === 'light' ? 'text-[var(--text-secondary)]' : 'text-boneWhite/90'}`}>
              Request a private session or exhibition space for your creative projects.
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
