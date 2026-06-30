import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-[#0B1220] px-6 py-8">

      <Link
        href="/"
        className="mb-10 text-5xl font-black text-white"
      >
        MyTV
      </Link>

      <nav className="flex flex-col gap-3">

        <Link
          href="/"
          className="rounded-xl px-4 py-3 text-lg hover:bg-white/10"
        >
          🏠 Home
        </Link>

        <Link
          href="/favorites"
          className="rounded-xl px-4 py-3 text-lg hover:bg-white/10"
        >
          ❤️ Favorites
        </Link>

        <Link
          href="/search"
          className="rounded-xl px-4 py-3 text-lg hover:bg-white/10"
        >
          🔍 Search
        </Link>

        <button className="rounded-xl px-4 py-3 text-left text-lg hover:bg-white/10">
          🎬 Movies
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-lg hover:bg-white/10">
          📺 TV Shows
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-lg hover:bg-white/10">
          ⚙ Settings
        </button>

      </nav>

    </aside>
  );
}