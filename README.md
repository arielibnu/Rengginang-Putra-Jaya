# Rengginang Putra Jaya (Frontend)

Repositori Frontend antarmuka website katalog dan pemesanan online untuk produk UMKM **Rengginang Situbondo Putra Jaya - Sumenep, Madura**.

Aplikasi ini berfokus murni pada sisi **Frontend (UI/UX)** menggunakan React.js dan Tailwind CSS, yang dirancang untuk dapat dihubungkan ke **Backend API Golang (Go)** dan database **MySQL**.

## Tech Stack Frontend

- React 18
- Vite
- Tailwind CSS

## Cara Menjalankan

1. Clone repositori:
   ```bash
   git clone https://github.com/arielibnu/Rengginang-Putra-Jaya.git
   cd Rengginang-Putra-Jaya
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan server lokal frontend:
   ```bash
   npm run dev
   ```

4. Build untuk produksi:
   ```bash
   npm run build
   ```

## Fitur Halaman (Frontend)

- **Halaman Beranda (`src/pages/Beranda.jsx`)**: Banner Hero, Cerita UMKM, preview varian produk, dan tombol WhatsApp.
- **Halaman Katalog (`src/pages/Katalog.jsx`)**: Filter varian, live search, kartu produk, dan pop-up detail produk.
- **Halaman Login Pengelola (`src/pages/LoginOwner.jsx`)**: Tampilan form Masuk / Registrasi khusus pengelola.
- **Keranjang Belanja (`src/components/CartDrawer.jsx`)**: Pengelolaan item belanja sisi klien (client-side state).
- **Form Checkout WhatsApp (`src/components/CheckoutModal.jsx`)**: Pengisian data pemesan yang terhubung langsung ke format chat WhatsApp.
