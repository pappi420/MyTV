import MovieRow from "@/components/MovieRow";

import {
  getActor,
  getActorMovies,
} from "@/lib/tmdb";

import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PersonPage({
  params,
}: Props) {
  const { id } = await params;

  const [actor, movies] =
    await Promise.all([
      getActor(id),
      getActorMovies(id),
    ]);

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      <div className="px-16 py-16">

        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300"
        >
          ← Home
        </Link>

        <div className="mt-10 flex gap-12">

          <Image
            src={actor.profile}
            alt={actor.name}
            width={320}
            height={480}
            unoptimized
            className="rounded-3xl"
          />

          <div>

            <h1 className="text-6xl font-black">
              {actor.name}
            </h1>

            <p className="mt-6">
              🎂 {actor.birthday}
            </p>

            <p className="mt-2">
              📍 {actor.place}
            </p>

            <p className="mt-10 max-w-4xl leading-8 text-zinc-300">
              {actor.biography}
            </p>

          </div>

        </div>

        <MovieRow
          title="🎬 Known For"
          movies={movies}
        />

      </div>

    </main>
  );
}