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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-indigo-950/10 to-background">
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <Eye className="w-12 h-12 text-indigo-500 mx-auto" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gaze into the mystical crystal and receive visions of your path
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 backdrop-blur-sm bg-card/50 border-indigo-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  animate={isScrying ? {
                    boxShadow: [
                      '0 0 20px rgba(99, 102, 241, 0.3)',
                      '0 0 60px rgba(139, 92, 246, 0.6)',
                      '0 0 20px rgba(99, 102, 241, 0.3)',
                    ],
                  } : {}}
                  transition={{ duration: 2, repeat: isScrying ? Infinity : 0 }}
                  className="rounded-full overflow-hidden"
                >
                  <img 
                    src={crystalBallImg} 
                    alt="Crystal Ball" 
                    className="rounded-full w-full h-auto"
                  />
                </motion.div>
                {isScrying && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      background: [
                        'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                        'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>

              <div className="space-y-6">
                <p className="text-muted-foreground text-center md:text-left">
                  Clear your mind, focus your intention, and gaze into the crystal depths. 
                  The mists will part to reveal your vision.
                </p>

                <Button
                  onClick={gazeIntoCrystal}
                  disabled={isScrying}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-lg py-6"
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
                      <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          <h3 className="font-heading text-xl text-indigo-400">
                            Vision: {vision.vision}
                          </h3>
                        </div>
                        <p className="text-foreground/90 mb-4">{vision.meaning}</p>
                        <div className="pt-4 border-t border-indigo-500/20">
                          <p className="text-sm text-indigo-400/80">Timeframe: {vision.timeframe}</p>
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
