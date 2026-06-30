import { Media } from "@/types/media";
import { Movie } from "@/types/movie";
import { LiveChannel } from "@/types/liveChannel";

export function mapXtreamMovie(
  movie: Movie
): Media {
  return {
    id: movie.stream_id.toString(),

    type: "movie",

    title: movie.name,

    poster: movie.stream_icon,

    rating: movie.rating,

    year: movie.year,

    categoryId: movie.category_id,

    streamId: movie.stream_id,

    containerExtension:
      movie.container_extension,
  };
}

export function mapLiveChannel(
  channel: LiveChannel
): Media {
  return {
    id: channel.stream_id.toString(),

    type: "live",

    title: channel.name,

    poster: channel.stream_icon,

    categoryId: channel.category_id,

    streamId: channel.stream_id,
  };
}