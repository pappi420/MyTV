"use client";

import { useEffect, useState } from "react";

import VideoPlayer from "@/components/player/VideoPlayer";
import { loadProvider } from "@/services/storage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function LiveWatchPage({
  params,
}: Props) {
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    async function load() {
      const provider = loadProvider();

console.log("Provider:", provider);

if (!provider) {
  console.log("Provider not found!");
  return;
}

      const { id } = await params;
      console.log("Stream ID:", id);

      const url =
        `${provider.server}/live/` +
        `${provider.username}/` +
        `${provider.password}/` +
        `${id}.ts`;

      console.log("STREAM URL:");
      console.log(url);
      console.log("Setting stream URL...");

      setStreamUrl(url);
    }

    load();
  }, [params]);

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h2 className="mb-4 text-xl font-bold">
        Debug Stream URL
      </h2>

      <p className="mb-6 break-all text-green-400">
        {streamUrl}
      </p>

      {streamUrl && (
        <VideoPlayer src={streamUrl} />
      )}
    </main>
  );
}