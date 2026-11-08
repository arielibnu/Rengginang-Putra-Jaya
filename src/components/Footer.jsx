import React from 'react';
import { IconMapPin, IconPhone, IconClock, IconLock } from './Icons';
import { shopInfo } from '../data/products';

export default function Footer({ onOpenAdmin, onOpenCart, onOpenTips, isKatalogPage = false }) {
  return (
    <footer className="bg-[#FAF6F0] pt-12 sm:pt-16 pb-8 border-t border-[#EFE6DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Columns Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${isKatalogPage ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-8 mb-12`}>
          
          {/* Column 1: Brand Info */}
          <div className={`${isKatalogPage ? 'lg:col-span-5' : 'lg:col-span-4'} space-y-4`}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#8A3319] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
                PJ
              </div>
              <div>
                <h3 className="font-bold text-base text-[#201815] leading-tight">
                  {shopInfo.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#655B53] leading-relaxed max-w-sm">
              Tradisi rasa gurih rengginang situbondo khas pesisir Madura. Diolah higienis dengan terasi pilihan, beras ketan mutu utama, dan penjemuran alami Sumenep.
            </p>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EDF7EE] text-[#2E7D32] border border-[#D5ECD7]">
                UMKM Binaan Resmi
              </span>
            </div>
          </div>

          {/* Column 2: Belanja Praktis */}
          <div className={`${isKatalogPage ? 'lg:col-span-3' : 'lg:col-span-2'} space-y-3`}>
            <h4 className="font-bold text-sm text-[#201815]">
              Belanja Praktis
            </h4>
            <ul className="space-y-2 text-xs text-[#655B53]">
              <li>
                <button onClick={onOpenTips} className="hover:text-[#8A3319] transition-colors">
                  Pilihan Varian Rasa
                </button>
              </li>
              <li>
                <button onClick={onOpenCart} className="hover:text-[#8A3319] transition-colors">
                  Keranjang & Checkout
                </button>
              </li>
              <li>
                <button onClick={onOpenTips} className="hover:text-[#8A3319] transition-colors">
                  Paket Reseller & Grosir
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${shopInfo.whatsappNumber}?text=Halo%20Putra%20JAYA,%20saya%20ingin%20pesan%20rengginang`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#8A3319] transition-colors"
                >
                  Pemesanan WhatsApp Instan
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Kontak & Sentra Produksi */}
          <div className={`${isKatalogPage ? 'lg:col-span-4' : 'lg:col-span-3'} space-y-3`}>
            <h4 className="font-bold text-sm text-[#201815]">
              Kontak & Sentra Produksi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#655B53]">
              <li className="flex items-start gap-2">
                <IconMapPin className="w-4 h-4 text-[#C26129] shrink-0 mt-0.5" />
                <span className="leading-snug">{shopInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <IconPhone className="w-4 h-4 text-[#C26129] shrink-0" />
                <span>{shopInfo.phone} (Putra JAYA)</span>
              </li>
              <li className="flex items-center gap-2">
                <IconClock className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>{shopInfo.operationalHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Akses Pengelola (Hanya jika bukan di halaman katalog penuh) */}
          {!isKatalogPage && (
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-bold text-sm text-[#201815]">
                Akses Pengelola
              </h4>
              <p className="text-xs text-[#655B53] leading-relaxed">
                Sistem internal manajemen stok rengginang jemur, verifikasi pesanan, & logistik reseller.
              </p>
              
              <button
                onClick={onOpenAdmin}
                className="w-full bg-[#FEEFE6] hover:bg-[#FCDFD0] text-[#8A3319] text-xs font-semibold py-2.5 px-4 rounded-xl border border-[#F6DAC8] flex items-center justify-center gap-2 transition-all"
              >
                <span>Login Owner Mas Ifur</span>
                <IconLock className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-[#8C827A] text-center">
                Portal Petugas Gudang & Ekspedisi
              </p>
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#EFE6DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#736A62]">
          <p>© 2025 Rengginang Situbondo Putra JAYA Sumenep. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1.5 font-medium text-[#8A3319]">
            <span>Cita Rasa Otentik Madura</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8A3319]"></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
