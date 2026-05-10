'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';
import Atmosphere from '@/components/Atmosphere';
import LottieAnimation from '@/components/LottieAnimation';

export default function HausSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(tagRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="haus"
      className="panel"
      style={{ background: '#000000', zIndex: 1 }}
    >
      <Atmosphere type="zen" />

      <div className="haus-parallax relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">

        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none mix-blend-screen">
          <LottieAnimation animationUrl="https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json" className="w-[800px] h-[800px]" />
        </div>

        {/* Wordmark */}
        <div ref={headRef} className="haus-header mb-6 relative z-10 flex flex-col md:flex-row items-center gap-4">
          <TextReveal 
            text="455"
            className="font-display italic opacity-80"
            start="top 90%"
            delay={0.4}
          />
          <TextReveal 
            text="HAUS"
            className="font-display"
            start="top 90%"
            delay={0.6}
          />
          <style jsx global>{`
            .haus-header .char {
              font-size: clamp(5rem, 15vw, 13rem);
              line-height: 0.88;
              letter-spacing: 0.02em;
              color: #F5ECD7;
              font-weight: 300;
              text-transform: uppercase;
            }
          `}</style>
        </div>

        {/* Italic tagline */}
        <p ref={tagRef} className="font-display" style={{
          opacity: 0,
          fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(245,236,215,0.7)',
          marginBottom: '1.25rem',
          letterSpacing: '0.02em',
        }}>
          One Universe. Multiple Experiences.
        </p>

      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 z-20 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', opacity: 0 }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(245,236,215,0.4)' }}>
          Explore
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(245,236,215,0.5), transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
