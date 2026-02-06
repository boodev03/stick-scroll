import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import StickyGallery from './components/StickyGallery';
import FeatureShowcase from './components/FeatureShowcase';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    document.body.style.height = isLoading ? '100vh' : '';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isLoading]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.1,
      lerp: 0.08,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      autoResize: true,
      anchors: true,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          bottom: window.innerHeight,
          right: window.innerWidth,
        };
      },
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {isLoading && (
        <PageLoader
          minDuration={1600}
          onComplete={() => setIsLoading(false)}
        />
      )}
      <div
        ref={containerRef}
        className="relative w-full"
        aria-hidden={isLoading}
      >
        <Header />
        <main>
          <Hero />
          <StickyGallery />
          <FeatureShowcase />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default App;
