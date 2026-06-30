"use client";

import ChannelCard from "@/components/ChannelCard";
import { LiveChannel } from "@/types/liveChannel";

type Props = {
  title: string;
  channels: LiveChannel[];
};

export default function ChannelRow({
  title,
  channels,
}: Props) {
  if (channels.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-5 text-3xl font-bold">
        {title}
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {channels.map((channel) => (
          <div
            key={channel.stream_id}
            className="w-[180px] flex-shrink-0"
          >
            <ChannelCard channel={channel} />
          </div>
        ))}
      </div>
    </section>
  );
}