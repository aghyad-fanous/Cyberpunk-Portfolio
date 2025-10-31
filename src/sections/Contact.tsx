import React from 'react';
import { motion } from 'motion/react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CyberButton } from '../components/CyberButton';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export function Contact() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 lg:px-8 bg-[rgba(0,31,63,0.1)]" id="contact">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-12 contact-form"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: '0 0 20px var(--accent-cyan)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')} 
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard>
            <form className="space-y-6">
              <div>
                <label className="cyber-caption text-[var(--accent-cyan)] block mb-2 uppercase tracking-wider">
                  {t('contact.form.nameLabel')} 
                </label>
                <Input
                  type="text"
                  placeholder={t('contact.form.namePlaceholder')} 
                  className="
                    w-full bg-[rgba(0,4,19,0.5)] border-2 border-[var(--accent-cyan)] text-white rounded-lg
                    focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/50
                    cyber-body
                  "
                />
              </div>

              <div>
                <label className="cyber-caption text-[var(--accent-cyan)] block mb-2 uppercase tracking-wider">
                  {t('contact.form.emailLabel')} 
                </label>
                <Input
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')} 
                  className="
                    w-full bg-[rgba(0,4,19,0.5)] border-2 border-[var(--accent-cyan)] text-white rounded-lg
                    focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/50
                    cyber-body
                  "
                />
              </div>

              <div>
                <label className="cyber-caption text-[var(--accent-cyan)] block mb-2 uppercase tracking-wider">
                  {t('contact.form.messageLabel')} 
                </label>
                <Textarea
                  placeholder={t('contact.form.messagePlaceholder')} 
                  rows={5}
                  className="
                    w-full bg-[rgba(0,4,19,0.5)] border-2 border-[var(--accent-cyan)] text-white rounded-lg
                    focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/50
                    cyber-body resize-none
                  "
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <CyberButton variant="primary" className="w-full" type="submit">
                  <Send className="w-4 h-4" />
                  {t('contact.form.submitButton')} 
                </CyberButton>
              </motion.div>
            </form>

            {/* Social Icons */}
            <div className="mt-8 pt-8 border-t-2 border-[var(--accent-cyan)]/40">
              <p className="cyber-caption text-center text-gray-400 mb-4 uppercase tracking-wider">
                {t('contact.socialConnect')} 
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)] hover:shadow-[0_0_20px_rgba(43,243,248,0.6)]"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)] hover:shadow-[0_0_20px_rgba(43,243,248,0.6)]"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="p-3 border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)] hover:shadow-[0_0_20px_rgba(43,243,248,0.6)]"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}