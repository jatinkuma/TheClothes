import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * High-End 3D Rendered Royal Owl Character Showcase
 * Features dynamic head and body orientation tracking based on cursor coordinates,
 * periodic realistic eye-blinks, continuous living breathing motion, and video engine fallback.
 */
export default function OwlStage() {
  const containerRef = useRef(null);
  const [headState, setHeadState] = useState('center'); // 'far-left' | 'left' | 'center' | 'right' | 'far-right'
  const [isBlinking, setIsBlinking] = useState(false);
  const [transform3d, setTransform3d] = useState({ rotX: 0, rotY: 0, transX: 0 });
  const [useVideoFallback, setUseVideoFallback] = useState(false);

  useEffect(() => {
    let blinkTimeout;

    // Natural blinking loop
    const scheduleNextBlink = () => {
      const delay = Math.random() * 3500 + 2500;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 180);
      }, delay);
    };

    scheduleNextBlink();

    // Mouse tracking across window
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.45);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.45);

      const clampedX = Math.max(-1.2, Math.min(1.2, deltaX));
      const clampedY = Math.max(-1.0, Math.min(1.0, deltaY));

      // Determine head turn angle
      if (clampedX < -0.6) {
        setHeadState('far-left');
      } else if (clampedX < -0.2) {
        setHeadState('left');
      } else if (clampedX > 0.6) {
        setHeadState('far-right');
      } else if (clampedX > 0.2) {
        setHeadState('right');
      } else {
        setHeadState('center');
      }

      setTransform3d({
        rotY: clampedX * 18,
        rotX: -clampedY * 8,
        transX: clampedX * 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(blinkTimeout);
    };
  }, []);

  // Map state to image asset
  const getImageSrc = () => {
    if (isBlinking && headState === 'center') {
      return './assets/royal-owl-statue-blink.png';
    }
    switch (headState) {
      case 'far-left':
        return './assets/royal-owl-statue-far-left.png';
      case 'left':
        return './assets/royal-owl-statue-left.png';
      case 'right':
        return './assets/royal-owl-statue-right.png';
      case 'far-right':
        return './assets/royal-owl-statue-far-right.png';
      case 'center':
      default:
        return './assets/royal-owl-statue-center.png';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-end w-full max-w-[440px] h-[480px] sm:h-[540px] md:h-[600px] select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Background Royal Aura Disc */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255, 235, 175, 0.7) 0%, rgba(217, 119, 6, 0.22) 55%, transparent 75%)',
          transform: `translate(calc(-50% + ${-transform3d.rotY * 1.4}px), calc(-50% + ${-transform3d.rotX * 1.4}px))`,
        }}
      />

      {/* Decorative Jharokha Arch Glow */}
      <div className="absolute inset-0 border-2 border-amber-900/15 rounded-t-[220px] pointer-events-none shadow-inner" />

      {/* 3D Articulated Owl Character */}
      <div
        className="relative z-10 w-full h-full flex items-end justify-center animate-royal-float transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${transform3d.transX}px, 0, 0) rotateY(${transform3d.rotY}deg) rotateX(${transform3d.rotX}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {useVideoFallback ? (
          <video
            src="./assets/royal-owl-animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-auto h-[88%] max-h-full object-contain drop-shadow-[0_20px_35px_rgba(20,13,8,0.35)]"
          />
        ) : (
          <img
            src={getImageSrc()}
            alt="3D Stylized Royal Rajasthani Owl in Handcrafted Attire"
            className="w-auto h-[88%] max-h-full object-contain drop-shadow-[0_20px_35px_rgba(20,13,8,0.35)] transition-all duration-150"
            draggable={false}
            onError={() => setUseVideoFallback(true)}
          />
        )}
      </div>

      {/* Royal Pedestal / Shadow Base */}
      <div className="relative z-20 w-48 sm:w-64 h-6 -mt-3 bg-gradient-to-r from-transparent via-amber-950/30 to-transparent rounded-full blur-sm" />

      {/* Interactive Badge Indicator */}
      <div className="relative z-20 mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/10 border border-amber-900/20 backdrop-blur-sm shadow-sm text-xs font-semibold text-neutral-900 tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-amber-900 animate-pulse" />
        <span>ROYAL RAJASTHANI MASCOT</span>
      </div>
    </div>
  );
}

