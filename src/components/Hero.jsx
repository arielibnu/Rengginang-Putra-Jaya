import React from 'react';
import { 
  IconShieldCheck, 
  IconMapPin, 
  IconArrowRight, 
  IconSun, 
  IconCloudOff, 
  IconZap, 
  IconLeaf 
} from './Icons';

export default function Hero({ onExploreClick, onAboutClick }) {
  return (
    <section id="hero" className="pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EDF7EE] text-[#2E7D32] border border-[#D5ECD7]">
                <IconShieldCheck className="w-3.5 h-3.5" />
                <span>Belanja tanpa akun</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEEFE6] text-[#C26129] border border-[#FADCCB]">
                <IconMapPin className="w-3.5 h-3.5 text-[#C26129]" />
                <span>UMKM Sumenep Madura</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#201815] leading-[1.15]">
                Rengginang gurih,<br />
                khas Putra JAYA.
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#655B53] leading-relaxed max-w-xl">
              Pilihan rengginang tradisional dengan empat varian rasa khas pesisir Sumenep Madura. 
              Lihat harga dan sisa stok riil, lalu pesan dengan langkah sederhana langsung dari browser.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 bg-[#8A3319] hover:bg-[#732913] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Lihat 4 Varian Rengginang</span>
                <IconArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onAboutClick}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F9F5F0] text-[#201815] text-sm font-semibold px-5 py-3 rounded-xl border border-[#E8DDD1] transition-all active:scale-[0.98]"
              >
                <span>Tentang UMKM</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#736A62]">
              <div className="flex items-center gap-1.5">
                <IconCloudOff className="w-4 h-4 text-[#C26129]" />
                <span>Tanpa unduh aplikasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconZap className="w-4 h-4 text-[#C26129]" />
                <span>Checkout instan 1-menit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconLeaf className="w-4 h-4 text-[#2E7D32]" />
                <span>Beras ketan mutu premium</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl shadow-stone-200/60 border border-[#ECE0D4]">
                
                {/* Floating Top Badge */}
                <div className="absolute -top-3.5 left-4 z-10 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl shadow-md border border-[#EAE0D5] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center">
                    <IconSun className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="leading-tight text-left">
                    <p className="text-[9px] font-bold text-[#A84E20] uppercase tracking-wider">
                      PENJEMURAN ALAMI
                    </p>
                    <p className="text-xs font-extrabold text-[#201815]">
                      100% Sinar Matahari Madura
                    </p>
                  </div>
                </div>

                {/* Hero Photo with 4 packets */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] bg-gradient-to-b from-[#FAF4EC] to-[#EFE6DC]">
                  <img
                    src="/images/hero-pack.png"
                    alt="Empat Varian Rengginang Putra JAYA"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // fallback if image not loaded
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'text-stone-400');
                    }}
                  />
                  
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                </div>

                {/* Bottom Bar Info */}
                <div className="mt-2.5 px-3 py-2 bg-[#FAF6F0] rounded-xl flex items-center justify-between border border-[#EFE6DC]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-[#201815]">
                      Empat varian rasa
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#8A3319]">
                      Rp28.000
                    </span>
                    <span className="text-xs text-[#736A62] font-normal"> /bks</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

