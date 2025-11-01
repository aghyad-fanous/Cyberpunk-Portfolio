import React from 'react'
import { LazyMotion, m, domAnimation, Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '../components/ProjectCard'

const staticProjects = [
  {
    id: 'new-home-real-estate',
    title: 'New Home — Real Estate Platform',
    description:
      'A full real estate web platform developed using React, TailwindCSS, Redux Toolkit, and Firebase Realtime Database with multilingual support, auth, and dashboard.',
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit', 'Firebase Realtime Database'],
    image: '/assets/projects/new-home.webp',
    liveUrl: 'https://new-home-lemon.vercel.app/',
    codeUrl: 'https://github.com/aghyad-fanous/new-home.git',
  },
  {
    id: 'estatein-dashboard',
    title: 'Estatein — Real Estate Dashboard',
    description:
      'Admin dashboard to manage the “Estate in” real estate platform. Built with React, TailwindCSS, and Redux Toolkit.\nDemo: sales@estatein.com / sale123',
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit'],
    image: '/assets/projects/Es-dash.webp',
    liveUrl: 'https://estatein-dashboard-fawn.vercel.app/',
    codeUrl: 'https://github.com/aghyad-fanous/Estatein-Dashboard.git',
  },
  {
    id: 'the-blog-ui',
    title: 'The Blog — Modern Blog UI',
    description:
      'A clean, modern blog interface with dark/light modes, built using React, Redux Toolkit, and TailwindCSS.',
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit'],
    image: '/assets/projects/the-blog.webp',
    liveUrl: 'https://agheadof.github.io/The-Blog/',
    codeUrl: 'https://github.com/agheadof/The-Blog.git',
  },
  {
    id: 'tours-to-tuscany',
    title: 'Tours to Tuscany — Travel Website',
    description:
      'Responsive travel website built with Next.js and TailwindCSS, including signup modal and minimal design.',
    tech: ['Next.js', 'Tailwind CSS', 'React'],
    image: '/assets/projects/tours.webp',
    liveUrl: 'https://task-7-pi.vercel.app/',
    codeUrl: 'https://github.com/agheadof/Task-7.git',
  },
]

export const Projects = () => {
  const { t } = useTranslation()

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1], // ✅ بدل easeOut
      },
    },
  }

  return (
    <section className="py-20 px-6 lg:px-8 bg-[rgba(0,31,63,0.1)]" id="projects">
      <div className="max-w-7xl mx-auto">
        <LazyMotion features={domAnimation}>
          <m.h2
            className="cyber-h2 text-center mb-12"
            style={{
              color: 'var(--accent-cyan)',
              textShadow: '0 0 20px var(--accent-cyan)',
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {t('projects.title')}
          </m.h2>

          <m.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {staticProjects.map((project) => (
              <m.div
                key={project.id}
                variants={item}
                style={{
                  willChange: 'transform, opacity',
                }}
              >
                <ProjectCard {...project} />
              </m.div>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  )
}
