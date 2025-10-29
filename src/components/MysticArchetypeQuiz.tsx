"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Share2, RotateCcw, Star, Moon, Sun } from "lucide-react";
import { useArchetypeQuiz } from "@/hooks/useArchetypeQuiz";

export const MysticArchetypeQuiz: React.FC = () => {
  const {
    questions,
    currentQuestion,
    answers,
    isCompleted,
    result,
    isLoading,
    answerQuestion,
    resetQuiz,
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
        title: "My Mystic Archetype",
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Optional: show toast
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-6 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2 sm:mb-3">
          ✨ Which Mystic Archetype Are You?
        </h2>
        <p className="text-gray-300 text-sm xs:text-base sm:text-lg leading-relaxed">
          Discover your spiritual essence through this mystical journey
        </p>
      </motion.div>

      {/* Quiz Card */}
      <Card className="bg-gradient-to-br from-slate-900/60 to-purple-900/30 border-purple-500/20 backdrop-blur-sm w-full rounded-2xl">
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-4">
            <CardTitle className="text-base xs:text-lg sm:text-2xl font-bold text-white text-center sm:text-left">
              {isCompleted
                ? "Your Mystic Archetype"
                : `Question ${currentQuestion + 1} of ${questions.length}`}
            </CardTitle>
            {!isCompleted && (
              <div className="flex justify-center sm:justify-end">
                <Badge
                  variant="outline"
                  className="text-purple-300 border-purple-300 text-xs sm:text-sm px-2 py-1"
                >
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
            )}
          </div>
          {!isCompleted && <Progress value={progress} className="h-2 bg-slate-800" />}
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              // ------------------- QUESTIONS -------------------
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-4 sm:space-y-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-white text-center leading-snug px-2"
                  >
                    {currentQ.question}
                  </motion.h3>

                  <div className="flex flex-col gap-2 sm:gap-3">
                    {currentQ.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Button
                          variant="outline"
                          className="w-full min-h-[44px] sm:min-h-[56px] text-left justify-start bg-slate-800/50 border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/20 transition-all duration-300 group text-xs xs:text-sm sm:text-base md:text-lg px-3 py-2 whitespace-normal break-words"
                          onClick={() =>
                            answerQuestion(currentQ.id, option.archetype)
                          }
                        >
                          <span className="text-white group-hover:text-purple-200 transition-colors leading-snug text-left block">
                            {option.text}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              // ------------------- RESULTS -------------------
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4 sm:space-y-6"
              >
                {isLoading ? (
                  <div className="space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-10 h-10 sm:w-14 sm:h-14 mx-auto border-4 border-purple-500 border-t-transparent rounded-full"
                    />
                    <p className="text-purple-300 text-sm sm:text-base">
                      Channeling your mystic essence...
                    </p>
                  </div>
                ) : result ? (
                  <div className="space-y-5 sm:space-y-6">
                    {/* Archetype Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-xl" />
                      <Card className="relative bg-gradient-to-br from-slate-900/80 to-purple-900/40 border-purple-500/30 backdrop-blur-sm w-full">
                        <CardContent className="p-3 xs:p-4 sm:p-6">
                          <div className="text-center space-y-3 sm:space-y-4">
                            <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 mx-auto mb-3 sm:mb-4">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
                              <img
                                src={result.image}
                                alt={result.name}
                                className="relative w-full h-full object-cover rounded-full border-4 border-purple-500/30 shadow-2xl"
                              />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              {result.name}
                            </h3>
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                              {result.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Result Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {/* Traits */}
                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-3 xs:p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center text-sm sm:text-base">
                            <Star className="w-4 h-4 mr-2" />
                            Traits
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.traits.map((trait, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-purple-900/50 text-purple-200 text-xs sm:text-sm"
                              >
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Ruling Planets */}
                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-3 xs:p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center text-sm sm:text-base">
                            <Moon className="w-4 h-4 mr-2" />
                            Ruling Planets
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {result.rulingPlanets.map((planet, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-purple-400 text-purple-200 text-xs sm:text-sm"
                              >
                                {planet}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-3 xs:p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center text-sm sm:text-base">
                            <Sun className="w-4 h-4 mr-2" />
                            Tarot Card
                          </h4>
                          <Badge
                            variant="secondary"
                            className="bg-purple-900/50 text-purple-200 text-xs sm:text-sm"
                          >
                            {result.tarotCard}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-800/50 border-purple-500/20">
                        <CardContent className="p-3 xs:p-4">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center text-sm sm:text-base">
                            <Star className="w-4 h-4 mr-2" />
                            Aura Color
                          </h4>
                          <Badge
                            variant="outline"
                            className="border-purple-400 text-purple-200 text-xs sm:text-sm"
                          >
                            {result.color}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center w-full">
                      <Button
                        onClick={shareResult}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm xs:text-base sm:text-lg px-3 sm:px-6 py-2 w-full sm:w-auto"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        <span>Share Result</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetQuiz}
                        className="border-purple-500 text-purple-300 hover:bg-purple-900/20 text-sm xs:text-base sm:text-lg px-3 sm:px-6 py-2 w-full sm:w-auto"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        <span>Take Again</span>
                      </Button>
                    </div>
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
