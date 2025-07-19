import React from 'react';
import { PasswordAnalysis } from '../utils/passwordStrength';
import { HackerText } from './HackerText';

interface StrengthMeterProps {
  analysis: PasswordAnalysis;
  isDark: boolean;
}

export function StrengthMeter({ analysis, isDark }: StrengthMeterProps) {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Très Faible': return isDark ? 'from-red-500 to-red-600' : 'from-red-400 to-red-500';
      case 'Faible': return isDark ? 'from-red-400 to-orange-500' : 'from-red-300 to-orange-400';
      case 'Moyen': return isDark ? 'from-yellow-500 to-orange-500' : 'from-yellow-400 to-orange-400';
      case 'Bon': return isDark ? 'from-blue-500 to-cyan-500' : 'from-blue-400 to-blue-500';
      case 'Fort': return isDark ? 'from-green-500 to-emerald-500' : 'from-green-400 to-green-500';
      case 'Très Fort': return isDark ? 'from-emerald-500 to-cyan-400' : 'from-emerald-400 to-green-500';
      default: return 'from-gray-300 to-gray-400';
    }
  };

  const getStrengthTextColor = (strength: string) => {
    switch (strength) {
      case 'Très Faible': return 'text-red-400';
      case 'Faible': return 'text-orange-400';
      case 'Moyen': return 'text-yellow-400';
      case 'Bon': return isDark ? 'text-cyan-400' : 'text-blue-500';
      case 'Fort': return 'text-green-400';
      case 'Très Fort': return isDark ? 'text-cyan-300' : 'text-emerald-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Force du Mot de Passe
        </span>
        <span className={`text-sm font-bold ${getStrengthTextColor(analysis.strength)} font-mono`}>
          <HackerText text={analysis.strength} speed={30} />
        </span>
      </div>
      
      <div className={`
        relative w-full h-4 rounded-full overflow-hidden
        ${isDark ? 'bg-gray-800' : 'bg-gray-200'}
        shadow-inner
      `}>
        <div
          className={`
            h-full bg-gradient-to-r ${getStrengthColor(analysis.strength)}
            transition-all duration-500 ease-out relative overflow-hidden
            shadow-lg
          `}
          style={{ width: `${analysis.score}%` }}
        >
          {/* Effet de brillance */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          
          {/* Effet de scan */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" 
               style={{ animationDuration: '2s' }} />
        </div>
        
        {/* Grille futuriste */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute top-0 bottom-0 w-px ${isDark ? 'bg-cyan-500' : 'bg-blue-500'}`}
              style={{ left: `${i * 10}%` }}
            />
          ))}
        </div>
      </div>
      
      <div className={`
        flex items-center justify-between text-xs font-mono
        ${isDark ? 'text-gray-400' : 'text-gray-500'}
      `}>
        <span>Score: {analysis.score}/100</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${i < Math.floor(analysis.score / 20) 
                  ? (isDark ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 'bg-blue-500') 
                  : (isDark ? 'bg-gray-700' : 'bg-gray-300')
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}