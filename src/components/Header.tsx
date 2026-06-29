/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code, Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { PERSONAL_INFO } from '../data';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onShowResumePrint: () => void;
}

export default function Header({
  isDark,
  onToggleTheme,
  activeSection,
  onNavigate,
  onShowResumePrint,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'Database Sandbox' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-app-header"
      className={`sticky top-0 z-40 w-full transition-all duration-350 backdrop-blur-md border-b ${
        isDark
          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-100'
          : 'bg-white/85 border-zinc-200 text-zinc-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('hero')}>
            <div className={`p-2 rounded-lg flex items-center justify-center ${
              isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-600 text-white'
            }`}>
              <Code className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-base sm:text-lg">
                {PERSONAL_INFO.name}
              </span>
              <span className={`text-[10px] font-mono tracking-widest ${
                isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                JS DEV &bull; MERN
              </span>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {menuItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                   key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-all ${
                    active
                      ? isDark
                        ? 'bg-zinc-800 text-emerald-400 font-semibold'
                        : 'bg-zinc-100 text-emerald-600 font-semibold border-b-2 border-emerald-500 rounded-none'
                      : isDark
                        ? 'text-zinc-400 hover:text-zinc-100'
                        : 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action items */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Resume Button */}
            <button
              id="header-resume-print-btn"
              onClick={onShowResumePrint}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border outline-none ${
                isDark
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
              }`}
              title="Open structured printable portfolio"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Print Resume</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isDark ? 'text-zinc-400 hover:bg-zinc-800' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div
          id="mobile-dropdown-menu"
          className={`md:hidden px-4 pt-2 pb-4 space-y-1 transition-all ${
            isDark ? 'bg-zinc-900 border-t border-zinc-800' : 'bg-white border-t border-zinc-200'
          }`}
        >
          {menuItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? isDark
                      ? 'bg-zinc-850 text-emerald-400 font-semibold'
                      : 'bg-zinc-100 text-emerald-600 font-semibold border-l-2 border-emerald-500 rounded-none'
                    : isDark
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                      : 'text-zinc-650 hover:text-zinc-900 hover:bg-zinc-100/75'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
