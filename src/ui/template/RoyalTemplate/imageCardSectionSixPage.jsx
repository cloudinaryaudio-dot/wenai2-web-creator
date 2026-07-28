import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

// === CONSTANTS ===
const DEFAULT_AUTOPLAY_DELAY = 4000; // ms
const FADE_EFFECT = "fade";
const CAROUSEL_HEIGHT_MOBILE = "65vh";
const CAROUSEL_HEIGHT_DESKTOP = "75vh";

/**
 * ImageCardSectionSixPage - Memory gallery carousel with filtering
 * @param {Object} userData - Wedding data containing memories assets and configuration
 * @returns {React.ReactElement|null} Memory gallery section or null if no assets
 */
export default function ImageCardSectionSixPage({ userData }) {
  // === EARLY RETURN: Handle missing or empty assets
  const asset = userData?.assets?.eight_memories;
  const data = userData?.pages?.eight_page_memories;

  if (
    !asset ||
    !Array.isArray(asset) ||
    asset.length === 0 ||
    !data ||
    !data.categories
  ) {
    return null;
  }

  // === STATE MANAGEMENT ===
  const [cat, setCat] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // === REFS ===
  const swiperRef = useRef(null);

  // === DERIVED STATE ===
  const filtered = useMemo(() => {
    if (cat === "All") {
      return asset;
    }

    if (cat === "Family") {
      return asset.filter(
        (m) => m.category === "Family" || m.category === "Friends"
      );
    }

    return asset.filter((m) => m.category === cat);
  }, [cat, asset]);

  // === EARLY RETURN: Handle empty filtered results
  if (!filtered || filtered.length === 0) {
    return null;
  }

  // === RESET SLIDE ON FILTER CHANGE ===
  useEffect(() => {
    setCurrentSlide(0);
  }, [cat]);

  // === NAVIGATION HANDLERS ===
  const handlePrevSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  const handleDotClick = useCallback((index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setCat(value);
  }, []);

  // === RENDER ===
  return (
    <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-b from-black/40 to-transparent py-12 px-4">
      {/* ===== HEADING ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-extrabold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg py-4">
          {data.heading.title}
        </h2>
        <p className="mt-2 text-yellow-200/70 text-sm md:text-base">
          {data.heading.subtitle}
        </p>
      </motion.div>

      {/* ===== CATEGORY FILTERS ===== */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {data.categories.map((catBtn) => (
          <motion.button
            key={catBtn.value}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-300 border-2 ${
              cat === catBtn.value
                ? "bg-yellow-400/90 border-yellow-400 text-black shadow-lg"
                : "bg-black/20 border-yellow-400/20 text-yellow-200 hover:bg-black/40"
            }`}
            onClick={() => handleCategoryChange(catBtn.value)}
            role="radio"
            aria-checked={cat === catBtn.value}
            aria-label={`Filter by ${catBtn.label}`}
          >
            <span className="mr-2 text-base" aria-hidden="true">
              {catBtn.icon}
            </span>
            <span>{catBtn.label}</span>
          </motion.button>
        ))}
      </div>

      {/* ===== IMAGE CAROUSEL CONTAINER ===== */}
      <div className="relative w-full max-w-4xl mx-auto mb-12 px-4 lg:px-0">
        <Swiper
          ref={swiperRef}
          key={cat}
          modules={[Autoplay, EffectFade]}
          loop={filtered.length > 1}
          autoplay={
            filtered.length > 1
              ? { delay: DEFAULT_AUTOPLAY_DELAY, disableOnInteraction: false }
              : false
          }
          effect={FADE_EFFECT}
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          className="w-full rounded-3xl shadow-2xl border-4 border-white/20 select-none"
          style={{
            height: CAROUSEL_HEIGHT_MOBILE,
          }}
          breakpoints={{
            768: {
              height: CAROUSEL_HEIGHT_DESKTOP,
            },
          }}
          aria-label="Memory carousel"
          aria-live="polite"
        >
          {filtered.map((img, idx) => (
            <SwiperSlide key={`${img.src}-${idx}`}>
              <div className="relative w-full h-full">
                <img
                  src={img.src}
                  alt={img.category || `Memory ${idx + 1}`}
                  className="object-cover w-full h-full rounded-3xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-3xl" />

                {/* ===== CAPTION ===== */}
                {img.caption && (
                  <motion.p
                    className="absolute bottom-6 w-full px-4 text-center text-lg font-bold text-white drop-shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {img.caption}
                  </motion.p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== LEFT ARROW ===== */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full text-yellow-300 items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          title="Previous slide"
          aria-label="Previous memory"
          disabled={filtered.length <= 1}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* ===== RIGHT ARROW ===== */}
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full text-yellow-300 items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          title="Next slide"
          aria-label="Next memory"
          disabled={filtered.length <= 1}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* ===== PAGINATION DOTS ===== */}
      {/* <div className="flex justify-center items-center mb-8">
        <div
          className="flex space-x-2 p-3 bg-black/20 rounded-full backdrop-blur-sm"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {filtered.map((_, index) => (
            <motion.button
              key={`dot-${index}`}
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                index === currentSlide
                  ? "bg-yellow-400 scale-125 w-3 h-3"
                  : "bg-white/40 hover:bg-white/60 w-2.5 h-2.5"
              }`}
              onClick={() => handleDotClick(index)}
              role="tab"
              aria-selected={index === currentSlide}
              aria-label={`Go to slide ${index + 1}`}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div> */}

      {/* ===== STYLES ===== */}
      <style>{`
        /* Hide Swiper's default controls */
        .swiper-button-prev-custom,
        .swiper-button-next-custom,
        .swiper-pagination {
          display: none !important;
        }

        /* Smooth animations */
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }

        /* Focus visible styling */
        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            width: 32px;
            height: 32px;
          }

          .swiper-button-prev-custom svg,
          .swiper-button-next-custom svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </section>
  );
}

// ✅ PROP VALIDATION
ImageCardSectionSixPage.propTypes = {
  /**
   * Wedding data object containing memories assets and page configuration
   * @type {Object}
   */
  userData: PropTypes.shape({
    assets: PropTypes.shape({
      eight_memories: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          category: PropTypes.string.isRequired,
          caption: PropTypes.string,
        })
      ),
    }),
    pages: PropTypes.shape({
      eight_page_memories: PropTypes.shape({
        heading: PropTypes.shape({
          title: PropTypes.string.isRequired,
          subtitle: PropTypes.string,
        }),
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.string,
          })
        ),
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
ImageCardSectionSixPage.defaultProps = {
  userData: null,
};
