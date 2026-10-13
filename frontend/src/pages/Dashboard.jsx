import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-8 text-white shadow-2xl shadow-purple-950/25 border border-white/30 backdrop-blur-md">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            ✨ Daily Growth Space
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome, {user?.name || "Growora Member"}!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-purple-100 leading-relaxed">
            Every small action nurtures personal growth. Track your daily habits, advance your skills, and reflect on your mindful journey.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/habits"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-bold text-purple-700 shadow-md transition hover:bg-purple-50"
            >
              Check Habits →
            </Link>
            <Link
              to="/journal"
              className="rounded-full bg-white/15 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-xs transition hover:bg-white/25"
            >
              Write Reflection
            </Link>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Module Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Habit Garden card */}
        <div className="group rounded-3xl bg-white p-6 shadow-sm border border-purple-100 transition-all hover:shadow-md hover:border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl shadow-xs">
              🌱
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
              Module 1
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-800">Habit Garden</h3>
          <p className="mt-1 text-sm text-gray-500">
            Build routines, check in daily, and watch your virtual garden flourish with XP and streaks.
          </p>
          <Link
            to="/habits"
            className="mt-4 inline-flex items-center text-xs font-bold text-purple-600 hover:text-purple-700"
          >
            Open Garden →
          </Link>
        </div>

        {/* SkillTrack card */}
        <div className="group rounded-3xl bg-white p-6 shadow-sm border border-purple-100 transition-all hover:shadow-md hover:border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl shadow-xs">
              ⚡
            </div>
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">
              Module 2
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-800">SkillTrack</h3>
          <p className="mt-1 text-sm text-gray-500">
            Set weekly goals, break skills into lessons and topics, and celebrate learning milestones.
          </p>
          <Link
            to="/skills"
            className="mt-4 inline-flex items-center text-xs font-bold text-purple-600 hover:text-purple-700"
          >
            Track Skills →
          </Link>
        </div>

        {/* Mood & Memory Journal card */}
        <div className="group rounded-3xl bg-white p-6 shadow-sm border border-purple-100 transition-all hover:shadow-md hover:border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-2xl shadow-xs">
              📖
            </div>
            <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-bold text-pink-600">
              Module 3
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold text-gray-800">Mood & Memory Journal</h3>
          <p className="mt-1 text-sm text-gray-500">
            Check in your daily mood, write private gratitude thoughts, and review mood trends.
          </p>
          <Link
            to="/journal"
            className="mt-4 inline-flex items-center text-xs font-bold text-purple-600 hover:text-purple-700"
          >
            Open Journal →
          </Link>
        </div>
      </div>
    </div>
  );
}
