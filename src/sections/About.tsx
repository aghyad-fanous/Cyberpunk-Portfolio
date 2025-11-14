import React from 'react'
import { LazyMotion, m, domAnimation } from 'framer-motion'
import { Download } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { CyberButton } from '../components/CyberButton'
import { GlassCard } from '../components/GlassCard'
import { SkillChip } from '../components/SkillChip'

// ============================
// Static Data (From CV)
// ============================
const aboutData = {
  bio: [
    `I am a passionate Front-End Developer with a strong foundation in modern web technologies. I specialize in creating clean, responsive, and user-friendly interfaces using React, TypeScript, and Tailwind CSS.`,
    `My experience spans both freelance and agency projects, including full-stack development with Node.js, Express.js, and MongoDB. I enjoy building scalable, maintainable applications and continuously improving my technical and creative skills.`,
  ],
  cvLink: '/Aghyad_Fanous_CV.pdf',
  skills: [
    'React.js',
    'TypeScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Tailwind CSS',
    'BootstrapCSS',
    'SQL (Prisma, Sequelize)',
    'REST APIs',
    'Git/GitHub',
    'Clean Code',
    'Responsive Design',
    'UI/UX Collaboration',
    'Vite',
  ],
}

interface AboutProps {
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export const About: React.FC<AboutProps> = ({ darkMode, setDarkMode }) => {
  const language = useSelector((s: RootState) => s.ui.language)

  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ===== Title ===== */}
          <m.h2
            className="cyber-h2 text-center mb-8 sm:mb-10 md:mb-12 text-2xl sm:text-3xl md:text-4xl"
            style={{
              color: 'var(--accent-cyan)',
              textShadow: '0 0 12px var(--accent-cyan)',
              willChange: 'opacity, transform',
            }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            About Me
          </m.h2>

          {/* ===== Layout ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* === Left: Bio === */}
            <m.div
              className="about-profile"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlassCard glowColor="magenta" className="p-4 sm:p-5 md:p-6">
                <h3 className="cyber-h2 text-white mb-4 text-lg sm:text-xl md:text-2xl">
                  Who Am I?
                </h3>

                {aboutData.bio.map((p, i) => (
                  <p key={i} className="cyber-body text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    {p}
                  </p>
                ))}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-6">
                  <a href={aboutData.cvLink} download className="w-full sm:w-auto">
                    <CyberButton variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                      <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                      Download CV
                    </CyberButton>
                  </a>
                </div>
              </GlassCard>
            </m.div>

            {/* === Right: Skills === */}
            <m.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ willChange: 'opacity, transform' }}
            >
              <h3 className="cyber-h2 text-white mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl">
                Technical Skills
              </h3>

              <m.div
                className="flex flex-wrap gap-2 sm:gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      ease: 'easeOut',
                    },
                  },
                }}
              >
                {aboutData.skills.map((skill) => (
                  <m.div
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.25 }}
                    style={{ willChange: 'opacity, transform' }}
                  >
                    <SkillChip skill={skill} />
                  </m.div>
                ))}
              </m.div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
