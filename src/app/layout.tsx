"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitarAI",
  description: "Gitar çalanlar için akorlar, şarkı sözleri ve akort etme aracı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isSongsPage = pathname?.startsWith("/songs");

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col ${
          isSongsPage ? "bg-neutral-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="text-sm text-gray-400 text-center mt-16 mb-6">
          © {new Date().getFullYear()} GitarAI.{" "}
          <Link href="/datenschutz" className="underline hover:text-purple-400">
            Datenschutz
          </Link>{" "}
          |{" "}
          <Link href="/impressum" className="underline hover:text-purple-400">
            Impressum
          </Link>
        </footer>
      </body>
    </html>
  );
}
