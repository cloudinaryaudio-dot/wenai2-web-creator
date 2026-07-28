import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full animate-blob blur-xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-blob animation-delay-2000ms blur-xl"></div>
        <div className="absolute top-40 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-rose-400/20 rounded-full animate-blob animation-delay-4000ms blur-xl"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center space-y-6 text-center px-4">
        {/* Wedding-themed spinner */}
        <div className="relative">
          <div className="w-24 h-24 border-4 border-rose-200 border-t-rose-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-pink-200 border-t-pink-400 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-purple-200 border-t-purple-400 rounded-full animate-pulse"></div>
          {/* Heart icon in center */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-rose-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div> */}
        </div>

        {/* Loading text with pulse */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Loading...
          </h1>
          {/* <p className="text-lg text-gray-600 font-medium animate-pulse">Preparing your special invitation</p> */}
        </div>

        {/* Dots animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
