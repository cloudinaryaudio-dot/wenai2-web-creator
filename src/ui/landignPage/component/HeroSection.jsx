import React from "react";
import { ArrowRight, Play, Sparkles, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

/**
 * HeroSection Component
 * Converted from TSX to JSX
 * Removed UI imports, using native HTML + Tailwind CSS
 * Enhanced with pink overlay and professional styling
 */
export function HeroSection() {

  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Multi-layered Background with 3D Depth */}
      {/* Multi-layered Background with 3D Depth */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1641279762487-33beaaf68775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY291cGxlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU4Mzc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Traditional Indian Wedding Couple"
          className="w-full h-full object-cover"
          loading="eager"
          style={{ transform: "scale(1.1) rotate(3deg)" }}
        />
        {/* Rose/Gold overlay - ENHANCED */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/60 via-pink-400/55 to-amber-500/50" />
        {/* Pink tint layer - STRONG */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 via-pink-400/40 to-transparent" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/10 to-transparent" />
        {/* Additional pink blend layer - HEAVY */}
        <div className="absolute inset-0 bg-pink-400/45 mix-blend-multiply" />
        {/* Extra pink radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-pink-500/30 to-transparent" />
      </div>

      {/* 3D Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Golden Mandala Patterns */}
        <div
          className="absolute top-20 right-16 w-32 h-32 opacity-30"
          style={{
            animation: "spin 20s linear infinite",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="w-full h-full rounded-full border-4 border-amber-400/40 shadow-lg"
            style={{ borderColor: "rgba(251, 191, 36, 0.4)" }}
          >
            <div
              className="w-full h-full rounded-full border-2 border-amber-500/60 m-2"
              style={{ borderColor: "rgba(217, 119, 6, 0.6)" }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/30 to-transparent m-1" />
            </div>
          </div>
        </div>

        {/* Floating Lotus Petals */}
        <div
          className="absolute top-32 left-20 w-6 h-6 rounded-full blur-sm"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(244, 63, 94, 0.6), rgba(244, 63, 94, 0.3))",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-48 right-32 w-4 h-4 rounded-full blur-sm"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(217, 119, 6, 0.6), rgba(217, 119, 6, 0.3))",
            animation: "float 6s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute bottom-32 left-32 w-5 h-5 rounded-full blur-sm"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(244, 63, 94, 0.5), rgba(244, 63, 94, 0.2))",
            animation: "float 6s ease-in-out infinite",
            animationDelay: "4s",
          }}
        />

        {/* Sacred Geometry */}
        <div
          className="absolute bottom-20 right-20 w-40 h-40 opacity-20"
          style={{ animation: "rotate 30s linear infinite" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-amber-400/40 transform rotate-45" />
            <div className="absolute inset-4 border border-amber-500/50 rounded-full" />
            <div className="absolute inset-8 border-2 border-amber-600/60 transform -rotate-12" />
          </div>
        </div>

        {/* Particle Light Rays */}
        <div
          className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-amber-400/70 to-transparent"
          style={{
            transform: "skewX(-12deg)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-40 bg-gradient-to-b from-rose-400/50 to-transparent"
          style={{
            transform: "skewX(6deg)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Main Content with 3D Typography */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 sm:mt-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* 3D Floating Badge */}
          <div
            className="mb-8 inline-block transform hover:scale-105 transition-all duration-500 mt-8 sm:mt-0"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          >
            <span
              className="inline-flex items-center px-6 py-3 rounded-full text-white border shadow-lg gap-2"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="text-lg sm:text-2xl text-white font-bold">
                Premium Wedding Experiences
              </span>
              <Heart
                className="w-5 h-5 text-rose-400 animate-pulse"
              />
            </span>
          </div>

          {/* 3D Typography with Depth */}
          <div className="mb-8 transform hover:scale-105 transition-all duration-700">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
              <span className="block text-white drop-shadow-2xl shadow-3d-strong">
                Where{" "}
                <span
                  style={{
                    color: "#fef3c7",
                    fontWeight: "bold",
                    textShadow: `
            0 0 10px rgba(251, 191, 36, 0.8),
            0 0 20px rgba(253, 211, 77, 0.6),
            0 0 30px rgba(251, 191, 36, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.3)
          `,
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                >
                  Dreams
                </span>
              </span>
              <span className="block text-white drop-shadow-2xl shadow-3d-strong">
                Meet{" "}
                <span
                  style={{
                    color: "#fef3c7",

                    fontWeight: "bold",
                    textShadow: `
            0 0 10px rgba(251, 191, 36, 0.8),
            0 0 20px rgba(253, 211, 77, 0.6),
            0 0 30px rgba(251, 191, 36, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.3)
          `,
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                >
                  Reality
                </span>
              </span>
            </h1>
          </div>

          {/* Enhanced Subtitle */}
          <div className="mb-12 transform hover:scale-105 transition-all duration-500">
            <p className="text-xl md:text-3xl lg:text-3xl text-white/95 leading-relaxed max-w-4xl mx-auto font-light">
              Experience the future of wedding invitations with stunning{" "}
              <span className="font-semibold text-amber-300">visuals</span>,
              immersive cultural elements , and{" "}
              <span className="font-semibold text-white">
                cutting-edge technology{" "}
              </span>
              that brings your story to life.
            </p>
          </div>

          {/* 3D Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 flex-wrap">
            <button
              onClick={() => { window.location.hash = "#templates"; }}
              className="group relative px-10 py-6 text-xl font-bold text-white rounded-2xl border-2 border-amber-400/30 overflow-hidden transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl"
              style={{ background: "linear-gradient(to right, #d4745f, #fbbf24, #d4745f)", boxShadow: "0 15px 40px rgba(212, 116, 95, 0.3)" }}
            >
              <Sparkles className="mr-3 h-6 w-6 group-hover:animate-spin" />
              Explore Designs
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <button
              onClick={() => navigate("/cards")}
              className="group relative px-10 py-6 text-xl font-bold text-white rounded-2xl border-2 border-white/40 overflow-hidden transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f43f5e 100%)", boxShadow: "0 15px 40px rgba(139, 92, 246, 0.35)" }}
            >
              <Heart className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform" />
              Create a Card
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>

            <button
              onClick={() => navigate("/admin")}
              className="group relative px-8 py-6 text-lg font-bold text-white rounded-2xl border-2 border-white/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl"
              style={{ background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(12px)" }}
            >
              <Star className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Admin
            </button>

            {/* Secondary Button */}
            {/* <button
      onClick={() => {
        window.location.hash = "#templates";
      }}
      className="group px-10 py-6 text-xl font-bold text-white rounded-2xl border-2 border-white/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center shadow-lg hover:shadow-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
      }}
    >
      <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
      Watch Demo
    </button> */}

          </div>

          {/* Enhanced 3D Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10 sm:mb-15">
            {[
              {
                number: "10+",
label: "Happy Couples",
icon: (props) => (
  <Heart
    {...props}
    fill="#ffffff"
    stroke="#fbbf24" 
    strokeWidth={2}
  />
),
color: "#f43f5e",


              },
              {
                number: "100+",
label: "3 Templates",
icon: (props) => (
  <Sparkles
    {...props}
    fill="none"
    stroke="#fbbf24"   // golden
    strokeWidth={2}
  />
),
color: "#fbbf24",

              },
              {
                number: "24/7",
                label: "VIP Support",
                icon: Star,
                color: "#fbbf24",
              },
              {
                number: "100%",
                label: "Satisfaction",
                icon: ArrowRight,
                color: "#10b981",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    animation: `slideUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 20px 50px rgba(236, 72, 153, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div className="flex flex-col items-center">
                    <Icon
                      className="w-8 h-8 mb-3 group-hover:animate-pulse"
                      style={{ color: stat.color }}
                    />
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rose-400/30 to-transparent" />
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 116, 95, 0.2), transparent)",
          animation: "pulse 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244, 63, 94, 0.2), transparent)",
          animation: "pulse 8s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
