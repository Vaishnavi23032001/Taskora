import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header({ onOpenSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full flex-shrink-0 items-center justify-between border-b border-purple-100/70 bg-white/80 px-6 backdrop-blur-md">
      {/* Left side: Mobile menu toggle + page greeting */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-white text-gray-600 shadow-xs hover:bg-purple-50 hover:text-purple-700 lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Welcome back, {user?.name || "Friend"}! 👋
          </h2>
          <p className="hidden text-xs text-purple-600 sm:block">
            Track your habits, skills & mood in one space
          </p>
        </div>
      </div>

      {/* Right side: Search, notification icon & profile */}
      <div className="flex items-center gap-3">
        {/* Search Bar matching modern UI screenshot */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search activities, notes..."
            className="w-56 rounded-full border border-purple-100 bg-purple-50/50 py-2 pr-4 pl-9 text-xs text-gray-700 placeholder-purple-400 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-200"
          />
          <svg
            className="absolute top-2.5 left-3 h-4 w-4 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notification Bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-100 bg-white text-gray-600 shadow-xs hover:bg-purple-50 hover:text-purple-700">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-pink-500" />
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7c4dff] to-[#ec4899] font-semibold text-white shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <button
            onClick={logout}
            title="Log out"
            className="flex h-10 items-center gap-1.5 rounded-xl border border-purple-100 bg-white px-3 py-1.5 text-xs font-semibold text-purple-700 shadow-xs transition hover:bg-purple-50 hover:text-purple-900"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
