export type Role = 'admin' | 'guru' | 'kepala_sekolah' | 'pengawas';

export interface User {
  id: string;
  name: string;
  nip?: string;
  role: Role;
  username?: string;
  password?: string;
}

export interface AspectEvaluation {
  score: number | null; // 0-4
  comment: string;
}

export interface InstrumentSubItem {
  id: string;
  text: string;
}

export interface InstrumentItem {
  id: string;
  text: string;
  subItems?: InstrumentSubItem[];
}

export interface InstrumentCategory {
  id: string;
  category: string;
  items: InstrumentItem[];
}

export interface SupervisionData {
  id: string;
  teacherId: string;
  date: string;
  jenjang: string;
  mataPelajaran: string;
  kelas: string;
  judul: string;
  evaluations: Record<string, AspectEvaluation>;
  kelebihan: string;
  kekurangan: string;
  rekomendasi: string;
  status: 'draft' | 'completed';
}
