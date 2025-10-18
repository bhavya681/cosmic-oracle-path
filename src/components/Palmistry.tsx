import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Hand, Sparkles } from 'lucide-react';

const palmLines = [
  {
    id: 'heart',
    name: 'Heart Line',
    position: 'top-[20%] left-[15%] w-[70%]',
    color: 'bg-red-500',
    prediction: 'Your heart line reveals deep emotional connections and passionate relationships. You love intensely and seek meaningful bonds. Romance and creativity flow naturally through your life.',
  },
  {
    id: 'head',
    name: 'Head Line',
    position: 'top-[40%] left-[10%] w-[75%]',
    color: 'bg-blue-500',
    prediction: 'The head line indicates sharp intellect and analytical thinking. You approach challenges with logic and reason. Your mental clarity guides you toward wise decisions and innovative solutions.',
  },
  {
    id: 'life',
    name: 'Life Line',
    position: 'top-[30%] left-[20%] h-[60%]',
    color: 'bg-green-500',
    prediction: 'Your life line shows vitality, energy, and longevity. You possess strong life force and resilience. Adventures and new experiences energize your spirit and strengthen your path.',
  },
  {
    id: 'fate',
    name: 'Fate Line',
    position: 'top-[15%] left-[50%] h-[70%]',
    color: 'bg-purple-500',
    prediction: 'The fate line reveals your life purpose and career path. Destiny guides your journey with clarity. Success comes through following your true calling and embracing opportunities.',
  },
  {
    id: 'sun',
    name: 'Sun Line',
    position: 'top-[25%] left-[65%] h-[50%]',
    color: 'bg-yellow-500',
    prediction: 'Your sun line indicates fame, creativity, and recognition. Brilliance shines through your talents. Public success and artistic expression are written in your destiny.',
  },
  {
    id: 'mercury',
    name: 'Mercury Line',
    position: 'top-[30%] left-[75%] h-[45%]',
    color: 'bg-cyan-500',
    prediction: 'The mercury line shows communication skills and business acumen. Your words carry power and influence. Financial success flows through eloquence and strategic thinking.',
  },
];

export const Palmistry = () => {
  const [selectedLine, setSelectedLine] = useState<typeof palmLines[0] | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-purple-950/10 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground flex items-center justify-center gap-4">
            <Hand className="w-12 h-12 text-primary animate-pulse" />
            ✋ Mystical Palmistry
            <Sparkles className="w-12 h-12 text-accent animate-pulse" />
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the sacred lines etched by destiny upon your palm
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Palm Diagram */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic sticky top-24">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200 rounded-[3rem] shadow-2xl border-8 border-amber-900/30 p-8">
              <div className="absolute inset-0 rounded-[3rem] opacity-20" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 69, 19, 0.1) 2px, rgba(139, 69, 19, 0.1) 4px)'
              }} />
              
              <Hand className="w-full h-full text-amber-900/20" />

              {palmLines.map((line) => (
                <div
                  key={line.id}
                  className={`absolute ${line.position} h-1 ${line.color} rounded-full cursor-pointer transition-all duration-300 hover:h-2 hover:shadow-glow ${
                    selectedLine?.id === line.id ? 'h-3 shadow-glow animate-pulse-glow' : ''
                  } ${hoveredLine === line.id ? 'h-2' : ''}`}
                  onClick={() => setSelectedLine(line)}
                  onMouseEnter={() => setHoveredLine(line.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  {(selectedLine?.id === line.id || hoveredLine === line.id) && (
                    <div className={`absolute left-1/2 -translate-x-1/2 -top-8 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-primary/30 whitespace-nowrap z-10`}>
                      <span className="font-body text-xs font-semibold text-foreground">{line.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Predictions */}
          <div className="space-y-6">
            {!selectedLine ? (
              <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse-glow" />
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    Select a Palm Line
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Click on any line in the palm diagram to reveal its mystical meaning
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 bg-gradient-cosmic border-primary/30 shadow-cosmic animate-scale-in">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`inline-block p-4 rounded-full ${selectedLine.color} shadow-glow mb-4`}>
                      <Hand className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                      {selectedLine.name}
                    </h3>
                  </div>

                  <div className="bg-background/30 p-6 rounded-xl">
                    <p className="font-body text-lg text-foreground leading-relaxed">
                      {selectedLine.prediction}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {palmLines.filter(l => l.id !== selectedLine?.id).map((line) => (
              <Card
                key={line.id}
                className="p-6 bg-card/70 backdrop-blur-sm border-primary/20 shadow-cosmic cursor-pointer hover:border-primary/50 transition-all duration-300 hover:scale-102"
                onClick={() => setSelectedLine(line)}
              >
                <h4 className={`font-heading text-xl font-bold ${line.color.replace('bg-', 'text-')} mb-2`}>
                  {line.name}
                </h4>
                <p className="font-body text-sm text-muted-foreground line-clamp-2">
                  {line.prediction}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
