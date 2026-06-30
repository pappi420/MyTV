import Image from "next/image";

type HeroProps = {
  movie: {
    title: string;
    overview: string;
    backdrop: string;
  };
};

export default function Hero({ movie }: HeroProps) {
  return (
    <section className="relative h-[520px] overflow-hidden rounded-3xl">

      <Image
        src={movie.backdrop}
        alt={movie.title}
        fill
        unoptimized
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex h-full items-center px-16">

        <div className="max-w-xl">

          <p className="mb-2 tracking-[0.3em] uppercase text-blue-400">
            Trending
          </p>

          <h1 className="mb-6 text-7xl font-black">
            {movie.title}
          </h1>

          <p className="mb-8 text-lg text-gray-300">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <button className="rounded-xl bg-white px-8 py-4 font-bold text-black">
              ▶ Play
            </button>

            <button className="rounded-xl border border-white px-8 py-4">
              ℹ More Info
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}