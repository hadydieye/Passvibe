import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative p-3 rounded-full transition-all duration-300 
        ${isDark 
          ? 'bg-gray-800 text-cyan-400 hover:bg-gray-700 shadow-lg shadow-cyan-500/20' 
          : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
        }
        border-2 ${isDark ? 'border-cyan-500/30' : 'border-gray-200'}
        hover:scale-110 active:scale-95
      `}
    >
      <div className="relative">
        {isDark ? (
          <Sun size={20} className="animate-pulse" />
        ) : (
          <Moon size={20} />
        )}
        {isDark && (
          <div className="absolute inset-0 animate-ping">
            <Sun size={20} className="opacity-30" />
          </div>
        )}
      </div>
    </button>
  );
}