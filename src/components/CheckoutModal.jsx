import React, { useState } from 'react';
import { IconX, IconShieldCheck, IconWhatsApp, IconCheck } from './Icons';
import { shopInfo } from '../data/products';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart = [], 
  onConfirmOrder 
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    courier: 'J&T Express',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState('');

  if (!isOpen) return null;

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price || item.harga || 28000);
    const qty = Number(item.quantity || 1);
    return sum + (price * qty);
  }, 0);
  const shippingFee = 15000;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    const orderId = 'PJ-' + Math.floor(100000 + Math.random() * 900000);
    setLastOrderId(orderId);
    
    if (onConfirmOrder) {
      onConfirmOrder({
        orderId,
        customer: formData,
        items: cart,
        grandTotal
      });
    }

    setIsSuccess(true);
  };

  const handleOpenWhatsAppOrder = () => {
    const itemListText = cart
      .map(item => {
        const name = item.name || item.nama || 'Rengginang';
        const qty = Number(item.quantity || 1);
        const price = Number(item.price || item.harga || 28000);
        return `• ${name} (${qty} bks x Rp${price.toLocaleString('id-ID')})`;
      })
      .join('%0A');

    const message = 
      `*PESANAN RENGGINANG PUTRA JAYA*%0A` +
      `No. Pesanan: ${lastOrderId}%0A%0A` +
      `*Data Pelanggan:*%0A` +
      `Nama: ${formData.name}%0A` +
      `No. WhatsApp: ${formData.phone}%0A` +
      `Alamat: ${formData.address}, ${formData.city}%0A` +
      `Ekspedisi: ${formData.courier}%0A%0A` +
      `*Rincian Pesanan:*%0A` +
      `${itemListText}%0A%0A` +
      `*Total Tagihan:* Rp${grandTotal.toLocaleString('id-ID')}%0A%0A` +
      `Mohon informasikan nomor rekening dan konfirmasi proses pengiriman. Terima kasih!`;

    window.open(`https://wa.me/${shopInfo.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#EFE6DC] z-10 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#736A62] hover:bg-[#FAF6F0] hover:text-[#201815]"
        >
          <IconX className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EDF7EE] text-[#2E7D32] border border-[#D5ECD7] mb-2">
                <IconShieldCheck className="w-3.5 h-3.5" />
                <span>Belanja Tanpa Buat Akun</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#201815]">
                Formulir Pemesanan Cepat
              </h3>
              <p className="text-xs text-[#655B53] mt-1">
                Data Anda hanya digunakan untuk pengiriman dan pembuatan resi paket rengginang.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-bold text-[#201815] mb-1">
                  Nama Penerima *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Bpk. Ahmad Fauzi"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#201815] mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#201815] mb-1">
                  Alamat Lengkap Pengiriman *
                </label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  placeholder="Jalan, RT/RW, No. Rumah, Kelurahan/Kecamatan"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]/40 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#201815] mb-1">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Contoh: Surabaya / Jakarta"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#201815] mb-1">
                    Pilihan Ekspedisi
                  </label>
                  <select
                    name="courier"
                    value={formData.courier}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-[#DED4C7] focus:border-[#8A3319] focus:outline-none bg-[#FAF6F0]/40"
                  >
                    <option value="J&T Express">J&T Express (Rekomendasi)</option>
                    <option value="SiCepat">SiCepat REG</option>
                    <option value="JNE Reguler">JNE Reguler</option>
                    <option value="Indah Logistik">Indah Kargo (Grosir)</option>
                  </select>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#FAF6F0] p-3 rounded-xl border border-[#EFE6DC] space-y-1 text-xs">
                <div className="flex justify-between text-[#655B53]">
                  <span>Subtotal ({totalItems} bungkus):</span>
                  <span className="font-semibold text-[#201815]">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-[#655B53]">
                  <span>Estimasi Ongkos Kirim:</span>
                  <span className="font-semibold text-[#201815]">Rp{shippingFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-[#E8DDD1]">
                  <span>Total Tagihan:</span>
                  <span className="text-[#8A3319] font-extrabold">Rp{grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Action Submit */}
              <button
                type="submit"
                className="w-full bg-[#1E463A] hover:bg-[#16362C] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Konfirmasi & Lanjut Pesan</span>
                <IconCheck className="w-4 h-4" />
              </button>

            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EDF7EE] text-[#2E7D32] flex items-center justify-center mx-auto border border-[#C6E8C9]">
              <IconCheck className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[#201815]">
                Pesanan Berhasil Dicatat!
              </h3>
              <p className="text-xs text-[#736A62] mt-1">
                Kode Pesanan: <span className="font-bold text-[#8A3319]">{lastOrderId}</span>
              </p>
            </div>

            <p className="text-xs text-[#655B53] max-w-sm mx-auto leading-relaxed">
              Terima kasih <strong>{formData.name}</strong>. Silakan klik tombol di bawah untuk mengirimkan format pesanan langsung ke WhatsApp pengelola kami agar langsung dipacking.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleOpenWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all"
              >
                <IconWhatsApp className="w-5 h-5 text-white" />
                <span>Kirim Pesanan ke WhatsApp Owner</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-white hover:bg-[#FAF6F0] text-[#736A62] font-semibold py-2 px-4 rounded-xl text-xs border border-[#E8DDD1]"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
