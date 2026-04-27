'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import RaiyasSection from '@/components/sections/RaiyasSection';
import SeenaSection from '@/components/sections/SeenaSection';
import ArtStudioSection from '@/components/sections/ArtStudioSection';

// Custom cursor — client only
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false });

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── Lenis smooth scroll ─────────────────────────────────
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Sync Lenis → ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── ScrollTrigger context ───────────────────────────────
    const ctx = gsap.context(() => {
      const vh = window.innerHeight;

      // ── SEENA SECTION REVEAL ────────────────────────────────
      // Circular/Arch expansion from the bottom center
      gsap.fromTo('#seena',
        { clipPath: 'circle(0% at 50% 100%)' },
        {
          clipPath: 'circle(150% at 50% 100%)',
          ease: 'none', // scrub handles the feel
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: `${vh * 0.9}px top`,
            end:   `${vh * 1.7}px top`,
            scrub: 1.2,
          },
        }
      );

      // ── CANVAS SECTION REVEAL ───────────────────────────────
      // Organic expansion from top-right
      gsap.fromTo('#canvas',
        { clipPath: 'circle(0% at 100% 0%)' },
        {
          clipPath: 'circle(150% at 100% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: `${vh * 2.3}px top`,
            end:   `${vh * 3.1}px top`,
            scrub: 1.2,
          },
        }
      );

      // ── RAIYAS PARALLAX (text drifts up as Seena comes in) ──
      gsap.to('.raiyas-parallax', {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: '0 top',
          end:   `${vh * 1.75}px top`,
          scrub: 2,
        },
      });

      // ── SEENA PARALLAX (text drifts as Canvas comes in) ─────
      gsap.to('#seena .relative.z-10', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `${vh * 1.75}px top`,
          end:   `${vh * 3.25}px top`,
          scrub: 2,
        },
      });

      // ── SUBTLE SCALE on outgoing sections (depth feel) ──────
      gsap.to('#raiyas', {
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `${vh * 0.9}px top`,
          end:   `${vh * 1.75}px top`,
          scrub: 1.5,
        },
      });

      gsap.to('#seena', {
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `${vh * 2.4}px top`,
          end:   `${vh * 3.25}px top`,
          scrub: 1.5,
        },
      });

    }, wrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <Navigation />

      {/*
        ── Scroll wrapper: provides the total scrollable height.
           400vh = breathing room for 3 sections + 2 transitions.
        ─────────────────────────────────────────────────────────
        Structure:
          [0 → 100vh]   Raiyas is pinned and visible
          [100 → 175vh] Seena slides up to cover Raiyas
          [175 → 250vh] Seena is fully visible, user reads it
          [250 → 325vh] Canvas slides up to cover Seena
          [325 → 400vh] Canvas is fully visible, user reads it
      */}
      <div
        id="scroll-wrapper"
        ref={wrapperRef}
        style={{ height: '480vh', position: 'relative' }}
      >
        {/*
          Sticky container: stays pinned to the top of the viewport
          while the wrapper scrolls behind it. All three sections
          live inside here as absolutely-positioned full-height panels.
        */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}>
          <RaiyasSection />
          <SeenaSection  />
          <ArtStudioSection />
        </div>
      </div>

      <Cursor />
    </>
  );
}
