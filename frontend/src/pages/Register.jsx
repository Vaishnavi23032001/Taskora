
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (form.password.length < 8 || form.password.length > 72) {
      setError("Password must be between 8 and 72 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to create your account."
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
            Start your personal growth journey.
          </p>
        </div>

        <h2 className="mb-5 text-xl font-semibold text-[#2d2340]">
          Create your account
        </h2>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#413454]">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#d8c9f4] bg-white px-3 py-2.5 text-[#2d2340] outline-none transition focus:border-[#8c5ee0] focus:ring-4 focus:ring-[#e5d8ff]"
            />
          </div>

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
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={72}
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#d8c9f4] bg-white px-3 py-2.5 text-[#2d2340] outline-none transition focus:border-[#8c5ee0] focus:ring-4 focus:ring-[#e5d8ff]"
            />
            <p className="mt-1 text-xs text-[#7a6d88]">
              Use at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-gradient-to-r from-[#b68ef2] via-[#8c5ee0] to-[#6d3ec2] px-4 py-3 font-semibold text-white shadow-[0_10px_25px_rgba(124,78,214,0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[#6f6379]">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[#6d3ec2] underline-offset-2 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
