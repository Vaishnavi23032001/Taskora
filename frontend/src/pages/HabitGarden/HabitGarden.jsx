import React, { useState } from "react";
import useHabits from "../../hooks/useHabits.js";
import HabitList from "./HabitList.jsx";
import HabitSection from "./HabitSection.jsx";
import HabitCalendar from "./HabitCalendar.jsx";
import HabitChart from "./HabitChart.jsx";
import VirtualGarden from "./VirtualGarden.jsx";
import HabitModal from "./HabitModal.jsx";
import Alert from "../../components/common/Alert.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function HabitGarden() {
  const {
    habits,
    overview,
    analytics,
    calendarData,
    loading,
    actionLoading,
    error,
    setError,
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    timeframe,
    setTimeframe,
    selectedHabitId,
    setSelectedHabitId,
    fetchCalendar,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleCheckIn,
  } = useHabits();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [modalDefaultType, setModalDefaultType] = useState("positive");
  const [successToast, setSuccessToast] = useState("");

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  // Open modal in Create mode
  const handleAddNew = (type = "positive") => {
    setEditingHabit(null);
    setModalDefaultType(type);
    setModalOpen(true);
  };

  // Open modal in Edit mode when clicking on a habit card
  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setModalDefaultType(habit.type || "positive");
    setModalOpen(true);
  };

  // Save (Create or Update) Habit
  const handleModalSubmit = async (formData) => {
    if (editingHabit && editingHabit._id) {
      const res = await updateHabit(editingHabit._id, formData);
      if (res.success) {
        showToast("Habit updated successfully!");
        return { success: true };
      }
      return { success: false, message: res.message };
    } else {
      const res = await createHabit(formData);
      if (res.success) {
        showToast("New habit created! 🌱");
        return { success: true };
      }
      return { success: false, message: res.message };
    }
  };

  // Delete Habit
  const handleModalDelete = async (habitId) => {
    const res = await deleteHabit(habitId);
    if (res.success) {
      showToast("Habit removed.");
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  // Toggle Check-in
  const handleToggleHabit = async (habitId) => {
    const res = await toggleCheckIn(habitId, selectedDate);
    if (res?.data?.message) {
      showToast(res.data.message);
    }
  };

  // Filter habits locally by search query
  const displayedHabits = habits.filter((h) => {
    if (!searchQuery.trim()) return true;
    return h.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
  });

  const summary = overview?.summary || {
    todayProgress: 0,
    activeHabits: habits.length,
    completedToday: habits.filter((h) => h.isCompleted).length,
    leftToday: Math.max(0, habits.length - habits.filter((h) => h.isCompleted).length),
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <Alert type="success" message={successToast} onClose={() => setSuccessToast("")} />
        </div>
      )}

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {/* Top Search Bar & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Habits & Garden
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Viewing records for{" "}
            <span className="font-bold text-purple-700">{selectedDate}</span>
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search habits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-purple-100 bg-white pl-9 pr-4 py-2 text-xs text-gray-800 placeholder-gray-400 outline-none shadow-xs transition focus:border-purple-300 focus:ring-2 focus:ring-purple-100"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 4 Summary Cards (Today's Progress, Active Habits, Completed, Left Today) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Today's Progress */}
        <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-xl font-bold text-purple-700">
            ◐
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {summary.todayProgress}%
            </p>
            <p className="text-xs font-semibold text-gray-500">Today's Progress</p>
          </div>
        </div>

        {/* Active Habits */}
        <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
            ⚡
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {summary.activeHabits}
            </p>
            <p className="text-xs font-semibold text-gray-500">Active Habits</p>
          </div>
        </div>

        {/* Completed */}
        <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
            ✓
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {summary.completedToday}
            </p>
            <p className="text-xs font-semibold text-gray-500">Completed</p>
          </div>
        </div>

        {/* Left Today */}
        <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-xl text-amber-600">
            ⌛
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">
              {summary.leftToday}
            </p>
            <p className="text-xs font-semibold text-gray-500">Left Today</p>
          </div>
        </div>
      </div>

      {/* Virtual Garden Card */}
      <VirtualGarden garden={overview?.garden} />

      {/* Main Grid: Left Habits List (Positive + Negative) & Right Calendar + Charts */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Column 1 (Left): Positive Habits & Calendar (in negative habit's place) */}
          <div className="space-y-6">
            {/* Positive Habits */}
            <HabitSection
              title="Positive Habits"
              type="positive"
              habits={displayedHabits}
              onAddNew={handleAddNew}
              onEditHabit={handleEditHabit}
              onToggleHabit={handleToggleHabit}
            />

            {/* Calendar (moved to negative habit's place) */}
            <HabitCalendar
              selectedDate={selectedDate}
              onSelectDate={(date) => setSelectedDate(date)}
              calendarData={calendarData}
              onMonthChange={fetchCalendar}
            />
          </div>

          {/* Column 2 (Right): Negative Habits (parallel) & Progress Over Time Chart */}
          <div className="space-y-6">
            {/* Negative Habits (in parallel with Positive Habits) */}
            <HabitSection
              title="Negative Habits"
              type="negative"
              habits={displayedHabits}
              onAddNew={handleAddNew}
              onEditHabit={handleEditHabit}
              onToggleHabit={handleToggleHabit}
            />

            {/* Progress Over Time Chart */}
            <HabitChart
              analytics={analytics}
              habits={habits}
              timeframe={timeframe}
              onTimeframeChange={(tf) => setTimeframe(tf)}
              selectedHabitId={selectedHabitId}
              onHabitChange={(hId) => setSelectedHabitId(hId)}
            />
          </div>
        </div>
      )}

      {/* Habit Create / Update / Delete Modal */}
      <HabitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingHabit}
        defaultType={modalDefaultType}
        onSubmit={handleModalSubmit}
        onDelete={handleModalDelete}
        loading={actionLoading}
      />
    </div>
  );
}
