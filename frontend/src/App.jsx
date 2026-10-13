import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HabitGarden from "./pages/HabitGarden/HabitGarden.jsx";
import SkillTrack from "./pages/SkillTrack/SkillTrack.jsx";
import MoodMemoryJournal from "./pages/MoodMemoryJournal/MoodMemoryJournal.jsx";
import Calendar from "./pages/Calendar.jsx";
import Insights from "./pages/Insights.jsx";
import Achievements from "./pages/Achievements.jsx";
import Settings from "./pages/Settings.jsx";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f8f7ff] px-4 text-[#2d2340]">
      <h1 className="text-3xl font-bold text-[#5f3ab2]">Page not found</h1>
      <Link to="/dashboard" className="text-[#7c4dff] underline underline-offset-4">
        Return to Growora
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes wrapped in AppLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/habits" element={<HabitGarden />} />
              <Route path="/skills" element={<SkillTrack />} />
              <Route path="/journal" element={<MoodMemoryJournal />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
