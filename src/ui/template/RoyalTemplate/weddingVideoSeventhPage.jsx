import React, { useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Calendar,
  PlayCircle,
  Share2,
  ExternalLink,
  Film,
  User,
  Clock,
  Play,
  Pause,
} from "lucide-react";

// === CONSTANTS ===
const YOUTUBE_EMBED_BASE = "https://www.youtube.com/embed";
const YOUTUBE_EMBED_PARAMS = "?autoplay=1&mute=0&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3";
const YOUTUBE_FALLBACK_THUMBNAIL = "https://i.ytimg.com/vi";
const ANIMATION_DELAY_BASE = 0.2;

/**
 * WeddingVideoSeventhPage - Wedding video showcase with play controls
 * @param {Object} userData - Wedding data containing video assets and configuration
 * @returns {React.ReactElement|null} Video showcase section or null if no assets
 */
export default function WeddingVideoSeventhPage({ userData }) {
  // === EARLY RETURN: Handle missing or empty assets
  const data = userData?.pages?.nine_video;
  const asset = userData?.assets?.nine_video;

  if (!data || !asset || !asset.youtubeId) {
    return null;
  }

  // === VIDEO THUMBNAIL COMPONENT ===
  const VideoThumbnailCard = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const iframeRef = useRef(null);

    const videoUrl = useMemo(
      () => `${YOUTUBE_EMBED_BASE}/${asset.youtubeId}${YOUTUBE_EMBED_PARAMS}`,
      [asset.youtubeId]
    );

    const handlePlayPause = useCallback(() => {
      setIsPlaying((prev) => !prev);
    }, []);

    const handlePauseClick = useCallback((e) => {
      e.stopPropagation();
      handlePlayPause();
    }, [handlePlayPause]);

    return (
      <motion.div
        className="block group cursor-pointer"
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePlayPause}
      >
        {/* ===== DECORATIVE ELEMENTS ===== */}
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <Heart className="w-6 h-6 text-yellow-400" />
          <div
            className="w-2 h-2 bg-orange-400 rounded-full animate-ping"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* ===== VIDEO CONTAINER ===== */}
        <div className="relative overflow-hidden rounded-3xl bg-black/20 border-2 border-white/10 shadow-2xl group-hover:shadow-yellow-400/20 transition-all duration-500">
          {/* THUMBNAIL - Show when paused */}
          {!isPlaying && asset.thumbnail && (
            <img
              src={asset.thumbnail}
              className="w-full aspect-video object-cover group-hover:brightness-110 transition-all duration-500"
              alt="Wedding video thumbnail"
              onError={(e) => {
                e.target.src = `${YOUTUBE_FALLBACK_THUMBNAIL}/${asset.youtubeId}/hqdefault.jpg`;
              }}
              loading="lazy"
            />
          )}

          {/* IFRAME - Show when playing */}
          {isPlaying && (
            <iframe
              ref={iframeRef}
              src={videoUrl}
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full aspect-video border-0"
              title="Wedding Video"
              onError={() => {
                console.error("❌ iframe error");
                setVideoError(true);
              }}
              onLoad={() => {
                console.log("✅ iframe loaded");
              }}
              loading="lazy"
            />
          )}

          {/* ===== PLAY BUTTON OVERLAY ===== */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors">
              <motion.div
                className="p-4 rounded-2xl backdrop-blur-sm z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                <Play className="w-12 h-12 text-white/90" aria-hidden="true" />
              </motion.div>

              {/* Heart animation */}
              <motion.div
                className="absolute top-10 right-2"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart
                  className="w-4 h-4 text-rose-400 fill-current"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Duration badge */}
              <motion.div
                className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20 flex items-center space-x-1 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Clock className="w-3 h-3" aria-hidden="true" />
                <span>{data.duration}</span>
              </motion.div>

              {/* Live indicator */}
              <motion.div
                className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full border-2 border-white/50 animate-ping z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                aria-hidden="true"
              />
              <div
                className="absolute top-5 left-4 w-2 h-2 bg-green-500 rounded-full border-2 border-white/50 z-20"
                aria-hidden="true"
              />
            </div>
          )}

          {/* ===== PAUSE BUTTON ===== */}
          {isPlaying && (
            <button
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={handlePauseClick}
              title="Pause video"
              aria-label="Pause video"
            >
              <Pause className="w-6 h-6 text-white/90" aria-hidden="true" />
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  // === VIDEO INFO COMPONENT ===
  const VideoInfoCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      {/* ===== DECORATIVE HEADER ===== */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
          <Film className="w-6 h-6 text-yellow-400" aria-hidden="true" />
          <div
            className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

        {/* ===== TITLES ===== */}
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent mb-2 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_DELAY_BASE }}
        >
          {data.title}
        </motion.h2>

        <motion.p
          className="text-yellow-200/80 text-2xl lg:text-3xl font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_DELAY_BASE + 0.1 }}
        >
          {data.englishTitle}
        </motion.p>

        {/* ===== PHOTOGRAPHER CREDIT ===== */}
        <motion.div
          className="text-yellow-300/70 text-sm flex items-center justify-center space-x-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: ANIMATION_DELAY_BASE + 0.2 }}
        >
          <User className="w-4 h-4" aria-hidden="true" />
          <span>{data.subtitle}</span>
          <span className="hidden sm:inline">•</span>
          <a
            href={data.photographerTel}
            className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded px-1"
          >
            {data.photographer}
          </a>
        </motion.div>
      </div>
    </motion.div>
  );

  // === ACTION BUTTONS COMPONENT ===
  const ActionButtons = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto mb-8"
    >
      {/* ===== WATCH ON YOUTUBE BUTTON ===== */}
      {asset.youtubeUrl && (
        <motion.a
          href={asset.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 hover:from-yellow-500 hover:to-orange-500 text-black rounded-3xl font-bold text-lg shadow-xl border border-white/20 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          aria-label={data.ariaWatchLabel || "Watch video on YouTube"}
        >
          <PlayCircle
            className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
            aria-hidden="true"
          />
          <span>{data.watchButtonText} on YouTube</span>
          <ExternalLink
            className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1"
            aria-hidden="true"
          />
        </motion.a>
      )}
    </motion.div>
  );

  // === MAIN RENDER ===
  return (
    <section className="w-full min-h-screen py-12 px-4">
      {/* ===== BACKGROUND DECORATIONS ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-tl from-orange-400/5 to-rose-400/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-yellow-400/3 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ===== VIDEO THUMBNAIL ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <VideoThumbnailCard />
        </motion.div>

        {/* ===== VIDEO INFO ===== */}
        <VideoInfoCard />

        {/* ===== ACTION BUTTONS ===== */}
        <ActionButtons />

        {/* ===== CONTACT & CREDITS ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6 text-yellow-200/60 text-sm">
            <p>{data.locationsText}</p>
            <div className="w-px h-4 bg-yellow-400/30 hidden sm:block" />
            <p>{data.themeText}</p>
          </div>

          <p className="text-yellow-300/70 text-xs italic font-serif">
            {data.quote}
          </p>

          <div className="mt-6 pt-6 border-t border-yellow-400/20">
            <p className="text-yellow-200/50 text-xs">{data.footer}</p>
          </div>
        </motion.div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        /* ===== THUMBNAIL ENHANCEMENTS ===== */
        .group:hover img {
          transform: scale(1.05) !important;
          filter: brightness(1.1) contrast(1.05) !important;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 640px) {
          [style*="aspect-video"] {
            max-width: calc(100vw - 2rem) !important;
            margin: 0 1rem !important;
          }

          .grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @media (min-width: 641px) {
          [style*="aspect-video"] {
            max-width: 800px !important;
          }
        }

        /* ===== MOBILE TOUCH OPTIMIZATIONS ===== */
        @media (hover: none) and (pointer: coarse) {
          a[role="button"],
          button {
            min-height: 48px !important;
            min-width: 48px !important;
          }

          .group:hover {
            transform: none !important;
          }
        }

        /* ===== IMAGE LOADING STATES ===== */
        img {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          background: linear-gradient(
            90deg,
            #1f2937 25%,
            #374151 50%,
            #1f2937 75%
          ) !important;
          background-size: 200% 100% !important;
          animation: loading 1.5s infinite !important;
        }

        img.loaded {
          animation: none !important;
          background: none !important;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* ===== FOCUS ACCESSIBILITY ===== */
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #fbbf24 !important;
          outline-offset: 2px !important;
          border-radius: 12px !important;
        }

        /* ===== PERFORMANCE OPTIMIZATIONS ===== */
        img {
          will-change: transform, filter;
        }

        /* ===== REDUCED MOTION ===== */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}

// ✅ PROP VALIDATION
WeddingVideoSeventhPage.propTypes = {
  /**
   * Wedding data object containing video configuration and page details
   * @type {Object}
   */
  userData: PropTypes.shape({
    assets: PropTypes.shape({
      nine_video: PropTypes.shape({
        youtubeId: PropTypes.string.isRequired,
        youtubeUrl: PropTypes.string,
        thumbnail: PropTypes.string,
      }),
    }),
    pages: PropTypes.shape({
      nine_video: PropTypes.shape({
        title: PropTypes.string.isRequired,
        englishTitle: PropTypes.string,
        duration: PropTypes.string,
        subtitle: PropTypes.string,
        photographer: PropTypes.string,
        photographerTel: PropTypes.string,
        watchButtonText: PropTypes.string,
        ariaWatchLabel: PropTypes.string,
        locationsText: PropTypes.string,
        themeText: PropTypes.string,
        quote: PropTypes.string,
        footer: PropTypes.string,
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
WeddingVideoSeventhPage.defaultProps = {
  userData: null,
};
