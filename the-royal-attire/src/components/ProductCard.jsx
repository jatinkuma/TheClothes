import React from 'react';
import { Sparkles, MessageCircle, Check } from 'lucide-react';

export default function ProductCard({ product, index, isDraped, onEnquire, onDrape }) {
  return (
    <div className={`group relative bg-[#fdf6e7]/90 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 ${
      isDraped
        ? 'border-amber-700 shadow-xl ring-2 ring-amber-500/40'
        : 'border-amber-900/15 shadow-md hover:shadow-2xl'
    }`}>
      
      {/* Top Image Box (Clicking image instantly drapes onto avatar) */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-amber-950/5 cursor-pointer"
        onClick={() => onDrape(product)}
        title="Click to instantly drape onto avatar"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Index Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-neutral-900/85 backdrop-blur-md text-[#F3DFB2] font-mono text-[11px] font-bold tracking-wider shadow">
          0{index + 1}
        </div>

        {/* Draped State / Try-On Badge */}
        <div className="absolute top-3 right-3">
          {isDraped ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-800 text-white font-bold text-xs shadow-md">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>Draped</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-950 font-semibold text-xs border border-amber-900/15 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-800" />
              <span>Try On</span>
            </span>
          )}
        </div>

        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-xs font-semibold tracking-wider flex items-center gap-1 drop-shadow">
            <Sparkles className="w-3 h-3 text-amber-300" /> Click to drape onto avatar
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold mb-1">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>{product.category}</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-amber-950 transition-colors mb-2">
            {product.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal mb-5 line-clamp-3">
            {product.description}
          </p>
        </div>

        {/* Action Buttons: Instant Drape & Enquire */}
        <div className="flex flex-col gap-2 pt-2 border-t border-amber-900/10">
          <button
            type="button"
            onClick={() => onDrape(product)}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
              isDraped
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-amber-950/10 hover:bg-amber-950/20 text-neutral-950 border border-amber-900/20'
            }`}
          >
            {isDraped ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Currently on Avatar</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Drape on Avatar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onEnquire(product)}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-950 active:scale-[0.98] text-[#F3DFB2] text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 border border-amber-600/20"
          >
            <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Enquire about piece</span>
          </button>
        </div>
      </div>

      {/* Card Border Hover Accent */}
      <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 transition-opacity duration-300 ${isDraped ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
    </div>
  );
}
