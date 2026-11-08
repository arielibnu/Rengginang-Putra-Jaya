import React from 'react';
import { IconX, IconPlus, IconMinus, IconShoppingBag, IconArrowRight } from './Icons';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  onRemoveItem, 
  onProceedCheckout 
}) {
  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalWeightKg = (totalItems * 0.45).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFE6DC] flex items-center justify-between bg-[#FAF6F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8A3319] text-white flex items-center justify-center">
                <IconShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#201815]">Keranjang Belanja</h3>
                <p className="text-xs text-[#736A62]">{totalItems} item dipilih</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#736A62] hover:bg-[#F2E7DC] hover:text-[#201815] transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#EFE6DC] flex items-center justify-center mx-auto text-[#A84E20]">
                  <IconShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-[#201815]">Keranjang masih kosong</h4>
                <p className="text-xs text-[#736A62] max-w-xs mx-auto">
                  Pilih salah satu dari 4 varian rengginang khas pesisir Madura untuk memulai pesanan.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-[#EFE6DC] bg-[#FAF6F0]/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-14 object-cover rounded-lg border border-[#E8DDD1] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-[#201815] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-bold text-[#8A3319]">
                      Rp{item.price.toLocaleString('id-ID')}
                      <span className="text-[10px] font-normal text-[#736A62]"> / {item.weight}</span>
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#E0D5C7] flex items-center justify-center text-xs hover:bg-[#FAF6F0]"
                      >
                        <IconMinus className="w-3 h-3 text-[#201815]" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center text-[#201815]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#E0D5C7] flex items-center justify-center text-xs hover:bg-[#FAF6F0]"
                      >
                        <IconPlus className="w-3 h-3 text-[#201815]" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-extrabold text-[#201815]">
                      Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[11px] text-red-500 hover:text-red-700 mt-2 font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFE6DC] bg-[#FAF6F0] space-y-3">
              <div className="space-y-1.5 text-xs text-[#655B53]">
                <div className="flex justify-between">
                  <span>Estimasi Berat Total:</span>
                  <span className="font-semibold text-[#201815]">{totalWeightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Pengiriman dari:</span>
                  <span className="font-semibold text-[#201815]">Sumenep, Madura</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#E8DDD1] text-sm">
                  <span className="font-bold text-[#201815]">Total Belanja:</span>
                  <span className="font-extrabold text-[#8A3319] text-base">
                    Rp{totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full bg-[#8A3319] hover:bg-[#732913] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all"
              >
                <span>Lanjut ke Pengisian Data</span>
                <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

