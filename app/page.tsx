"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <Sidebar />

      <div className="ml-64 p-10">

        <div className="flex justify-between items-center mb-8">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-96 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 outline-none"
          />

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold">
              A
            </div>

            <div>
              <div className="font-semibold">Apolonio</div>
              <div className="text-sm text-gray-400">
                Administrator
              </div>
            </div>
          </div>

        </div>

  

        <MovieRow
          title="Continue Watching"
          search={search}
        />

        <MovieRow
          title="Trending Now"
          search={search}
        />

        <MovieRow
          title="Popular Movies"
          search={search}
        />

      </div>
    </main>
  );
}

