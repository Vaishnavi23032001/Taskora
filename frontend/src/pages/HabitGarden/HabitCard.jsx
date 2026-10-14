import React from "react";

export default function HabitCard({ habit, onToggle, onClick }) {
  const isPositive = habit.type !== "negative";
  const isCompleted = Boolean(habit.isCompleted);

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(habit._id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(habit);
    }
  };

  // Format frequency label
  const frequencyLabel =
    habit.frequency === "weekly"
      ? `${habit.targetDaysPerWeek || 3}x per week`
      : habit.targetDaysPerWeek && habit.targetDaysPerWeek < 7
      ? `Daily ${habit.targetDaysPerWeek}/7`
      : "Daily";

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex items-center justify-between rounded-2xl border p-4 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
        isCompleted
          ? isPositive
            ? "border-emerald-200 bg-emerald-50/30 hover:border-emerald-300"
            : "border-purple-200 bg-purple-50/30 hover:border-purple-300"
          : isPositive
          ? "border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50/10"
          : "border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50/10"
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Habit Icon Container */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl shadow-xs transition-transform group-hover:scale-105 ${
            isPositive
              ? isCompleted
                ? "bg-emerald-100/90 text-emerald-800"
                : "bg-emerald-50 text-emerald-700"
              : isCompleted
              ? "bg-purple-100/90 text-purple-800"
              : "bg-purple-50 text-purple-700"
          }`}
        >
          {habit.icon || (isPositive ? "🌱" : "🚫")}
        </div>

        {/* Habit Text Info */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-bold text-sm truncate ${
                isCompleted ? "text-gray-900" : "text-gray-800"
              }`}
            >
              {habit.name}
            </h4>
            <span className="text-[10px] font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
              (click to edit)
            </span>
          </div>

          <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1 font-medium text-gray-600">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {frequencyLabel}
            </span>

            <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
              🔥 {habit.currentStreak || 0}-day streak
            </span>
          </div>
        </div>
      </div>

      {/* Checkbox Toggle Button */}
      <button
        type="button"
        onClick={handleCheckboxClick}
        aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-200 focus:outline-hidden ${
          isCompleted
            ? isPositive
              ? "border-emerald-500 bg-emerald-500 text-white shadow-xs shadow-emerald-500/30 scale-105"
              : "border-purple-600 bg-purple-600 text-white shadow-xs shadow-purple-600/30 scale-105"
            : "border-gray-300 bg-white hover:border-purple-400"
        }`}
      >
        {isCompleted && (
          <svg
            className="w-4 h-4 stroke-[3]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
}
