import React from 'react';
import { IconX, IconSun, IconCheck, IconWhatsApp } from './Icons';
import { shopInfo } from '../data/products';

export default function TipsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#EFE6DC] z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736A62] hover:bg-[#FAF6F0]"
        >
          <IconX className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-5">
          <span className="text-[10px] font-bold text-[#A84E20] uppercase tracking-wider bg-[#FEEFE6] px-2.5 py-1 rounded-full border border-[#F6DAC8]">
            PANDUAN DAPUR PUTRA JAYA
          </span>
          <h3 className="text-xl font-extrabold text-[#201815] mt-2">
            Tips Menggoreng Agar Mekar & Renyah Maksimal
          </h3>
          <p className="text-xs text-[#736A62] mt-1">
            Rengginang mentah Putra JAYA sudah terjemur kering sempurna, ikuti langkah berikut untuk kerenyahan maksimal:
          </p>
        </div>

        {/* 4 Steps */}
        <div className="space-y-3.5 mb-6">
          <div className="flex gap-3 items-start p-3 rounded-xl bg-[#FAF6F0] border border-[#EFE6DC]">
            <div className="w-6 h-6 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="text-xs text-[#655B53]">
              <p className="font-bold text-[#201815]">Jemur Ulang Sebentar (Opsional)</p>
              <p className="mt-0.5">Jika paket baru sampai dari pengiriman luar kota, jemur di terik matahari 15-30 menit agar kelembapan udara hilang.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-[#FAF6F0] border border-[#EFE6DC]">
            <div className="w-6 h-6 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="text-xs text-[#655B53]">
              <p className="font-bold text-[#201815]">Minyak Banyak & Panas Pas</p>
              <p className="mt-0.5">Gunakan minyak goreng baru dengan teknik deep fry. Pastikan minyak sudah benar-benar panas dengan api sedang.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-[#FAF6F0] border border-[#EFE6DC]">
            <div className="w-6 h-6 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="text-xs text-[#655B53]">
              <p className="font-bold text-[#201815]">Goreng 1 atau 2 Keping Sekaligus</p>
              <p className="mt-0.5">Masukkan rengginang sedikit demi sedikit. Goyang perlahan dalam minyak panas hingga mekar meletup ke permukaan.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-[#FAF6F0] border border-[#EFE6DC]">
            <div className="w-6 h-6 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              4
            </div>
            <div className="text-xs text-[#655B53]">
              <p className="font-bold text-[#201815]">Dinginkan Sebelum Masuk Toples</p>
              <p className="mt-0.5">Tiriskan minyak dan tunggu hingga rengginang mencapai suhu ruang. Simpan di toples rapat agar tahan berbulan-bulan.</p>
            </div>
          </div>
        </div>

        {/* Reseller Box */}
        <div className="p-4 rounded-xl bg-[#EDF7EE] border border-[#CDE7D0] mb-5">
          <h4 className="font-bold text-xs text-[#2E7D32] mb-1">
            📦 Program Reseller & Grosir Luar Pulau
          </h4>
          <p className="text-xs text-[#3E6542] leading-relaxed">
            Tersedia paket kardus 50 bungkus dan 100 bungkus dengan potongan harga khusus untuk toko oleh-oleh dan reseller di seluruh Indonesia.
          </p>
        </div>

        <a
          href={`https://wa.me/${shopInfo.whatsappNumber}?text=Halo%20Mas%20Ifur,%20saya%20tertarik%20dengan%20info%20paket%20reseller%20rengginang`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#1E463A] hover:bg-[#16362C] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs transition-all"
        >
          <IconWhatsApp className="w-4 h-4 text-white" />
          <span>Hubungi Tim Reseller via WhatsApp</span>
        </a>

      </div>
    </div>
  );
}

