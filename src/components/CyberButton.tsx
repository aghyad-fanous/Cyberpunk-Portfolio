import React, { forwardRef } from 'react'; // 👈 1. استيراد forwardRef

type CyberButtonVariant = 'primary' | 'outline' | 'icon';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CyberButtonVariant;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

// 👈 2. استخدام forwardRef لتعديل تعريف الكمبوننت وتحديد أنواع ref و props
export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ 
    variant = 'primary', 
    icon, 
    children, 
    className = '',
    ...props 
  }, ref) => { // 👈 3. استقبال ref كمعامل ثانٍ
    
    const baseStyles = "cyber-caption px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-3 text-xs sm:text-sm md:text-base rounded-lg uppercase tracking-wider transition-all duration-300 relative overflow-hidden group cursor-pointer";
    
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
        ref={ref} // 👈 4. تمرير الـ ref إلى العنصر الأساسي <button>
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
);

// 5. يفضل إضافة displayName لتسهيل عملية التصحيح في أدوات المطور (Developer Tools)
CyberButton.displayName = 'CyberButton';