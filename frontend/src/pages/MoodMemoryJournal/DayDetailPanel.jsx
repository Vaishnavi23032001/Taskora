import React, { useState, useEffect } from "react";

const MOODS = [
  { level: 1, label: "Rough", emoji: "😔" },
  { level: 2, label: "Low", emoji: "😕" },
  { level: 3, label: "Neutral", emoji: "😐" },
  { level: 4, label: "Good", emoji: "🙂" },
  { level: 5, label: "Great", emoji: "😄" },
];

export default function DayDetailPanel({
  selectedDate,
  entry = {},
  onSaveEntry,
}) {
  const [journalText, setJournalText] = useState("");
  const [gratitudes, setGratitudes] = useState([]);
  const [memories, setMemories] = useState([]);
  const [mood, setMood] = useState(null);
  const [newGratitude, setNewGratitude] = useState("");
  const [newMemory, setNewMemory] = useState("");
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Sync state whenever selectedDate or entry changes
  useEffect(() => {
    setJournalText(entry?.journal || "");
    setGratitudes(entry?.gratitudes ? [...entry.gratitudes] : []);
    setMemories(entry?.memories ? [...entry.memories] : []);
    setMood(entry?.mood || null);
    setIsSavedNotice(false);
  }, [selectedDate, entry]);

  // Format date headers
  const dayOfWeek = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const dayNum = selectedDate.getDate();
  const monthName = selectedDate.toLocaleDateString("en-US", { month: "long" });
  const year = selectedDate.getFullYear();

  // Word count calculation
  const wordCount = journalText.trim()
    ? journalText.trim().split(/\s+/).length
    : 0;

  const handleAddGratitude = (e) => {
    e?.preventDefault();
    if (!newGratitude.trim()) return;
    setGratitudes([...gratitudes, newGratitude.trim()]);
    setNewGratitude("");
  };

  const handleRemoveGratitude = (index) => {
    setGratitudes(gratitudes.filter((_, idx) => idx !== index));
  };

  const handleAddMemory = (e) => {
    e?.preventDefault();
    if (!newMemory.trim()) return;
    setMemories([...memories, newMemory.trim()]);
    setNewMemory("");
  };

  const handleRemoveMemory = (index) => {
    setMemories(memories.filter((_, idx) => idx !== index));
  };

  const handleSave = () => {
    onSaveEntry?.({
      journal: journalText,
      gratitudes,
      memories,
      mood,
      moodEmoji: MOODS.find((m) => m.level === mood)?.emoji || "",
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  return (
    <div className="flex flex-col space-y-5 rounded-3xl border border-white/60 bg-white/95 p-6 shadow-xl backdrop-blur-md">
      {/* Date Title Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">
            {dayOfWeek} {dayNum}
          </h2>
          <p className="text-xs font-semibold text-purple-600">
            {monthName} {year}
          </p>
        </div>

        {/* Quick Mood Selector */}
        <div className="flex items-center gap-1 rounded-2xl bg-purple-50/70 p-1 border border-purple-100">
          {MOODS.map((m) => (
            <button
              key={m.level}
              type="button"
              onClick={() => setMood(m.level)}
              title={m.label}
              className={`flex h-8 w-8 items-center justify-center rounded-xl text-base transition-all ${
                mood === m.level
                  ? "bg-gradient-to-r from-[#573aa7] to-[#763fd9] text-white shadow-sm scale-110"
                  : "text-gray-400 hover:text-gray-700 hover:bg-purple-100/50"
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Quote / Reflection Prompt */}
      <p className="text-xs font-medium italic text-gray-500">
        "Write hard and clear about what hurts, and what brings you joy."
      </p>

      {/* 1. Journal Entry Card */}
      <div className="rounded-2xl border border-purple-100 bg-[#faf8ff] p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-purple-100/70">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[#573aa7] to-[#763fd9] text-white text-xs">
              📖
            </span>
            <h3 className="text-sm font-bold text-gray-800">Journal</h3>
          </div>
          <span className="rounded-full bg-purple-100/70 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
        </div>

        <textarea
          rows={5}
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Reflect on your day, memorable moments, feelings, or realizations..."
          className="mt-3 w-full rounded-xl border border-transparent bg-transparent p-2 text-xs leading-relaxed text-gray-700 outline-none placeholder-purple-300 focus:border-purple-200 focus:bg-white"
        />
      </div>

      {/* 2. Gratitude Card */}
      <div className="rounded-2xl border border-purple-100 bg-[#faf8ff] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-purple-100/70">
          <div className="flex items-center gap-2">
            <span className="text-sm">💛</span>
            <h3 className="text-sm font-bold text-gray-800">Gratitude</h3>
          </div>
          <span className="text-[11px] font-medium text-gray-400">
            {gratitudes.length} items
          </span>
        </div>

        {/* Gratitude items list */}
        <div className="space-y-1.5">
          {gratitudes.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-xs text-gray-700 border border-purple-100 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-500">💛</span>
                <span>{item}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveGratitude(idx)}
                className="text-gray-300 hover:text-red-500 font-bold px-1"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}

          {gratitudes.length === 0 && (
            <p className="text-[11px] text-gray-400 italic py-1">
              No gratitude notes added yet today.
            </p>
          )}
        </div>

        {/* Quick add gratitude input */}
        <form onSubmit={handleAddGratitude} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newGratitude}
            onChange={(e) => setNewGratitude(e.target.value)}
            placeholder="Add something you're grateful for..."
            className="flex-1 rounded-xl border border-purple-100 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none placeholder-purple-300 focus:border-purple-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-200 transition"
          >
            + Add
          </button>
        </form>
      </div>

      {/* 3. Daily Memory Card */}
      <div className="rounded-2xl border border-purple-100 bg-[#faf8ff] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-purple-100/70">
          <div className="flex items-center gap-2">
            <span className="text-sm">✨</span>
            <h3 className="text-sm font-bold text-gray-800">Daily Memory</h3>
          </div>
          <span className="text-[11px] font-medium text-gray-400">
            {memories.length} memories
          </span>
        </div>

        {/* Memory items list */}
        <div className="space-y-1.5">
          {memories.map((mem, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-xs text-gray-700 border border-purple-100 shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-purple-500">✨</span>
                <span>{mem}</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMemory(idx)}
                className="text-gray-300 hover:text-red-500 font-bold px-1"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}

          {memories.length === 0 && (
            <p className="text-[11px] text-gray-400 italic py-1">
              Capture a highlight or special moment from today.
            </p>
          )}
        </div>

        {/* Quick add memory input */}
        <form onSubmit={handleAddMemory} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            placeholder="Record a memorable moment..."
            className="flex-1 rounded-xl border border-purple-100 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none placeholder-purple-300 focus:border-purple-400"
          />
          <button
            type="submit"
            className="rounded-xl bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-200 transition"
          >
            + Add
          </button>
        </form>
      </div>

      {/* Save Button & Status indicator */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleSave}
          className="w-full rounded-2xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:brightness-105 transition"
        >
          {isSavedNotice ? "✓ Saved to Calendar!" : "Save Today's Reflection"}
        </button>
      </div>
    </div>
  );
}
