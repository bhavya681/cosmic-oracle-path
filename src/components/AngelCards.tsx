import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';
import angelCardsImg from '@/assets/angel-cards.jpg';

const angelMessages = [
  { angel: 'Archangel Michael', message: 'Protection and courage surround you', guidance: 'Stand strong in your truth and fearlessly pursue your divine purpose' },
  { angel: 'Archangel Raphael', message: 'Healing energy flows to you', guidance: 'Allow yourself to heal emotionally, physically, and spiritually' },
  { angel: 'Archangel Gabriel', message: 'Divine messages await you', guidance: 'Open your heart to receive guidance through signs and synchronicities' },
  { angel: 'Archangel Uriel', message: 'Wisdom illuminates your path', guidance: 'Trust your inner wisdom to guide you through current challenges' },
  { angel: 'Guardian Angel', message: 'You are deeply loved and protected', guidance: 'Know that you are never alone on your journey' },
  { angel: 'Angel of Peace', message: 'Tranquility fills your soul', guidance: 'Release worry and embrace the peace that is your birthright' },
  { angel: 'Angel of Joy', message: 'Celebrate life\'s blessings', guidance: 'Find joy in small moments and share your light with others' },
  { angel: 'Angel of Abundance', message: 'Prosperity flows to you', guidance: 'Open yourself to receive the abundance the universe offers' },
];

export const AngelCards = () => {
  const [selectedCard, setSelectedCard] = useState<typeof angelMessages[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCard = async () => {
    setIsDrawing(true);
    setSelectedCard(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomCard = angelMessages[Math.floor(Math.random() * angelMessages.length)];
    setSelectedCard(randomCard);
    setIsDrawing(false);
  };

  return (
    <section className="relative py-16 px-2 sm:py-20 sm:px-4 md:py-24 overflow-hidden bg-gradient-sacred">
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4 text-pink-400/30" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10 px-0"
      >
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500 mx-auto fill-pink-500/20" />
          </motion.div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 via-mystic-gold to-pink-400 bg-clip-text text-transparent">
            Angel Oracle Cards
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xs sm:max-w-xl md:max-w-2xl mx-auto">
            Receive divine guidance and messages from your guardian angels
          </p>
        </div>

        {/* Responsive: stack on mobile, side by side for md+ */}
        <div className="flex flex-col gap-6 sm:gap-8 md:grid md:grid-cols-2 md:gap-8 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-xs mx-auto sm:max-w-md md:max-w-full"
          >
            <img
              src={angelCardsImg}
              alt="Angel Cards"
              className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover aspect-[4/3] md:aspect-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl sm:rounded-2xl" />
          </motion.div>

          {/* Card Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-xl mx-auto"
          >
            <Card className="p-4 sm:p-6 md:p-8 backdrop-blur-md bg-card/60 border-pink-500/30 shadow-mystic">
              <div className="text-center space-y-5 sm:space-y-6">
                <p className="text-muted-foreground text-base sm:text-lg">
                  Take a deep breath, center yourself, and ask for divine guidance.<br className="hidden sm:block" />
                  When you're ready, draw your angel card.
                </p>

                <Button
                  onClick={drawCard}
                  disabled={isDrawing}
                  className="w-full bg-gradient-to-r from-pink-500 to-mystic-gold hover:shadow-divine text-base sm:text-lg py-4 sm:py-5 transition-all duration-500"
                >
                  <Heart className={`w-5 h-5 mr-2 ${isDrawing ? 'animate-pulse' : ''}`} />
                  {isDrawing ? 'Connecting with Angels...' : 'Draw Angel Card'}
                </Button>

                <AnimatePresence mode="wait">
                  {selectedCard && (
                    <motion.div
                      key={selectedCard.angel}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-pink-500/30 to-mystic-gold/10 rounded-md sm:rounded-xl border border-pink-500/30 shadow-divine backdrop-blur-sm text-left sm:text-center">
                        <h3 className="font-heading text-xl sm:text-2xl text-pink-400 mb-2 sm:mb-3">
                          {selectedCard.angel}
                        </h3>
                        <p className="text-base sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">
                          {selectedCard.message}
                        </p>
                        <div className="pt-3 sm:pt-4 border-t border-pink-500/20">
                          <p className="text-xs sm:text-sm font-semibold text-pink-400 mb-1 sm:mb-2">Divine Guidance</p>
                          <p className="text-muted-foreground text-sm sm:text-base">{selectedCard.guidance}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
