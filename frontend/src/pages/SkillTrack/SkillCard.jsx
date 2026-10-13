import React from "react";

export default function SkillCard({ skill }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xs border border-purple-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold text-purple-700">
            {skill?.category || "Tech"}
          </span>
          <span className="text-xs font-semibold text-gray-400">
            {skill?.level || "Beginner"}
          </span>
        </div>
        <h4 className="mt-3 font-bold text-gray-800 text-lg">
          {skill?.title || "Full-Stack Development"}
        </h4>
        <p className="mt-1 text-xs text-gray-500">
          Target Level: {skill?.targetLevel || "Advanced"}
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold text-purple-600 mb-1">
            <span>Progress</span>
            <span>{skill?.progress || 45}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-purple-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#661cea] to-[#9d5eea]"
              style={{ width: `${skill?.progress || 45}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 pt-2 border-t border-purple-50">
        <button className="flex-1 rounded-xl bg-purple-50 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-100">
          Topics
        </button>
        <button className="rounded-xl border border-purple-200 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-50">
          + Session
        </button>
      </div>
    </div>
  );
}
