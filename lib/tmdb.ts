const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TMDb");
  }

  const data = await response.json();

  return data.results.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] ?? "",
    rating: movie.vote_average.toFixed(1),
    poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
    backdrop: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
    overview: movie.overview,
  }));
}

export async function getTrendingHero() {
  const movies = await getTrendingMovies();
  return movies[0];
}