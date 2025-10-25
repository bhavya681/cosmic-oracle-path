import { useState } from 'react';

export interface DreamSymbol {
  symbol: string;
  meaning: string;
  category: string;
}

export interface DreamInterpretation {
  symbols: DreamSymbol[];
  overallMeaning: string;
  emotionalTone: string;
  spiritualMessage: string;
  advice: string;
}

export const useDreamDecoder = () => {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<DreamInterpretation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dreamSymbols: Record<string, DreamSymbol> = {
    flying: {
      symbol: 'Flying',
      meaning: 'Liberation, freedom, rising above limitations, spiritual ascension',
      category: 'Transformation'
    },
    falling: {
      symbol: 'Falling',
      meaning: 'Loss of control, fear, insecurity, need for grounding',
      category: 'Fear'
    },
    water: {
      symbol: 'Water',
      meaning: 'Emotions, cleansing, life force, subconscious mind',
      category: 'Emotion'
    },
    fire: {
      symbol: 'Fire',
      meaning: 'Passion, transformation, destruction and renewal, spiritual energy',
      category: 'Transformation'
    },
    animals: {
      symbol: 'Animals',
      meaning: 'Instincts, nature connection, spiritual guides, untamed aspects of self',
      category: 'Nature'
    },
    house: {
      symbol: 'House',
      meaning: 'Self, psyche, different aspects of personality, security',
      category: 'Self'
    },
    death: {
      symbol: 'Death',
      meaning: 'Endings, transformation, rebirth, letting go of the old',
      category: 'Transformation'
    },
    chase: {
      symbol: 'Being Chased',
      meaning: 'Avoiding something, running from problems, fear of confrontation',
      category: 'Fear'
    },
    teeth: {
      symbol: 'Teeth',
      meaning: 'Communication, self-expression, power, appearance concerns',
      category: 'Communication'
    },
    snake: {
      symbol: 'Snake',
      meaning: 'Transformation, healing, wisdom, kundalini energy, renewal',
      category: 'Transformation'
    }
  };

  const generateInterpretation = async (text: string): Promise<DreamInterpretation> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerText = text.toLowerCase();
    const foundSymbols: DreamSymbol[] = [];
    
    // Simple keyword matching for demo purposes
    Object.entries(dreamSymbols).forEach(([key, symbol]) => {
      if (lowerText.includes(key) || lowerText.includes(symbol.symbol.toLowerCase())) {
        foundSymbols.push(symbol);
      }
    });
    
    // If no specific symbols found, provide general interpretation
    if (foundSymbols.length === 0) {
      foundSymbols.push({
        symbol: 'Mystery',
        meaning: 'Your dream contains hidden messages waiting to be revealed',
        category: 'Mystery'
      });
    }
    
    // Generate overall meaning based on symbols
    const overallMeaning = generateOverallMeaning(foundSymbols);
    const emotionalTone = generateEmotionalTone(foundSymbols);
    const spiritualMessage = generateSpiritualMessage(foundSymbols);
    const advice = generateAdvice(foundSymbols);
    
    return {
      symbols: foundSymbols,
      overallMeaning,
      emotionalTone,
      spiritualMessage,
      advice
    };
  };

  const generateOverallMeaning = (symbols: DreamSymbol[]): string => {
    const categories = symbols.map(s => s.category);
    const uniqueCategories = [...new Set(categories)];
    
    if (uniqueCategories.includes('Transformation')) {
      return 'Your soul is calling for profound transformation and renewal. This dream signals a powerful shift in your spiritual journey.';
    } else if (uniqueCategories.includes('Fear')) {
      return 'Your subconscious is processing fears and challenges. This dream offers an opportunity to face what you\'ve been avoiding.';
    } else if (uniqueCategories.includes('Emotion')) {
      return 'Your emotional landscape is rich and complex. This dream reflects deep feelings seeking expression and healing.';
    } else {
      return 'Your dream carries important messages from your higher self. Pay attention to the symbols and feelings that arise.';
    }
  };

  const generateEmotionalTone = (symbols: DreamSymbol[]): string => {
    const categories = symbols.map(s => s.category);
    
    if (categories.includes('Transformation')) {
      return 'Empowered and ready for change';
    } else if (categories.includes('Fear')) {
      return 'Seeking courage and security';
    } else if (categories.includes('Emotion')) {
      return 'Deeply feeling and processing';
    } else {
      return 'Curious and open to guidance';
    }
  };

  const generateSpiritualMessage = (symbols: DreamSymbol[]): string => {
    const categories = symbols.map(s => s.category);
    
    if (categories.includes('Transformation')) {
      return 'The universe is supporting your evolution. Trust the process of becoming who you are meant to be.';
    } else if (categories.includes('Fear')) {
      return 'Your fears are teachers in disguise. Face them with love and watch them transform into wisdom.';
    } else if (categories.includes('Emotion')) {
      return 'Your heart is your greatest guide. Listen to its whispers and honor your feelings.';
    } else {
      return 'You are more powerful than you know. Your dreams are showing you the way forward.';
    }
  };

  const generateAdvice = (symbols: DreamSymbol[]): string => {
    const categories = symbols.map(s => s.category);
    
    if (categories.includes('Transformation')) {
      return 'Embrace change with open arms. Journal about what you want to release and what you want to become.';
    } else if (categories.includes('Fear')) {
      return 'Take small steps toward what scares you. You have the strength to overcome any obstacle.';
    } else if (categories.includes('Emotion')) {
      return 'Express your feelings through art, writing, or movement. Your emotions are valid and important.';
    } else {
      return 'Keep a dream journal and notice patterns. Your dreams are speaking to you.';
    }
  };

  const decodeDream = async () => {
    if (!dreamText.trim()) return;
    
    setIsLoading(true);
    setIsTyping(false);
    
    try {
      const result = await generateInterpretation(dreamText);
      setInterpretation(result);
      
      // Save to localStorage
      const savedDreams = JSON.parse(localStorage.getItem('dreamInterpretations') || '[]');
      savedDreams.push({
        dream: dreamText,
        interpretation: result,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('dreamInterpretations', JSON.stringify(savedDreams));
      
    } catch (error) {
      console.error('Error decoding dream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startTypingEffect = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const getSavedDreams = () => {
    const saved = localStorage.getItem('dreamInterpretations');
    return saved ? JSON.parse(saved) : [];
  };

  const clearDream = () => {
    setDreamText('');
    setInterpretation(null);
  };

  return {
    dreamText,
    setDreamText,
    interpretation,
    isLoading,
    isTyping,
    decodeDream,
    clearDream,
    getSavedDreams,
    startTypingEffect
  };
};
