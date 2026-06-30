import { Provider } from "@/types/provider";
import { Category } from "@/types/category";
import { LiveChannel } from "@/types/liveChannel";

export const VERSION = "xtream_v1";

export async function testConnection(
  provider: Provider
) {
  try {
    const response = await fetch(
      `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}`
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return !!data.user_info;
  } catch {
    return false;
  }
}

export async function getLiveCategories(
  provider: Provider
): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_live_categories`
  );

  return response.json();
}

export async function getMovieCategories(
  provider: Provider
): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_vod_categories`
  );

  return response.json();
}

export async function getSeriesCategories(
  provider: Provider
): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_series_categories`
  );

  return response.json();
}

export async function getLiveStreams(
  provider: Provider
): Promise<LiveChannel[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_live_streams`
  );

  return response.json();
}