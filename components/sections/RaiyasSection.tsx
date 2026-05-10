'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import TextReveal from '@/components/TextReveal';
import LottieAnimation from '@/components/LottieAnimation';

const ParticleHero = dynamic(
  () => import('@/components/three/ParticleHero'),
  { ssr: false, loading: () => null }
);

export default function RaiyasSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const imgCupRef   = useRef<HTMLDivElement>(null);
  const imgIntRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    // Staggered entrance
    tl.fromTo(labelRef.current,
        { opacity: 0, y: 16, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
      )
      .fromTo([imgCupRef.current, imgIntRef.current],
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(tagRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(bodyRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3'
      );

    return () => { tl.kill(); };
  }, []);

  // ── Mouse-tracking Parallax ─────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      if (imgCupRef.current) {
        gsap.to(imgCupRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: 'power2.out'
        });
      }
      if (imgIntRef.current) {
        gsap.to(imgIntRef.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 2,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="raiyas"
      className="panel"
      style={{ background: 'radial-gradient(ellipse 140% 100% at 50% 120%, #4A0E17 0%, #31080E 50%, #1D0407 100%)', zIndex: 1 }}
    >
      <ParticleHero />

      {/* Floating Image: Cup */}
      <div 
        ref={imgCupRef}
        className="absolute left-[10%] top-[25%] z-20 hidden lg:block overflow-hidden rounded-sm border border-white/20 shadow-2xl transition-all duration-700 hover:scale-105"
        style={{ width: '240px', height: '300px', opacity: 0 }}
      >
        <Image 
          src="/images/raiyas-cup.jpg" 
          alt="Raiyas Coffee Cup" 
          fill 
          className="object-cover transition-all duration-1000 sepia-[0.2] hover:sepia-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Floating Image: Interior Detail */}
      <div 
        ref={imgIntRef}
        className="absolute right-[8%] bottom-[15%] z-20 hidden xl:block overflow-hidden rounded-sm border border-white/20 shadow-2xl transition-all duration-700 hover:scale-105"
        style={{ width: '380px', height: '240px', opacity: 0 }}
      >
        <Image 
          src="/images/raiyas-interior.jpg" 
          alt="Raiyas Interior" 
          fill 
          className="object-cover transition-all duration-1000 sepia-[0.2] hover:sepia-0"
        />
      </div>

      <div className="absolute inset-0 z-10" style={{
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, rgba(29,4,7,0.4) 80%)'
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 z-10"
        style={{ background: 'linear-gradient(to top, #1D0407 0%, transparent 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-1/4 z-10"
        style={{ background: 'linear-gradient(to bottom, #1D0407 0%, transparent 100%)' }} />

      {/* Lottie Animation in background */}
      <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 opacity-20 pointer-events-none mix-blend-screen z-0">
        <LottieAnimation animationUrl="https://assets2.lottiefiles.com/packages/lf20_q7uarxsb.json" className="w-[600px] h-[600px]" />
      </div>

      <div className="raiyas-parallax relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Label row */}
        <div ref={labelRef} className="inline-flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
          <span style={{ display: 'block', width: '48px', height: '1px', background: 'rgba(212,170,112,0.5)' }} />
          <span style={{
            fontSize: '10px',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(212,170,112,0.75)',
            fontWeight: 300,
          }}>
            Artisan Coffee &amp; Community
          </span>
          <span style={{ display: 'block', width: '48px', height: '1px', background: 'rgba(212,170,112,0.5)' }} />
        </div>

        {/* Wordmark */}
        <div ref={headRef} className="raiyas-header mb-6">
          <TextReveal 
            text="Raiyas"
            className="font-display"
            start="top 90%"
            delay={0.4}
          />
          <style jsx global>{`
            .raiyas-header .char {
              font-size: clamp(5rem, 16vw, 14rem);
              line-height: 0.88;
              letter-spacing: -0.025em;
              color: #F5ECD7;
              font-weight: 300;
            }
          `}</style>
        </div>

        {/* Italic tagline */}
        <p ref={tagRef} className="font-display" style={{
          opacity: 0,
          fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(212,170,112,0.88)',
          marginBottom: '1.25rem',
          letterSpacing: '0.02em',
        }}>
          Where every cup tells a story
        </p>

        {/* Body */}
        <p ref={bodyRef} style={{
          opacity: 0,
          fontSize: '0.82rem',
          letterSpacing: '0.06em',
          lineHeight: 1.85,
          color: 'rgba(245,236,215,0.5)',
          maxWidth: '380px',
          fontWeight: 300,
          marginBottom: '2.5rem',
        }}>
          A sanctuary of flavour nestled at the heart of the city. Artisan 
          coffee, seasonal menus, and a space designed to make you linger.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex items-center gap-6 mt-8">
          <Link href="/raiyas" className="group relative overflow-hidden" style={{
            padding: '1rem 3rem',
            border: '1px solid rgba(245,236,215,0.4)',
            fontSize: '11px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#F5ECD7',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.5s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,236,215,0.12)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,236,215,0.8)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(245,236,215,0.4)';
          }}>
            Explore Raiyas Experience
          </Link>
        </div>
      </div>

      {/* ── Corner brackets ─────────────────────────────────── */}
      {(['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'] as const).map((pos, i) => (
        <div key={i} className={`absolute ${pos} z-20`}>
          <div style={{
            width: 24, height: 24,
            borderTop:    i < 2 ? '1px solid rgba(212,170,112,0.25)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(212,170,112,0.25)' : 'none',
            borderLeft:   i % 2 === 0 ? '1px solid rgba(212,170,112,0.25)' : 'none',
            borderRight:  i % 2 === 1 ? '1px solid rgba(212,170,112,0.25)' : 'none',
          }} />
        </div>
      ))}

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 z-20 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', opacity: 0 }}>
        <span style={{ fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(212,170,112,0.4)' }}>
          Scroll
        </span>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(to bottom, rgba(212,170,112,0.5), transparent)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* ── Subtle golden horizon line ─────────────────────── */}
      <div className="absolute left-0 right-0 z-20" style={{
        bottom: '15%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,170,112,0.15), transparent)',
      }} />
    </section>
  );
}
