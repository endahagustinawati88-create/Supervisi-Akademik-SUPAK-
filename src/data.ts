import { SupervisionData, User, InstrumentCategory } from './types';

export const DUMMY_USERS: User[] = [
  { id: '1', name: 'Admin Supervisi', role: 'admin', username: 'admin', password: '1' },
  { id: '2', name: 'Kepala Sekolah', nip: '12345678', role: 'kepala_sekolah', username: '12345678', password: '12345' },
];

export const INSTRUMENT_ASPECTS: InstrumentCategory[] = [
  {
    id: 'cat-1',
    category: 'Keselarasan',
    items: [
      { id: '1', text: 'Tujuan pembelajaran, langkah pembelajaran, dan asesmen pembelajaran sudah mengarah pada pencapaian Dimensi Profil Lulusan' },
      { id: '2', text: 'Tujuan pembelajaran, langkah pembelajaran, dan asesmen pembelajaran sudah selaras' },
    ],
  },
  {
    id: 'cat-2',
    category: 'Kerangka Pembelajaran',
    items: [
      { id: '3', text: 'Praktik pedagogis yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '4', text: 'Lingkungan belajar yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '5', text: 'Kemitraan pembelajaran yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
      { id: '6', text: 'Pemanfaatan digital yang dituliskan sudah tergambar pada langkah pembelajaran dan/atau asesmen pembelajaran' },
    ],
  },
  {
    id: 'cat-3',
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
    id: 'cat-4',
    category: 'Asesmen',
    items: [
      { id: '13', text: 'Asesmen pada awal pembelajaran telah dilaksanakan untuk mendapatkan bukti kesiapan belajar secara emosional dan mental, pengetahuan awal, dan kebutuhan belajar murid' },
      { id: '14', text: 'Asesmen selama Proses Pembelajaran telah dilaksanakan sesuai perencanaan untuk memantau perkembangan belajar murid, memberikan umpan balik untuk perbaikan kontinyu (baik dari guru ke murid, maupun dari murid ke guru), melalui beragam teknik' },
      { id: '15', text: 'Asesmen hasil Pembelajaran direncanakan untuk mengukur pencapaian kompetensi sebagai bukti keberhasilan pembelajaran dengan beragam cara, antara lain: tes, portofolio, proyek, presentasi, dsb.' },
    ],
  },
];

export const INITIAL_SUPERVISIONS: SupervisionData[] = [];
