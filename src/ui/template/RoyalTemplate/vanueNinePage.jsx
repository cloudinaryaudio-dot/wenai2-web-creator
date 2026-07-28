import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { MapPin, Navigation, Calendar, Clock, Phone } from "lucide-react";

/**
 * VenueNinePage - Wedding venue showcase with directions and contact
 * @param {Object} userData - Wedding data containing venue information and assets
 * @returns {React.ReactElement|null} Venue section or null if no venue image
 */
export default function VenueNinePage({ userData }) {
  // === EARLY RETURN: Handle missing or empty data
  const data = userData?.pages?.eleven_venue;
  const venueImage = userData?.assets?.venueImage;

  if (!data || !venueImage) {
    return null;
  }

  // === HANDLERS ===
  const handleGetDirection = useCallback(() => {
    if (data.mapUrl) {
      window.open(data.mapUrl, "_blank", "noopener,noreferrer");
    }
  }, [data.mapUrl]);

  const handleCall = useCallback(() => {
    if (data.telLink) {
      window.location.href = data.telLink;
    }
  }, [data.telLink]);

  // === RENDER ===
  return (
    <section className="min-h-screen flex flex-col py-8 px-4">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
        {/* ===== CARD CONTAINER ===== */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* ===== FULL HEIGHT VENUE IMAGE ===== */}
          <div className="relative h-screen max-h-[700px] overflow-hidden">
            <img
              src={venueImage}
              alt={data.venueName || "Wedding Venue"}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* ===== GRADIENT OVERLAYS ===== */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-r from-black/15 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-l from-black/15 to-transparent" aria-hidden="true" />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center bottom, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* ===== CONTENT OVERLAY AT BOTTOM ===== */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-center">
              {/* ===== VENUE TITLE ===== */}
              <div className="mb-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-2xl mb-2">
                  {data.eventTitle}
                </h2>
                <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg flex items-center justify-center gap-2">
                  <MapPin
                    className="w-5 h-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {data.venueName}
                </p>
              </div>

              {/* ===== VENUE DETAILS ===== */}
              <div className="mb-4 space-y-3">
                <p className="text-white text-base md:text-lg flex items-center justify-center gap-2">
                  <MapPin
                    className="w-4 h-4 text-amber-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{data.venueAddress}</span>
                </p>

                <div className="text-white text-base md:text-lg flex flex-col sm:flex-row items-center justify-center gap-4">
                  <span className="flex items-center gap-2">
                    <Calendar
                      className="w-4 h-4 text-amber-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{data.eventDate}</span>
                  </span>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-2">
                    <Clock
                      className="w-4 h-4 text-amber-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{data.eventTime}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto mt-8">
        <div className="flex flex-col sm:flex-row gap-3 px-4">
          {/* ===== GET DIRECTION BUTTON ===== */}
          {data.mapUrl && (
            <button
              onClick={handleGetDirection}
              className="group relative overflow-hidden flex-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black font-bold py-3 px-6 rounded-2xl shadow-[0_10px_35px_rgba(251,191,36,0.5)] hover:shadow-[0_10px_45px_rgba(251,191,36,0.7)] transition-all duration-300 flex items-center justify-center hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              aria-label="Get directions to venue"
            >
              {/* Golden shimmer */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300/80 to-amber-400/80 opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300"
                aria-hidden="true"
              />

              {/* Shine animation */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full ease-out duration-[800ms]"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-center gap-2">
                <Navigation
                  className="w-5 h-5 group-hover:rotate-12 transition-all duration-300 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-lg md:text-xl tracking-wide font-medium">
                  {data.directionLabel || "Get Directions"}
                </span>
              </div>

              {/* Golden pulse */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-300/20 to-amber-400/20 group-hover:animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-500"
                aria-hidden="true"
              />
            </button>
          )}

          {/* ===== PHONE BUTTON ===== */}
          {data.phone && data.telLink && (
            <button
              onClick={handleCall}
              className="group relative overflow-hidden flex-1 bg-gradient-to-r from-white to-yellow-50/90 backdrop-blur-xl text-yellow-800 font-bold py-3 px-6 rounded-2xl shadow-[0_10px_35px_rgba(251,191,36,0.3)] hover:shadow-[0_10px_45px_rgba(251,191,36,0.5)] border border-yellow-300/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              aria-label={`Call venue at ${data.phone}`}
            >
              {/* Subtle golden overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-white/20 to-amber-100/30 opacity-0 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-300 backdrop-blur-xl"
                aria-hidden="true"
              />

              {/* Border glow */}
              <div
                className="absolute inset-0 rounded-2xl border border-yellow-300/40"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-center gap-2">
                <Phone
                  className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 text-yellow-700 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-lg md:text-xl tracking-wide font-medium">
                  {data.phone}
                </span>
              </div>

              {/* Inner glass shine */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-yellow-50/20 to-transparent"
                aria-hidden="true"
              />

              {/* Subtle sweep */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full ease-linear duration-[600ms] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ✅ PROP VALIDATION
VenueNinePage.propTypes = {
  /**
   * Wedding data object containing venue information and configuration
   * @type {Object}
   */
  userData: PropTypes.shape({
    assets: PropTypes.shape({
      venueImage: PropTypes.string,
    }),
    pages: PropTypes.shape({
      eleven_venue: PropTypes.shape({
        eventTitle: PropTypes.string.isRequired,
        venueName: PropTypes.string.isRequired,
        venueAddress: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
        eventTime: PropTypes.string.isRequired,
        phone: PropTypes.string,
        telLink: PropTypes.string,
        directionLabel: PropTypes.string,
        mapUrl: PropTypes.string,
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
VenueNinePage.defaultProps = {
  userData: null,
};
