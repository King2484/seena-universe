'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Use dynamic import with ssr: false for lottie-react
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps {
  animationUrl: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({ animationUrl, className = '', loop = true, autoplay = true }: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);
  
  useEffect(() => {
    fetch(animationUrl)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load Lottie:", err));
  }, [animationUrl]);

  if (!animationData) {
    return <div className={`animate-pulse bg-white/5 ${className}`} />;
  }

  return (
    <div className={className}>
      <Lottie 
        animationData={animationData} 
        loop={loop} 
        autoplay={autoplay}
      />
    </div>
  );
}
