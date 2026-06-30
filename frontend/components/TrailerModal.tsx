"use client";

type Props = {
  youtubeKey: string;
  onClose: () => void;
};

export default function TrailerModal({
  youtubeKey,
  onClose,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded bg-red-600 px-4 py-2 text-white"
        >
          Close
        </button>

        <iframe
          width="100%"
          height="700"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}