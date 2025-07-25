// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from 'firebase/auth';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      } else {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
          setForm((prev) => ({ ...prev, email: savedEmail }));
          setRememberMe(true);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      await signInWithEmailAndPassword(auth, form.email, form.password);
      setSuccess(true);

      if (rememberMe) {
        localStorage.setItem('savedEmail', form.email);
      } else {
        localStorage.removeItem('savedEmail');
      }

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch {
      setError('Google ile giriş başarısız.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">GitarAI - Giriş Yap</h1>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
      {success && (
        <p className="mb-4 text-green-600 font-semibold">
          Giriş başarılı! Yönlendiriliyorsunuz...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">Şifre</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            minLength={6}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="select-none font-semibold">
            Parolayı Kaydet
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-3">veya</p>
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center mx-auto px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
            <path fill="#4285f4" d="M533.5 278.4c0-17.9-1.5-35.1-4.3-51.8H272v98h147.1..." />
            <path fill="#34a853" d="M272 544.3c72.9 0 134-24.1 178.7-65.4l-87.1-68..." />
            <path fill="#fbbc04" d="M120.1 326.9c-7.6-22.8-7.6-47.4 0-70.2v-70.2H32.4..." />
            <path fill="#ea4335" d="M272 107.7c38.4 0 73 13.2 100.3 39.1l75.1-75.1..." />
          </svg>
          Google ile Giriş Yap
        </button>
      </div>

      <p className="mt-6 text-center text-sm">
        Hesabın yok mu?{' '}
        <Link href="/register" className="text-blue-600 hover:underline font-semibold">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
