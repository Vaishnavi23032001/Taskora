import React from "react";

export default function VirtualGarden({ stage = "Sprout", xp = 150 }) {
  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl shadow-xs">
            🌱
          </div>
          <div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
              Stage: {stage}
            </span>
            <h3 className="mt-1 text-lg font-bold text-gray-800">Your Garden Sanctuary</h3>
            <p className="text-xs text-gray-500">Every completed habit waters your garden and awards XP.</p>
          </div>
        </div>

        <div className="rounded-2xl bg-purple-50 px-5 py-3 text-center border border-purple-100">
          <p className="text-xs text-purple-600 font-semibold">Total XP Earned</p>
          <p className="text-xl font-black text-purple-900">{xp} XP ✨</p>
        </div>
      </div>
    </div>
  );
}
