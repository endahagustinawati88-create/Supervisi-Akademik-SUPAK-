import { SupervisionData, User } from '../types';
import { INSTRUMENT_ASPECTS } from '../data';
import { ArrowLeft, User as UserIcon, BookOpen, MapPin, Calendar, Layout } from 'lucide-react';

interface SupervisionDetailProps {
  supervision: SupervisionData;
  teacher: User;
  onBack: () => void;
}

export default function SupervisionDetail({ supervision, teacher, onBack }: SupervisionDetailProps) {
  
  const renderScore = (score: number | null) => {
    if (score === null) return <span className="text-slate-400">-</span>;
    return (
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
        score >= 3 ? 'bg-green-100 text-green-700' : 
        score === 2 ? 'bg-amber-100 text-amber-700' : 
        'bg-red-100 text-red-700'
      }`}>
        {score}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Detail Hasil Supervisi</h2>
          <p className="text-slate-500">Melihat hasil evaluasi perencanaan pembelajaran.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Info Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white line-clamp-1">{supervision.judul}</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Guru</p>
                <p className="font-semibold text-slate-800">{teacher.name}</p>
                <p className="text-xs text-slate-500">NIP. {teacher.nip}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Tanggal Supervisi</p>
                <p className="font-semibold text-slate-800">
                  {new Date(supervision.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Mata Pelajaran</p>
                <p className="font-semibold text-slate-800">{supervision.mataPelajaran}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Jenjang / Kelas</p>
                <p className="font-semibold text-slate-800">{supervision.jenjang} / {supervision.kelas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aspects */}
        {INSTRUMENT_ASPECTS.map((category, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">{category.category}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {category.items.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex gap-2 text-sm text-slate-700">
                        <span className="font-bold">{item.id}.</span>
                        <p>{item.text}</p>
                      </div>
                      {!item.subItems && supervision.evaluations[item.id]?.comment && (
                        <div className="mt-2 ml-5 bg-blue-50/50 p-3 rounded-lg border border-blue-100 text-sm">
                          <p className="text-blue-800 font-medium mb-1">Komentar:</p>
                          <p className="text-slate-600">{supervision.evaluations[item.id].comment}</p>
                        </div>
                      )}
                    </div>
                    {!item.subItems && (
                      <div className="flex-shrink-0 pl-4">
                        {renderScore(supervision.evaluations[item.id]?.score)}
                      </div>
                    )}
                  </div>

                  {item.subItems && (
                    <div className="mt-4 pl-5 space-y-3">
                      {item.subItems.map(sub => (
                        <div key={sub.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex-1">
                            <p className="text-sm text-slate-700">{sub.text}</p>
                            {supervision.evaluations[sub.id]?.comment && (
                              <p className="text-xs text-slate-500 mt-1 italic">
                                "{supervision.evaluations[sub.id].comment}"
                              </p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            {renderScore(supervision.evaluations[sub.id]?.score)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Final Feedback */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg border-b border-slate-100 pb-2">Umpan Balik Keseluruhan</h3>
          
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
            <h4 className="font-semibold text-emerald-800 mb-2 text-sm uppercase tracking-wider">Kelebihan</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{supervision.kelebihan}</p>
          </div>
          
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
            <h4 className="font-semibold text-rose-800 mb-2 text-sm uppercase tracking-wider">Perlu Ditingkatkan</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{supervision.kekurangan}</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <h4 className="font-semibold text-indigo-800 mb-2 text-sm uppercase tracking-wider">Rekomendasi Tindak Lanjut</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{supervision.rekomendasi}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
