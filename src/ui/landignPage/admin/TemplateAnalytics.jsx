import React from 'react';
import { TrendingUp, Eye, Download, Star } from 'lucide-react';

/**
 * TemplateAnalytics Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
export default function TemplateAnalytics() {
  
  // Overall analytics stats
  const overallStats = [
    { icon: Eye, label: "Total Views", value: "3,751" },
    { icon: Download, label: "Total Downloads", value: "1,264" },
    { icon: Star, label: "Avg Rating", value: "4.7" },
    { icon: TrendingUp, label: "Growth", value: "+18%" }
  ];

  // Individual template performance data
  const templates = [
    { name: "Royal Indian", views: 1234, downloads: 456, rating: 4.8 },
    { name: "Modern Instagram", views: 987, downloads: 321, rating: 4.6 },
    { name: "Dreamscape", views: 876, downloads: 289, rating: 4.9 },
    { name: "Minimalist", views: 654, downloads: 198, rating: 4.5 }
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
          Template Analytics
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-2xl">
          Track template performance and engagement
        </p>
      </div>

      {/* Overall Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={index} 
              className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 hover:-translate-y-2 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 cursor-pointer group hover:bg-white"
              role="region"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg group-hover:scale-110 transition-all duration-300 hover:shadow-purple-500/50">
                  <IconComponent 
                    className="w-7 h-7 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" 
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="text-4xl font-black mb-2 text-gray-900 group-hover:text-purple-600 transition-all duration-300 drop-shadow-lg">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 font-semibold tracking-wide uppercase group-hover:text-gray-800">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Template Performance Table */}
      <div className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-green-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-green-300/50 transition-all duration-500 hover:-translate-y-1">
        <h3 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-200 pb-6">
          Template Performance
        </h3>
        <div className="space-y-8">
          {templates.map((template, index) => {
            const conversionRate = ((template.downloads / template.views) * 100).toFixed(1);
            
            return (
              <div 
                key={index} 
                className="pb-8 border-b border-gray-200/50 last:border-b-0 group hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 p-6 rounded-3xl transition-all duration-300"
                role="article"
                aria-labelledby={`template-${index}-name`}
              >
                {/* Template Header with Rating */}
                <div className="flex items-center justify-between mb-6">
                  <h4 
                    id={`template-${index}-name`}
                    className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-all duration-300"
                  >
                    {template.name}
                  </h4>
                  <div className="flex items-center gap-1 bg-emerald-100 px-3 py-2 rounded-2xl border border-emerald-200 shadow-sm" aria-label={`Rating: ${template.rating}/5`}>
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-5 h-5 transition-all duration-200 ${
                          star <= Math.floor(template.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'fill-transparent text-gray-300'
                        }`} 
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-lg font-bold text-gray-900 ml-2">
                      {template.rating}
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50/50 rounded-2xl">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <Eye className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{template.views.toLocaleString()}</span>
                      <p className="text-sm text-gray-600 font-medium">views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Download className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{template.downloads.toLocaleString()}</span>
                      <p className="text-sm text-gray-600 font-medium">downloads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all md:col-span-1">
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg">
                      {conversionRate}%
                    </span>
                    <p className="text-sm text-gray-600 font-medium whitespace-nowrap">conversion</p>
                  </div>
                </div>

                {/* Conversion Progress Bar */}
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl border border-emerald-200 shadow-inner">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-700 mb-2 tracking-wide">
                      Download conversion rate
                    </div>
                    <div className="bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full shadow-lg transition-all duration-700 flex items-center justify-center text-xs font-bold text-white"
                        style={{ width: `${conversionRate}%` }}
                        role="progressbar"
                        aria-valuenow={parseFloat(conversionRate)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${conversionRate}% conversion rate`}
                      >
                        {conversionRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
