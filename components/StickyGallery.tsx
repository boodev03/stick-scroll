
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200', title: 'Neo-Genesis', artist: 'Hana Volkov' },
  { url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200', title: 'Carbon Sleep', artist: 'Elias Thorne' },
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', title: 'Prism Flux', artist: 'Sola Kim' },
  { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200', title: 'Static Flow', artist: 'Marc Van' },
];

const StickyGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const horizontal = horizontalRef.current;
    if (!horizontal) return;

    const scrollWidth = horizontal.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollWidth + 500}`, // Added buffer for the exit transition
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal Scroll
      tl.to(horizontal, {
        x: -scrollWidth,
        ease: "none",
        duration: 10 // Arbitrary time scale for the timeline
      });

      // 2. Exit Transition (Fade/Scale out the whole horizontal container)
      tl.to(horizontal, {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(20px)',
        duration: 2,
        ease: "power2.inOut"
      });

      // Parallax for the images
      gsap.utils.toArray<HTMLElement>('.gallery-img').forEach(img => {
        gsap.to(img, {
            x: -60,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                containerAnimation: tl,
                scrub: true
            }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden bg-black">
      <div 
        ref={horizontalRef} 
        className="flex items-center h-screen space-x-32 px-[10vw] relative will-change-transform"
      >
        {/* Intro */}
        <div className="flex-shrink-0 w-[45vw]">
          <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.8em] mb-6 block">Collection 01</span>
          <h2 className="text-7xl md:text-9xl font-black font-serif leading-[0.85] tracking-tighter italic text-white">
            Digital <br /> Archeology
          </h2>
          <p className="mt-10 text-neutral-600 max-w-sm text-xs uppercase leading-loose tracking-[0.3em] font-bold">
            Unearthing the artifacts of the next century through procedural generation.
          </p>
        </div>

        {/* Gallery Items */}
        {GALLERY_IMAGES.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-[80vw] md:w-[60vw] h-[65vh] group relative">
            <div className="w-full h-full overflow-hidden rounded-[2px] relative bg-neutral-900 shadow-2xl">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="gallery-img w-[125%] h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-10 left-10 flex flex-col">
                    <span className="text-indigo-400 text-[9px] font-bold tracking-[0.5em] uppercase mb-2">Artifact {index + 1}</span>
                    <h3 className="text-4xl font-black font-serif tracking-tight italic text-white">{img.title}</h3>
                </div>
            </div>
          </div>
        ))}

        {/* Transitional End */}
        <div className="flex-shrink-0 w-[80vw] h-screen flex flex-col justify-center items-center text-center">
            <h2 className="text-[12vw] font-serif italic text-white opacity-5 font-black uppercase tracking-tighter leading-none select-none">
              Shift
            </h2>
            <div className="mt-8 flex flex-col items-center gap-6">
               <div className="w-px h-32 bg-indigo-500/30"></div>
               <span className="text-[10px] tracking-[0.8em] uppercase text-indigo-500 font-black animate-pulse">Descent into detail</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StickyGallery;
