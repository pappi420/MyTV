"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type FavoriteMovie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  rating: number;
};

type FavoritesContextType = {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: FavoriteMovie) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType | undefined>(
    undefined
  );

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<
    FavoriteMovie[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const toggleFavorite = (movie: FavoriteMovie) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (m) => m.id === movie.id
      );

      if (exists) {
        return prev.filter(
          (m) => m.id !== movie.id
        );
      }

      return [...prev, movie];
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some(
      (movie) => movie.id === id
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}