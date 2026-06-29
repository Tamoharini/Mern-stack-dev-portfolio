/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import SkillsGrid from './components/SkillsGrid';
import ProjectsShowcase from './components/ProjectsShowcase';
import SchemaPlayground from './components/SchemaPlayground';
import ContactHub from './components/ContactHub';
import ResumePrinter from './components/ResumePrinter';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showResumePrint, setShowResumePrint] = useState<boolean>(false);

  // Synchronise system theme classes
  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Smooth dynamic scroll
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Safe scroll intersection observer to auto-track active nav link
  useEffect(() => {
    const sections = ['hero', 'skills', 'experience', 'projects', 'playground', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180; // offset header height space
      
      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="portfolio-root-container"
      className={`min-h-screen transition-colors duration-400 font-sans selection:bg-amber-500/20 selection:text-amber-300 ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-850'
      }`}
    >
      {/* Visual Navigation Header */}
      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onShowResumePrint={() => setShowResumePrint(true)}
      />

      {/* Main Single-View Component pipeline */}
      <main className="w-full">
        {/* Intro hero & mechatronics model bridge */}
        <Hero isDark={isDark} onNavigate={handleNavigate} />

        {/* Technical skills blocks with interactive MERN stack tracing */}
        <SkillsGrid isDark={isDark} />

        {/* Production delivery internship logs timeline */}
        <Experience isDark={isDark} />

        {/* Project display index */}
        <ProjectsShowcase isDark={isDark} />

        {/* Immersive Relational Database and MongoDB aggregate database sandbox */}
        <SchemaPlayground isDark={isDark} />

        {/* Developer formatted contact mechanism connected to local storage messages */}
        <ContactHub isDark={isDark} />
      </main>

      {/* Structured resume modal display */}
      <AnimatePresence>
        {showResumePrint && (
          <ResumePrinter
            isDark={isDark}
            onClose={() => setShowResumePrint(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
