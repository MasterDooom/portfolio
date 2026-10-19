import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialize Lenis smooth scroll once per page mount.
 * Disabled when user prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    window.__portfolioLenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (window.__portfolioLenis === lenis) delete window.__portfolioLenis;
      lenis.destroy();
    };
  }, []);
}
