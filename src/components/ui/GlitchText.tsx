import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

export function GlitchText({ text, className = '', as: Tag = 'span' }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > maxIterations) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <Tag className={`${className} font-mono`}>{display}</Tag>;
}
