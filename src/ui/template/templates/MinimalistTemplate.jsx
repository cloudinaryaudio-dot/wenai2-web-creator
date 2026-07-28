import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

/**
 * MinimalistTemplate Component (No UI folder needed)
 * Pure HTML/CSS implementation with dummy data
 */
export default function MinimalistTemplate() {
  const [details, setDetails] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setDetails({
      brideName: "Priya Sharma",
      groomName: "Rahul Verma",
      weddingDate: "2025-12-25",
      weddingVenue: "The Grand Palace, Indore",
      heroImage: ""
    });
    setPhotos([
      { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=800" }
    ]);
  }, []);

  if (!details) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Format wedding date with weekday
  const weddingDate = new Date(details.weddingDate);
  const formattedDate = weddingDate.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Use first photo or fallback image
  const mainImage = photos[0]?.url || details.heroImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=800';

  const handleRSVP = () => {
    alert("Thank you for your response! Your presence means the world to us. 💕");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Elegant Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm tracking-[0.3em] text-gray-500 uppercase">
            The Wedding of
          </p>
          <h1 className="text-6xl md:text-7xl font-light text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
            {details.brideName} 
            <span className="text-gray-400 font-normal">&</span> 
            {details.groomName}
          </h1>
        </div>

        {/* Centered Date Display */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-12 mb-12 text-center">
          <div className="space-y-6">
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700 mx-auto" aria-hidden="true" />
            <p className="text-4xl md:text-5xl font-light text-gray-900 dark:text-gray-100 leading-relaxed">
              {formattedDate}
            </p>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700 mx-auto" aria-hidden="true" />
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="grid gap-px bg-gray-300 dark:bg-gray-700 mb-12" role="list">
          <div className="bg-white dark:bg-gray-900 p-8 flex items-start gap-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200" role="listitem">
            <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Ceremony</p>
              <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-light">{formattedDate}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 flex items-start gap-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200" role="listitem">
            <MapPin className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Location</p>
              <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-light">{details.weddingVenue}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-8 flex items-start gap-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200" role="listitem">
            <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Join us for</p>
              <p className="text-lg md:text-xl text-gray-900 dark:text-gray-100 font-light">A celebration of love</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-[3/2] md:aspect-video mb-12 overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300">
          <img
            src={mainImage}
            alt={`${details.brideName} & ${details.groomName} wedding`}
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Minimal CTA */}
        <div className="text-center space-y-6">
          <button 
            onClick={handleRSVP}
            className="px-12 py-6 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-gray-100 dark:hover:text-gray-900 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300 font-light tracking-wide shadow-sm hover:shadow-lg"
            aria-label="Respond to wedding invitation"
          >
            Kindly Respond
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light italic leading-relaxed max-w-md mx-auto">
            Your presence is our greatest gift
          </p>
        </div>
      </div>
    </div>
  );
}
