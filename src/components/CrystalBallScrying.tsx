import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Sparkles, Circle } from 'lucide-react';

const visions = [
  { 
    vision: 'A Golden Path', 
    meaning: 'Success and prosperity await you on your current journey',
    timeframe: 'Within the next lunar cycle' 
  },
  { 
    vision: 'Swirling Waters', 
    meaning: 'Emotional transformation is occurring - flow with the changes',
    timeframe: 'Present moment' 
  },
  { 
    vision: 'Rising Phoenix', 
    meaning: 'Rebirth and renewal are emerging from past challenges',
    timeframe: 'A new chapter begins soon' 
  },
  { 
    vision: 'Starlit Sky', 
    meaning: 'Your dreams and aspirations are aligned with divine timing',
    timeframe: 'Trust the cosmic rhythm' 
  },
  { 
    vision: 'Ancient Tree', 
    meaning: 'Deep wisdom and grounding will guide your decisions',
    timeframe: 'Patience brings clarity' 
  },
  { 
    vision: 'Dancing Flames', 
    meaning: 'Passion and creative energy are igniting new possibilities',
    timeframe: 'Act on inspiration now' 
  },
  { 
    vision: 'Silver Moon', 
    meaning: 'Intuition and inner knowing will reveal hidden truths',
    timeframe: 'Reflect during the next full moon' 
  },
  { 
    vision: 'Blooming Garden', 
    meaning: 'Your efforts are bearing fruit - abundance is manifesting',
    timeframe: 'Harvest time approaches' 
  },
];

export const CrystalBallScrying = () => {
  const [vision, setVision] = useState<typeof visions[0] | null>(null);
  const [isScrying, setIsScrying] = useState(false);

  const gazeIntoCrystal = async () => {
    setIsScrying(true);
    setVision(null);
    
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const randomVision = visions[Math.floor(Math.random() * visions.length)];
    setVision(randomVision);
    setIsScrying(false);
  };

  const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-sacred">
      {/* Ethereal Mist Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(58, 29, 104, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(58, 29, 104, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            animate={isScrying ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            } : {}}
            transition={{ duration: 2, repeat: isScrying ? Infinity : 0 }}
            className="inline-block mb-4"
          >
            <Eye className="w-12 h-12 text-mystic-gold mx-auto drop-shadow-divine" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-mystic-gold via-mystic-crystal to-mystic-gold bg-clip-text text-transparent">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gaze into the mystical crystal and receive visions of your path
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 backdrop-blur-md bg-card/60 border-mystic-purple/30 shadow-mystic">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 3D Crystal Ball */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center min-h-[400px]"
              >
                <div className="relative w-72 h-72">
                  {/* Outer Glow Aura */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    } : { scale: 1, opacity: 0.3 }}
                    transition={{ duration: 3, repeat: isScrying ? Infinity : 0 }}
                    className="absolute inset-0 rounded-full bg-gradient-oracle blur-3xl"
                  />
                  
                  {/* Crystal Ball Sphere */}
                  <div className="absolute inset-8 rounded-full overflow-hidden shadow-aura">
                    {/* Glass Effect Base */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-900/40 via-purple-800/60 to-black/80 backdrop-blur-sm" />
                    
                    {/* Inner Swirling Mist */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-crystal animate-swirl" />
                    </motion.div>

                    {/* Breathing Inner Light */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(147,112,219,0.2)_50%,transparent_80%)]"
                    />

                    {/* Light Refraction Highlight */}
                    <div className="absolute top-8 left-8 w-20 h-20 rounded-full bg-white/30 blur-xl" />
                    <div className="absolute top-12 left-12 w-12 h-12 rounded-full bg-white/50 blur-md" />

                    {/* Scrying Active Effect */}
                    {isScrying && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          background: [
                            'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, transparent 60%)',
                            'radial-gradient(circle, rgba(147, 112, 219, 0.5) 0%, transparent 60%)',
                            'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, transparent 60%)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Orbiting Runes (appears after vision) */}
                  {vision && !isScrying && (
                    <>
                      {runeSymbols.map((rune, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1],
                            scale: [0, 1, 1],
                          }}
                          transition={{ delay: index * 0.2, duration: 0.6 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ 
                            animation: `orbit ${12 + index}s linear infinite`,
                            animationDelay: `${index * 1.5}s`
                          }}
                        >
                          <span className="text-3xl text-mystic-gold drop-shadow-divine">
                            {rune}
                          </span>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>

              {/* Controls & Results */}
              <div className="space-y-6">
                <p className="text-muted-foreground text-center md:text-left leading-relaxed">
                  Clear your mind, focus your intention, and gaze into the crystal depths. 
                  The mists will part to reveal your vision.
                </p>

                <Button
                  onClick={gazeIntoCrystal}
                  disabled={isScrying}
                  className="w-full bg-gradient-to-r from-mystic-purple to-mystic-gold hover:shadow-divine text-lg py-6 transition-all duration-500"
                >
                  <Eye className={`w-5 h-5 mr-2 ${isScrying ? 'animate-pulse' : ''}`} />
                  {isScrying ? 'Peering Through the Mists...' : 'Gaze into the Crystal'}
                </Button>

                <AnimatePresence mode="wait">
                  {vision && (
                    <motion.div
                      key={vision.vision}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="p-6 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-xl border border-mystic-gold/30 shadow-divine backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-mystic-gold" />
                          <h3 className="font-heading text-xl text-mystic-gold">
                            Vision: {vision.vision}
                          </h3>
                        </div>
                        <p className="text-foreground/90 mb-4 leading-relaxed">{vision.meaning}</p>
                        <div className="pt-4 border-t border-mystic-gold/20">
                          <p className="text-sm text-mystic-gold/80">Timeframe: {vision.timeframe}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};
