import React from 'react';

// Static template content (since no template components available)
const RoyalIndianTemplate = () => (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-8">
    <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full mx-auto mb-8 shadow-lg"></div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6">
        Royal Indian Template
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Elegant royal wedding invitation with traditional Indian motifs and modern design.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
          <div className="w-12 h-12 bg-rose-200 rounded-lg mx-auto mb-2"></div>
          <p className="text-sm font-medium text-rose-800">Traditional</p>
        </div>
        <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
          <div className="w-12 h-12 bg-pink-200 rounded-lg mx-auto mb-2"></div>
          <p className="text-sm font-medium text-pink-800">Modern</p>
        </div>
      </div>
    </div>
  </div>
);

const ModernInstagramTemplate = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
    <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl mx-auto mb-6 shadow-lg flex items-center justify-center">
        <span className="text-2xl font-bold text-white">📱</span>
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Instagram Style
      </h1>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Sleek, modern template perfect for social media sharing.
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-center p-3 bg-indigo-50 rounded-xl">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
          <span className="text-sm font-medium text-indigo-800">Stories Ready</span>
        </div>
        <div className="flex items-center justify-center p-3 bg-purple-50 rounded-xl">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          <span className="text-sm font-medium text-purple-800">Reels Optimized</span>
        </div>
      </div>
    </div>
  </div>
);

const DreamscapeTemplate = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-8 overflow-hidden">
    <div className="relative max-w-2xl w-full bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-12 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl"></div>
      <div className="w-28 h-28 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full mx-auto mb-8 shadow-2xl relative z-10"></div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6 relative z-10">
        Dreamscape
      </h1>
      <p className="text-xl text-white/90 leading-relaxed mb-8 relative z-10">
        Ethereal, dreamy template for magical wedding moments.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30"></div>
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30"></div>
        <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30"></div>
      </div>
    </div>
  </div>
);

// Template registry - maps template IDs to their components
const templates = {
  'RoyalIndianTemplate': RoyalIndianTemplate,
  'ModernInstagramTemplate': ModernInstagramTemplate,
  'DreamscapeTemplate': DreamscapeTemplate,
};

const TemplatePreview = () => {
  // Simulate templateId from URL params (hardcoded for demo)
  const templateId = 'RoyalIndianTemplate'; // Change this to test different templates
  
  // Safely retrieve the template component
  const TemplateComponent = templateId 
    ? templates[templateId]
    : undefined;

  // Simulate navigation
  const goBack = () => {
    alert('Navigate back to templates list');
  };

  // Render error state if template not found
  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Template not found</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The template doesn't exist. Please select from available templates.
          </p>
          <button 
            onClick={goBack}
            className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto border border-transparent"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Render selected template with fixed navigation
  return (
    <div className="relative min-h-screen">
      {/* Fixed back button - positioned above template */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={goBack}
          className="px-6 py-3 bg-white/90 backdrop-blur-xl hover:bg-white/100 text-gray-900 font-medium rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-gray-300 transition-all duration-200 flex items-center space-x-2 hover:scale-105 active:scale-95"
          aria-label="Back to templates"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Templates
        </button>
      </div>

      {/* Dynamic template component */}
      <TemplateComponent />
    </div>
  );
};

export default TemplatePreview;
