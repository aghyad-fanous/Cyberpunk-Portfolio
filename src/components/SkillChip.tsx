import React from 'react';

interface SkillChipProps {
  skill: string;
  variant?: 'cyan' | 'red';
}

export function SkillChip({ skill, variant = 'cyan' }: SkillChipProps) {
  const isCyan = variant === 'cyan';
  
  return (
    <div className={`
      cyber-caption 
      px-4 py-2 
      rounded-lg
      border-2 border-(--accent-cyan) text-(--accent-cyan) 
      shadow-[0_0_10px_rgba(43,243,248,0.3),inset_0_0_10px_rgba(43,243,248,0.05)] 
      hover:shadow-[0_0_15px_rgba(43,243,248,0.5),inset_0_0_15px_rgba(43,243,248,0.1)] 
      hover:bg-[rgba(43,243,248,0.1)] 
      transition-all duration-300
      uppercase
      tracking-wider
    `}>
      {skill}
    </div>
  );
}
