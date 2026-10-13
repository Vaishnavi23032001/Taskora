
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to log in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#573aa7] via-[#763fd9] to-[#944dea] px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-white/40 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6b3ba6] to-[#8c5ee0] bg-clip-text text-transparent">
            GrowSpace
          </h1>
          <p className="mt-2 text-gray-500">
            Welcome back. Continue growing.
          </p>
        </div>

        <h2 className="mb-5 text-xl font-semibold text-[#2d2340]">
          Log in to your account
        </h2>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#413454]">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#d8c9f4] bg-white px-3 py-2.5 text-[#2d2340] outline-none transition focus:border-[#8c5ee0] focus:ring-4 focus:ring-[#e5d8ff]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#413454]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={72}
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#d8c9f4] bg-white px-3 py-2.5 text-[#2d2340] outline-none transition focus:border-[#8c5ee0] focus:ring-4 focus:ring-[#e5d8ff]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gradient-to-r from-[#b68ef2] via-[#8c5ee0] to-[#6d3ec2] px-4 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(124,78,214,0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#6f6379]">
          New to BloomSpace?{" "}
          <Link to="/register" className="font-semibold text-[#6d3ec2] underline-offset-2 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
