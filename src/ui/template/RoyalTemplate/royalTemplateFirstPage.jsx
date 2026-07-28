import React, { useState, useRef } from "react";
import FloatingAudioButton from "./FloatingAudioButton";

export default function RoyalTemplateFirstPage({ userData }) {

  const asset = userData?.assets?.four_backgrounds?.page1;
  const music = userData?.assets?.music;
  const data = userData?.pages?.four_countdown;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      audio.loop = true;
      setIsPlaying(true);
    }

  };

  return (

    <>
      {/* AUDIO */}
      <audio ref={audioRef} src={music} preload="auto" loop />

      {/* FLOATING BUTTON */}
      <FloatingAudioButton
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        playLabel={data.playLabel}
        pauseLabel={data.pauseLabel}
      />

      {/* PAGE */}
      <div
        className="min-h-screen bg-cover bg-center relative flex flex-col justify-end items-center overflow-hidden"
        style={{
          backgroundImage:
            window.innerWidth >= 768
              ? `url(${asset.desktop})`
              : `url(${asset.mobile})`,
          backgroundPosition: "center center",
          backgroundSize: window.innerWidth >= 768 ? "108%" : "cover",
          height: "100vh"
        }}
      >

        <div className="relative w-full flex flex-col items-center pb-4 z-10">

          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10"></div>

          <div className="flex flex-col items-center gap-4 relative z-10">

            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
              <span className="text-yellow-400 text-xl">&#10048;</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></div>
            </div>

          </div>

        </div>

      </div>

    </>
  );
}