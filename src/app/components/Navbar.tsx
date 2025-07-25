"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuClasses = `md:flex md:items-center md:gap-6 absolute md:static bg-white w-full left-0 md:w-auto md:bg-transparent transition-transform duration-300 ease-in-out z-50 ${
    isOpen ? "top-16" : "top-[-400px]"
  }`;

  const linkClass =
    "font-semibold text-lg text-gray-800 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 hover:text-orange-500 transition";

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 flex items-center justify-between relative shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <Link
          href="/"
          className="font-semibold text-3xl hover:text-orange-500 transition"
        >
          GitarAI
        </Link>
      </div>

      {/* Menü düğmesi */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menüyü Aç/Kapat"
      >
        ☰
      </button>

      {/* Menü öğeleri */}
      <ul className={menuClasses}>
        <li>
          <Link href="/" className={linkClass} onClick={() => setIsOpen(false)}>
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link
            href="/onboarding"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Seviye Belirle
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Eğitim Paneli
          </Link>
        </li>
        <li>
          <Link
            href="/tuner"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Akort Et
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Hakkında
          </Link>
        </li>
      </ul>
    </nav>
  );
}
