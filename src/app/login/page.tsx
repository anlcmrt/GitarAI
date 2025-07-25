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
        const savedEmail = typeof window !== 'undefined' ? localStorage.getItem('savedEmail') : null;
        if (savedEmail) {
          setForm((prev) => ({ ...prev, email: savedEmail }));
          setRememberMe(true);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

      if (typeof window !== 'undefined') {
        if (rememberMe) {
          localStorage.setItem('savedEmail', form.email);
        } else {
          localStorage.removeItem('savedEmail');
        }
      }

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Giriş sırasında bir hata oluştu.');
      }
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
    } catch (_err: unknown) {
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
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M24 9.5c3.9 0 7.1 1.6 9.3 3.8l6.9-6.9C36.6 2.7 30.7 0 24 0 14.6 0 6.7 5.8 2.6 14.1l8.1 6.3C12.1 14.3 17.6 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.5c0-1.6-.1-2.8-.3-4.1H24v7.8h12.6c-.3 2.2-1.7 5.6-4.9 7.9l7.6 5.9c4.4-4 6.8-9.9 6.8-17.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.7 28.3C9.8 26 9.4 23.6 9.4 21s.4-5 1.2-7.3L2.6 7.4C.9 10.7 0 15.2 0 21c0 5.8.9 10.3 2.6 13.6l8.1-6.3z"
            />
            <path
              fill="#EA4335"
              d="M24 42c-6.4 0-11.9-3.8-14.6-9.2l-8.1 6.3C6.7 42.2 14.6 48 24 48c6.7 0 12.6-2.2 17.3-5.9l-7.6-5.9c-2.4 1.6-5.4 2.8-9.7 2.8z"
            />
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
