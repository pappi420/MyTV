import MovieDetails from "@/components/MovieDetails";

import {
  getMovie,
  getMovieTrailer,
  getSimilarMovies,
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

  const [movie, similar, trailer] = await Promise.all([
    getMovie(id),
    getSimilarMovies(id),
    getMovieTrailer(id),
  ]);

  console.log(trailer);

  return (
    <MovieDetails
      movie={movie}
      similar={similar}
      trailer={trailer}
    />
  );
}
