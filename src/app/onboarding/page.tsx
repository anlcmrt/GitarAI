'use client';

import { useState } from 'react';

const questions = [
  {
    question: '1. Gitarla ne kadar süredir ilgileniyorsun?',
    options: [
      { text: 'Hiç başlamadım', score: 0 },
      { text: '0–3 ay', score: 1 },
      { text: '3–12 ay', score: 2 },
      { text: '1 yıldan fazla', score: 3 },
    ],
  },
  {
    question: '2. Temel akorları (Am, C, G, D) çalabiliyor musun?',
    options: [
      { text: 'Hayır', score: 0 },
      { text: 'Zorlanarak', score: 1 },
      { text: 'Rahat', score: 2 },
    ],
  },
  {
    question: '3. Bu akorun adı nedir?',
    image: '/images/f-chord.jpg',
    options: [
      { text: 'E akoru', score: 0 },
      { text: 'F akoru', score: 2 },
      { text: 'A akoru', score: 0 },
    ],
  },
  {
    question: '4. Bu akorların hepsini çalabiliyor musun? (Am, G, C, D, E, F, Bm)',
    options: [
      { text: 'Hayır', score: 0 },
      { text: 'Çoğunu çalabiliyorum', score: 1 },
      { text: 'Evet', score: 2 },
    ],
  },
  {
    question: '5. Gitarla ne yapmak istiyorsun?',
    options: [
      { text: 'Yeni başlayacağım', score: 0 },
      { text: 'Akorla şarkı çalmak', score: 1 },
      { text: 'Sololar, doğaçlama', score: 2 },
    ],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Hepsi bitti, seviye hesapla
      const total = newScores.reduce((a, b) => a + b, 0);
      const level =
        total <= 3 ? 'Başlangıç' : total <= 7 ? 'Orta' : 'İleri';
      setResult(level);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Seviye Belirleme</h1>

      {result ? (
        <div className="text-xl font-semibold">
          🎯 Seviyen: <span className="text-orange-600">{result}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>

          {currentQuestion.image && (
            <img src={currentQuestion.image} alt="soru görseli" className="w-48 mb-2" />
          )}

          <div className="space-y-2">
            {currentQuestion.options.map((opt, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(opt.score)}
                className="block w-full text-left px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
