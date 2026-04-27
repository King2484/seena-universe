'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Noise() {
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle animation for the noise to make it feel alive
    const ctx = gsap.context(() => {
      gsap.to(noiseRef.current, {
        x: '+=10',
        y: '+=10',
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    }, noiseRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={noiseRef}
      className="pointer-events-none fixed -inset-[200%] z-[9999] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
