import { motion } from 'motion/react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CyberButton } from '../components/CyberButton';
import { GlassCard } from '../components/GlassCard';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { sendEmail } from '../store/slices/contactSlice';

export function Contact() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
const { loading, success, error } = useSelector((state: RootState) => state.contact);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Portfolio Contact',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      sendEmail({
        to_email: 'aghyad.fanous.work@gmail.com',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        name: formData.name,
      })
    );
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="cyber-caption text-[var(--accent-cyan)] block mb-2 uppercase tracking-wider">
                  {t('contact.form.nameLabel')}
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
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
                  name="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
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
                  name="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="
                    w-full bg-[rgba(0,4,19,0.5)] border-2 border-[var(--accent-cyan)] text-white rounded-lg
                    focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/50
                    cyber-body resize-none
                  "
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <CyberButton
                  variant="primary"
                  className="w-full items-center justify-center flex gap-4 py-4"
                  type="submit"
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                  {loading
                    ? t('contact.form.sending')
                    : t('contact.form.submitButton')}
                </CyberButton>
              </motion.div>

              {success && (
                <p className="text-green-400 text-center mt-4">
                  ✅ {t('contact.form.successMessage')}
                </p>
              )}
              {error && (
                <p className="text-red-400 text-center mt-4">
                  ❌ {t('contact.form.errorMessage')}
                </p>
              )}
            </form>

            {/* Social Icons */}
            <div className="mt-8 pt-8 border-t-2 border-[var(--accent-cyan)]/40">
              <p className="cyber-caption text-center text-gray-400 mb-4 uppercase tracking-wider">
                {t('contact.socialConnect')}
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/agheadof"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)] hover:shadow-[0_0_20px_rgba(43,243,248,0.6)]"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aghyad-fanous-29874b38b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)] hover:shadow-[0_0_20px_rgba(43,243,248,0.6)]"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:aghyad.fanous.work@gmail.com"
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
