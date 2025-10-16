import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

const soulmateCards = [
  {
    title: 'The Eternal Flame',
    message: 'Your soulmate carries the warmth of a thousand sunrises',
    vibration: 'Leo, Sagittarius, or Aries energy',
    insight: 'Look for someone who ignites your passion and makes you feel alive',
    color: 'from-orange-500 to-red-600'
  },
  {
    title: 'The Ocean Deep',
    message: 'Your soulmate flows like water, deep and mysterious',
    vibration: 'Pisces, Cancer, or Scorpio energy',
    insight: 'Seek emotional depth and intuitive connection',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'The Sacred Garden',
    message: 'Your soulmate nurtures growth like spring rain',
    vibration: 'Taurus, Virgo, or Capricorn energy',
    insight: 'Find someone grounded, reliable, and devoted to growth',
    color: 'from-green-500 to-emerald-600'
  }
];

export const SoulmateCardDraw = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleCardClick = (index: number) => {
    if (revealed) return;
    
    setSelectedCard(index);
    
    // Create particle effect
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setRevealed(true);
      setParticles([]);
    }, 1000);
  };

  const resetCards = () => {
    setSelectedCard(null);
    setRevealed(false);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-deep-indigo to-background" />
      
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/20 animate-float"
            style={{
              width: `${Math.random() * 30 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-primary animate-pulse" fill="currentColor" />
            Soulmate Card Draw
            <Heart className="w-10 h-10 text-primary animate-pulse" fill="currentColor" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose a card to reveal a mystical insight about your destined connection
          </p>
        </div>

        {!revealed ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
            {soulmateCards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`cursor-pointer transform-style-3d transition-all duration-700 ${
                  selectedCard === index ? 'scale-110' : 'hover:scale-105'
                } ${selectedCard !== null && selectedCard !== index ? 'opacity-50 scale-95' : ''}`}
              >
                <Card className="relative h-96 bg-gradient-to-br from-card to-deep-indigo border-2 border-primary/30 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-cosmic opacity-50" />
                  
                  {/* Card back design */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary/50 flex items-center justify-center animate-pulse">
                          <Heart className="w-16 h-16 text-primary" fill="currentColor" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                      </div>
                      <p className="mt-6 text-foreground font-semibold text-lg">Card {index + 1}</p>
                      <p className="text-muted-foreground text-sm mt-2">Click to reveal</p>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Sparkle particles on hover */}
                  <div className="absolute inset-0">
                    {[...Array(10)].map((_, i) => (
                      <Sparkles
                        key={i}
                        className="absolute text-primary animate-pulse opacity-0 group-hover:opacity-100"
                        style={{
                          width: '12px',
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 1}s`
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : selectedCard !== null && (
          <div className="max-w-3xl mx-auto animate-scale-in">
            <Card className={`bg-gradient-to-br ${soulmateCards[selectedCard].color} p-8 shadow-cosmic border-2 border-white/20 relative overflow-hidden`}>
              {/* Animated background */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-white text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-white/50 flex items-center justify-center animate-pulse">
                    <Heart className="w-12 h-12" fill="currentColor" />
                  </div>
                </div>

                <h3 className="text-4xl font-display font-bold">{soulmateCards[selectedCard].title}</h3>
                
                <div className="w-20 h-1 bg-white/50 mx-auto" />

                <p className="text-xl italic font-semibold">"{soulmateCards[selectedCard].message}"</p>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2">Name Vibration</h4>
                    <p>{soulmateCards[selectedCard].vibration}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Cosmic Insight</h4>
                    <p>{soulmateCards[selectedCard].insight}</p>
                  </div>
                </div>

                <p className="text-sm italic opacity-90">
                  If you don't like your soulmate reading, reshuffle your destiny below 😉
                </p>

                <Button
                  onClick={resetCards}
                  className="bg-white text-gray-900 hover:bg-white/90 px-6 py-3 font-bold shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reshuffle Destiny
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Particle effects */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary rounded-full animate-fade-out"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-out {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0) translateY(-50px);
          }
        }
        .animate-fade-out {
          animation: fade-out 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};