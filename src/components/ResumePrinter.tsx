/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Printer, X, Download, ShieldCheck, Award, GraduationCap, MapPin, Mail, Phone, Code } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATIONS } from '../data';
import { motion } from 'motion/react';

interface ResumePrinterProps {
  onClose: () => void;
  isDark: boolean;
}

export default function ResumePrinter({ onClose, isDark }: ResumePrinterProps) {
  const triggerPrint = () => {
    // Standard secure printable function trigger
    window.print();
  };

  return (
    <div
      id="resume-printer-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden my-8 print:my-0 print:shadow-none print:rounded-none transition-all print:bg-white ${
          isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white'
        }`}
      >
        
        {/* Printable Control Bar (Hidden on print) */}
        <div className={`p-4 border-b flex items-center justify-between print:hidden ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-150' : 'bg-slate-50 border-zinc-200 text-zinc-800'
        }`}>
          <div className="flex items-center space-x-2">
            <Printer className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-sm uppercase tracking-wider font-mono">
              Professional Resume Exporter
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
               id="resume-trigger-print-btn"
              onClick={triggerPrint}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs outline-none cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              id="resume-close-modal-btn"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-200 text-zinc-600 hover:text-zinc-905'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper container sheet - Strictly Styles for perfect print alignment */}
        <div
          id="resume-printable-sheet"
          className="p-8 sm:p-12 overflow-y-auto bg-white text-zinc-900 max-h-[80vh] print:max-h-none print:overflow-visible font-sans print:p-0"
          style={{ color: '#111827', backgroundColor: '#ffffff' }}
        >
          {/* Paper Header */}
          <div className="border-b-2 border-zinc-800 pb-5 mb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: '#111827' }}>
                {PERSONAL_INFO.name}
              </h1>
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-650 mt-1">
                {PERSONAL_INFO.title}
              </h2>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">{PERSONAL_INFO.subTitle}</p>
            </div>
            
            <div className="mt-4 sm:mt-0 space-y-1 text-xs text-zinc-600 font-mono text-center sm:text-right w-full sm:w-auto">
              <div className="flex items-center justify-center sm:justify-end space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-zinc-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Resume Column (8 Columns width for Experience, Projects, Education) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Summary Statement */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Professional Statement
                </h3>
                <p className="text-xs leading-relaxed text-zinc-700 font-sans">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Professional Experience
                </h3>
                
                {EXPERIENCE.map((exp, expIdx) => (
                  <div key={expIdx} className="space-y-2">
                    <div className="flex items-start justify-between flex-wrap gap-1">
                      <div>
                        <h4 className="text-sm font-bold">{exp.role}</h4>
                        <span className="text-xs font-bold text-zinc-700">{exp.company} &bull; <em className="font-normal font-mono text-[11px]">{exp.type}</em></span>
                      </div>
                      <span className="text-xs font-bold font-mono text-zinc-500 bg-zinc-100 p-1 px-2 rounded">{exp.duration}</span>
                    </div>

                    <ul className="list-disc pl-4 space-y-1 text-zinc-650 text-xs">
                      {exp.highlights.map((doc, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Select Projects on printable */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Principal Portfolio Projects
                </h3>

                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-extrabold">{proj.name}</h4>
                      <span className="text-[10px] font-mono text-zinc-500">{proj.stack.join(', ')}</span>
                    </div>
                    <p className="text-xs text-zinc-700 font-sans italic">{proj.description}</p>
                    <ul className="list-disc pl-4 space-y-0.5 text-zinc-650 text-[11px]">
                      {proj.highlights.slice(0, 2).map((item, key) => (
                        <li key={key}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Resume Column (4 Columns width for Skills, Education, Certifications) */}
            <div className="md:col-span-4 space-y-6">
              
              {/* Category Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Key Skills Core
                </h3>

                {SKILL_CATEGORIES.map((cat, key) => (
                  <div key={key} className="space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill) => (
                        <span key={skill.name} className="text-[10px] bg-zinc-100 text-zinc-800 p-1 px-2 rounded border border-zinc-150">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education details info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Education Details
                </h3>

                {EDUCATION.map((edu, key) => (
                  <div key={key} className="space-y-0.5">
                    <h4 className="text-xs font-bold text-zinc-900">{edu.degree}</h4>
                    <p className="text-[10px] text-zinc-650 whitespace-pre-wrap">{edu.institution}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-500">
                      <span>{edu.duration}</span>
                      <span className="bg-emerald-500/10 text-emerald-800 p-0.5 px-1.5 rounded">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certs list */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-b pb-1">
                  Certifications
                </h3>
                <ul className="space-y-1.5 text-[10px] text-zinc-650">
                  {CERTIFICATIONS.map((cert, key) => (
                    <li key={key} className="flex items-start space-x-1.5 leading-tight">
                      <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Paper print footer */}
          <div className="mt-8 pt-4 border-t border-zinc-300 text-center text-[10px] font-mono text-zinc-400">
            <span>Portfolio and Resume of Tamoharini R &bull; Compiled dynamically relative to Local State</span>
          </div>
        </div>

        {/* Paper visual hint (Hidden on print) */}
        <div className={`p-3.5 text-center text-xs font-mono font-medium border-t flex items-center justify-center space-x-2 print:hidden ${
          isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-500' : 'bg-slate-50 border-zinc-200 text-zinc-600'
        }`}>
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Compatible with standard Chrome and Edge PDF export systems. Set layouts as "Portrait".</span>
        </div>
      </motion.div>
    </div>
  );
}
