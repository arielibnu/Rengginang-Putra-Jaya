import React from 'react';
import { IconArrowRight, IconWhatsApp } from './Icons';
import { shopInfo } from '../data/products';

export default function CtaSection({ onStartOrder }) {
  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Halo Putra JAYA! Saya ingin bertanya mengenai pemesanan rengginang khas Situbondo - Sumenep.`
    );
    window.open(`https://wa.me/${shopInfo.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-14 sm:py-20 bg-white/70 border-t border-[#ECE0D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Label */}
        <p className="text-[11px] font-bold text-[#C26129] uppercase tracking-wider mb-2">
          BELANJA TANPA REPOT
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#201815] tracking-tight mb-3">
          Cukup pilih, isi data, konfirmasi
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#655B53] max-w-xl mx-auto leading-relaxed mb-8">
          Tidak perlu unduh aplikasi ponsel dan tidak perlu registrasi akun. Pemesanan instan rengginang siap kirim ke seluruh nusantara langsung dari pengrajin Sumenep.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <button
            onClick={onStartOrder}
            className="inline-flex items-center gap-2 bg-[#1E463A] hover:bg-[#16362C] active:scale-[0.98] text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all shadow-sm hover:shadow"
          >
            <span>Mulai Pesan</span>
            <IconArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={handleWhatsAppChat}
            className="inline-flex items-center gap-2 bg-[#FEEFE6] hover:bg-[#FCDFD0] active:scale-[0.98] text-[#8A3319] text-sm font-semibold px-6 py-3.5 rounded-xl border border-[#F6DAC8] transition-all"
          >
            <IconWhatsApp className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
          </button>
        </div>

        {/* 4 Stats Column */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#EFE6DC]">
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#201815]">100%</p>
            <p className="text-xs text-[#736A62] mt-0.5">Beras Ketan Asli</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#201815]">4 Varian</p>
            <p className="text-xs text-[#736A62] mt-0.5">Rasa Tradisional</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#201815]">Rp28.000</p>
            <p className="text-xs text-[#736A62] mt-0.5">Harga Terstandar</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#201815]">Madura</p>
            <p className="text-xs text-[#736A62] mt-0.5">Sentra Sumenep</p>
          </div>
        </div>

      </div>
    </section>
  );
}

