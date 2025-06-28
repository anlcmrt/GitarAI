import Link from "next/link";
import { songs } from "../../data/songs";

export default function SongsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Şarkılar</h1>
      <ul className="space-y-4">
        {songs.map(({ slug, title, artist }) => (
          <li key={slug}>
            <Link
              href={`/songs/${slug}`}
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-shadow shadow-sm hover:shadow-md"
            >
              {artist} - {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
