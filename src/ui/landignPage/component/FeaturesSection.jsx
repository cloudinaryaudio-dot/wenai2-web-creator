import React from 'react';
import {
  Mail,
  Share2,
  Zap,
  Heart
} from 'lucide-react';

/**
 * FeaturesSection Component
 * 
 * 4 premium feature cards for online wedding invitations:
 * - Dynamic gradient icons with hover scaling
 * - Multi-stage hover animations (scale + lift + shadow)
 * - Responsive grid (1-4 columns)
 * - Glassmorphism backdrop blur cards with enhanced white blur
 * - Staggered entrance animations
 * - Enhanced pink background with professional styling
 */
const features = [
  {
    icon: Mail,
    title: "Easy Digital Invitations",
    description: "Send beautiful online wedding invitations instantly to all your guests with a simple click. Track who has opened and responded.",
    gradient: "from-blue-500 to-indigo-500",
    gradientStyle: "linear-gradient(135deg, #3b82f6, #6366f1)"
  },
  {
    icon: Share2,
    title: "Seamless Guest Sharing",
    description: "Guests can easily share invitations on social media and with friends. Real-time tracking and guest management made simple.",
    gradient: "from-emerald-500 to-teal-500",
    gradientStyle: "linear-gradient(135deg, #10b981, #14b8a6)"
  },
  {
    icon: Zap,
    title: "Instant Updates & Notifications",
    description: "Update event details anytime and notify all guests automatically. Changes appear instantly without resending invitations.",
    gradient: "from-amber-400 to-orange-500",
    gradientStyle: "linear-gradient(135deg, #fbbf24, #f97316)"
  },
  {
    icon: Heart,
    title: "Personalized Guest Experience",
    description: "Customize invitations for each guest with their name, plus-one options, and dietary preferences. Create a memorable first impression.",
    gradient: "from-rose-500 to-pink-500",
    gradientStyle: "linear-gradient(135deg, #f43f5e, #ec4899)"
  }
];

export function FeaturesSection() {
  return (
    <section 
      id="services" 
      className="py-24 relative overflow-hidden bg-white"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 250, 252, 0.9), rgba(255, 248, 250, 0.85), rgba(255, 245, 248, 0.8))'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orb 1 */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
            animation: 'pulse 6s ease-in-out infinite'
          }}
        />
        {/* Gradient orb 2 */}
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 116, 95, 0.5), transparent)',
            animation: 'pulse 8s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header */}
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(to right, #ec4899, #f43f5e, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(236, 72, 153, 0.3)'
            }}
          >
            Why Choose Vivah3D?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Create and send beautiful online wedding invitations with ease.
          </p>
        </div>

        {/* Features Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl transition-all duration-700 cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(25px)',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(236, 72, 153, 0.25)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.98)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
                }}
                role="article"
                aria-labelledby={`feature-${index}-title`}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(168, 85, 247, 0.05))'
                  }}
                />

                <div className="p-8 text-center relative z-10 h-full flex flex-col justify-between">
                  
                  {/* Icon Container */}
                  <div className="mb-8 flex justify-center">
                    <div 
                      className="relative p-5 rounded-2xl border border-white/30 transition-all duration-700"
                      style={{
                        background: feature.gradientStyle,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.2) rotate(5deg)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      <IconComponent className="h-10 w-10 text-white drop-shadow-lg" aria-hidden="true" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 
                      id={`feature-${index}-title`}
                      className="text-xl md:text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base transition-colors duration-300 group-hover:text-gray-800">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
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

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
