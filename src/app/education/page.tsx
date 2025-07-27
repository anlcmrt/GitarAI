'use client';

import Link from 'next/link';

type Category = {
  id: string;
  title: string;
  description: string;
};

const categories: Category[] = [
  {
    id: 'basics',
    title: 'Temel Bilgiler',
    description: 'Gitarı tanımaya buradan başla. Tutuluş, nota, akor kavramları.',
  },
  {
    id: 'chords',
    title: 'Akorlar',
    description: 'İlk çalacağın Em, Am, C gibi temel akorları öğren.',
  },
  {
    id: 'rhythm',
    title: 'Ritim ve Geçişler',
    description: 'Akorlar arasında geçiş ve ritim duygusu kazandıran modüller.',
  },
  {
    id: 'solo',
    title: 'Solo & Teknikler',
    description: 'Pentatonik diziler, doğaçlama ve teknik alıştırmalar.',
  },
  {
    id: 'fingerstyle',
    title: 'Fingerstyle',
    description: 'Tırnakla çalma, arpej, percussive teknikler ve ileri seviye çalışmalar.',
  },
];

export default function EducationPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎓 GitarAI Eğitim Paneli</h1>
      <p className="text-gray-600 mb-8">
        Gitar öğrenme yolculuğuna aşağıdaki kategorilerden başlayabilirsin.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/education/${cat.id}`}
            className="block border border-gray-300 rounded-xl p-5 hover:shadow-md hover:border-orange-400 transition"
          >
            <h2 className="text-xl font-semibold text-orange-600 mb-1">{cat.title}</h2>
            <p className="text-gray-700 text-sm">{cat.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
