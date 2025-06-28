// app/page.tsx

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-purple-100 to-white">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-purple-800 mb-6">
        myMelodyAI
      </h1>

       {/* Görsel kutusu */}
      <div className="p-1 rounded-xl bg-white/60 shadow-xl backdrop-blur-sm max-w-md mb-10">
        <Image
          src="/images/guitar.jpg"
          alt="Renkli Gitar"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      <p className="text-xl md:text-2xl text-gray-700 text-center max-w-2xl mb-10">
        Gitar çalmayı öğren, akorları keşfet ve müziğinle kendini geliştir.
        myMelodyAI senin dijital müzik yardımcın.
      </p>

      <Link href="/songs">
        <div className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-purple-700 transition cursor-pointer">
          Şarkılara Göz At
        </div>
      </Link>
    </div>
  );
}