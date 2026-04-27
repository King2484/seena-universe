'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Force visibility immediately
    gsap.set([dot, ring], { opacity: 1, display: 'block' });

    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(dot, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.1,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(ring, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#D4AA70',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          border: '1px solid white',
          boxShadow: '0 0 15px #D4AA70, 0 0 5px white',
          opacity: 1,
          display: 'block',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #D4AA70',
          pointerEvents: 'none',
          zIndex: 999998,
          mixBlendMode: 'difference',
          opacity: 1,
          display: 'block',
          boxShadow: '0 0 10px rgba(212,170,112,0.3)',
        }}
      />
    </>
  );
}
