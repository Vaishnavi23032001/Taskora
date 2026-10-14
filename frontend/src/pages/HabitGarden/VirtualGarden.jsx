import React from "react";

export default function VirtualGarden({ garden }) {
  const stage = garden?.stage || "Sprout";
  const xp = garden?.xp ?? 150;
  const icon = garden?.icon || "🌱";
  const nextStage = garden?.nextStage || "Sapling";
  const nextStageAt = garden?.nextStageAt || 250;
  const progressPercent = garden?.progressToNextStage ?? 40;

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Plant Icon & Stage Details */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl shadow-xs animate-bounce-subtle">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                Stage: {stage}
              </span>
              {nextStage && (
                <span className="text-[11px] text-gray-400">
                  → Next: {nextStage} ({nextStageAt} XP)
                </span>
              )}
            </div>
            <h3 className="mt-1 text-lg font-bold text-gray-800">Your Garden Sanctuary</h3>
            <p className="text-xs text-gray-500">
              Every completed habit waters your garden and awards +10 XP. Maintain streaks for milestone bonuses!
            </p>
          </div>
        </div>

        {/* XP Badge & Growth Progress */}
        <div className="min-w-[180px] rounded-2xl bg-purple-50/70 p-3.5 border border-purple-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-600 font-bold">Total Growth XP</span>
            <span className="text-sm font-black text-purple-900">{xp} XP ✨</span>
          </div>

          {/* Progress bar to next stage */}
          <div className="mt-2.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-purple-200/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-purple-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px] font-semibold text-purple-500">
              <span>{progressPercent}% to next bloom</span>
              <span>{stage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
