import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 cursor-pointer hover:shadow-[0_0_20px_#ff0000] p-4 rounded-full transition-all duration-300 ${
        isVisible
          ? 'opacity-100 bg-slate-950 border border-red-500 shadow-[0_0_10px_#ff0000]'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <ArrowUp className="text-red-500 w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;
