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
import { productsData } from './data/products';

export default function App() {
  const [products, setProducts] = useState(productsData);

  // Initial cart with 3 items matching the badge "3" in the screenshot
  const [cart, setCart] = useState([
    { ...productsData[0], quantity: 1 },
    { ...productsData[1], quantity: 1 },
    { ...productsData[2], quantity: 1 },
  ]);

  const [activeTab, setActiveTab] = useState('hero');
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

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`1 bks ${product.name} dimasukkan ke keranjang`);
  };

  const handleOrderNow = (product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);

    // Decrement stock for ordered items
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const orderedItem = orderData.items.find((item) => item.id === p.id);
        if (orderedItem) {
          const nextStock = Math.max(0, p.stock - orderedItem.quantity);
          return {
            ...p,
            stock: nextStock,
            stockWarning: nextStock <= 5,
          };
        }
        return p;
      })
    );

    // Clear cart
    setCart([]);
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stock: newStock, stockWarning: newStock <= 5 }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col font-sans selection:bg-[#FCD2BC] selection:text-[#5C200E]">
      
      {/* Toast Notification */}
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
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            setActiveTab('katalog');
            document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onAboutClick={() => {
            document.getElementById('cerita')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Cerita UMKM & Features */}
        <Features />

        {/* 4 Varian Rengginang Catalog */}
        <ProductCatalog
          products={products}
          onOrderProduct={handleOrderNow}
          onOpenTips={() => setIsTipsOpen(true)}
        />

        {/* Belanja Tanpa Repot CTA */}
        <CtaSection
          onStartOrder={() => {
            setActiveTab('katalog');
            document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTips={() => setIsTipsOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Admin / Mas Ifur Login & Stock Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateStock={handleUpdateStock}
        orders={orders}
      />

      {/* Tips Menggoreng & Info Grosir Modal */}
      <TipsModal
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

    </div>
  );
}

