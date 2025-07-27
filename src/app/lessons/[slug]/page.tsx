'use client';

import { useParams } from 'next/navigation';

type LessonContent = {
  slug: string;
  title: string;
  level: string;
  content: string;
};

const lessons: LessonContent[] = [
  {
    slug: 'gitarin-bolumleri',
    title: 'Gitarın Bölümleri',
    level: 'Tüm seviyeler',
    content: 'Gitarın gövdesi, sapı, burgular, teller ve perde yapısı gibi temel bileşenlerini tanı.',
  },
  {
    slug: 'em-akoru',
    title: 'Em Akoru',
    level: 'Başlangıç',
    content: 'Em akoru, iki parmakla kolayca çalınabilen ilk akorlardan biridir. 2. perde 5. ve 4. tel basılır.',
  },
  {
    slug: 'nota-nedir',
    title: 'Nota Nedir?',
    level: 'Tüm seviyeler',
    content: 'Notalar müzikteki sesleri temsil eder. Do–Re–Mi (veya C–D–E) gibi isimlerle gösterilir.',
  },
  // Devamı eklenebilir
];

export default function LessonPage() {
  const params = useParams();
  const slug = params?.slug;

  const lesson = lessons.find((l) => l.slug === slug);

  if (!lesson) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold text-red-500">Ders bulunamadı.</h1>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-500 mb-4">Seviye: {lesson.level}</p>

      <div className="bg-white p-6 border rounded-xl shadow-sm mb-6">
        <p className="text-lg text-gray-700">{lesson.content}</p>
      </div>

      <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
        Devam Et
      </button>
    </main>
  );
}
