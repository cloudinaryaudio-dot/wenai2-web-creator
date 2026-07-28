import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Sparkles, Heart } from "lucide-react";

/**
 * NoteTwelvePage - Special note/request section with elegant styling
 * @param {Object} userData - Wedding data containing note content
 * @returns {React.ReactElement|null} Note section or null if no data
 */
export default function NoteTwelvePage({ userData }) {
  // === EARLY RETURN: Handle missing or empty data
  const data = userData?.pages?.fourteen_note;

  if (
    !data ||
    !data.headerTitle ||
    !data.paragraphs ||
    data.paragraphs.length === 0
  ) {
    return null;
  }

  // === DERIVED STATE ===
  const paragraphContent = useMemo(() => {
    const { paragraphs } = data;
    return {
      firstParagraph: paragraphs[0],
      mainParagraph: {
        part1: paragraphs[1],
        highlight1: paragraphs[2],
        part2: paragraphs[3],
        highlight2: paragraphs[4],
        part3: paragraphs[5],
      },
      finalParagraph: paragraphs[6],
      signature: data.signature,
    };
  }, [data]);

  // === RENDER ===
  return (
    <div className="max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* ===== HEADER SECTION ===== */}
      <div className="relative text-center mb-6 pt-4 pb-2 px-4 md:px-0">
        {/* ===== DECORATIVE ELEMENTS ===== */}
        <Heart
          className="absolute top-0 left-1/4 w-4 h-4 text-rose-400 animate-pulse"
          style={{ animationDelay: "0s" }}
          aria-hidden="true"
        />
        <Sparkles
          className="absolute top-0 right-1/4 w-3 h-3 text-yellow-400 animate-pulse"
          style={{ animationDelay: "0.5s" }}
          aria-hidden="true"
        />
        <Heart
          className="absolute bottom-0 left-1/2 w-3 h-3 text-pink-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
          aria-hidden="true"
        />

        {/* ===== ICON BADGE ===== */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto bg-gradient-to-br from-rose-500/20 via-yellow-500/20 to-amber-500/20 rounded-3xl p-2 shadow-2xl border-2 border-white/30">
          <Sparkles
            className="w-8 h-8 text-rose-600"
            aria-hidden="true"
          />
        </div>

        {/* ===== MAIN TITLE ===== */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-2xl mb-4">
          {data.headerTitle}
        </h2>

        {/* ===== SUBTITLE WITH ICONS ===== */}
        <div className="flex justify-center items-center gap-3 text-sm text-yellow-200 px-4 flex-wrap">
          <Sparkles
            className="w-3 h-3 text-yellow-400 animate-pulse flex-shrink-0"
            aria-hidden="true"
          />
          <span>{data.headerSubtitle}</span>
          <Sparkles
            className="w-3 h-3 text-yellow-400 animate-pulse flex-shrink-0"
            style={{ animationDelay: "0.3s" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ===== NOTE CARD ===== */}
      <div className="relative bg-gradient-to-br from-white/15 to-amber-50/10 rounded-3xl border-2 border-yellow-400/30 backdrop-blur-xl shadow-2xl overflow-hidden p-6 md:p-8 mx-5 md:mx-auto lg:mx-auto">
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

        {/* ===== MAIN CONTENT ===== */}
        <div className="relative z-10 text-center space-y-4">
          <div className="space-y-3">
            {/* ===== FIRST PARAGRAPH ===== */}
            <p className="text-xl md:text-base text-white drop-shadow-lg leading-relaxed">
              {paragraphContent.firstParagraph}
            </p>

            {/* ===== MAIN PARAGRAPH WITH HIGHLIGHTS ===== */}
            <p className="text-lg md:text-base text-yellow-200/95 drop-shadow-lg font-semibold leading-relaxed">
              {paragraphContent.mainParagraph.part1}{" "}
              <span className="text-rose-300">
                {paragraphContent.mainParagraph.highlight1}
              </span>{" "}
              {paragraphContent.mainParagraph.part2}{" "}
              <span className="text-rose-300">
                {paragraphContent.mainParagraph.highlight2}
              </span>{" "}
              {paragraphContent.mainParagraph.part3}
            </p>

            {/* ===== FINAL PARAGRAPH ===== */}
            <p className="text-xl md:text-base text-white drop-shadow-lg leading-relaxed">
              {paragraphContent.finalParagraph}
            </p>

            {/* ===== SIGNATURE ===== */}
            <div className="pt-4 border-t border-yellow-400/30">
              <p className="text-2xl md:text-base text-yellow-100 drop-shadow-lg font-serif italic">
                {paragraphContent.signature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ PROP VALIDATION
NoteTwelvePage.propTypes = {
  /**
   * Wedding data object containing note content and configuration
   * @type {Object}
   */
  userData: PropTypes.shape({
    pages: PropTypes.shape({
      fourteen_note: PropTypes.shape({
        headerTitle: PropTypes.string.isRequired,
        headerSubtitle: PropTypes.string,
        paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
        signature: PropTypes.string.isRequired,
      }),
    }),
  }),
};

// ✅ DEFAULT PROPS
NoteTwelvePage.defaultProps = {
  userData: null,
};
