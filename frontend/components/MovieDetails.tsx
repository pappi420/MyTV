"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MovieRow from "./MovieRow";
import TrailerModal from "./TrailerModal";
import CastRow from "./CastRow";
import { useFavorites } from "@/context/FavoritesContext";
import { useHistory } from "@/context/HistoryContext";

type MovieDetailsProps = {
  movie: any;
  similar: any[];
  trailer: any;
  cast: any[];
};

export default function MovieDetails({
  movie,
  similar,
  trailer,
  cast,
}: MovieDetailsProps) {
  const [openTrailer, setOpenTrailer] = useState(false);

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();
  const { addHistory } = useHistory();
  useEffect(() => {
  console.log("History Added:", movie.title);
}, [movie.id]);
  

useEffect(() => {
  addHistory({
    id: movie.id,
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    rating: Number(movie.rating),
  });
}, [movie.id]);
console.log("CastRow:", CastRow);
  return (
    <main className="min-h-screen bg-[#070707] text-white">

      {/* Hero */}
      <section className="relative h-[500px]">

        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/70 to-transparent" />

      </section>

      {/* Content */}
      <div className="relative -mt-48 flex gap-10 px-16">

        <Image
          src={movie.poster}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-3xl shadow-2xl"
          unoptimized
        />

        <div className="max-w-3xl pt-20">

          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back
          </Link>

          <h1 className="mt-6 text-6xl font-black">
            {movie.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-3">

            <span className="rounded-full bg-yellow-500 px-4 py-2 font-semibold text-black">
              ⭐ {movie.rating}
            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2">
              📅 {movie.year}
            </span>

            <span className="rounded-full bg-zinc-800 px-4 py-2">
              ⏱ {movie.runtime} min
            </span>

          </div>

          <div className="mt-5 flex flex-wrap gap-2">

            {movie.genres?.map((genre: any) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-800 px-4 py-2 text-sm"
              >
                {genre.name}
              </span>
            ))}

          </div>

          <p className="mt-8 text-lg leading-8 text-zinc-300">
            {movie.overview}
          </p>

          <div className="mt-10 flex gap-4">

            {trailer && (
              <button
                onClick={() => setOpenTrailer(true)}
                className="rounded-xl bg-white px-8 py-4 font-bold text-black"
              >
                ▶ Watch Trailer
              </button>
            )}

            <button
              onClick={() =>
                toggleFavorite({
                  id: movie.id,
                  title: movie.title,
                  year: movie.year,
                  poster: movie.poster,
                  rating: Number(movie.rating),
                })
              }
              className="rounded-xl border border-white px-8 py-4"
            >
              {isFavorite(movie.id)
                ? "❤️ Favorited"
                : "🤍 Favorite"}
            </button>

          </div>

        </div>

      </div>

      {/* Cast */}
     <div className="px-16">
  <div className="px-16">
  <CastRow cast={cast} />
</div>
</div>

      {/* Similar */}
      <div className="px-16 pb-20">

        <MovieRow
          title="🎬 More Like This"
          movies={similar}
        />

      </div>

      {/* Trailer */}
      {openTrailer && trailer?.key && (
        <TrailerModal
          youtubeKey={trailer.key}
          onClose={() => setOpenTrailer(false)}
        />
      )}

    </main>
  );
}