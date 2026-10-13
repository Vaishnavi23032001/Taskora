import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-gradient-to-r from-[#661cea] to-[#9d5eea] text-white shadow-md shadow-purple-500/20 hover:brightness-105 active:scale-98",
    secondary: "bg-purple-50 text-purple-700 hover:bg-purple-100/70 border border-purple-100",
    outline: "border border-purple-200 text-purple-700 hover:bg-purple-50/50",
    ghost: "text-gray-600 hover:bg-purple-50/60 hover:text-purple-700",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
