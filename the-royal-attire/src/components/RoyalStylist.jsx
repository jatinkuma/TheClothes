import React, { useState, useRef } from 'react';
import { Sparkles, Wand2, Crown, Sliders, Check, RefreshCw, Palette, Info } from 'lucide-react';

// Royal Color Presets
export const ROYAL_PRESETS = [
  {
    id: 'coronation',
    name: "The Maharaja's Coronation",
    subtitle: 'Ceremonial State Regalia',
    safa: { key: 'cream', hue: 42, name: 'Imperial Ivory & Kalgi', hex: '#F3DFB2' },
    achkan: { key: 'cream', hue: 42, name: 'Raw Silk with 24k Zari', hex: '#FDF6E7' },
    dupatta: { key: 'red', hue: 0, name: 'Jaipur Ruby & Gold Brocade', hex: '#8B1818' },
    mojari: { key: 'gold', name: 'Curled Gold Leather', hex: '#D4AF37' },
    insight: 'A sacred combination reserved for coronations: pure ivory symbolizes truth and sovereignty, while ruby red accents honor royal valor and victory.',
  },
  {
    id: 'mewar-starlight',
    name: 'The Mewar Starlight',
    subtitle: 'Celestial Evening Court',
    safa: { key: 'blue', hue: 215, name: 'Sapphire Jodhpuri Silk', hex: '#1E3A8A' },
    achkan: { key: 'blue', hue: 215, name: 'Royal Blue Brocade', hex: '#172554' },
    dupatta: { key: 'gold', hue: 45, name: 'Pure 24k Gold Zari Stole', hex: '#F59E0B' },
    mojari: { key: 'blue', name: 'Navy Velvet with Zari', hex: '#1E3A8A' },
    insight: 'Deep celestial lapis blue paired with gleaming gold zari mirrors the starlit skies over Lake Pichola, historically worn by princes during autumn court banquets.',
  },
  {
    id: 'garden-gala',
    name: 'The Royal Garden Gala',
    subtitle: 'Heritage Spring Festivities',
    safa: { key: 'green', hue: 145, name: 'Emerald Heritage Silk', hex: '#065F46' },
    achkan: { key: 'green', hue: 145, name: 'Deep Emerald Court Sherwani', hex: '#064E3B' },
    dupatta: { key: 'red', hue: 350, name: 'Crimson Rose Silk', hex: '#991B1B' },
    mojari: { key: 'emerald', name: 'Emerald Embroidered Mojari', hex: '#065F46' },
    insight: 'Rich emerald green celebrates fertility, abundance, and regal grace, accented with crimson rose borders inspired by the fragrant Mughal pleasure gardens.',
  },
  {
    id: 'jodhpur-sunbreak',
    name: 'The Jodhpur Sunbreak',
    subtitle: 'Sunrise Procession Regalia',
    safa: { key: 'red', hue: 15, name: 'Saffron Amber Leheriya', hex: '#EA580C' },
    achkan: { key: 'cream', hue: 40, name: 'Warm Cream Silk', hex: '#FEF3C7' },
    dupatta: { key: 'red', hue: 15, name: 'Flaming Amber Dupatta', hex: '#C2410C' },
    mojari: { key: 'gold', name: 'Saffron Toe Mojari', hex: '#F59E0B' },
    insight: 'Saffron orange and amber represent the sacred rising sun over the Mehrangarh Fort walls, embodying dynamic leadership, warmth, and noble hospitality.',
  },
];

export const COLOR_SWATCHES = [
  { name: 'Imperial Ivory', key: 'cream', hue: 42, hex: '#F5E6C8' },
  { name: 'Ruby Crimson', key: 'red', hue: 0, hex: '#8B1818' },
  { name: 'Sapphire Blue', key: 'blue', hue: 215, hex: '#1E3A8A' },
  { name: 'Mewar Emerald', key: 'green', hue: 145, hex: '#065F46' },
  { name: 'Amber Gold', key: 'gold', hue: 35, hex: '#D97706' },
  { name: 'Midnight Plum', key: 'plum', hue: 280, hex: '#4C1D95' },
];

export default function RoyalStylist({ outfit, onUpdateOutfit, onEnquireCombination }) {
  const [activeTab, setActiveTab] = useState('safa'); // 'safa' | 'achkan' | 'dupatta' | 'mojari'
  const [isAiConsulting, setIsAiConsulting] = useState(false);
  const [activePreset, setActivePreset] = useState(ROYAL_PRESETS[0]);
  const [customHues, setCustomHues] = useState({
    safa: 0,
    achkan: 0,
    dupatta: 0,
  });
  const canvasRef = useRef(null);

  // Trigger magical particle explosion
  const triggerMagicalParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const colors = ['#FFD700', '#FFA500', '#FF4500', '#00E5FF', '#E040FB', '#FFFFFF', '#76FF03'];

    // Spawn 80 magical sparkle stars
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 5 + 2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        decay: Math.random() * 0.02 + 0.012,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    let frameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;

          // Draw 4-point golden diamond star
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size * 0.5, -p.size * 0.5);
          ctx.lineTo(p.size * 1.6, 0);
          ctx.lineTo(p.size * 0.5, p.size * 0.5);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineTo(-p.size * 0.5, p.size * 0.5);
          ctx.lineTo(-p.size * 1.6, 0);
          ctx.lineTo(-p.size * 0.5, -p.size * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }

      if (particles.length > 0) {
        frameId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    frameId = requestAnimationFrame(animate);
  };

  // Ask AI for Royal Match Handler
  const handleAskAi = () => {
    setIsAiConsulting(true);
    triggerMagicalParticles();

    // Select a distinct random preset or generate harmony
    setTimeout(() => {
      const otherPresets = ROYAL_PRESETS.filter((p) => p.id !== activePreset.id);
      const chosen = otherPresets[Math.floor(Math.random() * otherPresets.length)] || ROYAL_PRESETS[0];

      setActivePreset(chosen);
      onUpdateOutfit({
        safaKey: chosen.safa.key,
        achkanKey: chosen.achkan.key,
        dupattaKey: chosen.dupatta.key,
        mojariKey: chosen.mojari.key,
        safaColorName: chosen.safa.name,
        achkanColorName: chosen.achkan.name,
        dupattaColorName: chosen.dupatta.name,
        title: chosen.name,
      });

      setIsAiConsulting(false);
      triggerMagicalParticles();
    }, 650);
  };

  // Preset Selection Handler
  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    onUpdateOutfit({
      safaKey: preset.safa.key,
      achkanKey: preset.achkan.key,
      dupattaKey: preset.dupatta.key,
      mojariKey: preset.mojari.key,
      safaColorName: preset.safa.name,
      achkanColorName: preset.achkan.name,
      dupattaColorName: preset.dupatta.name,
      title: preset.name,
    });
    triggerMagicalParticles();
  };

  // Swatch Selection Handler
  const handleSelectSwatch = (targetItem, swatch) => {
    const nextOutfit = { ...outfit };
    if (targetItem === 'safa') {
      nextOutfit.safaKey = swatch.key;
      nextOutfit.safaColorName = swatch.name;
    } else if (targetItem === 'achkan') {
      nextOutfit.achkanKey = swatch.key;
      nextOutfit.achkanColorName = swatch.name;
    } else if (targetItem === 'dupatta') {
      nextOutfit.dupattaKey = swatch.key;
      nextOutfit.dupattaColorName = swatch.name;
    } else if (targetItem === 'mojari') {
      nextOutfit.mojariKey = swatch.key;
      nextOutfit.mojariColorName = swatch.name;
    }
    onUpdateOutfit(nextOutfit);
  };

  // Slider change
  const handleSliderChange = (targetItem, val) => {
    setCustomHues((prev) => ({ ...prev, [targetItem]: val }));
    onUpdateOutfit({
      ...outfit,
      [`${targetItem}Hue`]: val,
    });
  };

  return (
    <section id="royal-stylist" className="relative py-24 px-6 bg-[#E39316] border-y border-amber-950/20 overflow-hidden">
      
      {/* Background Royal Texture & Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EA9B1B]/40 via-transparent to-[#D98711]/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-950/5 font-serif text-[280px] sm:text-[380px] select-none pointer-events-none font-bold">
        👑
      </div>

      {/* Particle Canvas for Magical AI Sparkles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      <div className="max-w-7xl mx-auto relative z-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/15 border border-amber-900/20 mb-4 text-xs uppercase tracking-widest font-bold text-amber-950 shadow-sm">
            <Wand2 className="w-3.5 h-3.5 text-amber-900 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Regal Customization</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
            THE ROYAL STYLIST
          </h2>

          <p className="text-base sm:text-lg text-neutral-900/80 leading-relaxed font-normal">
            Bespoke regalia customization powered by authentic court aesthetics. Mix and match ceremonial silks, or invite our AI Karigar to curate a harmonized royal ensemble for the owl mascot.
          </p>
        </div>

        {/* AI Action Header Banner */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-[#F3DFB2] shadow-2xl border border-amber-500/30">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
              <Crown className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                AI Court Harmony Engine
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                Trained on 400 years of Mewar, Jaipur, and Marwar coronation archives to balance sacred contrast, status, and occasion.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAskAi}
            disabled={isAiConsulting}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 border border-amber-300/60 disabled:opacity-75 disabled:pointer-events-none group"
          >
            <Sparkles className={`w-5 h-5 text-neutral-950 ${isAiConsulting ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
            <span>{isAiConsulting ? 'Consulting Karigars...' : 'Ask AI for Royal Match'}</span>
          </button>
        </div>

        {/* Main Customization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset Harmonized Collections (5 cols) */}
          <div className="lg:col-span-5 bg-[#fdf6e7]/90 rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-900/10">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-900" />
                <h3 className="font-serif text-xl font-bold text-neutral-950">
                  Curated Royal Palettes
                </h3>
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-amber-900/70">
                1-Click Styling
              </span>
            </div>

            <div className="space-y-4">
              {ROYAL_PRESETS.map((preset) => {
                const isSelected = activePreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col gap-3 relative ${
                      isSelected
                        ? 'bg-white border-amber-700 shadow-md ring-2 ring-amber-600/30'
                        : 'bg-white/60 border-amber-900/10 hover:bg-white hover:border-amber-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base text-neutral-900">
                          {preset.name}
                        </h4>
                        <span className="text-xs text-amber-950/80 font-medium">
                          {preset.subtitle}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-2 pt-1 border-t border-amber-950/5">
                      <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                        Palette:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-900/20 shadow-sm"
                          style={{ backgroundColor: preset.safa.hex }}
                          title={`Safa: ${preset.safa.name}`}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-900/20 shadow-sm"
                          style={{ backgroundColor: preset.achkan.hex }}
                          title={`Achkan: ${preset.achkan.name}`}
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-neutral-900/20 shadow-sm"
                          style={{ backgroundColor: preset.dupatta.hex }}
                          title={`Dupatta: ${preset.dupatta.name}`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* AI Insight Callout Card */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-900/10 border border-amber-900/15 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block mb-1">
                  Court Significance & Insight
                </span>
                <p className="text-xs text-neutral-800 leading-relaxed font-normal">
                  {activePreset.insight}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mix & Match Fine Tuning Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#fdf6e7]/90 rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-900/10">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-900" />
                  <h3 className="font-serif text-xl font-bold text-neutral-950">
                    Bespoke Mix & Match Atelier
                  </h3>
                </div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  Live Preview Linked
                </span>
              </div>

              {/* Garment Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-amber-950/10 mb-8">
                {[
                  { id: 'safa', label: '1. Safa', sub: 'Turban' },
                  { id: 'achkan', label: '2. Achkan', sub: 'Coat' },
                  { id: 'dupatta', label: '3. Dupatta', sub: 'Scarf' },
                  { id: 'mojari', label: '4. Mojari', sub: 'Shoes' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                      activeTab === tab.id
                        ? 'bg-neutral-900 text-[#F3DFB2] shadow-md'
                        : 'text-neutral-800 hover:text-neutral-950 hover:bg-white/40'
                    }`}
                  >
                    <div>{tab.label}</div>
                    <div className="text-[10px] font-normal opacity-75">{tab.sub}</div>
                  </button>
                ))}
              </div>

              {/* Swatch Color Grid */}
              <div className="mb-8">
                <label className="text-xs uppercase tracking-widest font-bold text-neutral-800 block mb-3">
                  Select {activeTab.toUpperCase()} Silk Tone:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {COLOR_SWATCHES.map((swatch) => {
                    const currentKey = outfit[`${activeTab}Key`] || 'cream';
                    const isSelected = currentKey === swatch.key;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => handleSelectSwatch(activeTab, swatch)}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                          isSelected
                            ? 'bg-white border-amber-800 shadow-md ring-2 ring-amber-600/40 scale-105'
                            : 'bg-white/50 border-amber-900/10 hover:bg-white hover:border-amber-900/30'
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-full border border-neutral-900/20 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-800 text-center leading-tight">
                          {swatch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fine Hue Slider */}
              <div className="p-5 rounded-2xl bg-white/70 border border-amber-900/10 mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-neutral-800">
                    Fine Dye Hue Angle Adjustment
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900">
                    {customHues[activeTab] || 0}&deg;
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={customHues[activeTab] || 0}
                  onChange={(e) => handleSliderChange(activeTab, parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-800 bg-gradient-to-r from-red-500 via-green-500 via-blue-500 to-red-500"
                />
                <span className="text-[11px] text-neutral-600 mt-1 block">
                  Simulates proprietary vegetable dye bath nuances (Manjistha, Neel, Haldi).
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-amber-900/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">
                  Active Draped Ensemble:
                </div>
                <div className="font-serif font-bold text-lg text-neutral-950">
                  {outfit.title || activePreset.name}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onEnquireCombination({
                  title: outfit.title || activePreset.name,
                  safa: outfit.safaColorName || activePreset.safa.name,
                  achkan: outfit.achkanColorName || activePreset.achkan.name,
                  dupatta: outfit.dupattaColorName || activePreset.dupatta.name,
                })}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-950 text-[#F3DFB2] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-amber-500/20"
              >
                <span>Enquire This Custom Ensemble</span>
                <Crown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

