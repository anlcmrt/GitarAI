export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">GitarAI Hakkında</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">GitarAI projesi nedir?</h2>
        <p>
          GitarAI, gitar akorlarının ve şarkıların öğrenilebildiği, yapay zeka destekli
          bir web sitesidir. Kullanıcılar burada istedikleri şarkıların akorlarını görebilir,
          nasıl çalındığını öğrenebilir ve AI ile pratik yaparak eksiklerini keşfedebilirler.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Kim geliştirdi?</h2>
        <p>Anıl Mert Cömert tarafından geliştirilmiştir.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Neden yapıldı?</h2>
        <p>
          Gitar öğrenimine destek veren, kullanıcı dostu ve yapay zeka destekli
          bir platform eksikliği nedeniyle bu site hayata geçirilmiştir.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Kullanıcıya nasıl fayda sağlıyor?</h2>
        <p>
          Kullanıcılar, site sayesinde istedikleri şarkıları çalmayı öğrenebilir,
          akorları ve çalım tekniklerini görebilir. Ayrıca yapay zeka destekli pratik
          özelliği ile eksiklerini dinleyip geliştirebilirler.
        </p>
      </section>
    </div>
  );
}
