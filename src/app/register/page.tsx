'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (form.password !== form.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    if (form.username.length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalı.');
      return;
    }

    setLoading(true);

    try {
      // Kullanıcı adı eşsiz mi kontrol et
      const q = query(collection(db, 'usernames'), where('username', '==', form.username));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setError('Bu kullanıcı adı zaten alınmış.');
        setLoading(false);
        return;
      }

      // Firebase Auth ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: form.username,
      });

      // Firestore'a kayıt
      await setDoc(doc(db, 'usernames', user.uid), {
        uid: user.uid,
        username: form.username,
        fullName: `${form.firstName} ${form.lastName}`,
        email: form.email,
        createdAt: new Date(),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Kayıt sırasında hata oluştu.');
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      setError('Google ile kayıt başarısız.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">GitarAI - Kayıt Ol</h1>

      {error && <p className="mb-4 text-red-600 font-medium text-center">{error}</p>}
      {success && <p className="mb-4 text-green-600 font-medium text-center">Kayıt başarılı! Yönlendiriliyorsunuz...</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="İsim"
          value={form.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Soyisim"
          value={form.lastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Şifre Tekrar"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-3">veya</p>
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
          Google ile Kayıt Ol
        </button>
      </div>

      <p className="mt-6 text-center text-sm">
        Zaten hesabın var mı?{' '}
        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
