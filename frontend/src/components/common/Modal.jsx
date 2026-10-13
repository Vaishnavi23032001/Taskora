import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-purple-950/25 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-purple-100 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-purple-50">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-gray-400 hover:bg-purple-50 hover:text-purple-600"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
