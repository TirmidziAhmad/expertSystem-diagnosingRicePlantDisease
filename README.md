# Panduan Setup Next.js + TypeScript + Prisma + PostgreSQL

Panduan ini berisi instruksi untuk mengatur proyek setelah mengkloning repositori.

---

## Prequisite

Sebelum memulai, pastikan telah menginstal:

- **Node.js** (Versi LTS terbaru) - [Unduh di sini](https://nodejs.org/)
- **PostgreSQL** (Terinstal dan berjalan) - [Unduh di sini](https://www.postgresql.org/download/)

---

## 1. Clone Repositori

Jalankan perintah berikut:

```sh
git https://github.com/TirmidziAhmad/expertSystem-diagnosingRicePlantDisease.git
cd your-repository
```

---

## 2. Instal Dependensi

Jalankan perintah berikut untuk menginstal paket yang diperlukan:

```sh
npm install
```

---

## 3. Konfigurasi Variabel Lingkungan

Buat file `.env` dan perbarui variabel `DATABASE_URL` dengan string koneksi PostgreSQL Anda:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydatabase"
```

Ganti `USER`, `PASSWORD`, dan `mydatabase` dengan kredensial PostgreSQL Anda.

```env
JWT_SECRET=very_secure
```

Ganti `very_secure` dengan string rahasia Anda.

---

## 4. Setup Prisma

Jalankan perintah berikut untuk menerapkan migrasi database dan menghasilkan klien Prisma:

```sh
npx prisma generate
npx prisma db push
npm run seed
```

---

## 5. Jalankan Server Pengembangan

Jalankan server pengembangan Next.js:

```sh
npm run dev
```

Aplikasi Next.js Anda sekarang harus berjalan di `http://localhost:3000`.
