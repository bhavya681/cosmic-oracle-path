import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Circle, HelpCircle } from 'lucide-react';
import pendulumImg from '@/assets/pendulum-dowsing.jpg';

const questions = [
  "Is this the right path for me?",
  "Should I trust this opportunity?",
  "Will this decision bring positive change?",
  "Is now the right time to act?",
  "Should I follow my intuition?",
];

const answers = [
  { text: 'Yes', color: 'from-green-500 to-emerald-500', angle: -30 },
  { text: 'No', color: 'from-red-500 to-rose-500', angle: 30 },
  { text: 'Maybe', color: 'from-yellow-500 to-amber-500', angle: 0 },
  { text: 'Ask Again', color: 'from-purple-500 to-violet-500', angle: 60 },
];

export const PendulumDowsing = () => {
  const [isSwinging, setIsSwinging] = useState(false);
  const [answer, setAnswer] = useState<typeof answers[0] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const swingPendulum = async () => {
    if (!selectedQuestion) return;
    
    setIsSwinging(true);
    setAnswer(null);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    setAnswer(randomAnswer);
    setIsSwinging(false);
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-purple-950/10 to-background">
      {/* Animated Ethereal Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, hsl(var(--mystic-purple) / 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
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
            animate={isSwinging ? { rotate: [0, 360] } : {}}
            transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
            className="inline-block mb-3 sm:mb-4"
          >
            <Circle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(var(--primary)/0.6)]" />
          </motion.div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-mystic-gold via-mystic-purple to-mystic-gold bg-clip-text text-transparent">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Seek guidance from the ancient art of pendulum divination
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <Card className="p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-card/40 border-mystic-gold/20 shadow-2xl">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 block flex items-center gap-2">
                    <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-mystic-gold" />
                    Choose Your Question
                  </label>
                  <div className="space-y-2">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base ${
                          selectedQuestion === q
                            ? 'bg-mystic-gold/20 border-mystic-gold/50 border shadow-[0_0_20px_hsl(var(--primary)/0.3)]'
                            : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={swingPendulum}
                  disabled={isSwinging || !selectedQuestion}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:shadow-divine text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 transition-all duration-500"
                >
                  {isSwinging ? 'Pendulum Swinging...' : 'Consult Pendulum'}
                </Button>

                <AnimatePresence mode="wait">
                  {answer && (
                    <motion.div
                      key={answer.text}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className={`p-4 sm:p-5 md:p-6 bg-gradient-to-br ${answer.color} bg-opacity-20 rounded-xl border border-current/30 text-center shadow-[0_0_30px_currentColor] backdrop-blur-sm`}
                    >
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl mb-2">{answer.text}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Your question: {selectedQuestion}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Ultra-Realistic Pendulum Assembly */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center order-1 md:order-2"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-[420px] sm:h-[470px] md:h-[520px] lg:h-[560px] flex items-center justify-center" style={{ perspective: '1800px' }}>
              
              {/* Professional Sacred Circle Board */}
              <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 w-[270px] h-[270px] sm:w-[310px] sm:h-[310px] md:w-[340px] md:h-[340px] rounded-full border-[2.5px] sm:border-[3px] border-indigo-400/60 shadow-[0_0_50px_rgba(99,102,241,0.4),inset_0_0_30px_rgba(99,102,241,0.15)]">
                
                {/* Ambient Mystical Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/25 to-indigo-500/25 blur-2xl"
                />
                
                {/* Directional Answer Markers - Professional Design */}
                <motion.div
                  animate={answer ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.6 }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute top-5 sm:top-7 md:top-9 left-1/2 -translate-x-1/2 text-emerald-400 text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wider drop-shadow-[0_0_15px_rgba(52,211,153,1)]">YES</div>
                  <div className="absolute bottom-5 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 text-rose-400 text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wider drop-shadow-[0_0_15px_rgba(251,113,133,1)]">NO</div>
                  <div className="absolute top-1/2 left-5 sm:left-7 md:left-9 -translate-y-1/2 text-amber-400 text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wider drop-shadow-[0_0_15px_rgba(251,191,36,1)]">MAYBE</div>
                  <div className="absolute top-1/2 right-5 sm:right-7 md:right-9 -translate-y-1/2 text-purple-400 text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-wider drop-shadow-[0_0_15px_rgba(192,132,252,1)]">ASK AGAIN</div>
                </motion.div>
                
                {/* Sacred Geometry Circles */}
                <div className="absolute inset-9 sm:inset-11 md:inset-13 rounded-full border-[2px] sm:border-[2.5px] border-indigo-400/35 shadow-[inset_0_0_20px_rgba(99,102,241,0.2)]" />
                <div className="absolute inset-18 sm:inset-22 md:inset-26 rounded-full border-[1.5px] sm:border-[2px] border-indigo-400/25" />
                <div className="absolute inset-[105px] sm:inset-[125px] md:inset-[145px] rounded-full border border-indigo-400/15" />
                
                {/* Center Sacred Point */}
                <motion.div 
                  animate={{
                    boxShadow: [
                      '0 0 18px rgba(99,102,241,0.9), 0 0 35px rgba(99,102,241,0.5)',
                      '0 0 30px rgba(99,102,241,1), 0 0 60px rgba(99,102,241,0.7)',
                      '0 0 18px rgba(99,102,241,0.9), 0 0 35px rgba(99,102,241,0.5)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-400 to-violet-600 border-2 border-indigo-100/60"
                />
              </div>

              {/* Hyper-Realistic Pendulum Assembly */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ perspective: '1500px' }}>
                
                {/* Metal Suspension Mount - Premium Quality */}
                <motion.div 
                  animate={isSwinging ? {
                    boxShadow: [
                      '0 0 25px rgba(212,175,55,0.7), inset 0 3px 6px rgba(0,0,0,0.4)',
                      '0 0 40px rgba(212,175,55,1), inset 0 3px 6px rgba(0,0,0,0.4)',
                      '0 0 25px rgba(212,175,55,0.7), inset 0 3px 6px rgba(0,0,0,0.4)',
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 via-yellow-600 to-amber-900 shadow-[0_5px_20px_rgba(0,0,0,0.6),inset_0_3px_6px_rgba(255,255,255,0.4)] mb-1 border-[2.5px] border-yellow-700/70 relative"
                >
                  {/* Metallic Shine Highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-amber-900/40 via-transparent to-transparent" />
                </motion.div>
                
                {/* Professional Pendulum Chain & Crystal Assembly */}
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, answer?.angle || 32, -4, -(answer?.angle || 32), 4, 0],
                  } : answer ? {
                    rotate: answer.angle
                  } : {}}
                  transition={{ 
                    duration: 3.5, 
                    repeat: isSwinging ? Infinity : 0,
                    ease: [0.42, 0, 0.58, 1]
                  }}
                  className="relative origin-top"
                  style={{ 
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Realistic Metal Chain */}
                  <div className="relative w-[1.5px] h-48 bg-gradient-to-b from-gray-200 via-gray-500 to-gray-800 shadow-[4px_0_10px_rgba(0,0,0,0.5),-1px_0_5px_rgba(255,255,255,0.15)]">
                    {/* Individual Chain Links */}
                    {[...Array(13)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-[6px] h-[6px] bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700 rounded-full left-1/2 -translate-x-1/2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                        style={{ top: `${i * 8}%` }}
                      />
                    ))}
                    {/* Chain Metallic Shine */}
                    <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                  </div>
                  
                  {/* Ultra-Realistic Crystal Pendulum */}
                  <motion.div
                    animate={isSwinging ? {
                      boxShadow: [
                        '0 12px 35px rgba(251,191,36,0.5), 0 6px 20px rgba(251,191,36,0.7)',
                        '0 18px 55px rgba(251,191,36,0.7), 0 10px 30px rgba(251,191,36,0.9)',
                        '0 12px 35px rgba(251,191,36,0.5), 0 6px 20px rgba(251,191,36,0.7)',
                      ],
                    } : {}}
                    transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Professional Motion Blur Effect */}
                    {isSwinging && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent blur-xl scale-150"
                        animate={{
                          scaleX: [1, 3, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                     
                    {/* Professional Diamond Crystal Pendulum */}
                    <div className="relative w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-18 drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
                      {/* Main Crystal Body - Hyper-Realistic */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-500 to-amber-800 shadow-[0_10px_35px_rgba(0,0,0,0.7),inset_0_-12px_25px_rgba(0,0,0,0.4),inset_0_6px_20px_rgba(255,255,255,0.5)]"
                        style={{ clipPath: 'polygon(50% 0%, 100% 35%, 100% 70%, 50% 100%, 0% 70%, 0% 35%)' }}
                      >
                        {/* Top Facet - Primary Light Refraction */}
                        <div 
                          className="absolute inset-x-3 top-3 h-10 bg-gradient-to-b from-white/90 via-white/60 to-transparent" 
                          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} 
                        />
                        
                        {/* Left Facet - Shadow Side */}
                        <div 
                          className="absolute left-0 top-7 bottom-7 w-7 bg-gradient-to-br from-amber-700/70 to-transparent"
                          style={{ clipPath: 'polygon(0% 0%, 100% 30%, 100% 70%, 0% 100%)' }}
                        />
                        
                        {/* Right Facet - Light Side */}
                        <div 
                          className="absolute right-0 top-7 bottom-7 w-7 bg-gradient-to-bl from-amber-600/70 to-transparent"
                          style={{ clipPath: 'polygon(100% 0%, 0% 30%, 0% 70%, 100% 100%)' }}
                        />
                        
                        {/* Realistic Light Refraction Points */}
                        <div className="absolute top-4 left-5 w-6 h-6 bg-white/95 rounded-full blur-[4px]" />
                        <div className="absolute top-5 left-6 w-4 h-4 bg-white rounded-full blur-[2px]" />
                        <div className="absolute top-7 right-5 w-2.5 h-2.5 bg-yellow-100/80 rounded-full blur-[1px]" />
                        
                        {/* Bottom Interior Shadow */}
                        <div className="absolute inset-x-3 bottom-3 h-5 bg-gradient-to-t from-amber-950/70 to-transparent" />
                      </div>
                      
                      {/* Glass Edge Lighting - Professional Grade */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent" 
                        style={{ clipPath: 'polygon(50% 0%, 100% 35%, 100% 70%, 50% 100%, 0% 70%, 0% 35%)' }}
                      />
                      <div 
                        className="absolute inset-0 bg-gradient-to-tl from-white/25 via-transparent to-transparent" 
                        style={{ clipPath: 'polygon(50% 0%, 100% 35%, 100% 70%, 50% 100%, 0% 70%, 0% 35%)' }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Ultra-Realistic Dynamic Shadow */}
                <motion.div
                  animate={isSwinging ? {
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.3, 1],
                    x: [0, answer ? (answer.angle > 0 ? 30 : -30) : 25, 0, answer ? (answer.angle > 0 ? -30 : 30) : -25, 0]
                  } : { opacity: 0.4 }}
                  transition={{ duration: 3.5, repeat: isSwinging ? Infinity : 0 }}
                  className="absolute bottom-[-190px] w-28 h-14 bg-gradient-radial from-black/60 via-black/35 to-transparent rounded-full blur-2xl"
                />
              </div>

              {/* Answer Reveal - Professional Design */}
              {answer && !isSwinging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.6 }}
                  className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
                >
                  <motion.div 
                    animate={{
                      boxShadow: [
                        '0 0 20px currentColor, 0 0 40px currentColor',
                        '0 0 30px currentColor, 0 0 60px currentColor',
                        '0 0 20px currentColor, 0 0 40px currentColor',
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className={`px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full bg-gradient-to-r ${answer.color} backdrop-blur-md border-[2px] sm:border-[3px] border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(255,255,255,0.3)]`}
                  >
                    <span className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] font-bold tracking-wide">
                      {answer.text}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
