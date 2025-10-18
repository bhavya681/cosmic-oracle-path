import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈', color: 'hsl(var(--primary))' },
  { name: 'Taurus', symbol: '♉', color: 'hsl(var(--accent))' },
  { name: 'Gemini', symbol: '♊', color: 'hsl(var(--secondary))' },
  { name: 'Cancer', symbol: '♋', color: 'hsl(var(--primary))' },
  { name: 'Leo', symbol: '♌', color: 'hsl(var(--accent))' },
  { name: 'Virgo', symbol: '♍', color: 'hsl(var(--secondary))' },
  { name: 'Libra', symbol: '♎', color: 'hsl(var(--primary))' },
  { name: 'Scorpio', symbol: '♏', color: 'hsl(var(--accent))' },
  { name: 'Sagittarius', symbol: '♐', color: 'hsl(var(--secondary))' },
  { name: 'Capricorn', symbol: '♑', color: 'hsl(var(--primary))' },
  { name: 'Aquarius', symbol: '♒', color: 'hsl(var(--accent))' },
  { name: 'Pisces', symbol: '♓', color: 'hsl(var(--secondary))' }
];

const predictions: Record<string, string> = {
  Aries: "Your fiery energy attracts new opportunities. Trust your instincts and take bold action.",
  Taurus: "Stability and growth merge in your path. Financial abundance flows toward you.",
  Gemini: "Communication unlocks hidden doors. Your curiosity leads to enlightenment.",
  Cancer: "Emotional healing brings profound transformation. Nurture your inner world.",
  Leo: "Your radiant presence inspires others. Creative projects flourish under your leadership.",
  Virgo: "Attention to detail reveals perfect solutions. Organization brings peace.",
  Libra: "Balance and harmony guide your relationships. Partnerships deepen with understanding.",
  Scorpio: "Transformation emerges from the depths. Your power intensifies through surrender.",
  Sagittarius: "Adventure calls you to expand horizons. Wisdom comes through exploration.",
  Capricorn: "Discipline manifests your highest goals. Success is your natural state.",
  Aquarius: "Innovation flows through your unique vision. Community celebrates your originality.",
  Pisces: "Intuitive gifts illuminate your spiritual path. Dreams hold important messages."
};

export const ZodiacSection = () => {
  const [selectedSign, setSelectedSign] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');
  const [showPrediction, setShowPrediction] = useState(false);

  const handleReveal = () => {
    if (selectedSign) {
      setPrediction(predictions[selectedSign]);
      setShowPrediction(true);
    }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Zodiac Cosmic Guidance
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            Discover what the stars reveal about your
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic relative overflow-hidden">
          {/* Animated cosmic background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-cosmic animate-pulse-glow" />
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          <div className="space-y-8 relative z-10">
            <div className="space-y-4">
              <label className="font-body text-lg font-medium text-foreground block">
                Select Your Zodiac Sign
              </label>
              <Select value={selectedSign} onValueChange={setSelectedSign}>
                <SelectTrigger className="w-full h-14 text-lg bg-background/50 border-border backdrop-blur-sm">
                  <SelectValue placeholder="Choose your sign..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border backdrop-blur-xl">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign.name} value={sign.name} className="text-lg">
                      <span className="flex items-center gap-3">
                        <span className="text-2xl animate-pulse-glow" style={{ color: sign.color }}>
                          {sign.symbol}
                        </span>
                        {sign.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              size="lg"
              onClick={handleReveal}
              disabled={!selectedSign}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Reveal Cosmic Guidance
            </Button>

            {showPrediction && (
              <div className="mt-8 p-8 bg-gradient-cosmic rounded-2xl animate-scale-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-cosmic flex items-center justify-center animate-pulse-glow shadow-glow">
                      <span 
                        className="text-5xl animate-rotate-slow" 
                        style={{ color: zodiacSigns.find(z => z.name === selectedSign)?.color }}
                      >
                        {zodiacSigns.find(z => z.name === selectedSign)?.symbol}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-foreground">
                      {selectedSign}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground italic">
                      Cosmic guidance for your journey
                    </p>
                  </div>
                </div>
                <p className="font-body text-lg text-foreground/90 leading-relaxed">
                  {prediction}
                </p>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="font-body text-sm text-muted-foreground italic">
            ✨ Daily cosmic guidance updated with celestial movements
          </p>
        </div>
      </div>
    </section>
  );
};
