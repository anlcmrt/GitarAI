// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitarAI – Yapay Zeka ile Gitar Öğren",
  description:
    "GitarAI ile seviyeni belirle, yapay zeka destekli egzersizlerle gitar çalmayı öğren. Başlangıç, orta ve ileri düzey eğitimler seni bekliyor.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#fef7ec] text-[#111] min-h-screen flex flex-col`}
      >
        {/* Navigasyon */}
        <Navbar />

        {/* Sayfa İçeriği */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="text-sm text-gray-600 text-center mt-16 mb-6">
          © {new Date().getFullYear()} GitarAI.{" "}
          <Link
            href="/datenschutz"
            className="underline hover:text-orange-600"
          >
            Datenschutz
          </Link>{" "}
          |{" "}
          <Link href="/impressum" className="underline hover:text-orange-600">
            Impressum
          </Link>
        </footer>
      </body>
    </html>
  );
}
