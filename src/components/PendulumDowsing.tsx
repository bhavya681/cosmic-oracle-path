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
            <div className="relative w-80 h-96 flex items-center justify-center">
              {/* Sacred Circle Board */}
              <div className="absolute bottom-8 w-64 h-64 rounded-full border-2 border-mystic-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                {/* Directional Markers */}
                <motion.div
                  animate={answer ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.3 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                >
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-green-400 text-sm font-semibold">Yes</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-red-400 text-sm font-semibold">No</div>
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 text-yellow-400 text-sm font-semibold">Maybe</div>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 text-purple-400 text-sm font-semibold">Ask Again</div>
                </motion.div>
                
                {/* Sacred Geometry Pattern */}
                <div className="absolute inset-8 rounded-full border border-mystic-gold/20" />
                <div className="absolute inset-16 rounded-full border border-mystic-gold/10" />
                
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-mystic-gold shadow-divine" />
              </div>

              {/* Pendulum Assembly */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-40 flex flex-col items-center">
                {/* Suspension Point */}
                <div className="w-4 h-4 rounded-full bg-mystic-gold/80 shadow-divine mb-2" />
                
                {/* Pendulum Chain/String */}
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, answer?.angle || 20, 0, -(answer?.angle || 20), 0],
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: isSwinging ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="w-0.5 h-32 bg-gradient-to-b from-gray-300 to-gray-600 origin-top"
                  style={{ transformOrigin: 'top center' }}
                >
                  {/* Pendulum Bob (Crystal) */}
                  <motion.div
                    animate={isSwinging ? {
                      boxShadow: [
                        '0 4px 20px rgba(212, 175, 55, 0.4)',
                        '0 4px 40px rgba(212, 175, 55, 0.7)',
                        '0 4px 20px rgba(212, 175, 55, 0.4)',
                      ],
                    } : {}}
                    transition={{ duration: 1.5, repeat: isSwinging ? Infinity : 0 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                  >
                    <div className="w-8 h-10 bg-gradient-to-br from-mystic-gold via-yellow-300 to-amber-600 clip-path-diamond shadow-divine">
                      {/* Crystal Facets */}
                      <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent" />
                      <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 blur-sm rounded-full" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Reflection Shadow */}
                <motion.div
                  animate={isSwinging ? {
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1],
                  } : { opacity: 0.2 }}
                  transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
                  className="absolute bottom-[-140px] w-16 h-8 bg-black/20 rounded-full blur-lg"
                />
              </div>

              {/* Answer Glow Effect */}
              {answer && !isSwinging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2"
                >
                  <div className={`px-6 py-3 rounded-full bg-gradient-to-r ${answer.color} shadow-divine backdrop-blur-sm border border-white/30`}>
                    <span className="font-heading text-2xl text-white drop-shadow-lg">{answer.text}</span>
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
