import { Bell, Menu, Search } from "lucide-react";
import React from "react";

export default function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 relative group">
            <Bell
              size={20}
              className="text-gray-600 group-hover:text-blue-600 transition-colors"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>

          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse cursor-pointer hover:scale-110 transition-transform duration-200" />
        </div>
      </div>
    </header>
  );
}
