'use client';

import { useParams } from 'next/navigation';

type Lesson = {
  id: number;
  title: string;
  level: string;
  slug: string;
  category: string;
  active: boolean;
};

const allLessons: Lesson[] = [
  {
    id: 1,
    title: 'Gitarın Bölümleri',
    level: 'Tüm seviyeler',
    slug: 'gitarin-bolumleri',
    category: 'basics',
    active: true,
  },
  {
    id: 2,
    title: 'Gitar Nasıl Tutulur?',
    level: 'Tüm seviyeler',
    slug: 'gitar-nasil-tutulur',
    category: 'basics',
    active: false,
  },
  {
    id: 3,
    title: 'Akort Etme (Tuning)',
    level: 'Tüm seviyeler',
    slug: 'akort-etme',
    category: 'basics',
    active: false,
  },
  {
    id: 4,
    title: 'Nota Nedir?',
    level: 'Tüm seviyeler',
    slug: 'nota-nedir',
    category: 'basics',
    active: false,
  },
  {
    id: 5,
    title: 'Em Akoru',
    level: 'Başlangıç',
    slug: 'em-akoru',
    category: 'chords',
    active: false,
  },
  {
    id: 6,
    title: 'Am Akoru',
    level: 'Başlangıç',
    slug: 'am-akoru',
    category: 'chords',
    active: false,
  },
  {
    id: 7,
    title: 'C Akoru',
    level: 'Başlangıç',
    slug: 'c-akoru',
    category: 'chords',
    active: false,
  },
  {
    id: 8,
    title: 'G Akoru',
    level: 'Başlangıç',
    slug: 'g-akoru',
    category: 'chords',
    active: false,
  },
  {
    id: 9,
    title: 'D Akoru',
    level: 'Başlangıç',
    slug: 'd-akoru',
    category: 'chords',
    active: false,
  },
  {
    id: 10,
    title: 'Düş–Kalk Ritim',
    level: 'Başlangıç',
    slug: 'dus-kalk-ritim',
    category: 'rhythm',
    active: false,
  },
  {
    id: 11,
    title: 'Akor Geçişleri: Em–Am',
    level: 'Başlangıç',
    slug: 'akor-gecis-em-am',
    category: 'rhythm',
    active: false,
  },
  {
    id: 12,
    title: '3 Akorla Basit Şarkı',
    level: 'Başlangıç',
    slug: '3-akorla-sarki',
    category: 'application',
    active: false,
  },
];

export default function CategoryLessonsPage() {
  const params = useParams();
  const category = params?.category;

  const filteredLessons = allLessons.filter(
    (lesson) => lesson.category === category
  );

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        📚 {category?.toString().toUpperCase()} Modülleri
      </h1>

      {filteredLessons.length === 0 && (
        <p className="text-gray-600">Bu kategoriye ait ders bulunamadı.</p>
      )}

      <ul className="space-y-4">
        {filteredLessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`p-4 rounded-xl border flex justify-between items-center ${
              lesson.active
                ? 'bg-white border-green-500'
                : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}
          >
            <div>
              <div className="font-semibold">{lesson.title}</div>
              <div className="text-sm">{lesson.level}</div>
            </div>
            {lesson.active ? (
              <a
                href={`/lessons/${lesson.slug}`}
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Başla
              </a>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                Yakında
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
