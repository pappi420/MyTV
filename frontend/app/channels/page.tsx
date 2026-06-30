"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { loadProvider } from "@/services/storage";
import { getLiveStreams } from "@/services/xtream";

import { LiveChannel } from "@/types/liveChannel";

export default function ChannelsPage() {
  const [channels, setChannels] = useState<LiveChannel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        setLoading(false);
        return;
      }

      const streams = await getLiveStreams(provider);

     console.table(streams.slice(0, 3));

      setChannels(streams);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Loading Channels...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] p-10 text-white">
      <h1 className="mb-2 text-5xl font-black">
        📺 Live Channels
      </h1>

      <p className="mb-8 text-zinc-400">
        {channels.length.toLocaleString()} Channels
      </p>

      <div className="grid grid-cols-5 gap-5">
        {channels.slice(0, 100).map((channel) => (
          <Link
            key={channel.stream_id}
            href={`/watch/live/${channel.stream_id}`}
            className="rounded-2xl bg-zinc-900 p-4 transition hover:scale-105 hover:bg-zinc-800"
          >
            <img
              src={channel.stream_icon || "/file.svg"}
              alt={channel.name}
              className="mb-4 h-20 w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/file.svg";
              }}
            />

            <h2 className="line-clamp-2 text-sm font-bold">
              {channel.name}
            </h2>

            <p className="mt-2 text-xs text-zinc-500">
              Category {channel.category_id}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}