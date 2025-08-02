"use client";
import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Add class to html for CSS targeting
    document.documentElement.classList.add('lenis');

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  }, []);

  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return { scrollTo, stop, start, lenis: lenisRef.current };
};

export default useLenis;
