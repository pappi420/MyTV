import VideoPlayer from "@/components/player/VideoPlayer";

export default function WatchPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-10">
      <div className="w-full max-w-6xl">
        <VideoPlayer
          src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        />
      </div>
    </main>
  );
}