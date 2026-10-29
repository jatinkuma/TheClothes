import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function ProductCard({ product, index, onEnquire }) {
  return (
    <div className="group relative bg-[#fdf6e7]/90 rounded-2xl overflow-hidden border border-amber-900/15 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5">
      
      {/* Top Image Box */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-950/5">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Index Badge */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-neutral-900/85 backdrop-blur-md text-[#F3DFB2] font-mono text-xs font-bold tracking-wider shadow">
          0{index + 1}
        </div>

        {/* Craft Tag */}
        <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-600/30 backdrop-blur-md text-amber-950 text-xs font-semibold tracking-wide">
          Handcrafted
        </div>

        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Details */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold mb-1.5">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>{product.category}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-amber-950 transition-colors mb-3">
            {product.title}
          </h3>

          <p className="text-sm text-neutral-800 leading-relaxed font-normal mb-6">
            {product.description}
          </p>
        </div>

        {/* Action Button: Enquire about this piece */}
        <button
          type="button"
          onClick={() => onEnquire(product)}
          className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-950 active:scale-[0.98] text-[#F3DFB2] text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-amber-600/20 group/btn"
        >
          <MessageCircle className="w-4 h-4 text-amber-400 group-hover/btn:scale-110 transition-transform" />
          <span>Enquire about this piece</span>
        </button>
      </div>

      {/* Card Border Hover Accent */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

