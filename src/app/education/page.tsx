'use client';

import Link from 'next/link';

type Lesson = {
  id: number;
  title: string;
  level: string;
  active: boolean;
  slug: string;
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Gitarın Bölümleri',
    level: 'Tüm seviyeler',
    active: true,
    slug: 'gitarin-bolumleri',
  },
  {
    id: 2,
    title: 'Gitar Nasıl Tutulur?',
    level: 'Tüm seviyeler',
    active: false,
    slug: 'gitar-nasil-tutulur',
  },
  {
    id: 3,
    title: 'Nota Nedir?',
    level: 'Tüm seviyeler',
    active: false,
    slug: 'nota-nedir',
  },
  {
    id: 4,
    title: 'Do–Re–Mi ve C–D–E Harfleri',
    level: 'Tüm seviyeler',
    active: false,
    slug: 'do-re-mi-c-d-e',
  },
  {
    id: 5,
    title: 'Akor Nedir?',
    level: 'Tüm seviyeler',
    active: false,
    slug: 'akor-nedir',
  },
  {
    id: 6,
    title: 'Em Akoru Nedir?',
    level: 'Başlangıç',
    active: false,
    slug: 'em-akoru-nedir',
  },
];

export default function EducationPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitarAI Eğitim Paneli</h1>
      <p className="mb-6 text-gray-700">Aşağıdaki sıralı modüllerle gitar öğrenmeye sıfırdan başlayabilirsin:</p>
      <ul className="space-y-4">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`p-4 rounded-xl border flex justify-between items-center ${
              lesson.active ? 'bg-white border-green-500' : 'bg-gray-100 border-gray-300 text-gray-400'
            }`}
          >
            <div>
              <div className="font-semibold">{lesson.title}</div>
              <div className="text-sm">{lesson.level}</div>
            </div>
            {lesson.active ? (
              <Link
                href={`/lessons/${lesson.slug}`}
                className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Başla
              </Link>
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
