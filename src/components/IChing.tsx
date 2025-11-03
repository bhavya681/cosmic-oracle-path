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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-purple-950/10 to-background">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-purple-500 mx-auto" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-500 via-amber-500 to-purple-500 bg-clip-text text-transparent">
            I-Ching Oracle
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ancient Chinese wisdom through the Book of Changes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-purple-500/20">
              <div className="text-center space-y-6">
                <img 
                  src={ichingImg} 
                  alt="I-Ching" 
                  className="rounded-xl w-full h-48 object-cover mb-6"
                />
                
                <Button
                  onClick={throwCoins}
                  disabled={isThrowingCoins}
                  className="w-full bg-gradient-to-r from-purple-500 to-amber-500 text-lg py-6"
                >
                  <Coins className={`w-5 h-5 mr-2 ${isThrowingCoins ? 'animate-spin' : ''}`} />
                  {isThrowingCoins ? 'Casting Coins...' : 'Cast the Coins'}
                </Button>

                <AnimatePresence mode="wait">
                  {hexagram && (
                    <motion.div
                      key={hexagram.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="p-6 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-xl border border-purple-500/20">
                        <div className="text-6xl mb-2">{hexagram.chinese}</div>
                        <h3 className="font-heading text-2xl text-purple-400 mb-1">
                          Hexagram {hexagram.number}
                        </h3>
                        <p className="text-xl font-semibold mb-4">{hexagram.name}</p>
                        <p className="text-muted-foreground mb-4">{hexagram.meaning}</p>
                        <div className="pt-4 border-t border-purple-500/20">
                          <p className="text-sm font-semibold text-purple-400 mb-2">Guidance</p>
                          <p className="text-foreground/90">{hexagram.guidance}</p>
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
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl mb-4">About I-Ching</h3>
            <p className="text-muted-foreground">
              The I-Ching, or Book of Changes, is one of the oldest Chinese classic texts. 
              It has been used for divination for over 3,000 years.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Wisdom', 'Balance', 'Guidance', 'Transformation'].map((word) => (
                <motion.div
                  key={word}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-purple-500/10 rounded-lg text-center border border-purple-500/20"
                >
                  <p className="font-semibold text-purple-400">{word}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
