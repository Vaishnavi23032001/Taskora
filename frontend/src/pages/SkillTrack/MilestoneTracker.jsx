import React from "react";

export default function MilestoneTracker({ milestones = [] }) {
  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-gray-800">Weekly Target & Milestones 🎯</h4>
        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
          Target: 8 Hours / Week
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white text-xs font-bold">
            1
          </span>
          <div>
            <p className="text-xs font-bold text-gray-800">Build REST API Endpoints</p>
            <p className="text-[11px] text-gray-500">Due: Friday • Status: In Progress</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-200 text-purple-800 text-xs font-bold">
            2
          </span>
          <div>
            <p className="text-xs font-bold text-gray-800">Complete Tailwind Design</p>
            <p className="text-[11px] text-gray-500">Due: Sunday • Status: Upcoming</p>
          </div>
        </div>
      </div>
    </div>
  );
}
