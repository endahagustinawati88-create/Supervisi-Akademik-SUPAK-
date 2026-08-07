import { useState, useMemo } from 'react';
import { SupervisionData, User, InstrumentCategory } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle2, Clock, Users, FileText, ChevronRight, Settings } from 'lucide-react';
import { cn } from '../utils';
import UserManagement from './UserManagement';
import InstrumentManagement from './InstrumentManagement';

interface AdminDashboardProps {
  currentUser: User;
  supervisions: SupervisionData[];
  users: User[];
  instruments: InstrumentCategory[];
  onNewSupervision: (teacherId?: string) => void;
  onEditSupervision: (supervisionId: string) => void;
  onViewSupervision: (supervisionId: string) => void;
  onAddUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onUpdateInstruments: (instruments: InstrumentCategory[]) => void;
}

export default function AdminDashboard({ currentUser, supervisions, users, instruments, onNewSupervision, onEditSupervision, onViewSupervision, onAddUser, onDeleteUser, onUpdateInstruments }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'supervisi' | 'pengguna' | 'instrumen'>('supervisi');
  const guruUsers = useMemo(() => users.filter(u => u.role === 'guru'), [users]);
  const isAdmin = currentUser.role === 'admin';

  const stats = useMemo(() => {
    const totalTeachers = guruUsers.length;
    const completed = supervisions.filter(s => s.status === 'completed').length;
    const pending = totalTeachers - completed; // Simplification for demo
    
    return { totalTeachers, completed, pending };
  }, [supervisions, guruUsers]);

  const chartData = useMemo(() => {
    return guruUsers.map(user => {
      const userSupervision = supervisions.find(s => s.teacherId === user.id);
      let totalScore = 0;
      let count = 0;
      
      if (userSupervision && userSupervision.status === 'completed') {
        Object.values(userSupervision.evaluations).forEach(ev => {
          if (ev.score !== null) {
            totalScore += ev.score;
            count++;
          }
        });
      }
      
      const avgScore = count > 0 ? (totalScore / count).toFixed(2) : 0;
      
      return {
        name: user.name.split(',')[0],
        score: parseFloat(avgScore as string),
        isCompleted: !!userSupervision,
      };
    });
  }, [supervisions, guruUsers]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard {isAdmin ? 'Admin' : 'Supervisi'}</h2>
          <p className="text-slate-500">Pantau progres supervisi dan kelola pengguna.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('supervisi')}
            className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", activeTab === 'supervisi' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-800")}
          >
            Supervisi
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTab('pengguna')}
                className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", activeTab === 'pengguna' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-800")}
              >
                Pengguna
              </button>
              <button
                onClick={() => setActiveTab('instrumen')}
                className={cn("px-4 py-2 rounded-md text-sm font-medium transition-colors", activeTab === 'instrumen' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-800")}
              >
                Instrumen
              </button>
            </>
          )}
        </div>
      </div>

      {isAdmin && activeTab === 'pengguna' && (
        <UserManagement users={users} onAddUser={onAddUser} onDeleteUser={onDeleteUser} />
      )}

      {isAdmin && activeTab === 'instrumen' && (
        <InstrumentManagement instruments={instruments} onUpdate={onUpdateInstruments} />
      )}

      {activeTab === 'supervisi' && (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => onNewSupervision()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Buat Supervisi Baru
            </button>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Guru</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalTeachers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Selesai Supervisi</p>
            <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Belum Supervisi</p>
            <p className="text-2xl font-bold text-slate-800">{stats.pending}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Rata-rata Nilai Supervisi</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={[0, 4]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 3 ? '#10b981' : entry.score > 2 ? '#f59e0b' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teacher List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Daftar Guru</h3>
          <div className="space-y-3">
            {guruUsers.map(user => {
              const supervision = supervisions.find(s => s.teacherId === user.id);
              const isCompleted = supervision?.status === 'completed';

              return (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{user.name}</p>
                    <p className="text-xs text-slate-500">NIP. {user.nip}</p>
                  </div>
                  {isCompleted ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEditSupervision(supervision.id)}
                        className="text-xs flex items-center gap-1 text-amber-600 font-medium hover:text-amber-700 bg-amber-50 px-2 py-1 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onViewSupervision(supervision.id)}
                        className="text-xs flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-700 bg-indigo-50 px-2 py-1 rounded transition-colors"
                      >
                        Lihat Hasil
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onNewSupervision(user.id)}
                      className="text-xs flex items-center gap-1 text-slate-600 font-medium hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 px-2 py-1 rounded transition-colors"
                    >
                      Mulai Supervisi
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
