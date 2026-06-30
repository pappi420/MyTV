"use client";

import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";

type Props = {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
};

export default function MovieRow({
  title,
  movies,
  onMovieClick,
}: Props) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="mb-5 text-3xl font-bold">
        {title}
      </h2>

      <div
        className="
          flex
          gap-5
          overflow-x-auto
          pb-4
          scrollbar-hide
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.stream_id}
            className="w-[180px] flex-shrink-0"
          >
            <MovieCard
              movie={movie}
              onClick={() => onMovieClick?.(movie)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}