import React, { useState } from 'react';
import { Eye, Heart, Star, Sparkles, Crown } from 'lucide-react';

/**
 * GallerySection Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
const templates = [
  {
    id: 1,
    title: "Royal Rajasthani Palace",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1739909198159-a834175bd911?w=1080",
    likes: 1245,
    views: 8562,
    rating: 4.9,
    featured: true,
    description: "3D animated palace with floating marigolds"
  },
  {
    id: 2,
    title: "Modern Minimalist 3D",
    category: "Modern",
    image: "https://images.unsplash.com/photo-1732508027833-30f65d5657ee?w=1080",
    likes: 967,
    views: 4321,
    rating: 4.7,
    featured: false,
    description: "Sleek 3D geometry with ambient lighting"
  },
  {
    id: 3,
    title: "Sacred Lotus Garden",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1738225734899-30852be7e396?w=1080",
    likes: 1543,
    views: 10234,
    rating: 5.0,
    featured: true,
    description: "Floating lotus petals with divine light"
  }
];

export function GallerySection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 transition-all ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400 shadow-lg' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-gray-50 to-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent)]" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 bg-blue-100 px-4 py-2 rounded-full max-w-max mx-auto border border-blue-200">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Template Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
              Immersive Design Gallery
            </span>
          </h2>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => {
            const isHovered = hoveredCard === template.id;
            return (
              <div
                key={template.id}
                className="group relative overflow-hidden border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white/95
                          shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl
                          transform hover:scale-[1.04] hover:-translate-y-2 origin-center
                          transition-all duration-700 cursor-pointer border-blue-100 hover:border-blue-300
                          hover:[box-shadow:0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                onMouseEnter={() => setHoveredCard(template.id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="article"
                tabIndex={0}
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0,0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 hover:brightness-110"
                    loading="lazy"
                  />
                  
                  {/* Featured Badge */}
                  {template.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-gradient-to-r from-purple-500 to-yellow-400 text-white shadow-lg px-3 py-1 rounded-full text-sm font-bold border border-white/50 flex items-center gap-1 backdrop-blur-sm">
                        <Crown className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-semibold text-blue-600 border border-blue-200">
                    {template.category}
                  </div>

                  {/* Hover Overlay */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 flex items-end p-6">
                      <div className="w-full">
                        <h4 className="text-white font-bold text-lg mb-4 drop-shadow-2xl">{template.title}</h4>
                        <button 
                          className="w-full px-4 py-2 border border-white/50 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          <Sparkles className="w-4 h-4" />
                          Preview 3D
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 pt-4 pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                      {template.category}
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(template.rating)}
                      <span className="text-xs text-gray-500 font-medium">({template.rating})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors text-gray-900">
                    {template.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{template.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-red-400 text-red-400" />
                        <span>{template.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
