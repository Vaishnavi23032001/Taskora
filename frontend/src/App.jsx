
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,_#f5efff_0%,_#efe5ff_30%,_#f7f3ff_100%)] px-4 text-[#2d2340]">
      <h1 className="text-3xl font-bold text-[#5f3ab2]">Page not found</h1>
      <Link to="/login" className="text-[#7c4ed6] underline decoration-[#7c4ed6] underline-offset-4">
        Return to BloomSpace
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
