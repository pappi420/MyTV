"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "🏠 Home" },
  { href: "/live", label: "📺 Live TV" },
  { href: "/movies", label: "🎬 Movies" },
  { href: "/series", label: "📺 Series" },
  { href: "/favorites", label: "⭐ Favorites" },
  { href: "/search", label: "🔍 Search" },
  { href: "/settings/provider", label: "⚙ Provider" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-zinc-800 bg-[#070707] p-6">
      <h1 className="mb-10 text-3xl font-black">
        MyTV
      </h1>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}