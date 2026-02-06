
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FEATURES = [
  {
    title: "Light Synthesis",
    subtitle: "Spectral experiments in color",
    desc: "Exploring how synthetic light sources interact with virtual materials to create impossible color palettes.",
    img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
    color: "#6366f1"
  },
  {
    title: "Void Geometry",
    subtitle: "The architecture of nothingness",
    desc: "Structural studies on the negative space within digital models and the beauty of absence.",
    img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=1200",
    color: "#a855f7"
  },
  {
    title: "Neural Flow",
    subtitle: "AI-generated liquid dynamics",
    desc: "A series of animations where neural networks simulate fluid behavior in non-Euclidean space.",
    img: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=1200",
    color: "#ec4899"
  },
  {
    title: "Eternal Echo",
    subtitle: "Sonic-visual resonance",
    desc: "A final exploration into how frequencies can distort the very fabric of visual representation.",
    img: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1200",
    color: "#f59e0b"
  }
];

const FeatureShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
      
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        const inner = card.querySelector('.card-inner');
        const img = card.querySelector('.card-img');
        const content = card.querySelector('.card-content');

        // Initial setup for internal elements
        gsap.set(img, { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.2 });
        gsap.set(content, { y: 100, opacity: 0 });

        // Create the timeline for each card
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: !isLast,
            pinSpacing: false,
          }
        });

        // 1. Reveal Animation (as card comes into view)
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "top top",
                scrub: true,
            }
        });

        revealTl.to(img, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' })
                .to(content, { y: 0, opacity: 1, ease: 'none' }, "-=0.5");

        // 2. The "Deep Stack" Exit Animation (as NEXT card covers THIS one)
        // This is the magic "AWWW" part where the current card scales and dims.
        if (!isLast) {
            tl.to(inner, {
                scale: 0.9,
                opacity: 0.3,
                y: -50,
                filter: 'blur(5px)',
                ease: "none"
            });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-black pt-0 pb-0">
      {/* Visual Guide for the transition */}
      <div className="h-[20vh] bg-gradient-to-b from-transparent to-black pointer-events-none"></div>

      {FEATURES.map((feature, index) => (
        <div 
          key={index} 
          className="feature-card h-screen w-full relative overflow-hidden bg-black"
          style={{ zIndex: index + 1 }}
        >
          {/* Inner wrapper that gets the "Deep Stack" scaling effect */}
          <div className="card-inner w-full h-full relative overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={feature.img} 
                className="card-img w-full h-full object-cover brightness-[0.4] will-change-transform" 
                alt={feature.title}
              />
              <div 
                className="absolute inset-0 opacity-10 mix-blend-color pointer-events-none"
                style={{ backgroundColor: feature.color }}
              ></div>
            </div>

            {/* Content Layer */}
            <div className="card-content relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-10">
              <div className="max-w-4xl">
                <span 
                  className="text-xs font-black uppercase tracking-[0.8em] mb-6 block"
                  style={{ color: feature.color }}
                >
                  {feature.subtitle}
                </span>
                
                <h2 className="text-[12vw] md:text-[8vw] font-black font-serif leading-[0.8] tracking-tighter mb-10 italic text-white drop-shadow-2xl">
                  {feature.title}
                </h2>
                
                <div className="flex justify-center">
                    <p className="max-w-md text-neutral-400 text-base md:text-lg font-medium leading-relaxed tracking-wide">
                        {feature.desc}
                    </p>
                </div>

                <div className="mt-16 overflow-hidden">
                    <div className="w-12 h-px bg-white/20 mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Numbering */}
            <div className="absolute left-10 bottom-10 flex items-end gap-4">
                <span className="text-4xl font-serif italic text-white/10 font-black leading-none">0{index + 1}</span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-1">Feature Layer</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureShowcase;
