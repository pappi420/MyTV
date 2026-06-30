"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 text-white">

      <section className="mb-12 rounded-3xl bg-gradient-to-r from-blue-700 to-purple-700 p-12">
        <h1 className="mb-4 text-6xl font-black">
          Welcome to MyTV
        </h1>

        <p className="mb-8 max-w-2xl text-xl text-zinc-200">
          Netflix + Plex + Jellyfin + Stremio inspired streaming platform.
        </p>

        <div className="flex gap-4">
          <Link
            href="/movies"
            className="rounded-xl bg-white px-8 py-4 font-bold text-black"
          >
            🎬 Movies
          </Link>

          <Link
            href="/live"
            className="rounded-xl bg-zinc-800 px-8 py-4 font-bold"
          >
            📺 Live TV
          </Link>

          <Link
            href="/series"
            className="rounded-xl bg-zinc-800 px-8 py-4 font-bold"
          >
            📺 Series
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-8">

        <Link
          href="/movies"
          className="rounded-3xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
        >
          <div className="mb-4 text-5xl">🎬</div>

          <h2 className="mb-2 text-3xl font-bold">
            Movies
          </h2>

          <p className="text-zinc-400">
            Browse your IPTV movie library.
          </p>
        </Link>

        <Link
          href="/live"
          className="rounded-3xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
        >
          <div className="mb-4 text-5xl">📺</div>

          <h2 className="mb-2 text-3xl font-bold">
            Live TV
          </h2>

          <p className="text-zinc-400">
            Thousands of live channels.
          </p>
        </Link>

        <Link
          href="/series"
          className="rounded-3xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
        >
          <div className="mb-4 text-5xl">🍿</div>

          <h2 className="mb-2 text-3xl font-bold">
            TV Series
          </h2>

          <p className="text-zinc-400">
            Watch complete TV shows.
          </p>
        </Link>

      </div>

    </main>
  );
}