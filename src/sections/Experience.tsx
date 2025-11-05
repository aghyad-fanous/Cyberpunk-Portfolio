import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TimelineItem } from '../components/TimelineItem';
import { Experience as ExperienceType } from '../store/types';

// ⚙️ بيانات ثابتة
const staticExperiences: ExperienceType[] = [
  {
    id: 'focalx-developer',
    title: 'Web Application Developer',
    company: 'Focal x agency',
    from: '01/04/2025',
    to: '01/08/2025',
    description:
      'Homs, Syria. Participated in advanced React.js training with practical application. Developed responsive web interfaces using React, TypeScript, Bootstrap, and Tailwind CSS. Worked on real-world projects using React Router, state management, and Vite. Applied clean code practices, reusable components, and responsive design techniques. Collaborated with UI/UX designs and implemented pixel-perfect layouts. Gained experience with Git version control and project structure optimization.',
    locale: 'en',
  },
  {
    id: 'freelance-developer',
    title: 'Web Application Developer',
    company: 'Freelance',
    from: '01/08/2022',
    to: '01/02/2025',
    description:
      'Online. Built and deployed full-stack web applications using React.js, Node.js, and MongoDB. Designed user interfaces with responsive design and Tailwind CSS. Developed REST APIs and handled authentication logic. Managed code with GitHub and used clean coding practices. Collaborated directly with clients to define technical requirements.',
    locale: 'en',
  },
  {
    id: 'chabban-manager',
    title: 'Web Content Manager',
    company: 'Chabban Group',
    from: '06/06/2020',
    to: '01/04/2021',
    description:
      'Dubai, United Arab Emirates. Developed and maintained a WordPress landing page for a UAE company. Created separate pages for multiple subsidiaries, detailing company information, projects, and photo galleries. Ensured responsive design and easy navigation for an enhanced user experience. Managed content updates and basic SEO optimizations.',
    locale: 'en',
  },
];

// 🧱 تحسين للأداء: memo لتقليل الـ re-render
const MemoizedTimelineItem = memo(TimelineItem);

export const Experience = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const experiences = staticExperiences;

  return (
    <section className="py-20 px-6 lg:px-8" id="experience">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="cyber-h2 text-center mb-16"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: '0 0 20px var(--accent-cyan)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
        >
          {t('experience.title')}
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-(--accent-cyan) via-(--accent-magenta) to-(--accent-cyan) opacity-40 max-md:left-3"></div>

            {experiences.map((exp, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: 'easeOut' }}
            style={{ willChange: 'transform, opacity' }}
          >
              <MemoizedTimelineItem key={exp.id} {...exp} isLeft={index % 2 === 0} />
          </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
