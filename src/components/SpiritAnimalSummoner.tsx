import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Moon, Sun } from 'lucide-react';

const spiritAnimals = [
  {
    name: 'Wolf',
    emoji: '🐺',
    message: "I am the Wolf. Trust your instincts today, for they guide you through the darkness into light. Your pack is your strength, but your independence is your power.",
    color: 'from-indigo-600 to-purple-700',
    guidance: 'Leadership and intuition flow through you.',
  },
  {
    name: 'Eagle',
    emoji: '🦅',
    message: "I am the Eagle. Soar above the mundane and see the bigger picture. Your vision pierces through illusion, revealing truth from the highest perspective.",
    color: 'from-blue-500 to-cyan-600',
    guidance: 'Clarity and perspective illuminate your path.',
  },
  {
    name: 'Butterfly',
    emoji: '🦋',
    message: "I am the Butterfly. Embrace transformation with grace. What seems like an ending is merely a beautiful beginning. Your metamorphosis is divine.",
    color: 'from-pink-500 to-rose-600',
    guidance: 'Transformation and renewal bless your journey.',
  },
  {
    name: 'Owl',
    emoji: '🦉',
    message: "I am the Owl. Wisdom dwells in silence. Look beyond the veil of darkness to discover hidden truths. Your inner knowing is your greatest gift.",
    color: 'from-violet-600 to-purple-800',
    guidance: 'Ancient wisdom speaks through you.',
  },
  {
    name: 'Bear',
    emoji: '🐻',
    message: "I am the Bear. Stand in your power with gentle strength. Rest when needed, act when called. Your courage comes from deep within.",
    color: 'from-amber-700 to-orange-800',
    guidance: 'Grounded strength and introspection guide you.',
  },
  {
    name: 'Dolphin',
    emoji: '🐬',
    message: "I am the Dolphin. Joy and playfulness heal all wounds. Navigate emotional depths with grace and communicate from the heart. Life is meant to be enjoyed.",
    color: 'from-cyan-500 to-blue-600',
    guidance: 'Joy and emotional intelligence flow freely.',
  },
  {
    name: 'Fox',
    emoji: '🦊',
    message: "I am the Fox. Adaptability is your superpower. Use cleverness with integrity, and you'll find solutions where others see only obstacles.",
    color: 'from-orange-500 to-red-600',
    guidance: 'Cunning and adaptability serve you well.',
  },
  {
    name: 'Deer',
    emoji: '🦌',
    message: "I am the Deer. Move through life with grace and gentleness. Your sensitivity is not weakness—it's your connection to the divine. Trust your gentleness.",
    color: 'from-green-500 to-emerald-600',
    guidance: 'Gentle grace and sensitivity are your gifts.',
  },
  {
    name: 'Dragon',
    emoji: '🐉',
    message: "I am the Dragon. Ancient power flows through your veins. Guard your treasures, breathe your truth, and let your inner fire transform the world.",
    color: 'from-red-600 to-purple-700',
    guidance: 'Primordial power and transformation await.',
  },
  {
    name: 'Phoenix',
    emoji: '🔥',
    message: "I am the Phoenix. From ashes, you rise renewed. Every ending births a glorious beginning. Your resilience is legendary—embrace your rebirth.",
    color: 'from-yellow-500 to-red-600',
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
    // Calculate moon phase based on current date
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
    }, 1500);
  };

  const getMoodStyle = () => {
    switch (moonPhase) {
      case 'new':
        return { bg: 'from-indigo-900 via-purple-900 to-black', intensity: 'calm and introspective' };
      case 'full':
        return { bg: 'from-orange-600 via-red-600 to-purple-900', intensity: 'powerful and intense' };
      case 'waxing':
        return { bg: 'from-blue-600 via-cyan-600 to-teal-700', intensity: 'growing and energetic' };
      case 'waning':
        return { bg: 'from-violet-700 via-purple-800 to-indigo-900', intensity: 'reflective and releasing' };
    }
  };

  const mood = getMoodStyle();

  return (
    <section className={`py-24 px-4 relative overflow-hidden bg-gradient-to-br ${mood.bg}`}>
      {/* Animated mystical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white flex items-center justify-center gap-4">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
            Spirit Animal Summoner
            {moonPhase === 'full' ? (
              <Sun className="w-12 h-12 text-yellow-300 animate-pulse" />
            ) : (
              <Moon className="w-12 h-12 text-blue-200 animate-pulse" />
            )}
          </h2>
          <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            ✨ Under the {mood.intensity} moon, discover your spirit guide of the day ✨
          </p>
        </div>

        {!showCards && !selectedAnimal && (
          <Card className="p-12 bg-white/10 backdrop-blur-md border-white/20 shadow-cosmic animate-scale-in">
            <div className="text-center space-y-8">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-gradient-cosmic rounded-full animate-pulse-glow" />
                <div className="absolute inset-4 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-24 h-24 text-white animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-4 text-white">
                <p className="text-2xl font-semibold">Ready to meet your spirit guide?</p>
                <p className="text-lg opacity-90">
                  The cosmic energies are aligned. Choose a card to reveal your animal companion.
                </p>
                <p className="text-sm opacity-70">
                  Current moon phase: <span className="font-bold capitalize">{moonPhase}</span> — {mood.intensity}
                </p>
              </div>

              <Button
                size="lg"
                onClick={startSummoning}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Summoning
              </Button>
            </div>
          </Card>
        )}

        {showCards && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 animate-fade-in">
            {spiritAnimals.slice(0, 5).map((animal, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`relative perspective-1000 cursor-pointer transition-all duration-700 ${
                  flippedCard === index ? 'scale-110' : 'hover:scale-105'
                } ${flippedCard !== null && flippedCard !== index ? 'opacity-30' : ''}`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Card Back */}
                <Card className={`aspect-[2/3] bg-gradient-to-br from-purple-600 to-pink-600 border-white/30 shadow-cosmic flex items-center justify-center backface-hidden ${
                  flippedCard === index ? 'hidden' : ''
                }`}>
                  <div className="text-center space-y-4">
                    <Sparkles className="w-16 h-16 text-white mx-auto animate-pulse" />
                    <p className="text-white text-sm font-semibold">Tap to Reveal</p>
                  </div>
                </Card>

                {/* Card Front */}
                {flippedCard === index && (
                  <Card className={`aspect-[2/3] bg-gradient-to-br ${animal.color} border-white/30 shadow-cosmic flex items-center justify-center animate-scale-in`}>
                    <div className="text-center space-y-4">
                      <div className="text-7xl animate-pulse">{animal.emoji}</div>
                      <p className="text-white text-xl font-bold">{animal.name}</p>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}

        {isSummoning && (
          <div className="text-center py-12 animate-pulse">
            <p className="text-white text-2xl font-semibold">Summoning your spirit guide...</p>
          </div>
        )}

        {selectedAnimal && !isSummoning && (
          <div className="space-y-8 animate-scale-in">
            <Card className={`p-12 bg-gradient-to-br ${selectedAnimal.color} border-white/30 shadow-cosmic relative overflow-hidden`}>
              {/* Animated aura effect */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-white rounded-full animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${Math.random() * 5 + 5}s`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center space-y-8">
                <div className="text-9xl mb-6 animate-float">{selectedAnimal.emoji}</div>
                
                <div className="space-y-4 text-white">
                  <h3 className="font-heading text-4xl font-bold">{selectedAnimal.name}</h3>
                  <div className="w-24 h-1 bg-white/50 mx-auto" />
                  
                  <div className="max-w-2xl mx-auto">
                    <p className="text-xl font-semibold mb-4 italic leading-relaxed">
                      "{selectedAnimal.message}"
                    </p>
                    
                    <div className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-xl">
                      <p className="text-lg">
                        <Sparkles className="w-5 h-5 inline mr-2" />
                        {selectedAnimal.guidance}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 space-y-2">
                    <p className="text-sm opacity-80">
                      Moon Phase: <span className="font-bold capitalize">{moonPhase}</span>
                    </p>
                    <p className="text-xs opacity-70 italic">
                      The {moonPhase} moon enhances the {selectedAnimal.name}'s energy
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => {
                  setSelectedAnimal(null);
                  setShowCards(false);
                  setFlippedCard(null);
                }}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
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
