import React, { useState } from 'react';
import { Users, FileText, TrendingUp, Settings, BarChart2, Database } from 'lucide-react';
import AdmDashboard from './Dashboard'
import AdmUserManagement from "./UserManagement"
import AdmTemplateAnalytics from "./TemplateAnalytics"
import AdmAdminSettings from "./AdminSetting"
import AdmTemplateBuilder from "./TemplateBuilder"
import AdmAdminTemplates from "./AdminTemplates"
import DataAdminPanel from "./DataAdminPanel"

// Dummy components for demo content
function Dashboard() {
  return <AdmDashboard />;
}
function Templates() {
  return <AdmAdminTemplates />;
}
function UsersComponent() {
  return < AdmUserManagement />;
}
function Analytics() {
  return < AdmTemplateAnalytics />;
}
function SettingsComponent() {
  return <AdmAdminSettings />;
}
function TemplateBuilder() {
  return <AdmTemplateBuilder />;
}

// Navigation items with icons for clarity
const adminNavItems = [
  { name: 'Dashboard', href: '#dashboard', icon: TrendingUp },
  { name: 'Templates', href: '#templates', icon: FileText },
  { name: 'Users', href: '#users', icon: Users },
  { name: 'Analytics', href: '#analytics', icon: BarChart2 },
  { name: 'Settings', href: '#settings', icon: Settings },
  { name: 'TemplateBuilder', href: '#templateBuilder', icon: Settings },
  { name: 'Data', href: '#data', icon: Database }
];

// Navigation component
function AdminNavigation({ selected, onSelect }) {
  return (
    <nav className="bg-white w-full md:w-64 border-r border-gray-200 shadow-sm">
      <ul className="flex md:flex-col justify-around md:justify-start md:space-y-2 p-2">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = selected === item.name;
          return (
            <li
              key={item.name}
              onClick={() => onSelect(item.name)}
              className={`flex items-center cursor-pointer rounded-lg px-4 py-3 transition-colors duration-300 select-none
                          ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') onSelect(item.name); }}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to ${item.name}`}
            >
              <Icon className={`w-6 h-6 mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-600'}`} />
              <span className="font-semibold">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="w-full p-4 bg-gray-100 text-gray-600 text-center text-sm border-t border-gray-300">
      &copy; 2025 Vivah3D. All rights reserved.
    </footer>
  );
}

// Main AdminPanel component
export default function AdminDashboard() {
  const [selectedPage, setSelectedPage] = useState('Dashboard');

  // Map selected page name to component render
  const renderContent = () => {
    switch (selectedPage) {
      case 'Dashboard': return <Dashboard />;
      case 'Templates': return <Templates />;
      case 'Users': return <UsersComponent />;
      case 'Analytics': return <Analytics />;
      case 'Settings': return <SettingsComponent />;
      case 'TemplateBuilder': return <TemplateBuilder />;
      case 'Data': return <DataAdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="hidden md:flex items-center justify-between bg-white shadow-sm p-4 border-b border-gray-200">
  <button 
    onClick={() => window.location.href = '/'} 
    className="text-blue-700 font-semibold text-sm px-4 py-2 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors shadow-sm"
    aria-label="Back to Home"
  >
    ← Back to Home
  </button>
  <h1 className="text-xl font-bold text-blue-700 select-none">
    Vivah3D Admin Panel
  </h1>
</header>


      {/* Body content with navigation + main */}
      <div className="flex flex-1 overflow-hidden">
        <AdminNavigation selected={selectedPage} onSelect={setSelectedPage} />

        <main className="flex-1 overflow-auto bg-white shadow-inner rounded-tr-3xl rounded-br-3xl">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
