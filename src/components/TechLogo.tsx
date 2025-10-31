import React from 'react';

interface TechLogoProps {
  name: string;
  color?: 'cyan' | 'red' | 'green' | 'purple' | 'blue';
}

const techLogos: { [key: string]: { icon: string; color: string } } = {
  'React': { icon: '⚛', color: 'cyan' },
  'Next.js': { icon: 'N', color: 'cyan' },
  'Node.js': { icon: 'N', color: 'green' },
  'TypeScript': { icon: 'TS', color: 'blue' },
  'Tailwind': { icon: 'T', color: 'cyan' },
  'TensorFlow.js': { icon: 'TF', color: 'red' },
  'Framer Motion': { icon: 'M', color: 'purple' },
  'GraphQL': { icon: 'GQL', color: 'magenta' },
  'MongoDB': { icon: 'M', color: 'green' },
  'WebGL': { icon: 'GL', color: 'red' },
  'Three.js': { icon: '3', color: 'cyan' },
  'WebAuthn': { icon: 'W', color: 'red' },
};

const colorMap = {
  cyan: {
    text: 'var(--accent-cyan)',
    shadow: 'rgba(43, 243, 248, 0.6)',
    border: 'rgba(43, 243, 248, 0.3)',
  },
  red: {
    text: 'var(--accent-red)',
    shadow: 'rgba(173, 43, 46, 0.6)',
    border: 'rgba(173, 43, 46, 0.3)',
  },
  green: {
    text: '#00FF00',
    shadow: 'rgba(0, 255, 0, 0.6)',
    border: 'rgba(0, 255, 0, 0.3)',
  },
  blue: {
    text: 'var(--accent-blue)',
    shadow: 'rgba(3, 73, 197, 0.6)',
    border: 'rgba(3, 73, 197, 0.3)',
  },
  purple: {
    text: 'var(--accent-purple)',
    shadow: 'rgba(123, 0, 255, 0.6)',
    border: 'rgba(123, 0, 255, 0.3)',
  },
  magenta: {
    text: 'var(--accent-magenta)',
    shadow: 'rgba(255, 0, 255, 0.6)',
    border: 'rgba(255, 0, 255, 0.3)',
  },
};

export function TechLogo({ name, color }: TechLogoProps) {
  const logoData = techLogos[name] || { icon: name.charAt(0).toUpperCase(), color: 'cyan' };
  const finalColor = color || logoData.color;
  const colors = colorMap[finalColor as keyof typeof colorMap] || colorMap.cyan;

  return (
    <div 
      className="flex flex-col items-center gap-2 group"
      title={name}
    >
      {/* Neon Logo Icon - Placeholder */}
      <div 
        className="
          w-16 h-16 rounded-lg border-2
          flex items-center justify-center
          transition-all duration-300
          group-hover:scale-110
        "
        style={{
          borderColor: colors.text,
          boxShadow: `0 0 20px ${colors.shadow}, inset 0 0 20px ${colors.border}`,
          color: colors.text,
        }}
      >
        <span 
          className="cyber-h2"
          style={{ 
            fontSize: '28px',
            textShadow: `0 0 20px ${colors.shadow}`,
            fontWeight: 'bold',
          }}
        >
          {logoData.icon}
        </span>
      </div>
      
      {/* Tech Name */}
      <span 
        className="cyber-caption text-xs uppercase tracking-wider opacity-80"
        style={{ color: colors.text }}
      >
        {name}
      </span>
    </div>
  );
}
