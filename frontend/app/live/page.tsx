"use client";

import { useEffect, useState } from "react";

import { loadProvider } from "@/services/storage";
import { getLiveCategories, getLiveStreams } from "@/services/xtream";

import { Category } from "@/types/category";
import { LiveChannel } from "@/types/liveChannel";

import ChannelRow from "@/components/ChannelRow";

type Row = {
  title: string;
  channels: LiveChannel[];
};

export default function LivePage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        setLoading(false);
        return;
      }

      const categories = await getLiveCategories(provider);
      const streams = await getLiveStreams(provider);

      const builtRows: Row[] = categories.slice(0, 8).map((category) => ({
        title: category.category_name,
        channels: streams
          .filter(
            (channel) =>
              channel.category_id === category.category_id
          )
          .slice(0, 20),
      }));

      setRows(builtRows);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="mb-8 text-5xl font-black">
        📺 Live TV
      </h1>

      {rows.map((row) => (
        <ChannelRow
          key={row.title}
          title={row.title}
          channels={row.channels}
        />
      ))}
    </main>
  );
}