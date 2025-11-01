import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Define circuit paths for data point animations
const circuitPaths = [
  {
    id: 'path1',
    points: { cx: [0, 60, 60, 100], cy: [20, 20, 60, 60] },
    color: 'var(--accent-cyan)',
    duration: 4
  },
  {
    id: 'path2',
    points: { cx: [200, 140, 140, 100], cy: [80, 80, 120, 120] },
    color: 'var(--accent-red)',
    duration: 5
  },
  {
    id: 'path3',
    points: { cx: [120, 120, 160], cy: [0, 40, 40] },
    color: 'var(--accent-cyan)',
    duration: 3
  },
  {
    id: 'path4',
    points: { cx: [80, 80, 40], cy: [200, 160, 160] },
    color: 'var(--accent-red)',
    duration: 3.5
  },
  {
    id: 'path5',
    points: { cx: [0, 40, 40], cy: [100, 100, 140] },
    color: 'var(--accent-cyan)',
    duration: 4.5
  }
];

export function CyberBackground() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="fixed inset-0 z-0 bg-[var(--bg-primary)] overflow-hidden">
      
      {/* 1. Base Gradient (Breathing effect) */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-[var(--bg-primary)] via-[var(--bg-secondary-start)] to-[var(--bg-secondary-end)]"
        initial={{ scale: 1.05 }}
        animate={!shouldReduceMotion ? { scale: [1.05, 1.03, 1.05], opacity: [1, 0.95, 1] } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
     
      {/* 2. Circuit board pattern SVG (Slow Float) - Opacity reduced */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-25" // Opacity reduced to 25%
        xmlns="http://www.w3.org/2000/svg"
        initial={{ x: "0%", y: "0%" }}
        animate={!shouldReduceMotion ? { 
          x: ["0%", "5%", "0%"],
          y: ["0%", "5%", "0%"],
        } : {}}
        transition={{ 
          duration: 60,
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Static paths */}
                <path d="M 0 20 L 60 20 L 60 60 L 100 60" stroke="var(--accent-cyan)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="60" cy="20" r="3" fill="var(--accent-cyan)" opacity="0.8" />
                <circle cx="60" cy="60" r="3" fill="var(--accent-cyan)" opacity="0.8" />
                <path d="M 200 80 L 140 80 L 140 120 L 100 120" stroke="var(--accent-red)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="140" cy="80" r="3" fill="var(--accent-red)" opacity="0.8" />
                <circle cx="140" cy="120" r="3" fill="var(--accent-red)" opacity="0.8" />
                <path d="M 0 100 L 40 100 L 40 140" stroke="var(--accent-cyan)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="40" cy="100" r="3" fill="var(--accent-cyan)" opacity="0.8" />
                <path d="M 200 160 L 160 160 L 160 200" stroke="var(--accent-red)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="160" cy="160" r="3" fill="var(--accent-red)" opacity="0.8" />
                <path d="M 120 0 L 120 40 L 160 40" stroke="var(--accent-cyan)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="120" cy="40" r="3" fill="var(--accent-cyan)" opacity="0.8" />
                <path d="M 80 200 L 80 160 L 40 160" stroke="var(--accent-red)" strokeWidth="1" fill="none" opacity="0.6" />
                <circle cx="80" cy="160" r="3" fill="var(--accent-red)" opacity="0.8" />
                <rect x="100" y="100" width="2" height="2" fill="var(--accent-cyan)" opacity="0.4" />
                <rect x="20" y="180" width="2" height="2" fill="var(--accent-red)" opacity="0.4" />
                <rect x="180" y="20" width="2" height="2" fill="var(--accent-cyan)" opacity="0.4" />

                {/* NEW: Animated Data Points (inside pattern) */}
                {!shouldReduceMotion && (
                  <g>
                    {circuitPaths.map((path) => (
                      <motion.circle
                        key={path.id}
                        r="3"
                        fill={path.color}
                        filter="url(#glow)" // Apply glow filter directly to points
                        animate={{
                          cx: path.points.cx,
                        cy: path.points.cy,
                        }}
                        transition={{
                          duration: path.duration,
                          repeat: Infinity,
                          ease: "linear",
                        delay: Math.random() * path.duration, // Stagger start times
                        }}
                      />
                    ))}
                  </g>
                )}
          </pattern>
          
          {/* Refined glow filter - Stronger effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/> {/* Increased stdDeviation to 2 */}
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        
        {/* Apply pattern with filter */}
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" filter="url(#glow)" />
      </motion.svg>
     
      {/* 3. Animated scan lines - Balanced (4 lines, adjusted timing) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px bg-linear-to-r from-transparent ${
                i % 2 === 0 ? 'via-[var(--accent-cyan)]' : 'via-[var(--accent-red)]' // Fixed syntax
              } to-transparent`}
              style={{
                top: `${(i * 25) + Math.random() * 10}%`,
                transform: 'translateX(-100%)',
                width: '100%',
                willChange: 'transform'
              }}
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                duration: 20 + (i * 3), // Balanced duration
                repeat: Infinity,
                ease: 'linear',
                delay: i * 3 // Balanced delay
              }}
            />
          ))}
        </div>
      )}
      
      {/* Subtle vignette - Fixed syntax */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[var(--bg-primary)] opacity-60" />
    </div>
  );
}