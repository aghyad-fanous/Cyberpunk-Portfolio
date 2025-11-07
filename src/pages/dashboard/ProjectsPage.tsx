import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store'
import { fetchProjects, createProject, updateProject } from '../../store/slices/projectsSlice'
import { CyberButton } from '../../components/CyberButton'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { ProjectCard } from '../../components/ProjectCard';
import { useProjectActions } from '../../hooks/useProjectActions';
import { Project } from '../../store/types';
import { memo } from 'react'

type ProjectForm = {
  title: string
  description: string
  image?: string
  liveUrl?: string
  codeUrl?: string
  tags: string[]
}

export const ProjectsPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const { projects, error } = useSelector((s: RootState) => s.projects)

  const [isModalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<{ id?: string } | null>(null)
  const [form, setForm] = useState<ProjectForm>({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', tags: [] })
  const [tagInput, setTagInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const isDashboard = location.pathname.startsWith('/dashboard/projects');

  useEffect(() => {
    dispatch(fetchProjects() as any)
  }, [dispatch])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', description: '', image: '', liveUrl: '', codeUrl: '', tags: [] })
    setLocalError(null)
    setModalOpen(true)
  }

  const openEdit = (p: Project) => {
    setEditing({ id: p.id })
    setForm({ title: p.title, description: p.description, image: p.image ?? '', liveUrl: p.liveUrl ?? '', codeUrl: p.codeUrl ?? '', tags: p.tags ?? [] })
    setLocalError(null)
    setModalOpen(true)
  }

  const { handleDelete, openEdit: openEditHook } = useProjectActions(openEdit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value } as any)
  }

  const handleAddTag = () => {
    if (!tagInput) return
    setForm({ ...form, tags: [...form.tags, tagInput] })
    setTagInput('')
  }

  const handleRemoveTag = (idx: number) => {
    setForm({ ...form, tags: form.tags.filter((_, i) => i !== idx) })
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!form.title || !form.description || !form.tags.length) {
      setLocalError('Please fill required fields (title, description, tags).')
      return
    }
    try {
      setBusy(true)
      if (editing?.id) {
        await dispatch(updateProject({ id: editing.id, updates: form }) as any).unwrap()
      } else {
        await dispatch(createProject(form) as any).unwrap()
      }
      setModalOpen(false)
    } catch (err: any) {
      setLocalError(err?.message || 'Operation failed')
    } finally {
      setBusy(false)
    }
  }

  const cards = useMemo(() => projects || [], [projects])

  return (
    <section className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28 }} className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="cyber-h2 text-accent-cyan">Projects</h1>
          {isDashboard && (
            <CyberButton onClick={openCreate} variant="primary" className="flex items-center gap-3">
              <Plus className="w-4 h-4" /> New Project
            </CyberButton>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((p) => (
             <ProjectCard 
                key={p.id} 
                {...p as Project} 
                onEdit={isDashboard ? () => openEditHook(p) : undefined} 
                onDelete={isDashboard ? () => handleDelete(p.id) : undefined}
            />
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.2 }} className="relative z-10 w-full max-w-2xl">
              <div className="backdrop-blur-md bg-[rgba(0,4,19,0.7)] border-2 border-accent-cyan shadow-[0_0_20px_rgba(43,243,248,0.3)] rounded-lg p-6">
                <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Title</label>
                    <Input name="title" value={form.title} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Image URL</label>
                    <Input name="image" value={form.image} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Live URL</label>
                    <Input name="liveUrl" value={form.liveUrl} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Code URL</label>
                    <Input name="codeUrl" value={form.codeUrl} onChange={handleChange} />
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Tags</label>
                    <div className="flex gap-2">
                      <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="new tag" />
                      <CyberButton type="button" onClick={handleAddTag}>Add</CyberButton>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {form.tags.map((t, i) => (
                        <div key={t} className="flex items-center gap-2 px-2 py-1 bg-[rgba(0,0,0,0.3)] rounded">
                          <span className="text-xs">{t}</span>
                          <button type="button" onClick={() => handleRemoveTag(i)} className="text-red-400">x</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="cyber-caption text-accent-cyan block mb-2">Description</label>
                    <Textarea name="description" value={form.description} onChange={handleChange} rows={6} />
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
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  )
})