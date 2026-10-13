import React from "react";

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-7 text-white shadow-lg shadow-purple-500/15">
        <h1 className="text-2xl sm:text-3xl font-bold">Unified Calendar 📅</h1>
        <p className="mt-1 text-sm text-purple-100 max-w-xl">
          Unified schedule view of habit check-ins, study sessions, and journal memories.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-xs border border-purple-100 text-center py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-600 mb-4">
          🗓️
        </div>
        <h3 className="text-lg font-bold text-gray-800">Growth Calendar</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
          Weekly and monthly timeline views will display your daily streak check-ins, milestones, and reflections.
        </p>
      </div>
    </div>
  );
}
