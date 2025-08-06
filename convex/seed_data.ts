// convex/seed_data.ts
// This data is adapted from your original `data.json` structure
export const data = {
  users: {
    admin: [{ name: "Admin Utama", role: "admin" }],
    guru: [
      {
        name: "Ani S.Pd.",
        role: "guru",
        subject: "Matematika",
        classes: ["10-A", "10-B"],
      },
    ],
    siswa: [
      {
        name: "Budi Santoso",
        role: "siswa",
        nis: "10234",
        class: "10-A",
        dob: "15 Mei 2008",
        address: "Jl. Merdeka No. 10",
        parentName: "Bapak Santoso",
        parentContact: "081234567890",
        parentEmail: "santoso@example.com",
      },
      {
        name: "Citra Lestari",
        role: "siswa",
        nis: "10235",
        class: "10-A",
        parentEmail: "lestari.p@example.com",
      },
      {
        name: "Dewi Anggraini",
        role: "siswa",
        nis: "10241",
        class: "10-B",
        parentEmail: "anggraini.p@example.com",
      },
    ],
  },
  classes: [
    { name: "10-A", homeroomTeacher: "Ani S.Pd." },
    { name: "10-B", homeroomTeacher: "Rahmat Hidayat, S.Kom" },
  ],
  tasks: [
    {
      title: "Latihan Aljabar",
      subject: "Matematika",
      class: "10-A",
      dueDate: "2024-10-25",
      status: "Aktif",
    },
    {
      title: "Analisis Puisi",
      subject: "Bahasa Indonesia",
      class: "10-A",
      dueDate: "2024-10-22",
      status: "Selesai",
    },
  ],
  submissions: [{ status: "Selesai", score: 90 }],
  grades: [
    {
      studentName: "Budi Santoso",
      class: "10-A",
      subject: "Matematika",
      type: "Tugas",
      assignmentName: "Latihan Aljabar",
      score: 90,
      date: "2024-10-20",
    },
    {
      studentName: "Budi Santoso",
      class: "10-A",
      subject: "Fisika",
      type: "Ujian Harian",
      assignmentName: "Bab 1: Kinematika",
      score: 85,
      date: "2024-10-18",
    },
    {
      studentName: "Citra Lestari",
      class: "10-A",
      subject: "Matematika",
      type: "Tugas",
      assignmentName: "Latihan Aljabar",
      score: 95,
      date: "2024-10-20",
    },
  ],
  forumPosts: [
    {
      content:
        "Selamat pagi, jangan lupa kerjakan tugas aljabar ya. Batas waktu minggu depan!",
      createdAt: Date.now(),
    },
  ],
  systemActivities: [
    {
      time: "10 menit lalu",
      user: "Guru: Ani S.Pd.",
      action: "Membuat Tugas",
      detail: 'Matematika - "Latihan Aljabar"',
    },
    {
      time: "1 jam lalu",
      user: "Siswa: Budi Santoso",
      action: "Mengumpulkan Tugas",
      detail: 'Bahasa Indonesia - "Analisis Puisi"',
    },
  ],
} as const; // <--- The crucial addition is here!
