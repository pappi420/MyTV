import { Provider } from "@/types/provider";
import { Category } from "@/types/category";
import { LiveChannel } from "@/types/liveChannel";
import { Movie } from "@/types/movie";
import { Series } from "@/types/series";

export async function testConnection(provider: Provider) {
  try {
    const response = await fetch(
      `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}`
    );

    if (!response.ok) return false;

    const data = await response.json();

    return !!data.user_info;
  } catch {
    return false;
  }
}

export async function getLiveCategories(provider: Provider): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_live_categories`
  );

  return response.json();
}

export async function getMovieCategories(provider: Provider): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_vod_categories`
  );

  return response.json();
}

export async function getSeriesCategories(provider: Provider): Promise<Category[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_series_categories`
  );

  return response.json();
}

export async function getLiveStreams(provider: Provider): Promise<LiveChannel[]> {
  const response = await fetch(
    `${provider.server}/player_api.php?username=${provider.username}&password=${provider.password}&action=get_live_streams`
  );

  return response.json();
}

export async function getMovies(
  provider: Provider,
  categoryId?: string
): Promise<Movie[]> {
  let url =
    `${provider.server}/player_api.php` +
    `?username=${provider.username}` +
    `&password=${provider.password}` +
    `&action=get_vod_streams`;

  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }

  const response = await fetch(url);

  return response.json();
}

export async function getSeries(
  provider: Provider,
  categoryId?: string
): Promise<Series[]> {
  let url =
    `${provider.server}/player_api.php` +
    `?username=${provider.username}` +
    `&password=${provider.password}` +
    `&action=get_series`;

  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }

  const response = await fetch(url);

  return response.json();
}

export async function getMovieInfo(
  provider: Provider,
  streamId: number
) {
  const response = await fetch(
    `${provider.server}/player_api.php` +
      `?username=${provider.username}` +
      `&password=${provider.password}` +
      `&action=get_vod_info` +
      `&vod_id=${streamId}`
  );

  return response.json();
}