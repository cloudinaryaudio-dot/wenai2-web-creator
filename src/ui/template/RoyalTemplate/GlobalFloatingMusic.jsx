import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function GlobalFloatingMusic({ music }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      audio.loop = true;
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !music) return;

    const tryPlay = async () => {
      try {
        await audio.play();
        audio.loop = true;
        setIsPlaying(true);
      } catch {
        const unlock = () => {
          audio.play().catch(() => {});
          audio.loop = true;
          setIsPlaying(true);

          window.removeEventListener("click", unlock);
          window.removeEventListener("touchstart", unlock);
        };

        window.addEventListener("click", unlock);
        window.addEventListener("touchstart", unlock);
      }
    };

    tryPlay();
  }, [music]);

  const UI = (
    <>
      <style>
        {`

        @keyframes rotateDisc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotateGlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* glow opacity animation */
        @keyframes glowOpacity {
          0% { opacity: 0; }
          20% { opacity: .5; }
          40% { opacity: 1; }
          60% { opacity: 1; }
          80% { opacity: .5; }
          100% { opacity: 0; }
        }

        /* sparkle orbit animation */
        @keyframes sparkleOrbit {
          from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }

        .spin-disc {
          animation: rotateDisc 4s linear infinite;
        }

        .spin-glow {
          animation: rotateGlow 6s linear infinite, glowOpacity 2.5s ease-in-out infinite;
        }

        .sparkle {
          animation: sparkleOrbit 4s linear infinite;
        }

        @keyframes buttonOpacityWave {
  10%   { opacity: 1; }
  20%  { opacity: 0.8; }
  40%  { opacity: 0.5; }
  60%  { opacity: 0.2; }
  80%  { opacity: 0.1; }
  100% { opacity: 0; }
}

.opacity-wave {
  animation: buttonOpacityWave 4.5s ease-in-out infinite;
}



      `}
      </style>

      <audio ref={audioRef} src={music} preload="auto" loop />

      <button
        onClick={toggleAudio}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 999999,
        }}
        className={`relative w-16 h-16 flex items-center justify-center 
${isPlaying ? "opacity-wave" : "opacity-wave"}`}
      >
        {/* rotating glow ring */}
        <div
          className={`absolute w-20 h-20 rounded-full border border-yellow-400
          ${isPlaying ? "spin-glow" : ""}
          `}
        />

        {/* sparkle travelling */}
        {isPlaying && (
          <div className="absolute sparkle w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_gold]" />
        )}

        {/* gold metallic ring */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center
          bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600
          shadow-[0_0_12px_rgba(255,215,0,0.6)]
          ${isPlaying ? "spin-disc" : ""}
          `}
        >
          {/* maroon center */}
          <div className="w-10 h-10 rounded-full bg-[#6b0f1a] flex items-center justify-center shadow-inner">
            {isPlaying ? (
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </>
  );

  return createPortal(UI, document.body);
}
