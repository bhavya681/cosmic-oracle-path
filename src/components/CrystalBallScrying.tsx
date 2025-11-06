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
              {/* Professional 3D Crystal Ball */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]"
              >
                <div className="relative w-full max-w-[380px] aspect-square" style={{ perspective: '1200px' }}>
                  {/* Ambient Glow Base - Subtle and Professional */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.25, 1],
                      opacity: [0.15, 0.35, 0.15],
                    } : { scale: 1, opacity: 0.15 }}
                    transition={{ duration: 5, repeat: isScrying ? Infinity : 0, ease: "easeInOut" }}
                    className="absolute inset-[-10%] rounded-full bg-gradient-to-r from-indigo-600/30 via-violet-600/30 to-indigo-600/30 blur-[80px]"
                  />
                  
                  {/* Secondary Glow Layer */}
                  <motion.div
                    animate={isScrying ? {
                      scale: [1, 1.15, 1],
                      opacity: [0.2, 0.4, 0.2],
                    } : { scale: 1, opacity: 0.2 }}
                    transition={{ duration: 4, repeat: isScrying ? Infinity : 0, ease: "easeInOut", delay: 0.5 }}
                    className="absolute inset-[5%] rounded-full bg-gradient-to-br from-blue-500/25 via-purple-500/25 to-pink-500/20 blur-[50px]"
                  />
                  
                  {/* Wooden/Stone Stand Base */}
                  <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[45%] h-[12%] bg-gradient-to-b from-amber-900/80 to-amber-950/90 rounded-[50%] shadow-[0_15px_35px_rgba(0,0,0,0.7)] border-t-2 border-amber-800/40" />
                  <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[52%] h-[8%] bg-gradient-to-b from-stone-800 to-stone-900 rounded-[50%] shadow-[0_20px_40px_rgba(0,0,0,0.8)]" style={{ background: 'linear-gradient(to bottom, #1c1917, #0c0a09)' }} />
                  
                  {/* Crystal Ball Glass Sphere - Professional Grade */}
                  <div className="absolute inset-[10%] rounded-full overflow-visible shadow-[0_30px_90px_rgba(0,0,0,0.7),0_15px_50px_rgba(99,102,241,0.2)]" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Main Glass Sphere with Realistic Gradient */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/40 via-indigo-950/70 to-black/95 backdrop-blur-sm border-2 border-white/[0.07] shadow-[inset_0_-20px_60px_rgba(99,102,241,0.15),inset_0_20px_40px_rgba(255,255,255,0.05)]" />
                    
                    {/* Deep Inner Atmosphere - Smoky Depth */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.03, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-[8%] rounded-full opacity-50"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_30%,rgba(99,102,241,0.25)_0%,transparent_55%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_65%,rgba(139,92,246,0.2)_0%,transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
                    </motion.div>

                    {/* Mystical Smoke/Mist - Multiple Layers */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[12%] rounded-full opacity-35"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.3)_60deg,transparent_120deg,rgba(99,102,241,0.25)_200deg,transparent_280deg)]" />
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[15%] rounded-full opacity-30"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_90deg,transparent_0deg,rgba(168,85,247,0.25)_90deg,transparent_180deg,rgba(147,51,234,0.2)_270deg,transparent_360deg)]" />
                    </motion.div>

                    {/* Core Energy Center - Subtle Glow */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.65, 0.4]
                      }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(139,92,246,0.25)_35%,transparent_65%)]"
                    />

                    {/* Glass Caustics - Light Refraction Effect */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 120, 240, 360],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[10%] rounded-full"
                    >
                      <div className="absolute top-[20%] left-[15%] w-[25%] h-[25%] bg-white/20 rounded-full blur-xl" />
                      <div className="absolute bottom-[30%] right-[20%] w-[18%] h-[18%] bg-blue-300/15 rounded-full blur-lg" />
                    </motion.div>

                    {/* Primary Light Refraction - Top Highlight (Sun Spot) */}
                    <div className="absolute top-[18%] left-[25%] w-[30%] h-[30%] rounded-full bg-gradient-radial from-white/70 via-white/40 to-transparent blur-[8px] shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                    <div className="absolute top-[22%] left-[28%] w-[20%] h-[20%] rounded-full bg-white/80 blur-[6px]" />
                    <div className="absolute top-[25%] left-[30%] w-[12%] h-[12%] rounded-full bg-white blur-[3px]" />
                    
                    {/* Secondary Reflection - Bottom Right */}
                    <div className="absolute bottom-[28%] right-[22%] w-[15%] h-[15%] rounded-full bg-purple-200/20 blur-md" />
                    <div className="absolute bottom-[20%] right-[15%] w-[10%] h-[10%] rounded-full bg-indigo-200/15 blur-sm" />

                    {/* Scrying Active State - Professional Energy Pulse */}
                    {isScrying && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)',
                              'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 65%)',
                              'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 65%)',
                              'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)',
                            ],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Subtle Energy Particles */}
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/70 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                            style={{
                              left: '50%',
                              top: '50%',
                            }}
                            animate={{
                              x: [0, Math.cos((i * Math.PI) / 6) * 90],
                              y: [0, Math.sin((i * Math.PI) / 6) * 90],
                              opacity: [0.8, 0],
                              scale: [1, 0.3]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.15,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                    
                    {/* Glass Surface Shine - Realistic Edge Lighting */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.12] via-transparent via-40% to-transparent" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/[0.08] via-transparent via-60% to-transparent" />
                    
                    {/* Bottom Shadow Inside Glass */}
                    <div className="absolute inset-x-[15%] bottom-[5%] h-[30%] bg-gradient-to-t from-black/30 to-transparent rounded-full blur-sm" />
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
