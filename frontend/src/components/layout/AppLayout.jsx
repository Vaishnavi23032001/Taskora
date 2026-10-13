import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#ebe4f7] via-[#f0eafb] to-[#e4dbf5] text-gray-800 antialiased font-sans">
      {/* Fixed Sticky Sidebar on Left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right Column: Header + Scrollable Main Content */}
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        {/* Sticky Header at Top */}
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
