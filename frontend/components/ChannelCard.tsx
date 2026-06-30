import Image from "next/image";

import { Channel } from "@/types/channel";

type Props = {
  channel: Channel;
  onSelect: () => void;
};

export default function ChannelCard({
  channel,
  onSelect,
}: Props) {
  return (
    <button
      onClick={onSelect}
      className="group w-56 overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-105 hover:bg-zinc-800"
    >
      <div className="flex h-36 items-center justify-center bg-zinc-950">
        {channel.logo ? (
          <Image
            src={channel.logo}
            alt={channel.name}
            width={120}
            height={120}
            unoptimized
          />
        ) : (
          <span className="text-6xl">📺</span>
        )}
      </div>

      <div className="p-5 text-left">
        <h3 className="truncate text-lg font-bold">
          {channel.name}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {channel.group || "Live TV"}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-sm text-green-400">
            LIVE
          </span>
        </div>
      </div>
    </button>
  );
}