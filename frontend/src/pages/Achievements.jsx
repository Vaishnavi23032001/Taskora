import React from "react";

export default function Achievements() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-7 text-white shadow-lg shadow-purple-500/15">
        <h1 className="text-2xl sm:text-3xl font-bold">Achievements & Badges 🏆</h1>
        <p className="mt-1 text-sm text-purple-100 max-w-xl">
          Unlock badges, celebrate milestone streaks, and level up your virtual garden XP.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "First Sprout", desc: "Complete your first daily habit", icon: "🌱", status: "Unlocked" },
          { title: "7-Day Streak", desc: "Maintain 7 consecutive days", icon: "🔥", status: "In Progress" },
          { title: "Deep Thinker", desc: "Write 5 journal entries", icon: "✍️", status: "In Progress" },
          { title: "Skill Master", desc: "Complete 1 learning milestone", icon: "⭐", status: "Locked" },
        ].map((badge, idx) => (
          <div key={idx} className="rounded-3xl bg-white p-5 shadow-xs border border-purple-100">
            <div className="text-3xl mb-3">{badge.icon}</div>
            <h4 className="font-bold text-gray-800">{badge.title}</h4>
            <p className="text-xs text-gray-500 mt-1">{badge.desc}</p>
            <span className="inline-block mt-3 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-semibold text-purple-600">
              {badge.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
