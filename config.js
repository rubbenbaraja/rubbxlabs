/* ============================================================
   config.js  -  SATU-SATUNYA BERKAS YANG PERLU KAMU EDIT
   Ganti teks di dalam tanda kutip '...' lalu simpan.
   Jangan hapus tanda kutip, koma, kurung kurawal { }, atau kurung siku [ ].
   ============================================================ */

var CONFIG = {

  // 1. NAMA
  nama: 'Amelia Syafitri',        // nama pasangan, tampil besar di halaman depan
  pengirim: 'rubben',       // nama kamu, tampil di akhir surat

  // 2. HARI JADIAN (penghitung "sekian hari bersama")
  // Format: 'TAHUN-BULAN-TANGGAL'. Kosongkan ('') kalau tidak ingin ditampilkan.
  mulaiBersama: '2025-01-04',

  // 3. WHATSAPP (tombol "Kirim lewat WhatsApp")
  // Pakai kode negara tanpa +, 0, atau spasi. Contoh 0812-3456-7890 menjadi '6281234567890'.
  // Kosongkan ('') kalau ingin pengirim memilih kontak sendiri.
  waNumber: '6289666196816',

  // 4. MUSIK
  // Taruh lagu di folder musik/ dengan nama lagu.mp3, atau ganti nama berkas di bawah.
  // Kalau berkasnya tidak ada, halaman memakai musik kotak musik bawaan.
  audioSrc: 'musik/lagu.mp3',

  // 5. ISI SURAT
  // Setiap baris dalam tanda kutip adalah satu paragraf. Pisahkan paragraf dengan koma.
  surat: [
    'Selamat ulang tahun ya, sayang! ❤️',
    'Jujur, hari ini ak ga cuma mau bilang selamat ulang tahun, tapi juga mau bilang seberapa bangganya ak punya kamu. Ngeliat perjuangan, proses, dan semua hal hebat yang udah kamu lewatin sampe detik ini tuh bikin ak bener-bener kagum. Kamu selalu bisa berdiri tegak dan tumbuh jadi pribadi yang makin keren setiap harinya.',
    'Makasih ya udah terus berjuang dan gaperna menyerah. Semoga di usia yang baru ini, semua cita-cita kamu makin dekat, langkah kamu makin dipermudah, dan kamu selalu dikelilingi kebahagiaan.',
    'Tetap jadi diri kamu yang luar biasa ya. Aku bakal selalu ada di sini buat dukung dan nemenin setiap langkah kamu. I’m so proud of you, always! ❤️.'
  ],

  // 6. TIMELINE + FOTO
  // Satu kenangan = satu blok { ... }. Urutannya tampil dari atas ke bawah,
  // jadi susun dari yang paling lama.
  //
  // tanggal : 'TAHUN-BULAN-TANGGAL'
  // judul   : judul singkat
  // cerita  : cerita pendek, 1 sampai 2 kalimat
  // foto    : lokasi foto di folder foto/. Kalau foto tidak ada, tampil bingkai kosong.
  //
  // MENAMBAH kenangan : salin satu blok lengkap { ... }, tempel di bawahnya, beri koma di antara blok.
  // MENGHAPUS kenangan: hapus satu blok lengkap { ... } beserta komanya.
  // Blok TERAKHIR tidak boleh diikuti koma.
  kenangan: [
    {
      tanggal: '2024-10-15',
      judul: 'When We First Met',
      cerita: 'Hari yang ak pikir biasa aja ternyata jadi awal cerita kita. Aku tanpa ragu DM Kamu tepat pada hari ini di umur kamu yang masih 19 tahun :b.',
      foto: 'foto/kenangan-1.jpg'
    },
    {
      tanggal: '2024-11-20',
      judul: 'First Time Talking',
      cerita: 'Kita yang niatnya nugas malah ngobrol berjam-jam sampe lupa waktu. Aku pulang dengan perasaan yang sulit dijelaskan:b',
      foto: 'foto/kenangan-2.jpg'
    },
    {
      tanggal: '2025-01-04',
      judul: 'Our Special Day',
      cerita: 'Akhirnya Kamu bisa memiliki Aku setelah penantian Kamu selama 3 Bulan HAHAHA. Terima kasih ya sayangg walapon Aku tau Kamu gasuka cara Aku ngomong HAHA.',
      foto: 'foto/kenangan-3.jpg'
    },
    {
      tanggal: 'To date, the project is running smoothly.',
      judul: 'Our story, forever.',
      cerita: 'Perjalanan kita berdua. Senang, Susah, Capek bahkan sampe sempat tersesat juga pernah, tapi kita bisa lewatin itu semua dan justru hal - hal itu yang buat kita semakin dekat, SEDIH HUUHU.',
      foto: 'foto/kenangan-4.jpg'
    }
  ]
};
