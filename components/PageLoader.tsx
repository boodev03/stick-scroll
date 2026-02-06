import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageLoaderProps {
  onComplete: () => void;
  minDuration?: number;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete, minDuration = 1400 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    const progressEl = progressRef.current;
    if (progressEl) {
      const progressAnimation = () => {
        const elapsed = performance.now() - start;
        const p = Math.min(1, elapsed / (minDuration * 0.7));
        progressEl.style.width = `${p * 100}%`;
        if (p < 1) requestAnimationFrame(progressAnimation);
      };
      requestAnimationFrame(progressAnimation);
    }

    const runExit = () => {
      const wrapper = wrapperRef.current;
      const title = titleRef.current;
      const line = lineRef.current;
      if (!wrapper) {
        onComplete();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(progressRef.current, {
        width: '100%',
        duration: 0.2,
        ease: 'power2.in',
      })
        .to(
          [title, line],
          {
            opacity: 0,
            y: -12,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          wrapper,
          {
            scale: 1.02,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0.2
        );
    };

    const remaining = Math.max(0, minDuration - (performance.now() - start));
    const t = setTimeout(runExit, remaining);

    return () => clearTimeout(t);
  }, [onComplete, minDuration]);

  return (
    <div
      ref={wrapperRef}
      id="app-loader"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#030303] font-sans"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Grain overlay – matches index.html noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200% 200%',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
        }}
      />
      <div className="loader-inner relative z-10 text-center">
        <p
          ref={titleRef}
          className="loader-title font-serif text-white mb-10 text-[14vw] font-black italic leading-[0.85] tracking-tighter md:text-[10vw]"
        >
          LUMINA
        </p>
        <div
          ref={lineRef}
          className="loader-line mx-auto h-px w-[120px] overflow-hidden bg-white/10"
        >
          <div
            ref={progressRef}
            className="loader-progress h-full bg-indigo-500"
            style={{ width: '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
