import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Droplet, Wind, Mountain, Sparkles } from 'lucide-react';

type Element = 'fire' | 'water' | 'air' | 'earth';

interface AlchemyResult {
  name: string;
  symbol: string;
  meaning: string;
  elements: Element[];
}

const alchemyResults: AlchemyResult[] = [
  { name: "Steam", symbol: "🌫️", meaning: "Transformation Phase - Emotions meet action to create change", elements: ['fire', 'water'] },
  { name: "Lava", symbol: "🌋", meaning: "Raw Power - Pure creation force emerging from depth", elements: ['fire', 'earth'] },
  { name: "Lightning", symbol: "⚡", meaning: "Divine Insight - Sudden illumination breaking through", elements: ['fire', 'air'] },
  { name: "Mud", symbol: "🟫", meaning: "Grounded Emotion - Feelings taking material form", elements: ['water', 'earth'] },
  { name: "Mist", symbol: "🌁", meaning: "Mystery & Intuition - The veil between worlds", elements: ['water', 'air'] },
  { name: "Dust Storm", symbol: "🌪️", meaning: "Chaos to Order - Restructuring the foundation", elements: ['air', 'earth'] },
  { name: "Phoenix Flame", symbol: "🔥", meaning: "Eternal Rebirth - Death and resurrection cycle", elements: ['fire', 'fire'] },
  { name: "Deep Ocean", symbol: "🌊", meaning: "Subconscious Depth - Emotional mastery", elements: ['water', 'water'] },
  { name: "Hurricane", symbol: "🌀", meaning: "Mental Liberation - Breaking free from constraints", elements: ['air', 'air'] },
  { name: "Crystal", symbol: "💎", meaning: "Manifestation - Dreams made solid and real", elements: ['earth', 'earth'] },
];

export const ElementalAlchemy = () => {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const [result, setResult] = useState<AlchemyResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [discovered, setDiscovered] = useState<Set<string>>(new Set());

  const elements = [
    { type: 'fire' as Element, icon: Flame, color: 'text-red-500', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/50' },
    { type: 'water' as Element, icon: Droplet, color: 'text-blue-500', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/50' },
    { type: 'air' as Element, icon: Wind, color: 'text-cyan-400', bgColor: 'bg-cyan-400/20', borderColor: 'border-cyan-400/50' },
    { type: 'earth' as Element, icon: Mountain, color: 'text-green-600', bgColor: 'bg-green-600/20', borderColor: 'border-green-600/50' },
  ];

  const selectElement = (element: Element) => {
    if (selectedElements.length < 2) {
      const newSelection = [...selectedElements, element];
      setSelectedElements(newSelection);

      if (newSelection.length === 2) {
        combineElements(newSelection);
      }
    }
  };

  const combineElements = (elements: Element[]) => {
    setTimeout(() => {
      const combination = alchemyResults.find(r => 
        (r.elements[0] === elements[0] && r.elements[1] === elements[1]) ||
        (r.elements[0] === elements[1] && r.elements[1] === elements[0])
      );

      if (combination) {
        setResult(combination);
        setShowResult(true);
        setDiscovered(prev => new Set(prev).add(combination.name));
      }
    }, 1500);
  };

  const reset = () => {
    setSelectedElements([]);
    setResult(null);
    setShowResult(false);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            🔥 Elemental Alchemy
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Combine the primal elements to unlock mystical alchemical wisdom
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Element Selection */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic">
            <h3 className="font-heading text-2xl font-bold text-center mb-8 text-foreground">
              Choose Two Elements
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {elements.map(({ type, icon: Icon, color, bgColor, borderColor }) => (
                <button
                  key={type}
                  onClick={() => selectElement(type)}
                  disabled={selectedElements.length === 2}
                  className={`relative group p-8 rounded-2xl border-4 ${borderColor} ${bgColor} 
                    transition-all duration-500 hover:scale-105 hover:shadow-glow
                    ${selectedElements.includes(type) ? 'ring-4 ring-primary' : ''}
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full ${bgColor} ${color}`}>
                      <Icon className="w-12 h-12" />
                    </div>
                    <span className={`font-heading text-xl font-bold ${color} capitalize`}>
                      {type}
                    </span>
                  </div>

                  {selectedElements.includes(type) && (
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-pulse-glow" />
                  )}
                </button>
              ))}
            </div>

            {selectedElements.length > 0 && (
              <div className="mt-8 space-y-4">
                <div className="flex justify-center gap-4 items-center">
                  {selectedElements.map((el, i) => {
                    const element = elements.find(e => e.type === el);
                    const Icon = element?.icon || Sparkles;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`p-3 rounded-full ${element?.bgColor} ${element?.color}`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        {i === 0 && selectedElements.length === 2 && (
                          <span className="text-3xl text-primary animate-pulse-glow">+</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {selectedElements.length === 2 && !showResult && (
                  <div className="text-center">
                    <p className="font-body text-primary animate-pulse-glow">
                      Alchemical transformation in progress...
                    </p>
                  </div>
                )}

                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full"
                >
                  Reset
                </Button>
              </div>
            )}
          </Card>

          {/* Result Display */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic">
            <h3 className="font-heading text-2xl font-bold text-center mb-8 text-foreground">
              Alchemical Result
            </h3>

            {!showResult ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-cosmic animate-rotate-slow blur-xl opacity-50" />
                    <div className="relative w-full h-full rounded-full bg-gradient-cosmic flex items-center justify-center border-4 border-primary/30">
                      <Sparkles className="w-16 h-16 text-foreground animate-pulse" />
                    </div>
                  </div>
                  <p className="font-body text-muted-foreground">
                    Combine elements to reveal mystical wisdom
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-6 animate-scale-in">
                <div className="text-center space-y-4">
                  <div className="inline-block p-6 rounded-full bg-gradient-cosmic shadow-glow animate-pulse-glow">
                    <div className="text-6xl">{result.symbol}</div>
                  </div>

                  <h4 className="font-heading text-3xl font-bold text-primary">
                    {result.name}
                  </h4>

                  <div className="flex justify-center gap-2">
                    {result.elements.map((el, i) => {
                      const element = elements.find(e => e.type === el);
                      const Icon = element?.icon || Sparkles;
                      return (
                        <div key={i} className={`p-2 rounded-full ${element?.bgColor} ${element?.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-cosmic p-6 rounded-xl border border-primary/20">
                  <p className="font-body text-lg text-foreground leading-relaxed text-center">
                    {result.meaning}
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-xl border border-accent/30">
                  <p className="font-body text-sm text-center text-foreground/70">
                    ✨ {discovered.size} of {alchemyResults.length} combinations discovered
                  </p>
                </div>
              </div>
            ) : null}
          </Card>
        </div>

        {/* Progress Tracker */}
        {discovered.size > 0 && (
          <Card className="mt-8 p-6 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
            <h4 className="font-heading text-xl font-bold text-center mb-4 text-foreground">
              Discovered Combinations
            </h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from(discovered).map((name) => {
                const combo = alchemyResults.find(r => r.name === name);
                return combo ? (
                  <div key={name} className="flex items-center gap-2 px-4 py-2 bg-gradient-cosmic rounded-full border border-primary/30">
                    <span className="text-2xl">{combo.symbol}</span>
                    <span className="font-body text-sm text-foreground">{combo.name}</span>
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
