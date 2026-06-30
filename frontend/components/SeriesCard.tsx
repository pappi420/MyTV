"use client";

import { Series } from "@/types/series";

type Props = {
  series: Series;
};

export default function SeriesCard({
  series,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-105">
      <img
        src={series.cover}
        alt={series.name}
        className="aspect-[2/3] w-full object-cover"
      />

      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold">
          {series.name}
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          ⭐ {series.rating || "N/A"}
        </p>
      </div>
    </div>
  );
}