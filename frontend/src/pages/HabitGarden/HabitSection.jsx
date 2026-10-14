import React, { useState } from "react";
import HabitCard from "./HabitCard.jsx";

export default function HabitSection({
  title,
  type = "positive",
  habits = [],
  onAddNew,
  onEditHabit,
  onToggleHabit,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const filteredHabits = habits.filter((h) => h.type === type);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-left group focus:outline-hidden"
        >
          <h3 className="text-base font-bold text-gray-800 group-hover:text-purple-700 transition">
            {title}
          </h3>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
              type === "positive"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {filteredHabits.length}
          </span>
          <span className="text-gray-400 text-xs transition-transform duration-200">
            {isExpanded ? "▲" : "▼"}
          </span>
        </button>
      </div>

      {/* Habit Cards List */}
      {isExpanded && (
        <div className="space-y-3">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onToggle={onToggleHabit}
                onClick={onEditHabit}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-purple-100 p-6 text-center text-xs text-gray-400">
              No {title.toLowerCase()} added yet. Start by creating one below!
            </div>
          )}

          {/* Add New Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => onAddNew(type)}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#2a1c72] to-[#4528aa] hover:from-[#352391] hover:to-[#5735cf] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-950/15 transition-all active:scale-98"
            >
              <span>+</span> Add new
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

