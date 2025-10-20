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

const pastLifeArchetypes = [
  {
    id: 'egypt',
    image: egyptImage,
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `In a former life, ${
        name ? name : 'you'
      } were a revered high priestess in ancient Egypt, orchestrating sacred rites beneath the gaze of the Sphinx and guiding Pharaohs through spiritual wisdom. You channeled the divine energies of Ra and Thoth, deciphering celestial omens.`
  },
  {
    id: 'medieval',
    image: medievalImage,
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `As a medieval monk in 12th century Europe, ${
        name ? name : 'you'
      } dedicated ${
        dob ? `years in the shadows of monastery walls` : 'decades'
      } preserving forbidden scriptures and illuminated manuscripts. Your quill recorded alchemical secrets and prophetic visions by candlelight.`
  },
  {
    id: 'vedic',
    image: vedicImage,
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `Long ago, ${
        name ? name : 'your soul'
      } was a Vedic sage in ancient India, meditating by the sacred Ganges and passing cosmic knowledge to earnest disciples. You mastered the Upanishads and could commune with celestial beings through deep samadhi.`
  },
  {
    id: 'silkroad',
    image: silkroadImage,
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `Born under auspicious stars ${dob ? `in the year ${dob.split('-')[0]}` : 'of a forgotten age'}, ${name ? name : 'you'} traveled the Silk Road as a mystical merchant, connecting East and West. You traded not just silk and spices, but sacred teachings, amulets, and esoteric wisdom from distant lands.`
  },
  {
    id: 'grove',
    image: groveImage,
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `${name ? name + ',' : 'You'} guardian of the sacred Celtic groves, spoke the ancient tongue of trees and summoned the spirits of the forest. As a Druid elder, you performed moon rituals, read the Ogham stones, and guided your tribe through visions of the Otherworld.`
  },
  {
    id: 'renaissance',
    image: renaissanceImage,
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `Your essence, ${name ? name : 'reborn'}, gleamed in Renaissance Florence as a court astrologer and philosopher. You cast horoscopes for the Medici family, revealing royal destinies shaped by planetary alignments${
        dob ? ` — notably during the transformative year ${dob.split('-')[0]}` : ''
      }. Your work merged Hermetic philosophy with celestial mechanics.`
  },
  {
    id: 'atlantis',
    image: groveImage, // Using grove as placeholder
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `Before the great deluge, ${name ? name : 'your soul'} dwelled in the crystal temples of Atlantis. You were a keeper of the sacred crystals, channeling their power to heal and communicate across vast distances. You witnessed the final days of the most advanced civilization ever to grace the Earth.`
  },
  {
    id: 'mayan',
    image: egyptImage, // Using egypt as placeholder
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `${name ? name : 'You'} served as a Mayan astronomer-priest in ancient Mesoamerica, calculating the movements of Venus and predicting solar eclipses with perfect accuracy. You performed sacred rituals atop pyramid temples${dob ? ` in cycles aligned with your birth energies from ${dob}` : ''}, reading the Tzolk'in calendar and prophesying the ages to come.`
  },
  {
    id: 'samurai',
    image: medievalImage, // Using medieval as placeholder
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `In feudal Japan, ${name ? name : 'you'} walked the path of Bushido as a master samurai. Beyond the sword, you practiced Zen meditation and calligraphy, seeking spiritual enlightenment through discipline. Your honor was unshakeable, your spirit as sharp as your blade.`
  },
  {
    id: 'persian',
    image: silkroadImage, // Using silkroad as placeholder
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `${name ? name : 'Your soul'} flourished in ancient Persia as a Zoroastrian fire keeper and mystic poet. You tended the eternal flames in sacred temples, studied the Avesta, and composed verses that bridged earth and heaven${dob ? `, guided by the stars present at your birth in ${dob.split('-')[0]}` : ''}.`
  },
  {
    id: 'norse',
    image: medievalImage, // Using medieval as placeholder  
    getMessage: ({ name }: { name?: string; dob?: string }) =>
      `${name ? name : 'You'} were a Nordic völva, a seer who communed with the gods of Asgard. You read the runes, entered trance states to walk between worlds, and prophesied the fates of warriors and kings. Your wisdom was sought before every battle and voyage.`
  },
  {
    id: 'tibetan',
    image: vedicImage, // Using vedic as placeholder
    getMessage: ({ name, dob }: { name?: string; dob?: string }) =>
      `High in the Himalayan mountains, ${name ? name : 'you'} were a Tibetan lama mastering the ancient teachings of tantra and dzogchen. You practiced tummo meditation, generating inner heat, and achieved profound realizations${dob ? ` in the auspicious cycles marked by ${dob}` : ''}. Your consciousness could travel to the pure lands of the Buddhas.`
  }
];

function getBirthNumber(dob?: string) {
  // Simple numerology: sum all digits to a single digit
  if (!dob) return 1;
  const digits = dob.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return sum || 1;
}

function selectPastLife(name: string, dob: string) {
  const archetypeIndex = (() => {
    // Add a bit of pseudo-random with name and birth number
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    hash += getBirthNumber(dob) * 23;
    return hash % pastLifeArchetypes.length;
  })();
  return pastLifeArchetypes[archetypeIndex];
}

export const PastLifePortal = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [portalActive, setPortalActive] = useState(false);

  // Input state
  const [userName, setUserName] = useState('');
  const [userDOB, setUserDOB] = useState('');

  // Validation
  const validInput = userName.trim().length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(userDOB);

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
      const chosen = selectPastLife(userName.trim(), userDOB);
      setMessage(chosen.getMessage({ name: userName.trim(), dob: userDOB }));
      setImage(chosen.image);
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

            {/* Input name and dob before exploration */}
            {!showMessage && !isExploring && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <div className="mb-6">
                    <div className="mb-2 text-left text-lg font-medium text-foreground/90">Your Name</div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80 focus:outline-none focus:ring focus:ring-primary/40 transition"
                      value={userName}
                      onChange={e => setUserName(e.target.value)}
                      disabled={isExploring}
                      maxLength={32}
                      autoCorrect="off"
                      autoCapitalize="words"
                    />
                  </div>
                  <div>
                    <div className="mb-2 text-left text-lg font-medium text-foreground/90">Date of Birth</div>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80 focus:outline-none focus:ring focus:ring-primary/40 transition"
                      value={userDOB}
                      onChange={e => setUserDOB(e.target.value)}
                      disabled={isExploring}
                      max={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                </div>
                <div className="relative w-32 h-32 mx-auto mt-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-cosmic animate-rotate-slow" />
                  <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                    <Clock className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <p className="font-body text-lg text-foreground/80">
                  Please enter your name and date of birth to channel your unique past life vision.
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
                    {userName
                      ? `${userName}'s Past Life`
                      : 'Your Past Life Revealed'}
                  </h3>
                  <div className="p-8 bg-gradient-cosmic rounded-2xl shadow-cosmic border border-primary/20">
                    <p className="font-body text-xl text-foreground leading-relaxed">
                      {message}
                    </p>
                  </div>
                  <p className="font-body text-sm text-muted-foreground italic">
                    ✨ This knowledge has been waiting for you across lifetimes{userDOB ? ` since ${userDOB}` : ''}.
                  </p>
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={explorePastLife}
              disabled={isExploring || (!showMessage && !validInput)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Clock className="w-5 h-5 mr-2" />
              {isExploring
                ? 'Traveling...'
                : showMessage
                  ? 'Explore Another Life'
                  : 'Begin Time Travel'}
            </Button>
            {/* Basic input validation hint */}
            {!showMessage && !isExploring && !validInput && (
              <div className="text-sm text-red-600 animate-fade-in">
                Please enter your name and select a valid date of birth (YYYY-MM-DD).
              </div>
            )}
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
