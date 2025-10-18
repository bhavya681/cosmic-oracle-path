import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calendar, Sparkles, Star } from 'lucide-react';

const nakshatras = [
  { name: "Ashwini", deity: "Ashwini Kumaras", symbol: "Horse's Head", range: [0, 13.33] },
  { name: "Bharani", deity: "Yama", symbol: "Yoni", range: [13.33, 26.66] },
  { name: "Krittika", deity: "Agni", symbol: "Razor/Flame", range: [26.66, 40] },
  { name: "Rohini", deity: "Brahma", symbol: "Ox Cart", range: [40, 53.33] },
  { name: "Mrigashira", deity: "Soma", symbol: "Deer's Head", range: [53.33, 66.66] },
  { name: "Ardra", deity: "Rudra", symbol: "Teardrop", range: [66.66, 80] },
  { name: "Punarvasu", deity: "Aditi", symbol: "Quiver of Arrows", range: [80, 93.33] },
  { name: "Pushya", deity: "Brihaspati", symbol: "Cow's Udder", range: [93.33, 106.66] },
  { name: "Ashlesha", deity: "Nagas", symbol: "Coiled Serpent", range: [106.66, 120] },
  { name: "Magha", deity: "Pitris", symbol: "Royal Throne", range: [120, 133.33] },
  { name: "Purva Phalguni", deity: "Bhaga", symbol: "Hammock", range: [133.33, 146.66] },
  { name: "Uttara Phalguni", deity: "Aryaman", symbol: "Bed", range: [146.66, 160] },
  { name: "Hasta", deity: "Savitar", symbol: "Hand", range: [160, 173.33] },
  { name: "Chitra", deity: "Tvashtar", symbol: "Pearl", range: [173.33, 186.66] },
  { name: "Swati", deity: "Vayu", symbol: "Coral", range: [186.66, 200] },
  { name: "Vishakha", deity: "Indra-Agni", symbol: "Archway", range: [200, 213.33] },
  { name: "Anuradha", deity: "Mitra", symbol: "Lotus", range: [213.33, 226.66] },
  { name: "Jyeshtha", deity: "Indra", symbol: "Umbrella", range: [226.66, 240] },
  { name: "Mula", deity: "Nirriti", symbol: "Root", range: [240, 253.33] },
  { name: "Purva Ashadha", deity: "Apas", symbol: "Elephant Tusk", range: [253.33, 266.66] },
  { name: "Uttara Ashadha", deity: "Vishvadevas", symbol: "Planks", range: [266.66, 280] },
  { name: "Shravana", deity: "Vishnu", symbol: "Ear", range: [280, 293.33] },
  { name: "Dhanishta", deity: "Vasus", symbol: "Drum", range: [293.33, 306.66] },
  { name: "Shatabhisha", deity: "Varuna", symbol: "Empty Circle", range: [306.66, 320] },
  { name: "Purva Bhadrapada", deity: "Aja Ekapada", symbol: "Sword", range: [320, 333.33] },
  { name: "Uttara Bhadrapada", deity: "Ahir Budhnya", symbol: "Twins", range: [333.33, 346.66] },
  { name: "Revati", deity: "Pushan", symbol: "Fish/Drum", range: [346.66, 360] }
];

export const NakshatraCalculator = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<typeof nakshatras[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateNakshatra = () => {
    if (!birthDate || !name) return;

    const date = new Date(birthDate);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const moonDegree = ((dayOfYear * 13.176358) % 360);
    
    const nakshatra = nakshatras.find(n => 
      moonDegree >= n.range[0] && moonDegree < n.range[1]
    ) || nakshatras[0];

    setResult(nakshatra);
    setShowResult(true);
  };

  const reset = () => {
    setShowResult(false);
    setResult(null);
    setName('');
    setBirthDate('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16">
      <Card className="p-8 md:p-12 bg-card/90 backdrop-blur-sm border-primary shadow-cosmic">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-primary" />
            <h3 className="font-heading text-3xl font-bold text-foreground">
              Nakshatra Calculator
            </h3>
            <Star className="w-8 h-8 text-primary" />
          </div>
          <p className="font-body text-muted-foreground">
            Discover your Janma Nakshatra - your birth star constellation
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body text-foreground">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate" className="font-body text-foreground">
                Date of Birth
              </Label>
              <Input
                id="birthdate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>

            <Button
              size="lg"
              onClick={calculateNakshatra}
              disabled={!name || !birthDate}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Calculate My Nakshatra
            </Button>
          </div>
        ) : result ? (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 rounded-full bg-gradient-cosmic shadow-glow animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-foreground" />
              </div>
              
              <h4 className="font-heading text-2xl font-bold text-foreground">
                {name}'s Janma Nakshatra
              </h4>
            </div>

            <div className="bg-gradient-cosmic p-8 rounded-2xl space-y-4">
              <div className="text-center">
                <h5 className="font-heading text-4xl font-bold text-primary mb-2">
                  {result.name}
                </h5>
                <p className="font-body text-lg text-foreground/80">
                  {result.symbol}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-background/30 p-4 rounded-xl">
                  <p className="font-body text-sm text-muted-foreground mb-1">Ruling Deity</p>
                  <p className="font-heading text-xl font-semibold text-foreground">
                    {result.deity}
                  </p>
                </div>
                <div className="bg-background/30 p-4 rounded-xl">
                  <p className="font-body text-sm text-muted-foreground mb-1">Celestial Position</p>
                  <p className="font-heading text-xl font-semibold text-foreground">
                    {result.range[0].toFixed(2)}° - {result.range[1].toFixed(2)}°
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 p-6 rounded-xl border border-accent/30">
              <p className="font-body text-foreground/90 text-center leading-relaxed">
                ✨ Your birth star <span className="font-semibold text-primary">{result.name}</span> governs 
                your emotional nature and subconscious patterns. Ruled by <span className="font-semibold">{result.deity}</span>, 
                this nakshatra influences your innate talents and spiritual journey.
              </p>
            </div>

            <Button
              size="lg"
              onClick={reset}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
            >
              Calculate Another
            </Button>
          </div>
        ) : null}
      </Card>
    </div>
  );
};
