import React, { useState } from "react";
import { Menu, X, Heart, Sparkles, Crown, Settings } from "lucide-react";

/**
 * Header Component (Admin Toggle + Backend Ready)
 * - Toggle: isAdmin state (true = admin sees button)
 * - Admin click → redirects to /admin page
 * - Backend ready: Pass isAdmin from auth context
 * - Professional gradient background with pink overlay
 */
export function Header({ isAdmin = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminClick = () => {
    console.log("🚀 Redirecting to Admin Panel...");
    window.location.href = "/admin";
  };

  const userNavItems = [
    { name: "Home", href: "#home" },
    { name: "Templates", href: "#templates" },
    { name: "Services", href: "#services" },
    { name: "Experiences", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const mobileMenuItems = [
    { name: "Home", href: "#home", icon: Heart },
    { name: "3D Gallery", href: "#gallery", icon: Sparkles },
    { name: "Services", href: "#services", icon: Crown },
    { name: "Experiences", href: "#testimonials", icon: Heart },
    { name: "Pricing", href: "#pricing", icon: Crown },
    { name: "Contact", href: "#contact", icon: Heart },
  ];

  return (
    <header
      className="w-full z-50 sticky top-0 shadow-2xl"
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f8f6ff 25%, #ffe8f0 50%, #fff5f8 75%, #ffffff 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "2px solid rgba(236, 72, 153, 0.15)",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 3D Animated Logo */}
          <div
            className="w-44 h-28 flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
            role="banner"
          >
            
            <img
              src="./5.png"
              alt="DigiVivah logo"
              className="w-44 h-28 object-contain drop-shadow-md"
              loading="eager"
              decoding="async"
              draggable="false"
            />
          </div>
          

          {/* Desktop Navigation - ALWAYS USER NAV */}
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {userNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-indigo-600 transition-all duration-400 font-semibold py-2 px-4 rounded-xl hover:bg-gradient-to-r hover:from-pink-100/50 hover:to-purple-100/50 group backdrop-blur-sm hover:shadow-md -translate-y-0 hover:-translate-y-1"
                style={{
                  borderBottom: "2px solid transparent",
                  transition: "all 300ms ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderBottom = "2px solid #667eea";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderBottom = "2px solid transparent";
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Admin Button - VISIBLE ONLY FOR ADMINS */}
            {isAdmin && (
              <button
                onClick={handleAdminClick}
                className="flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 gap-2 shadow-lg hover:shadow-2xl hover:scale-105 text-white border-2 ml-4 transform hover:-translate-y-0.5 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
                  borderColor: "#fb923c",
                  animation: "pulse 2s ease-in-out infinite",
                }}
                aria-label="Go to Admin Panel"
              >
                <Settings className="h-4 w-4" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Desktop CTA - HIDDEN FOR ADMINS */}
          {/* {!isAdmin && (
            <div className="hidden md:flex">
              <button
                className="group relative px-8 py-3 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-500 rounded-2xl border-2 border-transparent overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1e40af 0%, #667eea 50%, #8b5cf6 100%)",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                }}
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin transition-transform duration-1000 inline" />
                Start Your Journey
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)",
                    transform: "skewX(-12deg) translateX(-100%)",
                    animation: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.style.animation = "shimmer 1s ease-in-out infinite";
                  }}
                />
              </button>
            </div>
          )} */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 border-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "linear-gradient(135deg, #f0f4ff, #ffe8f0)",
              borderColor: "#ec4899",
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-indigo-600" />
            ) : (
              <Menu className="h-6 w-6 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden py-8 border-t rounded-b-3xl shadow-2xl mt-2 -mx-4 px-4 transform transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 246, 255, 0.95) 50%, rgba(255, 232, 240, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderTopColor: "rgba(236, 72, 153, 0.15)",
            }}
          >
            <nav
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {mobileMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-800 hover:text-indigo-600 transition-all duration-400 font-semibold p-4 rounded-2xl group transform hover:scale-105 hover:shadow-xl backdrop-blur-sm border-2 border-transparent hover:border-pink-300 hover:-translate-x-2"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(102, 126, 234, 0.05))",
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-6 w-6 mr-4 text-indigo-600 flex-shrink-0 group-hover:animate-pulse" />
                    {item.name}
                  </a>
                );
              })}

              {/* Mobile Admin Button - VISIBLE ONLY FOR ADMINS */}
              {isAdmin && (
                <button
                  onClick={handleAdminClick}
                  className="mt-6 p-4 rounded-2xl font-bold text-base text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
                    borderColor: "#fb923c",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                >
                  <Settings className="inline mr-3 h-5 w-5" />
                  Admin Panel
                </button>
              )}

              {/* Mobile CTA - HIDDEN FOR ADMINS */}
              {/* {!isAdmin && (
                <button
                  className="group relative w-full mt-4 px-8 py-4 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 rounded-2xl border-2 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #667eea 50%, #8b5cf6 100%)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin transition-transform duration-1000 inline" />
                  Start Your 3D Journey
                </button>
              )} */}
            </nav>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
}
