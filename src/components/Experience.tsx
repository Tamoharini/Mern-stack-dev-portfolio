/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Briefcase, Calendar, MapPin, Sparkles, Database, CheckCircle2, ChevronRight, Laptop } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCE } from '../data';
import { useState } from 'react';

interface ExperienceProps {
  isDark: boolean;
}

export default function Experience({ isDark }: ExperienceProps) {
  const [selectedScreen, setSelectedScreen] = useState<number>(0);
  const [apiEndpointSelected, setApiEndpointSelected] = useState<number>(0);

  const screens = [
    {
      title: 'Onboarding Flow',
      scope: 'Multi-step forms, progressive disclosure, password safety requirements, responsive validation.',
      stack: ['React Router', 'State Management', 'Form Hooks'],
      metric: 'Improved registration rate by ~18% through dynamic state-binding'
    },
    {
      title: 'User Profile Portal',
      scope: 'Direct account editing, image preview binding, dynamic state persistence, security settings.',
      stack: ['React.js', 'Tailwind CSS', 'LocalStorage Fetch'],
      metric: 'Enabled seamless avatar mapping and responsive bio fields'
    },
    {
      title: 'Discovery Feed',
      scope: 'Live mock feeds, horizontal ticker headers, search filter bindings, complex responsive layout grids.',
      stack: ['Lucide Icons', 'Grid Architecture', 'Debounced Search'],
      metric: 'Fully responsive from 320px mobile to 1440px high-density monitors'
    },
    {
      title: 'Real-time Chat Core',
      scope: 'Interactive messaging panels, custom-styled scroll bars, date timestamps, instant list append.',
      stack: ['CSS Transitions', 'Component Architecture', 'JS ES6+'],
      metric: 'Designed lightweight component buffers reducing chat-re-renders'
    }
  ];

  const endpoints = [
    {
      method: 'POST',
      url: '/api/v1/auth/onboarding',
      desc: 'Form submission executing new account profile construction during setup.',
      payload: '{"username": "tamoharini", "email": "tamoharini2005@gmail.com"}',
      response: '{"id": "usr_94a2f8", "status": "active", "created_at": "2026-03-12"}'
    },
    {
      method: 'GET',
      url: '/api/v1/user/profile',
      desc: 'Retrieves active user account metadata and binds it to the layout state.',
      response: '{"name": "Tamoharini R", "location": "Coimbatore, TN", "role": "Intern"}'
    },
    {
      method: 'PUT',
      url: '/api/v1/user/profile/update',
      desc: 'Updates custom client bios, email triggers, and professional details securely.',
      payload: '{"bio": "Developer seeking scalable MERN structures..."}',
      response: '{"success": true, "updated_fields": ["bio"]}'
    },
    {
      method: 'GET',
      url: '/api/v1/discovery/feed',
      desc: 'Loads real fintech active indexes, profiles, and media modules with filter tags.',
      response: '{"feed_items": [{"id": 1, "title": "FinTech Today"}, {"id": 2, "title": "Markets"}]}'
    },
    {
      method: 'POST',
      url: '/api/v1/chat/messages',
      desc: 'Triggers instant message transmission appending items into dialogue records.',
      payload: '{"text": "Hey Team, let\'s synchronize our review schedules!"}',
      response: '{"msg_id": "msg_52e185", "sent": true, "timestamp": "14:10"}'
    }
  ];

  return (
    <section
      id="experience"
      className={`py-20 ${
        isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-white text-zinc-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Professional Experience
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className={`mt-4 text-sm sm:text-base ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
            Shipped production components, integrated secure backend structures, and collaborated in Remote Agile environments.
          </p>
        </div>

        {/* Experience Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Experience Bio (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-zinc-850 border-zinc-800'
                    : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-emerald-500 uppercase block">
                      {exp.type}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight">
                      {exp.role}
                    </h3>
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                      {exp.company}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-zinc-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span className={isDark ? 'text-zinc-400' : 'text-zinc-655'}>{exp.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span className={isDark ? 'text-zinc-400' : 'text-zinc-650'}>{exp.location}</span>
                  </span>
                </div>

                <div className="mt-6 space-y-3.5">
                  <h5 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Key Responsibilities
                  </h5>
                  {exp.highlights.slice(3).concat(exp.highlights.slice(0,3)).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-650'}`}>
                        {hl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Screen & API integrated sections (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Shipped UI Screens Module */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-850 border-zinc-805' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-2.5 mb-5">
                <Laptop className="w-5 h-5 text-emerald-500" />
                <h4 className="text-sm font-bold tracking-tight uppercase font-mono">
                  Shipped UI Screens (Contract Deliverables)
                </h4>
              </div>

              {/* Dynamic Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {screens.map((screen, sIdx) => (
                  <button
                    key={sIdx}
                    id={`exp-screen-tab-${sIdx}`}
                    onClick={() => setSelectedScreen(sIdx)}
                    className={`px-3 py-2 rounded-xl text-[11px] font-bold text-center border transition-all ${
                      selectedScreen === sIdx
                        ? isDark
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : isDark
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    {screen.title}
                  </button>
                ))}
              </div>

              {/* Expanded details */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-150'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-500">Feature Deliverable Details</span>
                  <div className="flex space-x-1.5">
                    {screens[selectedScreen].stack.map((tag, tIdx) => (
                      <span key={tIdx} className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        isDark ? 'bg-zinc-800 text-emerald-450' : 'bg-white text-zinc-650 border border-zinc-200'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h5 className="font-bold text-sm tracking-tight mb-1.5">{screens[selectedScreen].title}</h5>
                <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-zinc-400' : 'text-zinc-650'}`}>
                  {screens[selectedScreen].scope}
                </p>

                <div className={`p-3 rounded-lg border flex items-start space-x-2 ${
                  isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-500/5 border-emerald-500/10'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-relaxed text-emerald-500 font-medium">
                    <strong>Impact Metric:</strong> {screens[selectedScreen].metric}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipped API Integrations Module */}
            <div className={`p-6 rounded-2xl border ${
              isDark ? 'bg-zinc-850 border-zinc-805' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex items-center space-x-2.5 mb-5">
                <Database className="w-5 h-5 text-emerald-500" />
                <h4 className="text-sm font-bold tracking-tight uppercase font-mono">
                  Integrated REST API Endpoints (5+ Bindings)
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Network sidebar lists */}
                <div className="md:col-span-5 space-y-1.5">
                  {endpoints.map((ep, epIdx) => {
                    const isSelected = apiEndpointSelected === epIdx;
                    return (
                      <button
                        key={epIdx}
                        id={`exp-api-btn-${epIdx}`}
                        onClick={() => setApiEndpointSelected(epIdx)}
                        className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all outline-none ${
                          isSelected
                            ? isDark
                              ? 'bg-zinc-800 border-zinc-750 text-white'
                              : 'bg-zinc-100 border-zinc-250 text-zinc-950 font-semibold'
                            : isDark
                              ? 'bg-zinc-900/50 border-zinc-800 text-zinc-450 hover:bg-zinc-800/40 hover:text-zinc-200'
                              : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:bg-zinc-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                            ep.method === 'GET' 
                              ? 'bg-green-500/10 text-green-500' 
                              : ep.method === 'POST' 
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-orange-500/10 text-orange-500'
                          }`}>
                            {ep.method}
                          </span>
                          <span className="text-[10px] font-mono truncate max-w-[110px] tracking-tight">{ep.url}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-1 text-emerald-500' : 'text-zinc-500'}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Simulated Response panel */}
                <div id="simulated-api-response-panel" className="md:col-span-7 flex flex-col justify-between">
                  <div className={`flex-1 p-4 rounded-xl border font-mono text-[11px] ${
                    isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-650'
                  }`}>
                    <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-400 uppercase">Interactive Network Inspector</span>
                      <span className="text-[10px] text-green-500 flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span>Status 200 OK</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-left">
                      <div>
                        <span className="text-zinc-500 text-[10px]">DESCRIPTION:</span>
                        <p className={`font-sans text-xs mt-0.5 font-medium ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>
                          {endpoints[apiEndpointSelected].desc}
                        </p>
                      </div>

                      {endpoints[apiEndpointSelected].payload && (
                        <div>
                          <span className="text-zinc-500 text-[10px]">PAYLOAD:</span>
                          <pre className="text-blue-500 bg-blue-500/5 p-1 px-1.5 rounded text-[10px] block overflow-x-auto mt-0.5">
                            {endpoints[apiEndpointSelected].payload}
                          </pre>
                        </div>
                      )}

                      <div>
                        <span className="text-zinc-500 text-[10px]">RESPONSE BODY:</span>
                        <pre className="text-green-500 bg-green-500/5 p-1 px-1.5 rounded text-[10px] block overflow-x-auto mt-0.5 font-bold">
                          {endpoints[apiEndpointSelected].response}
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 text-right mt-2 flex items-center justify-end space-x-1.5">
                    <span>* Decoded in real-time React component state logs</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
