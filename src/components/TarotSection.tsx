import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Shuffle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MysticalNarrator } from './MysticalNarrator';
import { tarotDeck, type TarotCard } from '@/data/tarotDeck';
import tarotBackImage from '@/assets/tarot-back.jpg';

type SpreadType = 'one' | 'three' | 'celtic';

interface CardReading {
  card: TarotCard;
  isReversed: boolean;
  position?: string;
}

export const TarotSection = () => {
  const [spreadType, setSpreadType] = useState<SpreadType>('one');
  const [readings, setReadings] = useState<CardReading[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedReading, setSelectedReading] = useState<CardReading | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isReading, setIsReading] = useState(false);

  const drawCards = () => {
    // Always draw 4 cards for selection
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    const drawnCards: CardReading[] = shuffled.slice(0, 4).map((card) => ({
      card,
      isReversed: Math.random() > 0.5,
    }));

    setReadings(drawnCards);
    setSelectedIndex(null);
    setSelectedReading(null);
    setIsReading(true);
  };

  const handleCardClick = (reading: CardReading, index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setTimeout(() => {
        setSelectedReading(reading);
      }, 600);
    }
  };

  const resetReading = () => {
    setIsReading(false);
    setReadings([]);
    setSelectedIndex(null);
    setSelectedReading(null);
  };


  return (
    <section id="tarot" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30 animate-pulse-glow" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Sacred Tarot Readings
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {!isReading 
              ? "Unlock the wisdom of all 78 cards with guidance from the mystical oracle" 
              : "Choose the card that calls to your soul"
            }
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {!isReading ? (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="relative w-64 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-cosmic rounded-3xl blur-xl animate-pulse-glow" />
                <img 
                  src={tarotBackImage}
                  alt="Tarot Deck"
                  className="relative w-full h-full object-cover rounded-3xl shadow-cosmic animate-float"
                />
              </div>
              <Button
                size="lg"
                onClick={drawCards}
                className="group relative bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Reading
              </Button>
            </div>
          ) : (
            <>
              {/* 4 Cards to Choose From */}
              <div className="w-full max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {readings.map((reading, index) => (
                    <div
                      key={index}
                      className="relative perspective-1000 flex flex-col items-center animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`relative w-full aspect-[2/3] cursor-pointer transition-all duration-700 transform-style-3d ${
                          selectedIndex === index ? 'rotate-y-180' : ''
                        } ${
                          hoveredCard === index && selectedIndex === null
                            ? 'scale-105 -translate-y-4'
                            : ''
                        } ${
                          selectedIndex !== null && selectedIndex !== index
                            ? 'opacity-30 scale-95'
                            : ''
                        }`}
                        style={{
                          transformStyle: 'preserve-3d',
                          transform: selectedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}
                        onMouseEnter={() => selectedIndex === null && setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => handleCardClick(reading, index)}
                      >
                        {/* Card Back */}
                        <div
                          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-cosmic border-2 border-primary/30"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <img
                            src={tarotBackImage}
                            alt="Tarot Back"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-glow animate-pulse-glow" />
                        </div>

                        {/* Card Front */}
                        <div
                          className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-cosmic border-2 border-primary ${
                            reading.isReversed ? 'rotate-180' : ''
                          }`}
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                        >
                          <img
                            src={reading.card.image}
                            alt={reading.card.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm">
                            <h3 className="font-heading text-lg font-bold text-white text-center">
                              {reading.card.name}
                              {reading.isReversed && <span className="text-primary ml-2">(Reversed)</span>}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {hoveredCard === index && selectedIndex === null && (
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse-glow -z-10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Oracle's Reading */}
              {selectedReading && (
                <div className="w-full animate-fade-in space-y-8">
                  <MysticalNarrator 
                    message={selectedReading.isReversed 
                      ? selectedReading.card.narratorReversed 
                      : selectedReading.card.narratorMessage
                    }
                    isReversed={selectedReading.isReversed}
                  />

                  <Card className="w-full max-w-3xl mx-auto p-8 md:p-12 bg-card/90 backdrop-blur-sm border-primary shadow-cosmic">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                          {selectedReading.card.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedReading.card.arcana === 'major' ? 'Major Arcana' : `Minor Arcana - ${selectedReading.card.suit}`}
                          {selectedReading.isReversed && <span className="text-primary ml-2">• Reversed</span>}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-6 bg-gradient-cosmic rounded-xl">
                          <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                            Card Meaning
                          </h4>
                          <p className="font-body text-foreground/90 leading-relaxed">
                            {selectedReading.isReversed 
                              ? selectedReading.card.reversedMeaning 
                              : selectedReading.card.uprightMeaning
                            }
                          </p>
                        </div>

                        <div className="p-6 bg-gradient-cosmic rounded-xl">
                          <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                            Divine Guidance
                          </h4>
                          <p className="font-body text-foreground/90 leading-relaxed">
                            {selectedReading.isReversed 
                              ? selectedReading.card.reversedGuidance 
                              : selectedReading.card.uprightGuidance
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={resetReading}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  New Reading
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
