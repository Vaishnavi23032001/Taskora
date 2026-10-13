import React from "react";

const FILTER_OPTIONS = [
  { id: "all", label: "All", icon: "❖" },
  { id: "memories", label: "Memories", icon: "✨" },
  { id: "gratitudes", label: "Gratitudes", icon: "💛" },
  { id: "accomplishments", label: "Accomplishments", icon: "🏆" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({
  currentDate,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onJumpToToday,
  activeFilter,
  onFilterChange,
  entriesByDate = {},
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  // Calendar calculations
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Generate calendar cells (previous month pad + current month + next month pad)
  const calendarCells = [];

  // Previous month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevDate = new Date(year, month - 1, day);
    const dateKey = prevDate.toISOString().split("T")[0];
    calendarCells.push({
      day,
      dateKey,
      date: prevDate,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    calendarCells.push({
      day,
      dateKey,
      date: d,
      isCurrentMonth: true,
    });
  }

  // Next month padding to fill a complete 35 or 42 grid
  const remainingCells = (7 - (calendarCells.length % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    const nextDate = new Date(year, month + 1, day);
    const dateKey = nextDate.toISOString().split("T")[0];
    calendarCells.push({
      day,
      dateKey,
      date: nextDate,
      isCurrentMonth: false,
    });
  }

  const selectedKey = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  const todayKey = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col rounded-3xl border border-white/60 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      {/* Month Header and Filter Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div className="flex items-center gap-3">
          
          <div className="flex items-center gap-2">
            
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#573aa7] to-[#763fd9] bg-clip-text text-transparent">
              {monthName}
            </h2>
            <span className="text-lg font-bold text-gray-400">{year}</span>
          </div>

          {/* Month switcher arrows */}
          <div className="flex items-center gap-1 pl-2">
            <button
              onClick={onPrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-100 bg-purple-50/50 text-gray-600 hover:bg-purple-100"
              title="Previous Month"
            >
              ‹
            </button>
            <button
              onClick={onNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-purple-100 bg-purple-50/50 text-gray-600 hover:bg-purple-100"
              title="Next Month"
            >
              ›
            </button>
          </div>
        </div>

        {/* Filter Pills matching the UI reference image */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] text-white shadow-md shadow-purple-500/25"
                    : "border border-purple-100 bg-purple-50/40 text-gray-600 hover:bg-purple-100/60 hover:text-purple-900"
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            );
          })}

          <button
            onClick={onJumpToToday}
            className="rounded-full bg-purple-100/70 px-3.5 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-200 transition"
          >
            Today
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 pt-4 pb-2 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid of Day Cards */}
      <div className="grid grid-cols-7 gap-2 pt-2">
        {calendarCells.map((cell, idx) => {
          const isSelected = cell.dateKey === selectedKey;
          const isToday = cell.dateKey === todayKey;
          const entry = entriesByDate[cell.dateKey];

          // Determine preview items based on active filter
          const snippets = [];
          if (entry) {
            if (activeFilter === "all" || activeFilter === "gratitudes") {
              (entry.gratitudes || []).forEach((g) =>
                snippets.push({ type: "gratitude", text: g, icon: "💛" })
              );
            }
            if (activeFilter === "all" || activeFilter === "memories") {
              (entry.memories || []).forEach((m) =>
                snippets.push({ type: "memory", text: m, icon: "✨" })
              );
            }
            if (activeFilter === "all" || activeFilter === "accomplishments") {
              (entry.accomplishments || []).forEach((a) =>
                snippets.push({ type: "accomplishment", text: a, icon: "🏆" })
              );
            }
          }

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(cell.date)}
              className={`group relative flex min-h-[92px] sm:min-h-[105px] flex-col rounded-2xl p-2.5 text-left transition-all duration-150 border ${
                isSelected
                  ? "bg-gradient-to-br from-[#573aa7] via-[#763fd9] to-[#944dea] text-white shadow-lg shadow-purple-500/30 border-purple-400 scale-[1.02] z-10"
                  : cell.isCurrentMonth
                  ? "bg-[#faf8ff] text-gray-800 border-purple-100/70 hover:bg-purple-50/70 hover:border-purple-300"
                  : "bg-gray-50/40 text-gray-300 border-transparent hover:bg-gray-50"
              }`}
            >
              {/* Day Number and Today Indicator */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs sm:text-sm font-bold ${
                    isSelected
                      ? "text-white"
                      : cell.isCurrentMonth
                      ? "text-gray-700"
                      : "text-gray-300"
                  }`}
                >
                  {cell.day}
                </span>

                {isToday && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-white" : "bg-purple-600"
                    }`}
                    title="Today"
                  />
                )}
              </div>

              {/* Mood indicator badge if exists */}
              {entry?.moodEmoji && (
                <div className="mt-1">
                  <span className="text-xs">{entry.moodEmoji}</span>
                </div>
              )}

              {/* Snippet Bullet Previews matching the screenshot */}
              <div className="mt-1.5 flex flex-1 flex-col space-y-1 overflow-hidden">
                {snippets.slice(0, 3).map((snippet, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-1 text-[10px] leading-tight font-medium truncate ${
                      isSelected ? "text-purple-100" : "text-gray-600"
                    }`}
                  >
                    <span className="shrink-0">{snippet.icon}</span>
                    <span className="truncate">{snippet.text}</span>
                  </div>
                ))}

                {snippets.length > 3 && (
                  <span
                    className={`text-[9px] font-bold ${
                      isSelected ? "text-purple-200" : "text-purple-500"
                    }`}
                  >
                    +{snippets.length - 3} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
