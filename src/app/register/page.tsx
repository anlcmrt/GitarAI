'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await setPersistence(auth, browserLocalPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: form.name,
        });
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Kayıt sırasında bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">GitarAI - Kayıt Ol</h1>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}
      {success && (
        <p className="mb-4 text-green-600 font-semibold">
          Kayıt başarılı! Yönlendiriliyorsunuz...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">Ad Soyad</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

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
            minLength={6}
            autoComplete="new-password"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold"
        >
          {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Zaten hesabın var mı?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
