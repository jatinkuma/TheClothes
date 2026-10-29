import React, { useState } from 'react';
import ButterflyCursor from './components/ButterflyCursor.jsx';
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import RoyalStylist, { ROYAL_PRESETS } from './components/RoyalStylist.jsx';
import AtelierHeritage from './components/AtelierHeritage.jsx';
import Footer from './components/Footer.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Central Character Attire State
  const [outfit, setOutfit] = useState({
    safaKey: ROYAL_PRESETS[0].safa.key,
    achkanKey: ROYAL_PRESETS[0].achkan.key,
    dupattaKey: ROYAL_PRESETS[0].dupatta.key,
    mojariKey: ROYAL_PRESETS[0].mojari.key,
    safaColorName: ROYAL_PRESETS[0].safa.name,
    achkanColorName: ROYAL_PRESETS[0].achkan.name,
    dupattaColorName: ROYAL_PRESETS[0].dupatta.name,
    title: ROYAL_PRESETS[0].name,
    safaHue: 0,
    achkanHue: 0,
    dupattaHue: 0,
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Drape product from Product Grid onto avatar
  const handleDrapeProduct = (product) => {
    const nextOutfit = { ...outfit };
    if (product.categoryKey === 'safa') {
      nextOutfit.safaKey = product.paletteKey || 'cream';
      nextOutfit.safaColorName = product.title;
      nextOutfit.title = `${product.title} Regalia`;
    } else if (product.categoryKey === 'achkan') {
      nextOutfit.achkanKey = product.paletteKey || 'cream';
      nextOutfit.achkanColorName = product.title;
      nextOutfit.title = `${product.title} Attire`;
    } else if (product.categoryKey === 'dupatta' || product.categoryKey === 'ghagra') {
      nextOutfit.dupattaKey = product.paletteKey || 'red';
      nextOutfit.dupattaColorName = product.title;
      nextOutfit.title = `${product.title} Ensemble`;
    } else if (product.categoryKey === 'mojari') {
      nextOutfit.mojariKey = product.paletteKey || 'gold';
      nextOutfit.title = `${product.title} Collection`;
    }

    setOutfit(nextOutfit);
    showToast(`Draped "${product.title}" onto the Royal Avatar ✨`);
  };

  // Update outfit from Royal Stylist AI Panel
  const handleUpdateOutfit = (updated) => {
    setOutfit(updated);
    showToast(`Applied "${updated.title || 'Royal Ensemble'}" to Avatar 👑`);
  };

  // Enquire custom combination from Stylist
  const handleEnquireCombination = (combo) => {
    setSelectedProduct({
      id: 'custom-regalia',
      title: combo.title || 'Bespoke Royal Attire Ensemble',
      category: 'Bespoke Haute Couture',
      description: `Custom curated ensemble featuring ${combo.safa} Safa, ${combo.achkan} Achkan, and ${combo.dupatta} Dupatta, hand-embroidered by royal karigars.`,
      image: './assets/royal-owl-statue-center.png',
      leadTime: '21-28 Days Master Atelier Crafting',
      origin: 'Chandpole, Jaipur & Mewar Guilds',
    });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStylist = () => {
    const el = document.getElementById('royal-stylist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EA9B1B] text-[#140D08] flex flex-col relative selection:bg-[#7F1D1D] selection:text-white">
      {/* 3. Antigravity Color-Changing Butterfly Custom Cursor */}
      <ButterflyCursor />

      {/* Header with Royal Crown Logo, Nav Links & Social Icons */}
      <Header />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-neutral-900/95 text-[#F3DFB2] text-xs sm:text-sm font-semibold tracking-wide border border-amber-500/30 shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Showcase Hero Section with 3D Owl Mascot, Breathing & Head Tracking */}
      <main className="flex-grow">
        <HeroSection
          onExploreClick={handleExploreClick}
          onOpenStylist={handleOpenStylist}
          outfit={outfit}
          onSelectGarment={handleDrapeProduct}
        />

        {/* 2. Product Showcase Grid with Interactive Dress-Up Live Preview */}
        <ProductGrid
          activeOutfit={outfit}
          onDrape={handleDrapeProduct}
          onEnquire={(product) => setSelectedProduct(product)}
        />

        {/* 4. NEW SECTION: "THE ROYAL STYLIST" (AI CUSTOMIZATION PANEL) */}
        <RoyalStylist
          outfit={outfit}
          onUpdateOutfit={handleUpdateOutfit}
          onEnquireCombination={handleEnquireCombination}
        />

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
