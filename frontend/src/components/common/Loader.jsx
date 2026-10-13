import React from "react";

export default function Loader({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-purple-600">
      <div
        className={`animate-spin rounded-full border-purple-200 border-t-purple-600 ${sizeClasses[size] || sizeClasses.md}`}
      />
      {text && <p className="text-xs font-semibold text-purple-500">{text}</p>}
    </div>
  );
}
