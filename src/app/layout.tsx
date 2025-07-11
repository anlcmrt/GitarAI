import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Link from "next/link"; // Footer için

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
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased
          bg-purple-100 text-black min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="text-sm text-gray-600 text-center mt-16 mb-6">
          © {new Date().getFullYear()} GitarAI.{" "}
          <Link href="/datenschutz" className="underline hover:text-purple-600">
            Datenschutz
          </Link>{" "}
          |{" "}
          <Link href="/impressum" className="underline hover:text-purple-600">
            Impressum
          </Link>
        </footer>
      </body>
    </html>
  );
}
