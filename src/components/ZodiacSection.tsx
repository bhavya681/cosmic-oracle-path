import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
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
            Discover what the stars reveal about your path
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="font-body text-lg font-medium text-foreground block">
                Select Your Zodiac Sign
              </label>
              <Select value={selectedSign} onValueChange={setSelectedSign}>
                <SelectTrigger className="w-full h-14 text-lg bg-background/50 border-border">
                  <SelectValue placeholder="Choose your sign..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign} className="text-lg">
                      {sign}
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse-glow">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {selectedSign}
                  </h3>
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
