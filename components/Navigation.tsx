'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SECTIONS = ['raiyas', 'seena', 'canvas'] as const;
const LABELS   = ['Raiyas', 'Pilates', 'Art Studio'] as const;

const NAV_THEMES = [
  { text: 'rgba(245,236,215,0.85)', dot: '#D4AA70', dotDim: 'rgba(245,236,215,0.15)' }, // Raiyas (Burgundy BG) -> Cream Text
  { text: '#4A0E17',                 dot: '#4A0E17', dotDim: 'rgba(74,14,23,0.15)'   }, // Pilates (Cream BG) -> Burgundy Text
  { text: '#E86A33',                 dot: '#E86A33', dotDim: 'rgba(232,106,51,0.15)' }, // Art Studio (Cream BG) -> Orange Text
];

export default function Navigation() {
  const navRef    = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const theme = NAV_THEMES[active];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    
    const vh = window.innerHeight;
    const targetMap: Record<string, number> = {
      'raiyas': vh * 1.7,
      'seena': vh * 3.2,
      'canvas': vh * 4.7,
    };
    
    window.scrollTo({ top: targetMap[id], behavior: 'smooth' });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, delay: 2, ease: 'power4.out' }
    );

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);

      const vh = window.innerHeight;
      let newActive = 0;
      if      (scrollTop < vh * 2.5)  newActive = 0;
      else if (scrollTop < vh * 4.0)  newActive = 1;
      else                           newActive = 2;
      
      if (newActive !== active) {
        setActive(newActive);
        document.documentElement.style.setProperty('--gold', NAV_THEMES[newActive].dot);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  // Menu Animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power4.inOut'
      });
      gsap.fromTo('.menu-link', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-10 md:px-16 py-8"
        style={{ opacity: 0 }}
      >
        {/* ── Brand ──────────────────────────────────────────── */}
        <div
          className="font-display cursor-none select-none text-xl"
          style={{
            letterSpacing: '0.25em',
            fontWeight: 400,
            color: isOpen ? '#FAF6F0' : theme.text,
            transition: 'color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1001,
          }}
          onClick={() => {
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          455 HAUS
        </div>

        {/* ── Dot navigation ────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((id, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group flex flex-col items-center gap-2 cursor-none"
            >
              <span style={{
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: theme.text,
                opacity: active === i ? 1 : 0.2,
                transform: active === i ? 'translateY(0)' : 'translateY(4px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 400,
              }}>
                {LABELS[i]}
              </span>
              <div style={{
                width: active === i ? 30 : 4,
                height: 2,
                background: active === i ? theme.dot : theme.dotDim,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </button>
          ))}
        </div>

        {/* ── Menu button ───────────────────────────────────── */}
        <button
          className="cursor-none flex flex-col gap-[7px] items-end group relative z-[1001] w-10 h-10 justify-center"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span style={{
            display: 'block',
            width: 28,
            height: '1.5px',
            background: isOpen ? '#FAF6F0' : theme.text,
            transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center',
          }} />
          <span style={{
            display: 'block',
            width: isOpen ? 28 : 18,
            height: '1.5px',
            background: isOpen ? '#FAF6F0' : theme.text,
            transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center',
          }} />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ────────────────────────────── */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0E0B08]"
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {SECTIONS.map((id, i) => (
            <button
              key={id}
              className="menu-link font-display text-4xl md:text-6xl text-[#FAF6F0] hover:text-[#D4AA70] transition-colors duration-300"
              onClick={() => scrollTo(id)}
              style={{ fontWeight: 300, letterSpacing: '0.1em' }}
            >
              {LABELS[i]}
            </button>
          ))}
          <div className="w-12 h-[1px] bg-white/10 my-4" />
          <button className="menu-link text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors cursor-none">Our Story</button>
          <button className="menu-link text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors cursor-none">Locations</button>
          <button className="menu-link text-[10px] tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors cursor-none">Contact</button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-12 opacity-20">
          <span className="text-[9px] tracking-[0.5em] uppercase text-white">Instagram</span>
          <span className="text-[9px] tracking-[0.5em] uppercase text-white">Twitter</span>
        </div>
      </div>

      {/* ── Vertical Progress Indicator ────────────────────── */}
      <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 h-32 transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-[1px] h-full relative" style={{ background: theme.dotDim, transition: 'background 0.8s ease' }}>
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-current origin-top"
            style={{ 
              height: '100%', 
              transform: `scaleY(${scrollProgress})`, 
              color: theme.dot,
              transition: 'transform 0.1s linear, color 0.8s ease' 
            }}
          />
        </div>
        <span className="font-display italic text-[10px]" style={{ color: theme.text, opacity: 0.5, transition: 'color 0.8s ease' }}>
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </>
  );
}
