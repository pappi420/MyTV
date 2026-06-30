import { Provider } from "@/types/provider";

export async function getSeriesInfo(
  provider: Provider,
  seriesId: number
) {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_series_info&series_id=${seriesId}`
  );

  return response.json();
}

export function getSeriesStreamUrl(
  provider: Provider,
  episodeId: number,
  extension = "mp4"
) {
  return (
    `${provider.server}/series/` +
    `${provider.username}/` +
    `${provider.password}/` +
    `${episodeId}.${extension}`
  );
}