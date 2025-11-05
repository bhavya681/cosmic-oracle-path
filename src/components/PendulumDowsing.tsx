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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-sacred">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(0, 206, 209, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 60%, rgba(58, 29, 104, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 40%, rgba(0, 206, 209, 0.2) 0%, transparent 50%)',
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
            <Circle className="w-12 h-12 text-cyan-400 mx-auto drop-shadow-divine" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-mystic-gold to-cyan-400 bg-clip-text text-transparent">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seek guidance from the ancient art of pendulum divination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-md bg-card/60 border-cyan-500/30 shadow-mystic">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    Choose Your Question
                  </label>
                  <div className="space-y-2">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          selectedQuestion === q
                            ? 'bg-cyan-500/20 border-cyan-400/50 border shadow-aura'
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
                  className="w-full bg-gradient-to-r from-cyan-500 to-mystic-gold hover:shadow-divine text-lg py-6 transition-all duration-500"
                >
                  {isSwinging ? 'Pendulum Swinging...' : 'Consult Pendulum'}
                </Button>

                <AnimatePresence mode="wait">
                  {answer && (
                    <motion.div
                      key={answer.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`p-6 bg-gradient-to-br ${answer.color} bg-opacity-20 rounded-xl border border-current/30 text-center shadow-divine backdrop-blur-sm`}
                    >
                      <h3 className="font-heading text-3xl mb-2">{answer.text}</h3>
                      <p className="text-sm text-muted-foreground">Your question: {selectedQuestion}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Realistic Pendulum */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-96 h-[500px] flex items-center justify-center">
              {/* Sacred Sigil Board */}
              <div className="absolute bottom-12 w-72 h-72">
                {/* Outer Glow Ring */}
                <motion.div
                  animate={answer ? { 
                    boxShadow: [
                      '0 0 30px rgba(212,175,55,0.3)',
                      '0 0 60px rgba(212,175,55,0.6)',
                      '0 0 30px rgba(212,175,55,0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-mystic-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                />
                
                {/* Inner Sacred Geometry */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-950/20 via-transparent to-mystic-purple/20" />
                <div className="absolute inset-8 rounded-full border border-mystic-gold/30" />
                <div className="absolute inset-16 rounded-full border border-mystic-gold/20" />
                <div className="absolute inset-24 rounded-full border border-mystic-gold/10" />

                {/* Directional Answer Labels */}
                <motion.div
                  animate={answer ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.4 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500/20 rounded-full border border-green-400/50">
                    <span className="text-green-300 text-sm font-bold tracking-wide">YES</span>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-500/20 rounded-full border border-red-400/50">
                    <span className="text-red-300 text-sm font-bold tracking-wide">NO</span>
                  </div>
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 px-4 py-1 bg-yellow-500/20 rounded-full border border-yellow-400/50">
                    <span className="text-yellow-300 text-sm font-bold tracking-wide">MAYBE</span>
                  </div>
                  <div className="absolute top-1/2 right-2 -translate-y-1/2 px-4 py-1 bg-purple-500/20 rounded-full border border-purple-400/50">
                    <span className="text-purple-300 text-sm font-bold tracking-wide">UNCLEAR</span>
                  </div>
                </motion.div>
                
                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mystic-gold shadow-divine animate-glow-pulse" />
              </div>

              {/* Pendulum Assembly */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>
                {/* Suspension Fixture */}
                <div className="relative w-8 h-6 mb-1">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-t-lg shadow-lg" />
                  <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-mystic-gold shadow-divine" />
                </div>
                
                {/* Chain/Thread with Realistic Physics */}
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, answer?.angle || 22, 0, -(answer?.angle || 22), 0],
                  } : {}}
                  transition={{ 
                    duration: 2.2,
                    repeat: isSwinging ? Infinity : 0,
                    ease: [0.45, 0.05, 0.55, 0.95] // Realistic pendulum easing
                  }}
                  className="relative"
                  style={{ 
                    transformOrigin: 'top center',
                    height: '180px'
                  }}
                >
                  {/* Metal Chain Links */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gray-400 via-gray-500 to-gray-700">
                    {/* Chain highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full" />
                  </div>

                  {/* Crystal Pendulum Bob */}
                  <motion.div
                    animate={isSwinging ? {
                      boxShadow: [
                        '0 6px 25px rgba(212, 175, 55, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
                        '0 8px 35px rgba(212, 175, 55, 0.7), 0 0 25px rgba(212, 175, 55, 0.5)',
                        '0 6px 25px rgba(212, 175, 55, 0.4), 0 0 15px rgba(212, 175, 55, 0.3)',
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: isSwinging ? Infinity : 0 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  >
                    {/* Diamond Crystal Shape */}
                    <div className="relative w-10 h-14">
                      {/* Main Crystal Body */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-mystic-gold to-amber-700 shadow-[0_8px_30px_rgba(212,175,55,0.6)]" 
                           style={{ 
                             clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)'
                           }} 
                      />
                      
                      {/* Crystal Facets & Reflections */}
                      <div className="absolute inset-1 bg-gradient-to-br from-white/70 via-yellow-100/40 to-transparent"
                           style={{ 
                             clipPath: 'polygon(50% 5%, 95% 32%, 95% 68%, 50% 95%, 5% 68%, 5% 32%)'
                           }}
                      />
                      <div className="absolute top-2 left-2 w-4 h-4 bg-white/80 blur-sm rounded-full" />
                      <div className="absolute top-1 right-2 w-2 h-3 bg-white/60 blur-[2px]" />
                      
                      {/* Inner Glow */}
                      <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-2 bg-mystic-gold/40 blur-md"
                        style={{ 
                          clipPath: 'polygon(50% 10%, 90% 35%, 90% 65%, 50% 90%, 10% 65%, 10% 35%)'
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Motion Blur Trail Effect */}
                  {isSwinging && (
                    <motion.div
                      animate={{
                        opacity: [0, 0.3, 0],
                        scaleX: [1, 1.5, 1]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-16 bg-mystic-gold/20 blur-xl"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)'
                      }}
                    />
                  )}
                </motion.div>

                {/* Shadow Projection */}
                <motion.div
                  animate={isSwinging ? {
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.15, 1],
                    x: answer ? [0, (answer.angle || 20), 0, -(answer.angle || 20), 0] : 0
                  } : { opacity: 0.2 }}
                  transition={{ duration: 2.2, repeat: isSwinging ? Infinity : 0 }}
                  className="absolute bottom-[-200px] w-20 h-10 bg-black/30 rounded-full blur-xl"
                />
              </div>

              {/* Answer Revelation */}
              {answer && !isSwinging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                >
                  <div className={`px-8 py-4 rounded-2xl bg-gradient-to-r ${answer.color} shadow-[0_0_40px_rgba(212,175,55,0.6)] backdrop-blur-md border-2 border-white/40`}>
                    <span className="font-heading text-3xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">{answer.text}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
