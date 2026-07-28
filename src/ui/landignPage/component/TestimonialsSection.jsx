import React from 'react';
import { Star } from 'lucide-react';

/**
 * TestimonialsSection Component
 * 
 * Premium testimonial grid with:
 * - Animated floating profile images
 * - Dynamic star rating system (5-star)
 * - Glassmorphism hover cards with enhanced blur
 * - Italic quote typography
 * - Responsive 3-column layout
 * - Staggered entrance animations
 * - Enhanced pink background with professional styling
 * - Hindi testimonials with appreciating words
 */
export function TestimonialsSection() {
  const testimonials = [ 

    {
      name: "प्रिया & राहुल",
      image: "https://i.pinimg.com/1200x/7b/12/d2/7b12d287221c0adf5b4efcdf326c178f.jpg",
      text: "digiVivah का डिजिटल निमंत्रण हमारी उम्मीदों से कहीं बेहतर था। मेहमानों ने इसके डिज़ाइन और रचनात्मकता की खूब सराहना की। यह हमारे लिए एक यादगार अनुभव रहा।",
      rating: 5,
      city: "इंदौर"
    },
    {
      name: "आनंद्या & अर्जुन",
      image: "https://i.pinimg.com/1200x/7b/12/d2/7b12d287221c0adf5b4efcdf326c178f.jpg",
      text: "digiVivah की टीम की पेशेवर सोच और सहयोग काबिले-तारीफ है। डिज़ाइन से लेकर सेवा तक सब कुछ बेहद सहज और शानदार रहा। हम निश्चिंत होकर digiVivah की सिफारिश करते हैं।",
      rating: 5,
      city: "उज्जैन"
    },
    {
      name: "स्नेहा & विक्रम",
      image: "https://i.pinimg.com/1200x/7b/12/d2/7b12d287221c0adf5b4efcdf326c178f.jpg",
      text: "पारंपरिक भारतीय डिज़ाइन और आधुनिक तकनीक का बेहतरीन मेल देखने को मिला।  हर छोटी बात पर ध्यान दिया गया था।  digiVivah ने हमारे विवाह को सच में खास बना दिया। ",
      rating: 5,
      city: "देवास"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i}
        className="w-5 h-5 transition-all duration-300"
        style={{
          fill: i < rating ? '#fbbf24' : 'none',
          color: i < rating ? '#fbbf24' : '#d1d5db',
          filter: i < rating ? 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))' : 'none'
        }}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      className="py-28 px-4 relative overflow-hidden bg-white"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 250, 252, 0.9), rgba(255, 248, 250, 0.85), rgba(255, 245, 248, 0.8))'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orb 1 - Enhanced */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        {/* Gradient orb 2 - Enhanced */}
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(212, 116, 95, 0.4), transparent)',
            animation: 'pulse 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        {/* Gradient orb 3 */}
        <div 
          className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)',
            animation: 'pulse 12s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div 
            className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full max-w-max mx-auto backdrop-blur-xl border-2 transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(212, 116, 95, 0.2)',
              borderColor: 'rgba(212, 116, 95, 0.4)'
            }}
          >
            <Star className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-lg font-semibold text-gray-800 tracking-wide">यूज़र रिव्यू  </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              background: 'linear-gradient(to right, #ec4899, #f43f5e, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            
हमारे ग्राहकों के अनुभव  


          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            जानिए digiVivah के बारे में लोगों की सच्ची राय
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {testimonials.map((testimonial, index) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-3xl transition-all duration-700 cursor-pointer h-full flex flex-col"
      style={{
        background: "rgba(255, 255, 255, 0.93)",
        backdropFilter: "blur(25px)",
        border: "2px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        animation: "slideUp 0.6s ease-out forwards",
        animationDelay: `${index * 150}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-16px) scale(1.02)";
        e.currentTarget.style.boxShadow =
          "0 25px 60px rgba(236, 72, 153, 0.3)";
        e.currentTarget.style.borderColor =
          "rgba(251, 191, 36, 0.6)";
        e.currentTarget.style.background =
          "rgba(255, 255, 255, 0.96)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow =
          "0 8px 32px rgba(0, 0, 0, 0.08)";
        e.currentTarget.style.borderColor =
          "rgba(255, 255, 255, 0.8)";
        e.currentTarget.style.background =
          "rgba(255, 255, 255, 0.93)";
      }}
    >
      {/* Hover Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.05), rgba(236,72,153,0.05))",
        }}
      />

      {/* Badge */}
      <div
        className="absolute top-4 right-4 w-12 h-12 rounded-2xl backdrop-blur-sm border opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.3), rgba(244,63,94,0.2))",
          borderColor: "rgba(251,191,36,0.4)",
        }}
      >
        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between relative z-10">
        <div className="mb-6">
          {/* Profile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 text-center sm:text-left">
            <div className="relative flex-shrink-0 w-20 h-20">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full rounded-2xl object-cover"
                style={{
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  border: "4px solid rgba(251,191,36,0.3)",
                }}
                loading="lazy"
              />
            </div>

            <div className="min-w-0 flex-1 pt-1 flex flex-col items-center sm:items-start">
              <h3 className="text-xl sm:text-lg font-bold text-gray-900 mb-2 leading-tight transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-pink-500 group-hover:bg-clip-text">
                {testimonial.name}
              </h3>

              <div className="flex gap-0.5 mb-1 justify-center sm:justify-start">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-xl sm:text-xs text-gray-600 font-semibold tracking-wide">
                {testimonial.city}
              </p>
            </div>
          </div>

          {/* Review Text */}
          <blockquote
            className="text-lg sm:text-base leading-relaxed font-normal relative transition-all duration-500 group-hover:text-gray-900"
            style={{
              color: "rgba(107,114,128,0.95)",
              fontStyle: "italic",
              fontFamily: '"Segoe UI", sans-serif',
            }}
          >
            <span
              className="text-4xl sm:text-3xl font-serif"
              style={{ color: "#fbbf24", marginRight: "4px" }}
            >
              "
            </span  >
            <span className='text-xl font-extrabold' >{testimonial.text}</span>
            <span
              className="text-4xl sm:text-3xl font-serif"
              style={{ color: "#fbbf24", marginLeft: "4px" }}
            >
              "
            </span>
          </blockquote>
        </div>

        {/* Decorative */}
        <div
          className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            color: "#fbbf24",
            fontSize: "4rem",
            lineHeight: "1",
          }}
        >
          ✦
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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
