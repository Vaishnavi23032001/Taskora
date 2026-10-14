import React, { useState } from "react";

export default function HabitChart({
  analytics,
  habits = [],
  timeframe = "weekly",
  onTimeframeChange,
  selectedHabitId = "all",
  onHabitChange,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const stats = analytics?.stats || {
    currentStreak: 0,
    longestStreak: 0,
    totalCompletions: 0,
  };

  const chartData = analytics?.chartData || [];

  // SVG Chart Dimensions
  const width = 420;
  const height = 140;
  const paddingX = 35;
  const paddingY = 20;

  const pointsCount = chartData.length;

  // Helper to map rates (0 - 100) to SVG coordinates
  const getCoordinates = (index, value) => {
    const x =
      pointsCount > 1
        ? paddingX + (index / (pointsCount - 1)) * (width - paddingX * 2)
        : width / 2;
    const y = height - paddingY - (value / 100) * (height - paddingY * 2);
    return { x, y };
  };

  // Build SVG smooth path command using Catmull-Rom or cubic Bezier
  const createSmoothPath = (rateKey) => {
    if (pointsCount === 0) return "";
    const coords = chartData.map((d, i) => getCoordinates(i, d[rateKey] ?? d.completionRate ?? 0));
    if (coords.length === 1) return `M ${coords[0].x} ${coords[0].y}`;

    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? i : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const positivePath = createSmoothPath("positiveRate");
  const negativePath = createSmoothPath("negativeRate");
  const overallPath = createSmoothPath("completionRate");

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xs space-y-5">
      {/* Header */}
      <h3 className="text-base font-bold text-gray-800">
        Habit Progress Over Time
      </h3>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-purple-50/50 p-3 text-center border border-purple-100/60">
          <p className="text-xs font-black text-gray-800 flex items-center justify-center gap-1">
            <span>🔥</span> {stats.currentStreak} days
          </p>
          <p className="text-[10px] text-gray-500 font-medium mt-0.5">Current streak</p>
        </div>

        <div className="rounded-2xl bg-purple-50/50 p-3 text-center border border-purple-100/60">
          <p className="text-xs font-black text-gray-800 flex items-center justify-center gap-1">
            <span>🏆</span> {stats.longestStreak} days
          </p>
          <p className="text-[10px] text-gray-500 font-medium mt-0.5">Longest streak</p>
        </div>

        <div className="rounded-2xl bg-purple-50/50 p-3 text-center border border-purple-100/60">
          <p className="text-xs font-black text-gray-800 flex items-center justify-center gap-1">
            <span>⏱️</span> {stats.totalCompletions}
          </p>
          <p className="text-[10px] text-gray-500 font-medium mt-0.5">Completed total</p>
        </div>
      </div>

      {/* Controls: Dropdown & Timeframe toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <select
          value={selectedHabitId}
          onChange={(e) => onHabitChange(e.target.value)}
          className="rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-1.5 text-xs font-bold text-gray-700 outline-none focus:border-purple-300"
        >
          <option value="all">All Progress</option>
          {habits.map((h) => (
            <option key={h._id} value={h._id}>
              {h.icon || "🌱"} {h.name}
            </option>
          ))}
        </select>

        {/* Timeframe Buttons */}
        <div className="flex items-center rounded-xl bg-purple-50/60 p-0.5 border border-purple-100/80">
          {["weekly", "monthly", "yearly"].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => onTimeframeChange(tf)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold capitalize transition-all ${
                timeframe === tf
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-gray-500 hover:text-purple-700"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative pt-2">
        {/* Y Axis Guide labels */}
        <div className="absolute left-0 top-2 bottom-6 flex flex-col justify-between text-[9px] font-medium text-gray-400 pointer-events-none">
          <span>100%</span>
          <span>60%</span>
          <span>20%</span>
          <span>0%</span>
        </div>

        {/* SVG Curve Chart */}
        <div className="ml-7 overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-36 overflow-visible"
          >
            {/* Horizontal Grid lines */}
            <line
              x1={paddingX}
              y1={paddingY}
              x2={width - paddingX}
              y2={paddingY}
              stroke="#f3e8ff"
              strokeDasharray="3 3"
            />
            <line
              x1={paddingX}
              y1={height / 2}
              x2={width - paddingX}
              y2={height / 2}
              stroke="#f3e8ff"
              strokeDasharray="3 3"
            />
            <line
              x1={paddingX}
              y1={height - paddingY}
              x2={width - paddingX}
              y2={height - paddingY}
              stroke="#f3e8ff"
              strokeDasharray="3 3"
            />

            {/* Smooth Curve Lines */}
            {selectedHabitId === "all" ? (
              <>
                {/* Positive habits curve (Emerald) */}
                <path
                  d={positivePath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                {/* Negative habits curve (Purple) */}
                <path
                  d={negativePath}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </>
            ) : (
              /* Single habit curve */
              <path
                d={overallPath}
                fill="none"
                stroke="#6d28d9"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            )}

            {/* Interactive Data Points */}
            {chartData.map((d, i) => {
              const posCoord = getCoordinates(i, d.positiveRate ?? d.completionRate ?? 0);
              const negCoord = getCoordinates(i, d.negativeRate ?? d.completionRate ?? 0);

              return (
                <g key={`points-${i}`}>
                  {/* Point circle for positive or overall */}
                  <circle
                    cx={posCoord.x}
                    cy={posCoord.y}
                    r={hoveredPoint === i ? "5" : "3"}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {selectedHabitId === "all" && (
                    <circle
                      cx={negCoord.x}
                      cy={negCoord.y}
                      r={hoveredPoint === i ? "5" : "3"}
                      fill="#8b5cf6"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* X Axis Labels */}
          <div className="flex justify-between px-3 text-[10px] font-bold text-gray-500 uppercase mt-1">
            {chartData.map((d, i) => (
              <span key={`label-${i}`} className="text-center">
                {d.day || d.label || d.month || ""}
              </span>
            ))}
          </div>

          {/* Legend */}
          {selectedHabitId === "all" && (
            <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-gray-500 pt-3">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Positive Habits
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                Negative Habits
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

