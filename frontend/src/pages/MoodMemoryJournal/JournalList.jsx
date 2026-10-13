import React from "react";

export default function JournalList({ entries = [] }) {
  const sampleEntries = entries.length > 0 ? entries : [
    {
      id: 1,
      title: "Grateful for morning walk",
      content: "Felt very fresh and energized today. Finished the first chapter of my course.",
      moodEmoji: "😄",
      date: "Today, 10:30 AM",
      tags: ["health", "morning"],
    },
    {
      id: 2,
      title: "Learning React 19 & Tailwind",
      content: "Built clean folder structures and layouts. Loving the purple aesthetics!",
      moodEmoji: "🙂",
      date: "Yesterday",
      tags: ["coding", "growth"],
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-bold text-gray-800">Recent Journal Entries</h4>

      <div className="space-y-3">
        {sampleEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-3xl border border-purple-100 bg-white p-5 shadow-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{entry.moodEmoji}</span>
                <h5 className="font-bold text-gray-800 text-sm">{entry.title}</h5>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">{entry.date}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{entry.content}</p>
            <div className="flex gap-1.5 pt-1">
              {entry.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
