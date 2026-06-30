import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/services/movieService";

type MovieRowProps = {
  title: string;
  search: string;
};

export default async function MovieRow({
  title,
  search,
}: MovieRowProps) {
  const movies = await getMovies();

  const filteredMovies = movies.filter((movie: any) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>

        <button className="text-blue-400 hover:text-blue-300">
          View All →
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {filteredMovies.map((movie: any) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            poster={movie.poster}
            rating={Number(movie.rating)}
          />
        ))}
      </div>
    </section>
  );
}