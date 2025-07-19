import React from 'react';
import { PasswordAnalysis } from '../utils/passwordStrength';
import { Hash, Type, Key, Clock, Zap } from 'lucide-react';
import { HackerText } from './HackerText';

interface PasswordMetricsProps {
  analysis: PasswordAnalysis;
  isDark: boolean;
}

export function PasswordMetrics({ analysis, isDark }: PasswordMetricsProps) {
  const { length, charset, entropy, bruteForceTime } = analysis;

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color,
    animate = false 
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle: string;
    color: string;
    animate?: boolean;
  }) => (
    <div className={`
      relative p-6 rounded-xl border transition-all duration-300 hover:scale-105
      ${isDark 
        ? 'bg-gray-900/80 border-gray-700 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' 
        : 'bg-white/80 border-gray-200 hover:border-blue-500/50 hover:shadow-lg'
      }
      backdrop-blur-sm group
    `}>
      {/* Effet de brillance au hover */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${isDark 
          ? 'bg-gradient-to-br from-cyan-500/5 to-purple-500/5' 
          : 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
        }
      `} />
      
      <div className="relative">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`p-2 rounded-lg ${color} transition-all duration-300 group-hover:scale-110`}>
            <Icon size={20} />
          </div>
          <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {title}
          </h3>
        </div>
        
        <p className={`text-3xl font-bold font-mono mb-2 ${isDark ? 'text-cyan-100' : 'text-gray-900'}`}>
          {animate ? <HackerText text={value.toString()} speed={40} /> : value}
        </p>
        
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} font-mono`}>
          {subtitle}
        </p>
      </div>
      
      {/* Effet de scan */}
      <div className={`
        absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100
        ${isDark 
          ? 'bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent' 
          : 'bg-gradient-to-r from-transparent via-blue-500/10 to-transparent'
        }
        animate-pulse
      `} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={Type}
        title="Longueur"
        value={length}
        subtitle={length < 8 ? 'Trop court' : length < 12 ? 'Correct' : 'Excellent'}
        color={isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}
        animate={true}
      />

      <MetricCard
        icon={Hash}
        title="Jeu de Caractères"
        value={charset.size}
        subtitle={
          <div className="flex flex-wrap gap-1 mt-1">
            <span className={`px-2 py-1 text-xs rounded ${charset.lowercase ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-600')}`}>
              a-z
            </span>
            <span className={`px-2 py-1 text-xs rounded ${charset.uppercase ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-600')}`}>
              A-Z
            </span>
            <span className={`px-2 py-1 text-xs rounded ${charset.numbers ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-600')}`}>
              0-9
            </span>
            <span className={`px-2 py-1 text-xs rounded ${charset.symbols ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-800') : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-600')}`}>
              !@#
            </span>
          </div>
        }
        color={isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}
        animate={true}
      />

      <MetricCard
        icon={Key}
        title="Entropie"
        value={`${entropy.toFixed(1)}`}
        subtitle="bits de sécurité"
        color={isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}
        animate={true}
      />

      <MetricCard
        icon={Clock}
        title="Temps de Brute Force"
        value=""
        subtitle={
          <div className={`text-sm font-bold leading-tight ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            <HackerText text={bruteForceTime} speed={60} />
            <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              à 1Md tentatives/sec
            </div>
          </div>
        }
        color={isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}
      />
    </div>
  );
}