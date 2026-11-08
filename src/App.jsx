import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminModal from './components/AdminModal';
import TipsModal from './components/TipsModal';

// Tiga Halaman Utama Frontend
import Beranda from './pages/Beranda';
import Katalog from './pages/Katalog';
import LoginOwner from './pages/LoginOwner';

// Data tampilan sementara sebelum dihubungkan ke API Golang
import { productsData } from './data/products';

export default function App() {
  const [products] = useState(productsData);

  // Tab yang aktif: 'beranda', 'katalog', atau 'login-owner'
  const [activeTab, setActiveTab] = useState('beranda');

  // Produk yang dipilih untuk dilihat detailnya di halaman katalog
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);

  // Keranjang belanja lokal browser
  const [cart, setCart] = useState([
    { ...productsData[0], quantity: 1 },
    { ...productsData[1], quantity: 1 },
    { ...productsData[2], quantity: 1 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const cartCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  // Fungsi Tambah Produk ke Keranjang (Standarisasi properti agar tidak pernah blank/error)
  const handleAddToCart = (item) => {
    const itemBaru = {
      id: item.id,
      name: item.name || item.nama || 'Rengginang',
      nama: item.nama || item.name || 'Rengginang',
      image: item.image || item.gambar || '/images/terasi.png',
      gambar: item.gambar || item.image || '/images/terasi.png',
      price: Number(item.price || item.harga || 28000),
      harga: Number(item.harga || item.price || 28000),
      weight: item.weight || '450g',
    };

    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === itemBaru.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === itemBaru.id ? { ...p, quantity: (Number(p.quantity) || 1) + 1 } : p
        );
      } else {
        return [...prevCart, { ...itemBaru, quantity: 1 }];
      }
    });

    showToast(`1 pack ${itemBaru.name} dimasukkan ke keranjang`);
  };

  // Saat tombol "Pesan Sekarang" di Beranda diklik, buka katalog dan langsung buka detailnya
  const handlePesanDariBeranda = (product) => {
    setActiveTab('katalog');
    setSelectedDetailProduct(product);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
      return;
    }
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.id === productId ? { ...p, quantity: newQty } : p
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  const handleConfirmOrder = () => {
    setCart([]);
  };

  // Jika sedang membuka halaman Login, tampilkan UI Login penuh
  if (activeTab === 'login-owner') {
    return (
      <LoginOwner
        onKembali={() => setActiveTab('beranda')}
        onLoginSukses={() => {
          setActiveTab('beranda');
          setIsAdminOpen(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col font-sans selection:bg-[#FCD2BC] selection:text-[#5C200E]">
      
      {/* Notifikasi Toast UI */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#201815] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigasi Atas */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setActiveTab('login-owner')}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'beranda') {
            setSelectedDetailProduct(null);
          }
        }}
      />

      {/* Konten Halaman */}
      <main className="flex-1">
        {activeTab === 'katalog' ? (
          /* Halaman Katalog Produk */
          <Katalog 
            onTambahKeranjang={handleAddToCart}
            initialDetailProduct={selectedDetailProduct}
            onClearInitialDetail={() => setSelectedDetailProduct(null)}
          />
        ) : (
          /* Halaman Beranda Utama */
          <Beranda
            products={products}
            onPesanProduk={handlePesanDariBeranda}
            onBukaKatalog={() => setActiveTab('katalog')}
            onBukaTips={() => setIsTipsOpen(true)}
          />
        )}
      </main>

      {/* Bagian Footer */}
      <Footer
        onOpenAdmin={() => setActiveTab('login-owner')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTips={() => setIsTipsOpen(true)}
        isKatalogPage={activeTab === 'katalog'}
      />

      {/* Drawer Keranjang Belanja */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Modal Formulir Pemesanan WhatsApp */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Modal Panel Pengelola */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
      />

      {/* Modal Panduan Tips Menggoreng */}
      <TipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

    </div>
  );
}
