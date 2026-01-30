# 🛒 RevoShop - E-Commerce Platform (Next.js)

RevoShop adalah aplikasi web _e-commerce_ modern yang dibangun menggunakan **Next.js 15**. Proyek ini berfokus pada performa tinggi menggunakan metode **SSG (Static Site Generation)** untuk halaman informasi dan **Dynamic Routing** untuk katalog produk yang responsif.

## Overview

Proyek ini dikembangkan untuk mendemonstrasikan integrasi API eksternal dengan antarmuka pengguna yang bersih dan sejajar. Fokus utama pengembangan meliputi konsistensi tata letak (_alignment_), manajemen _state_ sederhana untuk keranjang belanja, dan optimasi navigasi antar halaman.

## Fitur Utama

- **Dynamic Product Catalog**: Menampilkan daftar produk secara real-time dari API eksternal.
- **Product Detail Page**: Halaman spesifik untuk setiap produk dengan informasi harga dan deskripsi lengkap.
- **Static Site Generation (SSG)**: Halaman FAQ yang dibuat secara statis untuk kecepatan akses maksimal.
- **Contextual Navbar**: Bar navigasi cerdas yang menyesuaikan tombol (Cart/Back) berdasarkan posisi halaman pengguna.

## Teknologi yang Digunakan

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: Platzi Fake Store API
- **Language**: TypeScript

## Struktur Proyek

- `/src/app/` : Routing utama aplikasi.
- `/src/app/products/[id]/` : Implementasi Dynamic Route untuk detail produk.
- `/src/app/faq/` : Implementasi Static Route untuk FAQ.
- `/src/components/` : Komponen reusable seperti `Navbar.tsx`, `ProductCard.tsx`, dan `ProductHeader.tsx`.

## Cara Menjalankan

1. Clone repositori: `git clone <repo-url>`
2. Install dependensi: `npm install`
3. Jalankan mode pengembangan: `npm run dev`
4. Akses melalui: `http://localhost:3000`

## Deploy Website

[Link](https://milestone-3-fakhridho-gunawan73.vercel.app/)
