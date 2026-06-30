import { getTrendingMovies } from "@/lib/tmdb";

export default async function TestPage() {
  const data = await getTrendingMovies();

  return (
    <main className="p-10 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Trending Movies
      </h1>

      <ul className="space-y-2">
        {data.results.slice(0, 10).map((movie: any) => (
          <li key={movie.id}>
            {movie.title}
          </li>
        ))}
      </ul>
    </main>
  );
}