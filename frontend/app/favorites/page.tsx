"use client";

import Link from "next/link";

import MovieRow from "@/components/MovieRow";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-[#070707] text-white p-10">
      <Link
        href="/"
        className="text-blue-400 hover:text-blue-300"
      >
        ← Back to Home
      </Link>

      <h1 className="mt-8 mb-10 text-5xl font-black">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-400 text-lg">
          You haven't added any favorites yet.
        </p>
      ) : (
        <MovieRow
          title="Saved Movies"
          movies={favorites}
        />
      )}
    </main>
  );
}