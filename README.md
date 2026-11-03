# Content Creator Pipeline – Backend

**Content Creator Pipeline** adalah aplikasi berbasis web yang dirancang untuk membantu mengelola alur kerja pembuatan konten digital, mulai dari pengelolaan channel, perencanaan konten, checklist persiapan, hingga pemantauan performa konten.

Repository ini merupakan bagian **Backend** dari project Content Creator Pipeline yang dikembangkan menggunakan Node.js, Express.js, dan MySQL.

## 👥 Tim Pengembang

Project ini dikembangkan secara kolaboratif oleh:

| Nama | Peran |
|---|---|
| **Daffa Salsabila** | Frontend Developer |
| **Aira Wibia Sastri** | Backend Developer |

## 🚀 Teknologi yang Digunakan

Teknologi dan tools yang digunakan dalam pengembangan backend:

- **Node.js** – Runtime environment JavaScript.
- **Express.js** – Framework untuk membangun REST API.
- **MySQL** – Database relasional untuk menyimpan data aplikasi.
- **mysql2** – Library untuk koneksi dan interaksi dengan MySQL.
- **JWT (JSON Web Token)** – Sistem autentikasi pengguna.
- **bcrypt** – Untuk hashing password.
- **dotenv** – Mengelola environment variables.
- **Nodemon** – Membantu proses development server.

## 📁 Struktur Folder

```text
be_pipeline/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── AuthController.js
│   ├── channelController.js
│   ├── checklistController.js
│   ├── contentController.js
│   └── metricController.js
│
├── middlewares/
│   └── middlewares.js
│
├── routes/
│   ├── authRoutes.js
│   ├── channelRoutes.js
│   ├── checklistRoutes.js
│   ├── contentRoutes.js
│   └── metricRoutes.js
│
├── validations/
│   └── createContentValidation.js
│
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Instalasi dan Konfigurasi

Ikuti langkah-langkah berikut untuk menjalankan backend secara lokal.

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Masuk ke Direktori Project

```bash
cd be_pipeline
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Konfigurasi Environment Variables

Buat file `.env` di direktori utama project.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key
```

Sesuaikan nama variabel dengan konfigurasi yang digunakan di `config/db.js`.

### 5. Jalankan Server

Untuk menjalankan server dalam mode development:

```bash
npx nodemon server.js
```

Atau menggunakan Node.js:

```bash
node server.js
```

Jika berhasil, server dapat diakses melalui:

```text
http://localhost:3000
```

## 🔗 API Endpoint

Base URL:

```text
http://localhost:3000/api/v1
```

### 1. Authentication

Endpoint:

```text
/api/v1/auth
```

Digunakan untuk mengelola autentikasi pengguna.

Fitur:
- Registrasi pengguna.
- Login pengguna.
- Autentikasi menggunakan JWT.

### 2. Channels

Endpoint:

```text
/api/v1/channels
```

Digunakan untuk mengelola channel atau platform distribusi konten.

Fitur:
- Menambahkan channel.
- Menampilkan daftar channel.
- Memperbarui data channel.
- Menghapus channel.

### 3. Contents

Endpoint:

```text
/api/v1/contents
```

Digunakan untuk mengelola data dan perencanaan konten.

Fitur:
- Menambahkan konten.
- Menampilkan data konten.
- Memperbarui data konten.
- Menghapus konten.
- Memperbarui status konten.

### 4. Checklists

Endpoint:

```text
/api/v1/checklist
```

Digunakan untuk mengelola checklist persiapan konten.

Fitur:
- Menambahkan checklist.
- Menampilkan checklist berdasarkan konten.
- Memperbarui checklist.
- Menghapus checklist.

### 5. Metrics

Endpoint:

```text
/api/v1/metrics
```

Digunakan untuk mengelola data metrik dan performa konten.

Fitur:
- Menambahkan data metrics.
- Menampilkan data metrics.
- Memperbarui data metrics.
- Menghapus data metrics.

*Catatan: Daftar fitur dan endpoint di atas merupakan gambaran modul. Detail HTTP method, parameter, dan request body mengikuti implementasi masing-masing route.*

## 🗄️ Database

Project ini menggunakan **MySQL** sebagai sistem manajemen database relasional.

Database digunakan untuk menyimpan dan mengelola beberapa entitas utama:

- Users – Data pengguna aplikasi.
- Channels – Data channel atau platform konten.
- Contents – Data perencanaan dan informasi konten.
- Checklists – Daftar tugas persiapan konten.
- Metrics – Data performa konten.

Konfigurasi koneksi database terdapat pada:

```text
config/db.js
```

## 🧪 Pengujian API

Pengujian endpoint dilakukan menggunakan **Postman**.

Langkah pengujian:

1. Jalankan backend server.
2. Buka aplikasi Postman.
3. Masukkan URL endpoint yang ingin diuji.
4. Pilih HTTP method sesuai kebutuhan.
5. Isi request body atau query parameter jika diperlukan.
6. Tambahkan JWT Token pada Authorization untuk endpoint yang membutuhkan autentikasi.
7. Kirim request dan periksa response dari server.

Contoh Authorization Header:

```text
Authorization: Bearer <your_token>
```

## 🔐 Keamanan Aplikasi

Beberapa mekanisme keamanan yang diterapkan dalam backend:

- Password pengguna disimpan dalam bentuk hash menggunakan bcrypt.
- JWT digunakan untuk autentikasi pengguna.
- Environment variables digunakan untuk menyimpan konfigurasi sensitif.
- Middleware digunakan untuk mengelola autentikasi dan otorisasi request.

## 📌 Status Pengembangan

**Status: Dalam Pengembangan (In Development)**

Project Content Creator Pipeline dikembangkan secara bertahap. Pengembangan meliputi implementasi API, pengelolaan database, validasi data, autentikasi, serta integrasi antara frontend dan backend.

## 🤝 Kolaborasi

Project ini merupakan hasil kolaborasi antara Frontend Developer dan Backend Developer untuk membangun aplikasi Content Creator Pipeline yang terintegrasi.

**Frontend Developer:** Daffa Salsabila

**Backend Developer:** Aira Wibia Sastri

---

© 2026 Content Creator Pipeline. All Rights Reserved.
