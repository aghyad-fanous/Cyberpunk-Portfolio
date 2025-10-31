import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useAppDispatch } from '../store'; 
import { fetchProjects } from '../store/slices/projectsSlice'; 
import { ProjectCard } from '../components/ProjectCard';

export function Projects() {
  const { t } = useTranslation();
  // جلب البيانات واستخدام الـ dispatch في القسم الخاص بها
  const projects = useSelector((s: RootState) => s.projects.projects); 
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <section className="py-20 px-6 lg:px-8 bg-[rgba(0,31,63,0.1)]" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-12 projects-grid"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: '0 0 20px var(--accent-cyan)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('projects.title')} 
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => ( 
            <motion.div
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard 
                {...project} 
                // نمرر البيانات المترجمة كـ props
                title={t(`projects.${project.id}.title`)} 
                description={t(`projects.${project.id}.description`)} 
              /> 
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}