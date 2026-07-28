import React, { useState, useEffect } from 'react';
// import { useWeddingStore } from '../../../db/store/useWeddingStore';

export default function RoyalTemplateSecondPage({userData}) {
  const asset = userData?.assets?.four_backgrounds?.page2 ;
  const data = userData?.pages?.four_countdown ;
    
  // Set the target wedding date
  const weddingDate = new Date(data.weddingDateISO);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative flex flex-col justify-end items-center overflow-hidden bg-blue-500 "
      style={{
        backgroundImage:
          window.innerWidth >= 768
            ? `url(${asset.desktop})`
            : `url(${asset.mobile})`,
        backgroundPosition: "center center",
        backgroundSize: window.innerWidth >= 768 ? "90%" : "cover",
        height: "100vh",
      }}
    >
      {/* Dark gradient overlay for text legibility */}
      <div className="absolute bottom-0 left-0 w-full h-64 md:h-40 bg-gradient-to-t from-black/60 via-black/20 backdrop-blur-sm to-transparent pointer-events-none z-10"></div>
     
      {/* Mobile Version - Hidden on Laptop */}
      <div className="md:hidden relative z-10 w-full max-w-md text-center flex flex-col items-center justify-center gap-12 mb-16">
        
        {/* Mobile Wedding Date Display */}
        <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl px-6 py-3 border border-yellow-400/30 shadow-xl">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
            {data.weddingDateText}
          </h1>
          <p className="text-yellow-300 text-base font-semibold mt-1">{data.weddingTimeText}</p>
        </div>

        {/* Mobile Countdown Timer */}
        <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md">
          <div className="flex justify-between items-center gap-2 w-full">
            <div className="flex-1 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/40 shadow-lg text-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-yellow-300 text-sm font-semibold mt-1 tracking-wide">
                {data.dayLabel}
              </div>
            </div>

            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

            <div className="flex-1 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/40 shadow-lg text-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-yellow-300 text-sm font-semibold mt-1 tracking-wide">
               {data.hourLabel}
              </div>
            </div>

            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

            <div className="flex-1 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/40 shadow-lg text-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-yellow-300 text-sm font-semibold mt-1 tracking-wide">
                {data.minuteLabel}
              </div>
            </div>

            <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

            <div className="flex-1 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/40 shadow-lg text-center">
              <div className="text-3xl font-extrabold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-yellow-300 text-sm font-semibold mt-1 tracking-wide">
                {data.secondLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Version - Hidden on Mobile */}
      <div className="hidden md:flex relative z-10 w-full max-w-md text-center flex flex-col items-center justify-center gap-6 mb-4">
        
        {/* Laptop Wedding Date Display */}
        <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl px-6 py-1 border border-yellow-400/30 shadow-xl">
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-300 bg-clip-text text-transparent">
            {data.weddingDateText}
          </h1>
          <p className="text-yellow-300 text-sm font-semibold mt-1">{data.weddingTimeText}</p>
        </div>

        {/* Laptop Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 w-full max-w-md">
          {[
            { value: timeLeft.days, label: data.dayLabel },
            { value: timeLeft.hours, label: data.hourLabel },
            { value: timeLeft.minutes, label: data.minuteLabel },
            { value: timeLeft.seconds, label: data.secondLabel }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-1 border border-yellow-400/40 shadow-lg text-center"
            >
              <div className="text-lg font-extrabold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-yellow-300 text-xs font-semibold mt-1 tracking-wide">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
