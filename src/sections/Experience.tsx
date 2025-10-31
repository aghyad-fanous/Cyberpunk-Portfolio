import React from 'react'; 
import { motion } from 'framer-motion'; // افترضت framer-motion بدلاً من motion/react
import { useTranslation } from 'react-i18next';
import { TimelineItem } from '../components/TimelineItem';
// **الخطوة الحاسمة:** استيراد تايب Experience الأصلي
import { Experience as ExperienceType } from '../store/types'; 

// تعريف المصفوفة مع التايب ExperienceType[]
const staticExperiences: ExperienceType[] = [ 
  {
    id: 'focalx-developer', 
    title: 'Web Application Developer',
    company: 'Focal x agency',
    from: '01/04/2025',
    to: '01/08/2025',
    description: 
      'Homs, Syria. Participated in advanced React.js training with practical application. Developed responsive web interfaces using React, TypeScript, Bootstrap, and Tailwind CSS. Worked on real-world projects using React Router, state management, and Vite. Applied clean code practices, reusable components, and responsive design techniques. Collaborated with UI/UX designs and implemented pixel-perfect layouts. Gained experience with Git version control and project structure optimization.',
    // الآن 'en' يعتبر من نوع Language ('en' | 'ar')
    locale: 'en' 
  },
  {
    id: 'freelance-developer',
    title: 'Web Application Developer',
    company: 'Freelance',
    from: '01/08/2022',
    to: '01/02/2025',
    description: 
      'Online. Built and deployed full-stack web applications using React.js, Node.js, and MongoDB. Designed user interfaces with responsive design and Tailwind CSS. Developed REST APIs and handled authentication logic. Managed code with GitHub and used clean coding practices. Collaborated directly with clients to define technical requirements.',
    locale: 'en'
  },
  {
    id: 'chabban-manager',
    title: 'Web Content Manager',
    company: 'Chabban Group',
    from: '06/06/2020',
    to: '01/04/2021',
    description: 
      'Dubai, United Arab Emirates. Developed and maintained a WordPress landing page for a UAE company. Created separate pages for multiple subsidiaries, detailing company information, projects, and photo galleries. Ensured responsive design and easy navigation for an enhanced user experience. Managed content updates and basic SEO optimizations.',
    locale: 'en'
  },
];


export function Experience() {
  const { t } = useTranslation();
  
  const experiences = staticExperiences;

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
                isLeft={index % 2 === 0}
              /> 
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}