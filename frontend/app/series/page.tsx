"use client";

import { useEffect, useState } from "react";

import { loadProvider } from "@/services/storage";

import {
  getSeriesCategories,
  getSeries,
} from "@/services/xtream";

import SeriesRow from "@/components/SeriesRow";

import { Series } from "@/types/series";

type Row = {
  title: string;
  series: Series[];
};

export default function SeriesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        setLoading(false);
        return;
      }

      const categories = await getSeriesCategories(provider);

      const builtRows: Row[] = [];

      await Promise.all(
        categories.slice(0, 8).map(async (category) => {
          const shows = await getSeries(
            provider,
            category.category_id
          );

          builtRows.push({
            title: category.category_name,
            series: shows.slice(0, 20),
          });
        })
      );

      setRows(builtRows);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Loading Series...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-8 py-10 text-white">
      <h1 className="mb-8 text-5xl font-black">
        📺 TV Series
      </h1>

      <div className="space-y-10">
        {rows.map((row) => (
          <SeriesRow
            key={row.title}
            title={row.title}
            series={row.series}
          />
        ))}
      </div>
    </main>
  );
}