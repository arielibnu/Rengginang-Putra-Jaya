import React from 'react';
import { IconShoppingBag, IconAlert } from './Icons';

export default function ProductCard({ product, onOrderNow }) {
  const isLowStock = product.stock <= 5;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EBE1D7] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] bg-gradient-to-b from-[#F7F2EC] to-[#ECE2D6] overflow-hidden">
        {/* Category / Highlight Badge */}
        <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider ${product.badgeColor} shadow-xs`}>
          {product.badge}
        </span>

        {/* Tanpa Dijemur Badge from packaging */}
        <span className="absolute bottom-2 left-2 z-10 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-white/90 text-[#C2410C] backdrop-blur-xs border border-[#FADCCB] shadow-xs">
          Tanpa Dijemur
        </span>

        {/* Netto Badge */}
        <span className="absolute bottom-2 right-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
          Netto {product.weight}
        </span>

        {/* Genuine Product Photo */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-[15px] text-[#201815]">
              {product.name}
            </h3>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              Halal
            </span>
          </div>
          
          <p className="text-xs text-[#736A62] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price & Stock status */}
          <div className="flex items-center justify-between mb-3 pt-2 border-t border-[#F5ECE1]">
            <div>
              <span className="text-sm sm:text-base font-extrabold text-[#8A3319]">
                {product.priceFormatted}
              </span>
              <span className="text-xs text-[#736A62]"> {product.unit}</span>
            </div>

            {/* Stock pill */}
            <div className={`px-2 py-0.5 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
              isLowStock
                ? 'bg-[#FEE2E2] text-[#B91C1C]'
                : 'bg-[#FEEFE6] text-[#A84E20]'
            }`}>
              {isLowStock && <IconAlert className="w-3 h-3 text-[#B91C1C]" />}
              <span>Sisa {product.stock} bks</span>
            </div>
          </div>

          {/* Action Button: Pesan Sekarang */}
          <button
            onClick={() => onOrderNow(product)}
            className="w-full bg-[#8A3319] hover:bg-[#732913] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <IconShoppingBag className="w-4 h-4 text-white" />
            <span>Pesan Sekarang</span>
          </button>
        </div>

      </div>

    </div>
  );
}
