import React, { useState } from 'react';
import { Eye, EyeOff, Terminal } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
}

export function PasswordInput({ value, onChange, isDark }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className={`
        absolute inset-0 rounded-lg transition-all duration-300
        ${isFocused 
          ? (isDark 
            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-sm' 
            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm'
          )
          : ''
        }
      `} />
      
      <div className="relative">
        <div className={`
          absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300
          ${isFocused 
            ? (isDark ? 'text-cyan-400' : 'text-blue-500') 
            : (isDark ? 'text-gray-500' : 'text-gray-400')
          }
        `}>
          <Terminal size={20} />
        </div>
        
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Entrez votre mot de passe..."
          className={`
            w-full pl-12 pr-12 py-4 text-lg rounded-lg transition-all duration-300
            border-2 focus:outline-none font-mono
            ${isDark
              ? 'bg-gray-900/80 border-gray-700 text-cyan-100 placeholder-gray-500 focus:border-cyan-500 focus:bg-gray-900'
              : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
            }
            ${isFocused ? 'shadow-lg' : ''}
          `}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`
            absolute right-3 top-1/2 transform -translate-y-1/2 
            transition-all duration-300 hover:scale-110 active:scale-95
            ${isDark 
              ? 'text-gray-400 hover:text-cyan-400' 
              : 'text-gray-500 hover:text-blue-500'
            }
          `}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      {/* Effet de scan */}
      {isFocused && (
        <div className={`
          absolute inset-0 rounded-lg pointer-events-none
          ${isDark 
            ? 'bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-blue-500/10 to-transparent'
          }
          animate-pulse
        `} />
      )}
    </div>
  );
}