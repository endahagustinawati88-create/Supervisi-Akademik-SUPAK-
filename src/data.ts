import { SupervisionData, User } from './types';

export const DUMMY_USERS: User[] = [
  { id: '1', name: 'Admin Supervisi', role: 'admin' },
  { id: '2', name: 'Budi Santoso, S.Pd', nip: '123', role: 'guru' },
  { id: '3', name: 'Siti Aminah, M.Pd', nip: '456', role: 'guru' },
];

export const INSTRUMENT_ASPECTS = [
  {
    category: 'Keselarasan',
    items: [
      { id: '1', text: 'Tujuan pembelajaran, langkah pembelajaran, dan asesmen pembelajaran sudah mengarah pada pencapaian Dimensi Profil Lulusan' },
      { id: '2', text: 'Tujuan pembelajaran, langkah pembelajaran, dan asesmen pembelajaran sudah selaras' },
    ],
  },
  {
    category: 'Kerangka Pembelajaran',
    items: [
      { id: '3', text: 'Praktik pedagogis yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '4', text: 'Lingkungan belajar yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '5', text: 'Kemitraan pembelajaran yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '6', text: 'Pemanfaatan digital yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
    ],
  },
  {
    category: 'Langkah Pembelajaran',
    items: [
      { id: '7', text: 'Langkah pembelajaran dapat memfasilitasi murid untuk merasakan pengalaman belajar MEMAHAMI (terlibat aktif mengonstruksi pengetahuan agar dapat memahami secara mendalam konsep atau materi dari berbagai sumber dan konteks).', subItems: [
        { id: '7a', text: 'a. Menghubungkan pengetahuan baru dengan pengetahuan sebelumnya' },
        { id: '7b', text: 'b. Menstimulasi proses berpikir murid' },
        { id: '7c', text: 'c. Menghubungkan dengan konteks nyata dan/atau kehidupan sehari-hari' },
        { id: '7d', text: 'd. Memberikan kebebasan eksploratif dan kolaboratif' },
        { id: '7e', text: 'e. Menanamkan nilai-nilai moral dan etika dan nilai positif lainnya' },
        { id: '7f', text: 'f. Mengaitkan pembelajaran dengan pembentukan karakter murid' },
      ]},
      { id: '8', text: 'Langkah pembelajaran dapat memfasilitasi murid untuk merasakan pengalaman belajar MENGAPLIKASI (mengaplikasi pemahaman secara kontekstual dalam kehidupan nyata sebagai bagian dari pendalaman pengetahuan).', subItems: [
        { id: '8a', text: 'a. Menghubungkan konsep baru dengan pengetahuan sebelumnya.' },
        { id: '8b', text: 'b. Menerapkan pengetahuan ke dalam situasi nyata atau bidang lain.' },
        { id: '8c', text: 'c. Mengembangkan pemahaman dengan eksplorasi lebih lanjut.' },
        { id: '8d', text: 'd. Berpikir Kritis dan mencari solusi inovatif berdasarkan pengetahuan yang ada.' },
      ]},
      { id: '9', text: 'Langkah pembelajaran dapat memfasilitasi murid untuk merasakan pengalaman belajar MEREFLEKSI (mengevaluasi dan memaknai proses serta hasil dari tindakan atau praktik nyata yang telah mereka lakukan dan menentukan tindaklanjut ke depan; serta mengelola proses belajarnya secara mandiri).', subItems: [
        { id: '9a', text: 'a. Memotivasi diri sendiri untuk terus belajar bagaimana cara belajar' },
        { id: '9b', text: 'b. Refleksi terhadap pencapaian tujuan pembelajaran (evaluasi diri)' },
        { id: '9c', text: 'c. Menerapkan strategi berpikir' },
        { id: '9d', text: 'd. Memiliki kemampuan metakognisi (meregulasi diri dalam pembelajaran)' },
        { id: '9e', text: 'e. Meregulasi emosi dalam pembelajaran' },
      ]},
      { id: '10', text: 'Langkah perencanaan pembelajaran dapat memfasilitasi tindakan saling MEMULIAKAN antara Guru-Murid, Murid-Guru, Murid-Murid yang tercermin dalam bahasa verbal dan nonverbal' },
      { id: '11', text: 'Prinsip pembelajaran mendalam berupa berkesadaran, bermakna, dan/atau menggembirakan sudah tergambar pada setiap pengalaman belajar di langkah pembelajaran' },
      { id: '12', text: 'Perencanaan pembelajaran sudah mengakomodir pengalaman belajar yang sesuai dengan karakteristik peserta didik' },
    ],
  },
  {
    category: 'Asesmen',
    items: [
      { id: '13', text: 'Asesmen pada awal pembelajaran telah dilaksanakan untuk mendapatkan bukti kesiapan belajar secara emosional dan mental, pengetahuan awal, dan kebutuhan belajar murid' },
      { id: '14', text: 'Asesmen selama Proses Pembelajaran telah dilaksanakan sesuai perencanaan untuk memantau perkembangan belajar murid, memberikan umpan balik untuk perbaikan kontinyu (baik dari guru ke murid, maupun dari murid ke guru), melalui beragam teknik' },
      { id: '15', text: 'Asesmen hasil Pembelajaran direncanakan untuk mengukur pencapaian kompetensi sebagai bukti keberhasilan pembelajaran dengan beragam cara, antara lain: tes, portofolio, proyek, presentasi, dsb.' },
    ],
  },
];

export const INITIAL_SUPERVISIONS: SupervisionData[] = [
  {
    id: 'sup-1',
    teacherId: '2',
    date: '2023-10-15',
    jenjang: 'SMP',
    mataPelajaran: 'Matematika',
    kelas: 'VII A',
    judul: 'Operasi Bilangan Bulat',
    evaluations: {
      '1': { score: 3, comment: 'Sudah baik' },
      '2': { score: 4, comment: 'Sangat selaras' },
      '3': { score: 3, comment: '' },
      '4': { score: 3, comment: '' },
      '5': { score: 2, comment: 'Perlu ditingkatkan kemitraannya' },
      '6': { score: 4, comment: 'Pemanfaatan aplikasi Quizizz sangat menarik' },
      '7a': { score: 3, comment: '' },
      '7b': { score: 3, comment: '' },
      '7c': { score: 4, comment: '' },
      '7d': { score: 3, comment: '' },
      '7e': { score: 3, comment: '' },
      '7f': { score: 3, comment: '' },
      '8a': { score: 3, comment: '' },
      '8b': { score: 2, comment: 'Kurang kontekstual' },
      '8c': { score: 3, comment: '' },
      '8d': { score: 3, comment: '' },
      '9a': { score: 3, comment: '' },
      '9b': { score: 3, comment: '' },
      '9c': { score: 3, comment: '' },
      '9d': { score: 3, comment: '' },
      '9e': { score: 3, comment: '' },
      '10': { score: 4, comment: '' },
      '11': { score: 3, comment: '' },
      '12': { score: 3, comment: '' },
      '13': { score: 3, comment: '' },
      '14': { score: 3, comment: '' },
      '15': { score: 4, comment: 'Asesmen komprehensif' },
    },
    kelebihan: 'Penggunaan media digital sangat interaktif',
    kekurangan: 'Penerapan pada situasi nyata belum maksimal',
    rekomendasi: 'Tambahkan studi kasus kehidupan sehari-hari',
    status: 'completed',
  },
];
