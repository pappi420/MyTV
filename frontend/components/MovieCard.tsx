import Image from "next/image";
import Link from "next/link";

type MovieCardProps = {
  id: number;
  title: string;
  year: string;
  poster: string;
  rating: number;
};

export default function MovieCard({
  id,
  title,
  year,
  poster,
  rating,
}: MovieCardProps) {
  return (
    <Link
      href={`/movie/${id}`}
      className="group relative block w-[170px] flex-shrink-0 cursor-pointer transition duration-300 hover:z-20 hover:scale-110"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
        <Image
          src={poster}
          alt={title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/40" />

        <div className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-xs">
          ⭐ {rating}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <button className="rounded-full bg-white px-5 py-3 font-bold text-black">
            ▶
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-1 font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-400">
          {year}
        </p>
      </div>
    </Link>
  );
}