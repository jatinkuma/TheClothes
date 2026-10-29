import React, { useState } from 'react';
import ButterflyCursor from './components/ButterflyCursor.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import AtelierHeritage from './components/AtelierHeritage.jsx';
import Footer from './components/Footer.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleExploreClick = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EA9B1B] text-[#140D08] flex flex-col relative selection:bg-[#7F1D1D] selection:text-white">
      {/* Animated Fluttering Blue Butterfly Custom Cursor */}
      <ButterflyCursor />

      {/* Header with Royal Crown Logo, Nav Links & Social Icons */}
      <Header />

      {/* Main Showcase Hero Section with 3D Owl Mascot & Main Heading */}
      <main className="flex-grow">
        <HeroSection onExploreClick={handleExploreClick} />

        {/* Product Showcase Grid with 5 Required Royal Attire Pieces */}
        <ProductGrid onEnquire={(product) => setSelectedProduct(product)} />

        {/* Atelier & Heritage Section */}
        <AtelierHeritage />
      </main>

      {/* Footer with Showroom Details & Copyright */}
      <Footer />

      {/* Interactive Bespoke Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

