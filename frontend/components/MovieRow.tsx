import MovieCard from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  year: string;
  rating: string;
  poster: string;
  backdrop: string;
  overview: string;
};

type MovieRowProps = {
  title: string;
  movies: Movie[];
};

export default function MovieRow({
  title,
  movies,
}: MovieRowProps) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>

        <button className="text-blue-400 hover:text-blue-300">
          View All →
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
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