import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Map } from 'lucide-react';

const nakshatras = [
  { name: 'Ashwini', symbol: '♈', deity: 'Ashwini Kumaras', wisdom: 'Speed and healing', color: 'from-red-500 to-orange-600' },
  { name: 'Bharani', symbol: '♉', deity: 'Yama', wisdom: 'Transformation and growth', color: 'from-orange-500 to-yellow-600' },
  { name: 'Krittika', symbol: '♊', deity: 'Agni', wisdom: 'Purification and light', color: 'from-yellow-500 to-amber-600' },
  { name: 'Rohini', symbol: '♋', deity: 'Brahma', wisdom: 'Creation and beauty', color: 'from-pink-500 to-rose-600' },
  { name: 'Mrigashira', symbol: '♌', deity: 'Soma', wisdom: 'Seeking and exploration', color: 'from-green-500 to-emerald-600' },
  { name: 'Ardra', symbol: '♍', deity: 'Rudra', wisdom: 'Destruction and renewal', color: 'from-blue-500 to-cyan-600' },
  { name: 'Punarvasu', symbol: '♎', deity: 'Aditi', wisdom: 'Return and restoration', color: 'from-cyan-500 to-teal-600' },
  { name: 'Pushya', symbol: '♏', deity: 'Brihaspati', wisdom: 'Nourishment and growth', color: 'from-indigo-500 to-blue-600' },
  { name: 'Ashlesha', symbol: '♐', deity: 'Nagas', wisdom: 'Wisdom and kundalini', color: 'from-purple-500 to-violet-600' },
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
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6">
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