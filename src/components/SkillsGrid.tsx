/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Laptop, Code, Database, ChevronRight, Share2, Layers, Award, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION } from '../data';
import { useState } from 'react';

interface SkillsGridProps {
  isDark: boolean;
}

export default function SkillsGrid({ isDark }: SkillsGridProps) {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; info?: string } | null>(null);
  const [activeMernStep, setActiveMernStep] = useState<number>(0);

  const mernSteps = [
    {
      title: '1. React Frontend UI',
      tech: 'React.js, Tailwind CSS, Responsive Grids',
      action: 'A user triggers search query filters or edits their profile details. The viewport-aware client handles click states (useState/useEffect) and fires web triggers.',
      output: 'Sends AJAX Request: GET /api/v1/user/profile with Authorization headers.'
    },
    {
      title: '2. HTTP Request Routing',
      tech: 'Express.js & Postman Testing',
      action: 'Express routing catches requests matching the path parameters. In development, Postman variables are verified to map accurate schema fields & request payloads.',
      output: 'Express parsing router: app.get("/api/v1/user/profile", fetchHandler)'
    },
    {
      title: '3. DB Aggregation / SQL Join',
      tech: 'MongoDB Collections or MySQL tables',
      action: 'For ShopDB, indices and stored procedures fetch normalized (3NF) relational tables. For Zen Class, the model queries student tasks and mentors with subdocument embedding arrays.',
      output: 'Database result array: SELECT * FROM users INNER JOIN profiles...'
    },
    {
      title: '4. Dynamic State Rendering',
      tech: 'DOM Updates & Motion/CSS',
      action: 'Server sends a JSON body back to the client. The React state hooks intercept the data payload, updates loading state variables, and renders the updated UI with micro-animations.',
      output: 'React component updates: setProfile(data) -> Beautiful View Renders.'
    }
  ];

  return (
    <section
      id="skills"
      className={`py-20 ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Technical Stack & Skills
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className={`mt-4 text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Click on individual skill cards to inspect detailed features & conceptual proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Block: Categorized Skills Pills (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILL_CATEGORIES.map((category, catIdx) => {
                return (
                  <div
                    key={catIdx}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-180 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-4 border-b border-zinc-200 dark:border-zinc-800/50 pb-2">
                      {catIdx === 0 && <Code className="w-4.5 h-4.5 text-emerald-500" />}
                      {catIdx === 1 && <Laptop className="w-4.5 h-4.5 text-emerald-500" />}
                      {catIdx === 2 && <Database className="w-4.5 h-4.5 text-emerald-500" />}
                      {catIdx === 3 && <BookOpen className="w-4.5 h-4.5 text-emerald-500" />}
                      <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-emerald-500">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-3.5">
                      {category.skills.map((skill, sIdx) => {
                        const isChosen = selectedSkill?.name === skill.name;
                        return (
                          <div
                            key={sIdx}
                            onClick={() => setSelectedSkill(skill)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer group ${
                              isChosen
                                ? isDark
                                  ? 'bg-emerald-500/10 border-emerald-500/50'
                                  : 'bg-emerald-600 border-emerald-600 text-white'
                                : isDark
                                  ? 'bg-zinc-850 border-zinc-800/65 hover:bg-zinc-800'
                                  : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-xs font-bold ${
                                isChosen 
                                  ? isDark ? 'text-emerald-400' : 'text-white' 
                                  : isDark ? 'text-zinc-200' : 'text-zinc-800'
                              }`}>
                                {skill.name}
                              </span>
                              <span className="text-[11px] font-bold font-mono tracking-tighter opacity-80">
                                {skill.level}%
                              </span>
                            </div>
                            
                            {/* Visual Progress bar */}
                            <div className="w-full h-1.5 bg-zinc-250 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 0.8, delay: 0.1 * sIdx }}
                                className="h-full bg-emerald-500"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Micro details panel floating container */}
            {selectedSkill ? (
              <div className={`p-4 rounded-xl border flex items-start space-x-3 transition-all ${
                isDark ? 'bg-emerald-500/5 border-emerald-500/20 text-zinc-300' : 'bg-emerald-500/5 border-emerald-500/10 text-zinc-700'
              }`}>
                <div className="p-1 px-2.5 bg-emerald-500/15 rounded text-[11px] font-mono font-bold text-emerald-500 uppercase mt-0.5">
                  Scope
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-zinc-950 dark:text-zinc-100 mb-0.5">
                    {selectedSkill.name} Practical Mapping:
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {selectedSkill.info}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 text-center text-xs text-zinc-500">
                Tip: Click any skill bar to inspect professional use details.
              </div>
            )}
          </div>

          {/* Right Block: MERN Stack pipeline explorer (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-2.5 mb-5 border-b border-zinc-200 dark:border-zinc-850 pb-3">
                <Layers className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-md tracking-tight">
                  MERN Full-Stack Flow Analyzer
                </h3>
              </div>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                Visualizing structural data flows in unified JavaScript development. Select a step blocks below to trace:
              </p>

              <div className="space-y-2 mb-5">
                {mernSteps.map((step, idx) => {
                  const isActive = activeMernStep === idx;
                  return (
                    <button
                      key={idx}
                      id={`mern-step-btn-${idx}`}
                      onClick={() => setActiveMernStep(idx)}
                      className={`w-full text-left p-3 rounded-xl border flex items-center space-x-3 transition-all outline-none ${
                        isActive
                          ? isDark
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-white'
                            : 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                          : isDark
                            ? 'bg-zinc-850/50 border-zinc-800/50 text-zinc-400 hover:text-zinc-250'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                      }`}
                    >
                      <span className={`text-xs font-mono font-bold p-1 rounded ${
                        isActive 
                          ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/20 text-white' 
                          : isDark ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-zinc-400 border border-zinc-200'
                      }`}>
                        S0{idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold block truncate uppercase tracking-tight font-mono">
                          {step.title}
                        </span>
                        <span className={`text-[9px] block ${isActive ? 'text-zinc-200' : 'text-zinc-500'}`}>
                          {step.tech}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-emerald-500' : 'text-zinc-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Step info console logs */}
              <div className={`p-4 rounded-xl border font-mono text-[11px] select-text ${
                isDark ? 'bg-zinc-950 border-zinc-850 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Trace Console logs</span>
                  <Share2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 animate-pulse" />
                </div>
                <div className="space-y-1.5">
                  <p className={`font-sans font-medium text-xs ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    {mernSteps[activeMernStep].action}
                  </p>
                  <pre className="text-emerald-500 dark:text-emerald-400 bg-emerald-500/5 p-1 px-1.5 rounded text-[10px] block mt-2 overflow-x-auto border border-emerald-500/10 font-bold">
                    {mernSteps[activeMernStep].output}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Certifications and Education Row */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Certifications Column */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <Award className="w-6 h-6 text-emerald-500" />
              <h3 className="font-bold text-lg tracking-tight">
                Verified Certifications and Achievements
              </h3>
            </div>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => {
                const isIITM = cert.includes("IITM Pravartak") || cert.includes("IITM");
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all ${
                      isIITM
                        ? isDark 
                          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-md shadow-emerald-500/5' 
                          : 'bg-emerald-50/70 border-emerald-200 shadow-sm'
                        : isDark
                          ? 'bg-zinc-850/60 border-zinc-800'
                          : 'bg-zinc-50 border-zinc-150'
                    }`}
                  >
                    <div className={`p-2 rounded-lg flex-shrink-0 flex items-center justify-center ${
                      isIITM 
                        ? 'bg-emerald-500/20 text-emerald-500' 
                        : isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-zinc-500 border border-zinc-150'
                    }`}>
                      <Award className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {isIITM && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                            Featured Cert
                          </span>
                        )}
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold leading-relaxed mt-1 ${
                        isIITM 
                          ? isDark ? 'text-emerald-400 font-bold' : 'text-emerald-800 font-bold' 
                          : isDark ? 'text-zinc-200' : 'text-zinc-700'
                      }`}>
                        {cert}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education Column */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-850">
              <GraduationCap className="w-6 h-6 text-emerald-500" />
              <h3 className="font-bold text-lg tracking-tight">
                Academic Background
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start space-x-3.5 transition-all ${
                    isDark ? 'bg-zinc-850/60 border-zinc-805' : 'bg-zinc-50 border-zinc-150'
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-zinc-500 border border-zinc-150'
                  }`}>
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-mono font-bold">
                        {edu.duration}
                      </span>
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-zinc-450' : 'text-zinc-500'}`}>
                        {edu.score}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
                      {edu.degree}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      {edu.institution}
                    </p>
                    {edu.stream && (
                      <span className={`text-[10px] font-mono inline-block mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Stream: {edu.stream}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
