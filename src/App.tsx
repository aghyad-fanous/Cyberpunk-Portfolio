import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from './store'; // افتراض وجود هذا الـ Hook
import { fetchArticles } from './store/slices/articlesSlice'; // جلب المقالات يبقى هنا أو ينقل إلى قسم Articles إذا أُضيف لاحقاً
import { Code, Menu, X } from 'lucide-react';

// استيراد المكونات / الأقسام المُقسمة حديثاً
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

// الخلفية تبقى هنا
import { CyberBackground } from './components/CyberBackground'; 
import {CyberpunkBackToTop} from './components/ui/BackToTopButton';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // يمكن نقلها لاحقاً لـ Redux لتعميمها

  // استخدام الـ dispatch
  const dispatch = useAppDispatch();

  // جلب البيانات عند تحميل المكون (mount)
  // يتم استدعاء جلب المشاريع والخبرات داخل ملفات الأقسام نفسها لضمان نقل تبعيات Redux
  useEffect(() => {
    // جلب الـ Articles (إذا لم يكن هناك قسم خاص بها، أبقِها هنا)
    dispatch(fetchArticles()); 
  }, [dispatch]);
  
  // تفعيل وضع Dark Mode
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="bg-[var(--bg-primary)] text-white min-h-screen overflow-x-hidden">
      {/* CYBERPUNK CIRCUIT BOARD BACKGROUND */}
      <CyberBackground />
      <CyberpunkBackToTop/>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* HEADER */}
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        {/* HERO SECTION */}
        <Hero />

        {/* ABOUT SECTION */}
        <About 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* FEATURED PROJECTS SECTION */}
        <Projects />

        {/* EXPERIENCE / TIMELINE SECTION */}
        <Experience />

        {/* CONTACT SECTION */}
        <Contact />

        {/* FOOTER */}
        <Footer /> 

      </div>
    </div>
  );
}

// تم فصل الـ Footer كـ component بسيط هنا لتجنب ملف إضافي صغير
function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-8 px-6 lg:px-8 border-t-2 border-[var(--accent-cyan)]/30 footer">
      <div className="max-w-7xl mx-auto text-center">
        <p className="cyber-caption text-gray-400">
          {t('footer.designedBy')}{' '} 
          <span
            className="text-[var(--accent-cyan)]"
            style={{ textShadow: '0 0 10px var(--accent-cyan)' }}
          >
            {t('footer.designerName')} 
          </span>
          {' '}· {t('footer.builtWith')} 
        </p>
        <p className="cyber-caption text-gray-600 mt-2 text-xs">
          {t('footer.copyright')} 
        </p>
      </div>
    </footer>
  );
}