import React from 'react';
import { Search, MoreVertical } from 'lucide-react';

/**
 * UserManagement Component (No UI folder needed)
 * Pure HTML/CSS implementation
 */
export default function UserManagement() {
  const users = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", plan: "Premium", status: "Active" },
    { id: 2, name: "Rahul Verma", email: "rahul@example.com", plan: "Basic", status: "Active" },
    { id: 3, name: "Ananya Singh", email: "ananya@example.com", plan: "Royal", status: "Active" },
    { id: 4, name: "Vikram Patel", email: "vikram@example.com", plan: "Premium", status: "Inactive" }
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      
      {/* Header with title and add user button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
            User Management
          </h2>
          <p className="text-gray-600 text-lg font-medium max-w-md">
            Manage your platform users
          </p>
        </div>
        <button 
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 border border-blue-500 hover:border-blue-600 whitespace-nowrap"
          aria-label="Add new user"
        >
          Add New User
        </button>
      </div>

      {/* User list card */}
      <div className="p-8 shadow-2xl hover:shadow-3xl hover:shadow-blue-500/20 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200/50 hover:border-blue-300/50 transition-all duration-500 hover:-translate-y-1">
        
        {/* Search Input with icon */}
        <div className="mb-8 relative">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
            aria-hidden="true" 
          />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm shadow-inner hover:shadow-md text-lg placeholder-gray-500 font-medium"
            aria-label="Search users"
          />
        </div>

        {/* Responsive User Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full" role="table" aria-label="User management table">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Name</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Email</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Plan</th>
                <th className="text-left py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Status</th>
                <th className="text-right py-5 px-6 text-sm font-bold text-gray-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                >
                  <td className="py-5 px-6 text-sm font-semibold text-gray-900 group-hover:text-blue-700">{user.name}</td>
                  <td className="py-5 px-6 text-sm text-gray-600 font-medium group-hover:text-gray-800">{user.email}</td>
                  <td className="py-5 px-6">
                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 shadow-sm">
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                      user.status === 'Active' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                        : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button 
                      className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group-hover:bg-blue-50 flex items-center justify-center"
                      aria-label={`More actions for ${user.name}`}
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table footer summary */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {users.length} users</span>
          <span className="font-medium text-gray-900">4 Active • 1 Inactive</span>
        </div>
      </div>
    </div>
  );
}
