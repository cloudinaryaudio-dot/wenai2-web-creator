import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';

const VideoPlayer = forwardRef(({ videoId, onLoadError }, ref) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [playerId] = useState(`youtube-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`); // ✅ UNIQUE ID

  useImperativeHandle(ref, () => ({
    playVideo: () => playerRef.current?.playVideo(),
    pauseVideo: () => playerRef.current?.pauseVideo()
  }));

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const createPlayer = () => {
      if (containerRef.current && window.YT) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            origin: window.location.origin,
            enablejsapi: 1,
          },
          events: {
            onError: () => onLoadError?.()
          }
        });
      }
    };

    window.onYouTubeIframeAPIReady = createPlayer;

    // Wait for API
    const checkAPI = setInterval(() => {
      if (window.YT?.Player) {
        clearInterval(checkAPI);
        createPlayer();
      }
    }, 100);

    return () => {
      clearInterval(checkAPI);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId, onLoadError]);

  return <div ref={containerRef} id={playerId} className="w-full h-full" />;
});

export default VideoPlayer;
