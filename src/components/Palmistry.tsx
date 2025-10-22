import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hand, Sparkles } from 'lucide-react';

// Astrological/zodiac/celestial symbols for bg features
const ASTRO_SYMBOLS = [
  // '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓',
  '☉', '☽', '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇',
  '★', '✶', '✦', '✧', '✩', '✪', '✯',
];

const palmLines = [
  {
    id: 'heart',
    name: 'Heart Line',
    position: 'top-[20%] left-[15%] w-[70%]',
    color: 'bg-red-500',
    prediction: 'Your heart line reveals deep emotional connections and passionate relationships. You love intensely and seek meaningful bonds. Romance and creativity flow naturally through your life.',
  },
  {
    id: 'head',
    name: 'Head Line',
    position: 'top-[40%] left-[10%] w-[75%]',
    color: 'bg-blue-500',
    prediction: 'The head line indicates sharp intellect and analytical thinking. You approach challenges with logic and reason. Your mental clarity guides you toward wise decisions and innovative solutions.',
  },
  {
    id: 'life',
    name: 'Life Line',
    position: 'top-[30%] left-[20%] h-[60%]',
    color: 'bg-green-500',
    prediction: 'Your life line shows vitality, energy, and longevity. You possess strong life force and resilience. Adventures and new experiences energize your spirit and strengthen your path.',
  },
  {
    id: 'fate',
    name: 'Fate Line',
    position: 'top-[15%] left-[50%] h-[70%]',
    color: 'bg-purple-500',
    prediction: 'The fate line reveals your life purpose and career path. Destiny guides your journey with clarity. Success comes through following your true calling and embracing opportunities.',
  },
  {
    id: 'sun',
    name: 'Sun Line',
    position: 'top-[25%] left-[65%] h-[50%]',
    color: 'bg-yellow-500',
    prediction: 'Your sun line indicates fame, creativity, and recognition. Brilliance shines through your talents. Public success and artistic expression are written in your destiny.',
  },
  {
    id: 'mercury',
    name: 'Mercury Line',
    position: 'top-[30%] left-[75%] h-[45%]',
    color: 'bg-cyan-500',
    prediction: 'The mercury line shows communication skills and business acumen. Your words carry power and influence. Financial success flows through eloquence and strategic thinking.',
  },
];

export const Palmistry = () => {
  const [selectedLine, setSelectedLine] = useState<typeof palmLines[0] | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  // Professional dark astrological background effect as a separate component
  const AstrologicalBackground = () => (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Animated dark nebula */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#170c27] via-[#0e0720] to-[#060214] opacity-95 mix-blend-darken animate-cosmic-pulse" />
      {/* Constellation overlay with accent glows */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 1000 700">
        <polyline
          points="70,530 180,350 260,180 400,120 570,240 730,140 890,330"
          stroke="#c084fc"
          strokeWidth="1.5"
          fill="none"
          opacity="0.19"
          strokeDasharray="12"
        />
        <polyline
          points="190,630 320,500 460,600 660,670 850,540"
          stroke="#f9fafb"
          strokeWidth="1"
          fill="none"
          opacity="0.12"
          strokeDasharray="11"
        />
        {/* Subtle constellation glow nodes */}
        {[...Array(11)].map((_, i) => (
          <circle
            key={i}
            cx={210 + i * 72 + Math.sin(i) * 15}
            cy={300 + Math.sin(i * 1.8) * 130}
            r={Math.random() * 4.5 + 2.2}
            fill="#e0e7ff"
            opacity="0.14"
            filter="url(#constellationGlow)"
          />
        ))}
        {/* Filter for node glow */}
        <defs>
          <filter id="constellationGlow" x="-40%" y="-40%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#e0e7ff" floodOpacity="0.7" />
          </filter>
        </defs>
      </svg>
      {/* Subtle randomized starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(100)].map((_, i) => {
          // Stable star randomness with seeded "position"
          const t = (i * 951) % 1000, l = (i * 1373) % 1000;
          return (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                top: `${t / 10}%`,
                left: `${l / 10}%`,
                width: `${(i % 7 === 0 ? 1.6 : 0.7) + (i % 3) * 0.3}px`,
                height: `${(i % 5 === 0 ? 1.2 : 0.6) + (i % 4) * 0.2}px`,
                opacity: 0.13 + ((i % 10) / 22),
                filter: 'blur(0.7px)',
              }}
            />
          );
        })}
      </div>
      {/* Floating mystical zodiac/astrological icons */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(28)].map((_, i) => {
          // Pseudo-random positions/sizes for icons, repeatable for determinism
          const top = ((i * 379) % 1000) / 10 + 1.5;
          const left = ((i * 743) % 1000) / 10 + 1.5;
          const symbol = ASTRO_SYMBOLS[i % ASTRO_SYMBOLS.length];
          const fontSize = 32 + (i % 11) * 4 + (i % 8) * 2;
          const spin = (i % 2 === 0 ? "animate-astro-float" : "animate-astro-float2");
          return (
            <div
              key={`astrobg-icon-${i}`}
              className={`absolute select-none ${spin} text-indigo-50/15 dark:text-fuchsia-200/10`}
              style={{
                top: `${top}%`,
                left: `${left}%`,
                fontSize: `${fontSize}px`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${12 + (i % 6) * 2}s`,
                textShadow: '0 0 18px #a78bfa,0 2px 8px #818cf8,0 0 38px #8b5cf6',
                filter: 'blur(0.2px)',
                opacity: 0.5 + (i % 5) * 0.05,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              {symbol}
            </div>
          );
        })}
      </div>
      {/* Optional dark vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_65%,rgba(12,10,28,0.97)_100%)] pointer-events-none" style={{mixBlendMode:'multiply'}} />
    </div>
  );

  return (
    <section
      className={`
        py-16 md:py-24 px-2 sm:px-4 relative overflow-hidden
        bg-[#100826] dark:bg-[#080310]
      `}
      style={{ minHeight: '100vh' }}
    >
      {/* Professional dark astrological background */}
      <AstrologicalBackground />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="font-heading text-[2.05rem] sm:text-[2.35rem] md:text-6xl font-bold mb-5 md:mb-6 text-indigo-100/90 drop-shadow-lg flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-4 tracking-widest">
            <span className="relative flex items-center justify-center mb-2 xs:mb-0">
              <Hand className="w-10 h-10 md:w-12 md:h-12 text-violet-500 animate-pulse drop-shadow-glow" />
              <span className="absolute -bottom-1 right-1 text-yellow-300/70 text-lg animate-spin-slow">★</span>
            </span>
            <span>Sacred Palmistry & Astrology</span>
            <span className="relative flex items-center justify-center mt-2 xs:mt-0">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-fuchsia-400 animate-pulse drop-shadow-glow" />
              <span className="absolute -top-1 left-1 text-fuchsia-200/90 text-lg animate-pulse-slow">✧</span>
            </span>
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-indigo-200/80 max-w-[97vw] sm:max-w-2xl mx-auto">
            <span className="text-2xl font-bold">♑︎</span> Unveil <span className="text-yellow-100">cosmic</span> secrets of your palm—where mystical lines meet the wisdom of the <span className="text-fuchsia-200 font-semibold">stars</span> and astrology ✦
          </p>
        </div>

        {/* Responsive grid: stacked on mobile, 2-cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Palm Diagram Card */}
          <Card className="p-4 xs:p-6 sm:p-8 bg-gradient-to-br from-[#110a23]/80 via-[#1d0c27]/75 to-[#1c103b]/50 backdrop-blur-md border-fuchsia-300/30 shadow-[0_7px_36px_-4px_rgba(40,11,55,0.18)] relative overflow-hidden ring-1 ring-fuchsia-400/12 w-full">
            {/* Mystical palm diagram with astrological details */}
            <div className="
              relative mx-auto
              aspect-[3/4]
              w-[85vw] xs:w-[66vw] sm:w-[410px] md:w-[330px] lg:w-[360px]
              max-w-[98vw] md:max-w-[340px] lg:max-w-[360px]
              bg-gradient-to-br from-[#16132b]/95 via-[#2b113e]/70 to-[#26114b]/30
              rounded-3xl overflow-hidden 
              shadow-[inset_0_4px_36px_rgba(18,7,41,0.17)]
              border-2 border-violet-300/15 ring-2 ring-indigo-600/10
              "
            >
              {/* Glowing radial overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-fuchsia-400/12 via-transparent to-purple-900/7 pointer-events-none" />

              {/* Palm SVG */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-lg">
                  {/* Thumb and palm gradient */}
                  <defs>
                    <radialGradient id="palmGradient" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#231723" />
                      <stop offset="45%" stopColor="#39224e" />
                      <stop offset="80%" stopColor="#3b2382" />
                      <stop offset="100%" stopColor="#2d217d" />
                    </radialGradient>
                    <filter id="palmShadow">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                      <feOffset dx="1" dy="2" result="offsetblur"/>
                      <feComponentTransfer>
                        <feFuncA type="linear" slope="0.18"/>
                      </feComponentTransfer>
                      <feMerge>
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <pattern id="astroPattern" x="0" y="0" patternUnits="userSpaceOnUse" width="40" height="40">
                      <text x="10" y="25" fontSize="18" fill="#c084fc" opacity="0.14">★</text>
                      <text x="24" y="17" fontSize="14" fill="#b3b2f7" opacity="0.08">♈</text>
                      <text x="5" y="38" fontSize="13" fill="#f9d8eb" opacity="0.07">♑</text>
                    </pattern>
                  </defs>
                  
                  <ellipse cx="60" cy="280" rx="35" ry="80" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <ellipse cx="180" cy="250" rx="110" ry="140" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <rect x="100" y="30" width="30" height="120" rx="15" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <circle cx="115" cy="80" r="3" fill="#eab308" opacity="0.22" />
                  <circle cx="115" cy="110" r="3" fill="#eab308" opacity="0.14" />
                  <rect x="145" y="20" width="30" height="130" rx="15" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <circle cx="160" cy="70" r="3" fill="#eab308" opacity="0.19" />
                  <circle cx="160" cy="105" r="3" fill="#eab308" opacity="0.08" />
                  <rect x="190" y="30" width="30" height="125" rx="15" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <circle cx="205" cy="80" r="3" fill="#eab308" opacity="0.17" />
                  <circle cx="205" cy="112" r="3" fill="#eab308" opacity="0.06" />
                  <rect x="235" y="50" width="28" height="110" rx="14" fill="url(#palmGradient)" stroke="#a78bfa" strokeWidth="2.5" filter="url(#palmShadow)" />
                  <circle cx="249" cy="95" r="2.5" fill="#eab308" opacity="0.09" />
                  <circle cx="249" cy="120" r="2.5" fill="#eab308" opacity="0.04" />
                  {[...Array(9)].map((_, i) => (
                    <circle
                      key={`astro-dot-${i}`}
                      cx={120 + Math.random() * 120}
                      cy={160 + Math.random() * 110}
                      r={Math.random() * 1.2 + 1.1}
                      fill="#fff"
                      opacity={Math.random() * 0.17 + 0.10}
                      filter="blur(0.32px)"
                    />
                  ))}
                  <rect x="90" y="100" width="120" height="160" fill="url(#astroPattern)" opacity="0.13" rx="42" />
                </svg>
              </div>
              {/* Palm Lines */}
              {palmLines.map((line) => (
                <div
                  key={line.id}
                  className={`
                    absolute ${line.position} cursor-pointer transition-all duration-300
                    ${hoveredLine === line.id ? 'scale-110 z-20' : 'z-10'}
                  `}
                  onMouseEnter={() => setHoveredLine(line.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                  onClick={() => setSelectedLine(line)}
                  tabIndex={0}
                  aria-label={line.name}
                  onTouchStart={() => setHoveredLine(line.id)}
                  onTouchEnd={() => setHoveredLine(null)}
                >
                  <div 
                    className={`
                      ${line.color}
                      ${(line.id === 'life' || line.id === 'fate' || line.id === 'sun' || line.id === 'mercury')
                        ? 'w-1 h-full'
                        : 'h-1 w-full'}
                      rounded-full opacity-80 hover:opacity-100 transition-opacity shadow-[0_0_10px_2px_rgba(198,120,221,0.10)]
                      ${hoveredLine === line.id ? 'animate-pulse shadow-glow' : ''}
                      ${selectedLine?.id === line.id ? 'opacity-100 shadow-glow animate-pulse' : ''}
                    `}
                  />
                  {hoveredLine === line.id && (
                    <div className="absolute -top-7 md:-top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[#231940]/95 via-[#200931]/95 to-[#191237]/95 px-2.5 md:px-3 py-1 rounded-xl border border-fuchsia-400/30 shadow-cosmic whitespace-nowrap">
                      <p className="text-[0.74rem] md:text-xs font-semibold text-indigo-100 drop-shadow-glow">{line.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-7 text-center space-y-2">
              <p className="text-xs xs:text-sm text-violet-200 italic flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span className="text-fuchsia-200 animate-pulse-slow text-xl">☉</span>
                <span className="hidden xs:inline">Hover or</span>
                <span className="xs:hidden">Tap</span> the mystical palm lines
                <span className="text-fuchsia-100 animate-pulse-slow text-lg" role="img" aria-label="star">★</span>
                <span>to reveal astrological secrets</span>
                <span className="text-yellow-400 animate-pulse-slow text-xl">✦</span>
              </p>
              {selectedLine && (
                <p className="text-xs text-fuchsia-300 font-semibold animate-pulse tracking-wide">
                  ✨ {selectedLine.name} Activated ✨
                </p>
              )}
            </div>
          </Card>

          {/* Reading Display */}
          <div className="space-y-5 md:space-y-6 mt-6 md:mt-0">
            {!selectedLine ? (
              <Card className="p-4 xs:p-6 sm:p-8 bg-gradient-to-bl from-[#3e1452]/40 via-[#16113b]/60 to-[#060211]/80 backdrop-blur-sm border-fuchsia-400/20 shadow-[0_2px_14px_0_rgba(71,27,124,0.13)] animate-fade-in w-full">
                <div className="text-center space-y-4">
                  <span className="relative block w-14 h-14 sm:w-16 sm:h-16 mx-auto">
                    <span className="absolute inset-0 rounded-full bg-gradient-to-t from-fuchsia-300/20 via-indigo-300/10 to-transparent blur-2xl animate-pulse-glow" />
                    <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-fuchsia-200 animate-pulse relative z-10" />
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-fuchsia-100 drop-shadow-glow">
                    Select a Palm Line
                  </h3>
                  <p className="font-body text-violet-200/80 text-sm sm:text-base">
                    Tap a line in the cosmic palm to reveal its sacred astrology & palmistry wisdom for your destiny path.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-4 xs:p-6 sm:p-8 bg-gradient-to-br from-[#191237]/85 via-[#240d37]/90 to-[#331752]/20 backdrop-blur-sm border-fuchsia-400 shadow-cosmic animate-scale-in w-full">
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div 
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${selectedLine.color} rounded-full animate-pulse shadow-glow ring-2 ring-fuchsia-200/20`}
                    />
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-fuchsia-100">
                        {selectedLine.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-indigo-200/70">Astropalmistry Wisdom</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-200/30" />

                  <div className="p-4 sm:p-6 bg-gradient-to-t from-[#32123f]/30 via-[#181025]/40 to-[#1a1841]/10 rounded-xl border border-fuchsia-200/10 shadow-md ring-1 ring-indigo-900/5">
                    <p className="font-body text-base sm:text-lg text-indigo-100/90 leading-relaxed">
                      {selectedLine.prediction}
                    </p>
                  </div>

                  <Button
                    onClick={() => setSelectedLine(null)}
                    className="w-full bg-gradient-to-r from-fuchsia-400 via-violet-600 to-fuchsia-600 hover:from-fuchsia-300 hover:to-violet-400 text-white font-semibold py-4 sm:py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 outline-none ring-2 ring-fuchsia-400/30 text-base sm:text-lg"
                  >
                    Explore Another Line
                  </Button>
                </div>
              </Card>
            )}

            {/* All Lines Quick Reference */}
            <Card className="p-3 xs:p-4 sm:p-6 bg-gradient-to-br from-[#191237]/80 via-[#1d0c27]/80 to-[#1c103b]/10 backdrop-blur-sm border-violet-200/12 w-full">
              <h4 className="font-heading text-base sm:text-lg font-bold text-fuchsia-200 mb-3 sm:mb-4 tracking-wide flex items-center gap-2">
                <span className="text-xl sm:text-2xl animate-pulse-slow">♁</span>
                Palm Lines Astropedia
                <span className="text-yellow-200 animate-pulse-slow">✦</span>
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {palmLines.map((line, i) => (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLine(line)}
                    className={`
                      w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all duration-300 shadow-[0_0_9px_0_rgba(168,139,250,0.08)]
                      ${selectedLine?.id === line.id
                        ? 'bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-900 text-white shadow-glow ring-2 ring-fuchsia-400/36'
                        : 'bg-[#1b173c]/30 hover:bg-[#2d244e]/38 outline-none'
                      }
                    `}
                  >
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${line.color} rounded-full drop-shadow-glow`} />
                    <span className="font-body text-xs sm:text-sm font-medium text-indigo-100">
                      {line.name}
                    </span>
                    <span className="ml-auto text-fuchsia-300 text-base sm:text-lg">{ASTRO_SYMBOLS[i]}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
