import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Video, Share2, Check, Star, Users, Gift, Image as ImageIcon, Zap, Drone, ArrowLeft, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

/**
 * PremiumPackageShowcase Component
 * Professional Wedding Photography & Digital Invitation Bundle
 * Showcases complete service offerings with modern design
 */
export default function PremiumPackageShowcase() {
  const [activeTab, setActiveTab] = useState('photography');
  const [showComparison, setShowComparison] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  if (location.state?.scrollToTop || location.pathname !== location.state?.from) {
    window.scrollTo(0, 0);
  }
}, [location.pathname]);

  const services = {
    photography: [
      {
        icon: Camera,
        title: "Pre-Wedding Shoot",
        description: "Beautiful romantic pre-wedding photoshoots at scenic locations",
        image: "https://weddingdiariesbyomp.com/wp-content/uploads/Prewedding-Shoot-in-Goa-1-1.webp",
        highlights: ["Couple Portraits", "Location Scouting", "Styling Guidance", "4K Photography"]
      },
      {
        icon: Heart,
        title: "Wedding Day",
        description: "Complete wedding ceremony and reception coverage",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Wedding_Ceremony_%28591%29.jpg/1200px-Indian_Wedding_Ceremony_%28591%29.jpg",
        highlights: ["Ceremony Coverage", "Reception Moments", "Candid Shots", "Family Portraits"]
      },
      {
        icon: ImageIcon,
        title: "Post-Wedding",
        description: "Intimate post-wedding photoshoots with professional styling",
        image: "https://i.pinimg.com/1200x/3c/2c/c7/3c2cc7b4b349a12d053a7531e57feaa8.jpg",
        highlights: ["Romantic Portraits", "Lifestyle Shots", "Cultural Attire", "Premium Editing"]
      }
    ],
    celebrations: [
      {
        icon: Gift,
        title: "Godh Bharai",
        description: "Professional coverage of the blessed maternal tradition",
        image: "https://i.pinimg.com/736x/02/33/7c/02337c9f022a7552e525b0288c7fdeed.jpg",
        highlights: ["Ceremony Photos", "Guest Moments", "Decorations", "Emotional Shots"]
      },
      {
        icon: Zap,
        title: "Baby Shower",
        description: "Joyful moments of celebration and family bonding",
        image: "https://i.pinimg.com/1200x/2b/9d/42/2b9d420cab17548de549e5413e0e194a.jpg",
        highlights: ["Event Coverage", "Guest Interactions", "Decorative Details", "Candid Moments"]
      },
      {
        icon: Users,
        title: "Family Events",
        description: "Birthday, anniversaries, and special family gatherings",
        image: "https://i.pinimg.com/736x/86/1b/60/861b60db24e0bb1aae5087bd18ec27ee.jpg",
        highlights: ["Event Documentation", "Group Photos", "Candid Captures", "Digital Archive"]
      }
    ],
    digital: [
      {
        icon: Drone,
        title: "Drone Photography",
        description: "Stunning aerial views and cinematic drone coverage",
        image: "https://i.pinimg.com/1200x/79/b0/42/79b04283a0624e302a58fd156ab333a7.jpg",
        highlights: ["Aerial Perspectives", "Venue Overview", "Cinematic Angles", "4K Drone Video"]
      },
      {
        icon: Video,
        title: "Video Coverage",
        description: "Professional 4K videography with cinematic editing",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=800&h=600&q=80",
        highlights: ["4K Recording", "Same-Day Edit", "Professional Grading", "Cinematic Editing"]
      },
      {
        icon: Share2,
        title: "Digital Invitations",
        description: "Modern, customizable digital invites for all occasions",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&h=600&q=80",
        highlights: ["Responsive Design", "Interactive Elements", "RSVP Tracking", "Multiple Themes"]
      }
    ]
  };

  const platinumPackage = {
    name: "Platinum Bundle",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=800&q=80",
    services: [
      "Pre-Wedding Photoshoot (4 hours)",
      "Wedding Day Coverage (12 hours)",
      "Post-Wedding Photoshoot (4 hours)",
      "Godh Bharai Photography (6 hours)",
      "Baby Shower Coverage (6 hours)",
      "4K Video Coverage",
      "Drone Photography & Video",
      "Same-Day Edit Video",
      "1000+ Digital Photos",
      "Premium Album (Hardbound)",
      "Digital Invitations (All Occasions)",
      "Professional Editing & Retouching"
    ]
  };

  const comparisonData = [
    { feature: "Pre-Wedding Hours", platinum: "4 hours", bronze: "2 hours", silver: "1 hour" },
    { feature: "Wedding Day Hours", platinum: "12 hours", bronze: "8 hours", silver: "6 hours" },
    { feature: "Post-Wedding Shoot", platinum: "4 hours", bronze: "❌", silver: "❌" },
    { feature: "Video Quality", platinum: "4K", bronze: "Full HD", silver: "HD" },
    { feature: "Digital Photos", platinum: "1000+", bronze: "500+", silver: "300+" },
    { feature: "Drone Coverage", platinum: "✅", bronze: "❌", silver: "❌" },
    { feature: "Same-Day Edit", platinum: "✅", bronze: "❌", silver: "❌" },
    { feature: "Premium Album", platinum: "✅", bronze: "❌", silver: "❌" },
    { feature: "Godh Bharai Hours", platinum: "6 hours", bronze: "4 hours", silver: "2 hours" },
    { feature: "Baby Shower", platinum: "6 hours", bronze: "3 hours", silver: "❌" },
    { feature: "Family Events", platinum: "✅", bronze: "❌", silver: "❌" },
    { feature: "Digital Invitations", platinum: "All Occasions", bronze: "2 Occasions", silver: "1 Occasion" },
    { feature: "Cloud Storage", platinum: "Lifetime", bronze: "1 Year", silver: "6 Months" },
    { feature: "Professional Editing", platinum: "Unlimited", bronze: "Basic", silver: "Basic" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-amber-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header with Back Button */}
        <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-rose-200">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            
            <button
              onClick={() => {
                navigate("/");  
                setTimeout(() => {
    document.querySelector('#pricing')?.scrollIntoView({ 
      behavior: 'instant', 
      block: 'start' 
    });
  }, 50);
              }}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors group font-semibold"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div className="text-center">
              <h1 className="text-2xl font-bold text-rose-700">
                ✨ Platinum Photography Bundle
              </h1>
            </div>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              📊 Compare Plans
            </button>
          </div>
        </div>

        {/* Comparison Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-rose-300 shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-rose-600 to-amber-600 p-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Package Comparison</h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Comparison Table */}
             {/* Comparison Table */}
<div className="p-8">
  <table className="w-full">
    <thead>
      <tr className="border-b-2 border-rose-300">
        <th className="p-4 text-left font-bold text-gray-900">Feature</th>
        <th className="p-4 text-center">
          <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-xl font-bold">
            💎 Platinum
          </div>
        </th>
        <th className="p-4 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl font-bold">
            🥉 Bronze
          </div>
        </th>
        <th className="p-4 text-center">
          <div className="bg-gradient-to-r from-gray-500 to-slate-500 text-white px-4 py-2 rounded-xl font-bold">
            🪙 Silver
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {comparisonData.map((row, idx) => (
        <tr
          key={idx}
          className={`border-b border-gray-200 hover:bg-rose-50 transition-colors ${
            idx % 2 === 0 ? 'bg-white' : 'bg-rose-50/30'
          }`}
        >
          <td className="p-4 font-semibold text-gray-900">{row.feature}</td>
          <td className="p-4 text-center">
            <span className="text-rose-600 font-bold text-lg">
              {row.platinum === "✅" ? "✅" : row.platinum === "❌" ? "❌" : row.platinum}
            </span>
          </td>
          <td className="p-4 text-center">
            <span className={`font-bold text-lg ${
              row.bronze === "✅" ? "text-green-600" : row.bronze === "❌" ? "text-gray-400" : "text-orange-600"
            }`}>
              {row.bronze === "✅" ? "✅" : row.bronze === "❌" ? "❌" : row.bronze}
            </span>
          </td>
          <td className="p-4 text-center">
            <span className={`font-bold text-lg ${
              row.silver === "✅" ? "text-green-600" : row.silver === "❌" ? "text-gray-400" : "text-gray-600"
            }`}>
              {row.silver === "✅" ? "✅" : row.silver === "❌" ? "❌" : row.silver}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




              {/* Modal Footer */}
              <div className="bg-rose-50 border-t border-rose-200 p-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                  Choose Platinum
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                  Choose Bronze
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                  Choose Silver
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full border border-rose-300 shadow-lg shadow-rose-300/30">
              <p className="text-white text-sm font-bold tracking-widest">💎 PLATINUM COLLECTION</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-rose-700">
              Your Complete Memory Archive
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional photography, cinematography, and digital invitations for every precious moment of your wedding journey
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              { id: 'photography', label: '📸 Photography', icon: Camera },
              { id: 'celebrations', label: '🎉 Celebrations', icon: Gift },
              { id: 'digital', label: '💻 Digital & Aerial', icon: Share2 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 border ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white border-rose-400 shadow-lg shadow-rose-300/50'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-rose-300 hover:text-rose-600 shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid with Images */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services[activeTab].map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-rose-200 shadow-lg hover:shadow-2xl hover:shadow-rose-300/30 transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-72 overflow-hidden bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1606011591437-680de24fdf6b?auto=format&fit=crop&w=800&h=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600/0 via-transparent to-amber-600/0 group-hover:from-rose-600/20 group-hover:to-amber-600/20 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-8 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-rose-300/50 group-hover:shadow-amber-300/50 transition-all">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
                      {service.description}
                    </p>
                    <div className="space-y-3 pt-4 border-t border-rose-200">
                      {service.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:text-rose-600 transition-colors" />
                          <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Platinum Package Section */}
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-rose-700">
              The Platinum Experience
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Everything you need to preserve every precious moment in timeless elegance
            </p>

            <div className="bg-white rounded-3xl overflow-hidden border border-rose-300 shadow-2xl shadow-rose-200/50">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative h-96 md:h-full bg-gray-200">
                  <img
                    src={platinumPackage.image}
                    alt="Platinum Package"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&h=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-amber-600/20" />
                </div>

                {/* Content Section */}
                <div className="p-12 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full mb-6 shadow-lg">
                      <span className="text-white text-xs font-bold tracking-widest">
                        💎 MOST COMPREHENSIVE
                      </span>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-900 mb-8">
                      {platinumPackage.name}
                    </h3>

                    {/* Services List */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                      {platinumPackage.services.map((service, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <Check className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5 group-hover:text-amber-600 transition-colors" />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full px-8 py-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold rounded-2xl hover:shadow-xl shadow-rose-300/50 hover:shadow-rose-400/60 transition-all transform hover:-translate-y-1">
                    Get Platinum Bundle Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Comparison Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-4 text-rose-700">
              Quick Package Comparison
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">Choose the perfect plan for your needs</p>
            
            <div className="overflow-x-auto bg-white rounded-3xl border border-rose-200 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-rose-500 to-amber-500 text-white">
                    <th className="p-6 text-left font-bold">Feature</th>
                    <th className="p-6 text-center font-bold">💎 Platinum</th>
                    <th className="p-6 text-center font-bold">🥉 Bronze</th>
                    <th className="p-6 text-center font-bold">🪙 Silver</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.slice(0, 8).map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-t border-rose-100 hover:bg-rose-50 transition-colors ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-rose-50/30'
                      }`}
                    >
                      <td className="p-6 font-semibold text-gray-900">{row.feature}</td>
                      <td className="p-6 text-center">
                        <span className="text-rose-600 font-bold">
                          {row.platinum === "✅" ? "✅" : row.platinum === "❌" ? "❌" : row.platinum}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`font-bold ${
                          row.bronze === "✅" ? "text-green-600" : row.bronze === "❌" ? "text-gray-400" : "text-orange-600"
                        }`}>
                          {row.bronze === "✅" ? "✅" : row.bronze === "❌" ? "❌" : row.bronze}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={`font-bold ${
                          row.silver === "✅" ? "text-green-600" : row.silver === "❌" ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {row.silver === "✅" ? "✅" : row.silver === "❌" ? "❌" : row.silver}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setShowComparison(true)}
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                View Full Comparison
              </button>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-rose-100 to-amber-100 rounded-3xl p-12 mb-16 border border-rose-300">
            <h2 className="text-4xl font-bold text-center mb-4 text-rose-700">
              Why Choose Platinum Collection
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg">Excellence in every frame, elegance in every moment</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Complete Solution",
                  desc: "Photography, videography, drone, and digital invitations in one premium package"
                },
                {
                  icon: "👑",
                  title: "Expert Team",
                  desc: "15+ years of excellence capturing India's most cherished wedding moments"
                },
                {
                  icon: "✨",
                  title: "Artistic Excellence",
                  desc: "Award-winning photographers with international standards and expertise"
                },
                {
                  icon: "📹",
                  title: "4K Cinema Quality",
                  desc: "Latest equipment delivering stunning 4K videos and drone cinematography"
                },
                {
                  icon: "🎨",
                  title: "Unlimited Edits",
                  desc: "Professional color grading, retouching, and artistic enhancements"
                },
                {
                  icon: "☁️",
                  title: "Cloud Forever",
                  desc: "Lifetime cloud storage with instant access to all your precious memories"
                }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white rounded-2xl p-8 border border-rose-200 hover:border-amber-400 transition-all hover:shadow-lg hover:shadow-rose-200/50">
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600 rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl shadow-rose-400/50 border border-rose-400">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                Ready to Create Timeless Memories?
              </h2>
              <p className="text-lg text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Book your Platinum Collection consultation today and let our award-winning team preserve your most precious moments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-rose-600 font-bold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg hover:bg-amber-50">
                  📅 Book Consultation
                </button>
                <button className="px-10 py-5 border-3 border-white text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-lg">
                  🎬 View Gallery
                </button>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center text-gray-600 space-y-2 pb-8">
            <p className="text-sm font-semibold">📍 Indore | 🌍 Destination Weddings | 💍 All Occasions</p>
            <p className="text-xs text-gray-500">Experience platinum-quality photography and cinematography</p>
          </div>
        </div>
      </div>
    </div>
  );
}
