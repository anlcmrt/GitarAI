"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => {
      if (prev) {
        setDropdownOpen(false);
      }
      return !prev;
    });
  };

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
        onClick={toggleMenu}
        aria-label="Menüyü Aç/Kapat"
        aria-expanded={isOpen}
        aria-haspopup="true"
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
            href="/education"
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

        {user ? (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {user.email}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white border rounded shadow-md w-40 z-50">
                <li>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    Hesabım
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </li>
              </ul>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Giriş Yap
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-sm font-semibold text-gray-700 hover:text-orange-500 transition"
              >
                Kayıt Ol
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
