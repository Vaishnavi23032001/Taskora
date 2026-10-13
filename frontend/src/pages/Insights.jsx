import React from "react";

export default function Insights() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-7 text-white shadow-lg shadow-purple-500/15">
        <h1 className="text-2xl sm:text-3xl font-bold">Growth Insights 📊</h1>
        <p className="mt-1 text-sm text-purple-100 max-w-xl">
          Analytics, consistency trends, study hour distributions, and mood tracking patterns.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-xs border border-purple-100">
          <h3 className="font-bold text-gray-800">Habit Consistency Analytics</h3>
          <p className="mt-1 text-sm text-gray-500">Weekly completion percentage and activity heatmaps.</p>
          <div className="mt-6 h-36 rounded-2xl bg-purple-50/60 flex items-center justify-center text-purple-400 text-sm">
            Activity Heatmap Placeholder
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xs border border-purple-100">
          <h3 className="font-bold text-gray-800">Learning & Mood Overview</h3>
          <p className="mt-1 text-sm text-gray-500">Study hours breakdown and 5-level mood charts.</p>
          <div className="mt-6 h-36 rounded-2xl bg-purple-50/60 flex items-center justify-center text-purple-400 text-sm">
            Mood Distribution Chart Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
