"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type HistoryMovie = {
  id: number;
  title: string;
  year: string;
  poster: string;
  rating: number;
  lastViewed: number;
};

type HistoryContextType = {
  history: HistoryMovie[];
  addHistory: (movie: Omit<HistoryMovie, "lastViewed">) => void;
};

const HistoryContext =
  createContext<HistoryContextType | null>(null);

export function HistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<HistoryMovie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("history");

    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  }, [history]);

  function addHistory(
    movie: Omit<HistoryMovie, "lastViewed">
  ) {
    const filtered = history.filter(
      (m) => m.id !== movie.id
    );

    setHistory([
      {
        ...movie,
        lastViewed: Date.now(),
      },
      ...filtered,
    ]);
  }

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error(
      "useHistory must be used inside HistoryProvider"
    );
  }

  return context;
}