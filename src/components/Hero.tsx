/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, MapPin, Mail, Phone, Cpu, Database, Layout, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { useState } from 'react';

interface HeroProps {
  isDark: boolean;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ isDark, onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className={`relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 overflow-hidden ${
        isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-slate-50 text-zinc-850'
      }`}
    >
      {/* Decorative dynamic ambient circle */}
      <div className={`absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[90px] opacity-15 pointer-events-none transition-colors ${
        isDark ? 'bg-emerald-500' : 'bg-emerald-650'
      }`} />
      <div className={`absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 pointer-events-none transition-colors ${
        isDark ? 'bg-zinc-700' : 'bg-zinc-400'
      }`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">
        
        {/* Text Presentation Column */}
        <div className="w-full flex flex-col items-center justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 py-1 px-3.5 rounded-full text-xs font-semibold tracking-wide border w-fit"
            style={{
              borderColor: isDark ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.15)',
              backgroundColor: isDark ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.05)',
              color: isDark ? '#34d399' : '#059669'
            }}
          >
            <Cpu className="w-3.5 h-3.5 mr-1" />
            <span>Full Stack Developer &bull; </span>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              <span className={isDark ? 'text-zinc-100' : 'text-zinc-900'}>
                Hi, I'm{' '}
              </span>
              <span className="text-emerald-500 font-extrabold relative">
                {PERSONAL_INFO.name}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-500/30 rounded-md" />
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`text-xl sm:text-2xl font-semibold tracking-tight ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {PERSONAL_INFO.title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-650'
            }`}
          >
            {PERSONAL_INFO.bio}
          </motion.p>

          {/* Quick Contact Info Drawer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-4 px-5 rounded-xl border w-full max-w-xl text-left ${
              isDark ? 'bg-zinc-900/60 border-zinc-805/70' : 'bg-white border-zinc-200 shadow-xs'
            }`}
          >
            <div className="flex items-center space-x-3 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className={isDark ? 'text-zinc-300' : 'text-zinc-650'}>
                {PERSONAL_INFO.location}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs sm:text-sm">
              <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`hover:underline outline-none ${isDark ? 'text-zinc-350' : 'text-zinc-650'}`}
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="flex items-center space-x-3 text-xs sm:text-sm">
              <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className={`hover:underline outline-none ${isDark ? 'text-zinc-350' : 'text-zinc-650'}`}
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3 text-xs sm:text-sm">
              <Terminal className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className={`font-mono text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                BE Mechatronics (2023 - 2027)
              </span>
            </div>
          </motion.div>

          {/* Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              id="hero-go-projects-btn"
              onClick={() => onNavigate('projects')}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 active:scale-98 transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4 mr-0.5" />
            </button>
            <button
              id="hero-go-contact-btn"
              onClick={() => onNavigate('contact')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all border cursor-pointer ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  : 'bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              Let's Collaborate
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
