import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'red' | 'magenta' | 'purple';
}

export function GlassCard({ children, className = '', glowColor = 'cyan' }: GlassCardProps) {
  const glowStyles = {
    cyan: 'border-[var(--accent-cyan)] shadow-[0_0_20px_rgba(43,243,248,0.2),inset_0_0_20px_rgba(43,243,248,0.05)]',
    red: 'border-[var(--accent-red)] shadow-[0_0_20px_rgba(173,43,46,0.2),inset_0_0_20px_rgba(173,43,46,0.05)]',
    magenta: 'border-[var(--accent-magenta)] shadow-[0_0_20px_rgba(255,0,255,0.2),inset_0_0_20px_rgba(255,0,255,0.05)]',
    purple: 'border-[var(--accent-purple)] shadow-[0_0_20px_rgba(123,0,255,0.2),inset_0_0_20px_rgba(123,0,255,0.05)]'
  };

  return (
    <div 
      className={`
        backdrop-blur-md bg-[rgba(0,31,63,0.3)] 
        border ${glowStyles[glowColor]} 
        rounded-lg p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
