import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Droplets, Wind, Mountain, Sparkles } from 'lucide-react';

interface Element {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  glow: string;
}

interface Combination {
  elements: string[];
  result: string;
  symbol: string;
  meaning: string;
  color: string;
}

const elements: Element[] = [
  { id: 'fire', name: 'Fire', icon: <Flame className="w-10 h-10 sm:w-12 sm:h-12" />, color: 'from-red-500 to-orange-600', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.6)] sm:shadow-[0_0_30px_rgba(239,68,68,0.6)]' },
  { id: 'water', name: 'Water', icon: <Droplets className="w-10 h-10 sm:w-12 sm:h-12" />, color: 'from-blue-500 to-cyan-600', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.6)] sm:shadow-[0_0_30px_rgba(59,130,246,0.6)]' },
  { id: 'air', name: 'Air', icon: <Wind className="w-10 h-10 sm:w-12 sm:h-12" />, color: 'from-cyan-400 to-teal-500', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.6)] sm:shadow-[0_0_30px_rgba(34,211,238,0.6)]' },
  { id: 'earth', name: 'Earth', icon: <Mountain className="w-10 h-10 sm:w-12 sm:h-12" />, color: 'from-amber-700 to-green-700', glow: 'shadow-[0_0_20px_rgba(217,119,6,0.6)] sm:shadow-[0_0_30px_rgba(217,119,6,0.6)]' },
];

const combinations: Combination[] = [
  { elements: ['fire', 'water'], result: 'Steam', symbol: '💨', meaning: 'Transformation through pressure. Rapid change and purification through opposing forces.', color: 'from-gray-400 to-white' },
  { elements: ['fire', 'air'], result: 'Lightning', symbol: '⚡', meaning: 'Sudden illumination and divine inspiration. Creative spark and breakthrough energy.', color: 'from-yellow-400 to-purple-600' },
  { elements: ['fire', 'earth'], result: 'Lava', symbol: '🌋', meaning: 'Primal power rising from depths. Destructive force that creates new foundations.', color: 'from-red-700 to-orange-900' },
  { elements: ['water', 'air'], result: 'Mist', symbol: '🌫️', meaning: 'Mystery and illusion. The veil between worlds where intuition speaks.', color: 'from-blue-200 to-gray-300' },
  { elements: ['water', 'earth'], result: 'Mud', symbol: '🏺', meaning: 'Fertile ground for growth. Raw potential waiting to be shaped.', color: 'from-amber-800 to-green-900' },
  { elements: ['air', 'earth'], result: 'Dust', symbol: '✨', meaning: 'Impermanence and the cycle of dissolution. Return to primordial essence.', color: 'from-amber-300 to-gray-400' },
  { elements: ['fire', 'fire'], result: 'Inferno', symbol: '🔥', meaning: 'Amplified passion and will. Unstoppable force of pure transformation.', color: 'from-red-600 to-yellow-500' },
  { elements: ['water', 'water'], result: 'Ocean', symbol: '🌊', meaning: 'Vast emotional depth. The collective unconscious and infinite possibility.', color: 'from-blue-700 to-indigo-900' },
  { elements: ['air', 'air'], result: 'Tempest', symbol: '🌪️', meaning: 'Mental clarity through chaos. Sweeping away the old to reveal truth.', color: 'from-cyan-300 to-gray-600' },
  { elements: ['earth', 'earth'], result: 'Mountain', symbol: '⛰️', meaning: 'Unshakeable foundation. Ancient wisdom and steadfast presence.', color: 'from-gray-600 to-green-800' },
];

export const ElementalAlchemy = () => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [result, setResult] = useState<Combination | null>(null);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const handleElementClick = (elementId: string) => {
    if (selectedElements.length >= 2) return;
    const newSelection = [...selectedElements, elementId];
    setSelectedElements(newSelection);

    if (newSelection.length === 2) {
      performAlchemy(newSelection);
    }
  };

  const performAlchemy = (elements: string[]) => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const sorted = [...elements].sort();
      const combo = combinations.find(c => {
        const sortedCombo = [...c.elements].sort();
        return sortedCombo[0] === sorted[0] && sortedCombo[1] === sorted[1];
      });
      
      if (combo) {
        setResult(combo);
        setDiscovered(prev => new Set([...prev, combo.result]));
      }
      setIsAnimating(false);
    }, 1500);
  };

  const reset = () => {
    setSelectedElements([]);
    setResult(null);
  };

  const alchemyLevel = Math.floor((discovered.size / combinations.length) * 100);

  return (
    <section className="py-14 px-2 xs:px-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Mystical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl xs:text-4xl md:text-6xl font-bold mb-2 xs:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-cyan-400">
            ⚗️ Elemental Alchemy ⚗️
          </h2>
          <p className="font-body text-base xs:text-lg md:text-xl text-white/90 max-w-xl sm:max-w-2xl mx-auto">
            Combine the primal elements to unlock mystical transformations
          </p>
        </div>

        {/* Alchemy Progress */}
        <Card className="p-4 xs:p-6 bg-black/40 backdrop-blur-sm border-yellow-600/30 shadow-cosmic mb-6 xs:mb-12">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between mb-2 xs:mb-3 gap-1 xs:gap-0">
            <span className="text-yellow-400 font-semibold text-sm xs:text-base">Alchemist Level</span>
            <span className="text-white font-bold text-base xs:text-lg">{discovered.size} / {combinations.length}</span>
          </div>
          <div className="w-full h-2 xs:h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-600 via-purple-600 to-cyan-600 transition-all duration-1000 rounded-full"
              style={{ width: `${alchemyLevel}%` }}
            />
          </div>
        </Card>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 xs:gap-12">
          {/* Elements Selection */}
          <div className="space-y-6 xs:space-y-8">
            <h3 className="text-xl xs:text-2xl font-bold text-white text-center mb-4 xs:mb-6">
              Select Elements
            </h3>
            <div className="grid grid-cols-2 gap-3 xs:gap-6">
              {elements.map((element) => (
                <button
                  key={element.id}
                  onClick={() => handleElementClick(element.id)}
                  disabled={selectedElements.length >= 2}
                  className={`group relative p-4 xs:p-8 bg-gradient-to-br ${element.color} rounded-xl xs:rounded-2xl border-2 border-white/20 transition-all duration-300 ${
                    selectedElements.includes(element.id)
                      ? `${element.glow} scale-95`
                      : 'hover:scale-105 hover:border-white/40'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="text-white flex flex-col items-center gap-2 xs:gap-3">
                    {element.icon}
                    <span className="font-bold text-base xs:text-xl">{element.name}</span>
                  </div>
                  
                  {selectedElements.includes(element.id) && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 xs:w-8 xs:h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold animate-bounce text-xs xs:text-base">
                      {selectedElements.indexOf(element.id) + 1}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selectedElements.length > 0 && (
              <Button
                onClick={reset}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white mt-2"
                size="sm"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Alchemy Result */}
          <div className="space-y-6 xs:space-y-8">
            <h3 className="text-xl xs:text-2xl font-bold text-white text-center mb-4 xs:mb-6">
              Transmutation Chamber
            </h3>
            <Card className="p-4 xs:p-8 bg-black/60 backdrop-blur-md border-yellow-600/30 shadow-cosmic min-h-[220px] xs:min-h-[400px] flex items-center justify-center relative overflow-hidden">
              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Alchemy animation */}
                  <div className="relative">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 w-16 h-16 xs:w-32 xs:h-32 border-2 xs:border-4 border-yellow-400/30 rounded-full animate-spin"
                        style={{
                          animationDuration: `${(i + 1) * 1}s`,
                          animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                          margin: `${i * 8}px`
                        }}
                      />
                    ))}
                    <Sparkles className="w-12 h-12 xs:w-20 xs:h-20 text-yellow-400 animate-pulse relative z-10" />
                  </div>
                  <p className="absolute bottom-4 xs:bottom-8 text-white text-lg xs:text-xl font-semibold animate-pulse">
                    Transmuting...
                  </p>
                </div>
              )}

              {!result && !isAnimating && (
                <div className="text-center space-y-2 xs:space-y-4 text-white/60">
                  <Sparkles className="w-10 h-10 xs:w-16 xs:h-16 mx-auto opacity-50" />
                  <p className="text-base xs:text-lg">
                    {selectedElements.length === 0
                      ? 'Choose two elements to begin'
                      : 'Select one more element'}
                  </p>
                </div>
              )}

              {result && !isAnimating && (
                <div className="space-y-4 xs:space-y-6 animate-scale-in text-center w-full">
                  <div className={`text-6xl xs:text-8xl mb-2 xs:mb-4 animate-float`}>
                    {result.symbol}
                  </div>
                  <div className={`px-4 xs:px-6 py-2 xs:py-3 bg-gradient-to-r ${result.color} rounded-full inline-block`}>
                    <h4 className="text-2xl xs:text-3xl font-bold text-white">
                      {result.result}
                    </h4>
                  </div>
                  <div className="p-4 xs:p-6 bg-black/40 rounded-xl border border-yellow-600/20">
                    <p className="text-white/90 text-base xs:text-lg leading-relaxed italic">
                      "{result.meaning}"
                    </p>
                  </div>
                  {discovered.has(result.result) && (
                    <div className="flex items-center justify-center gap-2 text-yellow-400 text-xs xs:text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Previously discovered</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Discovered Combinations */}
        {discovered.size > 0 && (
          <Card className="mt-8 xs:mt-12 p-4 xs:p-8 bg-black/40 backdrop-blur-sm border-yellow-600/30 shadow-cosmic">
            <h3 className="text-xl xs:text-2xl font-bold text-yellow-400 mb-4 xs:mb-6 text-center">
              📚 Discovered Transmutations
            </h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-2 xs:gap-4">
              {Array.from(discovered).map((item) => {
                const combo = combinations.find(c => c.result === item);
                return combo ? (
                  <div
                    key={item}
                    className="p-2 xs:p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-600/20 text-center"
                  >
                    <div className="text-2xl xs:text-4xl mb-1 xs:mb-2">{combo.symbol}</div>
                    <p className="text-white text-xs xs:text-sm font-semibold">{combo.result}</p>
                  </div>
                ) : null;
              })}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
