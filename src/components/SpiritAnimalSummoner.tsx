import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Moon, Sun } from 'lucide-react';

const spiritAnimals = [
  {
    name: "Wolf",
    guidance: "I am the Wolf. Trust your instincts today - they are sharper than you realize. Your pack needs your wisdom, but don't forget to howl at your own moon.",
    energy: "Instinct, Loyalty, Freedom",
    moonPhase: "full"
  },
  {
    name: "Owl",
    guidance: "I am the Owl. Silent wisdom flows through you today. What others miss in daylight, you'll see clearly in the shadows. Listen to the whispers between words.",
    energy: "Wisdom, Intuition, Mystery",
    moonPhase: "new"
  },
  {
    name: "Phoenix",
    guidance: "I am the Phoenix. From today's ashes, you shall rise renewed. What burns away was meant to transform. Your rebirth begins with acceptance of change.",
    energy: "Transformation, Rebirth, Resilience",
    moonPhase: "full"
  },
  {
    name: "Butterfly",
    guidance: "I am the Butterfly. Your metamorphosis is complete - now is the time to spread your wings. Don't fear the flight; you were always meant to soar.",
    energy: "Change, Beauty, Evolution",
    moonPhase: "waxing"
  },
  {
    name: "Dragon",
    guidance: "I am the Dragon. Ancient power stirs within you today. Guard your treasures, breathe your truth, and remember - you were born to be legendary.",
    energy: "Power, Wisdom, Protection",
    moonPhase: "full"
  },
  {
    name: "Deer",
    guidance: "I am the Deer. Move gently through today's forest. Sensitivity is not weakness - it's your superpower. Let grace guide your steps.",
    energy: "Gentleness, Awareness, Peace",
    moonPhase: "waning"
  },
  {
    name: "Eagle",
    guidance: "I am the Eagle. Rise above the noise today. From greater heights, clarity emerges. Your vision sees what others cannot - trust it.",
    energy: "Vision, Freedom, Courage",
    moonPhase: "full"
  },
  {
    name: "Bear",
    guidance: "I am the Bear. Today calls for inner strength tempered with compassion. Protect what matters, but know when to hibernate and heal.",
    energy: "Strength, Grounding, Introspection",
    moonPhase: "new"
  },
  {
    name: "Raven",
    guidance: "I am the Raven. Magic walks beside you today. Pay attention to signs, synchronicities, and symbols. The veil between worlds is thin.",
    energy: "Magic, Intelligence, Mystery",
    moonPhase: "new"
  },
  {
    name: "Fox",
    guidance: "I am the Fox. Adaptability is your gift today. When paths twist, you dance through them. Clever and cunning, you'll find the way.",
    energy: "Cleverness, Adaptability, Playfulness",
    moonPhase: "waxing"
  }
];

export const SpiritAnimalSummoner = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<typeof spiritAnimals[0] | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const summonAnimal = () => {
    setIsRevealing(true);
    setTimeout(() => {
      const randomAnimal = spiritAnimals[Math.floor(Math.random() * spiritAnimals.length)];
      setSelectedAnimal(randomAnimal);
      setIsRevealing(false);
    }, 2500);
  };

  const reset = () => {
    setSelectedAnimal(null);
  };

  const getMoonIcon = (phase: string) => {
    if (phase === "full") return <Sun className="w-6 h-6" />;
    return <Moon className="w-6 h-6" />;
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            🪶 Spirit Animal Summoner
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Call upon your Spirit Animal of the Day to receive mystical guidance and affirmation
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic">
          {!selectedAnimal && !isRevealing && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-cosmic animate-rotate-slow blur-xl" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-4 border-primary/30">
                  <Sparkles className="w-24 h-24 text-primary animate-pulse-glow" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Ready to Meet Your Spirit Guide?
                </h3>
                <p className="font-body text-muted-foreground max-w-md mx-auto">
                  Close your eyes, breathe deeply, and open your heart to receive today's message
                </p>
              </div>

              <Button
                size="lg"
                onClick={summonAnimal}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Summon Spirit Animal
              </Button>
            </div>
          )}

          {isRevealing && (
            <div className="text-center space-y-8 animate-scale-in">
              <div className="relative w-56 h-56 mx-auto">
                {/* Mystical summoning circles */}
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-primary/40 animate-spin"
                    style={{
                      animationDuration: `${2 + i * 0.5}s`,
                      animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                      transform: `scale(${1 - i * 0.1})`
                    }}
                  />
                ))}
                
                {/* Energy orbs */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-primary rounded-full blur-sm animate-float"
                    style={{
                      left: '50%',
                      top: '50%',
                      animation: `orbit ${3 + i * 0.3}s linear infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}

                <div className="absolute inset-8 rounded-full bg-gradient-cosmic flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Sparkles className="w-20 h-20 text-foreground animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-heading text-3xl text-primary animate-pulse-glow font-bold">
                  Channeling Your Spirit Guide...
                </p>
                <p className="font-body text-lg text-muted-foreground">
                  The ancient spirits are gathering
                </p>
              </div>
            </div>
          )}

          {selectedAnimal && !isRevealing && (
            <div className="space-y-8 animate-scale-in">
              <div className="text-center space-y-4">
                <div className="inline-block p-6 rounded-full bg-gradient-cosmic shadow-glow animate-pulse-glow">
                  <div className="text-6xl">{selectedAnimal.name === "Wolf" ? "🐺" : 
                    selectedAnimal.name === "Owl" ? "🦉" :
                    selectedAnimal.name === "Phoenix" ? "🔥" :
                    selectedAnimal.name === "Butterfly" ? "🦋" :
                    selectedAnimal.name === "Dragon" ? "🐉" :
                    selectedAnimal.name === "Deer" ? "🦌" :
                    selectedAnimal.name === "Eagle" ? "🦅" :
                    selectedAnimal.name === "Bear" ? "🐻" :
                    selectedAnimal.name === "Raven" ? "🦅" : "🦊"}</div>
                </div>

                <h3 className="font-heading text-4xl font-bold text-primary">
                  The {selectedAnimal.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  {getMoonIcon(selectedAnimal.moonPhase)}
                  <span className="font-body text-sm uppercase tracking-wider">
                    {selectedAnimal.moonPhase} moon energy
                  </span>
                </div>
              </div>

              <div className="bg-gradient-cosmic p-8 rounded-2xl space-y-6 border border-primary/20">
                <div className="space-y-4">
                  <p className="font-body text-xl text-foreground leading-relaxed italic">
                    "{selectedAnimal.guidance}"
                  </p>
                </div>

                <div className="pt-6 border-t border-foreground/10">
                  <p className="font-body text-sm text-muted-foreground mb-2">Core Energy</p>
                  <p className="font-heading text-lg font-semibold text-accent">
                    {selectedAnimal.energy}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={reset}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Summon Another
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
