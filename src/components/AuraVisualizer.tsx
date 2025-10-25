import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  Sparkles, 
  Download, 
  RotateCcw,
  Zap,
  Heart,
  Eye,
  Sun,
  Moon,
  Star
} from 'lucide-react';
import { useAuraVisualizer } from '@/hooks/useAuraVisualizer';

export const AuraVisualizer: React.FC = () => {
  const {
    selectedEmotion,
    setSelectedEmotion,
    intensity,
    setIntensity,
    visualization,
    isGenerating,
    emotions,
    auraColors,
    generateAura,
    captureAura,
    clearAura,
    canvasRef
  } = useAuraVisualizer();

  const auraRef = useRef<HTMLDivElement>(null);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'love': return <Heart className="w-4 h-4" />;
      case 'calm': return <Moon className="w-4 h-4" />;
      case 'passion': return <Zap className="w-4 h-4" />;
      case 'wisdom': return <Eye className="w-4 h-4" />;
      case 'healing': return <Sparkles className="w-4 h-4" />;
      case 'clarity': return <Sun className="w-4 h-4" />;
      case 'confusion': return <Moon className="w-4 h-4" />;
      case 'ambition': return <Zap className="w-4 h-4" />;
      case 'joy': return <Sun className="w-4 h-4" />;
      case 'mystery': return <Star className="w-4 h-4" />;
      default: return <Palette className="w-4 h-4" />;
    }
  };

  const handleCapture = () => {
    const dataURL = captureAura();
    if (dataURL) {
      const link = document.createElement('a');
      link.download = `aura-${selectedEmotion}-${Date.now()}.png`;
      link.href = dataURL;
      link.click();
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
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
          🌈 Aura Visualizer
        </h2>
        <p className="text-gray-300 text-lg">
          Discover your energy field and spiritual essence
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-pink-900/30 border-pink-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Palette className="w-6 h-6 mr-3 text-pink-400" />
              Aura Controls
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Emotion Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold text-pink-300">Choose Your Emotion</h4>
              <div className="grid grid-cols-2 gap-2">
                {emotions.map((emotion) => (
                  <Button
                    key={emotion.value}
                    variant={selectedEmotion === emotion.value ? "default" : "outline"}
                    onClick={() => setSelectedEmotion(emotion.value)}
                    className={`h-12 text-sm ${
                      selectedEmotion === emotion.value
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'border-pink-500/30 text-pink-300 hover:bg-pink-900/20'
                    }`}
                  >
                    <span className="flex items-center">
                      {getEmotionIcon(emotion.value)}
                      <span className="ml-2">{emotion.label}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="space-y-4">
              <h4 className="font-semibold text-pink-300">Aura Intensity</h4>
              <div className="space-y-2">
                <Slider
                  value={[intensity]}
                  onValueChange={(value) => setIntensity(value[0])}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtle</span>
                  <span>{intensity}%</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateAura}
              disabled={!selectedEmotion || isGenerating}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  />
                  Generating Aura...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Aura
                </>
              )}
            </Button>

            {/* Clear Button */}
            {visualization && (
              <Button
                variant="outline"
                onClick={clearAura}
                className="w-full border-pink-500 text-pink-300 hover:bg-pink-900/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Aura
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Aura Visualization */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-indigo-900/30 border-indigo-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Eye className="w-6 h-6 mr-3 text-indigo-400" />
              Your Aura
            </CardTitle>
          </CardHeader>

          <CardContent>
            <AnimatePresence>
              {visualization ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Aura Display */}
                  <div className="relative">
                    <motion.div
                      ref={auraRef}
                      className="w-full h-64 rounded-lg relative overflow-hidden"
                      style={{
                        background: visualization.color.gradient,
                        filter: `brightness(${visualization.intensity / 100})`
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${visualization.color.color}40`,
                          `0 0 40px ${visualization.color.color}60`,
                          `0 0 20px ${visualization.color.color}40`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Particle Effects */}
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: visualization.color.color,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.5, 1.2, 0.5],
                            x: [0, Math.random() * 20 - 10, 0],
                            y: [0, Math.random() * 20 - 10, 0]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Aura Information */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {visualization.color.name}
                      </h3>
                      <p className="text-gray-300">
                        {visualization.color.meaning}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <h4 className="font-semibold text-indigo-300 text-sm mb-1">Emotion</h4>
                        <Badge variant="secondary" className="bg-pink-900/50 text-pink-200">
                          {visualization.color.emotion}
                        </Badge>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <h4 className="font-semibold text-indigo-300 text-sm mb-1">Chakra</h4>
                        <Badge variant="outline" className="border-indigo-400 text-indigo-200">
                          {visualization.color.chakra}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <h4 className="font-semibold text-indigo-300 text-sm mb-2">Aura Pattern</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-purple-400 text-purple-200">
                          {visualization.pattern}
                        </Badge>
                        <Badge variant="outline" className="border-purple-400 text-purple-200">
                          {visualization.glow}
                        </Badge>
                      </div>
                    </div>

                    {/* Capture Button */}
                    <Button
                      onClick={handleCapture}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Capture Aura
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-64 text-gray-400"
                >
                  <div className="text-center">
                    <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select an emotion to visualize your aura</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden Canvas for Capture */}
            <canvas
              ref={canvasRef}
              className="hidden"
              width={400}
              height={400}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
