import React from 'react';
import ProductCard from './ProductCard.jsx';
import { Crown, Sparkles } from 'lucide-react';

export const PRODUCTS_DATA = [
  {
    id: 'safa',
    categoryKey: 'safa',
    title: 'Safa (Leheriya Silk)',
    category: 'Safa (Royal Turban)',
    paletteKey: 'cream',
    description: 'Wave-dyed in spiralling bands, wound by hand into the prestigious Jodhpuri crown. Finished with an antique ruby kalgi brooch.',
    image: './assets/royal-card-safa.jpg',
    leadTime: '7-10 Days Custom Crafting',
    origin: 'Jodhpur, Rajasthan',
  },
  {
    id: 'achkan',
    categoryKey: 'achkan',
    title: 'Achkan (Raw Silk & Zari)',
    category: 'Achkan (Royal Jacket)',
    paletteKey: 'cream',
    description: 'Cut long and close to the body, collar and placket traced in 24k gold thread and finished with pure freshwater pearl buttons.',
    image: './assets/royal-card-sherwani.jpg',
    leadTime: '14-20 Days Master Tailoring',
    origin: 'Mewar, Rajasthan',
  },
  {
    id: 'dupatta',
    categoryKey: 'dupatta',
    title: 'Dupatta (Ceremonial Brocade)',
    category: 'Dupatta (Scarf)',
    paletteKey: 'red',
    description: 'Woven with scalloped gold zari borders, pleated softly over the shoulder to open into a radiating ceremonial sash in motion.',
    image: './assets/royal-card-odhni.jpg',
    leadTime: '10-14 Days Heritage Craft',
    origin: 'Bikaner, Rajasthan',
  },
  {
    id: 'mojari',
    categoryKey: 'mojari',
    title: 'Mojari (Hand-Embroidered Leather)',
    category: 'Mojari (Shoes)',
    paletteKey: 'gold',
    description: 'Curled at the toe, stitched without a single nail, intricately embroidered across the vamp in antique gold and coloured zari.',
    image: './assets/royal-card-mojari.jpg',
    leadTime: '5-7 Days Artisan Guild',
    origin: 'Jodhpur, Rajasthan',
  },
  {
    id: 'ghagra',
    categoryKey: 'ghagra',
    title: 'Ghagra (Gota-Patti Zari)',
    category: 'Ceremonial Drapes',
    paletteKey: 'red',
    description: 'Scalloped gold ribbon laid in radiating bands, pleated to the hem opens to a full circle in celebratory court motion.',
    image: './assets/royal-card-ghagra.jpg',
    leadTime: '18-24 Days Bespoke Stitching',
    origin: 'Jaipur, Rajasthan',
  },
];

export default function ProductGrid({ onEnquire, onDrape, activeOutfit }) {
  return (
    <section id="collection" className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/10 border border-amber-900/15 mb-4 text-xs uppercase tracking-widest font-bold text-amber-950">
          <Crown className="w-3.5 h-3.5 text-amber-900" />
          <span>Curated Royal Regalia</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
          Worn by royalty, made by hand
        </h2>

        <p className="text-base sm:text-lg text-neutral-900/80 leading-relaxed font-normal">
          Click any piece thumbnail or button to instantly preview that garment draped seamlessly onto the royal owl avatar above.
        </p>
      </div>

      {/* Product Showcase Grid: Safa, Achkan, Dupatta, Mojari */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {PRODUCTS_DATA.slice(0, 4).map((product, index) => {
          const isDraped =
            (product.categoryKey === 'safa' && activeOutfit?.safaKey === product.paletteKey) ||
            (product.categoryKey === 'achkan' && activeOutfit?.achkanKey === product.paletteKey) ||
            (product.categoryKey === 'dupatta' && activeOutfit?.dupattaKey === product.paletteKey) ||
            (product.categoryKey === 'mojari' && activeOutfit?.mojariKey === product.paletteKey);

          return (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isDraped={isDraped}
              onEnquire={onEnquire}
              onDrape={onDrape}
            />
          );
        })}
      </div>

      {/* Additional Heirloom Item Banner */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fdf6e7]/90 rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-md">
        <div className="md:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden bg-amber-950/5">
          <img
            src={PRODUCTS_DATA[4].image}
            alt={PRODUCTS_DATA[4].title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="md:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-amber-900 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Regalia Highlight</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              {PRODUCTS_DATA[4].title}
            </h3>
            <p className="text-sm text-neutral-800 leading-relaxed mb-6">
              {PRODUCTS_DATA[4].description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onDrape(PRODUCTS_DATA[4])}
              className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-950 text-[#F3DFB2] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Drape Ceremonial Colors</span>
            </button>
            <button
              type="button"
              onClick={() => onEnquire(PRODUCTS_DATA[4])}
              className="px-6 py-3 rounded-full bg-amber-950/10 hover:bg-amber-950/20 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all border border-amber-900/20"
            >
              <span>Enquire About Piece</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
