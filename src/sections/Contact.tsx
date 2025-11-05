import { memo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Send, Github, Linkedin, Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CyberButton } from "../components/CyberButton"
import { GlassCard } from "../components/GlassCard"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store"
import { sendEmail } from "../store/slices/contactSlice"

const ContactComponent = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const prefersReducedMotion = useReducedMotion()

  const { loading, success, error } = useSelector(
    (state: RootState) => state.contact
  )

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Portfolio Contact",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      sendEmail({
        to_email: "aghyad.fanous.work@gmail.com",
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        name: formData.name,
      })
    )
  }

  return (
    <section className="py-20 px-6 lg:px-8 bg-[rgba(0,31,63,0.1)]" id="contact">
      <div className="max-w-3xl mx-auto">
        {/* 👇 Animation أخف وسلس */}
        <motion.h2
          className="cyber-h2 text-center mb-12 contact-form"
          style={{
            color: "var(--accent-cyan)",
            textShadow: "0 0 20px var(--accent-cyan)",
            willChange: "transform, opacity",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease: "easeOut",
          }}
        >
          {t("contact.title")}
        </motion.h2>

        {/* 👇 Animation واحد فقط للكونتينر */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.35,
            ease: "easeOut",
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2 uppercase tracking-wider">
                  {t("contact.form.nameLabel")}
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[rgba(0,4,19,0.5)] border-2 border-(--accent-cyan) text-white rounded-lg
                             focus:border-(--accent-cyan) focus:ring-2 focus:ring-(--accent-cyan)/50
                             cyber-body"
                />
              </div>

              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2 uppercase tracking-wider">
                  {t("contact.form.emailLabel")}
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("contact.form.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[rgba(0,4,19,0.5)] border-2 border-(--accent-cyan) text-white rounded-lg
                             focus:border-(--accent-cyan) focus:ring-2 focus:ring-(--accent-cyan)/50
                             cyber-body"
                />
              </div>

              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2 uppercase tracking-wider">
                  {t("contact.form.messageLabel")}
                </label>
                <Textarea
                  name="message"
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[rgba(0,4,19,0.5)] border-2 border-(--accent-cyan) text-white rounded-lg
                             focus:border-(--accent-cyan) focus:ring-2 focus:ring-(--accent-cyan)/50
                             cyber-body resize-none"
                />
              </div>

              {/* 🧠 استخدم transition CSS بدل motion أثناء hover */}
              <CyberButton
                variant="primary"
                className="w-full items-center justify-center flex gap-4 py-4 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
                {loading
                  ? t("contact.form.sending")
                  : t("contact.form.submitButton")}
              </CyberButton>

              {success && (
                <p className="text-green-400 text-center mt-4">
                  ✅ {t("contact.form.successMessage")}
                </p>
              )}
              {error && (
                <p className="text-red-400 text-center mt-4">
                  ❌ {t("contact.form.errorMessage")}
                </p>
              )}
            </form>

            {/* Social Icons */}
            <div className="mt-8 pt-8 border-t-2 border-(--accent-cyan)/40">
              <p className="cyber-caption text-center text-gray-400 mb-4 uppercase tracking-wider">
                {t("contact.socialConnect")}
              </p>
              <div className="flex justify-center gap-4">
                {[
                  { Icon: Github, href: "https://github.com/agheadof" },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/in/aghyad-fanous-29874b38b/",
                  },
                  { Icon: Mail, href: "mailto:aghyad.fanous.work@gmail.com" },
                ].map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border-2 border-(--accent-cyan) text-(--accent-cyan) rounded-lg
                               hover:bg-(--accent-cyan) hover:text-(--bg-primary)
                               transition-all duration-300 shadow-[0_0_10px_rgba(43,243,248,0.3)]
                               hover:shadow-[0_0_20px_rgba(43,243,248,0.6)] will-change-transform"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}

// 🧱 تحسين إضافي
export const Contact = memo(ContactComponent)
