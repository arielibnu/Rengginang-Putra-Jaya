import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCatalog from '../components/ProductCatalog';
import CtaSection from '../components/CtaSection';

// Halaman Beranda Utama (Landing Page)
export default function Beranda({ products, onPesanProduk, onBukaKatalog, onBukaTips }) {
  return (
    <div>
      {/* 1. Bagian Banner Hero Atas */}
      <Hero
        onExploreClick={onBukaKatalog}
        onAboutClick={() => {
          document.getElementById('cerita')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Bagian Cerita UMKM & 3 Kartu Keunggulan */}
      <Features />

      {/* 3. Bagian Preview 4 Varian Rengginang */}
      <ProductCatalog
        products={products}
        onOrderProduct={onPesanProduk}
        onOpenTips={onBukaTips}
      />

      {/* 4. Bagian Ajakan Belanja Tanpa Repot & Kontak WhatsApp */}
      <CtaSection onStartOrder={onBukaKatalog} />
    </div>
  );
}
