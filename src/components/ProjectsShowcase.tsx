/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExternalLink, Github, Sparkles, Filter, Code, Database, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { useState } from 'react';
import { Project } from '../types';

interface ProjectsShowcaseProps {
  isDark: boolean;
}

export default function ProjectsShowcase({ isDark }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'database-sql' | 'database-nosql'>('all');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  const categories = [
    { id: 'all', label: 'All Projects', icon: Filter },
    { id: 'frontend', label: 'Frontend Apps', icon: Code },
    { id: 'database-sql', label: 'SQL Relational', icon: Database },
    { id: 'database-nosql', label: 'NoSQL Schemas', icon: Server },
  ] as const;

  return (
    <section
      id="projects"
      className={`py-20 ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Showroom
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className={`mt-4 text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Explore personal projects and database designs highlighting code quality, UI responsiveness, and scalable modeling.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                id={`project-filter-btn-${cat.id}`}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border outline-none cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/10'
                      : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : isDark
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      : 'bg-white border-zinc-200 text-zinc-655 hover:bg-zinc-50'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, pIdx) => {
              return (
                <motion.div
                  layout
                  key={proj.id}
                  id={`project-card-${proj.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col justify-between h-full p-6 rounded-2xl border transition-all ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700/80 hover:shadow-lg'
                      : 'bg-white border-zinc-180 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Header: Tech Pill List & Type badge */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.stack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[9px] font-bold font-mono tracking-wide px-2 py-0.5 rounded-full ${
                            isDark
                              ? 'bg-zinc-800 text-emerald-400'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold tracking-tight mb-2">
                      {proj.name}
                    </h3>

                    <p className={`text-xs leading-relaxed mb-5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}>
                      {proj.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-2.5 mb-6">
                      <h4 className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Key Performance Notes:
                      </h4>
                      {proj.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <p className={`text-[11px] leading-relaxed ${isDark ? 'text-zinc-350' : 'text-zinc-650'}`}>
                            {hl}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center space-x-3.5 pt-4 border-t border-zinc-200 dark:border-zinc-800/60">
                    <a
                      href={proj.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all outline-none ${
                        isDark
                          ? 'bg-zinc-850 hover:bg-zinc-800 border-zinc-750 text-zinc-300 hover:text-white'
                          : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-650 hover:text-zinc-950'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code Repository</span>
                    </a>

                    {proj.links.live && (
                      <a
                        href={proj.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center p-2.5 rounded-xl border transition-all outline-none text-white bg-emerald-600 hover:bg-emerald-500 border-emerald-600`}
                        title="View live deployment demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
