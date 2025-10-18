import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Moon, Sparkles, Cloud } from 'lucide-react';

const dreamSymbols = [
  { keywords: ['water', 'ocean', 'river', 'rain'], interpretation: "Water flows through your subconscious, dear seeker. It speaks of emotions seeking release, of cleansing, and rebirth. The tides of change are upon you - surrender to their current." },
  { keywords: ['fly', 'flying', 'air', 'sky'], interpretation: "Your soul yearns to transcend earthly bounds. This vision of flight reveals a desire for freedom and perspective. Rise above your constraints - liberation awaits." },
  { keywords: ['fall', 'falling', 'drop'], interpretation: "The sensation of falling reflects your fear of losing control. Yet in dreams, beloved one, we fall to learn that the ground will catch us. Trust in life's support." },
  { keywords: ['snake', 'serpent'], interpretation: "The serpent, ancient symbol of transformation, coils through your dreamscape. Shedding old skins, embracing wisdom - this is your moment of spiritual awakening." },
  { keywords: ['house', 'home', 'room'], interpretation: "The house is your soul's architecture, dear child. Each room a chamber of your psyche. What you discover within these walls reveals truths about your inner self." },
  { keywords: ['death', 'dying', 'dead'], interpretation: "Fear not this nocturnal visitor. Death in dreams heralds transformation, not ending. Something within you completes its cycle - honor what passes to welcome what emerges." },
  { keywords: ['chase', 'chasing', 'run', 'running'], interpretation: "What pursues you in shadow is often what you flee in daylight. Turn and face this phantom - it carries a message your conscious mind refuses to hear." },
  { keywords: ['fire', 'flame', 'burn'], interpretation: "Sacred fire blazes through your unconscious realm. It purifies, transforms, and illuminates. What must you burn away to reveal your authentic essence?" },
  { keywords: ['teeth', 'tooth'], interpretation: "Teeth symbolize power, words, and confidence. Their appearance suggests concerns about how you present yourself to the world. Speak your truth without fear of judgment." },
  { keywords: ['lost', 'lose', 'missing'], interpretation: "To be lost is to be in transition between who you were and who you're becoming. Embrace this sacred wandering - the path reveals itself to those who dare be temporarily adrift." }
];

const getInterpretation = (dream: string): string => {
  const lowerDream = dream.toLowerCase();
  
  for (const symbol of dreamSymbols) {
    if (symbol.keywords.some(keyword => lowerDream.includes(keyword))) {
      return symbol.interpretation;
    }
  }
  
  return "The realm of dreams speaks in whispers and symbols unique to your soul's journey. While this particular vision's meaning remains veiled, know that your subconscious is processing deep truths. Keep a dream journal - patterns will emerge, and understanding will follow.";
};

export const DreamOracle = () => {
  const [dream, setDream] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const analyzeDream = () => {
    if (!dream.trim()) return;

    setIsAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      const result = getInterpretation(dream);
      setInterpretation(result);
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const reset = () => {
    setDream('');
    setInterpretation('');
    setShowResult(false);
    setIsAnalyzing(false);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Dreamlike background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-blue-950/20 to-background" />
      
      {/* Floating clouds */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <Cloud
            key={i}
            className="absolute text-primary/30 animate-float"
            style={{
              left: `${i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${15 + i * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            🌘 Dream Oracle
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your dream and receive wisdom from the mystical priestess who walks between worlds
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          {!showResult && !isAnalyzing && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center space-y-4 mb-8">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 animate-pulse-glow blur-xl" />
                  <div className="relative w-full h-full rounded-full bg-gradient-cosmic flex items-center justify-center border-4 border-primary/30">
                    <Moon className="w-16 h-16 text-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="dream" className="font-heading text-lg font-semibold text-foreground block">
                  Describe Your Dream
                </label>
                <Textarea
                  id="dream"
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  placeholder="I dreamed that I was flying over an ocean at night, and there were stars reflected in the water below me..."
                  className="min-h-[200px] bg-background/50 border-primary/30 focus:border-primary resize-none font-body"
                />
                <p className="text-sm text-muted-foreground italic">
                  Include symbols, emotions, and any vivid details you remember
                </p>
              </div>

              <Button
                size="lg"
                onClick={analyzeDream}
                disabled={!dream.trim()}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Consult the Oracle
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center space-y-8 animate-scale-in">
              <div className="relative w-48 h-48 mx-auto">
                {/* Mystical oracle effect */}
                <div className="absolute inset-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping"
                      style={{
                        animationDelay: `${i * 0.7}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>

                <div className="relative w-full h-full">
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600/40 to-blue-600/40 animate-pulse-glow blur-2xl" />
                  <div className="relative w-full h-full rounded-full bg-gradient-cosmic flex items-center justify-center border-4 border-primary shadow-glow">
                    <Moon className="w-24 h-24 text-foreground animate-pulse" />
                  </div>
                </div>

                {/* Orbiting symbols */}
                {['✨', '🌙', '⭐', '🔮'].map((symbol, i) => (
                  <div
                    key={i}
                    className="absolute text-3xl"
                    style={{
                      left: '50%',
                      top: '50%',
                      animation: `orbit ${3 + i * 0.5}s linear infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <p className="font-heading text-3xl text-primary animate-pulse-glow font-bold">
                  The Oracle Gazes Into Your Dream...
                </p>
                <p className="font-body text-lg text-muted-foreground">
                  Interpreting symbols from the realm of sleep
                </p>
                <div className="flex justify-center gap-2 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResult && (
            <div className="space-y-8 animate-scale-in">
              <div className="text-center space-y-4">
                <div className="inline-block p-6 rounded-full bg-gradient-cosmic shadow-glow animate-pulse-glow">
                  <Moon className="w-16 h-16 text-foreground" />
                </div>

                <h3 className="font-heading text-3xl font-bold text-primary">
                  The Oracle Speaks
                </h3>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-background p-8 rounded-2xl border border-primary/20 shadow-cosmic">
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider text-center">
                    Your Dream
                  </div>
                  <div className="p-4 bg-background/30 rounded-xl">
                    <p className="font-body text-foreground/80 italic">
                      "{dream}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-primary/20">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider text-center mb-4">
                      Oracle's Interpretation
                    </div>
                    <p className="font-body text-xl text-foreground leading-relaxed">
                      {interpretation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-xl border border-accent/30">
                <p className="font-body text-sm text-center text-foreground/70">
                  💫 Dreams are the language of your soul. Honor their wisdom, dear dreamer.
                </p>
              </div>

              <Button
                size="lg"
                onClick={reset}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Moon className="w-5 h-5 mr-2" />
                Interpret Another Dream
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
