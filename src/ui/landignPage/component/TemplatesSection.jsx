import React from 'react';
import { Crown, Sparkles, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { usePriceStore } from '../../../db/store/useWeddingStore';

/**
 * TemplatesSection Component
 * 
 * Interactive wedding template showcase with:
 * - Enhanced card design with better visual hierarchy
 * - Smooth hover image zoom + gradient overlay
 * - Premium pricing badges with backdrop blur
 * - Feature lists with sparkle icons
 * - Direct template preview navigation
 * - Responsive 3-column grid layout
 * - Enhanced pink background with professional styling
 */
export function TemplatesSection() {
  const navigate = useNavigate();
  
const { userId, guestId } = useParams();

const data = usePriceStore(s => s.data);

  const templates = [
    {
      id: 1,
      name: "Royal Indian",
      slug: "Royal",
      username: "Parvati_Weds_Shiv",
      user_id:"08622ae6-6f40-4e77-8ba0-0b28ca2b62ae",
      category: "Traditional",
      image: "https://i.pinimg.com/1200x/1d/09/3c/1d093cad3860eb4b17e266e33ef866f9.jpg",
      price: data?.wedding ?? "₹2,100",
      icon: Crown,
      features: ["Special Design", "Traditional Motifs", "Royal Gold Theme"],
      badgeColor: "#d4745f",
      button:"Preview Template"
    },
    {
      id: 2,
      name: "Engagement",
      slug: "Engagement",
      username:"Arav_&_Priya",
      user_id:"ae1b40bf-d003-473c-a06d-104abc02f48b",
      category: "Contemporary",
      image: "https://i.pinimg.com/1200x/02/fe/f7/02fef7c5685f0c73e3097ff3bb107060.jpg",
      price: data?.engagement ?? "₹999",
      icon: Sparkles,
      features: ["Modern Design", "Social Share", "Easy Customization"],
      badgeColor: "#3b82f6",
      button:"Preview template"
    },
    {
      id: 3,
      name: "Bio-Data",
      slug: "Biodata",
      username: "Rahul_Singh_Rathod",
      user_id:"54713389-022c-4834-b297-d306e19d1d1b",
      category: "Royal",
      image: "https://i.pinimg.com/736x/b8/64/cf/b864cf05d576255fef982c47f4f02718.jpg",
      price: data?.biodata ?? "FREE",
      icon: Heart,
      features: ["Dreamy Effects", "Modern Design", "Customised Story"],
      badgeColor: "#ec4899",
      button:"Preview Package"
    }
  ];

  const ROUTE_CONFIG = {
  Biodata: {
    guest: false,
  },
  Royal: {
    guest: true,
  },
  Engagement: {
    guest: true,
  },
};


  const handlePreview = (slug, username, user_id) => {
  const config = ROUTE_CONFIG[slug];

  const path = config?.guest
    ? `/${slug}/${username}/${user_id}/1`
    : `/${slug}/${username}/${user_id}`;
    


  navigate(path, { state: { scrollToTop: true } });
};


userId, guestId
  return (
    <section 
      id="templates" 
      className="py-24 px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 250, 252, 0.9), rgba(255, 248, 250, 0.85), rgba(255, 245, 248, 0.8))'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orb top right */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4), transparent)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
        {/* Gradient orb bottom left */}
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)',
            animation: 'pulse 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <div 
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full max-w-max mx-auto border-2"
            style={{
              background: 'rgba(167, 139, 250, 0.15)',
              borderColor: 'rgba(167, 139, 250, 0.4)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Premium Templates</span>
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
            Choose Your Perfect Template
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Select from our carefully designed collection of beautiful wedding invitation templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  animation: `slideUp 0.6s ease-out forwards`,
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(236, 72, 153, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.92)';
                }}
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                  <img
                    src={template.image}
                    alt={`${template.name} wedding template`}
                    className="w-full h-full object-cover transition-transform duration-700"
                    style={{
                      transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3), transparent)'
                    }}
                  />

                  {/* Price Badge */}
                  <div 
                    className="absolute top-4 right-4 z-20 text-white px-4 py-2 rounded-full shadow-lg font-bold text-md border border-white/40 transform transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${template.badgeColor}, rgba(255, 255, 255, 0.1))`,
                      backdropFilter: 'blur(52px)',
                      boxShadow: `0 8px 24px rgba(255, 255, 255, 0.2)`
                    }}
                  >
                    {template.price}
                  </div>

                  {/* Category Badge */}
                  <div 
                    className="absolute top-4 left-4 z-20 px-4 py-1 rounded-full text-xs font-bold border transition-all duration-300 uppercase tracking-wide"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: template.badgeColor,
                      borderColor: `rgba(${parseInt(template.badgeColor.slice(1, 3), 16)}, ${parseInt(template.badgeColor.slice(3, 5), 16)}, ${parseInt(template.badgeColor.slice(5, 7), 16)}, 0.3)`,
                      backdropFilter: 'blur(12px)'
                    }}
                  >
                    {template.category}
                  </div>

                  {/* Hover Info */}
                  <div 
                    className="absolute inset-0 z-10 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <div className="w-full">
                      <h4 className="font-bold text-2xl text-white mb-3 drop-shadow-lg">{template.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.features.slice(0, 2).map((feature, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md"
                            style={{
                              background: 'rgba(255, 255, 255, 0.25)',
                              borderColor: 'rgba(255, 255, 255, 0.4)',
                              color: '#ffffff'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  {/* Header with Icon */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div 
                        className="p-3 rounded-2xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, rgba(${parseInt(template.badgeColor.slice(1, 3), 16)}, ${parseInt(template.badgeColor.slice(3, 5), 16)}, ${parseInt(template.badgeColor.slice(5, 7), 16)}, 0.15), rgba(${parseInt(template.badgeColor.slice(1, 3), 16)}, ${parseInt(template.badgeColor.slice(3, 5), 16)}, ${parseInt(template.badgeColor.slice(5, 7), 16)}, 0.05))`,
                          backdropFilter: 'blur(12px)'
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: template.badgeColor }} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                        {template.name}
                      </h3>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5">
                      {template.features.map((feature, i) => (
                        <li 
                          key={i} 
                          className="text-sm text-gray-600 flex items-center gap-3 transition-colors duration-300 group-hover:text-gray-900"
                        >
                          <Sparkles className="w-4 h-4 flex-shrink-0 group-hover:animate-pulse" style={{ color: template.badgeColor }} />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button 
                    className="w-full text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 py-3 border-0 transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${template.badgeColor}, rgba(${parseInt(template.badgeColor.slice(1, 3), 16)}, ${parseInt(template.badgeColor.slice(3, 5), 16)}, ${parseInt(template.badgeColor.slice(5, 7), 16)}, 0.8))`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(template.slug, template.username, template.user_id );
                    }}
                  >
                    {template.button} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
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
