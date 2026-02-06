
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import StickyGallery from './components/StickyGallery';
import FeatureShowcase from './components/FeatureShowcase';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll normalization (optional enhancement for GSAP)
    // Here we just ensure ScrollTrigger refreshes correctly
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <Header />
      <main>
        <Hero />
        
        {/* The combined Sticky Scroll Section */}
        <StickyGallery />

        {/* Vertical Transitioning Section */}
        <FeatureShowcase />
        
        <Footer />
      </main>
    </div>
  );
};

export default App;
