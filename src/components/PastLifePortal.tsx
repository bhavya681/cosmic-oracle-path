import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const pastLifeMessages = [
  "You were a healer in ancient Egypt, channeling divine wisdom through temple ceremonies.",
  "Your soul walked as a scholar in medieval Europe, preserving sacred knowledge through dark times.",
  "You danced with the cosmos as a Vedic sage, teaching harmony between earth and sky.",
  "Your spirit guided caravans across silk roads, connecting distant worlds through trade and wisdom.",
  "You served as a guardian of sacred groves, protecting nature's mysteries with devotion.",
  "Your essence shone as a court mystic in Renaissance Italy, advising rulers through astrology.",
];

export const PastLifePortal = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const explorePastLife = () => {
    setIsExploring(true);
    setShowMessage(false);
    
    setTimeout(() => {
      const randomMessage = pastLifeMessages[Math.floor(Math.random() * pastLifeMessages.length)];
      setMessage(randomMessage);
      setShowMessage(true);
      setIsExploring(false);
    }, 3000);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Animated Portal Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-96 h-96 rounded-full bg-gradient-cosmic blur-3xl opacity-30 ${isExploring ? 'animate-pulse-glow' : ''}`} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Past Life Portal
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Journey through time to uncover echoes of your soul's ancient wisdom
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          <div className="text-center space-y-8">
            {!showMessage && !isExploring && (
              <div className="space-y-6 animate-fade-in">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-cosmic flex items-center justify-center animate-rotate-slow">
                  <Clock className="w-12 h-12 text-foreground" />
                </div>
                <p className="font-body text-lg text-foreground/80">
                  Close your eyes, take a deep breath, and when you're ready...
                </p>
              </div>
            )}

            {isExploring && (
              <div className="space-y-6 animate-scale-in">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-pulse" />
                  <div className="w-full h-full rounded-full bg-gradient-cosmic flex items-center justify-center animate-rotate-slow">
                    <Clock className="w-16 h-16 text-foreground" />
                  </div>
                </div>
                <p className="font-body text-xl text-foreground animate-pulse-glow">
                  Traveling through the cosmic timeline...
                </p>
              </div>
            )}

            {showMessage && (
              <div className="space-y-6 animate-scale-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary flex items-center justify-center shadow-glow">
                  <Clock className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="p-8 bg-gradient-cosmic rounded-2xl">
                  <p className="font-body text-xl text-foreground leading-relaxed">
                    {message}
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
              {isExploring ? 'Exploring...' : showMessage ? 'Explore Again' : 'Explore My Past Life'}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
