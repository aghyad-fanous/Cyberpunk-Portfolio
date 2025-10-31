import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CyberButton } from '../components/CyberButton';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6 lg:px-8 pt-24 pb-12" id="hero-headline">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="cyber-h1 mb-4 hero-headline"
              style={{
                background: `linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px var(--accent-cyan))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px var(--accent-cyan))',
                  'drop-shadow(0 0 30px var(--accent-cyan))',
                  'drop-shadow(0 0 20px var(--accent-cyan))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {t('hero.title')} 
            </motion.h1>

            <h2 className="cyber-h2 text-white mb-6 hero-headline">
              {t('hero.subtitle')} 
            </h2>

            <p className="cyber-body text-gray-300 mb-8 hero-tagline max-w-xl">
              {t('hero.tagline')} 
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects">
                <CyberButton variant="primary" className="hero-cta-primary">
                  <Sparkles className="w-4 h-4" />
                  {t('hero.viewWork')} 
                </CyberButton>
              </a>
              <a href="#contact">
                <CyberButton variant="outline">
                  <Mail className="w-4 h-4" />
                  {t('hero.contactMe')} 
                </CyberButton>
              </a>
            </div>
          </motion.div>

          {/* Right Content - Portrait */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* ... الكود الثابت للـ Portrait (الحلقات والإطار) ... */}
            <div className="relative hero-portrait">
              {/* Neon Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--accent-cyan)]"
                style={{ width: '420px', height: '420px' }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[var(--accent-red)]"
                style={{ width: '420px', height: '420px', top: '10px', left: '10px' }}
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              {/* Portrait Placeholder */}
              <div
                className="relative rounded-full overflow-hidden border-4 border-[var(--accent-cyan)] shadow-[0_0_50px_rgba(43,243,248,0.6)]"
                style={{ width: '420px', height: '420px' }}
              >
                <img
                  src="https://i.ibb.co/Sw6fbqFt/Untitled.png"
                  alt={t('hero.profileAlt')} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-cyan)]/20 to-transparent"></div>
              </div>

              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <p className="cyber-caption text-[var(--accent-cyan)] text-center opacity-70">
                  {t('hero.imageLabel')} 
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}