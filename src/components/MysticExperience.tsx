import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Moon, 
  Palette, 
  Star,
  Eye,
  Heart,
  Zap,
  BookOpen,
  Share2
} from 'lucide-react';
import { MysticArchetypeQuiz } from './MysticArchetypeQuiz';
import { DreamDecoder } from './DreamDecoder';
import { AuraVisualizer } from './AuraVisualizer';

type ExperienceTab = 'quiz' | 'dreams' | 'aura';

export const MysticExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExperienceTab>('quiz');
  const [showHeader, setShowHeader] = useState(true);

  const tabs = [
    {
      id: 'quiz' as ExperienceTab,
      label: 'Mystic Quiz',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Discover your archetype',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-900/20 to-pink-900/20',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'dreams' as ExperienceTab,
      label: 'Dream Decoder',
      icon: <Moon className="w-5 h-5" />,
      description: 'Decode your dreams',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'from-blue-900/20 to-purple-900/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'aura' as ExperienceTab,
      label: 'Aura Visualizer',
      icon: <Palette className="w-5 h-5" />,
      description: 'Visualize your energy',
      color: 'from-pink-500 to-indigo-500',
      bgColor: 'from-pink-900/20 to-indigo-900/20',
      borderColor: 'border-pink-500/30'
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'quiz':
        return <MysticArchetypeQuiz />;
      case 'dreams':
        return <DreamDecoder />;
      case 'aura':
        return <AuraVisualizer />;
      default:
        return <MysticArchetypeQuiz />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900" />
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <AnimatePresence>
          {showHeader && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="max-w-4xl mx-auto px-6">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-6"
                >
                  ✨ Discover Your Inner Mystic
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                  Embark on a journey of self-discovery through mystical experiences. 
                  Uncover your spiritual essence, decode your dreams, and visualize your energy.
                </motion.p>
                
                {/* Progress Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center"
                >
                  <Badge variant="outline" className="border-purple-400 text-purple-300 px-4 py-2">
                    <Star className="w-4 h-4 mr-2" />
                    Your Mystic Journey
                  </Badge>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-6xl mx-auto px-6 mb-8"
        >
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tabs.map((tab) => (
                  <motion.div
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={activeTab === tab.id ? "default" : "outline"}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full h-20 flex flex-col items-center justify-center space-y-2 ${
                        activeTab === tab.id
                          ? `bg-gradient-to-r ${tab.color} text-white`
                          : `border-purple-500/30 text-purple-300 hover:bg-purple-900/20`
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {tab.icon}
                        <span className="font-semibold">{tab.label}</span>
                      </div>
                      <span className="text-sm opacity-80">{tab.description}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {renderContent()}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-12"
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Intuitive</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Healing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Transformative</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Wisdom</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              The Hidden Astrologer • Discover Your Mystic Path
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
