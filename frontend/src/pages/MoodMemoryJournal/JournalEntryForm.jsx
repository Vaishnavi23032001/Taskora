import React, { useState } from "react";

export default function JournalEntryForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs space-y-4">
      <h4 className="font-bold text-gray-800">New Reflection ✍️</h4>

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Today's thought..."
          className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 px-3.5 py-2 text-xs text-gray-800 outline-none focus:border-purple-400 focus:bg-white"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-600 block mb-1">Journal Entry</label>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What went well today? What are you grateful for?"
          className="w-full rounded-2xl border border-purple-100 bg-purple-50/40 p-3.5 text-xs text-gray-800 outline-none focus:border-purple-400 focus:bg-white"
        />
      </div>

      <button className="w-full rounded-2xl bg-gradient-to-r from-[#661cea] to-[#9d5eea] py-2.5 text-xs font-bold text-white shadow-md shadow-purple-500/20 hover:brightness-105">
        Save Reflection
      </button>
    </div>
  );
}
