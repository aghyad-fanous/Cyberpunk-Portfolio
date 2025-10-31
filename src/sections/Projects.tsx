import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
// تم حذف جميع استيرادات Redux
// import { useSelector } from 'react-redux';
// import type { RootState } from '../store';
// import { useAppDispatch } from '../store'; 
// import { fetchProjects } from '../store/slices/projectsSlice'; 
import { ProjectCard } from '../components/ProjectCard';

// يجب استيراد Project Type من ملف الأنماط الخاص بك
// import type { Project } from '../types'; // مثال

// ============================
// Static Data (Dummy Project) - STRICT Type adherence
// ============================
const staticProjects = [
  {
    id: 'dummy-portfolio-v1', 
    title: 'Cyberpunk Portfolio V1',
    description: 
      'A personal portfolio website built with a cyberpunk aesthetic. The goal was to showcase front-end skills, complex UI design, and animation libraries like Framer Motion (أو Motion/React) while adhering to a mobile-first, responsive design approach.',
    tech: [
      'React.js', 
      'TypeScript', 
      'Tailwind CSS', 
      'Motion/React', 
      'Vite'
    ],
    image: '/images/dummy-portfolio-v1.jpg', // تأكد من وجود صورة لهذا المسار
    liveUrl: 'https://www.example-portfolio.com',
    codeUrl: 'https://github.com/yourusername/portfolio-repo',
  },
  // يمكنك إضافة مشاريعك الحقيقية هنا لاحقاً بنفس البنية
];


export function Projects() {
  const { t } = useTranslation();
  
  // ⚠️ استبدال جلب البيانات من Redux بالبيانات الثابتة
  const projects = staticProjects;

  // ⚠️ تعطيل الـ useEffect المتعلق بجلب البيانات
  /*
  // تم إزالة جميع استخدامات Redux
  useEffect(() => {
    // dispatch(fetchProjects()); 
  }, [dispatch]);
  */

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
                // تم تمرير الحقول مباشرة بدون t()
                title={project.title} 
                description={project.description} 
              /> 
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}