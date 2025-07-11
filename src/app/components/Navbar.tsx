"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuClasses = `md:flex md:items-center md:gap-6 absolute md:static bg-gray-900 w-full left-0 md:w-auto md:bg-transparent transition-transform duration-300 ease-in-out ${
    isOpen ? "top-16" : "top-[-400px]"
  }`;

  // Linklerde hover için ortak class
  const linkClass =
    "font-[var(--font-inter)] font-semibold text-lg text-white relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-purple-400 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 hover:text-purple-400 transition";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="text-3xl font-bold font-[var(--font-inter)]">
        <Link
          href="/"
          className="font-semibold text-3xl hover:text-purple-400 transition font-[var(--font-inter)]"
        >
          GitarAI
        </Link>
      </div>

      <button
        className="md:hidden font-[var(--font-inter)]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={menuClasses}>
        <li>
          <Link href="/" className={linkClass} onClick={() => setIsOpen(false)}>
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link
            href="/songs"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Şarkılar
          </Link>
        </li>
        <li>
          <Link
            href="/tuner"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Akort Etme
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
        <li>
          <Link
            href="/contact"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  );
}
