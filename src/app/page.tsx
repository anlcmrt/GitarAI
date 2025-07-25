// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fef7ec] text-[#111] flex items-center justify-center px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Sol taraf: metin ve butonlar */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#111]">
            Yapay Zeka ile <br /> Gitar Öğren
          </h1>
          <p className="text-lg text-gray-700">
            Seviyenize uygun derslerle gitar çalmayı GitarAI ile öğrenin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/onboarding"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl text-center hover:bg-orange-700 transition"
            >
              Seviyeni Belirle
            </Link>
            <Link
              href="#"
              className="border border-gray-400 px-6 py-3 rounded-xl text-center hover:bg-gray-100 transition"
            >
              Tanıtım Videosu
            </Link>
          </div>
          <div className="text-sm text-gray-600 mt-4">
            🔎 Hızlı bir seviye testi yapmak ister misiniz?
          </div>
        </div>

        {/* Sağ taraf: görsel veya video */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/guitar-demo.jpg"
            alt="Gitar Öğrenme"
            className="w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
