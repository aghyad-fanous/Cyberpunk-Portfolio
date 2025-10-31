import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useAppDispatch } from '../store'; 
import { fetchExperiences } from '../store/slices/experienceSlice'; 
import { TimelineItem } from '../components/TimelineItem';

export function Experience() {
  const { t } = useTranslation();
  // جلب البيانات واستخدام الـ dispatch في القسم الخاص بها
  const experiences = useSelector((s: RootState) => s.experience.experiences); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  return (
    <section className="py-20 px-6 lg:px-8" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-16"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: '0 0 20px var(--accent-cyan)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('experience.title')} 
        </motion.h2>

        {/* Vertical Timeline Line */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-red)] to-[var(--accent-cyan)] opacity-40 max-md:left-3"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TimelineItem 
                {...exp} 
                // نمرر البيانات المترجمة كـ props
                title={t(`experience.${exp.id}.title`)} 
                company={t(`experience.${exp.id}.company`)} 
                description={t(`experience.${exp.id}.description`)} 
                isLeft={index % 2 === 0} // تبديل الجانب
              /> 
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}