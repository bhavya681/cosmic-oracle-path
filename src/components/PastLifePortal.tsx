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
    message: "You were a healer in ancient Egypt, channeling divine wisdom through temple ceremonies.",
    image: egyptImage
  },
  {
    message: "Your soul walked as a scholar in medieval Europe, preserving sacred knowledge through dark times.",
    image: medievalImage
  },
  {
    message: "You danced with the cosmos as a Vedic sage, teaching harmony between earth and sky.",
    image: vedicImage
  },
  {
    message: "Your spirit guided caravans across silk roads, connecting distant worlds through trade and wisdom.",
    image: silkroadImage
  },
  {
    message: "You served as a guardian of sacred groves, protecting nature's mysteries with devotion.",
    image: groveImage
  },
  {
    message: "Your essence shone as a court mystic in Renaissance Italy, advising rulers through astrology.",
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
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-cosmic">
                    <img 
                      src={image} 
                      alt="Past Life Vision" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
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
