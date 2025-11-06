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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-blue-950/10 to-background">
      {/* Animated Ethereal Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, hsl(var(--accent) / 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 60%, hsl(var(--secondary) / 0.2) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 40%, hsl(var(--accent) / 0.2) 0%, transparent 60%)',
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
            animate={isSwinging ? { rotate: [0, 360] } : {}}
            transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
            className="inline-block mb-4"
          >
            <Circle className="w-12 h-12 text-accent mx-auto drop-shadow-[0_0_20px_hsl(var(--accent)/0.6)]" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seek guidance from the ancient art of pendulum divination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-xl bg-card/40 border-accent/20 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent" />
                    Choose Your Question
                  </label>
                  <div className="space-y-2">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          selectedQuestion === q
                            ? 'bg-accent/20 border-accent/50 border shadow-[0_0_20px_hsl(var(--accent)/0.3)]'
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
                  className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-[0_0_30px_hsl(var(--accent)/0.5)] text-lg py-6 transition-all duration-500"
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
                      className={`p-6 bg-gradient-to-br ${answer.color} bg-opacity-20 rounded-xl border border-current/30 text-center shadow-[0_0_30px_currentColor] backdrop-blur-sm`}
                    >
                      <h3 className="font-heading text-3xl mb-2">{answer.text}</h3>
                      <p className="text-sm text-muted-foreground">Your question: {selectedQuestion}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Realistic Pendulum */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[340px] h-[450px] md:h-[500px] flex items-center justify-center">
              {/* Sacred Circle Board with Enhanced Glow */}
              <div className="absolute bottom-12 w-72 h-72 rounded-full border-2 border-primary/40 shadow-[0_0_60px_hsl(var(--primary)/0.4)]">
                {/* Pulsing Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-xl"
                />
                
                {/* Directional Markers with Enhanced Typography */}
                <motion.div
                  animate={answer ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 text-green-400 text-base font-bold drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">Yes</div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-red-400 text-base font-bold drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]">No</div>
                  <div className="absolute top-1/2 left-6 -translate-y-1/2 text-yellow-400 text-base font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">Maybe</div>
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 text-purple-400 text-base font-bold drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]">Ask Again</div>
                </motion.div>
                
                {/* Concentric Sacred Geometry Rings */}
                <div className="absolute inset-10 rounded-full border border-primary/30" />
                <div className="absolute inset-20 rounded-full border border-primary/20" />
                <div className="absolute inset-[120px] rounded-full border border-primary/10" />
                
                {/* Center Sacred Point */}
                <motion.div 
                  animate={{
                    boxShadow: [
                      '0 0 10px hsl(var(--primary) / 0.8)',
                      '0 0 20px hsl(var(--primary) / 1)',
                      '0 0 10px hsl(var(--primary) / 0.8)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent"
                />
              </div>

              {/* Pendulum Assembly with Enhanced Realism */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ perspective: '1000px' }}>
                {/* Metal Suspension Point */}
                <motion.div 
                  animate={isSwinging ? {
                    boxShadow: [
                      '0 0 15px hsl(var(--primary) / 0.6)',
                      '0 0 25px hsl(var(--primary) / 0.9)',
                      '0 0 15px hsl(var(--primary) / 0.6)',
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: isSwinging ? Infinity : 0 }}
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 shadow-[0_2px_10px_rgba(0,0,0,0.4)] mb-1 border border-yellow-300/50"
                />
                
                {/* Pendulum Chain with Physics */}
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, answer?.angle || 25, 0, -(answer?.angle || 25), 0],
                  } : answer ? {
                    rotate: answer.angle
                  } : {}}
                  transition={{ 
                    duration: 2.5, 
                    repeat: isSwinging ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="relative origin-top"
                  style={{ 
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Metal Chain */}
                  <div className="w-0.5 h-40 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700 relative shadow-[2px_0_4px_rgba(0,0,0,0.3)]">
                    {/* Chain segments for realism */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-1 h-1 bg-gray-400 rounded-full left-1/2 -translate-x-1/2"
                        style={{ top: `${i * 12}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Crystal Pendulum Bob with Facets */}
                  <motion.div
                    animate={isSwinging ? {
                      boxShadow: [
                        '0 8px 25px rgba(251, 191, 36, 0.5)',
                        '0 8px 40px rgba(251, 191, 36, 0.8)',
                        '0 8px 25px rgba(251, 191, 36, 0.5)',
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: isSwinging ? Infinity : 0 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Motion Blur Trail when swinging */}
                    {isSwinging && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent blur-sm"
                        animate={{
                          scaleX: [1, 2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Diamond Crystal Shape */}
                    <div className="relative w-10 h-12">
                      {/* Main Crystal Body */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 clip-path-diamond shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
                        {/* Top Facet Highlight */}
                        <div className="absolute inset-x-2 top-1 h-4 bg-gradient-to-b from-white/70 to-transparent clip-path-polygon" 
                             style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                        
                        {/* Side Facets */}
                        <div className="absolute left-0 top-4 bottom-4 w-2 bg-gradient-to-br from-amber-500/40 to-transparent" />
                        <div className="absolute right-0 top-4 bottom-4 w-2 bg-gradient-to-bl from-amber-500/40 to-transparent" />
                        
                        {/* Refracted Light Spot */}
                        <div className="absolute top-2 left-3 w-4 h-4 bg-white/80 rounded-full blur-[2px]" />
                        <div className="absolute top-3 left-4 w-2 h-2 bg-white rounded-full" />
                      </div>
                      
                      {/* Crystal Edge Shine */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent clip-path-diamond" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Dynamic Shadow Projection */}
                <motion.div
                  animate={isSwinging ? {
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.15, 1],
                    x: [0, answer ? (answer.angle > 0 ? 20 : -20) : 15, 0, answer ? (answer.angle > 0 ? -20 : 20) : -15, 0]
                  } : { opacity: 0.3 }}
                  transition={{ duration: 2.5, repeat: isSwinging ? Infinity : 0 }}
                  className="absolute bottom-[-160px] w-20 h-10 bg-gradient-radial from-black/40 to-transparent rounded-full blur-md"
                />
              </div>

              {/* Answer Reveal with Enhanced Animation */}
              {answer && !isSwinging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: 0
                  }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                >
                  <motion.div 
                    animate={{
                      boxShadow: [
                        '0 0 20px currentColor',
                        '0 0 40px currentColor',
                        '0 0 20px currentColor',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-8 py-4 rounded-full bg-gradient-to-r ${answer.color} backdrop-blur-md border-2 border-white/40 shadow-2xl`}
                  >
                    <span className="font-heading text-2xl md:text-3xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] font-bold">
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
