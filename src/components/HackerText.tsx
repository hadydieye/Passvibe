import React, { useState, useEffect } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function HackerText({ text, className = '', speed = 50 }: HackerTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (!text) {
      setDisplayText('');
      return;
    }

    setIsAnimating(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}>
      {displayText}
    </span>
  );
}