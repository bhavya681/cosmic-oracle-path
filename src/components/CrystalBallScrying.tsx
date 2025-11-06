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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-purple-950/10 to-background">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, hsl(var(--secondary) / 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
            <Eye className="w-12 h-12 text-primary mx-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gaze into the mystical crystal and receive visions of your path
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 backdrop-blur-xl bg-card/40 border-primary/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* 3D Crystal Ball */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]"
              >
                <div className="relative w-full max-w-[320px] aspect-square">
                  {/* Outer Ethereal Glow - Multiple Layers */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.4, 1],
                      opacity: [0.2, 0.5, 0.2],
                    } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 4, repeat: isScrying ? Infinity : 0, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 blur-[60px]"
                  />
                  
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    } : { scale: 1, opacity: 0.3 }}
                    transition={{ duration: 3, repeat: isScrying ? Infinity : 0, ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 blur-[40px]"
                  />
                  
                  {/* Crystal Ball Sphere Container */}
                  <div className="absolute inset-8 rounded-full overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                    {/* Base Glass Sphere with Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-950/60 via-purple-900/70 to-black/90 backdrop-blur-sm border border-white/5" />
                    
                    {/* Atmospheric Depth Layers */}
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 rounded-full opacity-60"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(147,51,234,0.4)_0%,transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
                    </motion.div>

                    {/* Swirling Cosmic Mist */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full opacity-40"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.4)_90deg,transparent_180deg,rgba(59,130,246,0.4)_270deg,transparent_360deg)]" />
                    </motion.div>

                    {/* Pulsing Inner Core */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[25%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.6)_0%,rgba(168,85,247,0.3)_40%,transparent_70%)]"
                    />

                    {/* Light Refraction - Top Highlight */}
                    <div className="absolute top-[15%] left-[20%] w-[35%] h-[35%] rounded-full bg-white/40 blur-2xl" />
                    <div className="absolute top-[20%] left-[25%] w-[25%] h-[25%] rounded-full bg-white/60 blur-xl" />
                    
                    {/* Secondary Reflection */}
                    <div className="absolute bottom-[25%] right-[20%] w-[20%] h-[20%] rounded-full bg-purple-300/20 blur-lg" />

                    {/* Scrying Active State - Energy Pulse */}
                    {isScrying && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(236,72,153,0.6) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)',
                            ],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        />
                        
                        {/* Energy Particles */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos(i * Math.PI / 4) * 80],
                              y: [0, Math.sin(i * Math.PI / 4) * 80],
                              opacity: [1, 0],
                              scale: [1, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                    
                    {/* Glass Edge Shine */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  </div>

                  {/* Orbiting Mystical Runes */}
                  {vision && !isScrying && (
                    <>
                      {runeSymbols.map((rune, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 0.8],
                            scale: [0, 1.2, 1],
                          }}
                          transition={{ delay: index * 0.15, duration: 0.8, ease: "backOut" }}
                          className="absolute top-1/2 left-1/2"
                          style={{ 
                            animation: `orbit ${10 + index * 2}s linear infinite`,
                            animationDelay: `${index * 1.2}s`,
                            transformOrigin: 'center',
                          }}
                        >
                          <motion.span 
                            className="block text-2xl md:text-3xl text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
                            animate={{
                              textShadow: [
                                '0 0 8px hsl(var(--primary) / 0.8)',
                                '0 0 16px hsl(var(--primary) / 1)',
                                '0 0 8px hsl(var(--primary) / 0.8)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {rune}
                          </motion.span>
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
