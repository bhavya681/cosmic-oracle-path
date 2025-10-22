import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Map } from 'lucide-react';

// Nakshatras Array (with appropriate emoji for each nakshatra)
const nakshatras = [
  { name: 'Ashwini', symbol: '🐎', deity: 'Ashwini Kumaras', wisdom: 'Swift healing and new beginnings flow to those born under the divine horsemen. Your power lies in rapid transformation and pioneering spirit.' },
  { name: 'Bharani', symbol: '⚰️', deity: 'Yama', wisdom: 'The lord of dharma grants you the strength to nurture life and embrace necessary endings. Transformation is your sacred gift.' },
  { name: 'Krittika', symbol: '🔥', deity: 'Agni', wisdom: 'The fire of purification burns through illusion. Your sharp intellect cuts through darkness, bringing truth and clarity to all you touch.' },
  { name: 'Rohini', symbol: '🌹', deity: 'Brahma', wisdom: 'The creator blesses you with abundance, beauty, and growth. Your magnetic presence attracts prosperity and creative manifestation.' },
  { name: 'Mrigashira', symbol: '🦌', deity: 'Soma', wisdom: 'The gentle seeker explores the forest of knowledge. Your curious nature and quest for understanding lead to divine discoveries.' },
  { name: 'Ardra', symbol: '💧', deity: 'Rudra', wisdom: 'The storm god brings fierce transformation through tears of change. From destruction emerges renewal, from chaos comes clarity.' },
  { name: 'Punarvasu', symbol: '🏹', deity: 'Aditi', wisdom: 'The infinite mother grants you the power of return and restoration. No matter how far you wander, you always find your way home.' },
  { name: 'Pushya', symbol: '🌻', deity: 'Brihaspati', wisdom: 'The divine teacher nourishes your growth and wisdom. You are blessed with the ability to nurture and support others on their path.' },
  { name: 'Ashlesha', symbol: '🐍', deity: 'Nagas', wisdom: 'The serpent wisdom awakens kundalini power within. Your intuitive depth and hypnotic charm reveal hidden truths and ancient knowledge.' },
  { name: 'Magha', symbol: '👑', deity: 'Pitris', wisdom: 'Your ancestors bless you with royal authority and leadership. Honor tradition while forging your legacy with dignity and grace.' },
  { name: 'Purva Phalguni', symbol: '🛏️', deity: 'Bhaga', wisdom: 'The god of fortune grants you joy, creativity, and loving relationships. Your life is blessed with pleasure and artistic expression.' },
  { name: 'Uttara Phalguni', symbol: '🤝', deity: 'Aryaman', wisdom: 'The sun of patronage illuminates your path with generosity and partnership. You build lasting unions and beneficial agreements.' },
  { name: 'Hasta', symbol: '✋', deity: 'Savitar', wisdom: 'The divine craftsman blesses your hands with skill and precision. Your dexterity manifests miracles through practical magic.' },
  { name: 'Chitra', symbol: '💎', deity: 'Vishwakarma', wisdom: 'The cosmic architect gifts you with artistic brilliance and perfect form. You create beauty and structure from the raw materials of existence.' },
  { name: 'Swati', symbol: '🌬️', deity: 'Vayu', wisdom: 'The wind god carries your independent spirit across all boundaries. Freedom and flexibility are your greatest strengths and tools.' },
  { name: 'Vishakha', symbol: '🌿', deity: 'Indra-Agni', wisdom: 'The combined power of thunder and fire grants you determined ambition. You achieve victory through focused intensity and unwavering purpose.' },
  { name: 'Anuradha', symbol: '🌟', deity: 'Mitra', wisdom: 'The god of friendship blesses you with devotion and loyalty. Your ability to form deep bonds creates lasting success and spiritual growth.' },
  { name: 'Jyeshtha', symbol: '🪶', deity: 'Indra', wisdom: 'The king of gods crowns you with authority and protective power. You rise to prominence through courage and commanding presence.' },
  { name: 'Mula', symbol: '🪓', deity: 'Nirriti', wisdom: 'The goddess of dissolution teaches transformation at the root level. You possess the power to break foundations and plant new seeds.' },
  { name: 'Purva Ashadha', symbol: '💧', deity: 'Apas', wisdom: 'The waters of invincibility flow through your spirit. Your unconquerable nature and purifying presence bring victory and renewal.' },
  { name: 'Uttara Ashadha', symbol: '🏆', deity: 'Vishvedevas', wisdom: 'The universal gods grant you lasting achievement and righteous victory. Your efforts create permanent positive change in the world.' },
  { name: 'Shravana', symbol: '👂', deity: 'Vishnu', wisdom: 'The preserver blesses you with the sacred art of listening. Through attentive awareness, you connect heaven and earth with divine understanding.' },
  { name: 'Dhanishtha', symbol: '🥁', deity: 'Vasus', wisdom: 'The eight elemental gods grant you rhythm, wealth, and universal connection. You harmonize material and spiritual abundance.' },
  { name: 'Shatabhisha', symbol: '🩺', deity: 'Varuna', wisdom: 'The lord of cosmic waters reveals hidden healing and mystical secrets. Your unconventional wisdom breaks through all limitations.' },
  { name: 'Purva Bhadrapada', symbol: '🔥', deity: 'Aja Ekapada', wisdom: 'The one-footed goat carries you toward spiritual fire and transformation. Your intensity and determination burn away all obstacles.' },
  { name: 'Uttara Bhadrapada', symbol: '🐉', deity: 'Ahir Budhnya', wisdom: 'The serpent of the deep grants you profound wisdom and kundalini awakening. You anchor cosmic consciousness into earthly form.' },
  { name: 'Revati', symbol: '🪐', deity: 'Pushan', wisdom: 'The nourisher guides your journey to completion and new horizons. You possess the gift of safe passage and protective guidance for all.' },
];

// Ultra deep black with galaxy swirl and subtle colored glows for dark and smooth astrological effect
const bgAstro =
  "relative py-12 xs:py-16 md:py-20 px-2 xs:px-3 sm:px-6 overflow-hidden bg-[#090a15] bg-[radial-gradient(ellipse_900px_600px_at_60%_30%,rgba(73,96,181,0.09)_25%,rgba(94,55,182,0.13)_48%,rgba(245,205,255,0.07)_64%,#090a15_100%)]";

function renderAstroStars(amount = 110) {
  // 10% are colored moody stars for astrological feel
  const colorPool = [
    "rgba(98, 218, 255, 0.82)",
    "rgba(198, 123, 255, 0.77)",
    "rgba(255, 228, 138, 0.75)",
    "rgba(173,203,255,0.61)",
    "rgba(254,151,95,0.52)"
  ];
  return [...Array(amount)].map((_, i) => {
    const isColor = Math.random() < 0.13;
    const color = isColor ? colorPool[Math.floor(Math.random()*colorPool.length)] : "rgba(255,255,255,0.83)";
    const size = Math.random() * (isColor ? 2 : 1.2) + (isColor ? 1.2 : 0.7);
    return (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          filter: isColor ? 'blur(0.8px)' : 'blur(0.4px)',
          opacity: isColor ? 0.7 : (Math.random() * 0.7 + 0.3),
          animation: `astro-star-twinkle ${isColor ? 3.5 : 2}s linear infinite`,
          animationDelay: `${Math.random()*4.5}s`,
          boxShadow: isColor
            ? `0 0 8px 2px ${color}`
            : Math.random() > 0.92
              ? `0 0 6px 1.5px #aad9ff,0 0 1.5px 0.3px #fff`
              : undefined,
        }}
      />
    );
  });
}

// "Shooting" meteor effect for extra astrology vibe
const ShootingMeteor = () => {
  const left = `${10 + Math.random()*78}%`;
  return (
    <div
      className="absolute z-10 pointer-events-none"
      style={{
        top: `${Math.random()*50+10}%`,
        left,
        width: '68px',
        height: '2px',
        opacity: 0.45,
        animation: `shooting-meteor 1.7s linear`,
        animationDelay: `${Math.random()*3.5}s`
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg,rgba(255,255,255,0),rgba(255, 185, 48,0.19) 18%,#ffe69d 68%,rgba(255,255,255,0))',
          borderRadius: '2px'
        }}
      />
    </div>
  );
};

export const NakshatraJourney = () => {
  const [selectedNakshatra, setSelectedNakshatra] = useState<typeof nakshatras[0] | null>(null);
  const [journeyActive, setJourneyActive] = useState(false);
  const [gemsUnlocked, setGemsUnlocked] = useState<number[]>([]);

  const [meteorKey, setMeteorKey] = useState(Math.random());

  // Restart meteor (randomize on navigation)
  const restartMeteor = () => setMeteorKey(Math.random());

  const startJourney = (nakshatra: typeof nakshatras[0], index: number) => {
    setSelectedNakshatra(nakshatra);
    setJourneyActive(true);
    restartMeteor();
    setTimeout(() => {
      setGemsUnlocked(prev => [...prev, index]);
      setJourneyActive(false);
    }, 2250);
  };

  return (
    <section className={bgAstro}>
      {/* Deep-space Astrological Stars */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {renderAstroStars(132)}

        {/* 1-2 meteors */}
        {[0,0].map((_,i)=><ShootingMeteor key={meteorKey+'-'+i} />)}
      </div>
      {/* Astrological nebula/galaxy swirl */}
      <div
        className="absolute top-[18%] left-[7vw] w-[81vw] h-[39vw] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 60% 70%,rgba(145,89,237,0.10) 10%,rgba(255,219,202,0.08) 40%,rgba(255,246,213,0.02) 77%,transparent 91%)',
          filter: 'blur(2px)',
          opacity: 0.98
        }}
      />
      {/* Subtle colored glows for aura */}
      <div
        className="absolute bottom-[8vw] left-1/2 -translate-x-1/2 w-[103vw] h-[25vw] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center,rgba(72,195,255,0.12) 0%,rgba(73,99,209,0.16) 44%,rgba(0,0,0,0.0) 87%)'
        }}
      />
      {/* Astrological Zodiac Glyphs Watermark */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-[0.085] text-center text-[67px] xs:text-[108px] sm:text-[186px] font-sans select-none tracking-tight">
        ♈︎ ♉︎ ♊︎ ♋︎ ♌︎ ♍︎ ♎︎ ♏︎ ♐︎ ♑︎ ♒︎ ♓︎
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 px-0 xs:px-2 sm:px-0">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4 flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 drop-shadow-[0_2px_12px_rgba(156,133,255,0.06)]">
            <Star className="w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 text-accent animate-glow" />
            Nakshatra Journey
            <Map className="w-8 h-8 xs:w-9 xs:h-9 md:w-10 md:h-10 text-violet-400/70 animate-fade-in" />
          </h2>
          <p className="text-[#badaee] text-base xs:text-lg tracking-wide">
            Embark on a smooth cosmic journey through the 27 lunar mansions of Vedic astrology
          </p>
        </div>
        {/* Nakshatra Grid */}
        {!journeyActive && !selectedNakshatra && (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
            {nakshatras.map((nakshatra, index) => (
              <Card
                key={nakshatra.name}
                onClick={() => startJourney(nakshatra, index)}
                className="relative group cursor-pointer bg-gradient-to-b from-[#211a34]/90 via-[#151125]/92 to-[#06051a]/88 border border-[#675fe3]/10 shadow-[0_2px_24px_0_#24124B55,0_0_0_1.5px_#9172d5ab_inset] p-5 xs:p-6 md:p-7 hover:border-violet-300/70 hover:shadow-[0_2px_32px_0_#4a3bc988,0_0_0_2.5px_#a583ff84_inset] hover:ring-1 hover:ring-accent/22 transition-all duration-300 overflow-hidden min-h-[155px] group"
                style={{
                  backdropFilter: 'blur(2.5px)'
                }}
              >
                {/* Faint border/star-burst effect */}
                <div className="pointer-events-none absolute -inset-0.5 rounded-2xl border border-[#cbbafc]/5 group-hover:border-accent/22 transition" />

                <div className="relative z-10 text-center space-y-2 xs:space-y-3">
                  <div className="text-3xl xs:text-4xl md:text-5xl group-hover:scale-115 transition-transform duration-200 drop-shadow-[0_2px_16px_#b48fff44]">
                    {nakshatra.symbol ? <span aria-label="nakshatra symbol">{nakshatra.symbol}</span> : <span role="presentation"><Star className="inline-block w-7 h-7 xs:w-8 xs:h-8 md:w-9 md:h-9 text-violet-400/80 animate-glow" /></span>}
                  </div>
                  <h3 className="text-lg xs:text-xl font-bold text-white tracking-wide">{nakshatra.name}</h3>
                  <p className="text-[12px] xs:text-[13px] text-[#f7e7ffee] mb-2 tracking-wider">{nakshatra.deity}</p>
                  {gemsUnlocked.includes(index) && (
                    <div className="absolute top-2 right-3">
                      <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 text-cyan-200 animate-pulse" />
                    </div>
                  )}
                  {/* Decorative foreground static nakshatra "constellation" stars */}
                  <div className="absolute inset-0 flex flex-wrap pointer-events-none z-0">
                    {[...Array(3)].map((_, ci) => (
                      <Star
                        key={ci}
                        className="absolute"
                        style={{
                          color: '#a8a2f522',
                          width: '10px',
                          height: '10px',
                          top: ci === 0 ? '18%' : ci === 1 ? '65%' : '45%',
                          left: ci === 0 ? '73%' : ci === 1 ? '18%' : '48%',
                          opacity: 0.78 - ci * 0.22,
                        }}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Journeying Loading View */}
        {journeyActive && selectedNakshatra && (
          <div className="text-center py-6 xs:py-8 sm:py-10 md:py-12 space-y-7 xs:space-y-10 animate-astro-fade-in-smooth">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white tracking-wide animate-pulse">
              Journeying through {selectedNakshatra.name}...
            </h3>
            <div className="relative w-44 h-44 xs:w-60 xs:h-60 sm:w-72 sm:h-72 mx-auto">
              {/* Astrological Magic Circle */}
              <div className="absolute inset-0 rounded-full border-2 border-[#8c52ff33] border-dashed animate-spin-slower" />
              {/* Central luminous sphere with symbol */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-t from-[#34207f] to-[#16113a] shadow-[0_0_32px_3px_#ae86ff33] flex items-center justify-center ring-2 ring-white/20">
                  <span className="text-3xl xs:text-4xl sm:text-5xl animate-float">{selectedNakshatra.symbol ? selectedNakshatra.symbol : <Star className="w-8 h-8 xs:w-10 xs:h-10 sm:w-11 sm:h-11 text-accent" />}</span>
                </div>
              </div>
              {/* Rotating arc of glowing astrological stars */}
              {[...Array(14)].map((_, i) => (
                <div
                  key={`nakshatra-orbit-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: '12px',
                    height: '12px',
                    background: 'radial-gradient(circle at 56% 44%,#d5d9ff 60%,#8670fa17 100%)',
                    top: '50%',
                    left: '50%',
                    animation: `orbit 4.5s linear infinite`,
                    animationDelay: `${i * 0.18}s`,
                    transform: 'translate(-50%, -50%)',
                    filter: `blur(${i%2 === 0 ? 0.5 : 1.5}px)`,
                    boxShadow: i%3 === 0 ? '0 0 4px 1.5px #bcb8ff' : undefined,
                    opacity: 0.96,
                  }}
                />
              ))}
            </div>
            <p className="text-[#bee8ff] text-base xs:text-lg animate-fade-in-slow tracking-wide">
              Unlocking cosmic wisdom...
            </p>
          </div>
        )}

        {/* Wisdom Unlocked Card */}
        {!journeyActive && selectedNakshatra && (
          <div className="max-w-full xs:max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto animate-scale-in">
            <Card className="relative bg-gradient-to-br from-[#1b1840]/90 via-[#151027] to-[#19163C]/92 p-5 xs:p-7 sm:p-8 shadow-[0_6px_36px_#6351ae52,0_0_0_1.5px_#7359b4bf_inset] border border-[#e6defb37] rounded-2xl overflow-hidden">
              {/* Dim twinkling star layer */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
                {renderAstroStars(20)}
              </div>
              <div className="relative z-10 text-white text-center space-y-5 xs:space-y-6">
                <div className="mb-1.5 xs:mb-2 mt-2 xs:mt-3">
                  <span className="text-5xl xs:text-7xl sm:text-8xl animate-float drop-shadow-[0_3px_24px_#a696fc55]">
                    {selectedNakshatra.symbol
                      ? selectedNakshatra.symbol
                      : <Star className="w-12 h-12 xs:w-16 xs:h-16 text-accent animate-glow" />
                    }
                  </span>
                </div>
                <h3 className="text-2xl xs:text-3xl sm:text-4xl font-display font-bold tracking-wide">{selectedNakshatra.name}</h3>
                <div className="w-12 xs:w-14 sm:w-16 h-1 bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 rounded-full mx-auto" />
                <div className="bg-[#181241]/75 backdrop-blur-lg rounded-xl p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-6 border-[1.5px] border-[#7a78eed5]/10 ring-2 ring-[#e3d7fe0e]">
                  <div>
                    <h4 className="font-bold text-base xs:text-lg tracking-wide text-[#ede3ff] mb-1">Ruling Deity</h4>
                    <p className="text-lg xs:text-xl text-[#ffeec2]">{selectedNakshatra.deity}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-base xs:text-lg tracking-wide text-[#ede3ff] mb-1">Gem of Wisdom</h4>
                    <p className="text-base xs:text-lg italic text-blue-100/80">"{selectedNakshatra.wisdom}"</p>
                  </div>
                  <div className="pt-2 xs:pt-4">
                    <span className="inline-flex items-center gap-1 text-cyan-200 font-mono font-semibold text-sm xs:text-md">
                      <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 animate-pulse" />
                      Wisdom Unlocked
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedNakshatra(null);
                    setJourneyActive(false);
                    restartMeteor();
                  }}
                  className="bg-white/95 text-[#242744] hover:bg-accent/22 hover:text-white px-5 xs:px-7 py-2.5 xs:py-3 font-bold shadow fill-accent mb-2 mt-2 border-none rounded-lg transition text-base xs:text-lg"
                >
                  Explore Another Nakshatra
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Astrological Custom Styles */}
      <style>{`
        @media (max-width: 360px) { .text-[67px]{font-size:49px!important;} }

        @keyframes astro-star-twinkle {
          0%,100% { opacity: 0.45 }
          50% { opacity: 1 }
        }
        @keyframes shooting-meteor {
          0% {
            transform: translateX(0) translateY(0);
            opacity:0.18;
          }
          23% {
            opacity:0.74;
          }
          85% {
            opacity:0.45;
          }
          100% {
            transform: translateX(140px) translateY(72px);
            opacity: 0.03;
          }
        }
        @keyframes orbit {
          0% {
            transform: translate(-50%,-50%) rotate(0deg) translateX(102px) rotate(0deg);
          }
          100% {
            transform: translate(-50%,-50%) rotate(360deg) translateX(102px) rotate(-360deg);
          }
        }
        .animate-float {
          animation: floatY 3.4s ease-in-out infinite;
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-13px) }
        }
        .animate-spin-slower {
          animation: spin 19s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-fade-in-slow,
        .animate-astro-fade-in-smooth {
          animation: astro-fade-in 2.4s cubic-bezier(.34,1.48,.51,1) 0.23s both;
        }
        @keyframes astro-fade-in {
          0% { opacity: 0; filter: blur(9px); }
          35%{ opacity: 0.33; filter: blur(4px);}
          65%{ opacity: 0.78; filter: blur(1.4px);}
          100% { opacity: 1; filter: blur(0);}
        }
        .animate-glow {
          animation: astro-glow 2.8s ease-in-out infinite alternate;
        }
        @keyframes astro-glow {
          0%,100% { filter: drop-shadow(0 0 8px #a991ff50) brightness(1.04);}
          50% { filter: drop-shadow(0 0 18px #ece2ff99) brightness(1.28);}
        }
      `}</style>
    </section>
  );
};