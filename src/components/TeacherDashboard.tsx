import { SupervisionData, User } from '../types';
import { FileText, CheckCircle2, Calendar, ChevronRight } from 'lucide-react';

interface TeacherDashboardProps {
  teacher: User;
  supervisions: SupervisionData[];
  onViewSupervision: (id: string) => void;
}

export default function TeacherDashboard({ teacher, supervisions, onViewSupervision }: TeacherDashboardProps) {
  const completedSupervisions = supervisions.filter(s => s.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-2xl">
            {teacher.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{teacher.name}</h2>
            <p className="text-slate-500">NIP. {teacher.nip}</p>
          </div>
        </div>
        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Supervisi</p>
          <p className="text-xl font-bold text-slate-800">{completedSupervisions.length}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Riwayat Supervisi</h3>
        
        {completedSupervisions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">Belum ada riwayat supervisi.</p>
            <p className="text-slate-400 text-sm mt-1">Supervisi yang telah selesai akan muncul di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedSupervisions.map(supervision => (
              <div key={supervision.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Selesai
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(supervision.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1 line-clamp-1">{supervision.judul}</h4>
                  <p className="text-slate-500 text-sm">
                    {supervision.mataPelajaran} • Kelas {supervision.kelas}
                  </p>
                </div>
                <button
                  onClick={() => onViewSupervision(supervision.id)}
                  className="w-full p-3 flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Lihat Detail Hasil
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
