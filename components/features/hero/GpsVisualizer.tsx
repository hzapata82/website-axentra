'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lottie from 'lottie-web';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GpsVisualizerProps {
  animationUrl: string;
  fallbackImage: string;
  altText: string;
}

export function GpsVisualizer({
  animationUrl,
  fallbackImage,
  altText,
}: GpsVisualizerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [showFallback, setShowFallback] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Try to load Lottie animation dynamically (only when not reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const loadLottie = async () => {
      try {
        Lottie.loadAnimation({
          container: document.getElementById('gps-animation')!,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: animationUrl,
        });
        setAnimationLoaded(true);
      } catch {
        setShowFallback(true);
      }
    };

    loadLottie();
  }, [animationUrl, prefersReducedMotion]);

  // Show fallback if reduced motion or animation failed
  const shouldShowFallback = prefersReducedMotion || showFallback;

  if (shouldShowFallback) {
    return (
      <Image
        src={fallbackImage}
        alt={altText}
        priority
        width={800}
        height={500}
        className="w-full h-auto max-h-[500px] object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    );
  }

  return (
    <div
      id="gps-animation"
      className="w-full h-auto max-h-[500px] relative"
      role="img"
      aria-label={altText}
    >
      {animationLoaded && (
        <div className="absolute inset-0" aria-hidden="true" />
      )}
      {!animationLoaded && !showFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy/10" aria-hidden="true">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-blue border-t-transparent" />
        </div>
      )}
    </div>
  );
}