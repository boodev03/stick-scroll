
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
  const slidesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = slidesRef.current;
      if (!slides.length) return;

      // Create a single master timeline for the whole section
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${FEATURES.length * 100}%`, // Length based on number of features
          pin: true,
          scrub: 1, // Smooth scrub
          invalidateOnRefresh: true,
        }
      });

      // We animate each slide except the first one (which is visible initially)
      slides.forEach((slide, i) => {
        if (i === 0) return;

        const prevSlide = slides[i-1];
        const img = slide.querySelector('.slide-img');
        const content = slide.querySelector('.slide-content');
        const prevContent = prevSlide.querySelector('.slide-content');

        // Animation for the "Wipe" reveal
        masterTl
          .to(slide, {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: "none",
            duration: 1
          }, i - 1) // Using index as timestamp for clean sequence
          .fromTo(img, 
            { scale: 1.4, filter: 'blur(10px)' }, 
            { scale: 1, filter: 'blur(0px)', ease: "none", duration: 1 }, 
            i - 1
          )
          .to(prevContent, {
            opacity: 0,
            y: -50,
            ease: "none",
            duration: 0.5
          }, i - 1)
          .fromTo(content,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, ease: "none", duration: 0.8 },
            (i - 1) + 0.2
          );
      });
      
      // Progress indicator animation
      masterTl.to('.progress-fill', {
        height: '100%',
        ease: 'none',
        duration: FEATURES.length - 1
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Side Progress UI */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-4 mix-blend-difference opacity-50">
        <span className="text-[10px] font-black uppercase tracking-widest">01</span>
        <div className="w-[2px] h-32 bg-white/10 relative overflow-hidden">
           <div className="progress-fill absolute top-0 left-0 w-full h-0 bg-indigo-500"></div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">0{FEATURES.length}</span>
      </div>

      {FEATURES.map((feature, index) => (
        <div 
          key={index}
          // Fixed: Wrapped assignment in a block to avoid returning the element, which fixes the TypeScript error.
          ref={(el) => {
            if (el) slidesRef.current[index] = el;
          }}
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ 
            zIndex: index + 10,
            clipPath: index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
            willChange: 'clip-path'
          }}
        >
          {/* Image Layer with Parallax */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={feature.img} 
              className="slide-img w-full h-full object-cover brightness-[0.3] will-change-transform" 
              alt={feature.title}
            />
            {/* Color accent overlay */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundColor: feature.color }}
            ></div>
          </div>

          {/* Content Layer */}
          <div className="slide-content absolute inset-0 z-20 flex items-center justify-center text-center px-10 pointer-events-none">
            <div className="max-w-4xl w-full">
              <span 
                className="text-xs font-black uppercase tracking-[0.8em] mb-6 block"
                style={{ color: feature.color }}
              >
                {feature.subtitle}
              </span>
              
              <h2 className="text-[10vw] md:text-[8vw] font-black font-serif leading-[0.8] tracking-tighter mb-8 italic text-white">
                {feature.title}
              </h2>
              
              <div className="flex justify-center">
                <p className="max-w-md text-neutral-400 text-sm md:text-lg font-medium leading-relaxed tracking-widest uppercase">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-16 inline-flex items-center gap-4 pointer-events-auto cursor-pointer group">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Explore Layer</span>
                  <div className="w-10 h-px bg-white/20 group-hover:bg-indigo-500 group-hover:w-16 transition-all duration-500"></div>
              </div>
            </div>
          </div>

          {/* Large Background Watermark */}
          <div className="absolute left-0 bottom-0 pointer-events-none select-none overflow-hidden">
             <span className="text-[30vw] font-black text-white/[0.02] leading-none -translate-x-12 translate-y-24 inline-block">
                0{index + 1}
             </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureShowcase;
