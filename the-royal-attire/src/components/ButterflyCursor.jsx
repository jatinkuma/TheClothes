import React, { useEffect, useRef, useState } from 'react';

/**
 * Antigravity Color-Changing Butterfly Cursor
 * Smoothly lags and floats behind the cursor using physics-based buoyant easing (antigravity hover effect).
 * Features realistic continuous 3D wing fluttering, dynamic color shifting (Sapphire Blue -> Amethyst Purple -> Imperial Gold -> Ruby Crimson)
 * across sections, and a luminous particle sparkle trail.
 */
export default function ButterflyCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velRef = useRef({ vx: 0, vy: 0 });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [butterflyTheme, setButterflyTheme] = useState('blue'); // 'blue' | 'purple' | 'gold' | 'ruby'

  useEffect(() => {
    // Check if device supports fine hover pointer
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      setIsMobile(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check section under cursor or by scroll position to shift butterfly colors
      const scrollY = window.scrollY + e.clientY;
      const stylistEl = document.getElementById('royal-stylist');
      const collectionEl = document.getElementById('collection');
      const heritageEl = document.getElementById('heritage');

      if (heritageEl && scrollY >= heritageEl.offsetTop - 100) {
        setButterflyTheme('ruby');
      } else if (stylistEl && scrollY >= stylistEl.offsetTop - 100) {
        setButterflyTheme('gold');
      } else if (collectionEl && scrollY >= collectionEl.offsetTop - 100) {
        setButterflyTheme('purple');
      } else {
        setButterflyTheme('blue');
      }

      // Check if hovering over clickable element
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.classList.contains('clickable'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Setup Canvas for Sparkle Trail
    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    let animationFrameId;
    const ease = 0.11; // Antigravity lag easing

    const render = (time) => {
      // Antigravity buoyant floating wave
      const floatY = Math.sin(time * 0.0035) * 12;
      const floatX = Math.cos(time * 0.0028) * 7;

      const targetWithFloatX = targetRef.current.x + floatX;
      const targetWithFloatY = targetRef.current.y + floatY;

      const dx = targetWithFloatX - posRef.current.x;
      const dy = targetWithFloatY - posRef.current.y;

      velRef.current.vx = dx * ease;
      velRef.current.vy = dy * ease;

      posRef.current.x += velRef.current.vx;
      posRef.current.y += velRef.current.vy;

      // Flight tilt and banking angle based on velocity
      const speed = Math.sqrt(velRef.current.vx * velRef.current.vx + velRef.current.vy * velRef.current.vy);
      let angle = 0;
      if (speed > 0.8) {
        angle = Math.atan2(velRef.current.vy, velRef.current.vx) * (180 / Math.PI) + 90;
      }
      const tilt = Math.max(-28, Math.min(28, velRef.current.vx * 1.8));

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${angle * 0.35}deg) rotateY(${tilt}deg)`;
      }

      // Spawn sparkle particles on movement
      if (Math.random() < 0.45 && particles.length < 40 && speed > 0.6) {
        const themeColors = {
          blue: ['#00E5FF', '#2979FF', '#80D8FF', '#FFFFFF'],
          purple: ['#E040FB', '#7C4DFF', '#BA68C8', '#FFFFFF'],
          gold: ['#FFD700', '#FF9100', '#FFF59D', '#FFFFFF'],
          ruby: ['#FF1744', '#FF5252', '#FF8A80', '#FFFFFF'],
        };
        const currentColors = themeColors[butterflyTheme] || themeColors.blue;
        particles.push({
          x: posRef.current.x + (Math.random() - 0.5) * 8,
          y: posRef.current.y + (Math.random() - 0.5) * 8,
          radius: Math.random() * 2.2 + 0.8,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          vx: (Math.random() - 0.5) * 0.6,
          vy: Math.random() * 0.4 + 0.3,
          color: currentColors[Math.floor(Math.random() * currentColors.length)],
        });
      }

      // Render sparkles on canvas
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
          } else {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, butterflyTheme]);

  if (isMobile) return null;

  // Color theme definitions for SVG gradients & glows
  const themeGradients = {
    blue: {
      stop1: '#140742',
      stop2: '#4a148c',
      stop3: '#2979ff',
      stop4: '#00e5ff',
      stop5: '#e0f7fa',
      stroke1: '#0d47a1',
      stroke2: '#1a237e',
      glow: 'rgba(0, 229, 255, 0.55)',
      body: 'from-indigo-950 via-blue-900 to-cyan-400',
    },
    purple: {
      stop1: '#2a0845',
      stop2: '#641b9a',
      stop3: '#9c27b0',
      stop4: '#e040fb',
      stop5: '#f3e5f5',
      stroke1: '#4a148c',
      stroke2: '#311b92',
      glow: 'rgba(224, 64, 251, 0.55)',
      body: 'from-purple-950 via-fuchsia-900 to-pink-400',
    },
    gold: {
      stop1: '#3e2723',
      stop2: '#b45309',
      stop3: '#f59e0b',
      stop4: '#ffd700',
      stop5: '#fffbeb',
      stroke1: '#78350f',
      stroke2: '#92400e',
      glow: 'rgba(255, 215, 0, 0.65)',
      body: 'from-amber-950 via-amber-800 to-yellow-400',
    },
    ruby: {
      stop1: '#4a0e17',
      stop2: '#881337',
      stop3: '#e11d48',
      stop4: '#ff1744',
      stop5: '#ffe4e6',
      stroke1: '#9f1239',
      stroke2: '#881337',
      glow: 'rgba(255, 23, 68, 0.6)',
      body: 'from-rose-950 via-rose-900 to-red-400',
    },
  };

  const currentGrad = themeGradients[butterflyTheme] || themeGradients.blue;

  return (
    <>
      {/* Fullscreen Canvas for Magical Particle Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-300"
      />

      {/* 3D Antigravity Butterfly Creature */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
        }}
      >
        <div
          className={`relative -left-7 -top-7 transition-all duration-300 ${
            isHovered ? 'scale-125' : 'scale-100'
          }`}
          style={{ perspective: '700px' }}
        >
          {/* Luminous Antigravity Aura Glow */}
          <div
            className="absolute inset-0 w-14 h-14 rounded-full blur-md pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentGrad.glow }}
          />

          <div className="relative flex items-center justify-center w-14 h-14">
            
            {/* Left Wing (Realistic Continuous 3D Flutter) */}
            <div className="animate-wing-left w-6 h-8 origin-right transition-colors duration-500">
              <svg viewBox="0 0 70 80" className="w-full h-full drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
                <defs>
                  <linearGradient id="cursorWingDynamicL" x1="0%" y1="30%" x2="100%" y2="70%">
                    <stop offset="0%" stopColor={currentGrad.stop1} />
                    <stop offset="25%" stopColor={currentGrad.stop2} />
                    <stop offset="55%" stopColor={currentGrad.stop3} />
                    <stop offset="85%" stopColor={currentGrad.stop4} />
                    <stop offset="100%" stopColor={currentGrad.stop5} />
                  </linearGradient>
                </defs>
                <path
                  d="M 68 36 C 60 18, 42 2, 18 2 C 8 2, 2 10, 4 20 C 6 30, 22 42, 38 46 C 54 50, 64 45, 68 36 Z"
                  fill="url(#cursorWingDynamicL)"
                  stroke={currentGrad.stroke1}
                  strokeWidth="1.2"
                />
                <path
                  d="M 66 38 C 58 44, 46 48, 30 52 C 16 56, 12 66, 20 74 C 28 82, 48 78, 58 64 C 64 54, 66 44, 66 38 Z"
                  fill="url(#cursorWingDynamicL)"
                  stroke={currentGrad.stroke2}
                  strokeWidth="1.2"
                />
                <path d="M 66 36 Q 40 24 16 12" stroke="#ffffff" strokeWidth="1" opacity="0.75" fill="none" />
                <path d="M 66 36 Q 36 32 10 24" stroke="#ffffff" strokeWidth="1" opacity="0.75" fill="none" />
                <circle cx="10" cy="14" r="2" fill="#ffffff" />
                <circle cx="18" cy="72" r="2" fill="#ffffff" />
              </svg>
            </div>

            {/* Butterfly Center Body with Antennae */}
            <div className={`w-1.5 h-6 bg-gradient-to-b ${currentGrad.body} rounded-full z-10 mx-[-1px] shadow-sm flex flex-col items-center transition-colors duration-500`}>
              <div className="w-3 h-2 border-t-2 border-amber-300 rounded-t-full -mt-1.5 opacity-90" />
            </div>

            {/* Right Wing (Realistic Continuous 3D Flutter) */}
            <div className="animate-wing-right w-6 h-8 origin-left transition-colors duration-500">
              <svg viewBox="0 0 70 80" className="w-full h-full drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
                <defs>
                  <linearGradient id="cursorWingDynamicR" x1="100%" y1="30%" x2="0%" y2="70%">
                    <stop offset="0%" stopColor={currentGrad.stop1} />
                    <stop offset="25%" stopColor={currentGrad.stop2} />
                    <stop offset="55%" stopColor={currentGrad.stop3} />
                    <stop offset="85%" stopColor={currentGrad.stop4} />
                    <stop offset="100%" stopColor={currentGrad.stop5} />
                  </linearGradient>
                </defs>
                <path
                  d="M 2 36 C 10 18, 28 2, 52 2 C 62 2, 68 10, 66 20 C 64 30, 48 42, 32 46 C 16 50, 6 45, 2 36 Z"
                  fill="url(#cursorWingDynamicR)"
                  stroke={currentGrad.stroke1}
                  strokeWidth="1.2"
                />
                <path
                  d="M 4 38 C 12 44, 24 48, 40 52 C 54 56, 58 66, 50 74 C 42 82, 22 78, 12 64 C 6 54, 4 44, 4 38 Z"
                  fill="url(#cursorWingDynamicR)"
                  stroke={currentGrad.stroke2}
                  strokeWidth="1.2"
                />
                <path d="M 4 36 Q 30 24 54 12" stroke="#ffffff" strokeWidth="1" opacity="0.75" fill="none" />
                <path d="M 4 36 Q 34 32 60 24" stroke="#ffffff" strokeWidth="1" opacity="0.75" fill="none" />
                <circle cx="60" cy="14" r="2" fill="#ffffff" />
                <circle cx="52" cy="72" r="2" fill="#ffffff" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
