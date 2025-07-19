import React, { useState, useMemo, useEffect } from 'react';
import { Shield, Terminal, Cpu, Zap } from 'lucide-react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthMeter } from './components/StrengthMeter';
import { PasswordMetrics } from './components/PasswordMetrics';
import { PasswordFeedback } from './components/PasswordFeedback';
import { ThemeToggle } from './components/ThemeToggle';
import { MatrixRain } from './components/MatrixRain';
import { HackerText } from './components/HackerText';
import { analyzePassword } from './utils/passwordStrength';

function App() {
  const [password, setPassword] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const analysis = useMemo(() => {
    return analyzePassword(password);
  }, [password]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`
      min-h-screen transition-all duration-500 relative overflow-hidden
      ${isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100'
      }
    `}>
      {/* Matrix Rain Background */}
      <MatrixRain isDark={isDark} />
      
      {/* Grille futuriste */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${isDark ? '#00ffff' : '#0066cc'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? '#00ffff' : '#0066cc'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Particules flottantes */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 rounded-full animate-pulse
              ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header avec animation */}
          <div className={`
            text-center mb-12 transform transition-all duration-1000
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className={`
                p-4 rounded-full transition-all duration-300 hover:scale-110
                ${isDark 
                  ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/30' 
                  : 'bg-blue-100 text-blue-600 shadow-lg'
                }
              `}>
                <img 
                  src="/favicon.svg" 
                  alt="PassVibe Logo" 
                  className="w-10 h-10 animate-pulse"
                />
              </div>
              <h1 className={`
                text-5xl font-bold font-mono
                ${isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                }
              `}>
                <HackerText text="PASSVIBE" speed={40} />
              </h1>
            </div>
            
            <div className={`
              text-xl font-mono mb-4
              ${isDark ? 'text-cyan-300' : 'text-blue-700'}
            `}>
              <HackerText text="ANALYSEUR SÉCURITAIRE AVANCÉ" speed={30} />
            </div>
            
            <p className={`
              max-w-3xl mx-auto font-mono text-sm
              ${isDark ? 'text-gray-400' : 'text-gray-600'}
            `}>
              PassVibe analyse la robustesse de vos mots de passe en temps réel avec une interface futuriste. 
              Métriques avancées : entropie, diversité des caractères et estimation du temps de brute-force.
            </p>

            {/* Theme Toggle */}
            <div className="absolute top-8 right-8">
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            </div>
          </div>

          {/* Interface principale */}
          <div className={`
            transform transition-all duration-1000 delay-300
            ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}>
            {/* Input Section */}
            <div className={`
              relative p-8 rounded-2xl border mb-8 transition-all duration-300
              ${isDark 
                ? 'bg-gray-900/60 border-gray-700 shadow-2xl shadow-cyan-500/10' 
                : 'bg-white/60 border-gray-200 shadow-2xl'
              }
              backdrop-blur-lg hover:shadow-3xl
            `}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`
                  p-3 rounded-lg transition-all duration-300
                  ${isDark ? 'bg-gray-800 text-cyan-400' : 'bg-gray-100 text-blue-600'}
                `}>
                  <Terminal size={24} />
                </div>
                <h2 className={`
                  text-xl font-bold font-mono
                  ${isDark ? 'text-cyan-100' : 'text-gray-900'}
                `}>
                  <HackerText text="TERMINAL D'ANALYSE" speed={25} />
                </h2>
              </div>
              <PasswordInput value={password} onChange={setPassword} isDark={isDark} />
            </div>

            {password && (
              <>
                {/* Strength Meter */}
                <div className={`
                  relative p-8 rounded-2xl border mb-8 transition-all duration-500
                  ${isDark 
                    ? 'bg-gray-900/60 border-gray-700 shadow-2xl shadow-purple-500/10' 
                    : 'bg-white/60 border-gray-200 shadow-2xl'
                  }
                  backdrop-blur-lg transform hover:scale-[1.02]
                `}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`
                      p-3 rounded-lg transition-all duration-300 animate-pulse
                      ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}
                    `}>
                      <Zap size={24} />
                    </div>
                    <h2 className={`
                      text-xl font-bold font-mono
                      ${isDark ? 'text-purple-300' : 'text-purple-700'}
                    `}>
                      <HackerText text="NIVEAU DE SÉCURITÉ" speed={25} />
                    </h2>
                  </div>
                  <StrengthMeter analysis={analysis} isDark={isDark} />
                </div>

                {/* Metrics */}
                <div className={`
                  relative p-8 rounded-2xl border mb-8 transition-all duration-500
                  ${isDark 
                    ? 'bg-gray-900/60 border-gray-700 shadow-2xl shadow-green-500/10' 
                    : 'bg-white/60 border-gray-200 shadow-2xl'
                  }
                  backdrop-blur-lg
                `}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`
                      p-3 rounded-lg transition-all duration-300
                      ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}
                    `}>
                      <Cpu size={24} className="animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    <h2 className={`
                      text-xl font-bold font-mono
                      ${isDark ? 'text-green-300' : 'text-green-700'}
                    `}>
                      <HackerText text="MÉTRIQUES AVANCÉES" speed={25} />
                    </h2>
                  </div>
                  <PasswordMetrics analysis={analysis} isDark={isDark} />
                </div>

                {/* Feedback */}
                <div className={`
                  transform transition-all duration-500
                  hover:scale-[1.02]
                `}>
                  <PasswordFeedback analysis={analysis} isDark={isDark} />
                </div>
              </>
            )}

            {!password && (
              <div className={`
                relative p-12 rounded-2xl border text-center transition-all duration-500
                ${isDark 
                  ? 'bg-gray-900/40 border-gray-700 shadow-2xl' 
                  : 'bg-white/40 border-gray-200 shadow-2xl'
                }
                backdrop-blur-lg hover:bg-opacity-60
              `}>
                <div className={`
                  mb-6 transition-all duration-300 hover:scale-110
                  ${isDark ? 'text-cyan-400' : 'text-blue-500'}
                `}>
                  <Shield size={64} className="mx-auto animate-pulse" />
                </div>
                <p className={`
                  text-lg font-mono
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  <HackerText text="Initialisez l'analyse en saisissant un mot de passe..." speed={40} />
                </p>
              </div>
            )}

            {/* Conseils de sécurité */}
            <div className={`
              mt-12 p-8 rounded-2xl border transition-all duration-500
              ${isDark 
                ? 'bg-gray-900/40 border-gray-700 shadow-2xl' 
                : 'bg-white/40 border-gray-200 shadow-2xl'
              }
              backdrop-blur-lg hover:bg-opacity-60
            `}>
              <h2 className={`
                text-2xl font-bold font-mono mb-6 text-center
                ${isDark 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                }
              `}>
                <HackerText text="PROTOCOLES DE SÉCURITÉ" speed={30} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`
                  p-6 rounded-xl border transition-all duration-300 hover:scale-105
                  ${isDark 
                    ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' 
                    : 'bg-green-50 border-green-200 hover:bg-green-100'
                  }
                `}>
                  <h3 className={`
                    font-bold font-mono mb-4 text-lg
                    ${isDark ? 'text-green-400' : 'text-green-700'}
                  `}>
                    ✅ RECOMMANDATIONS
                  </h3>
                  <ul className={`
                    space-y-2 text-sm font-mono
                    ${isDark ? 'text-green-300' : 'text-green-600'}
                  `}>
                    <li>• Minimum 12 caractères</li>
                    <li>• Mélange majuscules/minuscules</li>
                    <li>• Inclure chiffres et symboles</li>
                    <li>• Mot de passe unique par compte</li>
                    <li>• Utiliser un gestionnaire de mots de passe</li>
                  </ul>
                </div>
                <div className={`
                  p-6 rounded-xl border transition-all duration-300 hover:scale-105
                  ${isDark 
                    ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20' 
                    : 'bg-red-50 border-red-200 hover:bg-red-100'
                  }
                `}>
                  <h3 className={`
                    font-bold font-mono mb-4 text-lg
                    ${isDark ? 'text-red-400' : 'text-red-700'}
                  `}>
                    ❌ À ÉVITER
                  </h3>
                  <ul className={`
                    space-y-2 text-sm font-mono
                    ${isDark ? 'text-red-300' : 'text-red-600'}
                  `}>
                    <li>• Informations personnelles</li>
                    <li>• Mots du dictionnaire</li>
                    <li>• Suites logiques (123, abc)</li>
                    <li>• Répétition de caractères</li>
                    <li>• Partage de mots de passe</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;