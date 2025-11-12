import React, { useEffect, memo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { fetchExperiences } from '../store/slices/experienceSlice';

import { TimelineItem } from '../components/TimelineItem';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { ExperienceSkeleton } from '../components/ExperienceSkeleton'; // ✅ استيراد السكيليتون

// 🧱 تحسين للأداء: memo لتقليل الـ re-render
const MemoizedTimelineItem = memo(TimelineItem);

export const Experience = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  
  const dispatch = useAppDispatch();
  
  const { experiences, status, error } = useAppSelector((s) => s.experience);

  useEffect(() => {
    
    if (status === 'idle') { 
      dispatch(fetchExperiences() as any);
    }
  }, [dispatch, status]); // الاعتماد على 'status' و 'dispatch'

  // *اختياري: فرز الخبرات إذا لم يكن الفرز يتم في الباك إند أو الـ Slice
  const sortedExperiences = experiences
    ? [...experiences].sort(
        (a, b) => new Date(b.from ?? 0).getTime() - new Date(a.from ?? 0).getTime()
      )
    : [];

  // 3. عرض حالة التحميل/الخطأ
  if (status === 'loading' && sortedExperiences.length === 0) {
    return (
     <section className="py-20 px-6 lg:px-8" id="experience">
        {/* عرض الهيدر والسكيليتون بنفس التنسيق */}
        <div className="max-w-5xl mx-auto">
          <h2 className="cyber-h2 text-center mb-16 opacity-50">
             {t('experience.title')} 
          </h2>
          <div className="relative">
             {/* خط الـ Timeline (ضروري ليتوسط السكيليتون) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-(--accent-cyan) via-(--accent-magenta) to-(--accent-cyan) opacity-40 max-md:hidden"></div>
             
             {/* عرض بطاقتي سكيليتون */}
            <ExperienceSkeleton isLeft={true} />
            <ExperienceSkeleton isLeft={false} />
          </div>
        </div>
      </section>
    );
  }

  if (status === 'failed' && sortedExperiences.length === 0) {
    return (
      <section className="py-20 px-6 text-center text-red-400" id="experience">
        <p>{t('common.error_fetching')}: {error}</p>
      </section>
    );
  }
  
  // إذا كانت القائمة فارغة بعد الجلب
  if (sortedExperiences.length === 0) {
    return (
      <section className="py-20 px-6 text-center text-white/50" id="experience">
        <p>{t('experience.no_experiences')}</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 lg:px-8" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-16"
          // ... (خصائص الـ motion)
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
        >
          {t('experience.title')}
        </motion.h2>

        <div className="relative">
          {/* خط الـ Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-(--accent-cyan) via-(--accent-magenta) to-(--accent-cyan) opacity-40 max-md:left-3"></div>

          {/* 4. استخدام البيانات المُجلوبة والمفرزة */}
          {sortedExperiences.map((exp, index) => (
            <motion.div
              key={exp.id} // يفضل استخدام id الخبرة كـ key
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
            >
              {/* ملاحظة: TimelineItem في الواجهة العامة لا تحتاج onEdit/onDelete */}
              <MemoizedTimelineItem 
                {...exp} 
                isLeft={index % 2 === 0} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};