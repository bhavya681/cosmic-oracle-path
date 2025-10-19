import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Sparkles } from 'lucide-react';
import egyptImage from '@/assets/pastlife-egypt.jpg';
import medievalImage from '@/assets/pastlife-medieval.jpg';
import vedicImage from '@/assets/pastlife-vedic.jpg';
import silkroadImage from '@/assets/pastlife-silkroad.jpg';
import groveImage from '@/assets/pastlife-grove.jpg';
import renaissanceImage from '@/assets/pastlife-renaissance.jpg';

const pastLifeMessages = [
  {
    message: "You were a high priestess in ancient Egypt, channeling divine wisdom through sacred temple ceremonies and guiding pharaohs with celestial knowledge.",
    image: egyptImage
  },
  {
    message: "Your soul walked as a scholar-monk in medieval Europe, preserving sacred texts and ancient wisdom through the darkest ages of humanity.",
    image: medievalImage
  },
  {
    message: "You danced with the cosmos as a Vedic sage in ancient India, teaching the sacred balance between earth and sky to devoted disciples.",
    image: vedicImage
  },
  {
    message: "Your spirit guided merchant caravans across the Silk Road, connecting distant civilizations through trade, wisdom, and mystical understanding.",
    image: silkroadImage
  },
  {
    message: "You served as a druidic guardian of sacred groves in Celtic lands, protecting nature's mysteries and communing with forest spirits.",
    image: groveImage
  },
  {
    message: "Your essence shone as a court astrologer in Renaissance Italy, advising nobles through celestial divination and alchemical practices.",
    image: renaissanceImage
  },
  {
    message: "You were a temple oracle in ancient Greece, receiving visions from Apollo and delivering prophecies that shaped empires.",
    image: egyptImage
  },
  {
    message: "Your soul manifested as a Mayan astronomer-priest, reading cosmic cycles and predicting celestial events with supernatural precision.",
    image: medievalImage
  },
  {
    message: "You lived as a shamanic healer in Siberian tribes, journeying between worlds to retrieve lost souls and commune with animal spirits.",
    image: vedicImage
  },
  {
    message: "Your spirit incarnated as a Sufi mystic in Persia, whirling in divine ecstasy and writing poetry that unlocked the gates of heaven.",
    image: silkroadImage
  },
  {
    message: "You walked as a Buddhist monk in ancient Tibet, mastering meditation and unlocking the secrets of consciousness in mountain monasteries.",
    image: groveImage
  },
  {
    message: "Your essence burned bright as an alchemist in medieval Prague, transmuting elements and seeking the philosopher's stone in hidden laboratories.",
    image: renaissanceImage
  }
];

export const PastLifePortal = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [portalActive, setPortalActive] = useState(false);

  useEffect(() => {
    if (isExploring) {
      setPortalActive(true);
    } else if (showMessage) {
      setTimeout(() => setPortalActive(false), 1000);
    }
  }, [isExploring, showMessage]);

  const explorePastLife = () => {
    setIsExploring(true);
    setShowMessage(false);
    
    setTimeout(() => {
      const randomLife = pastLifeMessages[Math.floor(Math.random() * pastLifeMessages.length)];
      setMessage(randomLife.message);
      setImage(randomLife.image);
      setShowMessage(true);
      setIsExploring(false);
    }, 3500);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Time Travel Portal Effect */}
      <div className={`absolute inset-0 transition-all duration-1000 ${portalActive ? 'opacity-100' : 'opacity-0'}`}>
        {/* Spiral Tunnel Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full border-4 border-primary/30 ${isExploring ? 'animate-spiral-in' : ''}`}
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>

        {/* Particle Stream Effect */}
        {isExploring && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-particle-stream"
                style={{
                  left: '50%',
                  top: '50%',
                  animationDelay: `${i * 0.05}s`,
                  '--angle': `${(i * 360) / 50}deg`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Cosmic Rays */}
        {isExploring && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-cosmic-ray"
                style={{
                  width: '50%',
                  transform: `rotate(${(i * 360) / 12}deg)`,
                  transformOrigin: 'center',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Vortex Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-96 h-96 rounded-full bg-gradient-cosmic blur-3xl ${isExploring ? 'animate-pulse-glow' : ''}`} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Past Life Portal
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Journey through the cosmic timeline to uncover echoes of your soul's ancient wisdom
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          <div className="text-center space-y-8">
            {!showMessage && !isExploring && (
              <div className="space-y-6 animate-fade-in">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-cosmic animate-rotate-slow" />
                  <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                    <Clock className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <p className="font-body text-lg text-foreground/80">
                  Close your eyes, take a deep breath, and when you're ready...
                </p>
              </div>
            )}

            {isExploring && (
              <div className="space-y-8 animate-scale-in">
                <div className="relative w-40 h-40 mx-auto">
                  {/* Outer spinning rings */}
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 rounded-full border-4 border-accent/30 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-4 rounded-full border-4 border-secondary/30 animate-spin" style={{ animationDuration: '1.5s' }} />
                  
                  {/* Center portal */}
                  <div className="absolute inset-8 rounded-full bg-gradient-cosmic flex items-center justify-center animate-pulse-glow shadow-glow">
                    <Clock className="w-12 h-12 text-foreground animate-pulse" />
                  </div>

                  {/* Time particles orbiting */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-primary rounded-full animate-orbit"
                      style={{
                        left: '50%',
                        top: '50%',
                        animationDelay: `${i * 0.2}s`,
                        '--orbit-radius': '80px',
                      } as React.CSSProperties}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="font-body text-2xl text-foreground animate-pulse-glow font-semibold">
                    Traveling Through Time...
                  </p>
                  <p className="font-body text-lg text-muted-foreground">
                    Accessing ancient memories from the cosmic akashic records
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showMessage && (
              <div className="space-y-8 animate-scale-in">
                <div className="relative">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-cosmic border-8 border-amber-900/30">
                    {/* Main vintage image */}
                    <img 
                      src={image} 
                      alt="Past Life Vision" 
                      className="w-full h-full object-cover sepia-[0.6] contrast-[1.1] brightness-[0.9]"
                      style={{ filter: 'sepia(0.6) contrast(1.1) brightness(0.9) grayscale(0.2)' }}
                    />
                    
                    {/* Ghostly double exposure overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={image} 
                        alt="Spirit Echo" 
                        className="w-full h-full object-cover animate-pulse"
                        style={{ 
                          filter: 'blur(3px) brightness(1.5) contrast(0.8)',
                          mixBlendMode: 'screen'
                        }}
                      />
                    </div>

                    {/* Ethereal light rays */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-300/40 to-transparent animate-pulse"
                          style={{
                            left: `${20 + i * 15}%`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: '3s'
                          }}
                        />
                      ))}
                    </div>

                    {/* Floating spirit orbs */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`orb-${i}`}
                          className="absolute w-3 h-3 rounded-full bg-amber-200/60 blur-sm"
                          style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.4}s`
                          }}
                        />
                      ))}
                    </div>

                    {/* Mystical ripple effect */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(139,69,19,0.3)_100%)] animate-pulse" 
                        style={{ animationDuration: '4s' }} 
                      />
                    </div>
                    
                    {/* Old photo texture overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-900/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMzUiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay" />
                    
                    {/* Deep vignette effect */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_40px_rgba(0,0,0,0.6)] rounded-2xl" />
                    
                    {/* Scratches and aging */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    
                    {/* Faded corners with glow */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-amber-100/10 blur-xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-100/10 blur-xl animate-pulse" />
                    
                    {/* Mystical sparkle badge */}
                    <div className="absolute top-4 right-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-cosmic shadow-glow flex items-center justify-center animate-pulse-glow">
                        <Sparkles className="w-8 h-8 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-heading text-3xl font-bold text-primary">
                    Your Past Life Revealed
                  </h3>
                  <div className="p-8 bg-gradient-cosmic rounded-2xl shadow-cosmic border border-primary/20">
                    <p className="font-body text-xl text-foreground leading-relaxed">
                      {message}
                    </p>
                  </div>
                  <p className="font-body text-sm text-muted-foreground italic">
                    ✨ This knowledge has been waiting for you across lifetimes
                  </p>
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={explorePastLife}
              disabled={isExploring}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Clock className="w-5 h-5 mr-2" />
              {isExploring ? 'Traveling...' : showMessage ? 'Explore Another Life' : 'Begin Time Travel'}
            </Button>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }

        @keyframes spiral-in {
          0% {
            transform: scale(2) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: scale(0.5) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes particle-stream {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(400px);
            opacity: 0;
          }
        }

        @keyframes cosmic-ray {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes orbit {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg);
          }
        }

        .animate-spiral-in {
          animation: spiral-in 2s ease-out forwards;
        }

        .animate-particle-stream {
          animation: particle-stream 1s ease-out forwards;
        }

        .animate-cosmic-ray {
          animation: cosmic-ray 2s ease-out infinite;
        }

        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
      `}</style>
    </section>
  );
};
