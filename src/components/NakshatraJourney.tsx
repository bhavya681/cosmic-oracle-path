import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Map } from 'lucide-react';

// Curated, naturalistic or subtle, professional astrological backgrounds and suitably dignified, minimal emoji usage
const nakshatras = [
  { name: 'Ashwini', symbol: '🐎', deity: 'Ashwini Kumaras', wisdom: 'Swift healing and new beginnings flow to those born under the divine horsemen. Your power lies in rapid transformation and pioneering spirit.' },
  { name: 'Bharani', symbol: '🌺', deity: 'Yama', wisdom: 'The lord of dharma grants you the strength to nurture life and embrace necessary endings. Transformation is your sacred gift.' },
  { name: 'Krittika', symbol: '🔥', deity: 'Agni', wisdom: 'The fire of purification burns through illusion. Your sharp intellect cuts through darkness, bringing truth and clarity to all you touch.' },
  { name: 'Rohini', symbol: '🌹', deity: 'Brahma', wisdom: 'The creator blesses you with abundance, beauty, and growth. Your magnetic presence attracts prosperity and creative manifestation.' },
  { name: 'Mrigashira', symbol: '🦌', deity: 'Soma', wisdom: 'The gentle seeker explores the forest of knowledge. Your curious nature and quest for understanding lead to divine discoveries.' },
  { name: 'Ardra', symbol: '💧', deity: 'Rudra', wisdom: 'The storm god brings fierce transformation through tears of change. From destruction emerges renewal, from chaos comes clarity.' },
  { name: 'Punarvasu', symbol: '🏹', deity: 'Aditi', wisdom: 'The infinite mother grants you the power of return and restoration. No matter how far you wander, you always find your way home.' },
  { name: 'Pushya', symbol: '', deity: 'Brihaspati', wisdom: 'The divine teacher nourishes your growth and wisdom. You are blessed with the ability to nurture and support others on their path.' },
  { name: 'Ashlesha', symbol: '', deity: 'Nagas', wisdom: 'The serpent wisdom awakens kundalini power within. Your intuitive depth and hypnotic charm reveal hidden truths and ancient knowledge.' },
  { name: 'Magha', symbol: '', deity: 'Pitris', wisdom: 'Your ancestors bless you with royal authority and leadership. Honor tradition while forging your legacy with dignity and grace.' },
  { name: 'Purva Phalguni', symbol: '', deity: 'Bhaga', wisdom: 'The god of fortune grants you joy, creativity, and loving relationships. Your life is blessed with pleasure and artistic expression.' },
  { name: 'Uttara Phalguni', symbol: '', deity: 'Aryaman', wisdom: 'The sun of patronage illuminates your path with generosity and partnership. You build lasting unions and beneficial agreements.' },
  { name: 'Hasta', symbol: '', deity: 'Savitar', wisdom: 'The divine craftsman blesses your hands with skill and precision. Your dexterity manifests miracles through practical magic.' },
  { name: 'Chitra', symbol: '', deity: 'Vishwakarma', wisdom: 'The cosmic architect gifts you with artistic brilliance and perfect form. You create beauty and structure from the raw materials of existence.' },
  { name: 'Swati', symbol: '', deity: 'Vayu', wisdom: 'The wind god carries your independent spirit across all boundaries. Freedom and flexibility are your greatest strengths and tools.' },
  { name: 'Vishakha', symbol: '', deity: 'Indra-Agni', wisdom: 'The combined power of thunder and fire grants you determined ambition. You achieve victory through focused intensity and unwavering purpose.' },
  { name: 'Anuradha', symbol: '', deity: 'Mitra', wisdom: 'The god of friendship blesses you with devotion and loyalty. Your ability to form deep bonds creates lasting success and spiritual growth.' },
  { name: 'Jyeshtha', symbol: '', deity: 'Indra', wisdom: 'The king of gods crowns you with authority and protective power. You rise to prominence through courage and commanding presence.' },
  { name: 'Mula', symbol: '', deity: 'Nirriti', wisdom: 'The goddess of dissolution teaches transformation at the root level. You possess the power to break foundations and plant new seeds.' },
  { name: 'Purva Ashadha', symbol: '', deity: 'Apas', wisdom: 'The waters of invincibility flow through your spirit. Your unconquerable nature and purifying presence bring victory and renewal.' },
  { name: 'Uttara Ashadha', symbol: '', deity: 'Vishvedevas', wisdom: 'The universal gods grant you lasting achievement and righteous victory. Your efforts create permanent positive change in the world.' },
  { name: 'Shravana', symbol: '', deity: 'Vishnu', wisdom: 'The preserver blesses you with the sacred art of listening. Through attentive awareness, you connect heaven and earth with divine understanding.' },
  { name: 'Dhanishtha', symbol: '', deity: 'Vasus', wisdom: 'The eight elemental gods grant you rhythm, wealth, and universal connection. You harmonize material and spiritual abundance.' },
  { name: 'Shatabhisha', symbol: '', deity: 'Varuna', wisdom: 'The lord of cosmic waters reveals hidden healing and mystical secrets. Your unconventional wisdom breaks through all limitations.' },
  { name: 'Purva Bhadrapada', symbol: '', deity: 'Aja Ekapada', wisdom: 'The one-footed goat carries you toward spiritual fire and transformation. Your intensity and determination burn away all obstacles.' },
  { name: 'Uttara Bhadrapada', symbol: '', deity: 'Ahir Budhnya', wisdom: 'The serpent of the deep grants you profound wisdom and kundalini awakening. You anchor cosmic consciousness into earthly form.' },
  { name: 'Revati', symbol: '🪐', deity: 'Pushan', wisdom: 'The nourisher guides your journey to completion and new horizons. You possess the gift of safe passage and protective guidance for all.' },
];

// Astrological, professional, dark, starry background CSS
const bgAstro =
  "relative py-20 px-6 overflow-hidden bg-[#111827] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#24263a] via-[#111827] to-[#060612]";

export const NakshatraJourney = () => {
  const [selectedNakshatra, setSelectedNakshatra] = useState<typeof nakshatras[0] | null>(null);
  const [journeyActive, setJourneyActive] = useState(false);
  const [gemsUnlocked, setGemsUnlocked] = useState<number[]>([]);

  const startJourney = (nakshatra: typeof nakshatras[0], index: number) => {
    setSelectedNakshatra(nakshatra);
    setJourneyActive(true);

    setTimeout(() => {
      setGemsUnlocked(prev => [...prev, index]);
      setJourneyActive(false);
    }, 2500);
  };

  return (
    <section className={bgAstro}>
      {/* Deep subtle starfield background with faint constellations */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] bg-white/70 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
              opacity: Math.random() * 0.7 + 0.2,
              animation: 'star-twinkle 2s infinite linear',
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Subtle Milky Way Glow */}
      <div
        className="absolute top-1/3 left-0 w-full h-1/3 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(42,45,85,0.25) 10%, rgba(255,255,255,0.07) 50%, transparent 80%)',
        }}
      />

      {/* Light astrological glyph watermark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-10 text-center text-[180px] font-sans select-none">
        ♈︎ ♉︎ ♊︎ ♋︎ ♌︎ ♍︎ ♎︎ ♏︎ ♐︎ ♑︎ ♒︎ ♓︎
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Star className="w-10 h-10 text-accent animate-pulse drop-shadow-md" />
            Nakshatra Journey
            <Map className="w-10 h-10 text-muted-foreground animate-fade-in" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Embark on a journey through the 27 lunar mansions of Vedic astrology
          </p>
        </div>
        {/* Nakshatra Grid */}
        {!journeyActive && !selectedNakshatra && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nakshatras.map((nakshatra, index) => (
              <Card
                key={nakshatra.name}
                onClick={() => startJourney(nakshatra, index)}
                className="relative group cursor-pointer bg-gradient-to-b from-[#1A1C30]/80 via-[#141528]/90 to-transparent border border-[#60658dd1]/30 shadow-[0_2px_16px_#25253F44] p-7 hover:border-accent hover:ring-1 hover:ring-accent/30 transition-all duration-300 overflow-hidden"
              >
                {/* Faint border/star-burst effect */}
                <div className="pointer-events-none absolute -inset-0.5 rounded-2xl border border-white/10 group-hover:border-accent/20 transition" />

                <div className="relative z-10 text-center space-y-2">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-200 drop-shadow">
                    {nakshatra.symbol ? <span aria-label="nakshatra symbol">{nakshatra.symbol}</span> : <span role="presentation"><Star className="inline-block w-8 h-8 text-accent/90" /></span>}
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-wide">{nakshatra.name}</h3>
                  <p className="text-[13px] text-muted-foreground mb-2">{nakshatra.deity}</p>
                  {gemsUnlocked.includes(index) && (
                    <div className="absolute top-2 right-3">
                      <Sparkles className="w-6 h-6 text-accent animate-pulse" />
                    </div>
                  )}
                  {/* Decorative small foreground constellation stars (not random!) */}
                  <div className="absolute inset-0 flex flex-wrap pointer-events-none z-0">
                    {[...Array(3)].map((_, ci) => (
                      <Star
                        key={ci}
                        className="text-accent/20 absolute"
                        style={{
                          width: '10px',
                          height: '10px',
                          top: ci === 0 ? '18%' : ci === 1 ? '65%' : '45%',
                          left: ci === 0 ? '73%' : ci === 1 ? '18%' : '48%',
                          opacity: 0.8 - ci * 0.2,
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
          <div className="text-center py-12 space-y-8">
            <h3 className="text-3xl font-bold text-foreground tracking-wide animate-pulse">
              Journeying through {selectedNakshatra.name}...
            </h3>
            <div className="relative w-72 h-72 mx-auto">
              {/* Subtle astrological Circle */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/10 border-dashed animate-spin-slower" />
              {/* Center etched astronomical glyph */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-28 h-28 rounded-full bg-gradient-to-t from-[#2E3156] to-[#131628] shadow-lg flex items-center justify-center ring-2 ring-white/20">
                  <span className="text-5xl animate-float">{selectedNakshatra.symbol ? selectedNakshatra.symbol : <Star className="w-10 h-10 text-accent" />}</span>
                </div>
              </div>
              {/* Rotating arc of lit stars */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-[10px] h-[10px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 60% 40%,#fff 60%,#86aAFF10 100%)',
                    top: '50%',
                    left: '50%',
                    animation: `orbit 5s linear infinite`,
                    animationDelay: `${i * 0.25}s`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-lg animate-fade-in-slow tracking-wide">
              Unlocking cosmic wisdom...
            </p>
          </div>
        )}

        {/* Wisdom Unlocked Card */}
        {!journeyActive && selectedNakshatra && (
          <div className="max-w-3xl mx-auto animate-scale-in">
            <Card className="relative bg-gradient-to-br from-[#232446]/80 via-[#16182a] to-[#19163C]/90 p-8 shadow-2xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Dim star surface layer */}
              <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
                {[...Array(35)].map((_, i) => (
                  <Star
                    key={i}
                    className="absolute text-white/80"
                    style={{
                      width: `${Math.random() * 14 + 6}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.2
                    }}
                    fill="currentColor"
                  />
                ))}
              </div>
              <div className="relative z-10 text-white text-center space-y-6">
                <div className="mb-2 mt-3">
                  <span className="text-8xl animate-float drop-shadow-lg">{selectedNakshatra.symbol 
                    ? selectedNakshatra.symbol 
                    : <Star className="w-16 h-16 text-accent" />}
                  </span>
                </div>
                <h3 className="text-4xl font-display font-bold tracking-wide">{selectedNakshatra.name}</h3>
                <div className="w-16 h-1 bg-accent/30 rounded-full mx-auto" />
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-6 ring-1 ring-white/10">
                  <div>
                    <h4 className="font-bold text-lg tracking-wide text-white/90 mb-1">Ruling Deity</h4>
                    <p className="text-xl">{selectedNakshatra.deity}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg tracking-wide text-white/90 mb-1">Gem of Wisdom</h4>
                    <p className="text-lg italic text-blue-100/80">"{selectedNakshatra.wisdom}"</p>
                  </div>
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-1 text-accent font-mono font-semibold text-md">
                      <Sparkles className="w-7 h-7 animate-pulse" />
                      Wisdom Unlocked
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedNakshatra(null);
                    setJourneyActive(false);
                  }}
                  className="bg-white/95 text-[#192024] hover:bg-accent/20 hover:text-white px-7 py-3 font-bold shadow fill-accent mb-2 mt-2 border-none rounded-lg transition"
                >
                  Explore Another Nakshatra
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes star-twinkle {
          0%,100% { opacity: 0.5 }
          50% { opacity: 1 }
        }
        @keyframes shooting-star {
          from {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(900px) translateY(400px);
            opacity: 0;
          }
        }
        @keyframes orbit {
          from {
            transform: translate(-50%,-50%) rotate(0deg) translateX(110px) rotate(0deg);
          }
          to {
            transform: translate(-50%,-50%) rotate(360deg) translateX(110px) rotate(-360deg);
          }
        }
        .animate-float {
          animation: floatY 3s ease-in-out infinite;
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        .animate-spin-slower {
          animation: spin 20s linear infinite;
        }
        .animate-fade-in-slow {
          animation: fadeIn 2.7s ease 0.45s;
          animation-fill-mode: backwards;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
      `}</style>
    </section>
  );
};