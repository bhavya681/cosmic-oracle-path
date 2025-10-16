import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gem, Sparkles } from 'lucide-react';

const crystals = [
  { name: 'Amethyst', energy: 'Calm & Spiritual', color: 'from-purple-500 to-violet-600', power: 'Inner Peace' },
  { name: 'Citrine', energy: 'Success & Abundance', color: 'from-yellow-400 to-orange-500', power: 'Manifestation' },
  { name: 'Rose Quartz', energy: 'Love & Compassion', color: 'from-pink-400 to-rose-500', power: 'Heart Healing' },
  { name: 'Clear Quartz', energy: 'Clarity & Amplification', color: 'from-white to-gray-300', power: 'Universal Energy' },
  { name: 'Black Tourmaline', energy: 'Protection & Grounding', color: 'from-gray-800 to-black', power: 'Shield' },
  { name: 'Lapis Lazuli', energy: 'Wisdom & Truth', color: 'from-blue-600 to-indigo-700', power: 'Inner Vision' },
  { name: 'Green Aventurine', energy: 'Luck & Opportunity', color: 'from-green-400 to-emerald-600', power: 'Prosperity' },
  { name: 'Carnelian', energy: 'Courage & Confidence', color: 'from-orange-500 to-red-600', power: 'Vitality' },
];

const questions = [
  {
    question: "What do you seek most in life right now?",
    answers: [
      { text: "Peace and tranquility", crystal: 'Amethyst' },
      { text: "Success and prosperity", crystal: 'Citrine' },
      { text: "Love and connection", crystal: 'Rose Quartz' },
      { text: "Protection and stability", crystal: 'Black Tourmaline' }
    ]
  },
  {
    question: "How do you handle challenges?",
    answers: [
      { text: "With wisdom and patience", crystal: 'Lapis Lazuli' },
      { text: "With courage and action", crystal: 'Carnelian' },
      { text: "With clarity and focus", crystal: 'Clear Quartz' },
      { text: "With optimism and faith", crystal: 'Green Aventurine' }
    ]
  }
];

export const CrystalMatchGame = () => {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'spinning' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [matchedCrystal, setMatchedCrystal] = useState<typeof crystals[0] | null>(null);

  const startGame = () => {
    setGameState('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (crystalType: string) => {
    const newAnswers = [...answers, crystalType];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      spinWheel(newAnswers);
    }
  };

  const spinWheel = (userAnswers: string[]) => {
    setGameState('spinning');
    
    setTimeout(() => {
      const mostCommon = userAnswers.sort((a, b) =>
        userAnswers.filter(v => v === a).length - userAnswers.filter(v => v === b).length
      ).pop();
      
      const crystal = crystals.find(c => c.name === mostCommon) || crystals[Math.floor(Math.random() * crystals.length)];
      setMatchedCrystal(crystal);
      setGameState('result');
    }, 3000);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-background to-deep-indigo">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Gem className="w-10 h-10 text-accent animate-bounce" />
            Crystal Match Game
            <Gem className="w-10 h-10 text-primary animate-bounce" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover which healing crystal resonates with your soul's frequency
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-accent/30 p-8 shadow-cosmic">
          {gameState === 'start' && (
            <div className="text-center space-y-6">
              <div className="grid grid-cols-4 gap-4 mb-8">
                {crystals.slice(0, 4).map((crystal, i) => (
                  <div
                    key={crystal.name}
                    className="transform hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${crystal.color} animate-float shadow-glow`} />
                    <p className="text-xs text-muted-foreground mt-2">{crystal.name}</p>
                  </div>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground">Ready to find your crystal match?</h3>
              <p className="text-muted-foreground">Answer a few questions to spin the Crystal Wheel of Destiny</p>
              
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-accent to-primary text-white px-8 py-6 text-lg font-bold hover:shadow-glow transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Begin Crystal Quest
              </Button>
            </div>
          )}

          {gameState === 'quiz' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="text-sm text-muted-foreground mb-2">Question {currentQuestion + 1} of {questions.length}</div>
                <h3 className="text-2xl font-bold text-foreground">{questions[currentQuestion].question}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(answer.crystal)}
                    className="p-6 rounded-xl border-2 border-accent/30 bg-background/30 hover:bg-accent/20 hover:border-accent hover:shadow-glow transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Gem className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-foreground font-semibold text-lg">{answer.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {gameState === 'spinning' && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-foreground mb-8">Spinning the Crystal Wheel...</h3>
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-8 border-accent/30 animate-spin-slow" />
                {crystals.map((crystal, i) => (
                  <div
                    key={crystal.name}
                    className={`absolute w-12 h-12 rounded-full bg-gradient-to-br ${crystal.color} shadow-glow`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 45}deg) translateY(-100px)`,
                      animation: `spin 2s linear infinite`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gem className="w-16 h-16 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {gameState === 'result' && matchedCrystal && (
            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className={`absolute inset-0 blur-3xl bg-gradient-to-br ${matchedCrystal.color} animate-pulse opacity-60`} />
                <div className={`relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${matchedCrystal.color} shadow-cosmic animate-float`} />
              </div>

              <h3 className="text-3xl font-bold text-foreground">Your Crystal Match:</h3>
              <h2 className="text-5xl font-display font-bold text-primary">{matchedCrystal.name}</h2>
              
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${matchedCrystal.color} text-white font-semibold shadow-glow`}>
                  {matchedCrystal.energy}
                </div>
                <p className="text-muted-foreground text-lg">
                  <strong className="text-accent">Power:</strong> {matchedCrystal.power}
                </p>
                <p className="text-muted-foreground">
                  This crystal resonates with your soul's current vibration and will amplify your intentions.
                </p>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 font-bold hover:shadow-glow transition-all"
              >
                Find Another Crystal
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};