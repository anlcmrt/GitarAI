'use client';

import Image from 'next/image';

export default function GitarinBolumleriPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎸 Gitarın Bölümleri</h1>

      <p className="mb-4 text-gray-700">
        Gitar birçok parçadan oluşur ve her bir bölümün ayrı bir görevi vardır. Gitarın temel bölümlerini
        bilmek, onu doğru tutmak ve çalmak için önemlidir.
      </p>

      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li><strong>Kafa (Headstock):</strong> Burguların (tuning pegs) bulunduğu yerdir. Tellerin akort edildiği kısımdır.</li>
        <li><strong>Sap (Neck):</strong> Perdeler (frets) burada yer alır. Sol el genellikle bu bölümde çalışır.</li>
        <li><strong>Gövde (Body):</strong> Sesin çıktığı ve tellerin çalındığı ana kısımdır. Akustik gitarlar için delik (soundhole) buradadır.</li>
        <li><strong>Köprü (Bridge):</strong> Tellerin alt uçtan sabitlendiği yerdir.</li>
        <li><strong>Perdeler (Frets):</strong> Sap üzerindeki metal çizgilerdir; nota yerlerini belirler.</li>
      </ul>

      <div className="mb-6">
        <Image
          src="/images/gitar-bolumleri.png" // bu dosyayı /public/images içine koyman gerekiyor
          alt="Gitarın Bölümleri"
          width={600}
          height={400}
          className="rounded shadow"
        />
        <p className="text-sm text-gray-500 mt-2">Şekil: Gitarın bölümleri</p>
      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={() => alert("Bu dersi tamamladınız!")}
      >
        ✅ Anladım, Devam Et
      </button>
    </main>
  );
}
