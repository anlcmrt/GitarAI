// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO Bölümü */}
      <section className="bg-[#1e81f3] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Yapay Zeka ile Gitar Öğren
          </h1>
          <p className="text-lg md:text-xl">
            Yapay zeka destekli etkileşimli egzersizlerle <br className="hidden md:inline" />
            gitar becerilerini geliştirin.
          </p>
          <Link
            href="/education"
            className="inline-block bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-xl text-lg font-semibold mt-4"
          >
            Eğitime Başla
          </Link>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Kişiselleştirilmiş Eğitim Programı
            </h2>
            <p className="text-gray-600 mt-2 text-lg max-w-xl mx-auto">
              Seviyenize ve ilgi alanlarınıza uygun bir eğitim programı ile adım adım ilerleyin.
            </p>
          </div>

          {/* Kartlar */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border text-center">
              <div className="text-4xl mb-4">📘</div>
              <h3 className="font-semibold text-lg">Temel Bilgiler</h3>
              <p className="text-gray-600 text-sm mt-2">
                Gitarın temellerini öğrenmek için temel bilgilerinizi oluşturun.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border text-center">
              <div className="text-4xl mb-4">🎸</div>
              <h3 className="font-semibold text-lg">Akorlar</h3>
              <p className="text-gray-600 text-sm mt-2">
                Akorlar, geçişler ve çalma teknikleri ile pratiğinizi geliştirin.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border text-center">
              <div className="text-4xl mb-4">🖐️</div>
              <h3 className="font-semibold text-lg">Fingerstyle</h3>
              <p className="text-gray-600 text-sm mt-2">
                Parmaklarınızı kullanarak melodi ve armonileri birlikte çalın.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
