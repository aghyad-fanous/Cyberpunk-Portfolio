import { useEffect, useMemo, useState, memo } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Edit2, Trash2, Plus } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../store"
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../store/slices/articlesSlice"
import { GlassCard } from "../../components/GlassCard"
import { CyberButton } from "../../components/CyberButton"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { useImageUpload } from "../../hooks/useImageUpload"
import ArticleCard from "../../components/ArticlePreviewCard"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../components/ui/dialog"

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

  const { articles, loading } = useSelector((s: RootState) => s.articles)
  const [editing, setEditing] = useState<{ id?: string } | null>(null)
  const [form, setForm] = useState<ArticleForm>({
    title: "",
    slug: "",
    content: "",
    thumbnail: "",
    category: "",
  })
  const [localError, setLocalError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)

  const {
    uploadImage,
    uploading,
    error: uploadError,
    imageUrl,
  } = useImageUpload()

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: "", slug: "", content: "", thumbnail: "", category: "" })
    setLocalError(null)
    setOpen(true)
  }

  const openEdit = (article: any) => {
    setEditing({ id: article.id })
    setForm({
      title: article.title,
      slug: article.slug,
      content: article.content,
      thumbnail: article.thumbnail ?? "",
      category: article.category ?? "",
    })
    setLocalError(null)
    setOpen(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setLocalError(null)

    if (!form.title || !form.slug || !form.content || !form.category) {
      setLocalError("Please fill all required fields.")
      return
    }

    try {
      setBusy(true)
      if (editing?.id) {
        await dispatch(updateArticle({ id: editing.id, payload: form })).unwrap()
      } else {
        await dispatch(createArticle(form)).unwrap()
      }
      setOpen(false)
    } catch (err: any) {
      setLocalError(err?.message || "Operation failed")
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return
    try {
      await dispatch(deleteArticle(id)).unwrap()
    } catch (err: any) {
      alert(err?.message || "Delete failed")
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const result = await uploadImage(file)
    if (result?.url) setForm({ ...form, thumbnail: result.url })
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
          <h1 className="cyber-h2 text-(--accent-cyan)">Articles</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <CyberButton
                onClick={openCreate}
                variant="primary"
                className="flex items-center gap-3"
              >
                <Plus className="w-4 h-4" /> New Article
              </CyberButton>
            </DialogTrigger>

            <DialogContent className="bg-[rgba(0,4,19,0.85)] border-2 border-(--accent-cyan) shadow-[0_0_20px_rgba(43,243,248,0.3)] text-white">
              
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Article" : "Create Article"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the fields to {editing ? "update" : "create"} your article
                </DialogDescription>
              </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="hidden" name="id" value={editing?.id || ""} />

                  <div>
                    <label className="cyber-caption text-(--accent-cyan) block mb-2">
                      Title
                    </label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="cyber-caption text-(--accent-cyan) block mb-2">
                      Slug
                    </label>
                    <Input
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="cyber-caption text-(--accent-cyan) block mb-2">
                      Category
                    </label>
                    <Input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="cyber-caption text-(--accent-cyan) block mb-2">
                      Image (WebP only)
                    </label>
                    <input
                      type="file"
                      accept="image/webp"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 
                        file:rounded-md file:border-0 file:text-sm file:font-semibold 
                        file:bg-(--accent-cyan)/20 file:text-(--accent-cyan) 
                        hover:file:bg-(--accent-cyan)/30"
                    />
                    {uploading && (
                      <p className="text-cyan-400 text-sm mt-2">Uploading...</p>
                    )}
                    {uploadError && (
                      <p className="text-red-400 text-sm mt-2">{uploadError}</p>
                    )}
                    {(imageUrl || form.thumbnail) && (
                      <div className="mt-3">
                        <img
                          src={imageUrl || form.thumbnail}
                          alt="Uploaded preview"
                          className="max-h-40 rounded-lg border border-cyan-500/50"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="cyber-caption text-(--accent-cyan) block mb-2">
                      Content
                    </label>
                    <Textarea
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows={8}
                    />
                  </div>

                  {localError && <p className="text-red-400">{localError}</p>}

                  <DialogFooter className="mt-4">
                    <CyberButton
                      type="submit"
                      variant="primary"
                      disabled={busy}
                    >
                      {editing ? "Update" : "Create"}
                    </CyberButton>
                    <CyberButton
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </CyberButton>
                  </DialogFooter>
                </form>
              
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && <p className="text-gray-400">Loading articles...</p>}
          {cards.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </motion.div>
    </section>
  )
})
