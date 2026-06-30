"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

import { loadProvider } from "@/services/storage";

import {
  getMovieCategories,
  getMovies,
} from "@/services/xtream";

import { Category } from "@/types/category";
import { Movie } from "@/types/movie";

type MovieRowData = {
  title: string;
  movies: Movie[];
};

export default function MoviesPage() {
  const [hero, setHero] = useState<Movie | null>(null);

  const [rows, setRows] = useState<MovieRowData[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        setLoading(false);
        return;
      }

      const categories =
        await getMovieCategories(provider);

      const builtRows: MovieRowData[] = [];

      for (const category of categories.slice(0, 8)) {
        const movies = await getMovies(
          provider,
          category.category_id
        );

        if (
          !hero &&
          movies.length > 0
        ) {
          setHero(movies[0]);
        }

        builtRows.push({
          title: category.category_name,
          movies: movies.slice(0, 20),
        });
      }

      setRows(builtRows);

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Loading Movies...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-10 py-8 text-white">
      {hero && <Hero movie={hero} />}

      {rows.map((row) => (
        <MovieRow
          key={row.title}
          title={row.title}
          movies={row.movies}
        />
      ))}
    </main>
  );
}