import { Sparkles, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CyberButton } from '../components/CyberButton'
import { LazyMotion, m, domAnimation } from 'framer-motion'

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="hero-headline"
        className="min-h-[85vh] flex items-center justify-center px-6 lg:px-8 pt-24 pb-12"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <m.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ willChange: 'opacity, transform' }}
            >
              <m.h1
                className="cyber-h1 mb-4 hero-headline"
                style={{
                  background: `linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 25px var(--accent-cyan))',
                  willChange: 'opacity, transform',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {t('hero.title')}
              </m.h1>

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
            </m.div>

            {/* Right Content */}
            <m.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              style={{ willChange: 'opacity, transform' }}
            >
              <div className="relative hero-portrait">
                {/* Neon Ring (مخفف العدد إلى حلقة واحدة فقط) */}
                <m.div
                  className="absolute inset-0 rounded-full border-2 border-(--accent-cyan)"
                  style={{
                    width: '420px',
                    height: '420px',
                    willChange: 'transform, opacity',
                  }}
                  animate={{
                    scale: [1, 1.07, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Portrait */}
                <div
                  className="relative rounded-full overflow-hidden border-4 border-(--accent-cyan) shadow-[0_0_40px_rgba(43,243,248,0.6)]"
                  style={{ width: '420px', height: '420px' }}
                >
                  <img
                    src="/assets/Profile.webp"
                    alt={t('hero.profileAlt')}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--accent-cyan)/20 to-transparent"></div>
                </div>

                {/* Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="cyber-caption text-(--accent-cyan) text-center opacity-70">
                    {t('hero.imageLabel')}
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
