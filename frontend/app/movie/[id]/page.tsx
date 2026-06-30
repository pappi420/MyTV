import MovieDetails from "@/components/MovieDetails";

import {
  getMovie,
  getMovieTrailer,
  getSimilarMovies,
  getMovieCredits,
} from "@/lib/tmdb";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({
  params,
}: Props) {
  const { id } = await params;

  const [
    movie,
    similar,
    trailer,
    cast,
  ] = await Promise.all([
    getMovie(id),
    getSimilarMovies(id),
    getMovieTrailer(id),
    getMovieCredits(id),
  ]);

  return (
    <MovieDetails
      movie={movie}
      similar={similar}
      trailer={trailer}
      cast={cast}
    />
  );
}