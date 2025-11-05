import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Send } from 'lucide-react'
import { GlassCard } from '../../components/GlassCard'
import { CyberButton } from '../../components/CyberButton'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { api } from '../../api/client'
import { memo } from 'react'

export const NewsletterPage = memo(() => {
  const prefersReducedMotion = useReducedMotion()
  const [form, setForm] = useState({ subject: 'New blog post', message: '' })
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setSuccess(null)
    setError(null)
    if (!form.subject || !form.message) {
      setError('Subject and message are required')
      return
    }
    try {
      setBusy(true)
      await api.post('/api/newsletter/notify', { subject: form.subject, message: form.message })
      setSuccess('Notification sent (or queued)')
      setForm({ subject: 'New blog post', message: '' })
    } catch (err: any) {
      setError(err?.message || 'Send failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28 }} className="max-w-3xl mx-auto">
        <h1 className="cyber-h2 text-accent-cyan mb-6">Newsletter</h1>

        <GlassCard>
          <form onSubmit={(e) => handleSend(e)} className="space-y-4">
            <div>
              <label className="cyber-caption text-accent-cyan block mb-2">Subject</label>
              <Input name="subject" value={form.subject} onChange={handleChange} />
            </div>

            <div>
              <label className="cyber-caption text-accent-cyan block mb-2">Message</label>
              <Textarea name="message" value={form.message} onChange={handleChange} rows={6} />
            </div>

            <div className="flex gap-3">
              <CyberButton type="submit" variant="primary" disabled={busy}>
                <Send className="w-4 h-4" /> Send to subscribers
              </CyberButton>
            </div>

            {success && <p className="text-green-400">{success}</p>}
            {error && <p className="text-red-400">{error}</p>}
          </form>
        </GlassCard>
      </motion.div>
    </section>
  )
})
