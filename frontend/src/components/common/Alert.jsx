import React from "react";

export default function Alert({ type = "error", message, onClose }) {
  if (!message) return null;

  const styles = {
    error: "bg-red-50 text-red-700 border-red-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    info: "bg-purple-50 text-purple-700 border-purple-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border p-4 text-xs font-medium shadow-xs ${
        styles[type] || styles.error
      }`}
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 font-bold opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
