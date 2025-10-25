import { useState, useEffect } from 'react';

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    archetype: string;
    points: number;
  }[];
}

export interface ArchetypeResult {
  name: string;
  description: string;
  traits: string[];
  rulingPlanets: string[];
  tarotCard: string;
  color: string;
  image: string;
}

export const useArchetypeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<ArchetypeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: '1',
      question: 'When you enter a room, what do you notice first?',
      options: [
        { text: 'The energy and atmosphere', archetype: 'seer', points: 3 },
        { text: 'The people and their expressions', archetype: 'empath', points: 2 },
        { text: 'The colors and lighting', archetype: 'artist', points: 1 },
        { text: 'The structure and layout', archetype: 'analyst', points: 0 }
      ]
    },
    {
      id: '2',
      question: 'Your ideal way to spend a full moon night is:',
      options: [
        { text: 'Meditating under the stars', archetype: 'mystic', points: 3 },
        { text: 'Reading tarot cards', archetype: 'oracle', points: 2 },
        { text: 'Creating art or music', archetype: 'artist', points: 1 },
        { text: 'Studying ancient texts', archetype: 'scholar', points: 0 }
      ]
    },
    {
      id: '3',
      question: 'When making decisions, you rely most on:',
      options: [
        { text: 'Your intuition and gut feeling', archetype: 'seer', points: 3 },
        { text: 'Your emotions and heart', archetype: 'empath', points: 2 },
        { text: 'Your creative vision', archetype: 'artist', points: 1 },
        { text: 'Logic and analysis', archetype: 'analyst', points: 0 }
      ]
    },
    {
      id: '4',
      question: 'Your favorite element is:',
      options: [
        { text: 'Water - flowing and mysterious', archetype: 'seer', points: 3 },
        { text: 'Fire - passionate and transformative', archetype: 'mystic', points: 2 },
        { text: 'Air - free and creative', archetype: 'artist', points: 1 },
        { text: 'Earth - stable and grounding', archetype: 'scholar', points: 0 }
      ]
    },
    {
      id: '5',
      question: 'In a crisis, your first instinct is to:',
      options: [
        { text: 'Seek guidance from within', archetype: 'mystic', points: 3 },
        { text: 'Help others feel better', archetype: 'empath', points: 2 },
        { text: 'Express it through art', archetype: 'artist', points: 1 },
        { text: 'Analyze the situation', archetype: 'analyst', points: 0 }
      ]
    },
    {
      id: '6',
      question: 'Your spiritual practice includes:',
      options: [
        { text: 'Deep meditation and visions', archetype: 'seer', points: 3 },
        { text: 'Energy healing and chakras', archetype: 'mystic', points: 2 },
        { text: 'Creative visualization', archetype: 'artist', points: 1 },
        { text: 'Study of sacred texts', archetype: 'scholar', points: 0 }
      ]
    },
    {
      id: '7',
      question: 'Your greatest gift is:',
      options: [
        { text: 'Seeing beyond the veil', archetype: 'seer', points: 3 },
        { text: 'Feeling others\' emotions', archetype: 'empath', points: 2 },
        { text: 'Creating beauty and meaning', archetype: 'artist', points: 1 },
        { text: 'Understanding complex systems', archetype: 'analyst', points: 0 }
      ]
    },
    {
      id: '8',
      question: 'Your ideal mystical tool is:',
      options: [
        { text: 'A crystal ball or scrying mirror', archetype: 'seer', points: 3 },
        { text: 'A pendulum or dowsing rod', archetype: 'mystic', points: 2 },
        { text: 'A paintbrush or musical instrument', archetype: 'artist', points: 1 },
        { text: 'Ancient books or scrolls', archetype: 'scholar', points: 0 }
      ]
    },
    {
      id: '9',
      question: 'Your life purpose feels like:',
      options: [
        { text: 'Guiding others through darkness', archetype: 'seer', points: 3 },
        { text: 'Healing and transforming energy', archetype: 'mystic', points: 2 },
        { text: 'Inspiring through beauty', archetype: 'artist', points: 1 },
        { text: 'Preserving ancient wisdom', archetype: 'scholar', points: 0 }
      ]
    }
  ];

  const archetypeResults: Record<string, ArchetypeResult> = {
    seer: {
      name: 'The Seer of Shadows',
      description: 'You are a master of intuition, guided by Moon and Mercury. You see beyond the veil and help others navigate through darkness with your profound inner sight.',
      traits: ['Intuitive', 'Mysterious', 'Wise', 'Protective'],
      rulingPlanets: ['Moon', 'Mercury'],
      tarotCard: 'The High Priestess',
      color: 'Deep Indigo',
      image: '/src/assets/tarot-priestess.jpg'
    },
    mystic: {
      name: 'The Solar Mystic',
      description: 'You are radiant, bold, and visionary. Your energy transforms everything you touch, and you guide others toward enlightenment with your fiery passion.',
      traits: ['Radiant', 'Bold', 'Visionary', 'Transformative'],
      rulingPlanets: ['Sun', 'Mars'],
      tarotCard: 'The Sun',
      color: 'Golden Amber',
      image: '/src/assets/tarot-sun.jpg'
    },
    empath: {
      name: 'The Cosmic Empath',
      description: 'You feel the universe\'s heartbeat and channel healing energy through your compassionate heart. You are a bridge between worlds.',
      traits: ['Compassionate', 'Healing', 'Sensitive', 'Connected'],
      rulingPlanets: ['Venus', 'Neptune'],
      tarotCard: 'The Star',
      color: 'Rose Quartz',
      image: '/src/assets/tarot-star.jpg'
    },
    artist: {
      name: 'The Ethereal Artist',
      description: 'You channel divine inspiration through your creative gifts. Your art becomes a portal to other realms and touches souls across dimensions.',
      traits: ['Creative', 'Inspiring', 'Ethereal', 'Expressive'],
      rulingPlanets: ['Venus', 'Jupiter'],
      tarotCard: 'The Empress',
      color: 'Violet Purple',
      image: '/src/assets/tarot-empress.jpg'
    },
    analyst: {
      name: 'The Sacred Scholar',
      description: 'You are a keeper of ancient wisdom, decoding the mysteries of the universe through study and contemplation. Your knowledge illuminates the path for others.',
      traits: ['Wise', 'Analytical', 'Patient', 'Enlightened'],
      rulingPlanets: ['Mercury', 'Saturn'],
      tarotCard: 'The Hermit',
      color: 'Deep Blue',
      image: '/src/assets/tarot-hermit.jpg'
    }
  };

  const answerQuestion = (questionId: string, archetype: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: archetype }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setIsLoading(true);
    
    // Calculate points for each archetype
    const archetypePoints: Record<string, number> = {};
    
    Object.values(answers).forEach(archetype => {
      archetypePoints[archetype] = (archetypePoints[archetype] || 0) + 1;
    });
    
    // Find the archetype with highest points
    const resultArchetype = Object.entries(archetypePoints)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    setTimeout(() => {
      setResult(archetypeResults[resultArchetype]);
      setIsCompleted(true);
      setIsLoading(false);
      
      // Save to localStorage
      localStorage.setItem('archetypeQuizResult', JSON.stringify({
        archetype: resultArchetype,
        result: archetypeResults[resultArchetype],
        timestamp: new Date().toISOString()
      }));
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setResult(null);
    setIsLoading(false);
  };

  const getSavedResult = () => {
    const saved = localStorage.getItem('archetypeQuizResult');
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  };

  return {
    questions,
    currentQuestion,
    answers,
    isCompleted,
    result,
    isLoading,
    answerQuestion,
    resetQuiz,
    getSavedResult
  };
};
