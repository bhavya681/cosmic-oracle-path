import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Sparkles } from 'lucide-react';
import kabbalahImg from '@/assets/kabbalah.jpg';

const sephirot = [
  { name: 'Keter', hebrew: 'כתר', meaning: 'Crown', guidance: 'Divine will and pure consciousness', attribute: 'Unity' },
  { name: 'Chokmah', hebrew: 'חכמה', meaning: 'Wisdom', guidance: 'Intuitive insight and revelation', attribute: 'Inspiration' },
  { name: 'Binah', hebrew: 'בינה', meaning: 'Understanding', guidance: 'Deep comprehension and discernment', attribute: 'Contemplation' },
  { name: 'Chesed', hebrew: 'חסד', meaning: 'Mercy', guidance: 'Loving kindness and expansion', attribute: 'Love' },
  { name: 'Gevurah', hebrew: 'גבורה', meaning: 'Strength', guidance: 'Discipline and boundaries', attribute: 'Power' },
  { name: 'Tiferet', hebrew: 'תפארת', meaning: 'Beauty', guidance: 'Balance and harmony', attribute: 'Compassion' },
  { name: 'Netzach', hebrew: 'נצח', meaning: 'Eternity', guidance: 'Endurance and victory', attribute: 'Persistence' },
  { name: 'Hod', hebrew: 'הוד', meaning: 'Glory', guidance: 'Splendor and intellectual analysis', attribute: 'Humility' },
  { name: 'Yesod', hebrew: 'יסוד', meaning: 'Foundation', guidance: 'Connection and transmission', attribute: 'Truth' },
  { name: 'Malkuth', hebrew: 'מלכות', meaning: 'Kingdom', guidance: 'Manifestation in physical realm', attribute: 'Grounding' },
];

export const KabbalahDivination = () => {
  const [selectedSephira, setSelectedSephira] = useState<typeof sephirot[0] | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const revealSephira = async () => {
    setIsRevealing(true);
    setSelectedSephira(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomSephira = sephirot[Math.floor(Math.random() * sephirot.length)];
    setSelectedSephira(randomSephira);
    setIsRevealing(false);
  };

  return (
    <section className="relative py-16 px-2 md:py-24 md:px-4 overflow-hidden bg-gradient-sacred">
      {/* Animated Stars */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `calc(${20 + (i % 3) * 30}% - ${i <= 1 ? 20 : 0}px)`,
              top: `calc(${10 + Math.floor(i / 3) * 25}% - ${i % 2 === 0 ? 10 : 0}px)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Star className="w-6 h-6 md:w-8 md:h-8 text-violet-500/20" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-10 md:mb-16 px-2">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Star className="w-10 h-10 md:w-12 md:h-12 text-violet-500 mx-auto fill-violet-500/20" />
          </motion.div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-4 bg-gradient-to-r from-blue-400 via-mystic-gold to-blue-400 bg-clip-text text-transparent">
            Kabbalistic Divination
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg sm:max-w-2xl mx-auto px-2">
            Receive mystical wisdom from the Tree of Life
          </p>
        </div>

        {/* Responsive vertical stack on mobile, grid on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex justify-center mb-8 md:mb-0"
          >
            <motion.img
              src={kabbalahImg}
              alt="Tree of Life"
              className="rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-cover"
              animate={isRevealing ? {
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 60px rgba(139, 92, 246, 0.6)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: isRevealing ? Infinity : 0 }}
            />
          </motion.div>

          {/* Card Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card className="p-4 sm:p-6 md:p-8 backdrop-blur-md bg-card/70 md:bg-card/60 border-blue-500/30 shadow-mystic w-full">
              <div className="space-y-5 sm:space-y-6">
                <p className="text-muted-foreground text-center text-base sm:text-lg">
                  Focus your intention and connect with the ancient wisdom of Kabbalah.
                  Draw a Sephira from the Tree of Life.
                </p>

                <Button
                  onClick={revealSephira}
                  disabled={isRevealing}
                  className="w-full bg-gradient-to-r from-blue-500 to-mystic-gold hover:shadow-divine text-base sm:text-lg py-4 sm:py-6 transition-all duration-500"
                >
                  <Sparkles className={`w-5 h-5 mr-2 ${isRevealing ? 'animate-pulse' : ''}`} />
                  {isRevealing ? 'Revealing Sacred Wisdom...' : 'Reveal Sephira'}
                </Button>

                <AnimatePresence mode="wait">
                  {selectedSephira && (
                    <motion.div
                      key={selectedSephira.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/20 to-mystic-gold/10 rounded-lg sm:rounded-xl border border-blue-500/30 shadow-divine backdrop-blur-sm text-center">
                        <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{selectedSephira.hebrew}</div>
                        <h3 className="font-heading text-xl sm:text-2xl text-violet-400 mb-2">
                          {selectedSephira.name}
                        </h3>
                        <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">
                          ({selectedSephira.meaning})
                        </p>

                        <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-violet-500/20">
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-violet-400 mb-1">Divine Guidance</p>
                            <p className="text-foreground/90 text-sm sm:text-base">{selectedSephira.guidance}</p>
                          </div>
                          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-violet-500/20 rounded-full">
                            <span className="text-xs sm:text-sm font-semibold text-violet-400">
                              Attribute: {selectedSephira.attribute}
                            </span>
                          </div>
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
