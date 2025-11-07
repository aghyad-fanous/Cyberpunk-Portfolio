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
      <section id="about" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ===== Title ===== */}
          <m.h2
            className="cyber-h2 text-center mb-12"
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
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* === Left: Bio === */}
            <m.div
              className="about-profile"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlassCard glowColor="red">
                <h3 className="cyber-h2 text-white mb-4 text-[28px]">
                  Who Am I?
                </h3>

                {aboutData.bio.map((p, i) => (
                  <p key={i} className="cyber-body text-gray-300 mb-4 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="flex items-center gap-4 mt-6">
                  <a href={aboutData.cvLink} download>
                    <CyberButton variant="outline">
                      <Download className="w-4 h-4" />
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
              <h3 className="cyber-h2 text-white mb-6 text-[28px]">
                Technical Skills
              </h3>

              <m.div
                className="flex flex-wrap gap-3"
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
