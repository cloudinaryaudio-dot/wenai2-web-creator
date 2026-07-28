import React, { useState } from 'react';

/**
 * AdminSettings Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
export default function AdminSettings() {
  const [toastVisible, setToastVisible] = useState(false);

  /**
   * Handle save button click
   * Triggers toast notification (demo implementation)
   */
  const handleSave = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
    
    // Demo console log
    console.log("✅ Settings saved successfully!");
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-4xl font-black mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
          Settings
        </h2>
        <p className="text-gray-600 text-lg font-medium max-w-2xl">
          Manage your platform settings
        </p>
      </div>

      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed top-4 right-4 z-50 p-6 shadow-2xl rounded-3xl bg-gradient-to-r from-emerald-500 to-green-600 text-white max-w-sm animate-slide-in-right">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-white rounded-full mt-1 animate-pulse flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-1">Settings Saved!</h3>
              <p className="text-green-100 font-medium">Your settings have been updated successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings Grid - two columns on large screens */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* General Settings Card */}
        <div className="p-10 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-200 pb-6">
            General Settings
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="siteName" className="block text-sm font-bold text-gray-800 tracking-wide">
                Site Name
              </label>
              <input 
                id="siteName" 
                defaultValue="Vivah3D" 
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
                aria-describedby="siteNameDescription"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="siteEmail" className="block text-sm font-bold text-gray-800 tracking-wide">
                Contact Email
              </label>
              <input 
                id="siteEmail" 
                type="email" 
                defaultValue="hello@vivah3d.com" 
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
                aria-describedby="siteEmailDescription"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="supportPhone" className="block text-sm font-bold text-gray-800 tracking-wide">
                Support Phone
              </label>
              <input 
                id="supportPhone" 
                defaultValue="+91 98765 43210" 
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg font-medium placeholder-gray-500"
                aria-describedby="supportPhoneDescription"
              />
            </div>
            <button 
              onClick={handleSave} 
              className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 border border-blue-500 hover:border-blue-600 text-lg"
              aria-label="Save platform general settings"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="p-10 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 hover:-translate-y-1">
          <h3 className="text-3xl font-black mb-8 text-gray-900 border-b border-gray-200 pb-6">
            Notification Settings
          </h3>
          <div className="space-y-6">
            <NotificationToggle
              label="Email Notifications"
              description="Receive email updates"
              defaultChecked={true}
            />
            <NotificationToggle
              label="New User Alerts"
              description="Get notified of new registrations"
              defaultChecked={true}
            />
            <NotificationToggle
              label="Template Submissions"
              description="Alert for new template uploads"
              defaultChecked={false}
            />
            <NotificationToggle
              label="Payment Notifications"
              description="Get notified of transactions"
              defaultChecked={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NotificationToggle Component
 * Pure CSS toggle switch implementation
 */
function NotificationToggle({ label, description, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
      <div className="space-y-1">
        <p className="font-bold text-lg text-gray-900 group-hover:text-purple-700 transition-colors">{label}</p>
        <p className="text-sm text-gray-600 font-medium">{description}</p>
      </div>
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          id={`toggle-${label}`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="sr-only peer"
          aria-label={label}
        />
        <label
          htmlFor={`toggle-${label}`}
          className="relative w-12 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-indigo-600 peer-checked:shadow-purple-500/25 cursor-pointer"
        />
      </div>
    </div>
  );
}
