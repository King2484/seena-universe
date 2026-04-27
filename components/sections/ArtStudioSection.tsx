'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';
import Atmosphere from '@/components/Atmosphere';

export default function ArtStudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLParagraphElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const imgArtRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── SVG ink paths draw themselves ────────────────────────
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path, line, circle, ellipse');
        paths.forEach((el) => {
          const len = (el as SVGGeometryElement).getTotalLength?.() ?? 600;
          gsap.set(el, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 5%',
              toggleActions: 'play none none none',
            },
          });
        });
      }

      // ── Content cascades in ─────────────────────────────────
      const items = [labelRef.current, tagRef.current, bodyRef.current, ctaRef.current].filter(Boolean);
      gsap.fromTo(items,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 5%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Art Image Reveal ───────────────────────────────────
      if (imgArtRef.current) {
        gsap.fromTo(imgArtRef.current,
          { opacity: 0, scale: 0.8, filter: 'blur(20px)', rotate: -2 },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0,
            duration: 2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 5%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Mouse-tracking Parallax ─────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 50;
      const yPos = (clientY / window.innerHeight - 0.5) * 50;

      if (imgArtRef.current) {
        gsap.to(imgArtRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: 'power3.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="canvas"
      className="panel clip-hide"
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 80% 50%, #18100A 0%, #0D0B09 60%, #080604 100%)',
        zIndex: 3,
      }}
    >
      <Atmosphere type="ink" />

      {/* ── Ink-stroke SVG decoration ────────────────────────── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flowing ink curves */}
        <path
          d="M-80 500 C200 200, 500 600, 720 400 C940 200, 1200 550, 1520 380"
          stroke="rgba(212,170,112,0.18)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M150 800 C350 600, 550 700, 720 550 C890 400, 1050 650, 1300 500"
          stroke="rgba(196,147,90,0.1)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          d="M600 20 C620 180, 580 300, 660 420 C740 540, 700 700, 680 880"
          stroke="rgba(212,170,112,0.12)"
          strokeWidth="0.8"
          fill="none"
        />
        {/* Concentric ovals — like a canvas frame */}
        <ellipse cx="720" cy="450" rx="260" ry="180"
          stroke="rgba(212,170,112,0.07)" strokeWidth="0.6" fill="none" />
        <ellipse cx="720" cy="450" rx="380" ry="260"
          stroke="rgba(212,170,112,0.05)" strokeWidth="0.5" fill="none" />
        <ellipse cx="720" cy="450" rx="500" ry="340"
          stroke="rgba(212,170,112,0.04)" strokeWidth="0.4" fill="none" />
        {/* Accent mark top-right */}
        <path
          d="M1250 80 C1290 120, 1310 160, 1280 200"
          stroke="rgba(212,170,112,0.2)"
          strokeWidth="1"
          fill="none"
        />
        <line x1="1240" y1="60" x2="1300" y2="60"
          stroke="rgba(212,170,112,0.15)" strokeWidth="0.8" />
      </svg>

      {/* ── Brand Image: Art ─────────────────────────────────── */}
      <div 
        ref={imgArtRef}
        className="absolute right-[12%] top-[15%] z-0 hidden lg:block overflow-hidden rounded-md shadow-[0_0_80px_rgba(212,170,112,0.15)] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
        style={{ width: '450px', height: '550px', opacity: 0, border: '1px solid rgba(212,170,112,0.2)' }}
      >
        <Image 
          src="/images/canvas-art.jpg" 
          alt="Canvas Art Project" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Centred content ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        {/* Label */}
        <div ref={labelRef} className="inline-flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
          <span style={{ display: 'block', width: '48px', height: '1px', background: 'rgba(212,170,112,0.4)' }} />
          <span style={{
            fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'rgba(212,170,112,0.6)', fontWeight: 300,
          }}>
            Creative Space &amp; Gallery
          </span>
          <span style={{ display: 'block', width: '48px', height: '1px', background: 'rgba(212,170,112,0.4)' }} />
        </div>

        {/* Headline */}
        <div ref={headRef} className="canvas-header mb-6">
          <TextReveal 
            text="The"
            className="font-display"
            start="top 90%"
            delay={0.2}
          />
          <TextReveal 
            text="Canvas"
            className="font-display italic-char"
            start="top 90%"
            delay={0.3}
          />
          <style jsx global>{`
            .canvas-header .char {
              font-size: clamp(4.5rem, 13vw, 11rem);
              line-height: 0.88;
              letter-spacing: -0.025em;
              color: #F5ECD7;
              font-weight: 300;
            }
            .canvas-header .italic-char .char {
              color: #D4AA70;
              font-style: italic;
            }
          `}</style>
        </div>

        {/* Tagline */}
        <p ref={tagRef} className="font-display" style={{
          opacity: 0,
          fontSize: 'clamp(1rem, 1.9vw, 1.5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(212,170,112,0.65)',
          marginBottom: '1.25rem',
          letterSpacing: '0.02em',
        }}>
          Where creativity lives — and breathes
        </p>

        {/* Body */}
        <p ref={bodyRef} style={{
          opacity: 0,
          fontSize: '0.8rem',
          letterSpacing: '0.06em',
          lineHeight: 1.9,
          color: 'rgba(245,236,215,0.42)',
          maxWidth: '380px',
          fontWeight: 300,
          marginBottom: '2.5rem',
        }}>
          A curated creative space for artists, dreamers, and makers. 
          Workshops, exhibitions, and open studio sessions — arriving soon 
          to complete the universe.
        </p>

        {/* CTA + badge */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col items-center gap-6">
          <button
            style={{
              padding: '0.75rem 2.5rem',
              border: '1px solid rgba(212,170,112,0.35)',
              fontSize: '10px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#D4AA70',
              background: 'transparent',
              cursor: 'none',
              transition: 'all 0.5s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(212,170,112,0.1)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,170,112,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,170,112,0.35)';
            }}
          >
            Join the Waitlist
          </button>

          <div className="flex items-center gap-4">
            <div style={{ width: '48px', height: '1px', background: 'rgba(212,170,112,0.15)' }} />
            <span style={{
              fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(212,170,112,0.3)', fontWeight: 300,
            }}>
              Opening Soon
            </span>
            <div style={{ width: '48px', height: '1px', background: 'rgba(212,170,112,0.15)' }} />
          </div>
        </div>
      </div>

      {/* ── Corner gold dots ─────────────────────────────────── */}
      {['8px 8px', '8px auto 8px auto', 'auto 8px 8px auto', 'auto auto 8px 8px'].map((_, i) => {
        const pos = [
          { top: 32, left: 32 }, { top: 32, right: 32 },
          { bottom: 32, left: 32 }, { bottom: 32, right: 32 }
        ][i];
        return (
          <div key={i} className="absolute z-20" style={{ ...pos }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(212,170,112,0.35)' }} />
          </div>
        );
      })}

      {/* ── Footer brand row ─────────────────────────────────── */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-between px-16">
        <span style={{
          fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'rgba(212,170,112,0.25)',
        }}>
          Raiyas · Seena · Canvas
        </span>
        <span style={{
          fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
          color: 'rgba(212,170,112,0.25)',
        }}>
          One Universe
        </span>
      </div>
    </section>
  );
}
