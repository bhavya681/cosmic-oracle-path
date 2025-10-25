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

// Helper function for better shuffling randomness
function cryptoShuffle<T>(array: T[]): T[] {
  const result = [...array];
  if (window.crypto && window.crypto.getRandomValues) {
    for (let i = result.length - 1; i > 0; i--) {
      // Window.crypto doesn't guarantee uniformity, but it's much better than Math.random
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      const j = randomArray[0] % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
  } else {
    // Fallback to classic Fisher-Yates using Math.random if crypto not available
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  }
  return result;
}

export const TarotSection = () => {
  const [spreadType, setSpreadType] = useState<SpreadType>('one');
  const [readings, setReadings] = useState<CardReading[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedReading, setSelectedReading] = useState<CardReading | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isReading, setIsReading] = useState(false);

  const drawCards = () => {
    const shuffled = cryptoShuffle(tarotDeck);

    const drawnCards: CardReading[] = shuffled.slice(0, 4).map((card) => ({
      card,
      isReversed: (() => {
        if (window.crypto && window.crypto.getRandomValues) {
          const arr = new Uint8Array(1);
          window.crypto.getRandomValues(arr);
          return arr[0] % 2 === 0;
        } else {
          return Math.random() > 0.5;
        }
      })(),
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
    <section id="tarrot" className="py-16 md:py-24 px-2 md:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-foreground">
            Sacred Tarot Readings
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {!isReading
              ? "Unlock the wisdom of all 78 cards with guidance from the mystical oracle"
              : "Choose the card that calls to your soul"
            }
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          {!isReading ? (
            <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
              <div className="relative w-36 h-56 sm:w-48 sm:h-72 md:w-64 md:h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-cosmic rounded-3xl blur-xl animate-pulse-glow" />
                <img
                  src={tarotBackImage}
                  alt="Tarot Deck"
                  className="relative w-full h-full object-cover rounded-3xl shadow-cosmic animate-float"
                  draggable={false} // helps mobile, prevents accidental drag
                />
              </div>
              <Button
                size="lg"
                onClick={drawCards}
                className="group relative bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-7 md:px-10 py-4 md:py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 text-base md:text-lg w-[90vw] max-w-xs"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Reading
              </Button>
            </div>
          ) : (
            <>
              {/* 4 Cards to Choose From */}
              <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-5xl px-1 sm:px-4 mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                  {readings.map((reading, index) => (
                    <div
                      key={index}
                      className="relative perspective-1000 flex flex-col items-center animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`
                          relative w-[43vw] sm:w-40 md:w-full 
                          max-w-[140px] sm:max-w-[160px] md:max-w-none
                          aspect-[2/3] cursor-pointer transition-all duration-700 transform-style-3d
                          ${selectedIndex === index ? 'rotate-y-180' : ''}
                          ${hoveredCard === index && selectedIndex === null ? 'scale-105 -translate-y-2 sm:-translate-y-4' : ''}
                          ${selectedIndex !== null && selectedIndex !== index ? 'opacity-30 scale-95' : ''}
                        `}
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
                            className="w-full h-full object-cover select-none"
                            draggable={false}
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
                            className="w-full h-full object-cover select-none"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-black/40 backdrop-blur-sm">
                            <h3 className="font-heading text-base sm:text-lg font-bold text-white text-center">
                              {reading.card.name}
                              {reading.isReversed && <span className="text-primary ml-2">(Reversed)</span>}
                            </h3>
                          </div>
                        </div>
                      </div>
                      {/* Card Highlight on hover/focus mobile-friendly fallback */}
                      {hoveredCard === index && selectedIndex === null && (
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse-glow -z-10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Oracle's Reading */}
              {selectedReading && (
                <div className="w-full animate-fade-in space-y-6 md:space-y-8">
                  <MysticalNarrator
                    message={selectedReading.isReversed
                      ? selectedReading.card.narratorReversed
                      : selectedReading.card.narratorMessage
                    }
                    isReversed={selectedReading.isReversed}
                  />

                  <Card className="w-full max-w-sm sm:max-w-xl md:max-w-3xl mx-auto p-4 sm:p-6 md:p-12 bg-card/90 backdrop-blur-sm border-primary shadow-cosmic">
                    <div className="space-y-4 md:space-y-6">
                      <div className="text-center">
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
                          {selectedReading.card.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {selectedReading.card.arcana === 'major'
                            ? 'Major Arcana'
                            : `Minor Arcana - ${selectedReading.card.suit}`}
                          {selectedReading.isReversed && <span className="text-primary ml-2">• Reversed</span>}
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <div className="p-3 sm:p-4 md:p-6 bg-gradient-cosmic rounded-xl">
                          <h4 className="font-heading text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                            Card Meaning
                          </h4>
                          <p className="font-body text-[15px] md:text-base text-foreground/90 leading-relaxed">
                            {selectedReading.isReversed
                              ? selectedReading.card.reversedMeaning
                              : selectedReading.card.uprightMeaning
                            }
                          </p>
                        </div>

                        <div className="p-3 sm:p-4 md:p-6 bg-gradient-cosmic rounded-xl">
                          <h4 className="font-heading text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">
                            Divine Guidance
                          </h4>
                          <p className="font-body text-[15px] md:text-base text-foreground/90 leading-relaxed">
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
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center mt-6">
                <Button
                  size="lg"
                  onClick={resetReading}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-7 md:px-12 py-4 md:py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 text-base md:text-lg w-[90vw] max-w-xs"
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
