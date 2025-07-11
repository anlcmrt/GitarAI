"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { songs } from "@/data/songs";

const notes = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

function transposeChord(chord: string, amount: number): string {
  const regex = /^([A-G]#?)(.*)$/;
  const match = chord.match(regex);
  if (!match) return chord;

  const [root, suffix] = [match[1], match[2]];
  const index = notes.indexOf(root);
  if (index === -1) return chord;

  let newIndex = (index + amount) % notes.length;
  if (newIndex < 0) newIndex += notes.length;

  return notes[newIndex] + suffix;
}

function transposeLyrics(lyrics: string, amount: number): string {
  return lyrics
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((word) => transposeChord(word, amount))
        .join(" ")
    )
    .join("\n");
}

export default function SongPage() {
  const params = useParams();
  const slug = params.slug ?? "";

  const song = songs.find((s) => s.slug === slug);
  const [transpose, setTranspose] = useState(0);

  if (!song) {
    return <div>Şarkı bulunamadı.</div>;
  }

  const transposedLyrics = transposeLyrics(song.lyrics, transpose);

  const activeNoteIndex = (transpose % notes.length + notes.length) % notes.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        {song.artist} - {song.title}
      </h1>

      {/* Transpoze Butonları ve Başlık */}
      <div className="mb-4 flex gap-4 items-center justify-center">
        <button
          onClick={() => setTranspose(transpose - 1)}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          −
        </button>
        <span className="font-mono text-lg font-semibold">TRANSPOZE</span>
        <button
          onClick={() => setTranspose(transpose + 1)}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        >
          +
        </button>
      </div>

      {/* Nota Barı */}
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        {notes.map((note, i) => (
          <button
            key={note}
            onClick={() => setTranspose(i)}
            className={`px-3 py-1 rounded font-mono ${
              i === activeNoteIndex
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-purple-300"
            }`}
          >
            {note}
          </button>
        ))}
      </div>

      {/* Şarkı akorları ve sözleri */}
      <pre className="whitespace-pre-wrap font-mono bg-neutral-800 text-white p-4 rounded">
        {transposedLyrics}
      </pre>
    </div>
  );
}
