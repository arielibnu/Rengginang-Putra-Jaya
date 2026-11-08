import React from 'react';
import { IconPot, IconBill, IconTruck, IconCheck, IconRefresh, IconShieldCheck } from './Icons';

export default function Features() {
  const features = [
    {
      iconBg: 'bg-[#FEEFE6] text-[#A84E20]',
      icon: <IconPot className="w-5 h-5 text-[#A84E20]" />,
      title: 'Produk Tradisional',
      description: 'Dibuat dari ketan pilihan lokal dengan bumbu rempah asli dan terasi pesisir Madura. Cocok untuk suguhan tamu maupun buah tangan khas.',
      footerTag: 'Higienis & Gurih',
      footerIcon: <IconCheck className="w-3.5 h-3.5 text-[#A84E20]" />,
      footerColor: 'text-[#A84E20]'
    },
    {
      iconBg: 'bg-[#EDF7EE] text-[#2E7D32]',
      icon: <IconBill className="w-5 h-5 text-[#2E7D32]" />,
      title: 'Informasi Jelas',
      description: 'Harga jujur Rp28.000 per bungkus (netto 450 gram) dan sisa stok harian ditampilkan transparan pada setiap varian rasa.',
      footerTag: 'Stok Terpantau Realtime',
      footerIcon: <IconRefresh className="w-3.5 h-3.5 text-[#2E7D32]" />,
      footerColor: 'text-[#2E7D32]'
    },
    {
      iconBg: 'bg-[#FEEFE6] text-[#A84E20]',
      icon: <IconTruck className="w-5 h-5 text-[#A84E20]" />,
      title: 'Pemesanan Praktis',
      description: 'Tanpa perlu repot membuat akun. Pelanggan cukup mengisi nama, alamat, nomor WhatsApp, lalu pesanan langsung diproses cepat.',
      footerTag: 'Dukungan Ekspedisi Aman',
      footerIcon: <IconShieldCheck className="w-3.5 h-3.5 text-[#A84E20]" />,
      footerColor: 'text-[#A84E20]'
    }
  ];

  return (
    <section id="cerita" className="py-10 sm:py-14 bg-white/60 border-y border-[#ECE0D4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <p className="text-[11px] font-bold text-[#C26129] uppercase tracking-wider mb-1.5">
            CERITA UMKM
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#201815] tracking-tight mb-2.5">
            Rengginang Situbondo Putra JAYA
          </h2>
          <p className="text-xs sm:text-sm text-[#655B53] leading-relaxed">
            Usaha rengginang tradisional yang berakar di pesisir Sumenep, Madura. Mempertahankan metode sangrai dan jemur otentik turun-temurun untuk kerenyahan maksimal.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EBE1D7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#201815] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#655B53] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className={`mt-5 pt-3 border-t border-[#F5ECE1] flex items-center gap-1.5 text-xs font-semibold ${item.footerColor}`}>
                <span>{item.footerTag}</span>
                {item.footerIcon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

