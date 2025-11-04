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
  { text: 'Yes', color: 'from-emerald-500 to-green-600', angle: -25, glow: 'hsl(160 84% 39%)' },
  { text: 'No', color: 'from-red-500 to-rose-600', angle: 25, glow: 'hsl(0 72% 51%)' },
  { text: 'Maybe', color: 'from-amber-500 to-yellow-600', angle: 0, glow: 'hsl(45 93% 47%)' },
  { text: 'Ask Again', color: 'from-mystic-purple to-purple-600', angle: 50, glow: 'hsl(267 55% 26%)' },
];

export const PendulumDowsing = () => {
  const [isSwinging, setIsSwinging] = useState(false);
  const [answer, setAnswer] = useState<typeof answers[0] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const swingPendulum = async () => {
    if (!selectedQuestion) return;
    
    setIsSwinging(true);
    setAnswer(null);
    
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    setAnswer(randomAnswer);
    setIsSwinging(false);
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-divine">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sacred-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(43 74% 52%)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="hsl(267 55% 26%)" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(43 74% 52%)" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(43 74% 52%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sacred-grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-20">
          <motion.div
            animate={{ rotate: isSwinging ? 360 : 0 }}
            transition={{ duration: 3, repeat: isSwinging ? Infinity : 0, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Circle className="w-16 h-16 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(43,74%,52%)]" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Seek divine guidance through the ancient art of pendulum divination
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Question Selection Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-10 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
              <div className="space-y-8">
                <div>
                  <label className="text-lg font-heading mb-4 block flex items-center gap-3 text-mystic-gold">
                    <HelpCircle className="w-5 h-5" />
                    Choose Your Sacred Question
                  </label>
                  <div className="space-y-3">
                    {questions.map((q) => (
                      <motion.button
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          selectedQuestion === q
                            ? 'bg-mystic-gold/20 border-2 border-mystic-gold/60 shadow-gold'
                            : 'bg-muted/30 border border-mystic-purple/20 hover:bg-muted/50 hover:border-mystic-gold/30'
                        }`}
                      >
                        <span className="font-light">{q}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={swingPendulum}
                  disabled={isSwinging || !selectedQuestion}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:from-mystic-purple hover:to-mystic-gold text-lg py-8 font-heading tracking-wider shadow-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSwinging ? 'Consulting the Divine...' : 'Consult Sacred Pendulum'}
                </Button>

                <AnimatePresence mode="wait">
                  {answer && (
                    <motion.div
                      key={answer.text}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className={`p-8 bg-gradient-to-br ${answer.color} bg-opacity-20 rounded-2xl border-2 border-current/40 text-center shadow-divine backdrop-blur-sm`}
                      style={{
                        boxShadow: `0 0 40px ${answer.glow}40`,
                      }}
                    >
                      <motion.h3
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="font-heading text-4xl mb-4 tracking-wide"
                      >
                        {answer.text}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground font-light">
                        Your question: <span className="italic">"{selectedQuestion}"</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Pendulum Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Sacred Sigil Board Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 10, repeat: isSwinging ? Infinity : 0 }}
                  className="w-96 h-96 rounded-full border-4 border-mystic-gold/20"
                >
                  {/* Directional markers */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 text-mystic-gold font-heading text-sm">YES</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-mystic-gold font-heading text-sm">NO</div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-mystic-gold font-heading text-sm">MAYBE</div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-mystic-gold font-heading text-sm">ASK AGAIN</div>
                  
                  {/* Inner sacred circle */}
                  <div className="absolute inset-12 rounded-full border-2 border-mystic-purple/30" />
                  <div className="absolute inset-24 rounded-full border border-mystic-gold/20" />
                </motion.div>
              </div>

              {/* Main Image */}
              <img 
                src={pendulumImg} 
                alt="Pendulum Dowsing" 
                className="rounded-2xl shadow-mystic w-full h-auto relative z-10"
              />

              {/* Animated Pendulum */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  animate={isSwinging ? {
                    rotate: [0, answer?.angle || 20, 0, -(answer?.angle || 20), 0],
                  } : {}}
                  transition={{ 
                    duration: 1.8, 
                    repeat: isSwinging ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-40 bg-gradient-to-b from-mystic-gold/80 to-transparent origin-top relative"
                  style={{ transformOrigin: 'top center' }}
                >
                  {/* Pendulum bob */}
                  <motion.div
                    animate={isSwinging ? {
                      boxShadow: [
                        `0 0 20px ${answer?.glow || 'hsl(43 74% 52%)'}60`,
                        `0 0 40px ${answer?.glow || 'hsl(43 74% 52%)'}90`,
                        `0 0 20px ${answer?.glow || 'hsl(43 74% 52%)'}60`,
                      ],
                    } : {}}
                    transition={{ duration: 1, repeat: isSwinging ? Infinity : 0 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-mystic-gold to-mystic-purple shadow-gold"
                  />
                </motion.div>
              </div>

              {/* Sacred pulse aura during swing */}
              {isSwinging && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 40px hsl(43 74% 52% / 0.3)',
                      '0 0 80px hsl(267 55% 26% / 0.5)',
                      '0 0 40px hsl(43 74% 52% / 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
