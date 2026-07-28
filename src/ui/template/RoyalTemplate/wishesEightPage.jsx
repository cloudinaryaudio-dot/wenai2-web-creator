import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Users,
  Gift,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// === CONSTANTS ===
const DEFAULT_AUTOPLAY_DELAY = 8000; // ms
const CONFETTI_PARTICLE_COUNT = 20;
const CONFETTI_COLORS = [
  "#facc15",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
];
const SWIPER_EFFECT = "fade";
const ICON_MAP = {
  Users,
  Heart,
  Gift,
  Sparkles,
  ChevronRight,
};

/**
 * WishesEightPage - Wedding wishes carousel with animation effects
 * @param {Object} userData - Wedding data containing wishes and configuration
 * @returns {React.ReactElement|null} Wishes carousel section or null if no wishes
 */
export default function WishesEightPage({ userData }) {
  // === EARLY RETURN: Handle missing or empty data
  const data = userData?.pages?.ten_wishes;

  if (
    !data ||
    !data.wishes ||
    !Array.isArray(data.wishes) ||
    data.wishes.length === 0
  ) {
    return null;
  }

  // === STATE MANAGEMENT ===
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMessages, setExpandedMessages] = useState({});
  const [confetti, setConfetti] = useState([]);

  // === REFS ===
  const swiperRef = useRef(null);

  // === DERIVED STATE ===
  const currentWish = useMemo(
    () => data.wishes[activeIndex],
    [activeIndex, data.wishes]
  );

  // === AUTO-ADVANCE SLIDES ===
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.wishes.length);
    }, DEFAULT_AUTOPLAY_DELAY);

    return () => clearInterval(interval);
  }, [data.wishes.length]);

  // === CONFETTI ANIMATION ===
  useEffect(() => {
    let animationFrame;

    const animateConfetti = () => {
      setConfetti((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            rotation: (p.rotation || 0) + 10,
          }))
          .filter((p) => p.y < 120 && p.x > -10 && p.x < 110)
      );

      if (confetti.length > 0) {
        animationFrame = requestAnimationFrame(animateConfetti);
      }
    };

    if (confetti.length > 0) {
      animationFrame = requestAnimationFrame(animateConfetti);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [confetti.length]);

  // === HANDLERS ===
  const getIconComponent = useCallback((iconName) => {
    return ICON_MAP[iconName] || Heart;
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
  }, []);

  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handleDotClick = useCallback((idx) => {
    swiperRef.current?.slideToLoop(idx);
  }, []);

  // === RENDER ===
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black/20 to-transparent py-12 px-4">
      {/* ===== SUBTLE PATTERN BACKGROUND ===== */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10L45 20L40 25L35 30L30 35L25 40L20 45L15 50L20 55L25 60L30 65L35 70L40 75L45 80L50 85L55 80L60 75L65 70L70 65L75 60L80 55L85 50L80 45L75 40L70 35L65 30L60 25L55 20L50 15Z' fill='%23facc15' fill-opacity='0.3' transform='rotate(45 50 50)'/%3E%3C/svg%3E")`,
          backgroundSize: "25px 25px",
        }}
      />

      {/* ===== TITLE SECTION ===== */}
      <div className="relative z-20 text-center mb-16">
        <div className="inline-flex items-center space-x-3 mb-6">
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: "linear-gradient(to right, #facc15, #fbbf24)" }}
            aria-hidden="true"
          />
          <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-lg" aria-hidden="true" />
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: "linear-gradient(to right, #facc15, #fbbf24)" }}
            aria-hidden="true"
          />
        </div>

        <h2
          className="text-5xl md:text-6xl font-serif font-bold text-yellow-200 mb-3 drop-shadow-2xl tracking-wide"
          style={{ textShadow: "0 0 20px rgba(250, 204, 21, 0.5)" }}
        >
          {data.title}
        </h2>

        <p className="text-yellow-300/90 text-lg font-light uppercase tracking-widest drop-shadow-md">
          {data.subtitle}
        </p>
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-20 w-full max-w-4xl mx-auto">
        <div className="relative">
          {/* ===== CAROUSEL ===== */}
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            slidesPerView={1}
            loop
            effect={SWIPER_EFFECT}
            fadeEffect={{ crossFade: true }}
            onSlideChange={handleSlideChange}
            onSwiper={handleSwiperInit}
            autoplay={{
              delay: DEFAULT_AUTOPLAY_DELAY,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              "--swiper-theme-color": "#facc15",
              height: "600px",
            }}
            aria-label="Wishes carousel"
            aria-live="polite"
          >
            {data.wishes.map((wish) => {
              const IconComponent = getIconComponent(wish.icon);

              return (
                <SwiperSlide key={wish.id}>
                  <div
                    className="h-full relative flex items-center justify-center p-8"
                    style={{
                      background: "linear-gradient(135deg, rgba(248, 250, 252, 0.1) 0%, rgba(248, 250, 252, 0.05) 100%)",
                    }}
                  >
                    {/* ===== CARD CONTAINER ===== */}
                    <div
                      className="relative w-full max-w-3xl mx-auto h-[500px] flex flex-col items-center justify-center text-center group"
                      style={{
                        zIndex: 10,
                        boxShadow:
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      {/* ===== MESSAGE CARD ===== */}
                      <div
                        className="relative w-full max-w-2xl p-10 rounded-3xl border border-yellow-800/30 transition-all duration-700 group-hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(25px)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        {/* ===== ICON BADGE ===== */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-600/30"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(250, 204, 21, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)",
                            }}
                          >
                            <IconComponent
                              className="w-8 h-8 text-yellow-300 drop-shadow-md"
                              style={{
                                filter:
                                  "drop-shadow(0 0 8px rgba(250, 204, 21, 0.5))",
                              }}
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        {/* ===== CONTENT AREA ===== */}
                        <div className="relative min-h-[300px] flex flex-col justify-center items-center pt-8">
                          <div className="w-full max-w-2xl mb-8 p-6 rounded-2xl bg-white/5 border border-yellow-900/20">
                            <p
                              className="text-yellow-100 text-xl md:text-2xl leading-relaxed font-serif font-light tracking-wide px-4"
                              style={{
                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                              }}
                            >
                              {wish.message}
                            </p>
                          </div>
                        </div>

                        {/* ===== SIGNATURE BAR ===== */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-8">
                          <div
                            className="h-0.5 rounded-full flex-1"
                            style={{
                              background:
                                "linear-gradient(to right, transparent, #facc15, transparent)",
                            }}
                            aria-hidden="true"
                          />
                          <p className="text-yellow-400 text-sm font-light uppercase tracking-widest mx-4">
                            {data.labelPrefix} {activeIndex + 1} /{" "}
                            {data.wishes.length}
                          </p>
                          <div
                            className="h-0.5 rounded-full flex-1"
                            style={{
                              background:
                                "linear-gradient(to left, transparent, #facc15, transparent)",
                            }}
                            aria-hidden="true"
                          />
                        </div>

                        {/* ===== GLOW BORDER ===== */}
                        <div
                          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            boxShadow:
                              "0 0 0 2px rgba(250, 204, 21, 0.2), inset 0 0 0 2px rgba(250, 204, 21, 0.1)",
                            filter: "drop-shadow(0 0 20px rgba(250, 204, 21, 0.3))",
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ===== NAVIGATION BUTTONS ===== */}
        <button
          className="custom-prev absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          style={{
            background: "linear-gradient(135deg, #facc15 0%, #fbbf24 100%)",
            boxShadow: "0 8px 25px rgba(250, 204, 21, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          onClick={handlePrevClick}
          type="button"
          aria-label="Previous wish"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" aria-hidden="true" />
        </button>

        <button
          className="custom-next absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          style={{
            background: "linear-gradient(135deg, #facc15 0%, #fbbf24 100%)",
            boxShadow: "0 8px 25px rgba(250, 204, 21, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
          onClick={handleNextClick}
          type="button"
          aria-label="Next wish"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" aria-hidden="true" />
        </button>

        {/* ===== PROGRESS INDICATORS ===== */}
        <div
          className="flex justify-center gap-3 mt-12"
          role="tablist"
          aria-label="Wishes progress"
        >
          {data.wishes.map((_, idx) => (
            <div key={idx} className="relative" onClick={() => handleDotClick(idx)}>
              <button
                className={`w-3 h-3 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  activeIndex === idx ? "scale-125 shadow-lg" : "hover:scale-110"
                }`}
                style={{
                  background:
                    activeIndex === idx
                      ? "#facc15"
                      : "rgba(250, 204, 21, 0.4)",
                  boxShadow:
                    activeIndex === idx
                      ? "0 0 10px rgba(250, 204, 21, 0.5)"
                      : "none",
                  cursor: "pointer",
                }}
                aria-label={`Go to wish ${idx + 1}`}
                aria-current={activeIndex === idx ? "true" : "false"}
                role="tab"
              />

              {activeIndex > idx && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent left-full"
                  style={{ zIndex: -1 }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== CONFETTI PARTICLES ===== */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full shadow-lg pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: "3px",
            height: "3px",
            backgroundColor: particle.color,
            transform: `translateX(-50%) rotate(${particle.rotation}deg)`,
            zIndex: 25,
            boxShadow: `0 0 4px ${particle.color}`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        @keyframes modal-open {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal-open {
          animation: modal-open 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Mobile Navigation */
        @media (max-width: 768px) {
          .custom-prev,
          .custom-next {
            width: 3rem;
            height: 3rem;
          }

          .custom-prev {
            left: 1rem !important;
          }

          .custom-next {
            right: 1rem !important;
          }
        }

        /* Tablet Navigation */
        @media (min-width: 769px) and (max-width: 1024px) {
          .custom-prev {
            left: 1.5rem !important;
          }

          .custom-next {
            right: 1.5rem !important;
          }
        }

        /* Desktop Navigation */
        @media (min-width: 1025px) {
          .custom-prev {
            left: -2rem !important;
          }

          .custom-next {
            right: -2rem !important;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          * {
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
WishesEightPage.propTypes = {
  /**
   * Wedding data object containing wishes and page configuration
   * @type {Object}
   */
  userData: PropTypes.shape({
    pages: PropTypes.shape({
      ten_wishes: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        labelPrefix: PropTypes.string,
        wishes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired,
            message: PropTypes.string.isRequired,
            icon: PropTypes.oneOf(["Users", "Heart", "Gift", "Sparkles", "ChevronRight"]),
            from: PropTypes.string,
            relation: PropTypes.string,
          })
        ),
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
WishesEightPage.defaultProps = {
  userData: null,
};
