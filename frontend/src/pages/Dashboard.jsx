
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#2b2435_0%,_#1d1b20_42%,_#141317_100%)] text-[#2d2340]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e7dcff] bg-[#f8f4fd]/95 px-6 py-4 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#5d3bb0]">
            BloomSpace
          </h1>
          <p className="text-sm text-[#6f6379]">
            Your personal growth space
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-[#d5c1f6] bg-white px-4 py-2 font-medium text-[#403154] transition hover:bg-[#f3ebff]"
        >
          Log out
        </button>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-[28px] bg-gradient-to-r from-[#c9b4ff] via-[#a97dea] to-[#7a58d4] p-8 text-white shadow-[0_20px_50px_rgba(91,59,176,0.3)]">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#f2ebff]">
            Your journey starts here
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Welcome, {user?.name || "BloomSpace member"}!
          </h2>

          <p className="mt-3 max-w-2xl text-[#f3edff]">
            Every small step counts. Build positive habits, develop new
            skills, and make space for reflection.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#eadcff] bg-[#f8f5fd] p-6 shadow-sm">
            <h3 className="font-semibold text-[#5d3bb0]">Habit Garden</h3>
            <p className="mt-2 text-sm text-[#625a72]">
              Build routines and track your daily progress.
            </p>
          </article>

          <article className="rounded-2xl border border-[#eadcff] bg-[#f8f5fd] p-6 shadow-sm">
            <h3 className="font-semibold text-[#5d3bb0]">SkillTrack</h3>
            <p className="mt-2 text-sm text-[#625a72]">
              Set learning goals and celebrate milestones.
            </p>
          </article>

          <article className="rounded-2xl border border-[#eadcff] bg-[#f8f5fd] p-6 shadow-sm">
            <h3 className="font-semibold text-[#5d3bb0]">
              Mood & Memory Journal
            </h3>
            <p className="mt-2 text-sm text-[#625a72]">
              Reflect on your experiences and record your thoughts.
            </p>
          </article>
        </div>

        <p className="mt-8 text-sm text-[#dfe3f3]">
          Signed in as {user?.email}
        </p>
      </section>
    </main>
  );
}
