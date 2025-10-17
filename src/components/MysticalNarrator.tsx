import { useEffect, useState } from 'react';
import narratorImage from '@/assets/mystical-narrator.jpg';

interface MysticalNarratorProps {
  message: string;
  isReversed?: boolean;
}

export const MysticalNarrator = ({ message, isReversed = false }: MysticalNarratorProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [message]);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setIsBlinking(false);
    }
  }, [currentIndex, message]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-cosmic rounded-3xl p-8 shadow-cosmic border border-primary/30 animate-scale-in">
        {/* Oracle Character */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative w-32 h-32 flex-shrink-0 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-gradient-glow rounded-full animate-pulse-glow" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-glow">
              <img 
                src={narratorImage} 
                alt="Mystical Oracle" 
                className={`w-full h-full object-cover ${isReversed ? 'grayscale-[30%]' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            {/* Floating particles around oracle */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-float"
                style={{
                  top: `${20 + Math.sin(i) * 40}%`,
                  left: `${20 + Math.cos(i) * 40}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Oracle Message */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="font-heading text-2xl font-bold text-primary">
                {isReversed ? "The Oracle Cautions..." : "The Oracle Speaks..."}
              </h3>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full bg-primary ${currentIndex < message.length ? 'animate-pulse' : ''}`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative bg-card/50 rounded-2xl p-6 backdrop-blur-sm border border-primary/20">
              <div className="absolute top-4 left-4 text-primary/30 text-4xl font-serif">"</div>
              <div className="absolute bottom-4 right-4 text-primary/30 text-4xl font-serif">"</div>
              
              <p className="font-body text-lg leading-relaxed text-foreground relative z-10 min-h-[120px]">
                {displayedText}
                {isBlinking && currentIndex < message.length && (
                  <span className="inline-block w-1 h-5 bg-primary ml-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Mystical elements */}
            <div className="flex justify-center gap-3 pt-2">
              {['✦', '✧', '✦'].map((symbol, i) => (
                <span
                  key={i}
                  className="text-primary text-xl animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  {symbol}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-glow opacity-20 pointer-events-none animate-pulse-glow" />
      </div>
    </div>
  );
};
