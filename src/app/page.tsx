// src/app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fef7ec] text-[#111] flex items-center justify-center px-6 py-16">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Sol taraf: Başlık, Açıklama, Butonlar */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Yapay Zeka ile <br className="hidden sm:inline" /> Gitar Öğren
          </h1>
          <p className="text-lg text-gray-700">
            Seviyene uygun içeriklerle gitar çalmayı GitarAI ile öğren. Yapay zeka destekli eğitim sistemiyle gelişimini takip et.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/onboarding"
              className="bg-orange-600 text-white px-6 py-3 rounded-xl text-center hover:bg-orange-700 transition shadow-sm font-semibold"
            >
              Seviyeni Belirle
            </Link>
            <Link
              href="/about"
              className="border border-gray-400 px-6 py-3 rounded-xl text-center hover:bg-gray-100 transition font-semibold"
            >
              Nasıl Çalışır?
            </Link>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            🔎 Hızlı bir seviye testi yapmak ister misin? Başlamak için yeterli.
          </div>
        </div>

        {/* Sağ taraf: Görsel */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <Image
            src="/guitar-demo.jpg"
            alt="Gitar Öğrenme"
            width={700}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}
