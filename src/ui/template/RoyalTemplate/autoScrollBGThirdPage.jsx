import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

// === CONSTANTS ===
const DEFAULT_INTERVAL_MS = 4500; // ms
const DEFAULT_MIN_WIDTH_DESKTOP = 768; // px

/**
 * AutoScrollBGThirdPage - Auto-scrolling background gallery with text overlay
 * @param {number} intervalMs - Auto-scroll interval in milliseconds
 * @param {number} minWidthForDesktop - Breakpoint for desktop/mobile detection
 * @param {Object} userData - Wedding data containing assets and page content
 * @returns {React.ReactElement|null} Auto-scroll background section or null if no assets
 */
export default function AutoScrollBGThirdPage({
  intervalMs = DEFAULT_INTERVAL_MS,
  minWidthForDesktop = DEFAULT_MIN_WIDTH_DESKTOP,
  userData,
}) {
  // === EARLY RETURN: Handle missing or empty assets
  const asset = userData?.assets?.five_gallery;
  const data = userData?.pages?.five_galleryScroll;

  if (
    !asset ||
    !data ||
    ((!asset.mobile || asset.mobile.length === 0) &&
      (!asset.desktop || asset.desktop.length === 0))
  ) {
    return null;
  }

  // === STATE MANAGEMENT ===
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < minWidthForDesktop
      : false
  );
  const [isPaused, setIsPaused] = useState(false);

  // === REFS ===
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  // === DERIVED STATE ===
  const images = useMemo(
    () => (isMobile ? asset.mobile : asset.desktop) || [],
    [isMobile, asset]
  );

  const hasImages = useMemo(() => images.length > 0, [images.length]);

  // === EARLY RETURN: Handle empty images array
  if (!hasImages) {
    return null;
  }

  // === IMAGE PRELOADING ===
  useEffect(() => {
    const imagesToPreload = isMobile ? asset.mobile : asset.desktop;
    if (!Array.isArray(imagesToPreload)) return;

    imagesToPreload.forEach((src) => {
      if (typeof src === "string") {
        const img = new Image();
        img.src = src;
      }
    });
  }, [isMobile, asset]);

  // === RESPONSIVE HANDLER ===
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < minWidthForDesktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidthForDesktop]);

  // === AUTO-SCROLL LOGIC ===
  useEffect(() => {
    if (isPaused || !hasImages) return;

    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [images.length, intervalMs, isPaused, hasImages]);

  // === KEYBOARD NAVIGATION ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!hasImages) return;

      if (e.key === "ArrowLeft") {
        setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setIsPaused(true);
      } else if (e.key === "ArrowRight") {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsPaused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, hasImages]);

  // === NAVIGATION HANDLERS ===
  const goToSlide = useCallback(
    (n) => {
      if (!hasImages) return;
      setIndex(n % images.length);
      setIsPaused(true);
    },
    [images.length, hasImages]
  );

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);
  const handleFocus = useCallback(() => setIsPaused(true), []);
  const handleBlur = useCallback(() => setIsPaused(false), []);

  // === RENDER ===
  return (
    <section
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden select-none bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      role="region"
      aria-label="Auto-scrolling gallery background"
      aria-roledescription="carousel"
    >
      {/* ===== BACKGROUND IMAGE LAYERS (Crossfade) ===== */}
      <div className="absolute inset-0">
        {images.map((src, i) => {
          const isVisible = i === index;
          return (
            <div
              key={`gallery-${i}`}
              aria-hidden={!isVisible}
              style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                transition: "opacity 900ms ease",
                opacity: isVisible ? 1 : 0,
              }}
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label={`Gallery image ${i + 1} of ${images.length}`}
            />
          );
        })}

        {/* ===== GRADIENT OVERLAY ===== */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* ===== CONTENT PANEL ===== */}
      <div className="relative z-10 w-full h-full flex items-end justify-center px-6 pb-0 sm:pb-0">
        <div className="max-w-3xl w-full">
          <div className="mx-auto max-w-2xl bg-white/10 rounded-2xl p-6 sm:p-8 ">
            {/* ===== HEART ICON ===== */}
            <div className="flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-rose-300"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                role="decorative"
              >
                <path
                  d="M12 21s-7-4.35-9-7.25A5.5 5.5 0 0112 3a5.5 5.5 0 019 10.75C19 16.65 12 21 12 21z"
                  stroke="rgba(236,72,153,0.85)"
                  strokeWidth="1.2"
                  fill="rgba(236,72,153,0.12)"
                />
              </svg>
            </div>

            {/* ===== TITLE ===== */}
            <h1 className="text-white text-3xl sm:text-4xl font-serif font-extrabold text-center">
              {data.coupleTitle}{" "}
              <span className="text-rose-200">{data.coupleTitleHighlightLeft}</span>{" "}
              <span className="text-amber-100">{data.coupleTitleHighlightRight}</span>
            </h1>

            {/* ===== DESCRIPTION ===== */}
            <p className="mt-4 text-base sm:text-lg text-amber-50/90 text-center leading-relaxed">
              {data.coupleDescription}
            </p>
          </div>
        </div>
      </div>

      {/* ===== INDICATOR DOTS (Optional) ===== */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => goToSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
            role="tab"
            tabIndex={0}
          />
        ))}
      </div> */}
    </section>
  );
}

// ✅ PROP VALIDATION
AutoScrollBGThirdPage.propTypes = {
  /**
   * Auto-scroll interval in milliseconds
   * @type {number}
   */
  intervalMs: PropTypes.number,

  /**
   * Breakpoint width for desktop/mobile detection
   * @type {number}
   */
  minWidthForDesktop: PropTypes.number,

  /**
   * Wedding data object containing assets and page configuration
   * @type {Object}
   */
  userData: PropTypes.shape({
    assets: PropTypes.shape({
      five_gallery: PropTypes.shape({
        mobile: PropTypes.arrayOf(PropTypes.string),
        desktop: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    pages: PropTypes.shape({
      five_galleryScroll: PropTypes.shape({
        coupleTitle: PropTypes.string,
        coupleTitleHighlightLeft: PropTypes.string,
        coupleTitleHighlightRight: PropTypes.string,
        coupleDescription: PropTypes.string,
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
AutoScrollBGThirdPage.defaultProps = {
  intervalMs: DEFAULT_INTERVAL_MS,
  minWidthForDesktop: DEFAULT_MIN_WIDTH_DESKTOP,
  userData: null,
};
