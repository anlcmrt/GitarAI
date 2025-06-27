export default function Impressum() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>

      <p className="mb-4">
        Angaben gemäß § 5 TMG:
      </p>

      <p className="mb-4">
        Anıl Mert Cömert<br />
      </p>

      <p className="mb-4">
        E-Mail:{" "}
        <a href="mailto:anil.coemert@gmail.com" className="text-blue-600 underline">
          anil.coemert@gmail.com
        </a>
      </p>

      <p className="mb-4">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br />
        Anıl Mert Cömert
      </p>

      <p className="mb-4">
        Hinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
      </p>

      <p className="text-sm text-gray-500 mt-10">
        Stand: Juni 2025
      </p>
    </div>
  );
}
