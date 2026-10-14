# Panduan Website Ulang Tahun Romantis

## Isi folder

| Berkas | Fungsi |
|---|---|
| `index.html` | Kerangka halaman (tidak perlu diubah) |
| `style.css` | Warna, font, dan tampilan |
| `script.js` | Animasi, musik, amplop (tidak perlu diubah) |
| `config.js` | **Nama, surat, timeline, foto, nomor WhatsApp. Edit di sini.** |
| `foto/` | Foto kenangan |
| `musik/` | Lagu latar |

## Cara mencoba di komputer

Klik dua kali `index.html`. Halaman terbuka di browser. Setiap selesai mengedit, simpan berkas lalu refresh browser.
Untuk mengedit, pakai aplikasi teks seperti VS Code atau Notepad++. Hindari Word.

## Mengganti foto

1. Siapkan foto, ubah ukurannya sekitar 1200 piksel dan simpan sebagai `.jpg` di bawah 500 KB.
2. Beri nama `kenangan-1.jpg`, `kenangan-2.jpg`, dan seterusnya.
3. Masukkan ke folder `foto/`. Kalau nama sama dengan yang di `config.js`, foto langsung muncul.
4. Mau pakai nama lain? Ubah baris `foto: '...'` di `config.js` agar sama persis dengan nama berkasnya.
5. Refresh halaman. Foto yang berkasnya tidak ditemukan tampil sebagai bingkai kosong.

## Mengubah timeline

Buka `config.js`, cari bagian `kenangan`. Satu blok `{ ... }` adalah satu momen.

**Mengubah isi:** ganti teks di dalam tanda kutip pada `tanggal`, `judul`, `cerita`, dan `foto`.
Tanggal selalu berformat `'TAHUN-BULAN-TANGGAL'`, contoh `'2024-05-09'`.

**Menambah momen:** salin satu blok lengkap, dari `{` sampai `}`, tempel di bawah blok terakhir, lalu beri koma di antara keduanya.

```js
    {
      tanggal: '2024-12-20',
      judul: 'Liburan Bersama',
      cerita: 'Perjalanan pertama kita berdua.',
      foto: 'foto/kenangan-4.jpg'
    },
    {
      tanggal: '2025-06-01',
      judul: 'Judul Baru',
      cerita: 'Cerita baru kita.',
      foto: 'foto/kenangan-5.jpg'
    }
```

**Menghapus momen:** hapus satu blok lengkap beserta komanya.

Aturan penting:
- Blok terakhir tidak boleh diikuti koma.
- Tanda petik di dalam cerita, misalnya `kita'`, bisa merusak halaman. Tulis tanpa tanda petik, atau pakai tanda petik ganda `"..."` untuk seluruh teks itu.
- Susun dari momen paling lama ke paling baru.

## Mengganti teks lain

Semuanya ada di `config.js`:
- `nama` dan `pengirim`: nama di halaman depan dan di akhir surat
- `mulaiBersama`: tanggal jadian untuk penghitung hari
- `surat`: setiap baris dalam tanda kutip adalah satu paragraf
- `waNumber`: nomor WhatsApp tujuan, format `'6281234567890'`

## Mengganti musik

Taruh lagu di `musik/lagu.mp3`. Browser baru memutar musik setelah tombol "Buka Kejutan" ditekan, jadi itu normal.

## Mengganti warna

Buka `style.css`. Warna ada di bagian paling atas, di blok `:root { ... }`. Ubah kode warna seperti `#e7a1b3` untuk merah muda, `#b9717c` untuk emas mawar. Blok di bawahnya (`prefers-color-scheme: dark`) adalah warna untuk mode gelap.

## Memasang ke internet (gratis)

**Netlify (paling mudah):**
1. Buka app.netlify.com/drop.
2. Seret seluruh folder `ulang-tahun` ke halaman itu.
3. Salin tautan yang muncul dan kirim ke pasanganmu.

**GitHub Pages:** unggah semua berkas ke repositori GitHub, lalu aktifkan Pages di Settings.
**Vercel:** impor repositori atau unggah folder lewat dashboard.

Setiap kali mengubah `config.js` atau foto, unggah ulang folder yang sama.

## Jika ada yang bermasalah

- **Halaman kosong atau tombol tidak jalan:** ada tanda kutip atau koma yang hilang di `config.js`. Buka Console browser (tekan F12) untuk melihat baris yang salah.
- **Foto tidak muncul:** periksa nama berkas dan huruf besar kecilnya.
- **Musik tidak bunyi:** pastikan `musik/lagu.mp3` ada, dan ponsel tidak dalam mode senyap.
