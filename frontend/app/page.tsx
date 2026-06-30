import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

import {
  getTrendingHero,
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "@/lib/tmdb";

export default async function Home() {
  const [
    hero,
    trending,
    topRated,
    popular,
    upcoming,
    nowPlaying,
  ] = await Promise.all([
    getTrendingHero(),
    getTrendingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
    getUpcomingMovies(),
    getNowPlayingMovies(),
  ]);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Sidebar />

      <div className="ml-64 p-10">
        <div className="flex justify-between items-center mb-8">
          <input
            placeholder="Search movies..."
            className="w-96 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 outline-none"
          />

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
              A
            </div>

            <div>
              <div className="font-semibold">Apolonio</div>
              <div className="text-sm text-gray-400">
                Administrator
              </div>
            </div>
          </div>
        </div>

        <Hero movie={hero} />

        <MovieRow title="🔥 Trending" movies={trending} />
        <MovieRow title="⭐ Top Rated" movies={topRated} />
        <MovieRow title="🎬 Now Playing" movies={nowPlaying} />
        <MovieRow title="📅 Upcoming" movies={upcoming} />
        <MovieRow title="🍿 Popular" movies={popular} />
      </div>
    </main>
  );
}