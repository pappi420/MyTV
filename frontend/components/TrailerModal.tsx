"use client";

type TrailerModalProps = {
  youtubeKey: string;
  onClose: () => void;
};

export default function TrailerModal({
  youtubeKey,
  onClose,
}: TrailerModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-5xl overflow-hidden rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-white hover:bg-red-600"
        >
          ✕
        </button>

        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}