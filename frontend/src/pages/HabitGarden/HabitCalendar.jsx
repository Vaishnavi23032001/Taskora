import React, { useState, useEffect, useRef } from "react";

export default function HabitCalendar({
  selectedDate,
  onSelectDate,
  calendarData,
  onMonthChange,
}) {
  const currentDate = new Date();
  const [viewDate, setViewDate] = useState(() => new Date(selectedDate || currentDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed

  // Store stable ref to onMonthChange to prevent re-triggering loops
  const onMonthChangeRef = useRef(onMonthChange);
  useEffect(() => {
    onMonthChangeRef.current = onMonthChange;
  }, [onMonthChange]);

  // Track last fetched month/year to avoid duplicate API calls
  const lastFetchedRef = useRef({ month: null, year: null });

  // Sync viewDate when selectedDate month/year actually changes
  useEffect(() => {
    if (selectedDate) {
      const d = new Date(selectedDate);
      if (!isNaN(d.getTime())) {
        const targetYear = d.getFullYear();
        const targetMonth = d.getMonth();
        if (targetYear !== year || targetMonth !== month) {
          setViewDate(new Date(targetYear, targetMonth, 1));
        }
      }
    }
  }, [selectedDate, year, month]);

  // Fetch calendar month data ONLY when month or year changes
  useEffect(() => {
    const targetMonth = month + 1;
    if (
      lastFetchedRef.current.month !== targetMonth ||
      lastFetchedRef.current.year !== year
    ) {
      lastFetchedRef.current = { month: targetMonth, year };
      if (onMonthChangeRef.current) {
        onMonthChangeRef.current(targetMonth, year);
      }
    }
  }, [month, year]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  // Compute days in current month
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map calendarData by date string
  const completionMap = {};
  if (calendarData?.days) {
    calendarData.days.forEach((d) => {
      completionMap[d.date] = d;
    });
  }

  const todayStr = currentDate.toISOString().split("T")[0];

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition"
        >
          ‹
        </button>
        <h3 className="font-bold text-sm text-gray-800">
          {monthNames[month]} {year}
        </h3>
        <button
          type="button"
          onClick={handleNextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-xl text-gray-400 hover:bg-purple-50 hover:text-purple-600 transition"
        >
          ›
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider py-1.5">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mt-1">
        {/* Leading empty spaces */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8" />
        ))}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            dayNum
          ).padStart(2, "0")}`;

          const isSelected = selectedDate === dateStr;
          const isToday = todayStr === dateStr;
          const dayData = completionMap[dateStr];
          const hasCompletion = dayData && dayData.completedCount > 0;

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`relative flex h-8 w-full flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-purple-100 text-purple-800 ring-2 ring-purple-300 font-bold"
                  : isToday
                  ? "border border-purple-200 text-purple-700 bg-purple-50/50"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              <span>{dayNum}</span>
              {hasCompletion && (
                <span
                  className={`absolute bottom-1 h-1 w-1 rounded-full ${
                    isSelected ? "bg-purple-700" : "bg-emerald-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Reset to Today button */}
      {selectedDate !== todayStr && (
        <div className="mt-3 pt-2 text-center border-t border-purple-50">
          <button
            type="button"
            onClick={() => onSelectDate(todayStr)}
            className="text-[11px] font-bold text-purple-600 hover:text-purple-700 underline"
          >
            ← Back to Today
          </button>
        </div>
      )}
    </div>
  );
}
