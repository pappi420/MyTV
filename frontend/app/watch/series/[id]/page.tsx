"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { loadProvider } from "@/services/storage";

export default function WatchSeriesPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [streamUrl, setStreamUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

      if (!provider || !provider.connected) {
        setLoading(false);
        return;
      }

      const ext = searchParams.get("ext") || "mp4";

      const realUrl =
        `https://fries-chips.com:2098/series/` +
        `${provider.username}/` +
        `${provider.password}/` +
        `${id}.${ext}`;

      console.log("REAL URL:", realUrl);

      setStreamUrl(
        "/api/stream?url=" +
          encodeURIComponent(realUrl)
      );

      setLoading(false);
    }

    load();
  }, [id, searchParams]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="bg-black p-6">
      <video
        controls
        autoPlay
        playsInline
        preload="auto"
        className="w-full rounded-xl"
        src={streamUrl}
      />
    </main>
  );
}