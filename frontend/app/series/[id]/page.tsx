"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { loadProvider } from "@/services/storage";
import { getSeriesInfo } from "@/services/seriesService";

export default function SeriesDetailsPage() {
  const { id } = useParams();

  const [series, setSeries] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) return;

      const data = await getSeriesInfo(
        provider,
        Number(id)
      );

      setSeries(data);
    }

    load();
  }, [id]);

  if (!series) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white">

      <div className="relative h-[500px] overflow-hidden">
        <img
          src={series.info.cover_big}
          alt={series.info.name}
          className="h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/70 to-transparent" />
      </div>

      <div className="-mt-40 relative z-10 flex gap-10 px-10">

        <img
          src={series.info.cover}
          alt={series.info.name}
          className="w-72 rounded-2xl shadow-2xl"
        />

        <div className="max-w-4xl">

          <h1 className="mb-4 text-6xl font-black">
            {series.info.name}
          </h1>

          <div className="mb-6 flex gap-6 text-zinc-300">
            <span>⭐ {series.info.rating}</span>
            <span>{series.info.releaseDate?.slice(0, 4)}</span>
          </div>

          <p className="mb-10 text-lg leading-8 text-zinc-300">
            {series.info.plot}
          </p>

          <h2 className="mb-6 text-3xl font-bold">
            Seasons
          </h2>

          <div className="grid grid-cols-5 gap-6">
            {series.seasons.map((season: any) => (
              <a

  key={season.season_number}

  href={`/series/${id}/season/${season.season_number}`}

  className="rounded-xl bg-zinc-900 p-4 transition hover:bg-zinc-800"

>
                <img
                  src={season.cover}
                  alt={season.name}
                  className="mb-3 aspect-[2/3] w-full rounded-lg object-cover"
                />

                <h3 className="font-bold">
                  {season.name}
                </h3>

                <p className="text-sm text-zinc-400">
                  {season.episode_count} Episodes
                </p>
              </a>
            ))}
          </div>

        </div>

      </div>

    </main>
  );
}