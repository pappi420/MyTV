"use client";

import { useMemo, useState } from "react";

import ChannelCard from "@/components/ChannelCard";
import VideoPlayer from "@/components/player/VideoPlayer";

import {
  parseM3U,
  getGroups,
} from "@/services/m3u";

import { Channel } from "@/types/channel";

export default function LivePage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedGroup, setSelectedGroup] =
  useState("All");
  const [selectedChannel, setSelectedChannel] =
    useState<Channel | null>(null);

  function loadPlaylist(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;

      const parsed = parseM3U(text);

      setChannels(parsed);

      if (parsed.length > 0) {
        setSelectedChannel(parsed[0]);
      }
    };

    reader.readAsText(file);
  }
const groups = useMemo(
  () => getGroups(channels),
  [channels]
);

const filteredChannels =
  selectedGroup === "All"
    ? channels
    : channels.filter(
        (c) => c.group === selectedGroup
      );
  return (
    <main className="min-h-screen bg-[#070707] p-10 text-white">
      <h1 className="mb-8 text-5xl font-black">
        📺 Live TV
      </h1>

      <input
        type="file"
        accept=".m3u,.m3u8"
        onChange={loadPlaylist}
        className="mb-10"
      />

      {selectedChannel && (
        <div className="mb-10 overflow-hidden rounded-3xl">
          <VideoPlayer src={selectedChannel.url} />

          <div className="mt-4">
            <h2 className="text-3xl font-bold">
              {selectedChannel.name}
            </h2>

            <p className="text-zinc-400">
              {selectedChannel.group || "Live TV"}
            </p>
          </div>
        </div>
      )}
<div className="mb-8 flex flex-wrap gap-3">
  {groups.map((group) => (
    <button
      key={group}
      onClick={() =>
        setSelectedGroup(group)
      }
      className={`rounded-full px-5 py-2 transition ${
        selectedGroup === group
          ? "bg-blue-600"
          : "bg-zinc-800 hover:bg-zinc-700"
      }`}
    >
      {group}
    </button>
  ))}
</div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-6">
       {filteredChannels.map((channel) => (
          <ChannelCard
            key={channel.url}
            channel={channel}
            onSelect={() => setSelectedChannel(channel)}
          />
        ))}
      </div>
    </main>
  );
}