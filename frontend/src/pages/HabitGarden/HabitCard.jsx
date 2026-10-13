import React from "react";

export default function HabitCard({ habit }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-xs border border-purple-100 flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-xl">
          {habit?.icon || "🌱"}
        </div>
        <div>
          <h4 className="font-bold text-gray-800">{habit?.name || "Daily Habit"}</h4>
          <p className="text-xs text-purple-600 font-medium">
            Streak: {habit?.currentStreak || 0} days 🔥
          </p>
        </div>
      </div>

      <button className="rounded-2xl border border-purple-200 bg-purple-50/50 px-4 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100">
        Check In
      </button>
    </div>
  );
}
