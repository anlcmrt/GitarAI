"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();

  const isHome = pathname === "/";

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

  const linkBaseClass = isHome
    ? "text-white hover:text-orange-400"
    : "text-gray-900 hover:text-orange-500";

  const linkClass = `font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full ${
    isHome ? "after:bg-orange-400" : "after:bg-orange-500"
  } after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 ${linkBaseClass} transition`;

  const mobileMenuClasses = `md:flex md:items-center md:gap-6 absolute md:static w-full left-0 md:w-auto transition-transform duration-300 ease-in-out z-50 ${
    isOpen ? "top-16" : "top-[-400px]"
  } ${isHome ? "bg-transparent" : "bg-white"}`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between ${
        isHome ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      {/* Logo */}
      <div className={`text-3xl font-bold ${isHome ? "text-white" : "text-gray-900"}`}>
        <Link href="/" className="hover:text-orange-400 transition">
          GitarAI
        </Link>
      </div>

      {/* Mobil Menü Düğmesi */}
      <button
        className={`md:hidden text-2xl ${isHome ? "text-white" : "text-gray-800"}`}
        onClick={toggleMenu}
        aria-label="Menüyü Aç/Kapat"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        ☰
      </button>

      {/* Menü Öğeleri */}
      <ul className={mobileMenuClasses}>
        {[
          { href: "/", label: "Ana Sayfa" },
          { href: "/onboarding", label: "Seviye Belirle" },
          { href: "/education", label: "Eğitim Paneli" },
          { href: "/tuner", label: "Akort Et" },
          { href: "/about", label: "Hakkında" },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}

        {user ? (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`text-sm font-medium ${isHome ? "text-white hover:text-orange-400" : "text-gray-800 hover:text-orange-500"} transition`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {user.email}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-white text-gray-800 border rounded shadow-md w-40 z-50">
                <li>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
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
                className={`text-sm font-medium ${linkBaseClass}`}
              >
                Giriş Yap
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className={`text-sm font-medium ${linkBaseClass}`}
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
