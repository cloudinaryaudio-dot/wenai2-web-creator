import React, { useEffect, useState } from "react";
// import { useWeddingStore } from "../../../db/store/useWeddingStore";

export default function TapToStartButton({ onClick, allData }) {
  // const data = useWeddingStore((s) => s.TapToStartButtonData());
  // const data = useWeddingStore(s => s.getUserData()?.assets?.one_splash);
  // const userData = useWeddingStore( s => s.data );
  const data = allData?.assets?.one_splash;
  // console.log(data, allData);

  const [isOpening, setIsOpening] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReduced(!!mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  
  const startOpen = () => {
    console.log('🎬 Button clicked');
    console.log('onClick function:', onClick);
    
    if (prefersReduced) {
      console.log('⏭️ Reduced motion - redirecting immediately');
      onClick?.();
      return;
    }
    
    console.log('🎨 Starting animation...');
    setIsOpening(true);
    
    // Wait for animation, then redirect
    setTimeout(() => {
      console.log('⏭️ Animation done - redirecting...');
      if (onClick) {
        onClick();
      } else {
        console.error('❌ onClick is undefined!');
      }
    }, 2000);
  };

  return (
    <div className="tap-play-root">
      {/* Decorative arcs */}
      <div className={`arc top-arc ${isOpening ? "open" : ""}`} />
      <div className={`arc bottom-arc ${isOpening ? "open" : ""}`} />

      {/* Ganesha Image */}
      <img
        src={data.ganeshImage}
        alt="ganesha"
        className="absolute z-[22] rounded-full shadow-lg left-1/2 top-[15%] sm:top-[20%] -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[220px] md:w-[210px] lg:w-[210px]"
      />

      {/* Tap to Open Button */}
      {!isOpening && (
        <div
          className="seal-center"
          role="button"
          tabIndex={0}
          onClick={startOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              startOpen();
            }
          }}
        >
          <img
            src={data.tapToOpenImage}
            alt="open"
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow w-[180px] sm:w-[200px] md:w-[160px] lg:w-[140px] h-auto cursor-pointer"
          />
        </div>
      )}

      <style>{`
        :root { 
          --arc-rose-1: rgba(255, 160, 175, 0.98);
          --arc-rose-2: rgba(255, 120, 150, 0.95);
          --arc-gold-1: rgba(255, 205, 120, 0.93);
          --arc-gold-2: rgba(230, 170, 85, 0.9);
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; opacity: 0.95; }
          50% { background-position: 100% 50%; opacity: 1; }
          100% { background-position: 0% 50%; opacity: 0.95; }
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }

        .tap-play-root {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(120deg, #fff4f6, #ffeef2);
        }

        .arc {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          transition: transform 20s cubic-bezier(0.15, 0.70, 0.10, 1), opacity 2s ease;
          pointer-events: none;
        }
         
        .arc::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--arc-rose-1) 0%, var(--arc-rose-2) 30%, var(--arc-gold-1) 65%, var(--arc-gold-2) 100%);
          background-size: 300% 100%;
          mix-blend-mode: screen;
          filter: blur(4px) saturate(110%);
          opacity: 0.95;
          animation: shimmer 16s linear infinite;
        }

        .arc::after {
          content: "";
          position: absolute;
          inset: 6%;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(255,255,255,0.03), rgba(0,0,0,0.14) 80%);
          filter: blur(8px);
        }

        .top-arc { top: -18vh; }
        .bottom-arc { bottom: -18vh; }

        .arc.open.top-arc { transform: translate(-50%, -180%); opacity: 0; }
        .arc.open.bottom-arc { transform: translate(-50%, 180%); opacity: 0; }

        @media (max-width: 599px) { .arc { width: 90vw; height: 66vh; border-radius: 66% / 80%; } }
        @media (min-width: 600px) and (max-width: 899px) { .arc { width: 180vw; height: 52vh; border-radius: 52% / 32%; } }
        @media (min-width: 900px) and (max-width: 1399px) { .arc { width: 80vw; height: 66vh; border-radius: 66% / 70%; } }
        @media (min-width: 1400px) { .arc { width: 110vw; height: 72vh; border-radius: 48% / 36%; } }

        .seal-center {
          z-index: 60;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          transition: transform 0.22s ease;
          user-select: none;
        }
        .seal-center:active { transform: translate(-50%, -50%) scale(0.96); }
        .seal-center:hover { transform: translate(-50%, -50%) scale(1.05); }
      `}</style>
    </div>
  );
}
