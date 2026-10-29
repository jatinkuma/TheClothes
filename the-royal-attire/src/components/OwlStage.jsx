import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Crown, Check, Eye } from 'lucide-react';

/**
 * Advanced Realistic 3D Animated Animal Avatar (Royal Rajasthani Owl)
 * Features:
 * 1. Lifelike breathing movements (rhythmic chest expansion/inhalation).
 * 2. Natural blinking eyes (periodic randomized human-like double & single blinks).
 * 3. Continuous subtle head-swaying / tilt effect following the cursor coordinates.
 * 4. Interactive Dress-Up System: Live horizontal dress-up preview for Safa, Achkan, Dupatta, and Mojari.
 */
export default function OwlStage({ outfit, onSelectGarment }) {
  const containerRef = useRef(null);
  const [headAngle, setHeadAngle] = useState('center'); // 'far-left' | 'left' | 'center' | 'right' | 'far-right'
  const [isBlinking, setIsBlinking] = useState(false);
  const [transformState, setTransformState] = useState({ rotY: 0, rotX: 0, transX: 0, tiltZ: 0 });
  const [breathState, setBreathState] = useState({ scaleY: 1, scaleX: 1, breathY: 0 });
  const [activeDrapedItem, setActiveDrapedItem] = useState('achkan');

  // Interactive Dress-Up Quick Grid Data
  const DRESS_UP_ITEMS = [
    {
      id: 'safa',
      title: 'Safa',
      sub: 'Leheriya Turban',
      thumbnail: './assets/royal-card-safa.jpg',
      palette: 'cream',
      alt: 'Royal Rajasthani Safa Turban',
    },
    {
      id: 'achkan',
      title: 'Achkan',
      sub: 'Royal Zari Jacket',
      thumbnail: './assets/royal-card-sherwani.jpg',
      palette: 'cream',
      alt: 'Handcrafted Imperial Achkan Sherwani',
    },
    {
      id: 'dupatta',
      title: 'Dupatta',
      sub: 'Brocade Scarf',
      thumbnail: './assets/royal-card-odhni.jpg',
      palette: 'red',
      alt: 'Ceremonial Brocade Dupatta',
    },
    {
      id: 'mojari',
      title: 'Mojari',
      sub: 'Embroidered Shoes',
      thumbnail: './assets/royal-card-mojari.jpg',
      palette: 'gold',
      alt: 'Hand-Stitched Leather Mojari',
    },
  ];

  useEffect(() => {
    let blinkTimeout;

    // 1. Natural Blinking Loop with 20% double-blink chance
    const scheduleNextBlink = () => {
      const delay = Math.random() * 3200 + 2600;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        const isDoubleBlink = Math.random() < 0.22;

        setTimeout(() => {
          setIsBlinking(false);

          if (isDoubleBlink) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleNextBlink();
              }, 140);
            }, 120);
          } else {
            scheduleNextBlink();
          }
        }, 180);
      }, delay);
    };

    scheduleNextBlink();

    // 2. Continuous Organic Breathing & Idle Sway Loop
    let animId;
    let targetYaw = 0;
    let targetPitch = 0;
    let targetRoll = 0;

    let currentYaw = 0;
    let currentPitch = 0;
    let currentRoll = 0;

    const renderLoop = (time) => {
      // Natural human-like breathing expansion (~16 breaths / min)
      const breathPhase = Math.sin(time * 0.0022);
      const bScaleY = 1 + breathPhase * 0.018;
      const bScaleX = 1 - breathPhase * 0.010;
      const bTransY = -breathPhase * 3.5;
      setBreathState({ scaleY: bScaleY, scaleX: bScaleX, breathY: bTransY });

      // Subtle organic head sway
      const idleSway = Math.sin(time * 0.0016) * 3.0;

      // Smooth lerp damping toward target cursor angles
      currentYaw += (targetYaw + idleSway - currentYaw) * 0.075;
      currentPitch += (targetPitch - currentPitch) * 0.075;
      currentRoll += (targetRoll - currentRoll) * 0.075;

      setTransformState({
        rotY: currentYaw,
        rotX: currentPitch,
        tiltZ: currentRoll,
        transX: currentYaw * 0.5,
      });

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // 3. Mouse Coordinate Tracking
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42; // collar center

      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.45);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.45);

      const clampedX = Math.max(-1.1, Math.min(1.1, deltaX));
      const clampedY = Math.max(-1.0, Math.min(1.0, deltaY));

      targetYaw = clampedX * 16;
      targetPitch = -clampedY * 7;
      targetRoll = clampedX * 2.5;

      // Determine appropriate anatomical head posture
      if (clampedX < -0.55) {
        setHeadAngle('far-left');
      } else if (clampedX < -0.18) {
        setHeadAngle('left');
      } else if (clampedX > 0.55) {
        setHeadAngle('far-right');
      } else if (clampedX > 0.18) {
        setHeadAngle('right');
      } else {
        setHeadAngle('center');
      }
    };

    const handleMouseLeave = () => {
      targetYaw = 0;
      targetPitch = 0;
      targetRoll = 0;
      setHeadAngle('center');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(blinkTimeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Map active head angle to sprite asset
  const getHeadSrc = () => {
    if (isBlinking && headAngle === 'center') {
      return './assets/royal-doll-head-blink.png';
    }
    switch (headAngle) {
      case 'far-left':
        return './assets/royal-doll-head-far-left.png';
      case 'left':
        return './assets/royal-doll-head-left.png';
      case 'right':
        return './assets/royal-doll-head-right.png';
      case 'far-right':
        return './assets/royal-doll-head-far-right.png';
      case 'center':
      default:
        return './assets/royal-doll-head-center.png';
    }
  };

  // Map active achkan key to texture asset
  const getBodySrc = () => {
    const key = (outfit?.achkanKey || 'cream').toLowerCase();
    switch (key) {
      case 'red':
        return './assets/royal-doll-red-body.png';
      case 'blue':
        return './assets/royal-doll-blue-body.png';
      case 'green':
        return './assets/royal-doll-green-body.png';
      case 'cream':
      default:
        return './assets/royal-doll-cream-body.png';
    }
  };

  // Handle Draping Item Selection
  const handleItemClick = (item) => {
    setActiveDrapedItem(item.id);
    if (onSelectGarment) {
      onSelectGarment(item);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[480px]">
      
      {/* 3D Character Stage Canvas */}
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-end w-full h-[480px] sm:h-[540px] md:h-[580px] select-none"
        style={{ perspective: '1100px' }}
      >
        {/* Background Royal Golden Aura Disc */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 175, 0.75) 0%, rgba(217, 119, 6, 0.22) 58%, transparent 78%)',
            transform: `translate(calc(-50% + ${-transformState.rotY * 1.5}px), calc(-50% + ${-transformState.rotX * 1.5}px))`,
          }}
        />

        {/* Decorative Jharokha Arch Silhouette Border */}
        <div className="absolute inset-0 border-2 border-amber-900/15 rounded-t-[240px] pointer-events-none shadow-inner" />

        {/* Living Breathing Avatar Character Container */}
        <div
          className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate3d(0, ${breathState.breathY}px, 0)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Torso / Achkan Layer (Realistic Chest Breathing Expansion) */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `scale(${breathState.scaleX}, ${breathState.scaleY})`,
              transformOrigin: '50% 65%',
            }}
          >
            <img
              src={getBodySrc()}
              alt="Royal Rajasthani Achkan Body"
              className="w-auto h-[90%] max-h-full object-contain object-center drop-shadow-[0_20px_35px_rgba(20,13,8,0.28)]"
              style={{
                filter: outfit?.achkanHue ? `hue-rotate(${outfit.achkanHue}deg)` : 'none',
              }}
              draggable={false}
            />
          </div>

          {/* Head & Neck Layer (Pivots smoothly on collar socket row 174) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate3d(${transformState.transX}px, 0, 0) rotateY(${transformState.rotY}deg) rotateX(${transformState.rotX}deg) rotateZ(${transformState.tiltZ}deg)`,
              transformOrigin: '50% 41.9%',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <img
              src={getHeadSrc()}
              alt="Royal Furry Owl Head with Rajasthani Safa & Kalgi"
              className="w-auto h-[90%] max-h-full object-contain object-center drop-shadow-[0_15px_25px_rgba(20,13,8,0.22)]"
              style={{
                filter: outfit?.safaHue ? `hue-rotate(${outfit.safaHue}deg)` : 'none',
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Royal Pedestal / Shadow Base */}
        <div className="relative z-20 w-52 sm:w-72 h-6 -mt-3 bg-gradient-to-r from-transparent via-amber-950/30 to-transparent rounded-full blur-sm" />

        {/* Active Ensemble Badge Tag */}
        <div className="relative z-20 mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-amber-900/20 backdrop-blur-md shadow-sm text-xs font-bold text-neutral-900 tracking-wider">
          <Crown className="w-3.5 h-3.5 text-amber-800" />
          <span>{outfit?.title || 'Imperial Ivory & Zari Regalia'}</span>
        </div>
      </div>

      {/* 2. INTERACTIVE DRESS-UP SYSTEM (LIVE PREVIEW HORIZONTAL GRID) */}
      <div className="w-full mt-6 p-4 rounded-2xl bg-white/70 border border-amber-900/15 backdrop-blur-sm shadow-md">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Interactive Dress-Up (Live Preview)</span>
          </div>
          <span className="text-[11px] font-semibold text-neutral-600">Click to Drape</span>
        </div>

        {/* Horizontal Grid of 4 Required Traditional Items */}
        <div className="grid grid-cols-4 gap-2.5">
          {DRESS_UP_ITEMS.map((item) => {
            const isActive = activeDrapedItem === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`group relative p-1.5 rounded-xl border flex flex-col items-center transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-amber-950 text-[#F3DFB2] border-amber-700 shadow-md ring-2 ring-amber-500/40 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white border-amber-900/15 text-neutral-900 hover:border-amber-900/30'
                }`}
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-amber-950/5 mb-1.5">
                  <img
                    src={item.thumbnail}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isActive && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="w-full px-0.5">
                  <div className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-[#F3DFB2]' : 'text-neutral-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-[10px] truncate leading-tight ${isActive ? 'text-amber-300' : 'text-neutral-600'}`}>
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
