import React from "react";
import HabitSection from "./HabitSection.jsx";

export default function HabitList({
  habits = [],
  onAddNew,
  onEditHabit,
  onToggleHabit,
}) {
  return (
    <div className="space-y-6">
      {/* Positive Habits Container */}
      <HabitSection
        title="Positive Habits"
        type="positive"
        habits={habits}
        onAddNew={onAddNew}
        onEditHabit={onEditHabit}
        onToggleHabit={onToggleHabit}
      />

      {/* Negative Habits Container */}
      <HabitSection
        title="Negative Habits"
        type="negative"
        habits={habits}
        onAddNew={onAddNew}
        onEditHabit={onEditHabit}
        onToggleHabit={onToggleHabit}
      />
    </div>
  );
}
