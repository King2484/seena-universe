'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';
import Atmosphere from '@/components/Atmosphere';

const STATS = [
  { value: '6',  label: 'Reformers'      },
  { value: '14', label: 'Classes / Week'  },
  { value: '45', label: 'Min Sessions'    },
  { value: '∞',  label: 'Transformations' },
];

export default function SeenaSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLParagraphElement>(null);
  const bodyRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const archRef     = useRef<HTMLDivElement>(null);
  const imgRef1     = useRef<HTMLDivElement>(null);
  const imgRef2     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Text content reveals ────────────────────────────────
      const contentItems = [labelRef.current, tagRef.current, bodyRef.current, ctaRef.current].filter(Boolean);
      gsap.fromTo(contentItems,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 10%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Image reveals ───────────────────────────────────────
      gsap.fromTo([imgRef1.current, imgRef2.current],
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1.8,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 10%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Stats count-up feel (stagger from right) ────────────
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(statItems,
          { opacity: 0, x: 30 },
          {
            opacity: 1, x: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 10%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Arches scale up from bottom ─────────────────────────
      const arches = archRef.current?.querySelectorAll('.arch-shape');
      if (arches) {
        gsap.fromTo(arches,
          { scaleY: 0, opacity: 0, transformOrigin: 'bottom center' },
          {
            scaleY: 1, opacity: 1,
            duration: 1.8,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 10%',
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
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      if (imgRef1.current) {
        gsap.to(imgRef1.current, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
      if (imgRef2.current) {
        gsap.to(imgRef2.current, {
          x: -xPos * 0.8,
          y: -yPos * 0.8,
          duration: 1.8,
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
      id="seena"
      className="panel clip-hide"
      style={{
        background: 'linear-gradient(135deg, #EDE0C4 0%, #F5ECD7 45%, #EAD9BE 100%)',
        zIndex: 2,
      }}
    >
      <Atmosphere type="zen" />
      {/* ── Botanical SVG top-left ──────────────────────────── */}
      <div className="absolute top-0 left-0 z-0 pointer-events-none" style={{ width: '320px', height: '280px', opacity: 0.18 }}>
        <svg viewBox="0 0 300 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 250 Q80 160 160 60" stroke="#2D4A2F" strokeWidth="1.5" fill="none"/>
          <path d="M10 250 Q70 180 120 90" stroke="#2D4A2F" strokeWidth="1" fill="none" opacity="0.6"/>
          <path d="M160 60 Q130 100 90 110" stroke="#2D4A2F" strokeWidth="1" fill="none"/>
          <path d="M160 60 Q185 105 155 135" stroke="#2D4A2F" strokeWidth="1" fill="none"/>
          <path d="M160 60 Q200 80 195 120" stroke="#2D4A2F" strokeWidth="0.8" fill="none"/>
          <ellipse cx="75" cy="130" rx="28" ry="13" transform="rotate(-50 75 130)" fill="#2D4A2F" opacity="0.25"/>
          <ellipse cx="110" cy="90" rx="22" ry="10" transform="rotate(-65 110 90)" fill="#2D4A2F" opacity="0.2"/>
          <ellipse cx="140" cy="110" rx="18" ry="9" transform="rotate(-40 140 110)" fill="#2D4A2F" opacity="0.15"/>
          <path d="M30 200 Q55 175 50 150" stroke="#2D4A2F" strokeWidth="0.8" fill="none" opacity="0.4"/>
          <ellipse cx="50" cy="148" rx="14" ry="7" transform="rotate(-55 50 148)" fill="#2D4A2F" opacity="0.15"/>
        </svg>
      </div>

      {/* ── Arched window motifs (right side, reflecting the renders) ── */}
      <div
        ref={archRef}
        className="absolute right-0 top-0 bottom-0 z-0 flex items-end justify-end gap-4 pr-8 overflow-hidden"
        style={{ paddingBottom: 0 }}
      >
        {[
          { w: 90,  h: '50vh', r: 45 },
          { w: 110, h: '62vh', r: 55 },
          { w: 130, h: '72vh', r: 65 },
          { w: 150, h: '80vh', r: 75 },
          { w: 120, h: '65vh', r: 60 },
        ].map((a, i) => (
          <div
            key={i}
            className="arch-shape flex-shrink-0"
            style={{
              width: `${a.w}px`,
              height: a.h,
              borderRadius: `${a.r}px ${a.r}px 0 0`,
              border: `1.5px solid rgba(196,147,90,${0.2 + i * 0.06})`,
              background: `rgba(196,147,90,${0.03 + i * 0.015})`,
            }}
          />
        ))}
      </div>

      {/* ── Brand Images ────────────────────────────────────── */}
      <div 
        ref={imgRef1}
        className="absolute left-[8%] top-[20%] z-10 hidden xl:block overflow-hidden rounded-sm border border-white/40 shadow-2xl transition-all duration-700 hover:scale-105"
        style={{ width: '260px', height: '340px', opacity: 0 }}
      >
        <Image 
          src="/images/seena-reformer.jpg" 
          alt="Seena Reformer" 
          fill 
          className="object-cover transition-all duration-1000 grayscale-[0.3] hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <div 
        ref={imgRef2}
        className="absolute right-[5%] bottom-[12%] z-10 hidden lg:block overflow-hidden rounded-sm border border-white/40 shadow-2xl transition-all duration-700 hover:scale-105"
        style={{ width: '320px', height: '220px', opacity: 0 }}
      >
        <Image 
          src="/images/seena-interior.jpg" 
          alt="Seena Interior" 
          fill 
          className="object-cover transition-all duration-1000 grayscale-[0.3] hover:grayscale-0"
        />
      </div>

      {/* ── Left content column ─────────────────────────────── */}
      <div className="relative z-10 flex h-full">
        <div className="flex flex-col justify-center pl-16 md:pl-24 lg:pl-32 pr-8 max-w-xl">

          {/* Label */}
          <div ref={labelRef} className="flex items-center gap-4 mb-8" style={{ opacity: 0 }}>
            <span style={{ display: 'block', width: '40px', height: '1px', background: 'rgba(196,147,90,0.6)' }} />
            <span style={{
              fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(139,94,60,0.8)', fontWeight: 300,
            }}>
              Reformer Pilates Studio
            </span>
          </div>

          {/* Headline */}
          <div ref={headRef} className="seena-header mb-5">
            <TextReveal 
              text="Seena"
              className="font-display"
              start="top 90%"
              delay={0.2}
            />
            <TextReveal 
              text="Studios"
              className="font-display italic-char"
              start="top 90%"
              delay={0.3}
            />
            <style jsx global>{`
              .seena-header .char {
                font-size: clamp(3.8rem, 10vw, 8rem);
                line-height: 0.9;
                letter-spacing: -0.025em;
                color: #2C2016;
                font-weight: 300;
              }
              .seena-header .italic-char .char {
                color: #C4935A;
                font-style: italic;
              }
            `}</style>
          </div>

          {/* Tagline */}
          <p ref={tagRef} className="font-display" style={{
            opacity: 0,
            fontSize: 'clamp(1rem, 1.8vw, 1.4rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#8B5E3C',
            marginBottom: '1.1rem',
            letterSpacing: '0.02em',
          }}>
            Move with intention. Breathe with purpose.
          </p>

          {/* Body */}
          <p ref={bodyRef} style={{
            opacity: 0,
            fontSize: '0.8rem',
            letterSpacing: '0.055em',
            lineHeight: 1.9,
            color: 'rgba(44,32,22,0.6)',
            maxWidth: '360px',
            fontWeight: 300,
            marginBottom: '2.25rem',
          }}>
            A boutique reformer Pilates studio where movement becomes 
            meditation. Every session is designed to transform both 
            body and mind in a space crafted for your wellbeing.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ opacity: 0 }} className="flex items-center gap-6">
            <button
              style={{
                padding: '0.75rem 2.25rem',
                background: '#2C2016',
                color: '#EDE0C4',
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'none',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#C4935A';
                (e.currentTarget as HTMLButtonElement).style.color = '#FAF6F0';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#2C2016';
                (e.currentTarget as HTMLButtonElement).style.color = '#EDE0C4';
              }}
            >
              Book a Class
            </button>
            <button style={{
              fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'rgba(139,94,60,0.6)', background: 'none', border: 'none', cursor: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8B5E3C'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(139,94,60,0.6)'; }}
            >
              View Schedule →
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats column (bottom-right) ──────────────────────── */}
      <div ref={statsRef} className="absolute right-16 bottom-20 z-10 flex flex-col gap-7">
        {STATS.map(stat => (
          <div key={stat.label} className="stat-item text-right" style={{ opacity: 0 }}>
            <div className="font-display" style={{
              fontSize: '3rem', lineHeight: 1, color: '#C4935A', fontWeight: 300,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'rgba(139,94,60,0.6)', marginTop: '4px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Divider line ─────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(196,147,90,0.3), transparent)',
      }} />

      {/* ── Oak texture strip on left edge ───────────────────── */}
      <div className="absolute top-0 left-0 bottom-0 z-0" style={{
        width: '6px',
        background: 'linear-gradient(to right, rgba(196,147,90,0.4), transparent)',
      }} />
    </section>
  );
}
