import React, { useState } from 'react';
import { Zap, LayoutDashboard, Feather, Folder, BarChart3, User, LogOut, Plus, ChevronDown } from 'lucide-react';

// --- Sub-components for clarity ---

const LightSidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard", current: true },
    { name: "Create Quiz", icon: Feather, href: "#create", current: false },
    { name: "My Quizzes", icon: Folder, href: "#quizzes", current: false },
    { name: "Analytics", icon: BarChart3, href: "#analytics", current: false },
  ];

  return (
    // Light sidebar with subtle shadow
    <div className="w-64 flex flex-col h-full bg-white border-r border-gray-200 shadow-lg">
      
      {/* Sidebar Header/Logo */}
      <div className="p-5 flex items-center space-x-2 border-b border-gray-100">
        <Zap className="w-6 h-6 text-indigo-600" />
        <span className="text-xl font-bold tracking-tight text-gray-800">QuizCrafter AI</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            // Active item uses the brand's primary color
            className={`flex items-center p-3 rounded-lg font-medium transition duration-150 
              ${item.current 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-200' 
                : 'text-gray-600 hover:bg-gray-50'}
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="whitespace-nowrap">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* User/Logout Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition duration-150 cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">JD</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Jane Doe</p>
              <p className="text-xs text-gray-500">Pro User</p>
            </div>
          </div>
          <LogOut className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </div>
      </div>
    </div>
  );
};

const LightDashboardContent = () => (
  // Light content background
  <div className="flex-grow p-8 overflow-y-auto bg-gray-50">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Jane!</h1>

    {/* CTA Section (Consistent Yellow/Amber from Landing CTA) */}
    <div className="p-6 mb-8 bg-white rounded-xl shadow-lg border border-yellow-200 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-gray-800">Ready to create a new quiz?</h2>
      <button 
        className="flex items-center space-x-2 py-3 px-6 rounded-full text-gray-900 font-bold 
                   bg-gradient-to-r from-yellow-500 to-amber-500 shadow-md 
                   hover:from-yellow-400 hover:to-amber-400 transition duration-300 transform hover:scale-[1.03]"
      >
        <Plus className="w-5 h-5" />
        <span>Create with AI</span>
      </button>
    </div>

    {/* Stats Cards - Clean White Cards with Brand Accents */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard title="Quizzes Created" value="42" icon={Feather} color="indigo" />
      <StatCard title="Total Responses" value="1,850" icon={BarChart3} color="blue" />
      <StatCard title="Avg. Score" value="78%" icon={Zap} color="yellow" />
    </div>

    {/* Recent Activity / Projects Table Placeholder */}
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Quiz Activity</h3>
      <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
        Quiz list or table component goes here...
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon: Icon, color }) => {
  const iconClasses = {
    indigo: "bg-indigo-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };

  return (
    <div className="p-5 rounded-xl bg-white shadow-xl border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        </div>
        {/* Consistent brand-colored icon badge */}
        <div className={`p-2 rounded-full ${iconClasses[color]} shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-xs mt-3 text-gray-400">
        {color === 'yellow' ? "Benchmark set high" : "See detailed report"}
      </p>
    </div>
  );
};

// --- Main Layout Component ---
const LightDashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
      {/* Sidebar Component */}
      <LightSidebar />
      
      {/* Main Content Area */}
      <LightDashboardContent />

    </div>
  );
};

export default LightDashboardLayout;