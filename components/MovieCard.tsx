import Image from "next/image";

type MovieCardProps = {
  title: string;
  year: string;
  poster: string;
  rating: number;
};

export default function MovieCard({
  title,
  year,
  poster,
  rating,
}: MovieCardProps) {
  return (
    <div className="group w-44 flex-shrink-0 cursor-pointer">
      <div className="relative h-64 overflow-hidden rounded-xl bg-zinc-800">

        <Image
  src={poster}
  alt={title}
  fill
  sizes="176px"
  className="object-cover transition-transform duration-500 group-hover:scale-110"
  unoptimized
/>

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/60" />

        <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs">
          ⭐ {rating}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <button className="rounded-lg bg-white px-5 py-2 font-semibold text-black">
            ▶ Play
          </button>
        </div>

      </div>

      <h3 className="mt-3 truncate font-semibold">
        {title}
      </h3>

      <p className="text-sm text-gray-400">
        {year}
      </p>
    </div>
  );
}