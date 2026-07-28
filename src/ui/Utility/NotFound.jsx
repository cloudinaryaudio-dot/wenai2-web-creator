import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-rose-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
        
        {/* Illustration - 404 with elegant design */}
        <div className="w-full max-w-xs sm:max-w-sm aspect-square flex items-center justify-center mb-4 sm:mb-6">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full max-w-xs sm:max-w-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle cx="100" cy="100" r="95" fill="#FEF3C7" opacity="0.3" stroke="#F59E0B" strokeWidth="2" />
            
            {/* Decorative elements */}
            <path d="M 30 50 Q 50 30 70 40" stroke="#FB923C" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 170 160 Q 150 180 130 170" stroke="#FB923C" strokeWidth="2" fill="none" strokeLinecap="round" />
            
            {/* Question mark shape */}
            <circle cx="70" cy="80" r="18" fill="#F59E0B" opacity="0.2" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="70" y="92" fontSize="40" fontWeight="bold" fill="#D97706" textAnchor="middle" fontFamily="system-ui">?</text>
            
            <circle cx="130" cy="100" r="20" fill="#FB923C" opacity="0.2" stroke="#FB923C" strokeWidth="1.5" />
            <text x="130" y="115" fontSize="44" fontWeight="bold" fill="#EA580C" textAnchor="middle" fontFamily="system-ui">0</text>
            
            <circle cx="100" cy="160" r="15" fill="#FBBF24" opacity="0.2" stroke="#FBBF24" strokeWidth="1.5" />
            <text x="100" y="171" fontSize="28" fontWeight="bold" fill="#D97706" textAnchor="middle" fontFamily="system-ui">4</text>

            {/* Connecting lines */}
            <line x1="85" y1="85" x2="115" y2="95" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            <line x1="110" y1="118" x2="105" y2="145" stroke="#FB923C" strokeWidth="1.5" opacity="0.4" strokeDasharray="2,2" />
            
            {/* Stars/sparkles */}
            <circle cx="40" cy="100" r="2" fill="#FB923C" />
            <circle cx="160" cy="80" r="2" fill="#F59E0B" />
            <circle cx="150" cy="140" r="2" fill="#FB923C" />
            <circle cx="50" cy="150" r="2" fill="#FBBF24" />
          </svg>
        </div>

        {/* Main headline - mobile optimized */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900">
            Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            We couldn't find what you're looking for
          </p>
        </div>

        {/* Description text - mobile friendly */}
        <div className="w-full">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
            The page you're trying to access might have been removed, renamed, or is temporarily unavailable. 
            But don't worry, our wedding team is here to help!
          </p>
        </div>

        {/* CTA Button - mobile first */}
        <a
          href="/"
          className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 text-white font-semibold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transform transition-all duration-300 border-2 border-green-500/50 hover:border-green-400/70 hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Return to homepage"
        >
          <svg className="w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 group-hover:-rotate-12 group-active:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-sm sm:text-base">Back to Home</span>
        </a>

        {/* Quick links - mobile optimized */}
        {/* <div className="w-full pt-4 sm:pt-6 border-t border-amber-200/50">
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Need help?</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
            <a
              href="/"
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-amber-700 bg-amber-50/80 border border-amber-200 rounded-lg hover:bg-amber-100/80 transition-colors duration-200 active:bg-amber-200/80"
            >
              Home
            </a>
            <a
              href="/#contact"
              className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-amber-700 bg-amber-50/80 border border-amber-200 rounded-lg hover:bg-amber-100/80 transition-colors duration-200 active:bg-amber-200/80"
            >
              Contact
            </a>
          </div>
        </div> */}

        {/* Status indicator - minimal */}
        <div className="w-full pt-4 sm:pt-6">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Status: All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
