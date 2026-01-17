"use client";

import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function DashboardLayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        mounted={mounted}
      />
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />
        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          {children}
        </main>
      </div>
    </div>
  );
}
