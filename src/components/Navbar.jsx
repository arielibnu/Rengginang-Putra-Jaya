import React from 'react';
import { IconShoppingBag, IconUser } from './Icons';

export default function Navbar({ cartCount, onOpenCart, onOpenAdmin, activeTab, setActiveTab }) {
  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#EFE6DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#8A3319] flex items-center justify-center text-white font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
            PJ
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-[15px] sm:text-base text-[#201815] tracking-tight">
              Putra JAYA
            </h1>
            <p className="text-[11px] sm:text-xs text-[#736A62]">
              Rengginang Situbondo - Sumenep
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 bg-[#F5ECE1]/60 p-1 rounded-full border border-[#EFE6DC]">
          <button
            onClick={() => scrollToSection('hero')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'hero'
                ? 'bg-[#FDEEE7] text-[#8A3319] shadow-xs'
                : 'text-[#655B53] hover:text-[#201815]'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => scrollToSection('katalog')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'katalog'
                ? 'bg-[#FDEEE7] text-[#8A3319] shadow-xs'
                : 'text-[#655B53] hover:text-[#201815]'
            }`}
          >
            Katalog Produk
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Keranjang Belanja"
            className="relative p-2 rounded-full hover:bg-[#F2E7DC] text-[#2D241E] transition-colors"
          >
            <IconShoppingBag className="w-5 h-5 text-[#2D241E]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#8A3319] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF6F0]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Login Pengelola */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 bg-[#FDEEE7] hover:bg-[#FCDFD0] text-[#8A3319] text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-full transition-colors border border-[#F5D8C7]"
          >
            <span>Login Pengelola</span>
            <span className="w-6 h-6 rounded-full bg-[#8A3319] text-white flex items-center justify-center text-[10px]">
              <IconUser className="w-3.5 h-3.5 text-white" />
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}

