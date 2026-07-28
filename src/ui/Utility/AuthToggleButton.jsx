import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';

// Mock auth state (replace with your auth context)
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Simulate login state (replace with real auth)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    localStorage.setItem('authToken', 'mock-token');
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

export default function AuthToggleButton({ onLogin, onLogout }) {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div className="flex items-center space-x-2 ml-4">
      {isLoggedIn ? (
        // ✅ LOGGED IN - Logout Button
        <button
          onClick={onLogout || logout}
          className="group relative flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 gap-2 shadow-lg hover:shadow-2xl hover:scale-105 text-white border-2 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderColor: '#34d399',
          }}
          aria-label="Logout"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <LogOut className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
          <span>Logout</span>
          
          {/* Online indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        </button>
      ) : (
        // ✅ LOGGED OUT - Login Button
        <button
          onClick={onLogin || login}
          className="group relative flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 gap-2 shadow-lg hover:shadow-2xl hover:scale-105 text-white border-2 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderColor: '#60a5fa',
            animation: 'pulse 2s ease-in-out infinite',
          }}
          aria-label="Sign In"
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <LogIn className="h-4 w-4" />
          <span>Sign In</span>
          
          {/* Guest badge */}
          <div className="absolute -top-1 -right-1 bg-gray-200/80 backdrop-blur-sm text-gray-700 text-xs px-1.5 py-0.5 rounded-full font-semibold border border-gray-300/50">
            Guest
          </div>
        </button>
      )}
      
      {/* User Avatar (Always visible) */}
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer relative group/avatar">
        <User className="h-5 w-5 text-white" />
        {/* Hover tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover/avatar:opacity-100 invisible group-hover/avatar:visible transition-all duration-200 whitespace-nowrap shadow-lg z-50">
          {isLoggedIn ? 'Profile' : 'Login Required'}
        </div>
      </div>
    </div>
  );
}
