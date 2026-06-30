"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { loadProvider } from "@/services/storage";
import { getSeriesInfo } from "@/services/seriesService";

export default function SeasonPage() {
  const { id, season } = useParams();

  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) return;

      const data = await getSeriesInfo(
        provider,
        Number(id)
      );

      console.log(data);
console.log(data.episodes);
console.log(Object.keys(data.episodes || {}));

      const seasonEpisodes =
        data.episodes?.[season as string] ?? [];

      setEpisodes(seasonEpisodes);
    }

    load();
  }, [id, season]);

  return (
    <main className="min-h-screen bg-[#070707] p-10 text-white">
      <h1 className="mb-8 text-5xl font-black">
        Season {season}
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {episodes.map((episode: any, index: number) => {
            console.log(episode);
          const episodeId =
            episode.id ??
            episode.stream_id ??
            episode.info?.id ??
            episode.info?.stream_id;

          const extension =
            episode.container_extension ??
            episode.info?.container_extension ??
            "mp4";

          return (
            <Link
              key={episodeId ?? index}
              href={`/watch/series/${episodeId}?ext=${extension}`}
              className="rounded-xl bg-zinc-900 p-5 transition hover:scale-105"
            >
              <img
                src={
                  episode.info?.movie_image ||
                  episode.info?.cover ||
                  "/poster-placeholder.png"
                }
                alt={episode.title || episode.info?.title}
                className="mb-3 aspect-video w-full rounded-lg object-cover"
              />

              <h2 className="font-bold">
                Episode {episode.episode_num}
              </h2>

              <p className="mt-2 text-zinc-400">
                {episode.title ||
                  episode.info?.title ||
                  `Episode ${episode.episode_num}`}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}