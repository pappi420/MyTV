"use client";

import Link from "next/link";

import { Series } from "@/types/series";

type Props = {
  title: string;
  series: Series[];
};

export default function SeriesRow({
  title,
  series,
}: Props) {
  if (!series.length) return null;

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">
        {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-3">
        {series.map((show) => (
          <Link
            key={show.series_id}
            href={`/series/${show.series_id}`}
            className="w-44 flex-shrink-0 transition hover:scale-105"
          >
            <img
              src={show.cover}
              alt={show.name}
              className="aspect-[2/3] w-full rounded-xl object-cover"
            />

            <h3 className="mt-3 line-clamp-2 font-semibold">
              {show.name}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              ⭐ {show.rating || "N/A"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}