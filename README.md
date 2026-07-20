# Pengembangan Platform Digital Kuliner Tradisional Papua Barat Daya

Platform digital statis ini dikembangkan sebagai arsip ensiklopedis untuk melestarikan kuliner tradisional dari wilayah Papua Barat Daya. Proyek ini dibangun sepenuhnya menggunakan **Vanilla Web Technologies** tanpa mengandalkan framework atau backend modern, untuk memastikan kompatibilitas jangka panjang dan kemudahan deployment sebagai situs web statis.

## Teknologi yang Digunakan
- **HTML5**: Semantik HTML untuk aksesibilitas dan SEO.
- **CSS3**: Sistem desain kustom (Variables, Flexbox, Grid, Animasi) tanpa framework eksternal.
- **Vanilla JavaScript (ES6)**: Fungsionalitas interaktif, filter, pencarian, dan simulasi routing SPA.
- **Data Statis**: JSON/JS Objects lokal sebagai pengganti database.

## Struktur Direktori
- `index.html`: Halaman Utama (Hero Parallax, Sorotan Kuliner)
- `kuliner.html`: Direktori Kuliner (Sistem Filter, Pencarian, Grid Card)
- `detail.html`: Halaman Detail Dinamis (Sejarah, Bahan, Resep, Galeri)
- `tentang.html`: Informasi Proyek & Latar Belakang Akademis
- `referensi.html`: Daftar Pustaka & Literatur (UI Accordion)
- `404.html`: Halaman Error
- `data/kuliner.js`: Basis data statis terpusat.
- `assets/css/`: Modul-modul CSS (variables, layout, components, animation, responsive).
- `assets/js/`: Skrip JavaScript modular.

## Cara Menjalankan Secara Lokal
Karena proyek ini murni statis, Anda dapat langsung membuka file `index.html` menggunakan browser modern apa pun (Google Chrome, Firefox, Safari).

Namun, karena adanya injeksi data JavaScript dinamis di `detail.html` (melalui URL parameters), disarankan menggunakan Local HTTP Server untuk menghindari masalah CORS.

**Menggunakan Node.js:**
```bash
npx serve .
```

**Menggunakan Python:**
```bash
python -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

## Catatan Aksesibilitas & Performa
- Telah dioptimalkan untuk Lighthouse (Performance, Accessibility, Best Practices, SEO).
- Mendukung navigasi keyboard sepenuhnya (Tab, Enter, Esc).
- Menggunakan palet warna dengan kontras tinggi dan `aria-labels` untuk elemen interaktif.
- Animasi disusun untuk tidak memicu *Cumulative Layout Shift* (CLS).

---
*Proyek Tugas Akhir - Universitas Muhammadiyah Sorong (2026)*
