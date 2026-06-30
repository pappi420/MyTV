"use client";

type MovieModalProps = {
  open: boolean;
  onClose: () => void;
  movie: {
    title: string;
    overview: string;
    backdrop: string;
    rating: number;
    year: string;
  } | null;
};

export default function MovieModal({
  open,
  onClose,
  movie,
}: MovieModalProps) {
  if (!open || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

      <div className="w-[900px] overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">

        <img
          src={movie.backdrop}
          alt={movie.title}
          className="h-80 w-full object-cover"
        />

        <div className="p-8">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-black">
                {movie.title}
              </h1>

              <div className="mt-2 text-zinc-400">
                ⭐ {movie.rating} • {movie.year}
              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
            >
              ✕
            </button>

          </div>

          <p className="mt-8 leading-8 text-zinc-300">
            {movie.overview}
          </p>

          <div className="mt-10 flex gap-4">

            <button className="rounded-xl bg-white px-6 py-3 font-bold text-black">
              ▶ Trailer
            </button>

            <button className="rounded-xl border border-white px-6 py-3">
              ❤ Favorite
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}