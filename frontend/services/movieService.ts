import { getTrendingMovies } from "@/lib/tmdb";

export async function getMovies() {
  return await getTrendingMovies();
}