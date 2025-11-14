import { Sparkles, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CyberButton } from "../components/CyberButton"
import { LazyMotion, m, domAnimation } from "framer-motion"
import { GlassCard } from "../components/GlassCard"

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="hero-headline"
        className="min-h-screen sm:min-h-[90vh] md:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <m.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              // style={{ willChange: 'opacity, transform' }}
            >
              <GlassCard glowColor="magenta">
                <m.h1
                  className="cyber-h1 mb-3 sm:mb-4 md:mb-6 hero-headline text-2xl sm:text-4xl md:text-5xl"
                  style={{
                    background: `linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta))`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 25px var(--accent-cyan))",
                    willChange: "opacity, transform",
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {t("hero.title")}
                </m.h1>

                <h2 className="cyber-h2 text-white mb-4 sm:mb-6 md:mb-8 hero-headline text-xl sm:text-2xl md:text-3xl">
                  {t("hero.subtitle")}
                </h2>

                <p className="cyber-body text-gray-300 mb-6 sm:mb-8 hero-tagline max-w-xl text-sm sm:text-base">
                  {t("hero.tagline")}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-5">
                  <a href="#projects" className="flex-1 sm:flex-none">
                    <CyberButton variant="primary" className="hero-cta-primary w-full sm:w-auto text-xs sm:text-sm md:text-base">
                      <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
                      {t("hero.viewWork")}
                    </CyberButton>
                  </a>
                  <a href="#contact" className="flex-1 sm:flex-none">
                    <CyberButton variant="outline" className="w-full sm:w-auto text-xs sm:text-sm md:text-base">
                      <Mail className="w-3 sm:w-4 h-3 sm:h-4" />
                      {t("hero.contactMe")}
                    </CyberButton>
                  </a>
                </div>
              </GlassCard>
            </m.div>

            {/* Right Content */}
            <m.div
              className="flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{ willChange: "opacity, transform" }}
            >
              <div className="relative hero-portrait">
                {/* Neon Ring (مخفف العدد إلى حلقة واحدة فقط) */}
                <m.div
                  className="absolute inset-0 rounded-full border-2 border-(--accent-cyan)"
                  style={{
                    width: "clamp(250px, 60vw, 420px)",
                    height: "clamp(250px, 60vw, 420px)",
                    willChange: "transform, opacity",
                  }}
                  animate={{
                    scale: [1, 1.07, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Portrait */}
                <div
                  className="relative rounded-full overflow-hidden border-2 sm:border-4 backdrop-blur-md border-(--accent-cyan) shadow-[0_0_40px_rgba(43,243,248,0.6)]"
                  style={{ width: "clamp(250px, 60vw, 420px)", height: "clamp(250px, 60vw, 420px)" }}
                >
                  <img
                    src="/assets/Profile.webp"
                    alt={t("hero.profileAlt")}
                    loading="lazy"
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--accent-cyan)/20 to-transparent"></div>
                </div>

                {/* Label */}
                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="cyber-caption text-(--accent-cyan) text-center opacity-70 text-xs sm:text-sm">
                    {t("hero.imageLabel")}
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
