import { Channel } from "@/types/channel";

export function parseM3U(content: string): Channel[] {
  const channels: Channel[] = [];

  const lines = content.split("\n");

  let current: Partial<Channel> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("#EXTINF")) {
      current = {};

      current.name =
        line.split(",").pop()?.trim() ?? "";

      current.logo =
        line.match(/tvg-logo="([^"]+)"/)?.[1] ?? "";

      current.group =
        line.match(/group-title="([^"]+)"/)?.[1] ??
        "Other";

      current.tvgId =
        line.match(/tvg-id="([^"]+)"/)?.[1] ?? "";

      current.tvgName =
        line.match(/tvg-name="([^"]+)"/)?.[1] ?? "";

      current.tvgLogo = current.logo;
    }

    if (
      line.startsWith("http://") ||
      line.startsWith("https://")
    ) {
      current.url = line;

      channels.push(current as Channel);
    }
  }

  return channels;
}

export function getGroups(
  channels: Channel[]
): string[] {
  return [
    "All",
    ...Array.from(
      new Set(
        channels.map((c) => c.group)
      )
    ).sort(),
  ];
}