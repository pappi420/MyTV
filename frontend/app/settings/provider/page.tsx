"use client";

import { useEffect, useState } from "react";

import { Provider } from "@/types/provider";

import {
  loadProvider,
  saveProvider,
} from "@/services/storage";

import { testConnection } from "../../../services/xtream";

export default function ProviderPage() {
  const [provider, setProvider] =
    useState<Provider>({
      server: "",
      username: "",
      password: "",
      connected: false,
    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const saved = loadProvider();

    if (saved) {
      setProvider(saved);
    }
  }, []);

  async function connect() {
    setLoading(true);
    setMessage("");

    const success =
      await testConnection(provider);

    const updated = {
      ...provider,
      connected: success,
    };

    saveProvider(updated);

    setProvider(updated);

    setLoading(false);

    setMessage(
      success
        ? "✅ Connected successfully!"
        : "❌ Connection failed."
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-10 py-12 text-white">
      <div className="mx-auto max-w-xl rounded-3xl bg-zinc-900 p-8 shadow-2xl">

        <h1 className="mb-8 text-4xl font-black">
          IPTV Provider
        </h1>

        <div className="space-y-6">

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Server URL
            </label>

            <input
              value={provider.server}
              onChange={(e) =>
                setProvider({
                  ...provider,
                  server: e.target.value,
                })
              }
              placeholder="http://server:8080"
              className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Username
            </label>

            <input
              value={provider.username}
              onChange={(e) =>
                setProvider({
                  ...provider,
                  username: e.target.value,
                })
              }
              className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={provider.password}
              onChange={(e) =>
                setProvider({
                  ...provider,
                  password: e.target.value,
                })
              }
              className="w-full rounded-xl bg-zinc-800 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={connect}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500 disabled:opacity-50"
          >
            {loading
              ? "Connecting..."
              : "Connect Provider"}
          </button>

          {message && (
            <div className="rounded-xl bg-zinc-800 p-4 text-center">
              {message}
            </div>
          )}

          {provider.connected && (
            <div className="rounded-xl border border-green-500 bg-green-500/10 p-4 text-green-400">
              Provider Connected
            </div>
          )}

        </div>
      </div>
    </main>
  );
}