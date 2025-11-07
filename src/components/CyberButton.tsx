import React from 'react';

type CyberButtonVariant = 'primary' | 'outline' | 'icon';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CyberButtonVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function CyberButton({ 
  variant = 'primary', 
  icon, 
  children, 
  className = '',
  ...props 
}: CyberButtonProps) {
  const baseStyles = "cyber-caption px-6 py-3 rounded-lg uppercase tracking-wider transition-all duration-300 relative overflow-hidden group";
  
  const variantStyles = {
    primary: `
      backdrop-blur-md bg-[rgba(43,243,248,0.15)]
      text-(--accent-cyan)
      border-2 border-(--accent-cyan)
      hover:bg-[rgba(43,243,248,0.25)]
      shadow-[0_0_20px_rgba(43,243,248,0.4),inset_0_0_20px_rgba(43,243,248,0.1)]
      hover:shadow-[0_0_30px_rgba(43,243,248,0.6),inset_0_0_30px_rgba(43,243,248,0.2)]
    `,
    outline: `
      backdrop-blur-md bg-[rgba(43,243,248,0.05)]
      text-(--accent-cyan)
      border-2 border-(--accent-cyan)
      hover:bg-[rgba(43,243,248,0.15)]
      shadow-[0_0_15px_rgba(43,243,248,0.3),inset_0_0_10px_rgba(43,243,248,0.05)]
      hover:shadow-[0_0_25px_rgba(43,243,248,0.5),inset_0_0_20px_rgba(43,243,248,0.1)]
    `,
    icon: `
      backdrop-blur-md bg-[rgba(43,243,248,0.1)] p-3 rounded-md
      border border-(--accent-cyan)
      text-(--accent-cyan)
      hover:bg-[rgba(43,243,248,0.2)]
      shadow-[0_0_10px_rgba(43,243,248,0.3),inset_0_0_10px_rgba(43,243,248,0.05)]
      hover:shadow-[0_0_20px_rgba(43,243,248,0.5),inset_0_0_15px_rgba(43,243,248,0.1)]
    `
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && !children ? icon : (
        <>
          {icon && <span className="mr-2 inline-block">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
