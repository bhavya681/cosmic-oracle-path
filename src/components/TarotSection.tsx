import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import tarotBackImage from '@/assets/tarot-back.jpg';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  guidance: string;
  color: string;
}

const tarotDeck: TarotCard[] = [
  { 
    id: 1, 
    name: "The Star", 
    meaning: "Hope, renewal, and spiritual insight guide your path forward.",
    guidance: "Trust in the universe's plan. Your dreams are aligning with divine timing.",
    color: "from-blue-400 to-purple-500"
  },
  { 
    id: 2, 
    name: "The Moon", 
    meaning: "Intuition and dreams reveal hidden truths in the shadows.",
    guidance: "Pay attention to your subconscious messages. Trust your inner knowing.",
    color: "from-indigo-400 to-blue-600"
  },
  { 
    id: 3, 
    name: "The Sun", 
    meaning: "Joy, success, and clarity illuminate your journey ahead.",
    guidance: "Embrace positivity and let your light shine. Success is imminent.",
    color: "from-yellow-400 to-orange-500"
  },
  { 
    id: 4, 
    name: "The Lovers", 
    meaning: "Harmony and meaningful connections shape your destiny.",
    guidance: "Important choices await. Follow your heart's true calling.",
    color: "from-pink-400 to-rose-500"
  },
  { 
    id: 5, 
    name: "The Magician", 
    meaning: "Manifestation power flows through your intentions.",
    guidance: "You have all the tools needed. Channel your will into reality.",
    color: "from-purple-400 to-pink-500"
  },
  { 
    id: 6, 
    name: "The High Priestess", 
    meaning: "Deep wisdom and sacred knowledge await within.",
    guidance: "Look beyond the veil. Secret knowledge is being revealed to you.",
    color: "from-violet-400 to-purple-600"
  },
  { 
    id: 7, 
    name: "The Empress", 
    meaning: "Abundance, creativity, and nurturing energy surround you.",
    guidance: "Embrace your creative power. Prosperity flows naturally.",
    color: "from-green-400 to-emerald-500"
  },
  { 
    id: 8, 
    name: "The Emperor", 
    meaning: "Structure, authority, and leadership define your path.",
    guidance: "Take charge with confidence. Your leadership is needed now.",
    color: "from-red-400 to-orange-600"
  },
];

export const TarotSection = () => {
  const [displayCards, setDisplayCards] = useState<TarotCard[]>([]);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const shuffleCards = () => {
    const shuffled = [...tarotDeck]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setDisplayCards(shuffled);
    setFlippedCard(null);
    setSelectedCard(null);
  };

  const handleCardClick = (card: TarotCard, index: number) => {
    if (flippedCard === null) {
      setFlippedCard(index);
      setTimeout(() => {
        setSelectedCard(card);
      }, 600);
    }
  };

  return (
    <section id="journey" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-30 animate-pulse-glow" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Your Cosmic Tarot Reading
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose one card from the mystical altar to reveal your cosmic guidance
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          {displayCards.length === 0 ? (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="relative w-64 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-cosmic rounded-3xl blur-xl animate-pulse-glow" />
                <img 
                  src={tarotBackImage}
                  alt="Mystical Tarot Deck"
                  className="relative w-full h-full object-cover rounded-3xl shadow-cosmic animate-float"
                />
              </div>
              <Button
                size="lg"
                onClick={shuffleCards}
                className="group relative bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-10 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Your Reading
              </Button>
            </div>
          ) : (
            <>
              {/* Card Layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
                {displayCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="relative perspective-1000"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`relative w-full aspect-[2/3] cursor-pointer transition-all duration-700 transform-style-3d ${
                        flippedCard === index ? 'rotate-y-180' : ''
                      } ${
                        hoveredCard === index && flippedCard === null
                          ? 'scale-105 -translate-y-4'
                          : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                      onMouseEnter={() => flippedCard === null && setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => handleCardClick(card, index)}
                    >
                      {/* Card Back */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-cosmic border-2 border-primary/30"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <img
                          src={tarotBackImage}
                          alt="Tarot Card Back"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-glow animate-pulse-glow" />
                      </div>

                      {/* Card Front */}
                      <div
                        className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-cosmic border-2 border-primary rotate-y-180"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                        }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${card.color} p-6 flex flex-col items-center justify-center`}>
                          <Sparkles className="w-12 h-12 mb-4 text-white animate-pulse-glow" />
                          <h3 className="font-heading text-2xl font-bold text-white text-center">
                            {card.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Floating Glow Effect */}
                    {hoveredCard === index && flippedCard === null && (
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse-glow -z-10" />
                    )}
                  </div>
                ))}
              </div>

              {/* Prediction Panel */}
              {selectedCard && (
                <Card className="w-full max-w-3xl p-8 md:p-12 bg-card/90 backdrop-blur-sm border-primary shadow-cosmic animate-scale-in">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedCard.color} flex items-center justify-center shadow-glow animate-pulse-glow`}>
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-3xl font-bold text-foreground">
                          {selectedCard.name}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground">Your Cosmic Card</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-cosmic rounded-xl">
                        <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Card Meaning
                        </h4>
                        <p className="font-body text-foreground/90 leading-relaxed">
                          {selectedCard.meaning}
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-cosmic rounded-xl">
                        <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                          Divine Guidance
                        </h4>
                        <p className="font-body text-foreground/90 leading-relaxed">
                          {selectedCard.guidance}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Draw Again Button */}
              <Button
                size="lg"
                onClick={shuffleCards}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Draw New Cards
              </Button>
            </>
          )}
        </div>
      </div>

    </section>
  );
};
