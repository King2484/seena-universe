'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fake progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            if (screenRef.current) screenRef.current.style.display = 'none';
          }
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.in'
        })
        .to(screenRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.2,
          ease: 'expo.inOut'
        });
      });

      return () => ctx.revert();
    }
  }, [progress]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2C2016]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div ref={textRef} className="flex flex-col items-center gap-6 text-center">
        {/* Animated rings */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border border-[#D4AA70]/20 rounded-full" />
          <div 
            className="absolute inset-0 border-t border-[#D4AA70] rounded-full" 
            style={{ 
              transform: `rotate(${progress * 3.6}deg)`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} 
          />
        </div>

        <div className="overflow-hidden">
          <h2 className="font-display text-4xl text-[#F5ECD7] flex gap-3 italic">
            <span>Seena</span>
            <span className="text-[#D4AA70]">Universe</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-48 h-[1px] bg-[#D4AA70]/10 overflow-hidden relative">
            <div 
              className="absolute inset-0 bg-[#D4AA70] origin-left" 
              style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 0.4s ease' }} 
            />
          </div>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AA70]/60">
            Initialising Spaces {progress}%
          </span>
        </div>
      </div>

      <style jsx>{`
        h2 span {
          display: inline-block;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
