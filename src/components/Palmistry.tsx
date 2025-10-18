import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20 animate-pulse-glow" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground flex items-center justify-center gap-4">
            <Hand className="w-12 h-12 text-primary animate-pulse" />
            Sacred Palmistry Reading
            <Sparkles className="w-12 h-12 text-accent animate-pulse" />
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the ancient wisdom written in the lines of your palm
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Palm Diagram */}
          <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/30 shadow-cosmic">
            <div className="relative aspect-[3/4] bg-gradient-to-br from-amber-100 to-orange-200 rounded-3xl overflow-hidden shadow-inner">
              {/* Palm Shape */}
              <div className="absolute inset-0">
                <svg viewBox="0 0 300 400" className="w-full h-full">
                  {/* Thumb */}
                  <ellipse cx="60" cy="280" rx="35" ry="80" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                  
                  {/* Palm */}
                  <ellipse cx="180" cy="250" rx="110" ry="140" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                  
                  {/* Fingers */}
                  <rect x="100" y="30" width="30" height="120" rx="15" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                  <rect x="145" y="20" width="30" height="130" rx="15" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                  <rect x="190" y="30" width="30" height="125" rx="15" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                  <rect x="235" y="50" width="28" height="110" rx="14" fill="#f4d4b0" stroke="#d4a574" strokeWidth="2" />
                </svg>
              </div>

              {/* Palm Lines */}
              {palmLines.map((line) => (
                <div
                  key={line.id}
                  className={`absolute ${line.position} cursor-pointer transition-all duration-300 ${
                    hoveredLine === line.id ? 'scale-110 z-20' : 'z-10'
                  }`}
                  onMouseEnter={() => setHoveredLine(line.id)}
                  onMouseLeave={() => setHoveredLine(null)}
                  onClick={() => setSelectedLine(line)}
                >
                  <div 
                    className={`${line.color} ${
                      line.id === 'life' || line.id === 'fate' || line.id === 'sun' || line.id === 'mercury'
                        ? 'w-1 h-full'
                        : 'h-1 w-full'
                    } rounded-full opacity-70 hover:opacity-100 transition-opacity ${
                      hoveredLine === line.id ? 'animate-pulse shadow-glow' : ''
                    } ${
                      selectedLine?.id === line.id ? 'opacity-100 shadow-glow animate-pulse' : ''
                    }`}
                  />
                  {hoveredLine === line.id && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-sm px-3 py-1 rounded-lg border border-primary/30 shadow-cosmic whitespace-nowrap">
                      <p className="text-xs font-semibold text-foreground">{line.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground italic">
                Hover or tap on the palm lines to reveal their secrets
              </p>
            </div>
          </Card>

          {/* Reading Display */}
          <div className="space-y-6">
            {!selectedLine ? (
              <Card className="p-8 bg-gradient-cosmic/20 backdrop-blur-sm border-primary/30 shadow-cosmic animate-fade-in">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse" />
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    Select a Palm Line
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Click on any line in the palm to reveal its divine wisdom and prediction for your life path.
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary shadow-cosmic animate-scale-in">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-12 h-12 ${selectedLine.color} rounded-full animate-pulse shadow-glow`}
                    />
                    <div>
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        {selectedLine.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Ancient palmistry wisdom</p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-cosmic" />

                  <div className="p-6 bg-gradient-cosmic/20 rounded-xl">
                    <p className="font-body text-lg text-foreground/90 leading-relaxed">
                      {selectedLine.prediction}
                    </p>
                  </div>

                  <Button
                    onClick={() => setSelectedLine(null)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
                  >
                    Explore Another Line
                  </Button>
                </div>
              </Card>
            )}

            {/* All Lines Quick Reference */}
            <Card className="p-6 bg-card/70 backdrop-blur-sm border-primary/20">
              <h4 className="font-heading text-lg font-bold text-foreground mb-4">
                Palm Lines Reference
              </h4>
              <div className="space-y-3">
                {palmLines.map((line) => (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLine(line)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      selectedLine?.id === line.id
                        ? 'bg-gradient-cosmic shadow-glow'
                        : 'bg-background/50 hover:bg-background/80'
                    }`}
                  >
                    <div className={`w-3 h-3 ${line.color} rounded-full`} />
                    <span className="font-body text-sm font-medium text-foreground">
                      {line.name}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
