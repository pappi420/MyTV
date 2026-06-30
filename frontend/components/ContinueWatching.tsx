"use client";

import { useHistory } from "@/context/HistoryContext";
import MovieRow from "./MovieRow";

export default function ContinueWatching() {
  const { history } = useHistory();

  console.log(history);

  return (
    <MovieRow
      title="▶ Continue Watching"
      movies={history}
    />
  );
}