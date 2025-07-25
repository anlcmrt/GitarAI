'use client';

import { useState } from 'react';

export default function OnboardingPage() {
  const [answers, setAnswers] = useState<number[]>(Array(5).fill(0));
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionIndex: number, score: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = score;
    setAnswers(newAnswers);
  };

  const calculateLevel = () => {
    const totalScore = answers.reduce((acc, curr) => acc + curr, 0);
    if (totalScore <= 3) return 'Başlangıç';
    if (totalScore <= 7) return 'Orta';
    return 'İleri';
  };

  const handleSubmit = () => {
    const level = calculateLevel();
    setResult(level);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Seviye Belirleme</h1>

      {/* Soru 1 */}
      <div>
        <p className="font-semibold">1. Gitarla ne kadar süredir ilgileniyorsun?</p>
        <div className="space-y-1 mt-2">
          <label><input type="radio" name="q1" onChange={() => handleAnswer(0, 0)} /> Hiç başlamadım</label><br />
          <label><input type="radio" name="q1" onChange={() => handleAnswer(0, 1)} /> 0–3 ay</label><br />
          <label><input type="radio" name="q1" onChange={() => handleAnswer(0, 2)} /> 3–12 ay</label><br />
          <label><input type="radio" name="q1" onChange={() => handleAnswer(0, 3)} /> 1 yıldan fazla</label>
        </div>
      </div>

      {/* Soru 2 */}
      <div>
        <p className="font-semibold">2. Temel akorları (Am, C, G, D) çalabiliyor musun?</p>
        <div className="space-y-1 mt-2">
          <label><input type="radio" name="q2" onChange={() => handleAnswer(1, 0)} /> Hayır</label><br />
          <label><input type="radio" name="q2" onChange={() => handleAnswer(1, 1)} /> Zorlanarak</label><br />
          <label><input type="radio" name="q2" onChange={() => handleAnswer(1, 2)} /> Rahat</label>
        </div>
      </div>

      {/* Soru 3 */}
      <div>
        <p className="font-semibold">3. Bu görseldeki akor hangisidir? (örnek: F akoru foto)</p>
        <div className="mt-2">
          <img src="/images/f-chord.jpg" alt="F akoru" className="w-40 mb-2" />
          <label><input type="radio" name="q3" onChange={() => handleAnswer(2, 0)} /> E akoru</label><br />
          <label><input type="radio" name="q3" onChange={() => handleAnswer(2, 2)} /> F akoru</label><br />
          <label><input type="radio" name="q3" onChange={() => handleAnswer(2, 0)} /> A akoru</label>
        </div>
      </div>

      {/* Soru 4 */}
      <div>
        <p className="font-semibold">4. Bu akorların hepsini çalabiliyor musun? (Am, G, C, D, E, F, Bm)</p>
        <div className="space-y-1 mt-2">
          <label><input type="radio" name="q4" onChange={() => handleAnswer(3, 0)} /> Hayır</label><br />
          <label><input type="radio" name="q4" onChange={() => handleAnswer(3, 1)} /> Çoğunu çalabiliyorum</label><br />
          <label><input type="radio" name="q4" onChange={() => handleAnswer(3, 2)} /> Evet</label>
        </div>
      </div>

      {/* Soru 5 */}
      <div>
        <p className="font-semibold">5. Gitarla ne yapmak istiyorsun?</p>
        <div className="space-y-1 mt-2">
          <label><input type="radio" name="q5" onChange={() => handleAnswer(4, 0)} /> Yeni başlayacağım</label><br />
          <label><input type="radio" name="q5" onChange={() => handleAnswer(4, 1)} /> Akorla şarkı çalmak</label><br />
          <label><input type="radio" name="q5" onChange={() => handleAnswer(4, 2)} /> Sololar, doğaçlama</label>
        </div>
      </div>

      <button
        className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        onClick={handleSubmit}
      >
        Seviyemi Göster
      </button>

      {result && (
        <div className="mt-6 text-xl font-semibold">
          🎯 Seviyen: <span className="text-orange-600">{result}</span>
        </div>
      )}
    </div>
  );
}
