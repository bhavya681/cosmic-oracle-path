import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Sparkles } from 'lucide-react';
import witch from "../assets/witch.png";
// For animated stars (magical orbs) in the crystal
const magicStarPositions = [
  { top: '27%', left: '37%', size: 18, color: '#fffbe5', delay: 0 },
  { top: '47%', left: '27%', size: 11, color: '#f9fafb', delay: 0.2 },
  { top: '45%', left: '61%', size: 14, color: '#dbeafe', delay: 0.33 },
  { top: '66%', left: '55%', size: 12, color: '#a7f3d0', delay: 0.51 },
  { top: '61%', left: '41%', size: 16, color: '#fde68a', delay: 0.66 },
  { top: '34%', left: '58%', size: 10, color: '#c4b5fd', delay: 0.85 },
  { top: '55%', left: '47%', size: 13, color: '#fbcfe8', delay: 1.1 },
];
const auroraColors = [
  'rgba(239,68,68,0.20)',
  'rgba(168,85,247,0.14)',
  'rgba(253,186,116,0.13)',
  'rgba(96,165,250,0.13)',
  'rgba(52,211,153,0.12)'
];

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

const particlesVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 0.85, scale: [1, 1.25, 1], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }
};
const shatterVariants = {
  initial: { scale: 1, opacity: 1, filter: 'blur(0px)' },
  animating: {
    scale: [1, 1.12, 1.18, 1.5, 1],
    opacity: [1, 1, 1, 0.7, 1],
    filter: [
      'blur(0px)', 'blur(2px)', 'blur(10px)', 'blur(20px)', 'blur(0px)'
    ],
    boxShadow: [
      '0 0 40px 10px hsl(var(--primary) / 0.18)',
      '0 0 60px 50px hsl(var(--mystic-purple) / 0.33)',
      '0 0 120px 60px hsl(var(--mystic-gold) / 0.60)',
      '0 0 60px 20px hsl(var(--primary) / 0.2)',
      '0 0 45px 10px hsl(var(--mystic-gold) / 0.28)'
    ],
    transition: { duration: 1.65, ease: "easeInOut" }
  }
};
const illusionaryVariants = {
  initial: { scale: 0.96, opacity: 0.5, filter: 'blur(12px)' },
  animating: {
    scale: [1, 1.15, 1.25, 1],
    opacity: [0.33, 0.6, 0.8, 0.33],
    filter: [
      'blur(11px)','blur(5px)','blur(1.5px)','blur(10px)'
    ],
    transition: { duration: 1.35, repeat: 1, ease: "easeInOut"}
  }
};

const facets = Array.from({ length: 14 });

/**
 * Little crystalizing sound effect util.
 * Can call this anywhere for crystalize SFX.
 */
function playCrystalizingSound() {
  try {
    // Simple synthesized crystalline "chime" effect using Web Audio API
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.type = 'triangle';
    o.frequency.setValueAtTime(840, now);   // starts high
    o.frequency.linearRampToValueAtTime(480, now + 0.4); // sweep down
    o.frequency.linearRampToValueAtTime(1760, now + 0.7); // then up fast
    o.frequency.linearRampToValueAtTime(0, now + 1.05); // fade out

    g.gain.setValueAtTime(0.19, now);
    g.gain.linearRampToValueAtTime(0.06, now + 0.6);
    g.gain.linearRampToValueAtTime(0, now + 1.1);

    o.connect(g).connect(ctx.destination);
    o.start(now);
    o.stop(now + 1.12);

    o.onended = () => ctx.close?.();
  } catch (e) {
    // ignore if not supported or fast tab switching
  }
}

function CrystalizingEffect({ active }: { active: boolean }) {
  // Add comet tails and rotating magical sigil!
  // Play crystalizing sound at the onset of effect.
  const playedSoundRef = useRef(false);

  useEffect(() => {
    if (active && !playedSoundRef.current) {
      playCrystalizingSound();
      playedSoundRef.current = true;
    }
    if (!active) {
      playedSoundRef.current = false;
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Prismatic Sparkles radiating out - contained by parent circle/container */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i + 'prismatic'}
              initial={{
                opacity: 0,
                scale: 0.7,
                x: 0,
                y: 0,
                rotate: 0,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: [0, 0.85, 0],
                scale: [0.7, 2, 2.3],
                x: [0, Math.cos((i / 14) * Math.PI * 2) * 44 + '%'],
                y: [0, Math.sin((i / 14) * Math.PI * 2) * 44 + '%'],
                rotate: [0, 60, 180],
                filter: ["blur(7px)", "blur(1.7px)", "blur(8px)"]
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 1.65,
                ease: "easeOut",
                delay: i * 0.04
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[40]"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span
                className="block"
                style={{
                  width: `12%`,
                  height: `12%`,
                  minWidth: 10,
                  minHeight: 10,
                  maxWidth: 35,
                  maxHeight: 30,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.14) 60%,transparent 100%)',
                  boxShadow: '0 0 16px 2px #fff7',
                  filter: 'blur(2px)'
                }}
              />
            </motion.div>
          ))}

          {/* Magical sigil: glowing pentagram or circle with runes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: 0, filter: "blur(7px)" }}
            animate={{ 
              opacity: [0, 0.68, 0.82, 0.48, 0],
              scale: [0.4, 1, 1.15, 1, 0.7, 1.6],
              rotate: [0, 90, 240, 1080],
              filter: ["blur(7px)", "blur(2px)", "blur(2px)", "blur(4px)"]
            }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[52]"
            style={{ transform: 'translate(-50%, -50%)', width: '64%', height: '64%' }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              style={{
                display: "block"
              }}
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="url(#glow-line)"
                strokeWidth="2.2"
                opacity="0.73"
                filter="url(#soft-glow)"
              />
              {/* Pentagram */}
              <polygon
                points="50,15 76,82 17,38 83,38 24,82"
                fill="none"
                stroke="#fef08a"
                strokeWidth="1.55"
                opacity="0.62"
                style={{
                  filter: "drop-shadow(0 0 9px #f9e87c88) blur(0.2px)"
                }}
              />
              <defs>
                <radialGradient id="glow-line" cx="50%" cy="50%" r="43%" fx="50%" fy="50%">
                  <stop offset="10%" stopColor="#f8fafc" stopOpacity="0.97"/>
                  <stop offset="90%" stopColor="#a78bfa" stopOpacity="0.56"/>
                  <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.24"/>
                </radialGradient>
                <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5"/>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>

          {/* Add comet/meteor effect */}
          <motion.div
            initial={{ opacity: 0, x: '-10%', y: '10%', scale: 0.6, rotate: 0 }}
            animate={{
              opacity: [0, 0.9, 0],
              x: ['-10%', '65%', '120%'],
              y: ['10%', '-60%', '-25%'],
              scale: [0.6, 1.25, 1.15],
              rotate: [0, 0, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.25 }}
            className="pointer-events-none absolute z-[53]"
            style={{
              top: 0,
              left: 0,
              width: '17%',
              height: '17%',
              filter: 'drop-shadow(0 0 28px #fef08a88)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 25% 45%, #fffbe7 55%, #fde68a 80%, transparent 100%)',
                boxShadow: '0 0 34px 6px #fef08acd'
              }}
            >
              <div style={{
                position: 'absolute',
                left: '38%',
                top: '30%',
                width: '200%',
                height: '26%',
                background: 'linear-gradient(90deg, #fde68a 0%, rgba(255,255,255,0.24) 100%)',
                borderRadius: '15% 50% 75% 33%',
                filter: 'blur(3.9px)',
                opacity: .29
              }} />
            </div>
          </motion.div>

          {/* Facets creating crystal illusion */}
          {facets.map((_, idx) => (
            <motion.div
              key={'facet-'+idx}
              initial={{
                opacity: 0.68,
                scale: 1.3,
                rotate: idx * (360 / facets.length),
                y: 0
              }}
              animate={{
                opacity: [0.7, 1, 0.5, 0],
                scale: [1.3, 1.45, 1.7, 2],
                y: [0, -28 + '%', -45 + '%', -54 + '%'],
                transition: { duration: 1.36, delay: idx * 0.025 }
              }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[41]"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                style={{
                  width: '15%',
                  height: '23%',
                  background: 'linear-gradient(120deg,rgba(249,243,201,0.87),rgba(159,122,234,0.37),rgba(216,180,254,0.22))',
                  opacity: .37,
                  borderRadius: '40% 48% 70% 100% / 50% 55% 54% 85%',
                  filter: 'blur(2px) brightness(1.09) drop-shadow(0 0 10px #fff7)',
                  boxShadow: '0 0 20px #ede9fe55'
                }}
              />
            </motion.div>
          ))}
          {/* Central Illusive Burst */}
          <motion.div
            key="center-burst"
            initial={{ opacity: 0, scale: 0.45, filter: "blur(18px)" }}
            animate={{
              opacity: [0, 0.7, 0.13],
              scale: [0.45, 1.18, 1.7, 1],
              filter: [
                'blur(18px)', 'blur(7px)', 'blur(2px)', 'blur(9px)'
              ]
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{
              duration: 1.3,
              ease: "easeIn"
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-[49]"
            style={{ transform: 'translate(-50%, -50%)', width: '63%', height: '63%' }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle,rgba(255,255,255,0.3) 0%,rgba(168,85,247,0.18) 50%, transparent 100%)',
                borderRadius: '100%',
                boxShadow: '0 0 52px 14px #a855f733'
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Custom hook to determine if the screen is small (<= 425px x 642px)
function useMobileWitchHidden() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    function checkSize() {
      // If the viewport is <= 425px wide and <= 642px tall, hide the witch
      if (window.innerWidth <= 455 && window.innerHeight <= 642) {
        setHide(true);
      } else {
        setHide(false);
      }
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return hide;
}

export const CrystalBallScrying = () => {
  const [vision, setVision] = useState<typeof visions[0] | null>(null);
  const [isScrying, setIsScrying] = useState(false);
  const [isCrystalizing, setIsCrystalizing] = useState(false);
  const crystalTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hide witch woman image on small screens (<= 425x642)
  const hideWitchWOMobile = useMobileWitchHidden();

  // Add magical "aurora" color waves
  function AuroraBands() {
    return (
      <>
        {auroraColors.map((col, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, i % 2 === 0 ? 360 : -360],
              scale: [1, 1.04, 1],
              opacity: [0.18 + i * 0.07, 0.30 + i * 0.07, 0.14 + i * 0.07, 0.18 + i * 0.07]
            }}
            transition={{
              rotate: { duration: 60 - i * 7, repeat: Infinity, ease: "linear" },
              scale: { duration: 24 - i * 2.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 11 - i * 1.3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              borderRadius: "54% 60% 48% 61%/60% 39% 60% 48%",
              filter: `blur(${13 + i*8}px) brightness(1.06)`,
              background: `conic-gradient(from ${i*38}deg, transparent 0%, ${col} 80deg, transparent 200deg)`
            }}
          />
        ))}
      </>
    );
  }

  // Animated magical stars/sparkles in the ball (twinkling orbs)
  function MagicStars() {
    return (
      <>
        {magicStarPositions.map((star, idx) => (
          <motion.div
            key={'magicstar-'+idx}
            animate={{
              opacity: [0, 0.82, 0.09, 1, 0],
              scale: [0.6, 1, 1.2, 1, 0.51],
              x: [0, Math.random()*14-7, 0],
              y: [0, Math.random()*14-7, 0]
            }}
            transition={{
              duration: 5 + Math.random()*3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay
            }}
            className="absolute pointer-events-none"
            style={{
              width: star.size + 'px',
              height: star.size + 'px',
              top: star.top,
              left: star.left,
              background: `radial-gradient(circle at 60% 40%, ${star.color} 66%, transparent)`,
              borderRadius: '100%',
              filter: 'blur(1.5px) saturate(1.1) drop-shadow(0 0 12px #fff8)'
            }}
          />
        ))}
      </>
    );
  }

  // Gaze anim triggers crystalizing illusion burst + then scry
  const gazeIntoCrystal = async () => {
    setVision(null);
    setIsCrystalizing(true);
    setIsScrying(false);

    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsScrying(true);

    await new Promise(resolve => setTimeout(resolve, 2500));
    const randomVision = visions[Math.floor(Math.random() * visions.length)];
    setVision(randomVision);
    setIsCrystalizing(false);
    setIsScrying(false);
  };

  const [crystalTapAnim, setCrystalTapAnim] = useState(false);
  const onCrystalClick = () => {
    if (!isScrying && !isCrystalizing) {
      setCrystalTapAnim(true);
      if (crystalTimerRef.current) clearTimeout(crystalTimerRef.current!);
      crystalTimerRef.current = setTimeout(() => setCrystalTapAnim(false), 1500);
    }
  };

  const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-purple-950/10 to-background">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.17) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, hsl(var(--mystic-purple) / 0.22) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.14) 0%, transparent 60%)',
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
            animate={isCrystalizing || isScrying ? { 
              scale: [1, 1.16, 1.22, 1.06, 1],
              rotate: [0, 180, 360],
              filter: ['drop-shadow(0 0 0px #eab30833)', 'drop-shadow(0 0 28px #eab30899)', 'drop-shadow(0 0 10px #a855f7d4)','drop-shadow(0 0 0px #eab30800)']
            } : {}}
            transition={{ duration: 1.75, repeat: isCrystalizing || isScrying ? Infinity : 0 }}
            className="inline-block mb-3 sm:mb-4 pointer-events-none"
          >
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />
          </motion.div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-mystic-gold via-mystic-purple to-mystic-gold bg-clip-text text-transparent select-none">
            Crystal Ball Scrying
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 select-none">
            Gaze into the mystical crystal and receive visions of your path
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-xl bg-card/40 border-mystic-gold/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Magical 3D Crystal Ball */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] mt-8"
              >
                {/* Witch Woman Background - holding crystal ball */}
                {!hideWitchWOMobile && (
                  <img
                    src={witch}
                    alt="Mystical witch holding the crystal ball"
                    className="absolute inset-0 w-full h-full mt-30 object-contain md:object-cover z-[5] pointer-events-none select-none"
                  />
                )}

                {/* Crystal Ball Container */}
                <div
                  className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px] aspect-square cursor-pointer group z-[20]"
                  style={{ perspective: '1200px' }}
                  onClick={onCrystalClick}
                  tabIndex={0}
                  aria-label="Crystal ball illusion click"
                  role="button"
                >
                  {/* Crystal Ball Glass (magical effects live inside here, with overflow-hidden to contain) */}
                  <div className="absolute inset-[10%] rounded-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.63),0_15px_50px_rgba(99,102,241,0.12)] z-[20] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Magical aurora effect */}
                    <AuroraBands />
                    {/* Twinkling magical stars/orbs */}
                    <MagicStars />

                    {/* Crystalizing Magical Effect */}
                    <CrystalizingEffect active={isCrystalizing || crystalTapAnim} />

                    {/* Surreal Illusory Refractions pulse */}
                    <motion.div
                      variants={illusionaryVariants}
                      initial="initial"
                      animate={isCrystalizing || crystalTapAnim ? "animating" : "initial"}
                      className="pointer-events-none absolute inset-0 rounded-full z-[30] bg-gradient-to-br from-mystic-gold/50 via-mystic-purple/28 to-mystic-gold/18 blur-[47px]"
                    />

                    {/* Shatter/Crystallization depth burst */}
                    <motion.div
                      variants={shatterVariants}
                      initial="initial"
                      animate={isCrystalizing || crystalTapAnim ? "animating" : "initial"}
                      className="pointer-events-none absolute inset-0 rounded-full z-[35]"
                    />

                    {/* Ambient Glow Base - More dynamic while scrying, inside glass */}
                    <motion.div
                      animate={isScrying || isCrystalizing || crystalTapAnim ? {
                        scale: [1, 1.23, 1],
                        opacity: [0.19, 0.49, 0.19],
                      } : { scale: 1, opacity: 0.17 }}
                      transition={{ duration: 4.5, repeat: isScrying || isCrystalizing || crystalTapAnim ? Infinity : 0, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/33 via-violet-600/27 to-indigo-600/24 blur-[65px] z-[10]"
                    />

                    {/* Secondary Glow Layer inside glass */}
                    <motion.div
                      animate={isScrying || isCrystalizing || crystalTapAnim ? {
                        scale: [1, 1.16, 1],
                        opacity: [0.22, 0.36, 0.18],
                      } : { scale: 1, opacity: 0.19 }}
                      transition={{ duration: 3.9, repeat: isScrying || isCrystalizing || crystalTapAnim ? Infinity : 0, ease: "easeInOut", delay: 0.4 }}
                      className="absolute inset-[8%] rounded-full bg-gradient-to-br from-blue-500/25 via-purple-500/28 to-pink-500/14 blur-[39px] z-[11]"
                    />

                    {/* Glass body (remains under all magical effects) */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-900/32 via-indigo-950/88 to-black/94 border-2 border-white/[0.09] shadow-[inset_0_-20px_60px_rgba(99,102,241,0.10),inset_0_20px_40px_rgba(255,255,255,0.12)]" />

                    {/* Deep Inner Atmosphere - animated, contained inside */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 35, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8.8, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-[8%] rounded-full opacity-50"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_30%,rgba(99,102,241,0.18)_0%,transparent_55%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_65%,rgba(139,92,246,0.13)_0%,transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(59,130,246,0.12)_0%,transparent_60%)]" />
                    </motion.div>

                    {/* Mystical Smoke/Mist - Multiple Layers, contained in glass */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 41, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[12%] rounded-full opacity-26"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.22)_60deg,transparent_120deg,rgba(99,102,241,0.22)_200deg,transparent_280deg)]" />
                    </motion.div>

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-[15%] rounded-full opacity-19"
                    >
                      <div className="absolute inset-0 bg-[conic-gradient(from_90deg,transparent_0deg,rgba(168,85,247,0.17)_90deg,transparent_180deg,rgba(147,51,234,0.13)_270deg,transparent_360deg)]" />
                    </motion.div>

                    {/* Core Energy Center - Subtle Glow inside glass */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.11, 1],
                        opacity: [0.39, 0.62, 0.36]
                      }}
                      transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.33)_0%,rgba(139,92,246,0.23)_35%,transparent_65%)]"
                    />

                    {/* Glass Caustics - Light Refraction Effect */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 120, 240, 360],
                        opacity: [0.19, 0.38, 0.29]
                      }}
                      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-[10%] rounded-full"
                    >
                      <div className="absolute top-[23%] left-[13%] w-[26%] h-[26%] bg-white/17 rounded-full blur-xl" />
                      <div className="absolute bottom-[33%] right-[13%] w-[17%] h-[17%] bg-blue-300/11 rounded-full blur-lg" />
                    </motion.div>

                    {/* Sun spot/primary highlight */}
                    <div className="absolute top-[18%] left-[25%] w-[30%] h-[30%] rounded-full bg-gradient-radial from-white/80 via-white/24 to-transparent blur-[7px] shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
                    <div className="absolute top-[23%] left-[29%] w-[20%] h-[20%] rounded-full bg-white/71 blur-[6px]" />
                    <div className="absolute top-[28%] left-[33%] w-[11.7%] h-[11.7%] rounded-full bg-white blur-[2.3px]" />

                    {/* Secondary highlight */}
                    <div className="absolute bottom-[30%] right-[22%] w-[14%] h-[14%] rounded-full bg-purple-200/15 blur-md" />
                    <div className="absolute bottom-[22%] right-[12%] w-[8%] h-[8%] rounded-full bg-indigo-200/13 blur-sm" />

                    {/* Scrying Active State - Magical Energy Pulse */}
                    {(isScrying || isCrystalizing) && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full pointer-events-none"
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(99,102,241,0.38) 0%, transparent 65%)',
                              'radial-gradient(circle, rgba(139,92,246,0.42) 0%, transparent 72%)',
                              'radial-gradient(circle, rgba(168,85,247,0.40) 0%, transparent 65%)',
                              'radial-gradient(circle, rgba(59,130,246,0.34) 0%, transparent 58%)',
                              'radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 65%)',
                            ],
                          }}
                          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Subtle Energy Particles - restrict to stay in bounds */}
                        {[...Array(16)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="pointer-events-none absolute w-[7%] h-[7%] min-w-[6px] min-h-[6px] bg-white/70 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                            style={{
                              left: '50%',
                              top: '50%'
                            }}
                            animate={{
                              x: [0, Math.cos((i * Math.PI * 2) / 16) * 43 + '%'],
                              y: [0, Math.sin((i * Math.PI * 2) / 16) * 43 + '%'],
                              opacity: [0.97, 0.15, 0],
                              scale: [1, 0.75, 0.44]
                            }}
                            transition={{
                              duration: 2.35,
                              repeat: Infinity,
                              delay: i * 0.09,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                        {/* Shards on scry reveal */}
                        {isCrystalizing && <CrystalizingEffect active={true} />}
                      </>
                    )}

                    {/* Glass Surface Shine - Realistic Edge Lighting */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.10] via-transparent via-40% to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/[0.06] via-transparent via-60% to-transparent pointer-events-none" />

                    {/* Bottom Shadow Inside Glass */}
                    <div className="absolute inset-x-[15%] bottom-[5%] h-[30%] bg-gradient-to-t from-black/20 to-transparent rounded-full blur-sm pointer-events-none" />

                    {/* Orbiting Mystical Runes (contained in glass) */}
                    {vision && !isScrying && !isCrystalizing && (
                      <>
                        {runeSymbols.map((rune, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0, filter: "blur(6px)" }}
                            animate={{ 
                              opacity: [0, 1, 0.8],
                              scale: [0, 1.22, 1],
                              filter: ["blur(8px)", "blur(3.5px)", "blur(0px)"]
                            }}
                            transition={{ delay: index * 0.15, duration: 0.88, ease: "backOut" }}
                            className="absolute top-1/2 left-1/2 pointer-events-none"
                            style={{ 
                              animation: `orbit ${10 + index * 2}s linear infinite`,
                              animationDelay: `${index * 1.2}s`,
                              transformOrigin: 'center',
                              width: 'auto',
                              height: 'auto'
                            }}
                          >
                            <motion.span 
                              className="block text-2xl md:text-3xl text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.9)] select-none"
                              animate={{
                                textShadow: [
                                  '0 0 12px hsl(var(--primary) / 0.9)',
                                  '0 0 32px hsl(var(--primary) / 1)',
                                  '0 0 10px hsl(var(--primary) / 0.85)',
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

                  {/* Stand Base - now positioned BELOW the glass */}
                  <div
                    className="absolute bottom-[7%] left-1/2 -translate-x-1/2 w-[49%] h-[14%] rounded-[50%] shadow-[0_18px_48px_rgba(35,0,70,0.87)] z-[6] border-t-2 border-white/50"
                    style={{
                      background:
                        "radial-gradient(ellipse at 60% 80%, #e9e7fd 40%, #ebeaff 74%, #bfaeff 94%, #6a4e9e 100%)",
                      boxShadow:
                        "0 40px 78px 0 rgba(200,200,255,0.44), 0 8px 48px 0 rgba(230,230,255,0.32)",
                    }}
                  />

                  <div
                    className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 w-[58%] h-[8%] rounded-[50%] z-[5]"
                    style={{
                      background:
                        "linear-gradient(180deg, #e2e2fc 13%, #b1a7e7 60%, #8378c5 100%)",
                      boxShadow: "0 22px 48px 17px rgba(200,200,255,0.23)",
                    }}
                  />

                  <div
                    className="absolute bottom-[2.6%] left-1/2 -translate-x-1/2 w-[60%] h-[4.7%] rounded-[50%] z-[4] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at 49% 62%, rgba(255,255,255,0.13) 0%, rgba(220,215,250,0.10) 85%, rgba(200,200,240,0.09) 100%)",
                    }}
                  />

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
                  disabled={isScrying || isCrystalizing}
                  className="w-full bg-gradient-to-r from-mystic-purple to-mystic-gold hover:shadow-divine text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 transition-all duration-500"
                >
                  <Eye className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${isScrying || isCrystalizing ? 'animate-pulse' : ''}`} />
                  {(isScrying || isCrystalizing) ? 'Crystallizing the Vision...' : 'Gaze into the Crystal'}
                </Button>

                <AnimatePresence mode="wait">
                  {vision && (
                    <motion.div
                      key={vision.vision}
                      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-mystic-purple/21 to-mystic-gold/16 rounded-xl border border-mystic-gold/34 shadow-divine backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-mystic-gold flex-shrink-0" />
                          <h3 className="font-heading text-base sm:text-lg md:text-xl text-mystic-gold select-none">
                            Vision: {vision.vision}
                          </h3>
                        </div>
                        <p className="text-foreground/90 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">{vision.meaning}</p>
                        <div className="pt-3 sm:pt-4 border-t border-mystic-gold/23">
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
