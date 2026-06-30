import Link from "next/link";
import MovieRow from "@/components/MovieRow";
import { searchMovies } from "@/lib/tmdb";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: Props) {
  const { q = "" } = await searchParams;

  const movies =
    q.length > 0 ? await searchMovies(q) : [];

  return (
    <main className="min-h-screen bg-[#070707] text-white p-10">

      <Link
        href="/"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back
      </Link>

      <h1 className="mt-8 mb-8 text-5xl font-black">
        Search
      </h1>

      <form
        action="/search"
        className="mb-10"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Search movies..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 outline-none"
        />
      </form>

      {q ? (
        <MovieRow
          title={`Results for "${q}"`}
          movies={movies}
        />
      ) : (
        <p className="text-zinc-400">
          Start typing a movie name...
        </p>
      )}

    </main>
  );
}