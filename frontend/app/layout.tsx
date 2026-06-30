import type { Metadata } from "next";
import "./globals.css";

import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "MyTV",
  description: "Streaming Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#070707] text-white">
        <Sidebar />

        <main className="ml-64 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}