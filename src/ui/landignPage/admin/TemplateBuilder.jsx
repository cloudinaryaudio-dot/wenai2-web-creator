import React, { useState } from 'react';

/**
 * TemplateBuilder Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
export default function TemplateBuilder() {
  const [templateData, setTemplateData] = useState({
    name: '',
    category: '',
    description: '',
    price: ''
  });

  const [toastVisible, setToastVisible] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);

    // Reset form fields
    setTemplateData({ name: '', category: '', description: '', price: '' });

    // Demo console log
    console.log("✅ New template created:", templateData);
  };

  // Update form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setTemplateData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
          Template Builder
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-2xl">
          Create and customize wedding invitation templates
        </p>
      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed top-4 right-4 z-50 p-6 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white max-w-sm animate-slide-in-right">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <div>
              <h3 className="font-bold text-lg mb-1">Template Created!</h3>
              <p className="text-blue-100 font-medium">Your new template has been saved successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Template Details Form */}
        <div className="p-10 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-200 pb-6">
            Template Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-8" aria-label="Template creation form">
            
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-800 tracking-wide">
                Template Name
              </label>
              <input
                type="text"
                id="name"
                value={templateData.name}
                onChange={handleChange}
                placeholder="Enter template name"
                required
                aria-required="true"
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-gray-800 tracking-wide">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={templateData.category}
                onChange={handleChange}
                placeholder="e.g., Traditional, Modern"
                required
                aria-required="true"
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-bold text-gray-800 tracking-wide">
                Description
              </label>
              <textarea
                id="description"
                value={templateData.description}
                onChange={handleChange}
                placeholder="Describe the template"
                required
                aria-required="true"
                rows={6}
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500 resize-y"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-bold text-gray-800 tracking-wide">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={templateData.price}
                onChange={handleChange}
                placeholder="₹19,999"
                required
                aria-required="true"
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 border border-blue-500 hover:border-blue-600 text-lg"
              aria-label="Create template"
            >
              Create Template
            </button>
          </form>
        </div>

        {/* Template Preview Placeholder */}
        <div className="p-10 shadow-2xl hover:shadow-3xl hover:shadow-gray-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-gray-400/50 transition-all duration-500 hover:-translate-y-1 flex flex-col items-center justify-center aspect-video rounded-lg">
          <h3 className="text-3xl font-black mb-6 text-gray-900">
            Template Preview
          </h3>
          <div className="flex flex-1 items-center justify-center w-full rounded-lg bg-gray-100/60 border border-gray-300">
            <p className="text-gray-500 text-lg italic select-none">
              Preview will appear here
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
