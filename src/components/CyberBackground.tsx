import React from 'react';
import { motion } from 'motion/react';

export function CyberBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[var(--bg-primary)] overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary-start)] to-[var(--bg-secondary-end)]" />
      
      {/* Circuit board pattern SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Circuit line pattern */}
          <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Cyan circuits */}
            <path 
              d="M 0 20 L 60 20 L 60 60 L 100 60" 
              stroke="var(--accent-cyan)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="60" cy="20" r="3" fill="var(--accent-cyan)" opacity="0.8" />
            <circle cx="60" cy="60" r="3" fill="var(--accent-cyan)" opacity="0.8" />
            
            {/* Red circuits */}
            <path 
              d="M 200 80 L 140 80 L 140 120 L 100 120" 
              stroke="var(--accent-red)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="140" cy="80" r="3" fill="var(--accent-red)" opacity="0.8" />
            <circle cx="140" cy="120" r="3" fill="var(--accent-red)" opacity="0.8" />
            
            {/* More cyan paths */}
            <path 
              d="M 0 100 L 40 100 L 40 140" 
              stroke="var(--accent-cyan)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="40" cy="100" r="3" fill="var(--accent-cyan)" opacity="0.8" />
            
            {/* More red paths */}
            <path 
              d="M 200 160 L 160 160 L 160 200" 
              stroke="var(--accent-red)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="160" cy="160" r="3" fill="var(--accent-red)" opacity="0.8" />
            
            {/* Diagonal cyan */}
            <path 
              d="M 120 0 L 120 40 L 160 40" 
              stroke="var(--accent-cyan)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="120" cy="40" r="3" fill="var(--accent-cyan)" opacity="0.8" />
            
            {/* Diagonal red */}
            <path 
              d="M 80 200 L 80 160 L 40 160" 
              stroke="var(--accent-red)" 
              strokeWidth="1" 
              fill="none"
              opacity="0.6"
            />
            <circle cx="80" cy="160" r="3" fill="var(--accent-red)" opacity="0.8" />
            
            {/* Small nodes */}
            <rect x="100" y="100" width="2" height="2" fill="var(--accent-cyan)" opacity="0.4" />
            <rect x="20" y="180" width="2" height="2" fill="var(--accent-red)" opacity="0.4" />
            <rect x="180" y="20" width="2" height="2" fill="var(--accent-cyan)" opacity="0.4" />
          </pattern>
          
          {/* Glow filters */}
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Apply pattern */}
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" filter="url(#glow-cyan)" />
      </svg>
      
      {/* Animated scan lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute h-px bg-gradient-to-r from-transparent ${
              i % 2 === 0 ? 'via-[var(--accent-cyan)]' : 'via-[var(--accent-red)]'
            } to-transparent`}
            style={{
              top: `${Math.random() * 100}%`,
              left: '-100%',
              width: '100%',
            }}
            animate={{
              left: ['100%', '-100%'],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[var(--bg-primary)] opacity-60" />
    </div>
  );
}
