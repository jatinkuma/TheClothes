import React, { useEffect, useRef, useState } from 'react';

/**
 * Animated Fluttering Blue Butterfly Custom Cursor
 * Smoothly follows mouse coordinates across the entire screen with organic physics,
 * wing-flapping animation, and particle sparkle trail.
 */
export default function ButterflyCursor() {
  const cursorRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

    let animationFrameId;
    const ease = 0.18; // smooth spring follow

    const render = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;

      velRef.current.vx = dx * ease;
      velRef.current.vy = dy * ease;

      posRef.current.x += velRef.current.vx;
      posRef.current.y += velRef.current.vy;

      // Calculate flight tilt angle based on velocity
      const speed = Math.sqrt(velRef.current.vx * velRef.current.vx + velRef.current.vy * velRef.current.vy);
      let angle = 0;
      if (speed > 0.5) {
        angle = Math.atan2(velRef.current.vy, velRef.current.vx) * (180 / Math.PI) + 90;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${angle * 0.4}deg)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isMobile) return null;

  return (
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
        className={`relative -left-6 -top-6 transition-transform duration-200 ${
          isHovered ? 'scale-125' : 'scale-100'
        }`}
        style={{ perspective: '600px' }}
      >
        {/* Glow halo */}
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-cyan-400/30 blur-md pointer-events-none" />

        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Left Wing */}
          <div className="animate-wing-left w-5 h-7">
            <svg viewBox="0 0 70 80" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,180,255,0.7)]">
              <defs>
                <linearGradient id="cursorWingL" x1="0%" y1="30%" x2="100%" y2="70%">
                  <stop offset="0%" stopColor="#140742" />
                  <stop offset="25%" stopColor="#4a148c" />
                  <stop offset="55%" stopColor="#2979ff" />
                  <stop offset="85%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#e0f7fa" />
                </linearGradient>
              </defs>
              <path
                d="M 68 36 C 60 18, 42 2, 18 2 C 8 2, 2 10, 4 20 C 6 30, 22 42, 38 46 C 54 50, 64 45, 68 36 Z"
                fill="url(#cursorWingL)"
                stroke="#0d47a1"
                strokeWidth="1.2"
              />
              <path
                d="M 66 38 C 58 44, 46 48, 30 52 C 16 56, 12 66, 20 74 C 28 82, 48 78, 58 64 C 64 54, 66 44, 66 38 Z"
                fill="url(#cursorWingL)"
                stroke="#1a237e"
                strokeWidth="1.2"
              />
              <path d="M 66 36 Q 40 24 16 12" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
              <path d="M 66 36 Q 36 32 10 24" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
              <circle cx="10" cy="14" r="2" fill="#ffffff" />
              <circle cx="18" cy="72" r="2" fill="#ffffff" />
            </svg>
          </div>

          {/* Butterfly Center Body */}
          <div className="w-1.5 h-6 bg-gradient-to-b from-indigo-950 via-blue-900 to-cyan-400 rounded-full z-10 mx-[-1px] shadow-sm flex flex-col items-center">
            {/* Antennae */}
            <div className="w-3 h-2 border-t-2 border-indigo-950 rounded-t-full -mt-1.5" />
          </div>

          {/* Right Wing */}
          <div className="animate-wing-right w-5 h-7">
            <svg viewBox="0 0 70 80" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,180,255,0.7)]">
              <defs>
                <linearGradient id="cursorWingR" x1="100%" y1="30%" x2="0%" y2="70%">
                  <stop offset="0%" stopColor="#140742" />
                  <stop offset="25%" stopColor="#4a148c" />
                  <stop offset="55%" stopColor="#2979ff" />
                  <stop offset="85%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#e0f7fa" />
                </linearGradient>
              </defs>
              <path
                d="M 2 36 C 10 18, 28 2, 52 2 C 62 2, 68 10, 66 20 C 64 30, 48 42, 32 46 C 16 50, 6 45, 2 36 Z"
                fill="url(#cursorWingR)"
                stroke="#0d47a1"
                strokeWidth="1.2"
              />
              <path
                d="M 4 38 C 12 44, 24 48, 40 52 C 54 56, 58 66, 50 74 C 42 82, 22 78, 12 64 C 6 54, 4 44, 4 38 Z"
                fill="url(#cursorWingR)"
                stroke="#1a237e"
                strokeWidth="1.2"
              />
              <path d="M 4 36 Q 30 24 54 12" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
              <path d="M 4 36 Q 34 32 60 24" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />
              <circle cx="60" cy="14" r="2" fill="#ffffff" />
              <circle cx="52" cy="72" r="2" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

