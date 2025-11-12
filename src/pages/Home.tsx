import  { useState, useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true); // يمكن نقلها لاحقاً لـ Redux لتعميمها

  
  // تفعيل وضع Dark Mode
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className=" text-white min-h-screen overflow-x-hidden">
 

      {/* Content wrapper */}
      <div className="relative z-10">
        
        
        
        {/* HERO SECTION */}
        <Hero />

        {/* ABOUT SECTION */}
        <About 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* FEATURED PROJECTS SECTION */}
        <Projects />

        {/* EXPERIENCE / TIMELINE SECTION */}
        <Experience />

        {/* CONTACT SECTION */}
        <Contact />

        {/* FOOTER */}
        <Footer /> 

      </div>
    </div>
  );
}

