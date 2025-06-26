"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Menü açık/kapalı durumuna göre menü stilini ayarlıyoruz
  const menuClasses = `md:flex md:items-center md:gap-6 absolute md:static bg-gray-900 w-full left-0 md:w-auto md:bg-transparent transition-transform duration-300 ease-in-out ${
    isOpen ? "top-16" : "top-[-400px]"
  }`;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      {/* Site başlığı */}
      <div className="text-xl font-bold">
        <Link href="/">myMelodyAI</Link>
      </div>

      {/* Mobil için menü açma butonu */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Menü linkleri */}
      <ul className={menuClasses}>
        <li>
          <Link href="/" onClick={() => setIsOpen(false)}>
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link href="/songs" onClick={() => setIsOpen(false)}>
            Şarkılar
          </Link>
        </li>
        <li>
          <Link href="/tuner" onClick={() => setIsOpen(false)}>
            Akort Etme
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            Hakkında
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  );
}
