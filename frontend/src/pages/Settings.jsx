import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#573aa7] via-[#763fd9] to-[#944dea] p-7 text-white shadow-lg shadow-purple-500/15">
        <h1 className="text-2xl sm:text-3xl font-bold">Account Settings ⚙️</h1>
        <p className="mt-1 text-sm text-purple-100 max-w-xl">
          Manage your personal profile, notification preferences, and privacy controls.
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xs border border-purple-100 max-w-2xl">
        <h3 className="font-bold text-gray-800 text-lg mb-4">User Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</label>
            <p className="mt-1 font-medium text-gray-800">{user?.name || "Member"}</p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Address</label>
            <p className="mt-1 font-medium text-gray-800">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
