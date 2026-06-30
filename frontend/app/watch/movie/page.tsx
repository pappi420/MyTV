"use client";

import { useSearchParams } from "next/navigation";

import VideoPlayer from "@/components/player/VideoPlayer";

export default function WatchMoviePage() {
  const params = useSearchParams();

  const src = params.get("src");

  if (!src) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Invalid Stream
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8">
        <p className="mb-4 break-all text-green-400">
  {src}
</p>
      <VideoPlayer src={src} />
    </main>
  );
}