import React from 'react';
import OwlStage from './OwlStage.jsx';
import { ArrowDown, Sparkles, Compass, Wand2 } from 'lucide-react';

export default function HeroSection({ onExploreClick, onOpenStylist, outfit, onSelectGarment }) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center pt-8 pb-16 px-6 overflow-hidden">
      
      {/* Decorative Subtle Background Ornaments */}
      <div className="absolute top-12 left-8 md:left-24 text-amber-950/15 font-serif text-8xl md:text-9xl select-none pointer-events-none font-bold">
        ✦
      </div>
      <div className="absolute bottom-16 right-8 md:right-24 text-amber-950/15 font-serif text-8xl md:text-9xl select-none pointer-events-none font-bold">
        ✦
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headings & Brand Heritage */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/10 border border-amber-900/15 mb-6 text-xs uppercase tracking-widest font-bold text-amber-950">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-800 animate-ping" />
            <span>Autumn &bull; Winter Regal Atelier</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.08] mb-4">
            THE COLLECTION
          </h1>

          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-amber-950/90 font-medium mb-6">
            &ldquo;Worn by royalty, made by hand&rdquo;
          </p>

          <p className="text-base sm:text-lg text-neutral-900/80 max-w-xl mb-8 leading-relaxed font-normal">
            Immerse yourself in authentic Rajasthani regalia, sculpted with centuries-old gold gota-patti embroidery, hand-wound leheriya turbans, and heirloom zardozi silks crafted by master karigars of the royal court.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-900 hover:bg-neutral-950 text-[#F3DFB2] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3 border border-amber-500/20"
            >
              <span>Explore The Pieces</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
            </button>

            <button
              type="button"
              onClick={onOpenStylist}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-amber-950/10 hover:bg-amber-950/20 text-neutral-950 font-semibold text-sm tracking-wider uppercase transition-all duration-300 border border-amber-900/20 flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-amber-900" />
              <span>The Royal Stylist (AI)</span>
            </button>
          </div>

          {/* Luxury Highlights Bar */}
          <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-amber-900/15 w-full max-w-md">
            <div>
              <div className="font-serif text-2xl font-bold text-neutral-950">100%</div>
              <div className="text-xs uppercase tracking-wider text-neutral-800 font-semibold mt-0.5">Hand-Stitched</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-neutral-950">24k</div>
              <div className="text-xs uppercase tracking-wider text-neutral-800 font-semibold mt-0.5">Gold Zari</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-bold text-neutral-950">Mewar</div>
              <div className="text-xs uppercase tracking-wider text-neutral-800 font-semibold mt-0.5">Tradition</div>
            </div>
          </div>
        </div>

        {/* Right Column: Centerpiece 3D Animated Owl Avatar with Interactive Dress-Up */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <OwlStage outfit={outfit} onSelectGarment={onSelectGarment} />
        </div>

      </div>
    </section>
  );
}
