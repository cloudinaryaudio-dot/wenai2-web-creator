import React from 'react';
import { Users, FileText, TrendingUp, DollarSign } from 'lucide-react';

/**
 * AdminDashboard Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
export default function Dashboard() {
  
  // Key metrics data
  const stats = [
    { 
      icon: Users, 
      label: "Total Users", 
      value: "1,234", 
      change: "+12%",
      changeType: "positive" 
    },
    { 
      icon: FileText, 
      label: "Templates Created", 
      value: "567", 
      change: "+8%",
      changeType: "positive" 
    },
    { 
      icon: TrendingUp, 
      label: "Active Projects", 
      value: "89", 
      change: "+23%",
      changeType: "positive" 
    },
    { 
      icon: DollarSign, 
      label: "Revenue", 
      value: "₹12.5L", 
      change: "+15%",
      changeType: "positive" 
    }
  ];

  // Mock recent activity data
  const recentActivities = [
    { id: 1, action: "New user registration", timestamp: "2 hours ago" },
    { id: 2, action: "Template customization completed", timestamp: "4 hours ago" },
    { id: 3, action: "Payment received", timestamp: "6 hours ago" },
    { id: 4, action: "New template uploaded", timestamp: "8 hours ago" }
  ];

  // Mock popular templates data
  const popularTemplates = [
    { name: "Royal Indian", views: 150 },
    { name: "Modern Instagram", views: 130 },
    { name: "Dreamscape", views: 110 },
    { name: "Minimalist", views: 90 }
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-2xl">
          Welcome back, Admin! Here's your business snapshot.
        </p>
      </div>

      {/* Stats Grid - Responsive 1-4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={index} 
              className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/20 hover:-translate-y-2 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 cursor-pointer group hover:bg-white"
              role="region"
              aria-label={`${stat.label} metric`}
              style={{ boxShadow: '0 20px 25px -5px rgba(0, 0,0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              {/* Icon + Change Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:scale-110 transition-all duration-300">
                  <IconComponent 
                    className="w-7 h-7 text-white drop-shadow-lg" 
                    aria-hidden="true"
                  />
                </div>
                <span 
                  className={`text-sm font-bold px-2 py-1 rounded-lg ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  } shadow-sm`}
                  aria-label={`Change: ${stat.change}`}
                >
                  {stat.change}
                </span>
              </div>

              {/* Main Value */}
              <h3 className="text-4xl font-black mb-2 text-gray-900 group-hover:text-blue-600 transition-all duration-300 drop-shadow-lg">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-sm text-gray-600 font-semibold tracking-wide uppercase group-hover:text-gray-800">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Popular Templates - Two Column Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Recent Activity Section */}
        <div className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-green-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-green-300/50 transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-200 pb-4">
            Recent Activity
          </h3>
          <div className="space-y-5">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-4 pb-5 border-b border-gray-200/50 last:border-b-0 hover:bg-gray-50/50 p-3 rounded-2xl transition-all duration-200 group"
              >
                {/* Activity Icon */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-all duration-300">
                  <Users 
                    className="w-6 h-6 text-white drop-shadow-lg" 
                    aria-hidden="true"
                  />
                </div>

                {/* Activity Details */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-base font-semibold text-gray-900 group-hover:text-green-700 transition-colors truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Templates Section */}
        <div className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-2xl font-black mb-6 text-gray-900 border-b border-gray-200 pb-4">
            Popular Templates
          </h3>
          <div className="space-y-5">
            {popularTemplates.map((template, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between pb-5 border-b border-gray-200/50 last:border-b-0 hover:bg-purple-50/50 p-4 rounded-2xl transition-all duration-200 group cursor-pointer"
              >
                {/* Template Name + Rank */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    #{index + 1}
                  </div>
                  <span className="text-base font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {template.name}
                  </span>
                </div>

                {/* View Count */}
                <span className="text-base font-bold text-gray-600 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                  {template.views}
                  <span className="text-sm">views</span>
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
