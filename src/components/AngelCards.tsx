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
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-divine">
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
            <Sparkles className="w-4 h-4 text-mystic-gold/40" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-20">
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-mystic-gold mx-auto fill-mystic-gold/20 drop-shadow-[0_0_20px_hsl(43,74%,52%)]" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            Angel Oracle Cards
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Receive divine guidance and celestial messages from your guardian angels
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src={angelCardsImg} 
              alt="Angel Cards" 
              className="rounded-2xl shadow-mystic w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
              <div className="text-center space-y-8">
                <p className="text-muted-foreground leading-relaxed">
                  Take a deep breath, center your sacred energy, and ask for divine guidance. 
                  When you feel ready, draw your angel card.
                </p>

                <Button
                  onClick={drawCard}
                  disabled={isDrawing}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:from-mystic-purple hover:to-mystic-gold text-lg py-8 font-heading tracking-wider shadow-gold transition-all duration-500"
                >
                  <Heart className={`w-6 h-6 mr-3 ${isDrawing ? 'animate-pulse' : ''}`} />
                  {isDrawing ? 'Channeling Angels...' : 'Draw Angel Card'}
                </Button>

                <AnimatePresence mode="wait">
                  {selectedCard && (
                    <motion.div
                      key={selectedCard.angel}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="p-8 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-2xl border border-mystic-gold/40 shadow-divine backdrop-blur-sm">
                        <h3 className="font-heading text-3xl text-mystic-gold mb-4 tracking-wide">
                          {selectedCard.angel}
                        </h3>
                        <p className="text-xl font-semibold mb-6 text-foreground">
                          {selectedCard.message}
                        </p>
                        <div className="pt-6 border-t border-mystic-gold/30">
                          <p className="text-sm font-semibold text-mystic-gold mb-3">Divine Guidance</p>
                          <p className="text-muted-foreground leading-relaxed">{selectedCard.guidance}</p>
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
