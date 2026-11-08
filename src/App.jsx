import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCatalog from './components/ProductCatalog';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminModal from './components/AdminModal';
import TipsModal from './components/TipsModal';
import Katalog from './pages/Katalog';
import { productsData } from './data/products';

export default function App() {
  const [products, setProducts] = useState(productsData);

  // Tab yang aktif: 'beranda' atau 'katalog'
  const [activeTab, setActiveTab] = useState('katalog');

  // Keranjang belanja dengan 3 item default sesuai gambar
  const [cart, setCart] = useState([
    { ...productsData[0], quantity: 1 },
    { ...productsData[1], quantity: 1 },
    { ...productsData[2], quantity: 1 },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tambah item ke keranjang
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.id === item.id);
      if (existing) {
        return prevCart.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...item, name: item.name || item.nama, quantity: 1, weight: '450g' }];
      }
    });
    showToast(`1 pack ${item.nama || item.name} ditambahkan ke keranjang`);
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

  const handleConfirmOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col font-sans selection:bg-[#FCD2BC] selection:text-[#5C200E]">
      
      {/* Notifikasi Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#201815] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Konten Halaman */}
      <main className="flex-1">
        {activeTab === 'katalog' ? (
          /* Halaman Katalog Khusus (sesuai gambar katalog baru) */
          <Katalog onTambahKeranjang={handleAddToCart} />
        ) : (
          /* Halaman Beranda / Landing Page */
          <>
            <Hero
              onExploreClick={() => setActiveTab('katalog')}
              onAboutClick={() => {
                document.getElementById('cerita')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <Features />
            <ProductCatalog
              products={products}
              onOrderProduct={(p) => {
                handleAddToCart(p);
                setIsCartOpen(true);
              }}
              onOpenTips={() => setIsTipsOpen(true)}
            />
            <CtaSection onStartOrder={() => setActiveTab('katalog')} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
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

      {/* Modal Formulir Pemesanan */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Modal Login Pengelola / Owner */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateStock={(id, stock) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, stock } : p))
          );
        }}
        orders={orders}
      />

      {/* Modal Panduan Tips Menggoreng */}
      <TipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

    </div>
  );
}
