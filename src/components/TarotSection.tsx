import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shuffle } from 'lucide-react';
import tarotImage from '@/assets/tarot-cards.jpg';

const tarotMeanings = [
  { name: "The Star", meaning: "Hope, renewal, and spiritual insight guide your path forward." },
  { name: "The Moon", meaning: "Intuition and dreams reveal hidden truths in the shadows." },
  { name: "The Sun", meaning: "Joy, success, and clarity illuminate your journey ahead." },
  { name: "The Lovers", meaning: "Harmony and meaningful connections shape your destiny." },
  { name: "The Magician", meaning: "Manifestation power flows through your intentions." },
  { name: "The High Priestess", meaning: "Deep wisdom and sacred knowledge await within." },
];

export const TarotSection = () => {
  const [cards, setCards] = useState<typeof tarotMeanings>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleCards = () => {
    setIsShuffling(true);
    setCards([]);
    
    setTimeout(() => {
      const shuffled = [...tarotMeanings]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setCards(shuffled);
      setIsShuffling(false);
    }, 2000);
  };

  return (
    <section id="journey" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30 animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Your Cosmic Tarot Reading
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Let the cards reveal the mysteries of your spiritual path
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {/* Tarot Image */}
          <div className="relative w-full max-w-2xl">
            <img 
              src={tarotImage} 
              alt="Mystical Tarot Cards" 
              className="w-full rounded-2xl shadow-cosmic animate-float"
            />
            <div className="absolute inset-0 bg-gradient-glow rounded-2xl" />
          </div>

          {/* Shuffle Button */}
          <Button
            size="lg"
            onClick={shuffleCards}
            disabled={isShuffling}
            className="group relative bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
          >
            <Shuffle className={`w-5 h-5 mr-2 ${isShuffling ? 'animate-spin' : ''}`} />
            {isShuffling ? 'Shuffling Cards...' : 'Shuffle My Cards'}
          </Button>

          {/* Revealed Cards */}
          {cards.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8 w-full animate-scale-in">
              {cards.map((card, index) => (
                <Card 
                  key={index}
                  className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-glow"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-cosmic flex items-center justify-center mb-4 animate-pulse-glow">
                      <span className="text-2xl font-heading">{index + 1}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-primary">
                      {card.name}
                    </h3>
                    <p className="font-body text-foreground/80 leading-relaxed">
                      {card.meaning}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
