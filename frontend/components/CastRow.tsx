import Image from "next/image";
import Link from "next/link";

type Actor = {
  id: number;
  name: string;
  character: string;
  profile: string;
};

type CastRowProps = {
  cast: Actor[];
};

export default function CastRow({
  cast,
}: CastRowProps) {
  return (
    <section className="mt-20">
      <h2 className="mb-6 text-3xl font-bold">
        🎭 Cast
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {cast.map((actor) => (
          <Link
            key={actor.id}
            href={`/person/${actor.id}`}
            className="w-40 flex-shrink-0 text-center transition-transform duration-300 hover:scale-105"
          >
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-zinc-700">

              {actor.profile !== "/actor-placeholder.png" ? (
                <Image
                  src={actor.profile}
                  alt={actor.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">
                  👤
                </div>
              )}

            </div>

            <h3 className="mt-4 font-semibold line-clamp-2">
              {actor.name}
            </h3>

            <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
              {actor.character}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}