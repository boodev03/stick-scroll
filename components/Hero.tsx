
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Split text simulation
    const chars = titleRef.current?.innerText.split('') || [];
    if (titleRef.current) {
        titleRef.current.innerHTML = chars.map(c => `<span class="inline-block opacity-0 translate-y-10">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    }

    tl.to(containerRef.current, { opacity: 1, duration: 1 })
      .to(titleRef.current?.querySelectorAll('span') || [], { 
        opacity: 1, 
        y: 0, 
        stagger: 0.02,
        duration: 1, 
        ease: 'expo.out' 
      })
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.5"
      );
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-transparent opacity-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-10">
        <div className="mb-6 flex items-center justify-center gap-6 text-[10px] font-bold tracking-[0.6em] uppercase text-indigo-500/60">
            <div className="w-16 h-px bg-indigo-500/20"></div>
            Visual Narrative Studio
            <div className="w-16 h-px bg-indigo-500/20"></div>
        </div>

        <h1 
          ref={titleRef}
          className="text-[14vw] md:text-[10vw] font-black tracking-tighter mb-10 font-serif leading-[0.8] italic text-white"
        >
          LUMINA
        </h1>

        <div className="flex justify-center">
            <p 
                ref={subtitleRef}
                className="max-w-2xl text-sm md:text-base text-neutral-500 font-medium leading-relaxed tracking-widest uppercase"
            >
                Redefining the digital canvas through innovative spatial narratives <br className="hidden md:block"/> and light-based experiments.
            </p>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-6 opacity-20">
        <div className="w-px h-24 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
