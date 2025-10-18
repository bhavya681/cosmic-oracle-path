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
    message: "You were a high priestess in ancient Egypt, channeling divine wisdom through temple ceremonies and healing sacred souls.",
    image: egyptImage
  },
  {
    message: "Your soul walked as a monastic scholar in medieval Europe, preserving sacred knowledge through dark times with unwavering devotion.",
    image: medievalImage
  },
  {
    message: "You danced with the cosmos as a Vedic sage in ancient India, teaching harmony between earth and sky to devoted disciples.",
    image: vedicImage
  },
  {
    message: "Your spirit guided caravans across the Silk Road, connecting distant worlds through trade, wisdom, and mystical teachings.",
    image: silkroadImage
  },
  {
    message: "You served as a druidic guardian of sacred groves in Celtic lands, protecting nature's mysteries with ancient devotion.",
    image: groveImage
  },
  {
    message: "Your essence shone as a court mystic in Renaissance Italy, advising rulers through astrology and celestial wisdom.",
    image: renaissanceImage
  },
  {
    message: "You lived as a Samurai warrior-poet in feudal Japan, mastering both the sword and the brush with equal devotion.",
    image: medievalImage
  },
  {
    message: "Your spirit embodied a Mayan astronomer-priest, decoding cosmic messages written in the stars and sacred calendars.",
    image: vedicImage
  },
  {
    message: "You walked as a Viking seer in frozen Norse lands, reading runes and communing with ancient spirits of the north.",
    image: groveImage
  },
  {
    message: "Your soul flourished as a Persian alchemist, transforming base metals and consciousness into divine gold through mystical arts.",
    image: silkroadImage
  },
  {
    message: "You existed as a Tibetan monk in mountain monasteries, achieving enlightenment through meditation and sacred mantras.",
    image: vedicImage
  },
  {
    message: "Your essence manifested as an Aztec ceremonial dancer, channeling divine energies through sacred movements and rituals.",
    image: egyptImage
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
                    {/* Mystical energy waves */}
                    <div className="absolute inset-0 z-10">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 border-4 border-primary/20 rounded-2xl animate-ripple"
                          style={{ animationDelay: `${i * 0.8}s` }}
                        />
                      ))}
                    </div>
                    
                    {/* Ghostly double exposure effect */}
                    <img 
                      src={image} 
                      alt="Past Life Vision" 
                      className="absolute w-full h-full object-cover opacity-30 blur-sm"
                      style={{ 
                        filter: 'sepia(0.8) contrast(1.3) brightness(0.7) hue-rotate(20deg)',
                        transform: 'scale(1.05) translateX(-10px)'
                      }}
                    />
                    
                    {/* Main vintage image */}
                    <img 
                      src={image} 
                      alt="Past Life Vision" 
                      className="relative w-full h-full object-cover"
                      style={{ 
                        filter: 'sepia(0.7) contrast(1.2) brightness(0.85) grayscale(0.3) saturate(0.8)',
                        animation: 'subtle-shimmer 3s ease-in-out infinite'
                      }}
                    />
                    
                    {/* Mystic veil overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-amber-900/30 mix-blend-multiply animate-pulse-slow" />
                    
                    {/* Ancient texture */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay" />
                    
                    {/* Ethereal light leaks */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-amber-200/20 blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
                    
                    {/* Deep vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_120px_50px_rgba(0,0,0,0.7)] rounded-2xl" />
                    
                    {/* Time distortion waves */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
                    
                    {/* Cracked old photo effect */}
                    <div className="absolute inset-0 opacity-20" style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(139, 69, 19, 0.3) 100px, rgba(139, 69, 19, 0.3) 102px)'
                    }} />
                    
                    {/* Mystical sparkles */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-16 h-16 rounded-full bg-gradient-cosmic shadow-glow flex items-center justify-center animate-pulse-glow">
                        <Sparkles className="w-8 h-8 text-foreground" />
                      </div>
                    </div>
                    
                    {/* Floating orbs of light */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-amber-200/60 rounded-full blur-sm animate-float-random"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + i * 0.5}s`
                        }}
                      />
                    ))}
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

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        @keyframes subtle-shimmer {
          0%, 100% {
            filter: sepia(0.7) contrast(1.2) brightness(0.85) grayscale(0.3) saturate(0.8);
          }
          50% {
            filter: sepia(0.75) contrast(1.25) brightness(0.9) grayscale(0.25) saturate(0.85);
          }
        }

        @keyframes float-random {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(20px, -30px);
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
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

        .animate-ripple {
          animation: ripple 2.5s ease-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-float-random {
          animation: float-random 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
