/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { User, SupervisionData, InstrumentCategory } from './types';
import { DUMMY_USERS, INITIAL_SUPERVISIONS, INSTRUMENT_ASPECTS } from './data';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import SupervisionForm from './components/SupervisionForm';
import SupervisionDetail from './components/SupervisionDetail';

export type ViewState = 
  | { name: 'dashboard' }
  | { name: 'form'; supervisionId?: string; teacherId?: string }
  | { name: 'detail'; supervisionId: string };

export default function App() {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('supervisi_users');
    return saved ? JSON.parse(saved) : DUMMY_USERS;
  });
  
  const [instruments, setInstruments] = useState<InstrumentCategory[]>(() => {
    const saved = localStorage.getItem('supervisi_instruments');
    return saved ? JSON.parse(saved) : INSTRUMENT_ASPECTS;
  });

  const [supervisions, setSupervisions] = useState<SupervisionData[]>(() => {
    const saved = localStorage.getItem('supervisi_data');
    return saved ? JSON.parse(saved) : INITIAL_SUPERVISIONS;
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>({ name: 'dashboard' });

  useEffect(() => {
    localStorage.setItem('supervisi_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('supervisi_instruments', JSON.stringify(instruments));
  }, [instruments]);

  useEffect(() => {
    localStorage.setItem('supervisi_data', JSON.stringify(supervisions));
  }, [supervisions]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView({ name: 'dashboard' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView({ name: 'dashboard' });
  };

  const handleSaveSupervision = (data: SupervisionData) => {
    setSupervisions((prev) => {
      const exists = prev.find((s) => s.id === data.id);
      if (exists) {
        return prev.map((s) => (s.id === data.id ? data : s));
      }
      return [...prev, data];
    });
    setCurrentView({ name: 'dashboard' });
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} users={users} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView({ name: 'dashboard' })}>
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-indigo-600 font-bold text-xl">S</div>
            <h1 className="text-xl font-semibold hidden sm:block">SupervisiEdu</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-indigo-100">{currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-indigo-700 hover:bg-indigo-800 px-3 py-1.5 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {currentUser.role === 'admin' || currentUser.role === 'kepala_sekolah' || currentUser.role === 'pengawas' ? (
          <>
            {currentView.name === 'dashboard' && (
              <AdminDashboard 
                currentUser={currentUser}
                supervisions={supervisions} 
                users={users}
                instruments={instruments}
                onNewSupervision={(teacherId) => setCurrentView({ name: 'form', teacherId })}
                onEditSupervision={(id) => setCurrentView({ name: 'form', supervisionId: id })}
                onViewSupervision={(id) => setCurrentView({ name: 'detail', supervisionId: id })}
                onAddUser={(user) => setUsers([...users, user])}
                onDeleteUser={(id) => setUsers(users.filter(u => u.id !== id))}
                onUpdateInstruments={setInstruments}
              />
            )}
            {currentView.name === 'form' && (
              <SupervisionForm
                teacherId={currentView.teacherId}
                supervisionId={currentView.supervisionId}
                supervisions={supervisions}
                users={users.filter(u => u.role === 'guru')}
                instruments={instruments}
                onSave={handleSaveSupervision}
                onCancel={() => setCurrentView({ name: 'dashboard' })}
              />
            )}
            {currentView.name === 'detail' && (
              <SupervisionDetail
                supervision={supervisions.find(s => s.id === currentView.supervisionId)!}
                teacher={users.find(u => u.id === supervisions.find(s => s.id === currentView.supervisionId)?.teacherId)!}
                instruments={instruments}
                onBack={() => setCurrentView({ name: 'dashboard' })}
              />
            )}
          </>
        ) : (
          <>
            {currentView.name === 'dashboard' && (
              <TeacherDashboard 
                teacher={currentUser}
                supervisions={supervisions.filter(s => s.teacherId === currentUser.id)}
                onViewSupervision={(id) => setCurrentView({ name: 'detail', supervisionId: id })}
              />
            )}
             {currentView.name === 'detail' && (
              <SupervisionDetail
                supervision={supervisions.find(s => s.id === currentView.supervisionId)!}
                teacher={currentUser}
                instruments={instruments}
                onBack={() => setCurrentView({ name: 'dashboard' })}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
