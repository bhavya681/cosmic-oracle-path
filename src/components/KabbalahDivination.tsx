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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-sacred">
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i % 3) * 30}%`,
              top: `${10 + Math.floor(i / 3) * 25}%`,
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
            <Star className="w-8 h-8 text-violet-500/20" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Star className="w-12 h-12 text-violet-500 mx-auto fill-violet-500/20" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-400 via-mystic-gold to-blue-400 bg-clip-text text-transparent">
            Kabbalistic Divination
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Receive mystical wisdom from the Tree of Life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.img 
              src={kabbalahImg} 
              alt="Tree of Life" 
              className="rounded-2xl shadow-2xl w-full h-auto"
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-md bg-card/60 border-blue-500/30 shadow-mystic">
              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Focus your intention and connect with the ancient wisdom of Kabbalah. 
                  Draw a Sephira from the Tree of Life.
                </p>

                <Button
                  onClick={revealSephira}
                  disabled={isRevealing}
                  className="w-full bg-gradient-to-r from-blue-500 to-mystic-gold hover:shadow-divine text-lg py-6 transition-all duration-500"
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
                      <div className="p-6 bg-gradient-to-br from-blue-500/20 to-mystic-gold/10 rounded-xl border border-blue-500/30 shadow-divine backdrop-blur-sm text-center">
                        <div className="text-5xl mb-3">{selectedSephira.hebrew}</div>
                        <h3 className="font-heading text-2xl text-violet-400 mb-2">
                          {selectedSephira.name}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-4">
                          ({selectedSephira.meaning})
                        </p>
                        
                        <div className="space-y-3 pt-4 border-t border-violet-500/20">
                          <div>
                            <p className="text-sm font-semibold text-violet-400 mb-1">Divine Guidance</p>
                            <p className="text-foreground/90">{selectedSephira.guidance}</p>
                          </div>
                          <div className="inline-block px-4 py-2 bg-violet-500/20 rounded-full">
                            <span className="text-sm font-semibold text-violet-400">
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
