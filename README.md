
# 🌱 Re-Enviro

**Re-Enviro** adalah platform aksi lingkungan yang menghubungkan individu, komunitas, dan organisasi untuk menciptakan dampak positif bagi lingkungan Indonesia. Melalui dua program utama, **EcoAct** dan **Dana Hijau**, pengguna dapat berpartisipasi dalam kegiatan relawan serta mendukung proyek lingkungan melalui pendanaan.

---

## 🔗 Branch Utama

Branch final dari proyek ini berada di: `fix-kumpul`

---

## 🚀 Fitur Utama

- **EcoAct**: Daftar dan ikuti kegiatan relawan (penanaman pohon, bersih pantai, edukasi, dll).
- **Dana Hijau**: Jelajahi, donasi, dan ajukan proyek lingkungan dengan sistem pendanaan transparan.
- **Track History**: Pantau kontribusi Anda—baik relawan maupun donasi.
- **Autentikasi**: Login pengguna menggunakan Supabase Auth.
- **Dashboard Statistik**: Tampilkan statistik kontribusi dan progres pendaftaran kegiatan.

---

## 🛠️ Teknologi & Library yang Digunakan

### Frontend
- **React.js**: Library utama untuk membangun antarmuka pengguna.
- **React Router DOM**: Navigasi antar halaman.
- **Tailwind CSS**: Framework utility-first CSS untuk styling responsif dan cepat.
- **Framer Motion**: Library animasi untuk transisi UI yang halus.
- **React Icons (Feather Icons)**: Untuk ikon-ikon seperti kalender, lokasi, grafik, dll.

### Backend & Database
- **Supabase**:
  - Supabase Auth untuk autentikasi pengguna.
  - Supabase Database (PostgreSQL) sebagai penyimpanan data proyek, kegiatan, donasi, user, dll.

---

## 🖥️ Struktur Direktori

```

src/
├── components/         # Komponen reusable (Hero, Stats, Testimonials, dll)
├── pages/              # Halaman utama seperti HomePage, DanaHijauPage, EventDetailPage
├── services/
│   └── supabaseClient.js  # Konfigurasi koneksi Supabase
├── assets/             # Gambar atau aset statis (jika ada)
├── App.jsx
├── index.jsx

````

---

## 📸 Cuplikan Fitur

### 1. Halaman Beranda
- Hero, statistik dampak, program unggulan, testimoni, dan FAQ.
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20044703.png)


### 2. Dana Hijau
- Sistem crowdfunding untuk proyek lingkungan.
- Filter & pencarian berdasarkan kategori, lokasi, dan status pendanaan.
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20044619.png)


### 3. EcoAct
- Detail kegiatan relawan.
- Sistem pendaftaran kegiatan dengan kuota dan status pendanaan.
- ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20044414.png)


### 4. Track History
- Tab riwayat donasi & aktivitas relawan pengguna.
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20050243.png)


### 5. About
- Company profile, visi & Mitra
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20050259.png)


### 6. Login & Signup
- Bisa pakai google
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20050338.png)
- - ![Preview Dana Hijau](https://github.com/Ascend-2-0/Renviro-13/blob/fix-kumpul/public/Screenshot%202025-05-24%20050350.png)



---

## 🔧 Cara Menjalankan Proyek

### 1. Clone Repository
```bash
git clone https://github.com/username/re-enviro.git
cd re-enviro
git checkout fix-kumpul
````

### 2. Instalasi Dependensi

```bash
npm install
```

### 3. Konfigurasi Supabase

Buat file `.env` di root folder dan isi dengan konfigurasi Supabase Anda:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Menjalankan Project

```bash
npm run dev
```

---

## 🤝 Kontribusi

Kami terbuka untuk kontribusi baik dari sisi desain, pengembangan, maupun dokumentasi.

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi [MIT](LICENSE).

---

## ✨ Kontributor

* [Product Manager] [Nabil]
* [Product Design]  [Fikri]
* [FullStack Dev]   [Faidz]


