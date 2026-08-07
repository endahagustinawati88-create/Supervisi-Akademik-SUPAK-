import React, { useState, useEffect } from 'react';
import { SupervisionData, User, AspectEvaluation } from '../types';
import { INSTRUMENT_ASPECTS } from '../data';
import { ArrowLeft, Save } from 'lucide-react';
import { cn } from '../utils';

interface SupervisionFormProps {
  teacherId?: string;
  supervisionId?: string;
  supervisions: SupervisionData[];
  users: User[];
  onSave: (data: SupervisionData) => void;
  onCancel: () => void;
}

export default function SupervisionForm({ teacherId, supervisionId, supervisions, users, onSave, onCancel }: SupervisionFormProps) {
  const isEditing = !!supervisionId;
  const initialData = isEditing ? supervisions.find(s => s.id === supervisionId) : null;

  const [formData, setFormData] = useState<Partial<SupervisionData>>({
    teacherId: teacherId || '',
    date: new Date().toISOString().split('T')[0],
    jenjang: '',
    mataPelajaran: '',
    kelas: '',
    judul: '',
    evaluations: {},
    kelebihan: '',
    kekurangan: '',
    rekomendasi: '',
    status: 'draft',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Initialize evaluations
      const initialEvals: Record<string, AspectEvaluation> = {};
      INSTRUMENT_ASPECTS.forEach(category => {
        category.items.forEach(item => {
          if (item.subItems) {
            item.subItems.forEach(sub => {
              initialEvals[sub.id] = { score: null, comment: '' };
            });
          } else {
            initialEvals[item.id] = { score: null, comment: '' };
          }
        });
      });
      setFormData(prev => ({ ...prev, evaluations: initialEvals }));
    }
  }, [initialData]);

  const handleEvaluationChange = (id: string, field: 'score' | 'comment', value: any) => {
    setFormData(prev => ({
      ...prev,
      evaluations: {
        ...prev.evaluations,
        [id]: {
          ...prev.evaluations![id],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupervision: SupervisionData = {
      ...formData as SupervisionData,
      id: isEditing ? supervisionId : `sup-${Date.now()}`,
      status: 'completed',
    };
    onSave(newSupervision);
  };

  const renderRadioGroup = (id: string) => {
    const currentScore = formData.evaluations?.[id]?.score;
    return (
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => handleEvaluationChange(id, 'score', score)}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border",
              currentScore === score
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "bg-white border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
            )}
          >
            {score}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Supervisi' : 'Instrumen Supervisi Baru'}
          </h2>
          <p className="text-slate-500">Isi form penilaian perencanaan pembelajaran.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Guru yang disupervisi</label>
            <select
              required
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={!!teacherId && !isEditing}
            >
              <option value="">-- Pilih Guru --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} (NIP. {u.nip})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Jenjang</label>
            <input
              type="text"
              required
              placeholder="Misal: SMP"
              value={formData.jenjang}
              onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mata Pelajaran</label>
            <input
              type="text"
              required
              value={formData.mataPelajaran}
              onChange={(e) => setFormData({ ...formData, mataPelajaran: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kelas</label>
            <input
              type="text"
              required
              value={formData.kelas}
              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Judul Perencanaan Pembelajaran</label>
            <input
              type="text"
              required
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Legend */}
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-wrap gap-x-6 gap-y-2 text-sm text-indigo-800">
          <span className="font-semibold">Skala Penilaian:</span>
          <span>0 = Tidak Ada</span>
          <span>1 = Sangat Kurang</span>
          <span>2 = Kurang</span>
          <span>3 = Baik</span>
          <span>4 = Sangat Baik</span>
        </div>

        {/* Assessment Items */}
        {formData.evaluations && INSTRUMENT_ASPECTS.map((category, catIdx) => (
          <div key={catIdx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">{category.category}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {category.items.map((item, itemIdx) => (
                <div key={item.id} className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex gap-3">
                        <span className="font-bold text-slate-400 mt-0.5">{item.id}.</span>
                        <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
                      </div>
                      
                      {!item.subItems && (
                        <div className="mt-4 ml-6 lg:ml-8">
                          <input
                            type="text"
                            placeholder="Komentar Kritis (Opsional)"
                            value={formData.evaluations![item.id]?.comment || ''}
                            onChange={(e) => handleEvaluationChange(item.id, 'comment', e.target.value)}
                            className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      )}
                    </div>
                    
                    {!item.subItems && (
                      <div className="flex-shrink-0 flex justify-end">
                        {renderRadioGroup(item.id)}
                      </div>
                    )}
                  </div>

                  {item.subItems && (
                    <div className="mt-4 space-y-4 pl-6 lg:pl-8">
                      {item.subItems.map((sub) => (
                        <div key={sub.id} className="flex flex-col lg:flex-row gap-4 items-start lg:items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <div className="flex-1 w-full">
                            <p className="text-slate-700 text-sm mb-3">{sub.text}</p>
                            <input
                              type="text"
                              placeholder="Komentar Kritis"
                              value={formData.evaluations![sub.id]?.comment || ''}
                              onChange={(e) => handleEvaluationChange(sub.id, 'comment', e.target.value)}
                              className="w-full px-3 py-1.5 text-sm border border-slate-200 bg-white rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div className="flex-shrink-0">
                            {renderRadioGroup(sub.id)}
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
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">16. Kelebihan Perencanaan Pembelajaran</label>
            <textarea
              rows={3}
              required
              value={formData.kelebihan}
              onChange={(e) => setFormData({ ...formData, kelebihan: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Tuliskan kelebihan..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">17. Hal yang perlu ditingkatkan</label>
            <textarea
              rows={3}
              required
              value={formData.kekurangan}
              onChange={(e) => setFormData({ ...formData, kekurangan: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Tuliskan hal yang perlu ditingkatkan..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">18. Rekomendasi / Revisi</label>
            <textarea
              rows={3}
              required
              value={formData.rekomendasi}
              onChange={(e) => setFormData({ ...formData, rekomendasi: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Tuliskan rekomendasi tindak lanjut..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 sticky bottom-6 z-10 bg-white p-4 rounded-xl shadow-lg border border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            <Save className="w-5 h-5" />
            Simpan Hasil Supervisi
          </button>
        </div>
      </form>
    </div>
  );
}
