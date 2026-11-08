import React from 'react';
import ProductCard from './ProductCard';
import { IconArrowRight } from './Icons';

export default function ProductCatalog({ products, onOrderProduct, onOpenTips }) {
  return (
    <section id="katalog" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-bold text-[#C26129] uppercase tracking-wider mb-1.5">
              PILIHAN RASA
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#201815] tracking-tight mb-2">
              Empat Varian Rengginang Pilihan
            </h2>
            <p className="text-xs sm:text-sm text-[#655B53] max-w-2xl leading-relaxed">
              Semua varian Rp28.000 per bungkus isi 450 gram mentah siap goreng. Mekar maksimal & meletup renyah.
            </p>
          </div>

          {/* Realtime Demo Status Pill */}
          <div className="self-start md:self-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#EDF7EE] text-[#2E7D32] border border-[#D3EBD5]">
              <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse"></span>
              <span>Stok diperbarui dalam browser demo</span>
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOrderNow={onOrderProduct}
            />
          ))}
        </div>

        {/* Bottom CTA to open catalog & tips modal */}
        <div className="mt-10 text-center">
          <button
            onClick={onOpenTips}
            className="inline-flex items-center gap-2 bg-[#FEEFE6] hover:bg-[#FCDFD0] active:scale-[0.99] text-[#8A3319] text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl border border-[#F6DAC8] transition-all shadow-xs"
          >
            <span>Buka Katalog Lengkap & Tips Menggoreng</span>
            <IconArrowRight className="w-4 h-4 text-[#8A3319]" />
          </button>
        </div>

      </div>
    </section>
  );
}

