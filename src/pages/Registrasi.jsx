import React, { useState } from 'react';

// Halaman Registrasi Akun Pengelola Operasional
export default function Registrasi({ onKembali, onKeLogin, onDaftarSukses }) {
  // 1. Data form isian pendaftaran
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [lihatPassword, setLihatPassword] = useState(false);
  const [setujuSyarat, setSetujuSyarat] = useState(false);

  // Pesan error dari validasi backend (muncul di bawah form)
  const [pesanError, setPesanError] = useState('');

  // 2. Fungsi saat tombol "Daftar Akun" diklik
  // (Tanpa validasi required di frontend, validasi akan ditangani langsung oleh backend Go)
  const handleDaftar = (e) => {
    e.preventDefault();

    // Reset pesan error sebelumnya
    setPesanError('');

    // Siapkan data pendaftaran untuk dikirim ke API backend
    const dataRegistrasi = {
      nama: namaLengkap,
      email: email,
      whatsapp: whatsapp,
      password: password,
      konfirmasiPassword: konfirmasiPassword,
      setujuSyarat: setujuSyarat
    };

    // Simulasi sukses pendaftaran (nanti diganti fetch/axios ke backend Go)
    alert(`Data registrasi "${namaLengkap || 'Akun Baru'}" berhasil dikirim!`);
    
    if (onDaftarSukses) {
      onDaftarSukses();
    } else if (onKeLogin) {
      onKeLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF4EC] via-[#F8EDE2] to-[#FAF4EC] flex flex-col justify-between items-center py-10 px-4 font-sans">
      
      {/* KOTAK PUTIH UTAMA */}
      <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-xl max-w-md w-full border border-[#EFE4D8] space-y-5">
        
        {/* BAGIAN ATAS: Logo & Judul */}
        <div className="text-center space-y-2 pt-1">
          
          {/* Logo Lingkaran PJ dengan badge centang hijau */}
          <div className="relative w-14 h-14 mx-auto mb-2">
            <div className="w-14 h-14 rounded-full bg-[#8A3319] text-white flex items-center justify-center font-extrabold text-xl shadow-xs">
              PJ
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] border-2 border-white">
              ✓
            </div>
          </div>

          {/* Subjudul */}
          <p className="text-[11px] font-bold text-[#A84E20] uppercase tracking-wider">
            RENGGINANG PUTRA JAYA • SUMENEP
          </p>

          {/* Judul Utama */}
          <h1 className="text-2xl font-extrabold text-[#201815]">
            Registrasi
          </h1>

          {/* Keterangan */}
          <p className="text-xs text-[#736A62] leading-tight">
            Daftarkan Akun Pengelola Operasional<br />
            Rengginang Putra JAYA Sumenep.
          </p>

        </div>

        {/* FORM PENDAFTARAN (noValidate aktif agar tidak muncul popup required bawaan browser) */}
        <form onSubmit={handleDaftar} noValidate className="space-y-3.5 pt-1">
          
          {/* 1. Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-[#201815] mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                👤
              </span>
              <input
                type="text"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="cth. Mas Ifur / Pengelola Toko"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
            </div>
          </div>

          {/* 2. Email / Username */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-bold text-[#201815]">
                Email / Username
              </label>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Verifikasi Email Aktif
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
                placeholder="pengelola@rengginang-arifah.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
            </div>
          </div>

          {/* 3. Nomor WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-[#201815] mb-1">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                📞
              </span>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="0812-xxxx-xxxx"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
            </div>
          </div>

          {/* 4. Kata Sandi */}
          <div>
            <label className="block text-xs font-bold text-[#201815] mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                🔒
              </span>
              <input
                type={lihatPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setLihatPassword(!lihatPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-sm"
              >
                {lihatPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* 5. Konfirmasi Kata Sandi */}
          <div>
            <label className="block text-xs font-bold text-[#201815] mb-1">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                🛡️
              </span>
              <input
                type={lihatPassword ? 'text' : 'password'}
                value={konfirmasiPassword}
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                placeholder="Ulangi kata sandi"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E8DDD1] bg-[#FAF6F0] text-xs sm:text-sm text-[#201815] focus:outline-none focus:border-[#8A3319] focus:bg-white"
              />
            </div>
          </div>

          {/* Checkbox Ketentuan */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="setuju"
              type="checkbox"
              checked={setujuSyarat}
              onChange={(e) => setSetujuSyarat(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded text-[#8A3319] accent-[#8A3319] cursor-pointer shrink-0"
            />
            <label htmlFor="setuju" className="text-[11px] text-[#655B53] cursor-pointer select-none leading-relaxed">
              Saya menyetujui ketentuan akses sistem operasional UMKM Rengginang Putra JAYA.
            </label>
          </div>

          {/* Tombol 1: Daftar Akun (Warna Cokelat Terracotta) */}
          <button
            type="submit"
            className="w-full bg-[#B24622] hover:bg-[#973919] active:scale-[0.99] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all text-center mt-2"
          >
            Daftar Akun
          </button>

          {/* Tombol 2: Sudah Punya Akun? Masuk */}
          <button
            type="button"
            onClick={onKeLogin}
            className="w-full bg-[#5C4A42] hover:bg-[#4A3B34] active:scale-[0.99] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all text-center"
          >
            Sudah Punya Akun? Masuk
          </button>

          {/* Kotak Pesan Error di Bawah Form (Menampilkan pesan error dari backend jika ada) */}
          {pesanError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center mt-2">
              <p className="text-xs text-red-600 font-medium">
                {pesanError}
              </p>
            </div>
          )}

        </form>

        {/* Tombol Kembali ke Beranda */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onKembali}
            className="text-xs font-semibold text-[#8A3319] hover:underline inline-flex items-center gap-1"
          >
            <span>← Kembali ke Beranda</span>
          </button>
        </div>

      </div>

      {/* FOOTER BAWAH KARTU */}
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
