import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Share2, RotateCcw, Star, Moon, Sun } from 'lucide-react';
import { useArchetypeQuiz } from '@/hooks/useArchetypeQuiz';

export const MysticArchetypeQuiz: React.FC = () => {
  const {
    questions,
    currentQuestion,
    answers,
    isCompleted,
    result,
    isLoading,
    answerQuestion,
    resetQuiz
  } = useArchetypeQuiz();

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const shareResult = () => {
    if (!result) return;
    
    const shareText = `✨ I discovered my mystic archetype: ${result.name}! 
    
${result.description}
    
Discover yours at The Hidden Astrologer! 🔮`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Mystic Archetype',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // You could show a toast notification here
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
          ✨ Which Mystic Archetype Are You?
        </h2>
        <p className="text-gray-300 text-lg">
          Discover your spiritual essence through this mystical journey
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/30 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold text-white">
              {isCompleted ? 'Your Mystic Archetype' : 'Question ' + (currentQuestion + 1) + ' of ' + questions.length}
            </CardTitle>
            {!isCompleted && (
              <Badge variant="outline" className="text-purple-300 border-purple-300">
                {Math.round(progress)}% Complete
              </Badge>
            )}
          </div>
          {!isCompleted && (
            <Progress value={progress} className="h-2 bg-slate-800" />
          )}
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-semibold text-white mb-6 text-center"
                  >
                    {currentQ.question}
                  </motion.h3>

                  <div className="grid gap-3">
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-16 text-left justify-start bg-slate-800/50 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-300 group"
                          onClick={() => answerQuestion(currentQ.id, option.archetype)}
                        >
                          <span className="text-white group-hover:text-purple-200 transition-colors">
                            {option.text}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6"
              >
                {isLoading ? (
                  <div className="space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full"
                    />
                    <p className="text-purple-300 text-lg">Channeling your mystic essence...</p>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-xl" />
                      <Card className="relative bg-gradient-to-br from-slate-900/80 to-purple-900/40 border-purple-500/30 backdrop-blur-sm">
                        <CardContent className="p-8">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className="text-center space-y-4"
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 }}
                              className="relative w-32 h-32 mx-auto mb-4"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                              <img
                                src={result.image}
                                alt={result.name}
                                className="relative w-full h-full object-cover rounded-full border-4 border-purple-500/30 shadow-2xl"
                              />
                            </motion.div>
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {result.name}
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                              {result.description}
                            </p>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="grid md:grid-cols-2 gap-4"
                    >
                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Traits
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.traits.map((trait, index) => (
                              <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-200">
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                            <Moon className="w-4 h-4 mr-2" />
                            Ruling Planets
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.rulingPlanets.map((planet, index) => (
                              <Badge key={index} variant="outline" className="border-purple-400 text-purple-200">
                                {planet}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="grid md:grid-cols-2 gap-4"
                    >
                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                            <Sun className="w-4 h-4 mr-2" />
                            Tarot Card
                          </h4>
                          <Badge variant="secondary" className="bg-purple-900/50 text-purple-200">
                            {result.tarotCard}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Aura Color
                          </h4>
                          <Badge variant="outline" className="border-purple-400 text-purple-200">
                            {result.color}
                          </Badge>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                      <Button
                        onClick={shareResult}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Result
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetQuiz}
                        className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Take Again
                      </Button>
                    </motion.div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};
