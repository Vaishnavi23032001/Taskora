import React from "react";
import HabitList from "./HabitList.jsx";
import VirtualGarden from "./VirtualGarden.jsx";

export default function HabitGarden() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-7 text-white shadow-lg shadow-purple-500/15">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
          Module 1
        </span>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold">Habit Garden 🌿</h1>
        <p className="mt-1 text-sm text-purple-100 max-w-xl">
          Nurture daily habits, cultivate unbroken streaks, and watch your virtual garden flourish.
        </p>
      </div>

      {/* Virtual Garden preview */}
      <VirtualGarden />

      {/* Habit List section */}
      <HabitList />
    </div>
  );
}
