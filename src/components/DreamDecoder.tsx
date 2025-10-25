import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Moon, 
  Sparkles, 
  Eye, 
  Heart, 
  Brain, 
  Lightbulb,
  RotateCcw,
  BookOpen,
  Star
} from 'lucide-react';
import { useDreamDecoder } from '@/hooks/useDreamDecoder';

export const DreamDecoder: React.FC = () => {
  const {
    dreamText,
    setDreamText,
    interpretation,
    isLoading,
    isTyping,
    decodeDream,
    clearDream,
    startTypingEffect
  } = useDreamDecoder();

  const handleDecode = async () => {
    startTypingEffect();
    await decodeDream();
  };

  const getSymbolIcon = (category: string) => {
    switch (category) {
      case 'Transformation': return <Sparkles className="w-4 h-4" />;
      case 'Fear': return <Moon className="w-4 h-4" />;
      case 'Emotion': return <Heart className="w-4 h-4" />;
      case 'Nature': return <Star className="w-4 h-4" />;
      case 'Self': return <Eye className="w-4 h-4" />;
      case 'Communication': return <Brain className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          🌙 Dream Decoder
        </h2>
        <p className="text-gray-300 text-lg">
          Unlock the hidden messages in your dreams
        </p>
      </motion.div>

      <Card className="bg-gradient-to-br from-slate-900/50 to-blue-900/30 border-blue-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Moon className="w-6 h-6 mr-3 text-blue-400" />
            Describe Your Dream
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your dream in detail... What did you see, feel, or experience? Include any symbols, people, or emotions that stood out to you."
              value={dreamText}
              onChange={(e) => setDreamText(e.target.value)}
              className="min-h-[120px] bg-slate-800/50 border-blue-500/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
              disabled={isLoading}
            />
            
            <div className="flex gap-3">
              <Button
                onClick={handleDecode}
                disabled={!dreamText.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                    />
                    Decoding...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Decode Dream
                  </>
                )}
              </Button>
              
              {dreamText && (
                <Button
                  variant="outline"
                  onClick={clearDream}
                  className="border-blue-500 text-blue-300 hover:bg-blue-900/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {interpretation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl" />
                  <Card className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 border-blue-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-white flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-blue-400" />
                        Dream Interpretation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Overall Meaning */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Overall Meaning
                        </h4>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-gray-300 leading-relaxed"
                        >
                          {interpretation.overallMeaning}
                        </motion.p>
                      </div>

                      {/* Emotional Tone */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300 flex items-center">
                          <Heart className="w-4 h-4 mr-2" />
                          Emotional Tone
                        </h4>
                        <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                          {interpretation.emotionalTone}
                        </Badge>
                      </div>

                      {/* Symbols */}
                      {interpretation.symbols.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-blue-300 flex items-center">
                            <Star className="w-4 h-4 mr-2" />
                            Dream Symbols
                          </h4>
                          <div className="grid gap-3">
                            {interpretation.symbols.map((symbol, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="text-blue-400 mt-1">
                                    {getSymbolIcon(symbol.category)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <h5 className="font-semibold text-white">{symbol.symbol}</h5>
                                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                                        {symbol.category}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-300 text-sm">{symbol.meaning}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Spiritual Message */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Spiritual Message
                        </h4>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-gray-300 leading-relaxed italic"
                        >
                          "{interpretation.spiritualMessage}"
                        </motion.p>
                      </div>

                      {/* Advice */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300 flex items-center">
                          <Brain className="w-4 h-4 mr-2" />
                          Guidance
                        </h4>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="text-gray-300 leading-relaxed"
                        >
                          {interpretation.advice}
                        </motion.p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center space-x-2 text-blue-300"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-blue-400 rounded-full"
              />
              <span className="ml-2">Channeling dream wisdom...</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
