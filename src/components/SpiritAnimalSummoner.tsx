import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Sun } from 'lucide-react';

// Use royalty-free external images for animal illustrations.
const animalGIFs: Record<string, string> = {
  Wolf:    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=600&facepad=3', // Wolf closeup
  Eagle:   'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=600&facepad=3', // Eagle closeup
  Butterfly: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&h=600&facepad=3', // Butterfly macro
  Owl:     'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=facearea&w=400&h=600&facepad=3', // Owl closeup
  Bear:    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=600&facepad=3', // Bear
  Dolphin: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=facearea&w=400&h=600&facepad=3', // Dolphin
  Fox:     'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=600&facepad=3', // Fox
  Deer:    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=facearea&w=400&h=600&facepad=3', // Deer
  Dragon:  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=600&facepad=3', // Abstract colorful (for "dragon" fantasy)
  Phoenix: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=600&facepad=3', // Same abstract image for Phoenix
};

const spiritAnimals = [
  {
    name: 'Wolf',
    emoji: '🐺',
    message: "I am the Wolf. Trust your instincts today, for they guide you through the darkness into light. Your pack is your strength, but your independence is your power.",
    color: 'from-indigo-800 via-purple-700 to-blue-900',
    guidance: 'Leadership and intuition flow through you.',
  },
  {
    name: 'Eagle',
    emoji: '🦅',
    message: "I am the Eagle. Soar above the mundane and see the bigger picture. Your vision pierces through illusion, revealing truth from the highest perspective.",
    color: 'from-blue-700 via-cyan-600 to-sky-900',
    guidance: 'Clarity and perspective illuminate your path.',
  },
  {
    name: 'Butterfly',
    emoji: '🦋',
    message: "I am the Butterfly. Embrace transformation with grace. What seems like an ending is merely a beautiful beginning. Your metamorphosis is divine.",
    color: 'from-pink-600 via-rose-500 to-fuchsia-700',
    guidance: 'Transformation and renewal bless your journey.',
  },
  {
    name: 'Owl',
    emoji: '🦉',
    message: "I am the Owl. Wisdom dwells in silence. Look beyond the veil of darkness to discover hidden truths. Your inner knowing is your greatest gift.",
    color: 'from-purple-900 via-fuchsia-800 to-indigo-950',
    guidance: 'Ancient wisdom speaks through you.',
  },
  {
    name: 'Bear',
    emoji: '🐻',
    message: "I am the Bear. Stand in your power with gentle strength. Rest when needed, act when called. Your courage comes from deep within.",
    color: 'from-amber-800 via-amber-900 to-indigo-900',
    guidance: 'Grounded strength and introspection guide you.',
  },
  {
    name: 'Dolphin',
    emoji: '🐬',
    message: "I am the Dolphin. Joy and playfulness heal all wounds. Navigate emotional depths with grace and communicate from the heart. Life is meant to be enjoyed.",
    color: 'from-cyan-600 via-blue-400 to-blue-800',
    guidance: 'Joy and emotional intelligence flow freely.',
  },
  {
    name: 'Fox',
    emoji: '🦊',
    message: "I am the Fox. Adaptability is your superpower. Use cleverness with integrity, and you'll find solutions where others see only obstacles.",
    color: 'from-orange-500 via-red-600 to-orange-800',
    guidance: 'Cunning and adaptability serve you well.',
  },
  {
    name: 'Deer',
    emoji: '🦌',
    message: "I am the Deer. Move through life with grace and gentleness. Your sensitivity is not weakness—it's your connection to the divine. Trust your gentleness.",
    color: 'from-green-600 via-emerald-500 to-emerald-800',
    guidance: 'Gentle grace and sensitivity are your gifts.',
  },
  {
    name: 'Dragon',
    emoji: '🐉',
    message: "I am the Dragon. Ancient power flows through your veins. Guard your treasures, breathe your truth, and let your inner fire transform the world.",
    color: 'from-red-700 via-purple-700 to-indigo-900',
    guidance: 'Primordial power and transformation await.',
  },
  {
    name: 'Phoenix',
    emoji: '🔥',
    message: "I am the Phoenix. From ashes, you rise renewed. Every ending births a glorious beginning. Your resilience is legendary—embrace your rebirth.",
    color: 'from-yellow-500 via-orange-700 to-red-700',
    guidance: 'Resurrection and eternal renewal are yours.',
  },
];

export const SpiritAnimalSummoner = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof spiritAnimals[0] | null>(null);
  const [isSummoning, setIsSummoning] = useState(false);
  const [moonPhase, setMoonPhase] = useState<'new' | 'full' | 'waxing' | 'waning'>('waxing');
  const [showCards, setShowCards] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    if (dayOfMonth <= 7) setMoonPhase('new');
    else if (dayOfMonth <= 14) setMoonPhase('waxing');
    else if (dayOfMonth <= 21) setMoonPhase('full');
    else setMoonPhase('waning');
  }, []);

  const startSummoning = () => {
    setShowCards(true);
    setSelectedAnimal(null);
    setFlippedCard(null);
  };

  const handleCardClick = (index: number) => {
    if (flippedCard !== null) return;
    setFlippedCard(index);
    setIsSummoning(true);
    setTimeout(() => {
      const animal = spiritAnimals[index];
      setSelectedAnimal(animal);
      setIsSummoning(false);
      setShowCards(false);
    }, 1650);
  };

  // Astrological background using unsplash as well (space/nebula image)
  const astrologicalBg =
    "before:content-[''] before:absolute before:inset-0 before:bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=80')] before:mix-blend-overlay before:opacity-60 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-indigo-950 after:via-purple-900 after:to-black after:opacity-90";

  const getMoodStyle = () => {
    switch (moonPhase) {
      case 'new':
        return {
          bg: 'from-indigo-950 via-slate-900 to-black',
          ring: 'ring-indigo-300',
          highlight: 'text-indigo-100',
          intensity: 'calm and introspective',
        };
      case 'full':
        return {
          bg: 'from-orange-500 via-yellow-300 to-purple-800',
          ring: 'ring-amber-200',
          highlight: 'text-yellow-100',
          intensity: 'powerful and intense',
        };
      case 'waxing':
        return {
          bg: 'from-blue-800 via-cyan-800 to-indigo-800',
          ring: 'ring-blue-200',
          highlight: 'text-cyan-100',
          intensity: 'growing and energetic',
        };
      case 'waning':
        return {
          bg: 'from-violet-900 via-purple-900 to-indigo-950',
          ring: 'ring-fuchsia-200',
          highlight: 'text-violet-100',
          intensity: 'reflective and releasing',
        };
    }
  };
  const mood = getMoodStyle();

  // SVG for constellations stays as a decorative overlay
  const ConstellationsSVG = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" viewBox="0 0 1200 600" fill="none">
      <circle cx="100" cy="200" r="2.5" fill="#fff"/>
      <circle cx="430" cy="500" r="1.8" fill="#fff"/>
      <circle cx="1140" cy="160" r="2" fill="#fff"/>
      <circle cx="860" cy="360" r="3.5" fill="#fff"/>
      <circle cx="670" cy="130" r="2.1" fill="#fff"/>
      <circle cx="200" cy="70" r="1.7" fill="#fff"/>
      <circle cx="950" cy="90" r="2.7" fill="#fff"/>
      <polyline points="100,200 430,500 860,360 670,130" stroke="#b793f9" strokeWidth="1.1" opacity=".7"/>
      <polyline points="950,90 1140,160" stroke="#ffffff" strokeWidth=".7" opacity=".6"/>
      <polyline points="430,500 200,70" stroke="#efa8fd" strokeWidth=".8" opacity=".7"/>
    </svg>
  );

  // Particle layer for sparkle effects
  const ParticleLayer = ({count = 36}) => (
    <div className="absolute inset-0 pointer-events-none z-10">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white/40 rounded-full shadow-sm animate-float"
          style={{
            top: `${(Math.random() * 100).toFixed(1)}%`,
            left: `${(Math.random() * 100).toFixed(1)}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${10 + Math.random() * 11}s`,
          }}
        />
      ))}
    </div>
  );

  // For glint/shine animation over the image/emoji
  const ShineEffect = () => (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-full">
      <div className="shine animate-shine" />
      <style>{`
        .shine {
          position: absolute; top: 0; left: -50%; width: 80%; height: 100%;
          background: linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.30) 50%, rgba(255,255,255,0) 100%);
          transform: rotate(12deg);
        }
        .animate-shine {
          animation: shine-move 2.2s cubic-bezier(.4,.6,.2,1) infinite;
        }
        @keyframes shine-move {
          0%   { left: -70%; }
          100% { left: 110%; }
        }
      `}</style>
    </div>
  );

  return (
    <section className={`py-24 px-4 relative overflow-hidden bg-gradient-to-br ${mood.bg} ${astrologicalBg} min-h-[90vh]`}>
      {/* Astrological SVG overlays */}
      <ConstellationsSVG />
      <ParticleLayer count={44} />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className={`font-heading text-5xl md:text-7xl font-bold mb-6 text-white flex items-center justify-center gap-4`}>
            <span className="bg-gradient-to-r from-yellow-300 to-fuchsia-400 text-transparent bg-clip-text animate-gradient-x"><Sparkles className="w-14 h-14 inline md:w-16 md:h-16" /></span>
            <span className="drop-shadow-lg tracking-tight bg-gradient-to-br from-white via-blue-200 to-purple-200 text-transparent bg-clip-text">
              Spirit Animal Summoner
            </span>
            <span>
              {moonPhase === 'full' ? (
                <Sun className="w-14 h-14 md:w-16 md:h-16 text-yellow-300 animate-spin-slow" />
              ) : (
                <Moon className="w-14 h-14 md:w-16 md:h-16 text-blue-200 animate-bounce-slow" />
              )}
            </span>
          </h2>
          <p className="font-body text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-xl">
            <span className="text-yellow-200">✨</span> Under the <span className={`${mood.highlight} font-semibold`}>{mood.intensity} moon</span>, discover your <span className="text-pink-200 font-bold">spirit guide</span> <span className="text-yellow-200">✨</span>
          </p>
        </div>

        {/* Initial state */}
        {!showCards && !selectedAnimal && (
          <Card className="p-14 bg-black/20 backdrop-blur-2xl border-white/20 shadow-2xl ring-2 ring-inset ring-purple-400/30 animate-fade-in">
            <div className="text-center space-y-10">
              <div className="relative w-52 h-52 mx-auto rounded-full shadow-xl overflow-hidden">
                {/* Decorative rotating glyph using external SVG */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Starsinthesky.svg"
                  alt="Astrological Glyph"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 animate-spin-very-slow"
                />
                {/* Floating sparkle effect */}
                <div className="absolute inset-8 flex items-center justify-center z-10">
                  <Sparkles className="w-32 h-32 text-white animate-pulse" />
                </div>
                <ShineEffect />
              </div>
              <div className="space-y-4 text-white">
                <p className="text-2xl md:text-3xl font-semibold tracking-tight">Are you ready to meet your spirit animal?</p>
                <p className="text-lg opacity-90">
                  Let the cosmos guide you. Shuffle the cards and reveal your mystical companion.
                </p>
                <p className="text-sm opacity-70">
                  <span className="font-bold capitalize">{moonPhase}</span> Moon — <span className={`${mood.highlight}`}>{mood.intensity}</span>
                </p>
              </div>
              <Button
                size="lg"
                onClick={startSummoning}
                className="bg-gradient-to-r from-fuchsia-500 via-violet-700 to-sky-700 hover:from-fuchsia-700 hover:to-violet-900 text-white font-semibold px-14 py-6 rounded-full shadow-xl shadow-fuchsia-500/30 transition-all text-lg tracking-wide hover:scale-105 animate-shimmer"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Begin Summoning
              </Button>
            </div>
          </Card>
        )}

        {/* Cards grid */}
        {showCards && (
          <div className="w-full py-8 grid grid-cols-2 md:grid-cols-5 gap-8 animate-fade-in">
            {spiritAnimals.slice(0, 5).map((animal, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`
                  relative perspective-1000 cursor-pointer transition-all duration-700
                  ${flippedCard === index ? 'scale-110 z-20' : 'hover:scale-105'}
                  ${flippedCard !== null && flippedCard !== index ? 'opacity-30' : 'opacity-100'}
                  group
                `}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Card Back */}
                <div className={`
                  absolute w-full h-full transition-all duration-700
                  ${flippedCard === index ? 'rotate-y-180 opacity-0' : ''}
                `}>
                  <Card className={`
                    aspect-[2/3] bg-gradient-to-br from-indigo-950/90 via-purple-900/90 to-black/80 border-white/40 shadow-xl flex items-center justify-center
                    relative overflow-hidden group-hover:ring-4 group-hover:ring-purple-400/50 transition-all
                  `}>
                    {/* Decorative glyph on the back */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Starsinthesky.svg"
                      alt="Astro Glyph"
                      className="absolute inset-0 w-full h-full object-cover opacity-30 animate-spin-very-slow"
                    />
                    <span className="absolute inset-0 z-10 flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-fuchsia-200 animate-pulse" />
                    </span>
                    <p className="text-white text-md font-semibold absolute bottom-8 left-1/2 -translate-x-1/2">Tap to Reveal</p>
                  </Card>
                </div>
                {/* Card Front */}
                <div className={`
                  absolute w-full h-full transition-all duration-700 transform
                  ${flippedCard === index ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}
                  flex items-center justify-center
                `}>
                  <Card className={`aspect-[2/3] bg-gradient-to-br ${animal.color} border-white/20 shadow-2xl ring-2 ring-fuchsia-200/30 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={animalGIFs[animal.name] || ''}
                        alt={animal.name + ' Spirit'}
                        className="w-28 h-40 object-cover rounded-xl shadow-lg border-4 border-white/20 opacity-95 animate-float-once"
                      />
                      <ShineEffect />
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-shadow-lg drop-shadow-xl">
                      <p className="text-white text-xl font-bold drop-shadow-xl">{animal.name}</p>
                    </div>
                  </Card>
                </div>
                <style>
                  {`
                  .rotate-y-0 { transform: rotateY(0deg); }
                  .rotate-y-180 { transform: rotateY(180deg); }
                  .animate-float-once {
                    animation: animalFloatReveal 1.14s cubic-bezier(0.6,0.45,0.4,1.1) both;
                  }
                  @keyframes animalFloatReveal {
                    0% { opacity: 0; transform: scale(0.7) translateY(30px);}
                    70% { opacity: 1; transform: scale(1.05) translateY(-8px);}
                    100% { opacity: 1; transform: scale(1) translateY(0);}
                  }
                  .animate-spin-very-slow { animation: spin 16s linear infinite; }
                  `}
                </style>
              </div>
            ))}
          </div>
        )}

        {/* Summoning animation */}
        {isSummoning && (
          <div className="text-center py-16 animate-fade-in">
            <div className="relative inline-block">
              <img
                src="https://media.giphy.com/media/VxbP9tLeKzazm/giphy.gif"
                alt="Summoning Portal"
                className="w-36 md:w-48 mx-auto animate-portal-blink rounded-full border-2 border-fuchsia-300 shadow-glow"
              />
              <span className="animate-pulse text-2xl md:text-3xl text-fuchsia-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold drop-shadow-lg z-10 whitespace-nowrap">
                Summoning Your Spirit Guide...
              </span>
            </div>
            <style>
              {`
              .animate-portal-blink { animation: portalBlink 1.8s linear infinite alternate; }
              @keyframes portalBlink {
                0% { filter: brightness(1); }
                50% { filter: brightness(1.12) saturate(1.6) drop-shadow(0 0 18px #fba4f2);}
                100% { filter: brightness(1); }
              }
              `}
            </style>
          </div>
        )}

        {/* Revealed Animal Card */}
        {selectedAnimal && !isSummoning && (
          <div className="space-y-10 animate-fade-in-up">
            <Card className={`
                p-12 md:p-16 bg-gradient-to-tr ${selectedAnimal.color} border-white/30 shadow-2xl ring-2 ${mood.ring}
                relative overflow-hidden backdrop-blur-2xl
              `}>
              {/* Aura and sparkles */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <ParticleLayer count={28} />
                {/* Animated glyph in aura */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Starsinthesky.svg"
                  alt="Astro Glyph"
                  className="absolute -top-8 md:-top-20 left-1/2 -translate-x-1/2 opacity-35 md:w-96 w-64 h-auto animate-spin-very-slow"
                />
              </div>
              {/* Animal image center w/ effect */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                <div className="relative w-40 h-40 md:w-60 md:h-60 flex items-center justify-center rounded-full shadow-xl border-4 border-fuchsia-200 overflow-hidden bg-black/20 shadow-fuchsia-500/30 animate-pop-bounce">
                  <img
                    src={animalGIFs[selectedAnimal.name] || ''}
                    alt={selectedAnimal.name}
                    className="object-cover w-full h-full"
                  />
                  <ShineEffect />
                  {/* Glow aura */}
                  <span className="absolute -z-10 -inset-6 bg-gradient-radial from-fuchsia-300/30 via-sky-200/20 to-transparent rounded-full animate-aura-pulse" />
                </div>
                <div className="text-white space-y-6 max-w-2xl mx-auto text-center md:text-left">
                  <h3 className="font-heading text-4xl md:text-5xl font-bold drop-shadow-xl">{selectedAnimal.name}</h3>
                  <div className="w-24 h-1 bg-white/40 mx-auto md:mx-0 mb-2" />
                  <p className="text-xl font-light italic leading-relaxed fadeIn" style={{ animationDelay: '.3s' }}>
                    "{selectedAnimal.message}"
                  </p>
                  <div className="mt-6 p-6 bg-black/30 backdrop-blur-sm rounded-2xl shadow-inner border border-fuchsia-200/10">
                    <p className="text-lg font-medium text-white/90">
                      <Sparkles className="w-6 h-6 inline mr-2 text-pink-200" />
                      {selectedAnimal.guidance}
                    </p>
                  </div>
                  <div className="pt-4 space-y-1 text-sm">
                    <span className="block">
                      Moon Phase: <span className="font-bold capitalize">{moonPhase}</span>
                    </span>
                    <span className="block italic opacity-80">
                      The <span className="capitalize">{moonPhase}</span> moon amplifies your {selectedAnimal.name}'s energy
                    </span>
                  </div>
                </div>
              </div>
              <style>
                {`
                  .animate-pop-bounce {
                    animation: popBounce 1.18s cubic-bezier(.47,1.64,.41,.8);
                  }
                  @keyframes popBounce {
                    0% { opacity:0; transform: scale(0.75);}
                    70% { opacity: 1; transform: scale(1.12);}
                    100% { opacity: 1; transform: scale(1);}
                  }
                  .animate-aura-pulse {
                    animation: auraPulse 2.6s ease-in-out infinite alternate;
                  }
                  @keyframes auraPulse {
                    0%   { opacity: 0.45; filter: blur(0px);}
                    60% { opacity: .72; filter: blur(3px);}
                    100% { opacity: 0.40; filter: blur(1px);}
                  }
                  .animate-fade-in-up {
                    animation: fadeInUp .86s cubic-bezier(.5,1.62,.4,1.06);
                  }
                  @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(40px);}
                    100% { opacity: 1; transform: translateY(0);}
                  }
                `}
              </style>
            </Card>
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => {
                  setSelectedAnimal(null);
                  setShowCards(false);
                  setFlippedCard(null);
                }}
                className="bg-white/30 hover:bg-white/40 text-white backdrop-blur-sm border border-white/30 font-semibold px-14 py-6 rounded-full shadow-xl shadow-fuchsia-500/10 transition-all duration-500 hover:scale-105 text-lg tracking-wide animate-gradient-x"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Summon Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
