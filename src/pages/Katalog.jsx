import React, { useState } from 'react';

// Data produk dibuat langsung di sini agar mudah dibaca dan dipahami
const DATA_PRODUK = [
  {
    id: 'terasi',
    nama: 'Rengginang Terasi',
    kategori: 'VARIAN TERASI ASLI',
    badge: '🔥 Bestseller',
    badgeWarna: 'bg-[#C2410C] text-white',
    rating: '4.9',
    ulasan: '142',
    gambar: '/images/terasi.png',
    deskripsi: 'Rengginang gurih dengan racikan terasi udang sangrai khas pesisir Situbondo-Sumenep.',
    harga: 28000,
    stok: 24,
    stokTeks: 'Sisa 24 bungkus',
    stokWarna: 'bg-[#C8F2D5] text-[#1B6E3B]',
    komposisi: 'Beras Ketan, Bawang Putih, Ikan Laut, Terasi Pilihan, Penyedap Rasa, Garam, Soda Kue',
    pirt: '215.3512.04.0308.26'
  },
  {
    id: 'udang',
    nama: 'Rengginang Udang',
    kategori: 'VARIAN UDANG SEGAR',
    badge: null,
    rating: '4.8',
    ulasan: '98',
    gambar: '/images/udang.png',
    deskripsi: 'Perpaduan kaldu udang laut segar dengan ketan premium, renyah mekar dan wangi gurih.',
    harga: 28000,
    stok: 18,
    stokTeks: 'Sisa 18 bungkus',
    stokWarna: 'bg-[#C8F2D5] text-[#1B6E3B]',
    komposisi: 'Beras Ketan, Bawang Putih, Udang Segar, Penyedap Rasa, Garam, Air, Soda Kue',
    pirt: '215.3512.01.0308.26'
  },
  {
    id: 'bawang',
    nama: 'Rengginang Bawang',
    kategori: 'VARIAN BAWANG KLASIK',
    badge: null,
    rating: '4.8',
    ulasan: '76',
    gambar: '/images/bawang.png',
    deskripsi: 'Aroma bawang putih dan rempah pilihan yang harum, rasa gurih ramah untuk cemilan keluarga.',
    harga: 28000,
    stok: 27,
    stokTeks: 'Sisa 27 bungkus',
    stokWarna: 'bg-[#C8F2D5] text-[#1B6E3B]',
    komposisi: 'Beras Ketan, Bawang Putih Kating, Ikan Laut, Penyedap Rasa, Garam, Soda Kue',
    pirt: '215.3512.03.0308.26'
  },
  {
    id: 'cumi',
    nama: 'Rengginang Cumi',
    kategori: 'VARIAN CUMI SPESIAL',
    badge: '⏰ Segera Habis',
    badgeWarna: 'bg-[#D97706] text-white',
    rating: '4.8',
    ulasan: '64',
    gambar: '/images/cumi.png',
    deskripsi: 'Khas cumi pesisir dengan tinta cumi asli alami. Rasa gurih laut yang mendalam dan meletup renyah.',
    harga: 28000,
    stok: 3,
    stokTeks: 'Sisa 3 bungkus!',
    stokWarna: 'bg-[#FEE2CC] text-[#B45309]',
    komposisi: 'Beras Ketan, Bawang Putih, Cumi & Tinta Asli, Penyedap Rasa, Garam, Soda Kue',
    pirt: '215.3512.02.0308.26'
  }
];

export default function Katalog({ onTambahKeranjang }) {
  // State untuk pencarian varian
  const [kataKunci, setKataKunci] = useState('');
  
  // State untuk modal pop-up detail produk
  const [detailProduk, setDetailProduk] = useState(null);

  // Filter produk berdasarkan input pencarian
  const produkTersaring = DATA_PRODUK.filter(item => 
    item.nama.toLowerCase().includes(kataKunci.toLowerCase()) ||
    item.kategori.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 1. BAGIAN HEADER HALAMAN KATALOG */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        
        <div className="max-w-2xl space-y-3">
          {/* Badge atas */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEEFE6] text-[#A84E20] border border-[#F6DAC8]">
            <span>✓ 100% Beras Ketan Asli Madura & Tanpa Pengawet</span>
          </span>

          {/* Judul Utama */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#201815] tracking-tight leading-tight">
            Katalog Produk <span className="text-[#8A3319]">Rengginang Situbondo</span>
          </h1>

          {/* Deskripsi */}
          <p className="text-sm text-[#655B53] leading-relaxed">
            Dibuat dengan beras ketan pilihan dan bumbu rempah alami khas pesisir Madura. Semua varian dikemas higienis 450 gram dengan harga seragam <strong>Rp28.000</strong> per bungkus.
          </p>
        </div>

        {/* Kotak Info Asal Kirim */}
        <div className="bg-[#FAF6F0] border border-[#EFE6DC] rounded-2xl p-4 flex items-center gap-3.5 self-start lg:self-center shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-[#EDF7EE] text-[#2E7D32] flex items-center justify-center text-lg">
            🚚
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#736A62] uppercase tracking-wider">ASAL KIRIM</p>
            <p className="text-sm font-extrabold text-[#201815]">Kota Sumenep</p>
          </div>
        </div>

      </div>

      {/* 2. BAR FILTER & PENCARIAN */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
        {/* Tombol Tab Varian */}
        <button 
          onClick={() => setKataKunci('')}
          className="bg-[#8A3319] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs text-center"
        >
          Semua Varian ({DATA_PRODUK.length})
        </button>

        {/* Input Pencarian */}
        <div className="relative flex-1 sm:max-w-xs">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Cari varian rasa..."
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[#EFE6DC] bg-[#FAF6F0] focus:outline-none focus:border-[#8A3319]"
          />
        </div>
      </div>

      {/* 3. GRID 4 KARTU PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {produkTersaring.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#ECE0D4] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Foto Produk & Badge */}
            <div className="relative aspect-[16/10] bg-[#FAF6F0] overflow-hidden">
              {/* Badge khusus (Bestseller / Segera Habis) */}
              {item.badge && (
                <span className={`absolute top-2.5 left-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${item.badgeWarna}`}>
                  {item.badge}
                </span>
              )}

              {/* Berat Kemasan (450 gr) */}
              <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white">
                450 gr
              </span>

              {/* Gambar asli kemasan */}
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Informasi Produk */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                {/* Kategori & Rating */}
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-[#A84E20] uppercase tracking-wider text-[10px]">
                    {item.kategori}
                  </span>
                  <span className="font-semibold text-stone-700">
                    ⭐ {item.rating} <span className="text-stone-400">({item.ulasan})</span>
                  </span>
                </div>

                {/* Nama Produk */}
                <h3 className="font-extrabold text-base text-[#201815]">
                  {item.nama}
                </h3>

                {/* Deskripsi Singkat */}
                <p className="text-xs text-[#736A62] mt-1 line-clamp-2 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div>
                {/* Harga & Sisa Stok */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F5ECE1] mb-3">
                  <div>
                    <span className="text-base font-extrabold text-[#8A3319]">
                      Rp{item.harga.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-[#736A62]"> / pack</span>
                  </div>
                  
                  {/* Badge Stok */}
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${item.stokWarna}`}>
                    {item.stokTeks}
                  </span>
                </div>

                {/* 2 Tombol Aksi: Lihat Detail & + Keranjang */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetailProduk(item)}
                    className="bg-[#FDEEE7] hover:bg-[#FCDFD0] text-[#8A3319] text-xs font-bold py-2 px-2 rounded-xl transition-colors text-center"
                  >
                    Lihat Detail
                  </button>

                  <button
                    onClick={() => onTambahKeranjang(item)}
                    className="bg-[#8A3319] hover:bg-[#732913] text-white text-xs font-bold py-2 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>+ Keranjang</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* 4. MODAL POPUP LIHAT DETAIL PRODUK */}
      {detailProduk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#EFE6DC] shadow-2xl relative">
            {/* Tombol Tutup */}
            <button
              onClick={() => setDetailProduk(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 font-bold text-lg"
            >
              ✕
            </button>

            {/* Gambar Modal */}
            <img 
              src={detailProduk.gambar} 
              alt={detailProduk.nama} 
              className="w-full h-44 object-cover rounded-xl border border-[#EFE6DC] mb-4"
            />

            {/* Detail Teks */}
            <h3 className="text-xl font-extrabold text-[#201815]">{detailProduk.nama}</h3>
            <p className="text-xs font-semibold text-[#8A3319] mb-2">{detailProduk.kategori} • Netto 450 gr</p>
            <p className="text-xs text-[#655B53] leading-relaxed mb-4">{detailProduk.deskripsi}</p>

            <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EFE6DC] text-xs space-y-1 mb-5">
              <p><strong>Komposisi:</strong> {detailProduk.komposisi}</p>
              <p><strong>No. P-IRT:</strong> {detailProduk.pirt}</p>
              <p><strong>Status:</strong> Tanpa Pengawet & Siap Goreng (Tanpa Dijemur)</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#736A62]">Harga resmi:</p>
                <p className="text-lg font-extrabold text-[#8A3319]">Rp{detailProduk.harga.toLocaleString('id-ID')} / pack</p>
              </div>

              <button
                onClick={() => {
                  onTambahKeranjang(detailProduk);
                  setDetailProduk(null);
                }}
                className="bg-[#8A3319] hover:bg-[#732913] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs"
              >
                + Masukkan Keranjang
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
