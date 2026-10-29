import React from 'react';
import { Crown, Sparkles, Award, ShieldCheck } from 'lucide-react';

export default function AtelierHeritage() {
  const pillars = [
    {
      icon: Crown,
      title: 'Imperial Lineage',
      desc: 'Designs inspired directly by archives from the Mehrangarh and City Palace royal wardrobes.',
    },
    {
      icon: Sparkles,
      title: '24k Zari & Gota-Patti',
      desc: 'Real gold and silver flattened ribbon hand-sewn into scalloped architectural borders.',
    },
    {
      icon: Award,
      title: 'Master Karigars',
      desc: 'Generational guild artisans preserving endangered hand-dyeing and zardozi techniques.',
    },
    {
      icon: ShieldCheck,
      title: 'Heirloom Guarantee',
      desc: 'Every piece is accompanied by a certificate of origin and royal provenance.',
    },
  ];

  return (
    <section id="heritage" className="py-20 px-6 max-w-7xl mx-auto border-t border-amber-900/15">
      
      {/* Heritage Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/10 border border-amber-900/15 text-xs uppercase tracking-widest font-bold text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Since 1887 &bull; Chandpole</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
            Preserving Rajasthan&apos;s Living Sartorial Legacy
          </h2>

          <p className="text-base sm:text-lg text-neutral-900/80 leading-relaxed">
            In the shadowed havelis behind Chandpole Gate, the clang of wooden looms and the shimmer of real silver ribbon have endured through centuries. Our atelier bridges regal history with contemporary silhouette.
          </p>

          <p className="text-sm text-neutral-800 leading-relaxed">
            From the spiralling pastel bands of Jodhpur leheriya to the geometric grandeur of royal achkans, each garment is commissioned individually to honour the patron and the craft.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#fdf6e7]/80 border border-amber-900/15 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-950/10 flex items-center justify-center text-amber-900">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

