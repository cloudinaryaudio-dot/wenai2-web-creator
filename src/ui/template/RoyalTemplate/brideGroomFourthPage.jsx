import React, { useState } from 'react';
// import { useWeddingStore } from '../../../db/store/useWeddingStore';

export default function BrideGroomFourthPage({userData}) {
  const data = userData?.six_couple;
  const weddingCards = [ data.bride, data.groom ];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Toggle Buttons - Mobile Only */}
      <div className="flex space-x-4 mb-8 md:hidden">
        {weddingCards.map((c, idx) => (
          <button
            key={c.role}
            onClick={() => setCurrentIndex(idx)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform ${
              currentIndex === idx 
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white scale-110 shadow-2xl" 
                : "bg-white/90 text-gray-800 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
            }`}
          >
            {c.role}
          </button>
        ))}
      </div>

      {/* Card Stack with Extra Elegant Layers - Tablet/Laptop */}
      <div className="hidden md:flex justify-center items-center space-x-32 px-4">
        {weddingCards.map((card, idx) => (
          <div key={idx} className="relative w-full max-w-sm h-[580px]">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl transform rotate-6 scale-95 opacity-50 blur-lg"></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-3xl transform rotate-8 scale-95 shadow-xl blur-sm"></div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-3xl transform -rotate-8 scale-97 shadow-2xl blur-sm"></div>
            
            <div
              className="relative w-96 h-[580px] rounded-3xl shadow-2xl overflow-hidden border-2 border-yellow-400/30"
              style={{ 
                backgroundImage: `url(${card.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center 20%' 
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
              {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div> */}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center">
                <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">
                  <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
                    {card.name}
                  </span>
                </h2>
                <ul className="space-y-2.5">
                  {card.details.map((detail, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center justify-center text-yellow-100 font-medium text-sm leading-snug"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                      <span className="drop-shadow-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Card for Mobile */}
      <div className="md:hidden flex justify-center items-center">
        <div className="relative w-full max-w-2xl h-[580px]">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl transform rotate-12 scale-95 opacity-50 blur-lg"></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-3xl transform rotate-6 scale-95 shadow-xl"></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 rounded-3xl transform -rotate-3 scale-97 shadow-2xl"></div>
          
          <div
            className="relative w-96 h-[580px] rounded-3xl shadow-2xl overflow-hidden border-2 border-yellow-400/30"
            style={{ 
              backgroundImage: `url(${weddingCards[currentIndex].image})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center 20%' 
            }}
          >
            <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/95 via-black/70 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center">
              <h2 className="text-3xl font-extrabold mb-4 drop-shadow-md">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
                  {weddingCards[currentIndex].name}
                </span>
              </h2>
              <ul className="space-y-2.5">
                {weddingCards[currentIndex].details.map((detail, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-center justify-center text-yellow-100 font-medium text-sm leading-snug"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-yellow-300 rounded-full mr-3 flex-shrink-0"></span>
                    <span className="drop-shadow-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
