/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggle}
      className={`relative p-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
        isDark 
          ? 'bg-zinc-800 text-emerald-400 border border-zinc-700 hover:bg-zinc-750' 
          : 'bg-white text-zinc-800 border border-zinc-200 shadow-xs hover:bg-zinc-50'
      }`}
      aria-label="Toggle visual theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
