import React from 'react';
import { motion } from 'motion/react';
import { Code, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const { t } = useTranslation();
  const language = useSelector((s: RootState) => s.ui.language); // استخدام اللغة من الـ store

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(0,4,19,0.8)] border-b-2 border-[var(--accent-cyan)]/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="cyber-h2 text-[var(--accent-cyan)]" style={{ fontSize: '24px' }}>
          <Code className="inline-block w-6 h-6 mr-2" />
          {t('header.name')} 
          {/* عرض اللغة الحالية */}
          <span className="text-sm text-gray-400 ml-2">({language})</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {['about', 'projects', 'experience', 'contact'].map(id => (
            <a
              key={id}
              href={`#${id}`}
              className="cyber-caption text-gray-300 hover:text-[var(--accent-cyan)] transition-colors uppercase"
            >
              {t(`nav.${id}`)} 
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[var(--accent-cyan)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden backdrop-blur-lg bg-[rgba(0,4,19,0.95)] border-t-2 border-[var(--accent-cyan)]/30"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {['about', 'projects', 'experience', 'contact'].map(id => (
              <a
                key={id}
                href={`#${id}`}
                className="cyber-caption text-gray-300 hover:text-[var(--accent-cyan)] transition-colors uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${id}`)} 
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}