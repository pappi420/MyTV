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

      const live = await getLiveCategories(provider);
      const movies = await getMovieCategories(provider);
      const series = await getSeriesCategories(provider);

      console.log("Live Categories:", live);
      console.log("Movie Categories:", movies);
      console.log("Series Categories:", series);

      setLive(live);
      setMovies(movies);
      setSeries(series);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen bg-[#070707] p-10 text-white">
      <h1 className="mb-10 text-5xl font-black">
        IPTV Categories
      </h1>

      {/* LIVE */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">
          📺 Live TV
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {live.map((cat) => (
            <div
              key={cat.category_id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.category_name}
            </div>
          ))}
        </div>
      </section>

      {/* MOVIES */}
      <section className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">
          🎬 Movies
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {movies.map((cat) => (
            <div
              key={cat.category_id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.category_name}
            </div>
          ))}
        </div>
      </section>

      {/* SERIES */}
      <section>
        <h2 className="mb-4 text-3xl font-bold">
          📺 Series
        </h2>

        <div className="grid grid-cols-4 gap-3">
          {series.map((cat) => (
            <div
              key={cat.category_id}
              className="rounded-xl bg-zinc-900 p-4"
            >
              {cat.category_name}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}