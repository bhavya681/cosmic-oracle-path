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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-teal-950/10 to-background">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            animate={{ rotate: isSwinging ? 360 : 0 }}
            transition={{ duration: 2, repeat: isSwinging ? Infinity : 0 }}
            className="inline-block mb-4"
          >
            <Circle className="w-12 h-12 text-teal-500 mx-auto" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seek guidance from the ancient art of pendulum divination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-sm bg-card/50 border-teal-500/20">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Choose Your Question
                  </label>
                  <div className="space-y-2">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedQuestion === q
                            ? 'bg-teal-500/20 border-teal-500/50 border'
                            : 'bg-muted/30 hover:bg-muted/50'
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
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-lg py-6"
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
                      className={`p-6 bg-gradient-to-br ${answer.color} bg-opacity-10 rounded-xl border border-current/20 text-center`}
                    >
                      <h3 className="font-heading text-3xl mb-2">{answer.text}</h3>
                      <p className="text-sm text-muted-foreground">Your question: {selectedQuestion}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img 
                src={pendulumImg} 
                alt="Pendulum Dowsing" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <motion.div
                animate={isSwinging ? {
                  rotate: [0, answer?.angle || 15, 0, -(answer?.angle || 15), 0],
                } : {}}
                transition={{ duration: 1.5, repeat: isSwinging ? Infinity : 0 }}
                className="absolute top-8 left-1/2 w-1 h-32 bg-gradient-to-b from-teal-500 to-transparent origin-top"
                style={{ transformOrigin: 'top center' }}
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 shadow-lg shadow-teal-500/50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
