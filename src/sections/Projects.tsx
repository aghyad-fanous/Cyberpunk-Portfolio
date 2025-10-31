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
    id: 'new-home-real-estate',
    title: 'New Home — Real Estate Platform',
    description:
      'A full real estate web platform developed from scratch using React, TailwindCSS, Redux Toolkit, and Firebase Realtime Database. It integrates both front-end and back-end features into one cohesive system. Key features include multilingual support (Arabic / English), light & dark modes, user authentication via email, property submission and management, image upload and approval workflow, and an admin dashboard to manage users, listings, and messages. Built with a focus on clean UI, scalability, and real-time interaction between users and admins.',
    tech: [
      'React',
      'Tailwind CSS',
      'Redux Toolkit',
      'Firebase Realtime Database',
    ],
    image: '/assets/projects/new-home.webp', // أضف مسار الصورة لاحقاً
    liveUrl: 'https://new-home-lemon.vercel.app/',
    codeUrl: 'https://github.com/aghyad-fanous/new-home.git', // أضف رابط الكود إذا متاح
  },
    {
    id: 'estatein-dashboard',
    title: 'Estatein — Real Estate Dashboard',
    description:
      'An admin dashboard built to manage the “Estate in” real estate platform. Developed using React, TailwindCSS, and Redux Toolkit, it provides an organized interface for overseeing users, listings, and general platform operations. The project focuses on clear UI layout, smooth state management, and responsive design for better admin workflow.\n\nDemo credentials:\n👤 Email: sales@estatein.com\n🔑 Password: sale123',
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit'],
    image: '/assets/projects/Es-dash.webp', // أضف مسار الصورة لاحقاً
    liveUrl: 'https://estatein-dashboard-fawn.vercel.app/', // أضف الرابط لاحقاً إذا متاح
    codeUrl: 'https://github.com/aghyad-fanous/Estatein-Dashboard.git', // أضف رابط الكود إذا متاح
  },
  {
    id: 'the-blog-ui',
    title: 'The Blog — Modern Blog UI',
    description:
      'A modern, responsive blog interface built with React, Redux Toolkit, and TailwindCSS. The project includes light & dark mode, dynamic state management, and a clean accessible layout. It focuses on improving UI architecture, reusable components, and theme handling, serving as a solid front-end–only showcase for component-driven design.',
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit'],
    image: '/assets/projects/the-blog.webp', // أضف مسار الصورة لاحقاً
    liveUrl: 'https://agheadof.github.io/The-Blog/',
    codeUrl: 'https://github.com/agheadof/The-Blog.git', // أضف رابط الكود إذا متاح
  },
  {
    id: 'tours-to-tuscany',
    title: 'Tours to Tuscany — Travel Website',
    description:
      'A clean and responsive travel website built with Next.js and TailwindCSS. The project features two main pages and a functional Sign Up / Sign In modal for a realistic user experience (UI only). It emphasizes elegant layout, reusability of components, and maintaining a minimal responsive design.',
    tech: ['Next.js', 'Tailwind CSS', 'React'],
    image: '/assets/projects/tours.webp', // أضف مسار الصورة لاحقاً
    liveUrl: 'https://task-7-pi.vercel.app/',
    codeUrl: 'https://github.com/agheadof/Task-7.git', // أضف رابط الكود إذا متاح
  },
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

        <div className="grid lg:grid-cols-2 gap-8">
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