import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-3xl border border-purple-100 bg-white p-6 shadow-xs transition hover:shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
