"use client";

import { useEffect, useState } from "react";

import { loadProvider } from "@/services/storage";

import {
  getLiveCategories,
  getMovieCategories,
  getSeriesCategories,
} from "@/services/xtream";

import { Category } from "@/types/category";

export default function CategoriesPage() {
  const [live, setLive] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Category[]>([]);
  const [series, setSeries] = useState<Category[]>([]);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        return;
      }

      setLive(await getLiveCategories(provider));
      setMovies(await getMovieCategories(provider));
      setSeries(await getSeriesCategories(provider));
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#070707] p-10 text-white">

      <h1 className="mb-10 text-5xl font-black">
        IPTV Categories
      </h1>

      <section className="mb-10">
        <h2 className="mb-4 text-3xl font-bold">
          📺 Live TV
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {live.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-3xl font-bold">
          🎬 Movies
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {movies.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-3xl font-bold">
          📺 Series
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {series.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.name}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}