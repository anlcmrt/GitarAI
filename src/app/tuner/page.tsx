"use client";

import { useEffect, useState } from "react";

export default function Tuner() {
  const [frequency, setFrequency] = useState<number | null>(null);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Float32Array;
    let source: MediaStreamAudioSourceNode;

    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        dataArray = new Float32Array(analyser.fftSize);

        source.connect(analyser);

        const autoCorrelate = (buf: Float32Array, sampleRate: number) => {
          let SIZE = buf.length;
          let MAX_SAMPLES = Math.floor(SIZE / 2);
          let best_offset = -1;
          let best_correlation = 0;
          let rms = 0;

          for (let i = 0; i < SIZE; i++) {
            let val = buf[i];
            rms += val * val;
          }
          rms = Math.sqrt(rms / SIZE);
          if (rms < 0.01) return -1; // Çok düşük ses => çıkış yap

          let lastCorrelation = 1;
          for (let offset = 1; offset < MAX_SAMPLES; offset++) {
            let correlation = 0;

            for (let i = 0; i < MAX_SAMPLES; i++) {
              correlation += Math.abs((buf[i]) - (buf[i + offset]));
            }
            correlation = 1 - (correlation / MAX_SAMPLES);

            if (correlation > 0.9 && correlation > lastCorrelation) {
              best_correlation = correlation;
              best_offset = offset;
            }
            lastCorrelation = correlation;
          }

          if (best_correlation > 0.9) {
            return sampleRate / best_offset;
          }

          return -1;
        };

        const detectPitch = () => {
          analyser.getFloatTimeDomainData(dataArray);
          const pitch = autoCorrelate(dataArray, audioContext.sampleRate);
          if (pitch !== -1) {
            setFrequency(pitch);
          } else {
            setFrequency(null);
          }
          requestAnimationFrame(detectPitch);
        };

        detectPitch();
      } catch (err) {
        console.error("Mikrofon hatası:", err);
      }
    };

    init();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">myMelodyAI Akort Cihazı</h1>
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-2xl font-semibold text-purple-700">
          {frequency ? `${frequency.toFixed(2)} Hz` : "Ses bekleniyor..."}
        </p>
        <p className="text-gray-600 mt-2">
          Mikrofonun açık ve çalışıyor olmalı. Gitarını çal ve frekansı gör.
        </p>
      </div>
    </div>
  );
}
