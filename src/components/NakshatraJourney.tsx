import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Map } from 'lucide-react';

const nakshatras = [
  { name: 'Ashwini', symbol: '🐎', deity: 'Ashwini Kumaras', wisdom: 'Swift healing and new beginnings flow to those born under the divine horsemen. Your power lies in rapid transformation and pioneering spirit.', color: 'from-red-500 to-orange-600' },
  { name: 'Bharani', symbol: '🌺', deity: 'Yama', wisdom: 'The lord of dharma grants you the strength to nurture life and embrace necessary endings. Transformation is your sacred gift.', color: 'from-orange-500 to-yellow-600' },
  { name: 'Krittika', symbol: '🔥', deity: 'Agni', wisdom: 'The fire of purification burns through illusion. Your sharp intellect cuts through darkness, bringing truth and clarity to all you touch.', color: 'from-yellow-500 to-amber-600' },
  { name: 'Rohini', symbol: '🌹', deity: 'Brahma', wisdom: 'The creator blesses you with abundance, beauty, and growth. Your magnetic presence attracts prosperity and creative manifestation.', color: 'from-pink-500 to-rose-600' },
  { name: 'Mrigashira', symbol: '🦌', deity: 'Soma', wisdom: 'The gentle seeker explores the forest of knowledge. Your curious nature and quest for understanding lead to divine discoveries.', color: 'from-green-500 to-emerald-600' },
  { name: 'Ardra', symbol: '💧', deity: 'Rudra', wisdom: 'The storm god brings fierce transformation through tears of change. From destruction emerges renewal, from chaos comes clarity.', color: 'from-blue-500 to-cyan-600' },
  { name: 'Punarvasu', symbol: '🏹', deity: 'Aditi', wisdom: 'The infinite mother grants you the power of return and restoration. No matter how far you wander, you always find your way home.', color: 'from-cyan-500 to-teal-600' },
  { name: 'Pushya', symbol: '🌾', deity: 'Brihaspati', wisdom: 'The divine teacher nourishes your growth and wisdom. You are blessed with the ability to nurture and support others on their path.', color: 'from-indigo-500 to-blue-600' },
  { name: 'Ashlesha', symbol: '🐍', deity: 'Nagas', wisdom: 'The serpent wisdom awakens kundalini power within. Your intuitive depth and hypnotic charm reveal hidden truths and ancient knowledge.', color: 'from-purple-500 to-violet-600' },
  { name: 'Magha', symbol: '👑', deity: 'Pitris', wisdom: 'Your ancestors bless you with royal authority and leadership. Honor tradition while forging your legacy with dignity and grace.', color: 'from-amber-500 to-yellow-600' },
  { name: 'Purva Phalguni', symbol: '💝', deity: 'Bhaga', wisdom: 'The god of fortune grants you joy, creativity, and loving relationships. Your life is blessed with pleasure and artistic expression.', color: 'from-pink-500 to-red-600' },
  { name: 'Uttara Phalguni', symbol: '☀️', deity: 'Aryaman', wisdom: 'The sun of patronage illuminates your path with generosity and partnership. You build lasting unions and beneficial agreements.', color: 'from-orange-500 to-yellow-500' },
  { name: 'Hasta', symbol: '✋', deity: 'Savitar', wisdom: 'The divine craftsman blesses your hands with skill and precision. Your dexterity manifests miracles through practical magic.', color: 'from-green-400 to-emerald-500' },
  { name: 'Chitra', symbol: '💎', deity: 'Vishwakarma', wisdom: 'The cosmic architect gifts you with artistic brilliance and perfect form. You create beauty and structure from the raw materials of existence.', color: 'from-violet-500 to-purple-600' },
  { name: 'Swati', symbol: '🌬️', deity: 'Vayu', wisdom: 'The wind god carries your independent spirit across all boundaries. Freedom and flexibility are your greatest strengths and tools.', color: 'from-cyan-400 to-blue-500' },
  { name: 'Vishakha', symbol: '⚡', deity: 'Indra-Agni', wisdom: 'The combined power of thunder and fire grants you determined ambition. You achieve victory through focused intensity and unwavering purpose.', color: 'from-red-500 to-orange-700' },
  { name: 'Anuradha', symbol: '🪷', deity: 'Mitra', wisdom: 'The god of friendship blesses you with devotion and loyalty. Your ability to form deep bonds creates lasting success and spiritual growth.', color: 'from-rose-500 to-pink-600' },
  { name: 'Jyeshtha', symbol: '☂️', deity: 'Indra', wisdom: 'The king of gods crowns you with authority and protective power. You rise to prominence through courage and commanding presence.', color: 'from-red-600 to-crimson-700' },
  { name: 'Mula', symbol: '🌿', deity: 'Nirriti', wisdom: 'The goddess of dissolution teaches transformation at the root level. You possess the power to break foundations and plant new seeds.', color: 'from-emerald-600 to-green-700' },
  { name: 'Purva Ashadha', symbol: '🏆', deity: 'Apas', wisdom: 'The waters of invincibility flow through your spirit. Your unconquerable nature and purifying presence bring victory and renewal.', color: 'from-blue-500 to-indigo-600' },
  { name: 'Uttara Ashadha', symbol: '⭐', deity: 'Vishvedevas', wisdom: 'The universal gods grant you lasting achievement and righteous victory. Your efforts create permanent positive change in the world.', color: 'from-yellow-500 to-gold-600' },
  { name: 'Shravana', symbol: '👂', deity: 'Vishnu', wisdom: 'The preserver blesses you with the sacred art of listening. Through attentive awareness, you connect heaven and earth with divine understanding.', color: 'from-blue-600 to-cyan-700' },
  { name: 'Dhanishtha', symbol: '🥁', deity: 'Vasus', wisdom: 'The eight elemental gods grant you rhythm, wealth, and universal connection. You harmonize material and spiritual abundance.', color: 'from-teal-500 to-emerald-600' },
  { name: 'Shatabhisha', symbol: '⭕', deity: 'Varuna', wisdom: 'The lord of cosmic waters reveals hidden healing and mystical secrets. Your unconventional wisdom breaks through all limitations.', color: 'from-indigo-500 to-violet-600' },
  { name: 'Purva Bhadrapada', symbol: '⚔️', deity: 'Aja Ekapada', wisdom: 'The one-footed goat carries you toward spiritual fire and transformation. Your intensity and determination burn away all obstacles.', color: 'from-purple-600 to-violet-700' },
  { name: 'Uttara Bhadrapada', symbol: '🐉', deity: 'Ahir Budhnya', wisdom: 'The serpent of the deep grants you profound wisdom and kundalini awakening. You anchor cosmic consciousness into earthly form.', color: 'from-blue-700 to-indigo-800' },
  { name: 'Revati', symbol: '🐠', deity: 'Pushan', wisdom: 'The nourisher guides your journey to completion and new horizons. You possess the gift of safe passage and protective guidance for all.', color: 'from-cyan-500 to-blue-600' },
];

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
    }, 3000);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-background via-deep-indigo to-background">
      {/* Starfield background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            top: `${Math.random() * 50}%`,
            left: '-10px',
            animation: `shooting-star ${Math.random() * 3 + 2}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Star className="w-10 h-10 text-primary animate-pulse" />
            Nakshatra Journey
            <Map className="w-10 h-10 text-accent animate-pulse" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore your birth star and journey through your cosmic neighborhood
          </p>
        </div>

        {!journeyActive && !selectedNakshatra && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nakshatras.map((nakshatra, index) => (
              <Card
                key={nakshatra.name}
                onClick={() => startJourney(nakshatra, index)}
                className="relative group cursor-pointer bg-card/50 backdrop-blur-sm border-primary/30 p-6 hover:border-accent hover:shadow-cosmic transition-all duration-300 overflow-hidden"
              >
                {/* Animated background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${nakshatra.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative z-10 text-center space-y-3">
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                    {nakshatra.symbol}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{nakshatra.name}</h3>
                  <p className="text-sm text-muted-foreground">{nakshatra.deity}</p>
                  
                  {gemsUnlocked.includes(index) && (
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                  )}

                  {/* Stars constellation pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="absolute text-primary/40"
                        style={{
                          width: '8px',
                          top: `${Math.random() * 80 + 10}%`,
                          left: `${Math.random() * 80 + 10}%`,
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

        {journeyActive && selectedNakshatra && (
          <div className="text-center py-12 space-y-8">
            <h3 className="text-3xl font-bold text-foreground animate-pulse">
              Journeying through {selectedNakshatra.name}...
            </h3>
            
            <div className="relative w-96 h-96 mx-auto">
              {/* Orbital rings */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={`ring-${i}`}
                  className={`absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow`}
                  style={{
                    margin: `${i * 30}px`,
                    animationDuration: `${(i + 1) * 3}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}
                />
              ))}

              {/* Center star */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${selectedNakshatra.color} animate-pulse shadow-cosmic flex items-center justify-center`}>
                  <span className="text-6xl">{selectedNakshatra.symbol}</span>
                </div>
              </div>

              {/* Orbiting particles */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-4 h-4 bg-primary rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    animation: `orbit ${3 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            <p className="text-muted-foreground text-lg animate-pulse">
              Unlocking cosmic wisdom...
            </p>
          </div>
        )}

        {!journeyActive && selectedNakshatra && (
          <div className="max-w-3xl mx-auto animate-scale-in">
            <Card className={`bg-gradient-to-br ${selectedNakshatra.color} p-8 shadow-cosmic border-2 border-white/20 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                {[...Array(50)].map((_, i) => (
                  <Star
                    key={i}
                    className="absolute text-white"
                    style={{
                      width: `${Math.random() * 20 + 10}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    fill="currentColor"
                  />
                ))}
              </div>

              <div className="relative z-10 text-white text-center space-y-6">
                <div className="text-8xl mb-4 animate-float">{selectedNakshatra.symbol}</div>
                <h3 className="text-4xl font-display font-bold">{selectedNakshatra.name}</h3>
                <div className="w-20 h-1 bg-white/50 mx-auto" />
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-lg">Ruling Deity</h4>
                    <p className="text-xl">{selectedNakshatra.deity}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Gem of Wisdom</h4>
                    <p className="text-xl italic">"{selectedNakshatra.wisdom}"</p>
                  </div>
                  <div className="pt-4">
                    <Sparkles className="w-12 h-12 mx-auto animate-pulse" />
                    <p className="mt-2 text-sm">✨ Wisdom Unlocked ✨</p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedNakshatra(null);
                    setJourneyActive(false);
                  }}
                  className="bg-white text-gray-900 hover:bg-white/90 px-6 py-3 font-bold shadow-lg"
                >
                  Explore Another Nakshatra
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shooting-star {
          from {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(1000px) translateY(500px);
            opacity: 0;
          }
        }
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
};