import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Sparkles } from 'lucide-react';
import crystalBallImg from '@/assets/crystal-ball.jpg';

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

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-divine">
      {/* Mystical Background Particles */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, hsl(267 55% 26% / 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, hsl(43 74% 52% / 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, hsl(267 55% 26% / 0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-mystic-gold/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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
            animate={isScrying ? { 
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            } : {}}
            transition={{ duration: 2.5, repeat: isScrying ? Infinity : 0 }}
            className="inline-block mb-6"
          >
            <Eye className="w-16 h-16 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(43,74%,52%)]" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Peer through the sacred crystal veil to unveil the mysteries of your destiny
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-12 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* 3D Crystal Ball with Enhanced Effects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative perspective-1000">
                  {/* Outer Sacred Geometry Rings */}
                  {isScrying && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-mystic-gold/40"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-mystic-purple/40"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </>
                  )}
                  
                  {/* Crystal Ball Main */}
                  <motion.div
                    animate={isScrying ? {
                      boxShadow: [
                        '0 0 40px hsl(43 74% 52% / 0.4)',
                        '0 0 100px hsl(43 74% 52% / 0.9)',
                        '0 0 40px hsl(43 74% 52% / 0.4)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: isScrying ? Infinity : 0 }}
                    className="rounded-full overflow-hidden relative transform-style-3d"
                  >
                    <img 
                      src={crystalBallImg} 
                      alt="Crystal Ball" 
                      className="rounded-full w-full h-auto"
                    />
                    {/* Inner Mystic Mist */}
                    {isScrying && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          background: [
                            'radial-gradient(circle, hsl(43 74% 52% / 0.5) 0%, hsl(267 55% 26% / 0.3) 40%, transparent 70%)',
                            'radial-gradient(circle, hsl(267 55% 26% / 0.5) 0%, hsl(43 74% 52% / 0.3) 40%, transparent 70%)',
                            'radial-gradient(circle, hsl(43 74% 52% / 0.5) 0%, hsl(267 55% 26% / 0.3) 40%, transparent 70%)',
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Orbiting Runes/Symbols after vision */}
                  {vision && !isScrying && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2"
                          style={{
                            transformOrigin: 'center',
                          }}
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 20 + i * 2,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <motion.div
                            className="w-8 h-8 -ml-4 -mt-4"
                            style={{
                              transform: `translateX(${120 + i * 10}px)`,
                            }}
                            animate={{
                              opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          >
                            <Sparkles className="w-full h-full text-mystic-gold" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>

              {/* Content Side */}
              <div className="space-y-8">
                <p className="text-muted-foreground text-center md:text-left leading-relaxed">
                  Clear your consciousness, focus your sacred intention, and gaze into the crystalline depths. 
                  The ethereal mists shall part to unveil your divine vision.
                </p>

                <Button
                  onClick={gazeIntoCrystal}
                  disabled={isScrying}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:from-mystic-purple hover:to-mystic-gold text-lg py-8 font-heading tracking-wider shadow-gold transition-all duration-500"
                >
                  <Eye className={`w-6 h-6 mr-3 ${isScrying ? 'animate-pulse' : ''}`} />
                  {isScrying ? 'Consulting the Unseen...' : 'Gaze into the Crystal'}
                </Button>

                <AnimatePresence mode="wait">
                  {vision && (
                    <motion.div
                      key={vision.vision}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="p-8 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-2xl border border-mystic-gold/40 shadow-divine backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="w-6 h-6 text-mystic-gold animate-pulse-glow" />
                          <h3 className="font-heading text-2xl text-mystic-gold tracking-wide">
                            Vision: {vision.vision}
                          </h3>
                        </div>
                        <p className="text-foreground/95 text-lg mb-6 leading-relaxed">{vision.meaning}</p>
                        <div className="pt-4 border-t border-mystic-gold/30">
                          <p className="text-sm text-mystic-gold/90 font-light">
                            <span className="font-semibold">Divine Timeframe:</span> {vision.timeframe}
                          </p>
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
