import React from 'react';
import { IconX, IconSun, IconPlus, IconMinus } from './Icons';

// Modal Dashboard Manajemen Toko & Stok Mas Ifur (Langsung Tampil Tanpa Meminta PIN)
export default function AdminModal({ 
  isOpen, 
  onClose, 
  products, 
  onUpdateStock,
  orders 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Background redup */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Kotak Modal */}
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE6DC] z-10">
        
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736A62] hover:bg-[#FAF6F0]"
        >
          <IconX className="w-5 h-5" />
        </button>

        <div className="space-y-5">
          {/* Header Panel */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EFE6DC]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-extrabold">
                MI
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#201815]">Mas Ifur (Owner)</h4>
                <p className="text-[10px] text-emerald-700 font-semibold">● Status: Online / Produksi Aktif</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="text-xs text-[#736A62] hover:text-[#8A3319] font-medium"
            >
              Tutup
            </button>
          </div>

          {/* Cuaca Penjemuran Sumenep */}
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <IconSun className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-[#201815]">Cuaca Penjemuran Sumenep: Terik (33°C)</p>
              <p className="text-stone-600 text-[11px]">Kadar air rengginang di bawah 8%. Kerenyahan optimal.</p>
            </div>
          </div>

          {/* Pengatur Stok Harian */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#201815] uppercase tracking-wider">
                Manajemen Stok Harian
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
                    <p className="font-bold text-[#201815]">{p.name || p.nama}</p>
                    <p className="text-[10px] text-[#736A62]">{p.badge || 'Varian Asli'} • Rp{p.price?.toLocaleString('id-ID') || '28.000'}</p>
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

          {/* Ringkasan Pesanan & Tombol Selesai */}
          <div className="pt-2 border-t border-[#EFE6DC] flex items-center justify-between text-xs text-[#736A62]">
            <span>Total Pesanan Sesi Ini: <strong>{orders.length}</strong></span>
            <button
              onClick={onClose}
              className="bg-[#8A3319] hover:bg-[#732913] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold"
            >
              Simpan & Tutup
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
