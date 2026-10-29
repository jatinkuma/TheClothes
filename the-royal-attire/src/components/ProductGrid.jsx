import React from 'react';
import ProductCard from './ProductCard.jsx';
import { Crown, Sparkles } from 'lucide-react';

export const PRODUCTS_DATA = [
  {
    id: 'safa',
    title: 'Safa (Leheriya Silk)',
    category: 'Royal Turban',
    description: 'Wave-dyed in spiralling bands, wound by hand into the Jodhpuri crown. Finished with a ruby kalgi.',
    image: './assets/royal-card-safa.jpg',
    leadTime: '7-10 Days Custom Crafting',
    origin: 'Jodhpur, Rajasthan',
  },
  {
    id: 'ghagra',
    title: 'Ghagra (Gota-Patti Zari)',
    category: 'Ceremonial Drapes',
    description: 'Scalloped gold ribbon laid in radiating bands, pleated to the hem opens to a full circle in motion.',
    image: './assets/royal-card-ghagra.jpg',
    leadTime: '18-24 Days Bespoke Stitching',
    origin: 'Jaipur, Rajasthan',
  },
  {
    id: 'mojari',
    title: 'Mojari (Hand-Embroidered Leather)',
    category: 'Footwear',
    description: 'Curled at the toe, stitched without a single nail, embroidered across the vamp in coloured zari.',
    image: './assets/royal-card-mojari.jpg',
    leadTime: '5-7 Days Artisan Guild',
    origin: 'Jodhpur, Rajasthan',
  },
  {
    id: 'achkan',
    title: 'Achkan (Raw Silk & Zari)',
    category: 'Imperial Coat',
    description: 'Cut long and close to the body, collar and placket traced in fine gold thread.',
    image: './assets/royal-card-sherwani.jpg',
    leadTime: '14-20 Days Master Tailoring',
    origin: 'Mewar, Rajasthan',
  },
  {
    id: 'odhni',
    title: 'Odhni (Bandhani Tie-Dye)',
    category: 'Silk Veil',
    description: 'Thousands of points tied by fingertip before dyeing, each dot opening into a perfect white circle.',
    image: './assets/royal-card-odhni.jpg',
    leadTime: '10-14 Days Heritage Craft',
    origin: 'Bikaner, Rajasthan',
  },
];

export default function ProductGrid({ onEnquire }) {
  return (
    <section id="collection" className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/10 border border-amber-900/15 mb-4 text-xs uppercase tracking-widest font-bold text-amber-950">
          <Crown className="w-3.5 h-3.5 text-amber-900" />
          <span>Curated Regalia</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
          Worn by royalty, made by hand
        </h2>

        <p className="text-base sm:text-lg text-neutral-900/80 leading-relaxed font-normal">
          Each creation in this showcase is an artisanal heirloom, woven and hand-finished in our Chandpole atelier by hereditary master craftsmen.
        </p>
      </div>

      {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {PRODUCTS_DATA.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onEnquire={onEnquire}
          />
        ))}
      </div>

      {/* Atelier Banner Quote */}
      <div className="mt-16 p-8 rounded-3xl bg-[#fdf6e7]/70 border border-amber-900/15 text-center flex flex-col items-center max-w-4xl mx-auto shadow-sm">
        <Sparkles className="w-6 h-6 text-amber-700 mb-3" />
        <p className="font-serif italic text-lg sm:text-xl text-neutral-900 max-w-2xl mb-2">
          &ldquo;True royal craft does not rush. It lives in the quiet rhythm of the hand, the golden thread, and the patience of generations.&rdquo;
        </p>
        <span className="text-xs uppercase tracking-widest font-bold text-amber-950/80">
          — The Royal Ateliers of Chandpole
        </span>
      </div>

    </section>
  );
}

