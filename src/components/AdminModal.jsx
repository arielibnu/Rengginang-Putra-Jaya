import React, { useState } from 'react';
import { IconX, IconLock, IconSun, IconPlus, IconMinus, IconCheck, IconUser } from './Icons';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  products, 
  onUpdateStock,
  orders 
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234' || pin === 'admin') {
      setIsLoggedIn(true);
      setErrorMsg('');
    } else {
      setErrorMsg('PIN salah. Gunakan PIN demo: 1234');
    }
  };

  const handleQuickLogin = () => {
    setIsLoggedIn(true);
    setErrorMsg('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE6DC] z-10">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736A62] hover:bg-[#FAF6F0]"
        >
          <IconX className="w-5 h-5" />
        </button>

        {!isLoggedIn ? (
          /* Login Screen */
          <div className="space-y-5">
            <div className="text-center pt-2">
              <div className="w-12 h-12 rounded-2xl bg-[#FEEFE6] text-[#8A3319] flex items-center justify-center mx-auto mb-3 border border-[#F6DAC8]">
                <IconLock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-[#201815]">
                Login Pengelola & Owner
              </h3>
              <p className="text-xs text-[#736A62] mt-1">
                Portal Mas Ifur (Owner) & Tim Gudang Situbondo - Sumenep
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#201815] mb-1">
                  Masukkan PIN Pengelola
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Ketik 1234..."
                  className="w-full px-3 py-2 text-center tracking-widest text-base font-bold rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]"
                />
                {errorMsg && (
                  <p className="text-[11px] text-red-500 mt-1 text-center font-medium">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#8A3319] hover:bg-[#732913] text-white font-semibold py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                Masuk Portal
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="text-xs text-[#8A3319] hover:underline font-semibold"
                >
                  ⚡ Klik di sini: Masuk Cepat Sebagai Mas Ifur (Demo)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE6DC]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-bold">
                  MI
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#201815]">Mas Ifur (Owner)</h4>
                  <p className="text-[10px] text-emerald-700 font-semibold">● Status: Online / Produksi Aktif</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-[#736A62] hover:text-red-600 font-medium"
              >
                Keluar
              </button>
            </div>

            {/* Sun Condition Monitor */}
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                <IconSun className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#201815]">Cuaca Penjemuran Sumenep: Terik (33°C)</p>
                <p className="text-stone-600 text-[11px]">Kadar air rengginang di bawah 8%. Kerenyahan optimal.</p>
              </div>
            </div>

            {/* Stock Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-[#201815] uppercase tracking-wider">
                  Manajemen Stok Harian Riil
                </h4>
                <span className="text-[10px] text-stone-500">Otomatis sinkron ke halaman</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {products.map((p) => (
                  <div 
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#FAF6F0] border border-[#EAE0D5] text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#201815]">{p.name}</p>
                      <p className="text-[10px] text-[#736A62]">{p.badge} • Rp{p.price.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateStock(p.id, Math.max(0, p.stock - 1))}
                        className="w-6 h-6 rounded bg-white border border-[#DDD] flex items-center justify-center font-bold text-xs hover:bg-stone-50"
                      >
                        <IconMinus className="w-3 h-3 text-stone-700" />
                      </button>
                      <span className="w-8 text-center font-bold text-[#8A3319]">
                        {p.stock}
                      </span>
                      <button
                        onClick={() => onUpdateStock(p.id, p.stock + 1)}
                        className="w-6 h-6 rounded bg-white border border-[#DDD] flex items-center justify-center font-bold text-xs hover:bg-stone-50"
                      >
                        <IconPlus className="w-3 h-3 text-stone-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders Count */}
            <div className="pt-2 border-t border-[#EFE6DC] flex items-center justify-between text-xs text-[#736A62]">
              <span>Total Pesanan Sesi Ini: <strong>{orders.length}</strong></span>
              <button
                onClick={onClose}
                className="bg-[#8A3319] text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                Tutup Panel
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

