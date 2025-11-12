import { useEffect, useMemo, useState, memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../../store";
import {
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../store/slices/experienceSlice"; // استيراد الأكشنز الجديدة
import { CyberButton } from "../../components/CyberButton";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { TimelineItem } from "../../components/TimelineItem"; // استيراد المكون المعدل
import { useExperienceActions } from "../../hooks/useExperienceActions"; // استيراد الهوك الجديد
import { Experience, Language } from "../../store/types"; // استيراد تايب Experience
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

// تايب الفورم للخبرة
type ExperienceForm = {
  title: string;
  company: string;
  from: string; // تاريخ البداية
  to: string | null; // تاريخ النهاية
  description: string;
  locale: Language; // تايب اللغة
};

export const ExperiencesPage = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  // التغيير هنا لاستخدام سلايس الخبرات
  const { experiences, error } = useSelector((s: RootState) => s.experience);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<{ id?: string } | null>(null);
  const [form, setForm] = useState<ExperienceForm>({
    title: "",
    company: "",
    from: "",
    to: null,
    description: "",
    locale: "en", // قيمة افتراضية للغة
  });
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const isDashboard = location.pathname.startsWith("/dashboard");


  // 1. جلب البيانات عند التحميل
  useEffect(() => {
    dispatch(fetchExperiences() as any);
  }, [dispatch]);

  // 2. وظيفة فتح نموذج الإنشاء
  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      company: "",
      from: "",
      to: null,
      description: "",
      locale: "en",
    });
    setLocalError(null);
    setDialogOpen(true);
  };

  // 3. وظيفة فتح نموذج التعديل
  const openEdit = (e: Experience) => {
    setEditing({ id: e.id });
    setForm({
      title: e.title,
      company: e.company ?? "",
      from: e.from ?? "",
      to: e.to ?? null,
      description: e.description ?? "",
      locale: e.locale ?? "en",
    });
    setLocalError(null);
    setDialogOpen(true);
  };

  // 4. استخدام الهوك لعمليات الحذف (يجب أن يكون لديك useExperienceActions)
  const { handleDelete, openEdit: openEditHook } = useExperienceActions(openEdit);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // التعامل مع حقل 'to' (التاريخ الحالي)
    const value = e.target.name === 'to' && e.target.value === 'current' ? null : e.target.value;
    
    setForm({ ...form, [e.target.name]: value } as any);
  };

  // 5. دالة الإرسال (Submit)
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.title || !form.company || !form.from || !form.description) {
      setLocalError("Please fill required fields (Title, Company, From, Description).");
      return;
    }
    try {
      setBusy(true);
      if (editing?.id) {
        // تعديل الخبرة
        await dispatch(
          updateExperience({ id: editing.id, updates: form }) as any
        ).unwrap();
      } else {
        // إنشاء الخبرة
        await dispatch(createExperience(form) as any).unwrap();
      }
      setDialogOpen(false);
    } catch (err: any) {
      setLocalError(err?.message || "Operation failed");
    } finally {
      setBusy(false);
    }
  };

  // ترتيب الخبرات: الأحدث أولاً (حسب حقل 'from')
  const cards = useMemo(
    () =>
      [...(experiences || [])].sort(
        (a, b) => new Date(b.from ?? 0).getTime() - new Date(a.from ?? 0).getTime()
      ),
    [experiences]
  );

  return (
    <section className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="cyber-h2 text-(--accent-cyan)">Experiences</h1>
          {isDashboard && ( 
            <CyberButton
              onClick={openCreate}
              variant="primary"
              className="flex items-center gap-3"
            >
              <Plus className="w-4 h-4" /> New Experience
            </CyberButton>
          )}
        </div>

        {/* عرض الخبرات بتنسيق Timeline */}
        <div className="flex flex-col relative">
          {/* هذا الخط يمثل الـ timeline الأساسي */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-600 h-full max-md:hidden"></div>
          
          {cards.map((e, index) => (
            <TimelineItem
              key={e.id}
              {...(e as Experience)}
              isLeft={index % 2 === 0} // تبديل اتجاه البطاقة
              // تمرير دوال الإدارة
              onEdit={isDashboard ? () => openEditHook(e) : undefined}
              onDelete={isDashboard ? () => handleDelete(e.id) : undefined}
            />
          ))}
        </div>

        {/* نموذج الإضافة/التعديل */}
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="bg-[rgba(0,4,19,0.85)] border-2 border-(--accent-cyan) shadow-[0_0_20px_rgba(43,243,248,0.3)] text-white">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Experience" : "Create New Experience"}
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Modify the experience details below."
                  : "Fill out the fields to create a new experience."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 mt-4">
              {/* حقل Title */}
              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2">Title</label>
                <Input name="title" value={form.title} onChange={handleChange} />
              </div>
              
              {/* حقل Company */}
              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2">Company</label>
                <Input name="company" value={form.company} onChange={handleChange} />
              </div>

              {/* حقول التاريخ (From - To) */}
              <div className="flex gap-4">
                {/* From Date */}
                <div className="flex-1">
                  <label className="cyber-caption text-(--accent-cyan) block mb-2">From (e.g., 2020-09)</label>
                  <Input name="from" value={form.from} onChange={handleChange} placeholder="YYYY-MM" />
                </div>
                {/* To Date / Current */}
                <div className="flex-1">
                  <label className="cyber-caption text-(--accent-cyan) block mb-2">To (e.g., 2023-12 or Current)</label>
                  <select
                    name="to"
                    value={form.to === null ? 'current' : form.to}
                    onChange={handleChange}
                    className="w-full p-2 border-none bg-[rgba(0,0,0,0.5)] text-white rounded-md focus:ring-1 focus:ring-(--accent-cyan)"
                  >
                    <option value="current">Current</option>
                    {/* إضافة خيار لإدخال تاريخ عند الحاجة */}
                    <option value={form.to !== null ? form.to : ''}>
                       {form.to !== null ? form.to : 'Enter End Date'}
                    </option>
                  </select>
                  {/* يمكن استخدام Input بدلاً من Select إذا كانت جميع التواريخ ثابتة */}
                  {form.to !== null && (
                      <Input 
                        name="to" 
                        value={form.to} 
                        onChange={handleChange} 
                        placeholder="YYYY-MM" 
                        className="mt-2"
                      />
                  )}
                </div>
              </div>
              
              {/* حقل Language/Locale */}
              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2">Language</label>
                <select
                    name="locale"
                    value={form.locale}
                    onChange={handleChange}
                    className="w-full p-2 border-none bg-[rgba(0,0,0,0.5)] text-white rounded-md focus:ring-1 focus:ring-(--accent-cyan)"
                >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                </select>
              </div>

              {/* حقل Description */}
              <div>
                <label className="cyber-caption text-(--accent-cyan) block mb-2">Description</label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                />
              </div>

              {localError && <p className="text-red-400">{localError}</p>}

              <div className="flex gap-3 pt-2">
                <CyberButton type="submit" variant="primary" disabled={busy}>
                  {editing ? "Update" : "Create"}
                </CyberButton>
                <CyberButton
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </CyberButton>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </section>
  );
});