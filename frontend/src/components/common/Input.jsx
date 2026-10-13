import React from "react";

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-2xl border border-purple-100 bg-purple-50/30 px-4 py-2.5 text-sm text-gray-800 placeholder-purple-300 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-200 ${
          error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
