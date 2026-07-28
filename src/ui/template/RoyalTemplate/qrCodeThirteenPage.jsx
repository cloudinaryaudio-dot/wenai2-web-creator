import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Camera,
  Heart,
  Sparkles,
  Star,
  Rose,
} from "lucide-react";

/**
 * QrCodeThirteenPage - QR code gallery showcase with elegant styling
 * @param {Object} userData - Wedding data containing QR gallery information and assets
 * @returns {React.ReactElement|null} QR gallery section or null if no data
 */
export default function QrCodeThirteenPage({ userData }) {
  // === EARLY RETURN: Handle missing or empty data
  const data = userData?.pages?.fifteen_qrGallery;
  const qrImage = userData?.assets?.qrGallery;

  if (!data || !qrImage || !data.galleryUrl) {
    return null;
  }

  // === HANDLERS ===
  const handleGalleryClick = useCallback(() => {
    window.open(data.galleryUrl, "_blank", "noopener,noreferrer");
  }, [data.galleryUrl]);

  // === RENDER ===
  return (
    <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto mt-20">
      {/* ===== HEADER SECTION ===== */}
      <div className="relative text-center mx-auto px-4">
        {/* ===== DECORATIVE ELEMENTS ===== */}
        <Heart
          className="absolute top-0 left-1/4 w-4 h-4 text-rose-300 animate-pulse"
          style={{ animationDelay: "0s" }}
          aria-hidden="true"
        />
        <Heart
          className="absolute top-0 right-1/4 w-3 h-3 text-yellow-400 animate-pulse"
          style={{ animationDelay: "0.5s" }}
          aria-hidden="true"
        />
        <Rose
          className="absolute bottom-0 left-1/2 w-3 h-3 text-pink-300 animate-bounce"
          style={{ animationDelay: "0.2s" }}
          aria-hidden="true"
        />

        {/* ===== ICON BADGE ===== */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto bg-gradient-to-br from-rose-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl p-2 shadow-2xl border-2 border-white/30">
          <Camera
            className="w-8 h-8 text-yellow-600"
            aria-hidden="true"
          />
        </div>

        {/* ===== MAIN TITLE ===== */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-2xl mb-2">
          {data.headerTitle}
        </h2>

        {/* ===== SUBTITLE ===== */}
        <p className="text-yellow-300 text-lg font-medium drop-shadow-lg mb-3">
          {data.headerSubtitle}
        </p>

        {/* ===== DESCRIPTION WITH ICONS ===== */}
        <div className="flex justify-center items-center gap-3 text-xl text-yellow-200 flex-wrap">
          <Sparkles
            className="w-3 h-3 text-yellow-400 animate-pulse flex-shrink-0"
            aria-hidden="true"
          />
          <span>{data.headerDescription}</span>
          <Sparkles
            className="w-3 h-3 text-yellow-400 animate-pulse flex-shrink-0"
            style={{ animationDelay: "0.3s" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ===== QR CODE SECTION ===== */}
      <div className="relative bg-gradient-to-br from-white/15 to-amber-50/10 rounded-3xl border-2 border-yellow-400/30 backdrop-blur-xl shadow-2xl overflow-hidden p-6 md:p-8 mb-6 mx-5 md:mx-0">
        {/* ===== DECORATIVE CORNERS ===== */}
        <div
          className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-rose-400/20 to-yellow-400/20 rounded-tl-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-rose-400/20 rounded-tr-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-amber-400/20 to-yellow-400/20 rounded-bl-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-amber-400/20 to-amber-400/20 rounded-br-3xl"
          aria-hidden="true"
        />

        {/* ===== BACKGROUND PATTERN ===== */}
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=30 height=30 viewBox=0 0 30 30 xmlns=http%3A%2F%2Fwww.w3.org%2F2000/svg%3E%3Cg fill=%23fbbf24 fill-opacity=0.05%3E%3Cpolygon points=25,15 25,25 15,25 15,15%2F%3E%3C/g%3E%3C/svg%3E')] opacity-30"
          aria-hidden="true"
        />

        {/* ===== QR CONTAINER ===== */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-white rounded-2xl border-2 border-yellow-400/50 shadow-inner p-4 md:p-6 lg:p-8">
            <img
              src={qrImage}
              alt={data.qrAlt || "QR Code to Gallery"}
              className="w-full h-full block mx-auto shadow-sm"
              loading="lazy"
            />
          </div>

          {/* ===== QR INFO ===== */}
          <div className="text-center mt-6">
            <p className="text-yellow-100 text-xl md:text-base font-medium mb-2">
              {data.scanTitle}
            </p>
            <p className="text-yellow-200/90 text-xs md:text-sm">
              {data.scanSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* ===== FEATURE BUTTON ===== */}
      <button
        onClick={handleGalleryClick}
        className="w-full px-5 md:px-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded-2xl"
        aria-label="Open wedding gallery"
      >
        <div className="mx-5 md:mx-0">
          <div className="relative flex items-center justify-center p-4 mx-auto bg-gradient-to-br from-rose-50/80 to-amber-50/80 backdrop-blur-sm rounded-2xl border border-yellow-400/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
            <div className="flex items-center gap-3 text-center">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex-shrink-0">
                <Camera
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="text-left">
                <p className="text-yellow-900 font-semibold text-sm md:text-base mb-1">
                  {data.featureTitle}
                </p>
                <p className="text-yellow-800 text-xs md:text-sm">
                  {data.featureActions && data.featureActions.length > 0
                    ? data.featureActions.join(" • ")
                    : "View wedding photos"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* ===== FOOTER SECTION ===== */}
      <div className="text-center mt-8 pb-8 mx-auto px-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Heart
            className="w-4 h-4 text-rose-400"
            aria-hidden="true"
          />
          <Star
            className="w-3 h-3 text-yellow-400 animate-pulse"
            aria-hidden="true"
          />
          <Heart
            className="w-4 h-4 text-rose-400"
            aria-hidden="true"
          />
        </div>
        <p className="text-yellow-300 text-sm md:text-base font-medium">
          📸 शादी की सभी यादगार फोटो यहाँ उपलब्ध हैं
        </p>
      </div>
    </div>
  );
}

// ✅ PROP VALIDATION
QrCodeThirteenPage.propTypes = {
  /**
   * Wedding data object containing QR gallery information
   * @type {Object}
   */
  userData: PropTypes.shape({
    assets: PropTypes.shape({
      qrGallery: PropTypes.string,
    }),
    pages: PropTypes.shape({
      fifteen_qrGallery: PropTypes.shape({
        headerTitle: PropTypes.string.isRequired,
        headerSubtitle: PropTypes.string,
        headerDescription: PropTypes.string,
        qrAlt: PropTypes.string,
        scanTitle: PropTypes.string,
        scanSubtitle: PropTypes.string,
        featureTitle: PropTypes.string,
        featureActions: PropTypes.arrayOf(PropTypes.string),
        galleryUrl: PropTypes.string.isRequired,
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
QrCodeThirteenPage.defaultProps = {
  userData: null,
};
