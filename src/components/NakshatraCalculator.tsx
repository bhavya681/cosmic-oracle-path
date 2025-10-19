import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, User, Sparkles } from 'lucide-react';

const nakshatras = [
  { name: 'Ashwini', symbol: '🐎', deity: 'Ashwini Kumaras', range: [0, 13.33] },
  { name: 'Bharani', symbol: '🌺', deity: 'Yama', range: [13.33, 26.67] },
  { name: 'Krittika', symbol: '🔥', deity: 'Agni', range: [26.67, 40] },
  { name: 'Rohini', symbol: '🌹', deity: 'Brahma', range: [40, 53.33] },
  { name: 'Mrigashira', symbol: '🦌', deity: 'Soma', range: [53.33, 66.67] },
  { name: 'Ardra', symbol: '💧', deity: 'Rudra', range: [66.67, 80] },
  { name: 'Punarvasu', symbol: '🏹', deity: 'Aditi', range: [80, 93.33] },
  { name: 'Pushya', symbol: '🌾', deity: 'Brihaspati', range: [93.33, 106.67] },
  { name: 'Ashlesha', symbol: '🐍', deity: 'Nagas', range: [106.67, 120] },
  { name: 'Magha', symbol: '👑', deity: 'Pitris', range: [120, 133.33] },
  { name: 'Purva Phalguni', symbol: '💝', deity: 'Bhaga', range: [133.33, 146.67] },
  { name: 'Uttara Phalguni', symbol: '☀️', deity: 'Aryaman', range: [146.67, 160] },
  { name: 'Hasta', symbol: '✋', deity: 'Savitar', range: [160, 173.33] },
  { name: 'Chitra', symbol: '💎', deity: 'Vishwakarma', range: [173.33, 186.67] },
  { name: 'Swati', symbol: '🌬️', deity: 'Vayu', range: [186.67, 200] },
  { name: 'Vishakha', symbol: '⚡', deity: 'Indra-Agni', range: [200, 213.33] },
  { name: 'Anuradha', symbol: '🪷', deity: 'Mitra', range: [213.33, 226.67] },
  { name: 'Jyeshtha', symbol: '☂️', deity: 'Indra', range: [226.67, 240] },
  { name: 'Mula', symbol: '🌿', deity: 'Nirriti', range: [240, 253.33] },
  { name: 'Purva Ashadha', symbol: '🏆', deity: 'Apas', range: [253.33, 266.67] },
  { name: 'Uttara Ashadha', symbol: '⭐', deity: 'Vishvedevas', range: [266.67, 280] },
  { name: 'Shravana', symbol: '👂', deity: 'Vishnu', range: [280, 293.33] },
  { name: 'Dhanishtha', symbol: '🥁', deity: 'Vasus', range: [293.33, 306.67] },
  { name: 'Shatabhisha', symbol: '⭕', deity: 'Varuna', range: [306.67, 320] },
  { name: 'Purva Bhadrapada', symbol: '⚔️', deity: 'Aja Ekapada', range: [320, 333.33] },
  { name: 'Uttara Bhadrapada', symbol: '🐉', deity: 'Ahir Budhnya', range: [333.33, 346.67] },
  { name: 'Revati', symbol: '🐠', deity: 'Pushan', range: [346.67, 360] },
];

export const NakshatraCalculator = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<typeof nakshatras[0] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateNakshatra = () => {
    if (!name || !dob) return;
    
    setIsCalculating(true);
    
    // Simulate calculation with animation
    setTimeout(() => {
      const date = new Date(dob);
      const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
      const moonPosition = ((dayOfYear * 13.176) % 360); // Simplified moon position calculation
      
      const nakshatra = nakshatras.find(n => moonPosition >= n.range[0] && moonPosition < n.range[1]) || nakshatras[0];
      
      setResult(nakshatra);
      setIsCalculating(false);
    }, 2000);
  };

  const resetCalculator = () => {
    setName('');
    setDob('');
    setResult(null);
  };

  return (
    <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-heading text-3xl font-bold text-foreground flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            Nakshatra Calculator
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </h3>
          <p className="text-muted-foreground">
            Discover your Janma Nakshatra - your birth star constellation
          </p>
        </div>

        {!result && !isCalculating && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-foreground font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary text-foreground"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="dob" className="text-foreground font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary text-foreground"
              />
            </div>

            <Button
              onClick={calculateNakshatra}
              disabled={!name || !dob}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Calculate My Nakshatra
            </Button>
          </div>
        )}

        {isCalculating && (
          <div className="space-y-6 animate-scale-in text-center py-8">
            <div className="relative w-32 h-32 mx-auto">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin"
                  style={{
                    margin: `${i * 12}px`,
                    animationDuration: `${(i + 1) * 1}s`,
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <p className="text-lg text-foreground font-semibold animate-pulse">
              Consulting the celestial records...
            </p>
            <p className="text-sm text-muted-foreground">
              Aligning with your birth stars
            </p>
          </div>
        )}

        {result && !isCalculating && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center p-8 bg-gradient-cosmic rounded-2xl space-y-4">
              <div className="text-8xl mb-4 animate-float">{result.symbol}</div>
              <h4 className="font-heading text-3xl font-bold text-foreground">
                {result.name}
              </h4>
              <div className="w-20 h-1 bg-primary/50 mx-auto" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Ruling Deity</p>
                <p className="text-xl font-semibold text-foreground">{result.deity}</p>
              </div>
            </div>

            <div className="p-6 bg-background/50 rounded-xl border border-primary/20">
              <p className="text-foreground text-center">
                <span className="font-semibold">{name}</span>, you were born under the sacred constellation of{' '}
                <span className="font-bold text-primary">{result.name}</span>, guided by{' '}
                <span className="font-semibold text-accent">{result.deity}</span>. This celestial placement shapes your cosmic journey and spiritual path.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={resetCalculator}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                Calculate Another
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground italic">
              ✨ Scroll down to explore your Nakshatra's full wisdom in the journey below
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
