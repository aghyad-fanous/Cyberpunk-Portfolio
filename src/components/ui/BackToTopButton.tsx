import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; 

export function CyberpunkBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // إظهار الزر بعد التمرير 300 بكسل
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    // 💡 المشكلة تكمن في أن هذا التنسيق لم يتم تحميله
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            w-12 h-12 flex items-center justify-center 
            text-white text-lg font-bold 
            
            bg-purple-600 border-2 border-cyan-400 
            shadow-lg transform -skew-x-12 
            transition-all duration-300 ease-in-out
            
            shadow-[0_0_15px_rgba(52,211,255,0.7)] 
            hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(192,132,252,1)]
            hover:scale-110
            
          `}
          aria-label="Back to top"
        >
          {/* الأيقونة داخل الزر */}
          <span className="transform skew-x-12">
            <ChevronUp className="w-6 h-6" />
          </span>
        </button>
      )}
    </div>
  );
}