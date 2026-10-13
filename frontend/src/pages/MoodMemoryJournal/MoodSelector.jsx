import React, { useState } from "react";

const moods = [
  { level: 1, label: "Rough", emoji: "😔" },
  { level: 2, label: "Low", emoji: "😕" },
  { level: 3, label: "Neutral", emoji: "😐" },
  { level: 4, label: "Good", emoji: "🙂" },
  { level: 5, label: "Great", emoji: "😄" },
];

export default function MoodSelector({ selectedMood = 4, onSelectMood }) {
  const [active, setActive] = useState(selectedMood);

  const handleSelect = (level) => {
    setActive(level);
    onSelectMood?.(level);
  };

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-gray-800">How are you feeling today? 💭</h4>
          <p className="text-xs text-gray-500">Record a quick mood check-in with one click</p>
        </div>

        <div className="flex gap-2.5">
          {moods.map((m) => (
            <button
              key={m.level}
              onClick={() => handleSelect(m.level)}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3.5 py-2 transition-all ${active === m.level
                  ? "bg-gradient-to-r from-[#661cea] to-[#9d5eea] text-white shadow-md shadow-purple-500/25 scale-105"
                  : "bg-purple-50 text-gray-700 hover:bg-purple-100/70"
                }`}
            >
              <span className="text-xl">{m.emoji}</span>
              <span className="text-[10px] font-bold">{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
