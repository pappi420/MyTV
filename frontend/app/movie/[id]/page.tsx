"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { loadProvider } from "@/services/storage";
import {
  getMovies,
  getMovieInfo,
} from "@/services/xtream";

import {
  searchMovieByTitle,
  getMovieDetails,
} from "@/lib/tmdb";

import { Movie } from "@/types/movie";

export default function MoviePage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [tmdb, setTmdb] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) return;

      const movies = await getMovies(provider);

      const selected = movies.find(
        (m) => m.stream_id.toString() === id
      );

      if (!selected) return;

      setMovie(selected);

      // Debug Xtream VOD info
      const info = await getMovieInfo(
        provider,
        selected.stream_id
      );

      console.log("VOD INFO:", info);

      try {
        const result = await searchMovieByTitle(
          selected.name
        );

        if (result) {
          const details = await getMovieDetails(
            result.id
          );

          setTmdb(details);
        }
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [id]);

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      {tmdb?.backdrop && (
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={tmdb.backdrop}
            alt={movie.name}
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-transparent" />
        </div>
      )}

      <div className="-mt-40 relative z-10 flex gap-10 px-10">

        <img
          src={tmdb?.poster || movie.stream_icon}
          alt={movie.name}
          className="w-72 rounded-2xl shadow-2xl"
        />

        <div className="max-w-3xl">

          <h1 className="mb-4 text-6xl font-black">
            {tmdb?.title || movie.name}
          </h1>

          <div className="mb-6 flex gap-6 text-zinc-300">

            <span>
              ⭐ {tmdb?.rating || movie.rating || "N/A"}
            </span>

            <span>
              {tmdb?.year || movie.year}
            </span>

            {tmdb?.runtime && (
              <span>{tmdb.runtime} min</span>
            )}

          </div>

          {tmdb?.genres && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tmdb.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-zinc-800 px-4 py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="mb-8 text-lg leading-8 text-zinc-300">
            {tmdb?.overview || "No description available."}
          </p>

          <div className="flex gap-4">

            <button
              onClick={() => console.log("TMDB:", tmdb)}
              className="rounded-xl bg-white px-8 py-4 font-bold text-black"
            >
              Debug
            </button>

            <button className="rounded-xl bg-zinc-800 px-8 py-4">
              ❤️ Favorite
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}