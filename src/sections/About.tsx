import React from 'react';
import { motion } from 'motion/react';
import { Download, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { CyberButton } from '../components/CyberButton';
import { GlassCard } from '../components/GlassCard';
import { SkillChip } from '../components/SkillChip';
import { Switch } from '../components/ui/switch';
import { skills } from '../data/skills'; 

interface AboutProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export function About({ darkMode, setDarkMode }: AboutProps) {
  const { t } = useTranslation();
  const language = useSelector((s: RootState) => s.ui.language); 

  return (
    <section className="py-20 px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-12"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: '0 0 20px var(--accent-cyan)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.title')} 
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-profile"
          >
            <GlassCard glowColor="red">
              <h3 className="cyber-h2 text-white mb-4" style={{ fontSize: '28px' }}>
                {t('about.whoAmI.title')} 
              </h3>
              <p className="cyber-body text-gray-300 mb-4">
                {t('about.whoAmI.p1')} 
              </p>
              <p className="cyber-body text-gray-300 mb-6">
                {t('about.whoAmI.p2')} 
              </p>

              <div className="flex items-center gap-4">
                <CyberButton variant="outline">
                  <Download className="w-4 h-4" />
                  {t('about.downloadCV')} 
                </CyberButton>

                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[var(--accent-cyan)]" />
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-[var(--accent-cyan)]"
                  />
                  <Moon className="w-4 h-4 text-[var(--accent-magenta)]" />
                  <span className="text-xs text-gray-400">({language})</span> 
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="cyber-h2 text-white mb-6" style={{ fontSize: '28px' }}>
              {t('about.technicalSkills.title')} 
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SkillChip skill={t(`skills.${skill}`)} /> 
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}