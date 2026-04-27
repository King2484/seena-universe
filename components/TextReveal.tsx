'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  trigger?: HTMLElement | string | null;
  start?: string;
}

export default function TextReveal({ 
  text, 
  className = "", 
  delay = 0, 
  trigger, 
  start = "top 80%" 
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(chars, 
        { 
          y: 100,
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.02,
          delay: delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: trigger || containerRef.current,
            start: start,
            toggleActions: 'play none none none',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, trigger, start]);

  return (
    <div ref={containerRef} className={`${className} overflow-hidden flex flex-wrap justify-center`}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char inline-block" 
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
