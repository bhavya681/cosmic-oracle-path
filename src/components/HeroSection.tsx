import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/cosmic-hero.jpg';
import HiddenAstrologer from '../../public/hiddenastrologerlogo.jpg';

function useTypewriter(strings: string[], speed = 50, pause = 1400) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const [stringIdx, setStringIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutId = useRef<number>();

  useEffect(() => {
    if (phase === 'typing') {
      if (charIdx < strings[stringIdx].length) {
        timeoutId.current = window.setTimeout(() => {
          setDisplay((prev) => prev + strings[stringIdx][charIdx]);
          setCharIdx(charIdx + 1);
        }, speed);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      timeoutId.current = window.setTimeout(() => setPhase('deleting'), pause);
    } else if (phase === 'deleting') {
      if (charIdx > 0) {
        timeoutId.current = window.setTimeout(() => {
          setDisplay((prev) => prev.slice(0, -1));
          setCharIdx(charIdx - 1);
        }, speed / 1.5);
      } else {
        setPhase('typing');
        setStringIdx((idx) => (idx + 1) % strings.length);
      }
    }
    return () => {
      window.clearTimeout(timeoutId.current);
    };
    // eslint-disable-next-line
  }, [charIdx, phase, stringIdx, strings, speed, pause]);

  useEffect(() => {
    if (phase === 'typing') {
      setDisplay('');
      setCharIdx(0);
    }
    // eslint-disable-next-line
  }, [stringIdx]);

  return display;
}

export const HeroSection = () => {
  const typewriterText = useTypewriter([
    "The Hidden Astrologer",
    "Awaken the Mysteries of Your Soul"
  ], 60, 1200);

  const scrollToJourney = () => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-20 min-h-screen flex flex-col justify-between items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto animate-fade-in mt-[-5vh] flex flex-col items-center">
        {/* Avatar/Logo Image */}
        <div className="w-44 h-44 mb-10 rounded-full shadow-cosmic bg-card/90 border-4 border-gradient-to-br from-primary via-accent to-cosmic-purple overflow-hidden flex items-center justify-center ring-2 ring-cosmic-lavender/50">
          <img
            src={HiddenAstrologer}
            alt="The Hidden Astrologer"
            className="object-cover w-full h-full transition-transform duration-700"
            style={{
              objectPosition: 'center 92%', // push image even lower for a balanced, elegant look
              transform: 'scale(1.58)',
              filter: 'drop-shadow(0 6px 28px hsla(var(--primary),0.14)) saturate(1.13) brightness(1.11)'
            }}
            loading="eager"
          />
        </div>
        {/* Typewriter Headline */}
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-cosmic-lavender to-accent bg-clip-text text-transparent animate-pulse-glow min-h-[100px]">
          <span>{typewriterText}<span className="animate-blink">|</span></span>
        </h1>

        {/* Short single line summary */}
        <p className="font-body text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tarot. Past lives. Vedic astrology. Discover clarity & cosmic purpose, all in one portal.
        </p>
      </div>

      {/* Buttons always at the bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-5 z-30">
        {/* Begin Your Journey Button */}
        <a
          href="#tarrot"
          onClick={scrollToJourney}
          className="group relative inline-flex items-center justify-center overflow-hidden bg-primary transition-all duration-300 
                     text-primary-foreground font-semibold text-base px-6 py-2.5 rounded-full shadow-glow focus:outline-none
                     hover:bg-gradient-to-r hover:from-primary hover:via-cosmic-purple hover:to-accent"
          style={{
            boxShadow: '0 2px 14px hsl(var(--primary) / 0.18), 0 0 0 1.5px hsl(var(--primary) / 0.10)'
          }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Begin Your Journey</span>
          <span
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(90deg, hsl(var(--primary)/0.3), hsl(var(--cosmic-purple)/0.25), hsl(var(--accent)/0.35))"
            }}
          />
        </a>
        {/* Scroll Down Button AT THE BOTTOM always */}
        <a
          href="#tarrot"
          onClick={scrollToJourney}
          className="flex items-center justify-center rounded-full border-none bg-background/80 p-0 focus:outline-none shadow-cosmic transition-all duration-300 hover:bg-background/100 slow-bounce"
          style={{ width: 48, height: 48, minWidth: 0, backdropFilter: 'blur(4px)' }}
          aria-label="Scroll down"
          tabIndex={0}
        >
          <ChevronDown className="w-7 h-7 text-primary drop-shadow-lg" strokeWidth={2.5} />
          {/* Custom slow bounce animation */}
          <style>
            {`
              @keyframes slow-bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(20%); }
              }
              .slow-bounce {
                animation: slow-bounce 2.6s cubic-bezier(.7,0,.35,1.4) infinite;
              }
            `}
          </style>
        </a>
      </div>

      {/* Typewriter caret animation */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            display: inline-block;
            width: 1ch;
            animation: blink 1s infinite steps(1);
          }
        `}
      </style>
    </section>
  );
};
