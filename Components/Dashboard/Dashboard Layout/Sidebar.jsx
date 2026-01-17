import React, { useState } from "react";
import {
  X,
  Settings,
  Home,
  BarChart3,
  Users,
  FileText,
  Calendar,
  Mail,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar({ sidebarOpen, setSidebarOpen, mounted }) {
  const pathname = usePathname();
  const rootPath = pathname.split("/")[1];
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: FileText, label: "Documents", path: "/documents" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Mail, label: "Messages", path: "/messages" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const allRoutes = [
    { icon: Home, label: "Dashboard", route: "/dashboard", active: true },
    { icon: BarChart3, label: "Analytics", route: "/analytics" },
    { icon: Users, label: "Users", route: "/users" },
    { icon: Users, label: "User Management", route: "/users/management" },
    { icon: Users, label: "User Roles", route: "/users/roles" },
    { icon: FileText, label: "Documents", route: "/documents" },
    {
      icon: FileText,
      label: "Document Templates",
      route: "/documents/templates",
    },
    { icon: FileText, label: "File Manager", route: "/documents/files" },
    { icon: Calendar, label: "Calendar", route: "/calendar" },
    { icon: Calendar, label: "Events", route: "/calendar/events" },
    { icon: Calendar, label: "Scheduling", route: "/calendar/scheduling" },
    { icon: Mail, label: "Messages", route: "/messages" },
    { icon: Mail, label: "Inbox", route: "/messages/inbox" },
    { icon: Mail, label: "Compose", route: "/messages/compose" },
    { icon: Settings, label: "Settings", route: "/settings" },
    { icon: Settings, label: "Account Settings", route: "/settings/account" },
    { icon: Settings, label: "Privacy Settings", route: "/settings/privacy" },
    { icon: BarChart3, label: "Reports", route: "/reports" },
    { icon: BarChart3, label: "Sales Reports", route: "/reports/sales" },
    { icon: BarChart3, label: "Performance", route: "/reports/performance" },
  ];

  const filteredRoutes = allRoutes.filter(
    (route) =>
      route.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showSearchResults =
    searchQuery.length > 0 && (searchFocused || filteredRoutes.length > 0);

  return (
    <div>
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-blue-600 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          {/* logo of the website */}
          <div className="w-32 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg animate-pulse" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar in Sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSearchFocused(false);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {showSearchResults && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Search Results ({filteredRoutes.length})
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {filteredRoutes.slice(0, 8).map((route, index) => {
                const Icon = route.icon;
                return (
                  <div
                    key={route.route}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-l-4 hover:border-blue-500 group ${
                      mounted ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => {
                      setSearchQuery("");
                      setSearchFocused(false);
                      // Handle route navigation here
                    }}
                  >
                    <Icon
                      size={16}
                      className="text-gray-500 group-hover:text-blue-500 transition-colors flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                        {route.label}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors truncate">
                        {route.route}
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
              {filteredRoutes.length > 8 && (
                <div className="text-xs text-gray-500 text-center py-2">
                  +{filteredRoutes.length - 8} more results
                </div>
              )}
              {filteredRoutes.length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  No routes found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.path}
                key={item.label}
                className={`${
                  item.path.split("/")[1] === rootPath ? "bg-white" : ""
                } flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#7BB1F8] group ${
                  mounted ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon
                  size={20}
                  className={`transition-colors ${
                    item.path.split("/")[1] === rootPath
                      ? "text-[#0065E7]"
                      : "text-white"
                  } group-hover:text-blue-500 icon`}
                />
                <span
                  className={`font-medium transition-colors ${
                    item.path.split("/")[1] === rootPath
                      ? "text-[#0065E7]"
                      : "text-white"
                  } group-hover:text-blue-600 text`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <style>{`
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
