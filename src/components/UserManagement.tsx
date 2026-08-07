import React, { useState } from 'react';
import { User, Role } from '../types';
import { Trash2, UserPlus, Shield, GraduationCap, Briefcase, Eye } from 'lucide-react';

interface UserManagementProps {
  users: User[];
  onAddUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export default function UserManagement({ users, onAddUser, onDeleteUser }: UserManagementProps) {
  const [name, setName] = useState('');
  const [nip, setNip] = useState('');
  const [role, setRole] = useState<Role>('guru');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAddUser({ id: `user-${Date.now()}`, name, nip, role });
    setName('');
    setNip('');
    setRole('guru');
  };

  const getRoleIcon = (r: Role) => {
    switch(r) {
      case 'admin': return <Shield className="w-4 h-4 text-rose-500" />;
      case 'kepala_sekolah': return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'pengawas': return <Eye className="w-4 h-4 text-blue-500" />;
      default: return <GraduationCap className="w-4 h-4 text-emerald-500" />;
    }
  };

  const getRoleName = (r: Role) => {
    switch(r) {
      case 'admin': return 'Admin';
      case 'kepala_sekolah': return 'Kepala Sekolah';
      case 'pengawas': return 'Pengawas';
      case 'guru': return 'Guru';
      default: return r;
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-indigo-600" />
          Tambah Pengguna Baru
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Nama beserta gelar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">NIP (Username)</label>
            <input
              type="text"
              required
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Nomor Induk Pegawai"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Peran</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="guru">Guru</option>
              <option value="kepala_sekolah">Kepala Sekolah</option>
              <option value="pengawas">Pengawas</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors h-10"
          >
            Simpan
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Daftar Pengguna</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">NIP</th>
                <th className="px-6 py-3">Peran</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{user.name}</td>
                  <td className="px-6 py-4 text-slate-500">{user.nip || '-'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                      {getRoleIcon(user.role)}
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Pengguna"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
