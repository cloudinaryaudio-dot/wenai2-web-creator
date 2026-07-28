import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-500 hover:to-orange-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
