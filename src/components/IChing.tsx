import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Sparkles } from 'lucide-react';
import ichingImg from '@/assets/iching-oracle.jpg';

const hexagrams = [
  { number: 1, name: 'The Creative', chinese: '乾', meaning: 'Strong creative force, heaven, leadership', guidance: 'Take bold action with confidence' },
  { number: 2, name: 'The Receptive', chinese: '坤', meaning: 'Yielding, earth, devotion', guidance: 'Practice patience and receptivity' },
  { number: 3, name: 'Difficulty at Beginning', chinese: '屯', meaning: 'Initial difficulties, chaos to order', guidance: 'Persist through challenges' },
  { number: 11, name: 'Peace', chinese: '泰', meaning: 'Harmony, prosperity, balance', guidance: 'Enjoy this harmonious period' },
  { number: 13, name: 'Fellowship', chinese: '同人', meaning: 'Community, shared values', guidance: 'Collaborate with others' },
  { number: 19, name: 'Approach', chinese: '臨', meaning: 'Advance carefully, growth', guidance: 'Move forward with awareness' },
  { number: 29, name: 'The Abysmal', chinese: '坎', meaning: 'Danger, test of character', guidance: 'Navigate with caution and wisdom' },
  { number: 44, name: 'Coming to Meet', chinese: '姤', meaning: 'Unexpected encounter', guidance: 'Be open to new connections' },
];

export const IChing = () => {
  const [isThrowingCoins, setIsThrowingCoins] = useState(false);
  const [hexagram, setHexagram] = useState<typeof hexagrams[0] | null>(null);

  const throwCoins = async () => {
    setIsThrowingCoins(true);
    setHexagram(null);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomHexagram = hexagrams[Math.floor(Math.random() * hexagrams.length)];
    setHexagram(randomHexagram);
    setIsThrowingCoins(false);
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-divine">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-mystic-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
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
            initial={{ rotate: -180, scale: 0 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
            className="inline-block mb-6"
          >
            <Sparkles className="w-16 h-16 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(43,74%,52%)]" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            I-Ching Oracle
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Ancient Chinese wisdom through the sacred Book of Changes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
              <div className="text-center space-y-8">
                <img 
                  src={ichingImg} 
                  alt="I-Ching" 
                  className="rounded-2xl w-full h-48 object-cover mb-6 shadow-divine"
                />
                
                <Button
                  onClick={throwCoins}
                  disabled={isThrowingCoins}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:from-mystic-purple hover:to-mystic-gold text-lg py-8 font-heading tracking-wider shadow-gold transition-all duration-500"
                >
                  <Coins className={`w-6 h-6 mr-3 ${isThrowingCoins ? 'animate-spin' : ''}`} />
                  {isThrowingCoins ? 'Casting Coins...' : 'Cast the Sacred Coins'}
                </Button>

                <AnimatePresence mode="wait">
                  {hexagram && (
                    <motion.div
                      key={hexagram.number}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="p-8 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-2xl border border-mystic-gold/40 shadow-divine backdrop-blur-sm">
                        <div className="text-7xl mb-4 animate-pulse-glow">{hexagram.chinese}</div>
                        <h3 className="font-heading text-3xl text-mystic-gold mb-2 tracking-wide">
                          Hexagram {hexagram.number}
                        </h3>
                        <p className="text-2xl font-semibold mb-4 text-foreground">{hexagram.name}</p>
                        <p className="text-muted-foreground mb-6 leading-relaxed">{hexagram.meaning}</p>
                        <div className="pt-6 border-t border-mystic-gold/30">
                          <p className="text-sm font-heading text-mystic-gold mb-3">Divine Guidance</p>
                          <p className="text-foreground/90 leading-relaxed">{hexagram.guidance}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="font-heading text-3xl mb-4 text-mystic-gold">About I-Ching</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The I-Ching, or Book of Changes, is one of the oldest Chinese classic texts. 
              It has been used for divination for over 3,000 years, offering profound wisdom for life's journey.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Wisdom', 'Balance', 'Guidance', 'Transformation'].map((word) => (
                <motion.div
                  key={word}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-xl text-center border border-mystic-gold/30 shadow-gold"
                >
                  <p className="font-heading text-lg text-mystic-gold">{word}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
