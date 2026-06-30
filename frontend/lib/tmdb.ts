const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchMovies(endpoint: string) {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`,
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

export function getTrendingMovies() {
  return fetchMovies("/trending/movie/week");
}

export function getTopRatedMovies() {
  return fetchMovies("/movie/top_rated");
}

export function getPopularMovies() {
  return fetchMovies("/movie/popular");
}

export function getUpcomingMovies() {
  return fetchMovies("/movie/upcoming");
}

export function getNowPlayingMovies() {
  return fetchMovies("/movie/now_playing");
}

export async function getTrendingHero() {
  const movies = await getTrendingMovies();
  return movies[0];
}
export async function getMovieDetails(id: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const movie = await response.json();

  return {
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] ?? "",
    rating: movie.vote_average.toFixed(1),
    poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
    backdrop: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
    overview: movie.overview,
    runtime: movie.runtime,
    genres: movie.genres,
  };
}

export async function getMovie(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  const movie = await response.json();

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    backdrop: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
    poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
    year: movie.release_date?.split("-")[0] ?? "",
    rating: movie.vote_average.toFixed(1),
    runtime: movie.runtime,
    genres: movie.genres,
  };
}

export async function getSimilarMovies(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
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

export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
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

export async function getMovieTrailer(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trailer");
  }

  const data = await response.json();

  const trailer = data.results.find(
    (video: any) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return trailer ?? null;
}