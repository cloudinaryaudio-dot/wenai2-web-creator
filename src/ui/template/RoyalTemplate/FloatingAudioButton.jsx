import React from "react";

export default function FloatingAudioButton({
  isPlaying,
  toggleAudio,
  playLabel,
  pauseLabel
}) {
  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? pauseLabel : playLabel}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999
      }}
      className="
      flex items-center justify-center
      w-14 h-14 md:w-16 md:h-16
      rounded-full
      bg-gradient-to-r from-yellow-400/60 to-orange-400/60
      border border-yellow-300
      shadow-2xl
      backdrop-blur-md
      animate-pulse
      hover:scale-110
      active:scale-95
      transition-all duration-300
      "
    >
      {isPlaying ? (
        <svg
          className="w-6 h-6 text-yellow-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-yellow-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}