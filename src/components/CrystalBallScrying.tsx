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
                <div className="relative w-80 h-80">
                  {/* Multi-layered Glow Aura */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.4, 1],
                      opacity: [0.2, 0.5, 0.2],
                    } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 4, repeat: isScrying ? Infinity : 0 }}
                    className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-blue-500/30 blur-[60px]"
                  />
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.7, 0.3],
                    } : { scale: 1, opacity: 0.3 }}
                    transition={{ duration: 3, repeat: isScrying ? Infinity : 0, delay: 0.5 }}
                    className="absolute -inset-4 rounded-full bg-mystic-gold/20 blur-[40px]"
                  />
                  
                  {/* Crystal Ball Sphere with Advanced Glass Effect */}
                  <div className="absolute inset-4 rounded-full overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(255,255,255,0.1)]">
                    {/* Outer Glass Layer with Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/60 via-indigo-950/80 to-black/95 backdrop-blur-xl border border-white/10" />
                    
                    {/* Inner Atmospheric Depth Layers */}
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full opacity-40"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(147,112,219,0.4)_0%,transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(99,102,241,0.3)_0%,transparent_60%)]" />
                    </motion.div>

                    {/* Swirling Mystic Smoke/Mist */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-6 rounded-full"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-blue-500/20 blur-2xl" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 rounded-full bg-gradient-crystal blur-xl"
                    />

                    {/* Central Glowing Core */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.5)_0%,rgba(147,112,219,0.3)_40%,transparent_70%)] blur-md"
                    />

                    {/* Glass Highlight - Top Left */}
                    <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-gradient-to-br from-white/50 via-white/20 to-transparent blur-2xl" />
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/60 blur-lg" />

                    {/* Glass Shadow - Bottom Right */}
                    <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-black/40 blur-3xl" />

                    {/* Scrying Active Pulse Effect */}
                    {isScrying && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 50%)',
                              'radial-gradient(circle, rgba(147, 112, 219, 0.6) 0%, transparent 50%)',
                              'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 50%)',
                              'radial-gradient(circle, rgba(212, 175, 55, 0.6) 0%, transparent 50%)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-mystic-gold/50"
                        />
                      </>
                    )}
                  </div>

                  {/* Orbiting Mystical Runes */}
                  {vision && !isScrying && (
                    <>
                      {runeSymbols.map((rune, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1],
                            scale: [0, 1.2, 1],
                          }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          style={{ 
                            animation: `orbit ${10 + index * 2}s linear infinite`,
                            animationDelay: `${index * 1.2}s`
                          }}
                        >
                          <motion.span 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="text-4xl text-mystic-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] font-bold filter blur-[0.5px]"
                          >
                            {rune}
                          </motion.span>
                        </motion.div>
                      ))}
                    </>
                  )}

                  {/* Marble/Crystal Base Stand */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8">
                    <div className="w-full h-full bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-[50%] shadow-[0_8px_20px_rgba(0,0,0,0.7)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[50%]" />
                  </div>
                  
                  {/* Floor Reflection */}
                  <motion.div
                    animate={isScrying ? { opacity: [0.1, 0.3, 0.1] } : { opacity: 0.15 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-radial from-indigo-900/20 via-purple-900/10 to-transparent rounded-full blur-2xl"
                  />
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
