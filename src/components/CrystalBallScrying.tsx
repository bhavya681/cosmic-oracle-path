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
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-purple-950/10 to-background">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.15) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, hsl(var(--mystic-purple) / 0.15) 0%, transparent 60%)',
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
        className="container mx-auto max-w-6xl relative z-10 px-2 sm:px-4"
      >
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.div
            animate={isScrying ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            } : {}}
            transition={{ duration: 2, repeat: isScrying ? Infinity : 0 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />
          </motion.div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-mystic-gold via-mystic-purple to-mystic-gold bg-clip-text text-transparent">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Gaze into the mystical crystal and receive visions of your path
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl bg-card/40 border-mystic-gold/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Ultra-Realistic 3D Crystal Ball */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[520px]"
              >
                <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] aspect-square" style={{ perspective: '1500px' }}>
                  
                  {/* Ambient Mystical Glow - Professional Multi-Layer */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.45, 0.2],
                    } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 6, repeat: isScrying ? Infinity : 0, ease: "easeInOut" }}
                    className="absolute inset-[-15%] rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-violet-500/40 blur-[100px]"
                  />
                  
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.25, 0.5, 0.25],
                    } : { scale: 1, opacity: 0.25 }}
                    transition={{ duration: 5, repeat: isScrying ? Infinity : 0, ease: "easeInOut", delay: 0.7 }}
                    className="absolute inset-[-5%] rounded-full bg-gradient-to-br from-blue-400/30 via-indigo-500/30 to-purple-500/25 blur-[60px]"
                  />
                  
                  {/* Wooden Stand Base - Ultra-Realistic */}
                  <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[48%] h-[14%]">
                    {/* Top ring with metal finish */}
                    <div className="absolute top-0 w-full h-[35%] bg-gradient-to-b from-amber-600/90 to-amber-800/95 rounded-[50%] shadow-[0_8px_25px_rgba(0,0,0,0.8),inset_0_-2px_8px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,230,180,0.4)] border-t border-amber-500/30" />
                    {/* Base platform */}
                    <div className="absolute bottom-0 w-[115%] left-1/2 -translate-x-1/2 h-[50%] bg-gradient-to-b from-stone-800 via-stone-900 to-black rounded-[50%] shadow-[0_25px_50px_rgba(0,0,0,0.9)]" style={{ background: 'linear-gradient(to bottom, #292524, #1c1917, #000)' }} />
                  </div>
                  
                  {/* Ultra-Realistic Glass Crystal Sphere */}
                  <div className="absolute inset-[8%] rounded-full overflow-visible shadow-[0_35px_100px_rgba(0,0,0,0.8),0_20px_60px_rgba(99,102,241,0.3)]" style={{ transformStyle: 'preserve-3d' }}>
                    
                    {/* Main Glass Sphere Body - Professional Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/30 via-indigo-950/80 to-black/98 backdrop-blur-md border-[3px] border-white/[0.08] shadow-[inset_0_-25px_70px_rgba(99,102,241,0.2),inset_0_25px_50px_rgba(255,255,255,0.06)]" />
                    
                    {/* Deep Atmospheric Layers - Mystical Depth */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                        scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-[6%] rounded-full opacity-60"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(99,102,241,0.35)_0%,transparent_60%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(139,92,246,0.28)_0%,transparent_55%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.2)_0%,transparent_65%)]" />
                    </motion.div>

                    {/* Cosmic Swirling Mist - Multiple Rotating Layers */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[10%] rounded-full opacity-45"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.35)_70deg,transparent_140deg,rgba(99,102,241,0.3)_220deg,transparent_300deg)]" />
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[13%] rounded-full opacity-40"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_90deg,transparent_0deg,rgba(168,85,247,0.3)_100deg,transparent_200deg,rgba(147,51,234,0.25)_280deg,transparent_360deg)]" />
                    </motion.div>

                    {/* Inner Mystical Core - Pulsing Energy */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(139,92,246,0.3)_40%,transparent_70%)]"
                    />

                    {/* Glass Caustics & Light Refraction */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 140, 260, 360],
                        opacity: [0.35, 0.6, 0.35]
                      }}
                      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[8%] rounded-full"
                    >
                      <div className="absolute top-[18%] left-[12%] w-[28%] h-[28%] bg-white/25 rounded-full blur-xl" />
                      <div className="absolute bottom-[28%] right-[18%] w-[20%] h-[20%] bg-blue-300/20 rounded-full blur-lg" />
                    </motion.div>

                    {/* Primary Sun Spot Highlight - Hyper-Realistic */}
                    <div className="absolute top-[16%] left-[22%] w-[32%] h-[32%] rounded-full bg-gradient-radial from-white/80 via-white/50 to-transparent blur-[10px] shadow-[0_0_35px_rgba(255,255,255,0.6)]" />
                    <div className="absolute top-[20%] left-[26%] w-[22%] h-[22%] rounded-full bg-white/90 blur-[7px]" />
                    <div className="absolute top-[24%] left-[29%] w-[14%] h-[14%] rounded-full bg-white blur-[4px]" />
                    
                    {/* Secondary Reflections */}
                    <div className="absolute bottom-[26%] right-[20%] w-[17%] h-[17%] rounded-full bg-purple-200/25 blur-md" />
                    <div className="absolute bottom-[18%] right-[13%] w-[12%] h-[12%] rounded-full bg-indigo-200/20 blur-sm" />

                    {/* Active Scrying State - Enhanced Energy */}
                    {isScrying && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(59,130,246,0.45) 0%, transparent 70%)',
                              'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
                            ],
                          }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Energy Particles - Professional Effect */}
                        {[...Array(16)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-white/80 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos((i * Math.PI) / 8) * 110],
                              y: [0, Math.sin((i * Math.PI) / 8) * 110],
                              opacity: [0.9, 0],
                              scale: [1.2, 0.2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.12,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                    
                    {/* Glass Surface Shine - Realistic Edge Lighting */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.15] via-transparent via-45% to-transparent" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/[0.1] via-transparent via-65% to-transparent" />
                    
                    {/* Bottom Shadow Inside Glass */}
                    <div className="absolute inset-x-[12%] bottom-[3%] h-[35%] bg-gradient-to-t from-black/40 to-transparent rounded-full blur-md" />
                  </div>

                  {/* Mystical Orbiting Runes */}
                  {vision && !isScrying && (
                    <>
                      {runeSymbols.map((rune, index) => {
                        const radius = 180 + (index % 2) * 20;
                        const orbitDuration = 12 + index * 2.5;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0.85],
                              scale: [0, 1.3, 1],
                            }}
                            transition={{ delay: index * 0.18, duration: 0.9, ease: "backOut" }}
                            className="absolute"
                            style={{ 
                              left: '50%',
                              top: '50%',
                              transformOrigin: '0 0',
                            }}
                          >
                            <motion.div
                              animate={{ 
                                rotate: 360
                              }}
                              transition={{
                                duration: orbitDuration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: index * 1.3
                              }}
                              style={{
                                width: radius,
                                height: radius,
                                position: 'relative',
                              }}
                            >
                              <motion.span 
                                className="absolute left-full top-0 block text-xl sm:text-2xl md:text-3xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.9)]"
                                animate={{
                                  textShadow: [
                                    '0 0 10px hsl(var(--primary) / 0.9)',
                                    '0 0 20px hsl(var(--primary) / 1)',
                                    '0 0 10px hsl(var(--primary) / 0.9)',
                                  ],
                                  rotate: -360
                                }}
                                transition={{ 
                                  textShadow: { duration: 2.5, repeat: Infinity },
                                  rotate: { duration: orbitDuration, repeat: Infinity, ease: "linear" }
                                }}
                                style={{
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                {rune}
                              </motion.span>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </>
                  )}
                </div>
              </motion.div>

              {/* Controls & Results */}
              <div className="space-y-4 sm:space-y-6">
                <p className="text-muted-foreground text-center md:text-left leading-relaxed text-xs sm:text-sm md:text-base">
                  Clear your mind, focus your intention, and gaze into the crystal depths. 
                  The mists will part to reveal your vision.
                </p>

                <Button
                  onClick={gazeIntoCrystal}
                  disabled={isScrying}
                  className="w-full bg-gradient-to-r from-mystic-purple to-mystic-gold hover:shadow-divine text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 transition-all duration-500"
                >
                  <Eye className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${isScrying ? 'animate-pulse' : ''}`} />
                  {isScrying ? 'Peering Through the Mists...' : 'Gaze into the Crystal'}
                </Button>

                <AnimatePresence mode="wait">
                  {vision && (
                    <motion.div
                      key={vision.vision}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-xl border border-mystic-gold/30 shadow-divine backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-mystic-gold flex-shrink-0" />
                          <h3 className="font-heading text-base sm:text-lg md:text-xl text-mystic-gold">
                            Vision: {vision.vision}
                          </h3>
                        </div>
                        <p className="text-foreground/90 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">{vision.meaning}</p>
                        <div className="pt-3 sm:pt-4 border-t border-mystic-gold/20">
                          <p className="text-xs sm:text-sm text-mystic-gold/80">Timeframe: {vision.timeframe}</p>
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
