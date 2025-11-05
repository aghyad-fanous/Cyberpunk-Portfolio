import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { fetchArticles, createArticle, updateArticle, deleteArticle } from '../../store/slices/articlesSlice'
import { GlassCard } from '../../components/GlassCard'
import { CyberButton } from '../../components/CyberButton'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { api } from '../../api/client'
import { memo } from 'react'

type ArticleForm = {
  title: string
  slug: string
  content: string
  thumbnail?: string
  category: string
}

export const ArticlesPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>()
  const prefersReducedMotion = useReducedMotion()

  const { articles, loading, error } = useSelector((s: RootState) => s.articles)
  const [isModalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<{ id?: string } | null>(null)
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    content: '',
    thumbnail: '',
    category: '',
  })
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', slug: '', content: '', thumbnail: '', category: '' })
    setLocalError(null)
    setModalOpen(true)
  }

  const openEdit = (article: any) => {
    setEditing({ id: article.id })
    setForm({
      title: article.title,
      slug: article.slug,
      content: article.content,
      thumbnail: article.thumbnail ?? '',
      category: article.category ?? '',
    })
    setLocalError(null)
    setModalOpen(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLocalError(null)

    if (!form.title || !form.slug || !form.content || !form.category) {
      setLocalError('Please fill required fields.')
      return
    }

    try {
      setBusy(true)
      if (editing?.id) {
        await dispatch(updateArticle({ id: editing.id, payload: form })).unwrap()
      } else {
        await dispatch(createArticle(form)).unwrap()
      }
      setModalOpen(false)
    } catch (err: any) {
      setLocalError(err?.message || 'Operation failed')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      await dispatch(deleteArticle(id)).unwrap()
    } catch (err: any) {
      alert(err?.message || 'Delete failed')
    }
  }

  const cards = useMemo(() => articles || [], [articles])

  return (
    <section className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="cyber-h2 text-accent-cyan">Articles</h1>
          <CyberButton onClick={openCreate} variant="primary" className="flex items-center gap-3">
            <Plus className="w-4 h-4" /> New Article
          </CyberButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((a) => (
            <GlassCard key={a.id}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{a.title}</h3>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-3">{a.content}</p>
                  <p className="mt-3 text-xs text-gray-400">Category: {a.category}</p>
                  <p className="mt-1 text-xs text-gray-500">By: {a.authorId}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => openEdit(a)} className="p-2 rounded border border-accent-cyan">
                    <Edit2 className="w-4 h-4 text-accent-cyan" />
                  </button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 rounded border border-red-500">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="relative z-10 w-full max-w-2xl"
            >
              <GlassCard>
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                  <Input type="hidden" name="id" value={editing?.id || ''} />
                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Title</label>
                    <Input name="title" value={form.title} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Slug</label>
                    <Input name="slug" value={form.slug} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Category</label>
                    <Input name="category" value={form.category} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Thumbnail URL</label>
                    <Input name="thumbnail" value={form.thumbnail} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Content</label>
                    <Textarea name="content" value={form.content} onChange={handleChange} rows={8} />
                  </div>

                  {localError && <p className="text-red-400">{localError}</p>}

                  <div className="flex gap-3">
                    <CyberButton type="submit" variant="primary" disabled={busy}>
                      {editing ? 'Update' : 'Create'}
                    </CyberButton>
                    <CyberButton type="button" variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </CyberButton>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
})
