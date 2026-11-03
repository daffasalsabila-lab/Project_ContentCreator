
# Content Creator

**Content Creator** adalah aplikasi berbasis web yang dirancang untuk membantu content creator mengelola ide, merencanakan, memantau, dan mengatur proses produksi konten hingga publikasi ke berbagai platform media sosial.

Aplikasi ini dikembangkan sebagai proyek pembelajaran dengan menggunakan pendekatan **Opsi 3 – Decoupled REST API + SPA**, yaitu memisahkan frontend dan backend melalui komunikasi REST API.

## 📌 Tentang Proyek

Proyek ini bertujuan untuk mempermudah content creator dalam mengelola alur produksi konten agar lebih terstruktur, mulai dari pengumpulan ide hingga konten dipublikasikan.

Pengguna dapat mengelola konten, memantau tahapan produksi, mengatur channel media sosial, serta melihat data analitik performa konten.

## 🛠️ Teknologi yang Digunakan

Proyek ini menggunakan Tech Stack Opsi 3:

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Router DOM
- Lucide React

### Backend
- Node.js
- Express.js
- REST API

### Database
- PostgreSQL

## ✨ Fitur Aplikasi

Berikut merupakan fitur utama yang dikembangkan dalam aplikasi Content Creator:

### 1. Autentikasi
- Registrasi akun pengguna.
- Login pengguna.
- Integrasi autentikasi dengan REST API.

### 2. Dashboard
- Menampilkan ringkasan informasi konten.
- Menampilkan gambaran aktivitas pengelolaan konten.

### 3. Alur Konten
- Mengelola tahapan produksi konten.
- Memantau status konten.
- Mengatur rencana produksi konten.
- Menggunakan checklist untuk membantu memantau tugas produksi.

### 4. Manajemen Saluran
- Menampilkan daftar channel media sosial.
- Mengelola platform media sosial yang digunakan.
- Mendukung platform YouTube, TikTok, Instagram, dan LinkedIn.

### 5. Analitik
- Menampilkan informasi performa konten.
- Memantau jumlah views, likes, comments, dan shares.
- Menampilkan ringkasan perkembangan performa konten.

## 🔄 Alur Produksi Konten

Aplikasi mengikuti tahapan Content Lifecycle Flow:

1. **Idea** – Mengumpulkan ide konten.
2. **Scripting** – Menyiapkan konsep dan naskah konten.
3. **Recording** – Melakukan proses perekaman.
4. **Editing** – Melakukan penyuntingan konten.
5. **Ready** – Konten selesai dan siap dipublikasikan.
6. **Published** – Konten telah dipublikasikan ke platform tujuan.

## 📂 Struktur Frontend

Struktur folder utama frontend:

```text
Frontend-cc/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── lib/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MainLayout.jsx
│   │   ├── Dasbor.jsx
│   │   ├── Alur_konten.jsx
│   │   ├── Saluran.jsx
│   │   ├── Analitik.jsx
│   │   └── Samping.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Instalasi dan Menjalankan Project

### 1. Clone Repository

```bash
git clone -b frontend-cc https://github.com/daffasalsabila-lab/Project_ContentCreator.git
```

### 2. Masuk ke Folder Frontend

Masuk ke direktori frontend yang berisi file `package.json`.

```bash
cd Frontend-cc
```

### 3. Install Dependencies

Jalankan perintah:

```bash
npm install
```

### 4. Menjalankan Development Server

Jalankan perintah:

```bash
npm run dev
```

Setelah berhasil, buka alamat berikut pada browser:

```text
http://localhost:5173
```

## 🔗 Integrasi Backend

Frontend berkomunikasi dengan backend melalui REST API.

Backend menggunakan Express.js dan PostgreSQL sebagai database.

Base URL API (pengembangan lokal):

```text
http://localhost:3000/api/v1
```

Beberapa endpoint yang digunakan berdasarkan spesifikasi proyek:

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | /auth/register | Registrasi pengguna |
| POST | /auth/login | Login pengguna |
| GET | /channels | Mengambil daftar channel |
| POST | /channels | Menambahkan channel |
| GET | /contents | Mengambil daftar konten |
| POST | /contents | Membuat konten |
| GET | /contents/:id | Detail konten |
| PATCH | /contents/:id | Memperbarui konten |
| GET | /checklists | Mengambil checklist |
| PATCH | /checklists/:id/toggle | Mengubah status checklist |

## 👩‍💻 Pembagian Pengembangan

Pengembangan proyek menggunakan pemisahan frontend dan backend.

**Frontend Developer**
- Mengembangkan tampilan antarmuka aplikasi.
- Membuat halaman dan komponen menggunakan React.js.
- Mengatur navigasi menggunakan React Router DOM.
- Mengimplementasikan styling menggunakan Tailwind CSS.
- Menghubungkan frontend dengan backend melalui REST API.

**Backend Developer**
- Mengembangkan REST API menggunakan Express.js.
- Mengelola database PostgreSQL.
- Mengimplementasikan autentikasi dan validasi data.
- Mengelola proses CRUD konten, channel, checklist, dan metrik.

## 📌 Status Pengembangan

Proyek ini dikembangkan secara bertahap. Beberapa bagian antarmuka telah dibuat dan integrasi dengan backend terus dikembangkan.

## 📄 Lisensi

Proyek ini dibuat untuk keperluan pembelajaran dan pengembangan tugas proyek Junior Programmer.
