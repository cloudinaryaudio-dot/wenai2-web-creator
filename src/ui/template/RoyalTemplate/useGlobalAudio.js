import { useEffect, useRef, useState } from "react";

export default function useGlobalAudio(music) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tryAutoPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      audio.loop = true;
      setIsPlaying(true);
    } catch (err) {
      // autoplay blocked → wait for first interaction
      const unlock = async () => {
        try {
          await audio.play();
          audio.loop = true;
          setIsPlaying(true);
        } catch {}

        window.removeEventListener("click", unlock);
        window.removeEventListener("touchstart", unlock);
      };

      window.addEventListener("click", unlock);
      window.addEventListener("touchstart", unlock);
    }
  };

  useEffect(() => {
    tryAutoPlay();
  }, []);

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

  return {
    audioRef,
    isPlaying,
    toggleAudio
  };
}