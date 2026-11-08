import React, { useState } from 'react';

// Komponen Halaman Login Khusus Pemilik Toko (Mas Ifur)
export default function LoginOwner({ onKembali, onLoginSukses }) {
  // 1. Data form login (diisi default sesuai contoh desain)
  const [email, setEmail] = useState('mas.ifur@rengginang-arifah.com');
  const [password, setPassword] = useState('RengginangSuper2024!');
  const [lihatPassword, setLihatPassword] = useState(false);
  const [ingatSesi, setIngatSesi] = useState(true);

  // 2. Fungsi saat tombol Masuk diklik
  const submitLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Email dan kata sandi tidak boleh kosong!');
      return;
    }

    if (onLoginSukses) {
      onLoginSukses();
    } else {
      alert('Login berhasil! Selamat datang, Mas Ifur.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF4EC] via-[#F8EDE2] to-[#FAF4EC] flex flex-col justify-between items-center py-10 px-4 font-sans">

      {/* KOTAK PUTIH LOGIN */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl max-w-md w-full border border-[#EFE4D8] space-y-6">

        {/* BAGIAN ATAS: Logo & Judul */}
        <div className="text-center space-y-3">

          {/* Badge atas */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FEEFE6] text-[#A84E20] border border-[#FADCCB]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>SISTEM MANAJEMEN TOKO & PRODUKSI</span>
            </span>
          </div>

          {/* Logo Lingkaran PJ */}
          <div className="relative w-14 h-14 mx-auto">
            <div className="w-14 h-14 rounded-full bg-[#8A3319] text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
              PJ
            </div>
            {/* Centang hijau kecil */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] border-2 border-white">
              ✓
            </div>
          </div>

          {/* Teks Judul */}
          <div>
            <p className="text-[11px] font-bold text-[#A84E20] uppercase tracking-wider">
              RENGGINANG PUTRA JAYA • Sumenep
            </p>
            <h1 className="text-2xl font-extrabold text-[#201815] mt-0.5">
              Masuk Panel Pengelola
            </h1>
            <p className="text-xs text-[#736A62] mt-1 leading-relaxed">
              Akses khusus Mas Ifur & pengelola operasional Rengginang Putra JAYA Sumenep.
            </p>
          </div>

        </div>

        {/* FORM ISIAN */}
        <form onSubmit={submitLogin} className="space-y-4 pt-1">

          {/* Input 1: Email / Username */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-bold text-[#201815]">
                Email / Username Pengelola
              </label>
              <span className="text-[11px] text-stone-500">
                Akun Terverifikasi
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-semibold text-sm">
                @
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mas.ifur@rengginang-arifah.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
            </div>
          </div>

          {/* Input 2: Kata Sandi */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-bold text-[#201815]">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => alert('Fitur lupa sandi: Silakan hubungi nomor sentra.')}
                className="text-[11px] text-[#A84E20] hover:underline"
              >
                Lupa Sandi?
              </button>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                🔒
              </span>
              <input
                type={lihatPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
              {/* Tombol icon mata */}
              <button
                type="button"
                onClick={() => setLihatPassword(!lihatPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-sm"
              >
                {lihatPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Checkbox Ingat Sesi */}
          <div className="flex items-center gap-2 pt-1">
            <input
              id="ingatSesi"
              type="checkbox"
              checked={ingatSesi}
              onChange={(e) => setIngatSesi(e.target.checked)}
              className="w-4 h-4 rounded text-[#8A3319] accent-[#8A3319] cursor-pointer"
            />
            <label htmlFor="ingatSesi" className="text-xs text-[#655B53] cursor-pointer select-none">
              Ingat sesi saya di perangkat ini
            </label>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full bg-[#B24622] hover:bg-[#973919] active:scale-[0.99] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Masuk</span>
            <span>→</span>
          </button>

        </form>

        {/* Tombol Kembali ke Toko Pelanggan */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onKembali}
            className="text-xs font-semibold text-[#8A3319] hover:underline inline-flex items-center gap-1"
          >
            <span>← Kembali ke Beranda Toko Pelanggan</span>
          </button>
        </div>

        {/* Kotak Catatan Simulasi */}
        <div className="bg-[#FAF6F0] rounded-xl p-3 border border-[#EFE6DC] flex items-start gap-2.5 text-[11px] text-[#736A62] leading-relaxed">
          <span className="text-emerald-700 text-sm shrink-0">🛡️</span>
          <p>
            Panel simulasi lokal UMKM • Data pesanan dan inventori tersimpan di browser untuk pengujian prototype.
          </p>
        </div>

      </div>

      {/* FOOTER BAWAH */}
      <div className="text-center pt-6 text-[11px] text-[#8C827A] flex flex-wrap items-center justify-center gap-y-1 gap-x-4">
        <span className="inline-flex items-center gap-1">
          <span>✓</span> Enkripsi Sesi Lokal Aktif
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1">
          <span>🔄</span> Sinkronisasi Gudang Sumenep
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1">
          <span>📋</span> Batch Jemur & Goreng #42
        </span>
      </div>

    </div>
  );
}
