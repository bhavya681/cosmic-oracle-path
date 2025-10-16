import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dices, Eye, Sparkles } from 'lucide-react';

const truthMessages = [
  "Ask the Universe a question — the next sign you see is your answer",
  "Your guardian angel whispers: Trust the path you cannot see",
  "A forgotten memory holds the key to your future",
  "The number 3 will appear to you today — pay attention",
  "Someone from your past is thinking of you right now",
  "Your intuition is your superpower — use it wisely today",
  "A door will close, but a window of opportunity will open",
  "The moon's energy guides you to release what no longer serves",
  "Your ancestors smile upon your current journey",
  "A synchronicity will reveal itself within 24 hours",
  "The universe is conspiring in your favor — trust the timing",
  "Your next dream holds a prophetic message"
];

export const OccultTruthDice = () => {
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [diceRotation, setDiceRotation] = useState({ x: 0, y: 0, z: 0 });

  const rollDice = () => {
    setRolling(true);
    setMessage(null);

    // Random rotations for 3D effect
    const interval = setInterval(() => {
      setDiceRotation({
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360
      });
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setRolling(false);
      const randomMessage = truthMessages[Math.floor(Math.random() * truthMessages.length)];
      setMessage(randomMessage);
      
      // Final rotation
      setDiceRotation({
        x: Math.floor(Math.random() * 4) * 90,
        y: Math.floor(Math.random() * 4) * 90,
        z: 0
      });
    }, 3000);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-deep-indigo via-background to-deep-indigo">
      {/* Mystical background effects */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Rotating mystical circles */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 border border-primary/30 rounded-full animate-spin-slow" />
        <div className="absolute w-80 h-80 border border-accent/30 rounded-full animate-spin-reverse" />
        <div className="absolute w-64 h-64 border border-primary/30 rounded-full animate-spin-slow" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Eye className="w-10 h-10 text-primary animate-pulse" />
            Occult Truth Dice
            <Dices className="w-10 h-10 text-accent animate-bounce" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Roll the celestial dice and receive a cryptic message from the Universe
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-primary/30 p-8 shadow-cosmic">
          <div className="text-center space-y-8">
            <div className="perspective-1000 min-h-[400px] flex items-center justify-center">
              {!rolling && !message && (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 blur-3xl bg-gradient-cosmic opacity-50 animate-pulse" />
                    <div 
                      className="relative w-32 h-32 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-3xl shadow-cosmic transform-style-3d"
                      style={{
                        transform: `rotateX(${diceRotation.x}deg) rotateY(${diceRotation.y}deg) rotateZ(${diceRotation.z}deg)`,
                      }}
                    >
                      {/* Dice faces with mystical symbols */}
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                        <Eye className="w-12 h-12" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Focus your intention and roll the dice of fate
                  </p>
                </div>
              )}

              {rolling && (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    {/* Glowing energy field */}
                    <div className="absolute inset-0 blur-3xl bg-gradient-cosmic opacity-70 animate-pulse" />
                    <div className="absolute -inset-10 blur-2xl bg-primary/30 animate-ping" />
                    
                    <div 
                      className="relative w-32 h-32 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-3xl shadow-cosmic transform-style-3d transition-transform duration-75"
                      style={{
                        transform: `rotateX(${diceRotation.x}deg) rotateY(${diceRotation.y}deg) rotateZ(${diceRotation.z}deg)`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                        <Dices className="w-12 h-12 animate-spin" />
                      </div>
                    </div>
                  </div>

                  {/* Energy particles during roll */}
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 18}deg) translateX(${100 + Math.random() * 50}px)`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }}
                    />
                  ))}

                  <p className="text-foreground text-xl font-bold animate-pulse">
                    The Universe is speaking...
                  </p>
                </div>
              )}

              {message && !rolling && (
                <div className="space-y-6 animate-scale-in">
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-primary/30 animate-pulse" />
                    <div 
                      className="relative w-32 h-32 bg-gradient-to-br from-primary via-accent to-purple-600 rounded-3xl shadow-cosmic transform-style-3d"
                      style={{
                        transform: `rotateX(${diceRotation.x}deg) rotateY(${diceRotation.y}deg) rotateZ(${diceRotation.z}deg)`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                        <Eye className="w-12 h-12 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50 rounded-2xl p-8 backdrop-blur-sm">
                      <div className="flex justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <p className="text-foreground text-2xl font-semibold italic leading-relaxed">
                        "{message}"
                      </p>
                      <div className="flex justify-center mt-4">
                        <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm">
                    This cryptic message holds power. Let it guide you through the day.
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={rollDice}
              disabled={rolling}
              className="bg-gradient-to-r from-primary via-accent to-purple-600 text-white px-10 py-6 text-lg font-bold hover:shadow-glow transition-all duration-300 disabled:opacity-50"
            >
              <Dices className="w-6 h-6 mr-2" />
              {rolling ? 'Rolling...' : message ? 'Roll Again' : 'Roll the Dice of Fate'}
            </Button>

            {message && (
              <p className="text-sm text-muted-foreground italic">
                💫 Received at {new Date().toLocaleTimeString()} — This moment is sacred
              </p>
            )}
          </div>
        </Card>
      </div>

      <style>{`
        .animate-spin-reverse {
          animation: spin 20s linear infinite reverse;
        }
      `}</style>
    </section>
  );
};