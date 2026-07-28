import React from "react";
import { useNavigate } from "react-router-dom";
// import { useWeddingStore } from "../../../db/store/useWeddingStore";

/**
 * Welcome Card – Enhanced Rose Gold Version
 * Fixed for mobile alignment and improved responsiveness
 */
function WelcomeCard({ onContinue, userData }) {
  const navigate = useNavigate();
  const [btnText, setBtnText] = React.useState("Open Invitation");
  // const data = useWeddingStore( (s) => s.WelcomeCardData());
  const data = userData?.pages?.three_splash;
  
  const handleOpen = () => {
    setBtnText("Opening…");
    setTimeout(() => {
      navigate("/4");
    }, 500);
  };

  return (

    <div
      role="dialog"
      aria-modal="true"
      className="w-full h-screen flex items-center justify-center px-0 sm:px-4 py-4 sm:py-12"
      style={{
        minHeight: '100vh',
      }}
    >
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20">
          {/* Top Rose-Gold Gradient Header */}
          <div
            className="w-full py-16 sm:py-20 px-4 sm:px-8 flex flex-col items-center text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #ffe4e1 0%, #f8b4b4 0%, #ec8f6a 20%, #d4745f 100%)",
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-6 right-4 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>

            {/* Heart Icon */}
            <div className="mb-6 relative z-10">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
              >
                <path
                  d="M12 21s-7-4.35-9-7.25A5.5 5.5 0 0112 3a5.5 5.5 0 019 10.75C19 16.65 12 21 12 21z"
                  fill="#ffffffee"
                />
                <path
                  d="M12 21s-7-4.35-9-7.25A5.5 5.5 0 0112 3a5.5 5.5 0 019 10.75C19 16.65 12 21 12 21z"
                  stroke="rgba(200,40,50,0.3)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white drop-shadow-lg relative z-10 px-2 leading-tight">
              {data.welcomeTitle}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl lg:text-lg text-white/95 max-w-2xl leading-relaxed relative z-10 px-2">
              {data.welcomeSubtitle}
            </p>

            {/* Divider */}
            <div className="mt-8 sm:mt-10 w-40 sm:w-48 h-1 rounded-full bg-gradient-to-r from-white/40 via-white to-white/40 relative z-10" />
          </div>

          {/* Lower section */}
          <div
            className="p-6 sm:p-10 flex flex-col justify-center items-center backdrop-blur-xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fdf2f0 0%, #fce8e4 50%, #f9ddd5 100%)",
            }}
          >
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-3xl"></div>

            {/* Description Text */}
            <div className="flex flex-col items-center gap-6 justify-center text-center mb-8 relative z-10 w-full px-2">
              <p className="text-xl sm:text-2xl lg:text-xl max-w-2xl text-center text-rose-800 leading-relaxed font-medium">
                {data.welcomeDescription}
              </p>
            </div>

            {/* Open Button */}
            <button
              onClick={onContinue ?? handleOpen}
              disabled={btnText === data.openingText}
              className="inline-flex items-center gap-3 rounded-full px-8 sm:px-10 py-4 sm:py-5 border-0 text-white font-semibold shadow-lg hover:scale-[1.06] active:scale-95 transition-all duration-200 relative z-10 disabled:opacity-75 text-lg sm:text-xl w-full sm:w-auto justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #d4745f 0%, #c85a4a 50%, #b8453a 100%)",
                boxShadow:
                  "0 10px 25px rgba(212, 116, 95, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (btnText !== "Opening…") {
                  e.currentTarget.style.transform = 'scale(1.06)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 -ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21s-7-4.35-9-7.25A5.5 5.5 0 0112 3a5.5 5.5 0 019 10.75C19 16.65 12 21 12 21z" />
              </svg>

              <span>{data.openInvitationText}</span>
            </button>

            {/* Help Text */}
            <div className="mt-8 sm:mt-10 text-lg sm:text-xl text-rose-900/70 text-center font-medium relative z-10 px-2">
              {data.welcomeHelpText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Export Component
 */
export default function WelcomeOverlayDemo({ onContinue, userData }) {
  return (
    <div
      className="min-h-screen w-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fff5f3 0%, #fce8e4 50%, #f9ddd5 100%)",
      }}
    >
      <WelcomeCard onContinue={onContinue} userData={userData} />
    </div>
  );
}
