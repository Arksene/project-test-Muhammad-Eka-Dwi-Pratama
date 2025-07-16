#  Implementasi UI Ideas - Suitmedia

Sebuah antarmuka pengguna (UI) responsif dan interaktif untuk menampilkan daftar ide dari API Suitmedia. Dibuat menggunakan **HTML, CSS, dan JavaScript murni (vanilla)**, dilengkapi dengan fitur seperti efek parallax, lazy loading gambar, pagination, sorting, dan penyimpanan state di localStorage.

---

## ✨ Fitur

### 1. Header (Navigasi)

✅ **Posisi Tetap & Sembunyi Saat Scroll**

* Elemen `<nav>` memiliki `position: fixed`, sehingga selalu terlihat di atas.
* Saat scroll ke bawah, header akan tersembunyi; saat scroll ke atas, akan muncul kembali (dengan kelas `.hide`).

✅ **Background Transparan saat Scroll**

* Saat pengguna scroll ke bawah, header akan memiliki latar belakang transparan `rgba(255, 135, 55, 0.9)` dan efek blur (`backdrop-filter`).

✅ **Status Menu Aktif**

* Menu "Work" diberi kelas `.active` dan diberi garis bawah putih melalui CSS.

---

### 2. Banner (Hero Section)

✅ **Gambar Latar & Sudut Miring**

* Gambar latar diterapkan di bagian `.hero` dengan overlay gelap (`::before`).
* Area bawah dibuat miring menggunakan `clip-path: polygon(...)` tanpa harus edit gambar.

✅ **Efek Parallax**

* Saat halaman discroll, isi `.hero-content` bergerak lebih lambat dibanding latar belakang, memberikan efek kedalaman.

---

### 3. Daftar Postingan (Card)

✅ **Grid Layout**

* Postingan ditampilkan dalam bentuk kartu menggunakan CSS grid.
* Setiap kartu menampilkan gambar (placeholder), tanggal rilis, dan judul maksimal 3 baris (dengan ellipsis `...`).

✅ **Filter & Urutan**

* Tersedia dropdown untuk memilih jumlah tampilan per halaman (10, 20, 50) dan urutan (terbaru / terlama).
* Pilihan pengguna disimpan di `localStorage`.

✅ **Pagination**

* Navigasi halaman mencakup tombol "First", "Prev", "Next", "Last", dan tombol angka halaman.
* Teks `Showing x – y of z` diperbarui secara dinamis.

✅ **Lazy Loading Gambar**

* Gambar hanya dimuat saat terlihat di layar menggunakan atribut `loading="lazy"` dan link acak dari [Picsum Photos](https://picsum.photos).

✅ **Penyimpanan State (Persistensi)**

* Sortir, ukuran halaman, dan nomor halaman disimpan di `localStorage`, sehingga saat reload halaman tetap pada kondisi terakhir.

---

### 4. Koneksi ke API

✅ **Handled API Errors**  
- **403 Error (Forbidden)**: Caused by hotlink protection. As a workaround, image URLs are replaced with random images from [Picsum Photos](https://picsum.photos).

---
