import { useState, useRef } from 'react';

export interface AuraColor {
  name: string;
  color: string;
  gradient: string;
  meaning: string;
  emotion: string;
  chakra: string;
  particles: string;
}

export interface AuraVisualization {
  color: AuraColor;
  intensity: number;
  pattern: string;
  glow: string;
}

export const useAuraVisualizer = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const [intensity, setIntensity] = useState(50);
  const [visualization, setVisualization] = useState<AuraVisualization | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const auraColors: Record<string, AuraColor> = {
    love: {
      name: 'Rose Quartz',
      color: '#E8B4B8',
      gradient: 'linear-gradient(135deg, #E8B4B8, #F5C6CB, #FFB6C1)',
      meaning: 'Unconditional love, compassion, emotional healing',
      emotion: 'Love',
      chakra: 'Heart',
      particles: 'gentle pink sparkles'
    },
    calm: {
      name: 'Serene Blue',
      color: '#87CEEB',
      gradient: 'linear-gradient(135deg, #87CEEB, #B0E0E6, #ADD8E6)',
      meaning: 'Peace, tranquility, spiritual connection',
      emotion: 'Calm',
      chakra: 'Throat',
      particles: 'soft blue mist'
    },
    passion: {
      name: 'Fiery Orange',
      color: '#FF8C00',
      gradient: 'linear-gradient(135deg, #FF8C00, #FFA500, #FFD700)',
      meaning: 'Creativity, passion, life force energy',
      emotion: 'Passion',
      chakra: 'Sacral',
      particles: 'golden flames'
    },
    wisdom: {
      name: 'Deep Purple',
      color: '#8A2BE2',
      gradient: 'linear-gradient(135deg, #8A2BE2, #9370DB, #BA55D3)',
      meaning: 'Intuition, wisdom, spiritual insight',
      emotion: 'Wisdom',
      chakra: 'Third Eye',
      particles: 'violet orbs'
    },
    healing: {
      name: 'Emerald Green',
      color: '#50C878',
      gradient: 'linear-gradient(135deg, #50C878, #90EE90, #98FB98)',
      meaning: 'Healing, growth, nature connection',
      emotion: 'Healing',
      chakra: 'Heart',
      particles: 'green healing light'
    },
    clarity: {
      name: 'Crystal White',
      color: '#F0F8FF',
      gradient: 'linear-gradient(135deg, #F0F8FF, #FFFFFF, #E6E6FA)',
      meaning: 'Purity, clarity, divine connection',
      emotion: 'Clarity',
      chakra: 'Crown',
      particles: 'white light beams'
    },
    confusion: {
      name: 'Misty Gray',
      color: '#D3D3D3',
      gradient: 'linear-gradient(135deg, #D3D3D3, #C0C0C0, #A9A9A9)',
      meaning: 'Uncertainty, seeking direction, inner conflict',
      emotion: 'Confusion',
      chakra: 'Root',
      particles: 'gray swirling mist'
    },
    ambition: {
      name: 'Electric Blue',
      color: '#00BFFF',
      gradient: 'linear-gradient(135deg, #00BFFF, #1E90FF, #4169E1)',
      meaning: 'Ambition, focus, determination',
      emotion: 'Ambition',
      chakra: 'Solar Plexus',
      particles: 'electric blue sparks'
    },
    joy: {
      name: 'Sunshine Yellow',
      color: '#FFD700',
      gradient: 'linear-gradient(135deg, #FFD700, #FFFF00, #FFA500)',
      meaning: 'Joy, optimism, creative energy',
      emotion: 'Joy',
      chakra: 'Solar Plexus',
      particles: 'golden sunbeams'
    },
    mystery: {
      name: 'Cosmic Indigo',
      color: '#4B0082',
      gradient: 'linear-gradient(135deg, #4B0082, #6A5ACD, #9370DB)',
      meaning: 'Mystery, intuition, cosmic connection',
      emotion: 'Mystery',
      chakra: 'Third Eye',
      particles: 'indigo starfield'
    }
  };

  const emotions = [
    { value: 'love', label: '💖 Love', color: '#E8B4B8' },
    { value: 'calm', label: '🌊 Calm', color: '#87CEEB' },
    { value: 'passion', label: '🔥 Passion', color: '#FF8C00' },
    { value: 'wisdom', label: '🔮 Wisdom', color: '#8A2BE2' },
    { value: 'healing', label: '🌿 Healing', color: '#50C878' },
    { value: 'clarity', label: '✨ Clarity', color: '#F0F8FF' },
    { value: 'confusion', label: '🌫️ Confusion', color: '#D3D3D3' },
    { value: 'ambition', label: '⚡ Ambition', color: '#00BFFF' },
    { value: 'joy', label: '☀️ Joy', color: '#FFD700' },
    { value: 'mystery', label: '🌌 Mystery', color: '#4B0082' }
  ];

  const generateAura = async () => {
    if (!selectedEmotion) return;
    
    setIsGenerating(true);
    
    // Simulate aura generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const auraColor = auraColors[selectedEmotion];
    const patterns = ['radial', 'spiral', 'waves', 'rings', 'particles'];
    const glows = ['soft', 'bright', 'pulsing', 'shimmering', 'ethereal'];
    
    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const randomGlow = glows[Math.floor(Math.random() * glows.length)];
    
    const newVisualization: AuraVisualization = {
      color: auraColor,
      intensity,
      pattern: randomPattern,
      glow: randomGlow
    };
    
    setVisualization(newVisualization);
    setIsGenerating(false);
    
    // Save to localStorage
    const savedAuras = JSON.parse(localStorage.getItem('auraVisualizations') || '[]');
    savedAuras.push({
      emotion: selectedEmotion,
      visualization: newVisualization,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('auraVisualizations', JSON.stringify(savedAuras));
  };

  const captureAura = () => {
    if (!canvasRef.current || !visualization) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    // Create gradient background
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, visualization.color.color);
    gradient.addColorStop(0.5, visualization.color.color + '80');
    gradient.addColorStop(1, 'transparent');
    
    // Draw aura
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Add particles
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 400;
      const y = Math.random() * 400;
      const size = Math.random() * 3 + 1;
      
      ctx.fillStyle = visualization.color.color;
      ctx.globalAlpha = Math.random() * 0.8;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Return canvas as image
    return canvas.toDataURL('image/png');
  };

  const getSavedAuras = () => {
    const saved = localStorage.getItem('auraVisualizations');
    return saved ? JSON.parse(saved) : [];
  };

  const clearAura = () => {
    setSelectedEmotion('');
    setIntensity(50);
    setVisualization(null);
  };

  return {
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
    getSavedAuras,
    clearAura,
    canvasRef
  };
};
