import React, { useState } from "react";
import CalendarGrid from "./CalendarGrid.jsx";
import DayDetailPanel from "./DayDetailPanel.jsx";

// Initial sample data matching the reference image so the calendar looks full of memories right away!
const INITIAL_ENTRIES = {
  "2026-03-02": {
    journal: "Quiet morning walk through the park. The first signs of spring are appearing.",
    gratitudes: ["The cherry blossoms blooming", "A perfectly timed coffee", "Mom's voice on the phone"],
    memories: ["Hearing birds chirp at 6am"],
    mood: 5,
    moodEmoji: "😄",
  },
  "2026-03-03": {
    journal: "Tried a new recipe today. Spent an hour reading before heading to work.",
    gratitudes: ["Finding a new book", "Saturday morning calm", "Morning light across the room"],
    memories: ["Finished chapter 4"],
    mood: 4,
    moodEmoji: "🙂",
  },
  "2026-03-06": {
    journal: "Walked down to the bakery early. Felt deeply at peace.",
    gratitudes: ["Warm croissant from the corner shop", "Pixel finally resting peacefully"],
    memories: ["Fresh bakery scent in the morning air"],
    mood: 5,
    moodEmoji: "😄",
  },
  "2026-03-12": {
    gratitudes: ["Waking up to birds", "The Saône river at dusk"],
    memories: ["Golden hour by the river"],
    mood: 4,
    moodEmoji: "🙂",
  },
  "2026-03-13": {
    gratitudes: ["A perfectly pulled espresso", "Hot coffee on a chilly morning", "Pixel's head tilt"],
    memories: ["Pixel playing fetch in the yard"],
    mood: 5,
    moodEmoji: "😄",
  },
  "2026-03-24": {
    gratitudes: ["Nadia's courage in the meeting", "The sound of rain while reading"],
    memories: ["Rain against the window"],
    mood: 4,
    moodEmoji: "🙂",
  },
  "2026-03-30": {
    journal: "Spent Saturday at the Croix-Rousse market with Camille. Bought too many vegetables, some goat cheese from a farmer who remembered us from last year, and a jar of honey from the Monts du Lyonnais. Made ratatouille in the evening — the apartment smelled incredible for hours.",
    gratitudes: ["Pixel making a friend at the dog park", "Spring light lasting until 8pm"],
    memories: ["The whole team laughing at Léa's impression of the VP"],
    mood: 5,
    moodEmoji: "😄",
  },
};

export default function MoodMemoryJournal() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 30)); // March 2026 matching screenshot
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 30));
  const [activeFilter, setActiveFilter] = useState("all");
  const [entriesByDate, setEntriesByDate] = useState(INITIAL_ENTRIES);

  const selectedKey = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const currentEntry = entriesByDate[selectedKey] || {
    journal: "",
    gratitudes: [],
    memories: [],
    mood: null,
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleJumpToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleSaveEntry = (updatedData) => {
    setEntriesByDate((prev) => ({
      ...prev,
      [selectedKey]: {
        ...prev[selectedKey],
        ...updatedData,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with App's Theme */}
      <div className="rounded-2xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-5 text-white shadow-xl shadow-purple-500/20 border border-white/20">
        {/* <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
          Module 3 • Life in Days
        </span> */}
        <h1 className=" text-xl sm:text-2xl font-extrabold">
          Mood & Memory Journal 📖
        </h1>
        {/* <p className="mt-1 text-sm text-purple-100 max-w-xl">
          A visual calendar of your whole life — daily reflections, gratitude moments, and heartfelt memories.
        </p> */}
      </div>

      {/* Main 2-Column Life Calendar Interface matching reference image */}
      <div className="grid gap-6 xl:grid-cols-12 items-start">
        
        {/* Left Column: Month Calendar Grid with Filters (approx 7 of 12 columns) */}
        <div className="xl:col-span-7">
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onJumpToToday={handleJumpToToday}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            entriesByDate={entriesByDate}
          />
        </div>

        {/* Right Column: Selected Day Detail & Recording Panel (approx 5 of 12 columns) */}
        <div className="xl:col-span-5 sticky top-24">
          <DayDetailPanel
            selectedDate={selectedDate}
            entry={currentEntry}
            onSaveEntry={handleSaveEntry}
          />
        </div>
      </div>
    </div>
  );
}
