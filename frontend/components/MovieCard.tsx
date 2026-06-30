"use client";

import Link from "next/link";

import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
};

export default function MovieCard({
  movie,
}: Props) {
  return (
    <Link
      href={`/movie/${movie.stream_id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        bg-zinc-900
        transition
        hover:scale-105
      "
    >
      <img
        src={movie.stream_icon}
        alt={movie.name}
        className="
          aspect-[2/3]
          w-full
          object-cover
        "
      />

      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold">
          {movie.name}
        </h3>

        <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
          <span>
            ⭐ {movie.rating || "N/A"}
          </span>

          <span>
            {movie.year || ""}
          </span>
        </div>
      </div>
    </Link>
  );
}