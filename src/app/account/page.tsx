'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  User,
} from 'firebase/auth';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setUsername(currentUser.displayName || currentUser.email?.split('@')[0] || '');
      setCreatedAt(currentUser.metadata.creationTime || '');
    }
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!user || !user.email) {
      setMessage('Kullanıcı bilgileri alınamadı.');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setMessage('Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Yeni şifre en az 6 karakter olmalı.');
      return;
    }

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setMessage('✅ Şifre başarıyla güncellendi.');
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error: any) {
      console.error(error);
      setMessage('❌ Hata: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hesabım</h1>

      {user ? (
        <>
          <div className="mb-6 space-y-2">
            <p>
              <span className="font-medium text-gray-700">Kullanıcı Adı:</span>{' '}
              {username}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{' '}
              {user.email}
            </p>
            <p>
              <span className="font-medium text-gray-700">Üyelik Tarihi:</span>{' '}
              {new Date(createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <hr className="my-6" />

          <div>
            <h2 className="text-2xl font-semibold mb-4">Şifre Değiştir</h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label htmlFor="oldPassword" className="block mb-1 font-medium">
                  Mevcut Şifre
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block mb-1 font-medium">
                  Yeni Şifre
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label htmlFor="newPasswordConfirm" className="block mb-1 font-medium">
                  Yeni Şifre (Tekrar)
                </label>
                <input
                  id="newPasswordConfirm"
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {message && (
                <p
                  className={`text-sm ${
                    message.includes('başarı') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
              </button>
            </form>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Lütfen giriş yapın.</p>
      )}
    </div>
  );
}
