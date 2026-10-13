import React from "react";
import HabitCard from "./HabitCard.jsx";

export default function HabitList({ habits = [] }) {
  const sampleHabits = habits.length > 0 ? habits : [
    { id: 1, name: "Morning Meditation", icon: "🧘", currentStreak: 5 },
    { id: 2, name: "Drink 2L Water", icon: "💧", currentStreak: 12 },
    { id: 3, name: "Read 20 Pages", icon: "📖", currentStreak: 3 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Today's Habits</h3>
        <button className="rounded-2xl bg-gradient-to-r from-[#661cea] to-[#9d5eea] px-4 py-2 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:brightness-105">
          + Add Habit
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleHabits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}
