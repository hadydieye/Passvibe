import React from 'react';
import { PasswordAnalysis } from '../utils/passwordStrength';
import { CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';
import { HackerText } from './HackerText';

interface PasswordFeedbackProps {
  analysis: PasswordAnalysis;
  isDark: boolean;
}

export function PasswordFeedback({ analysis, isDark }: PasswordFeedbackProps) {
  const { feedback, score } = analysis;

  if (feedback.length === 0) return null;

  const getIcon = (text: string) => {
    if (text.includes('Excellent')) {
      return <CheckCircle className="text-green-400" size={18} />;
    } else if (text.includes('Considérez') || text.includes('Utilisez au moins')) {
      return <AlertTriangle className="text-yellow-400" size={18} />;
    } else {
      return <XCircle className="text-red-400" size={18} />;
    }
  };

  const getTextColor = (text: string) => {
    if (text.includes('Excellent')) return isDark ? 'text-green-400' : 'text-green-600';
    if (text.includes('Considérez') || text.includes('Utilisez au moins')) return isDark ? 'text-yellow-400' : 'text-yellow-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  return (
    <div className={`
      relative p-6 rounded-xl border transition-all duration-300
      ${isDark 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
      }
      backdrop-blur-sm
    `}>
      {/* Effet de brillance */}
      <div className={`
        absolute inset-0 rounded-xl opacity-20
        ${isDark 
          ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10' 
          : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
        }
      `} />
      
      <div className="relative">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-100 text-blue-600'}`}>
            <Shield size={20} />
          </div>
          <h3 className={`text-lg font-bold ${isDark ? 'text-cyan-100' : 'text-gray-900'} font-mono`}>
            <HackerText text="ANALYSE SÉCURITAIRE" speed={30} />
          </h3>
        </div>
        
        <div className="space-y-3">
          {feedback.map((item, index) => (
            <div 
              key={index} 
              className={`
                flex items-start space-x-3 p-3 rounded-lg transition-all duration-300
                ${isDark ? 'bg-gray-800/50 hover:bg-gray-800/80' : 'bg-gray-50 hover:bg-gray-100'}
                hover:scale-[1.02] hover:shadow-lg
              `}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(item)}
              </div>
              <span className={`text-sm font-medium ${getTextColor(item)} font-mono`}>
                <HackerText text={item} speed={20} />
              </span>
            </div>
          ))}
        </div>
        
        {score >= 80 && (
          <div className={`
            mt-6 p-4 rounded-lg border-2 transition-all duration-300
            ${isDark 
              ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' 
              : 'bg-green-50 border-green-200 hover:bg-green-100'
            }
            hover:scale-[1.02]
          `}>
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-400 animate-pulse" size={20} />
              <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-700'} font-mono`}>
                <HackerText text="SÉCURITÉ MAXIMALE ATTEINTE !" speed={25} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}