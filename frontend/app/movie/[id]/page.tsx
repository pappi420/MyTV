import Link from "next/link";
import Image from "next/image";
import { getMovie, getSimilarMovies } from "@/lib/tmdb";
import MovieRow from "@/components/MovieRow";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const movie = await getMovie(id);
  const similar = await getSimilarMovies(id);

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      {/* Hero */}
      <section className="relative h-[500px]">

        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/70 to-transparent" />

      </section>

      <div className="relative -mt-48 flex gap-10 px-16">

        {/* Poster */}

        <Image
          src={movie.poster}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-3xl shadow-2xl"
          unoptimized
        />

        {/* Details */}

        <div className="max-w-3xl pt-20">

          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back
          </Link>

          <h1 className="mt-6 text-6xl font-black">
            {movie.title}
          </h1>

         <div className="mt-6 flex flex-wrap items-center gap-3">

  <span className="rounded-full bg-yellow-500 px-4 py-2 font-semibold text-black">
    ⭐ {movie.rating}
  </span>

  <span className="rounded-full bg-zinc-800 px-4 py-2">
    📅 {movie.year}
  </span>

  <span className="rounded-full bg-zinc-800 px-4 py-2">
    ⏱ {movie.runtime} min
  </span>

</div>

          <div className="mt-5 flex gap-2">

            {movie.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="rounded-full bg-zinc-800 px-4 py-2 text-sm"
              >
                {genre.name}
              </span>
            ))}

          </div>

          <p className="mt-8 text-lg leading-8 text-zinc-300">
            {movie.overview}
          </p>
          <section className="mt-16">

  <MovieRow
    title="🎬 More Like This"
    movies={similar}
  />

</section>
          

          <div className="mt-10 flex gap-4">

            <button className="rounded-xl bg-white px-8 py-4 font-bold text-black">
              ▶ Watch Trailer
            </button>

            <button className="rounded-xl border border-white px-8 py-4">
              ❤ Favorite
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}