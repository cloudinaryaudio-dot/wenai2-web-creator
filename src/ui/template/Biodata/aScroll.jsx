import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * AutoScrollCarousel Component - Auto-playing image carousel with full controls
 * @param {string} bgImage - Background image URL (array or string)
 * @param {Array<string>} autoScrImg - Array of image URLs to display in carousel
 * @returns {React.ReactElement|null} Carousel component or null if no images
 */
export default function AutoScrollCarousel({ bgImage, autoScrImg }) {
  // ✅ EARLY RETURN: Handle empty or invalid images
  if (!autoScrImg || !Array.isArray(autoScrImg) || autoScrImg.length === 0) {
    return null;
  }

  const images = autoScrImg;
  const backgroundImage = Array.isArray(bgImage) ? bgImage[1] : bgImage;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // === RESPONSIVE CHECK ===
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // === AUTO-PLAY LOGIC ===
  useEffect(() => {
    if (!isAutoPlay || images.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, images.length]);

  // === TOUCH HANDLING ===
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
    // Resume autoplay after 2 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // === KEYBOARD NAVIGATION ===
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (images.length === 0) return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAutoPlay(false);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlay(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  // === MANUAL NAVIGATION ===
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 2000);
  };

  return (
    <div
      className="bg-rose-600 flex items-center justify-center"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative w-full md:w-[412px] bg-black overflow-hidden flex flex-col">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@400;500;600;700&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
          }

          .font-serif {
            font-family: 'Playfair Display', serif;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-fade-in-down {
            animation: fadeInDown 0.8s ease-out forwards;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out forwards;
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out forwards;
          }

          .animate-pulse-custom {
            animation: pulse 2s ease-in-out infinite;
          }

          .carousel-image {
            background-size: cover;
            background-position: center;
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .carousel-image.active {
            opacity: 1;
            transform: scale(1);
          }

          .carousel-image.inactive {
            opacity: 0;
            transform: scale(1.05);
          }

          html {
            scroll-behavior: smooth;
          }

          .swipe-animation {
            animation: slideInRight 0.5s ease-out;
          }
        `}</style>

        {/* ===== MAIN CAROUSEL CONTAINER ===== */}
        <div
          ref={containerRef}
          className="relative w-full h-screen bg-black overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          role="region"
          aria-label="Image carousel"
          aria-live="polite"
        >
          {/* ===== IMAGE SLIDES ===== */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                  index === currentIndex
                    ? "carousel-image active opacity-100 z-10"
                    : "carousel-image inactive opacity-0 z-0"
                }`}
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                role="img"
                aria-label={`Slide ${index + 1} of ${images.length}`}
              >
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* ===== TEXT OVERLAY ===== */}
                {index === currentIndex && (
                  <div className="absolute inset-0 flex flex-col justify-end items-center pb-20 md:pb-32 px-4 md:px-8 text-center">
                    <div className="animate-fade-in-up">
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-yellow-300 mb-4 drop-shadow-lg">
                        {/* Add title if available */}
                      </h2>
                      <p className="text-lg md:text-2xl text-amber-100 font-[cursive] font-semibold drop-shadow-md max-w-2xl mx-auto">
                        {/* Add description if available */}
                      </p>
                    </div>
                  </div>
                )}

                {/* Image number indicator */}
                <div className="absolute top-8 right-8 bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-sm md:text-base">
                  {index + 1} / {images.length}
                </div>
              </div>
            ))}
          </div>

          {/* ===== NAVIGATION ARROWS ===== */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="पिछली तस्वीर"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="अगली तस्वीर"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* ===== AUTOPLAY TOGGLE ===== */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="absolute top-8 left-8 z-40 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold flex items-center gap-2"
            title={isAutoPlay ? "ऑटोप्ले बंद करें" : "ऑटोप्ले चालू करें"}
            aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
            aria-pressed={isAutoPlay}
          >
            <span className="text-lg">
              {isAutoPlay ? "⏸️" : "▶️"}
            </span>
            <span className="hidden md:inline text-sm">
              {isAutoPlay ? "रुकें" : "चलाएं"}
            </span>
          </button>
        </div>

        {/* ===== DOT INDICATORS ===== */}
        <div
          className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 z-40 flex gap-2 md:gap-3"
          role="tablist"
          aria-label="Slide indicators"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                index === currentIndex
                  ? "bg-yellow-400 w-3 h-3 md:w-4 md:h-4 scale-125"
                  : "bg-white/50 hover:bg-white/70 w-2 h-2 md:w-3 md:h-3"
              }`}
              title={`स्लाइड ${index + 1}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
              role="tab"
            />
          ))}
        </div>

        {/* ===== INFO PANEL (Mobile bottom) ===== */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 to-transparent pt-8 pb-6 px-4 md:hidden">
          <div className="text-center pb-5">
            <p className="text-white/80 text-xs font-semibold mb-1">
              👆 स्वाइप करें या तीर दबाएं
            </p>
            <p className="text-amber-300 text-xs font-bold">
              कुल {images.length} तस्वीरें
            </p>
          </div>
        </div>

        {/* ===== PROGRESS BAR ===== */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-yellow-400 z-40 transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
          }}
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={images.length}
          aria-label="Carousel progress"
        />
      </div>
    </div>
  );
}

// ✅ PROP VALIDATION
AutoScrollCarousel.propTypes = {
  /**
   * Background image URL or array of background images
   * @type {string|Array<string>}
   */
  bgImage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * Array of carousel image URLs
   * @type {Array<string>}
   */
  autoScrImg: PropTypes.arrayOf(PropTypes.string),
};

// ✅ DEFAULT PROPS
AutoScrollCarousel.defaultProps = {
  bgImage: "",
  autoScrImg: [],
};
