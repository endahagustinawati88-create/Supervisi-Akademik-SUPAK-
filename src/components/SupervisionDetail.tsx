import { useMemo, useState } from 'react';
import { SupervisionData, User, InstrumentCategory } from '../types';
import { ArrowLeft, User as UserIcon, BookOpen, MapPin, Calendar, Layout, Printer } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface SupervisionDetailProps {
  supervision: SupervisionData;
  teacher: User;
  instruments: InstrumentCategory[];
  onBack: () => void;
}

export default function SupervisionDetail({ supervision, teacher, instruments, onBack }: SupervisionDetailProps) {
  
  const renderScore = (score: number | null) => {
    if (score === null) return <span className="text-slate-400">-</span>;
    return (
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
        score >= 3 ? 'bg-green-100 text-green-700 print:border print:border-green-300' : 
        score === 2 ? 'bg-amber-100 text-amber-700 print:border print:border-amber-300' : 
        'bg-red-100 text-red-700 print:border print:border-red-300'
      }`}>
        {score}
      </span>
    );
  };

  const [showPrintWarning, setShowPrintWarning] = useState(false);

  const radarData = useMemo(() => {
    return instruments.map(category => {
      let totalScore = 0;
      let count = 0;
      
      category.items.forEach(item => {
        if (!item.subItems) {
          const score = supervision.evaluations[item.id]?.score;
          if (score !== null && score !== undefined) {
            totalScore += score;
            count++;
          }
        } else {
          item.subItems.forEach(sub => {
            const score = supervision.evaluations[sub.id]?.score;
            if (score !== null && score !== undefined) {
              totalScore += score;
              count++;
            }
          });
        }
      });

      return {
        subject: category.category,
        A: count > 0 ? Number((totalScore / count).toFixed(2)) : 0,
        fullMark: 4,
      };
    });
  }, [supervision, instruments]);

  return (
    <div className="max-w-4xl mx-auto pb-12 print:pb-0 print:max-w-none">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-4">
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
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => {
              if (window.self !== window.top) {
                setShowPrintWarning(true);
                setTimeout(() => window.print(), 500);
              } else {
                window.print();
              }
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
          >
            <Printer className="w-5 h-5" />
            Cetak Hasil
          </button>
          {showPrintWarning && (
            <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-2 rounded max-w-xs text-right">
              Fitur cetak mungkin tidak berfungsi di mode pratinjau. Silakan buka aplikasi di tab baru (klik ikon di pojok kanan atas) untuk mencetak.
            </div>
          )}
        </div>
      </div>

      <div className="hidden print:block mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 uppercase">Laporan Hasil Supervisi Akademik</h1>
        <p className="text-slate-600">Perencanaan Pembelajaran Mendalam</p>
      </div>

      <div className="space-y-6">
        {/* Info Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden print:shadow-none print:border-slate-300">
          <div className="bg-indigo-600 px-6 py-4 print:bg-slate-100 print:text-slate-900 print:border-b print:border-slate-300">
            <h3 className="text-xl font-bold text-white line-clamp-1 print:text-slate-900">{supervision.judul}</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 print:border print:border-slate-300">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Guru</p>
                <p className="font-semibold text-slate-800">{teacher.name}</p>
                <p className="text-xs text-slate-500">NIP. {teacher.nip}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 print:border print:border-slate-300">
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
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 print:border print:border-slate-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Mata Pelajaran</p>
                <p className="font-semibold text-slate-800">{supervision.mataPelajaran}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 print:border print:border-slate-300">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Jenjang / Kelas</p>
                <p className="font-semibold text-slate-800">{supervision.jenjang} / {supervision.kelas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 print:shadow-none print:border-slate-300 print:break-inside-avoid">
          <h3 className="font-bold text-slate-800 mb-4 text-center">Profil Penilaian Supervisi</h3>
          <div className="h-[300px] w-full max-w-lg mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 4]} />
                <Radar name="Skor" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aspects */}
        {instruments.map((category, idx) => (
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
