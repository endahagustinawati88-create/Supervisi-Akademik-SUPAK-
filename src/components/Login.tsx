import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

export default function Login({ onLogin, users }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === '1') {
      const adminUser = users.find(u => u.role === 'admin');
      if (adminUser) onLogin(adminUser);
      return;
    }

    const nonAdminUser = users.find(u => u.nip === username && u.role !== 'admin');
    if (nonAdminUser) {
      if (nonAdminUser.role === 'kepala_sekolah' && password === '12345') {
        onLogin(nonAdminUser);
        return;
      } else if (nonAdminUser.role !== 'kepala_sekolah' && password === '123') {
        onLogin(nonAdminUser);
        return;
      }
    }

    setError('Username atau password salah.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Login SupervisiEdu</h2>
          <p className="text-slate-500 mt-2 text-sm">Masuk untuk memantau progres proyek secara real-time.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username / NIP</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Masukkan username atau NIP"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
          >
            Masuk
          </button>
        </form>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Info Login Default:</h3>
          <ul className="text-xs text-slate-500 space-y-1">
            <li><span className="font-medium text-slate-700">Admin:</span> admin / 1</li>
            <li><span className="font-medium text-slate-700">Guru:</span> NIP / 123</li>
            <li><span className="font-medium text-slate-700">Kepala Sekolah:</span> NIP / 12345</li>
            <li className="pt-2 italic text-slate-400">Guru/Pengawas baru menggunakan password "123". Kepala Sekolah menggunakan password "12345".</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
