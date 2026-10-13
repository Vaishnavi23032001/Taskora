
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-800">
            BloomSpace
          </h1>
          <p className="text-sm text-slate-500">
            Your personal growth space
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100"
        >
          Log out
        </button>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl bg-emerald-100 p-8">
          <p className="text-sm font-medium text-emerald-800">
            YOUR JOURNEY STARTS HERE
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Welcome, {user?.name || "BloomSpace member"}!
          </h2>

          <p className="mt-3 max-w-2xl text-slate-700">
            Every small step counts. Build positive habits, develop new
            skills, and make space for reflection.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-emerald-800">Habit Garden</h3>
            <p className="mt-2 text-sm text-slate-600">
              Build routines and track your daily progress.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-emerald-800">SkillTrack</h3>
            <p className="mt-2 text-sm text-slate-600">
              Set learning goals and celebrate milestones.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-6">
            <h3 className="font-semibold text-emerald-800">
              Mood & Memory Journal
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Reflect on your experiences and record your thoughts.
            </p>
          </article>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Signed in as {user?.email}
        </p>
      </section>
    </main>
  );
}
