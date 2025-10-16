import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

const moods = [
  { emoji: '😊', label: 'Joyful', color: 'from-yellow-400 to-orange-500' },
  { emoji: '😌', label: 'Calm', color: 'from-blue-400 to-cyan-500' },
  { emoji: '💪', label: 'Energetic', color: 'from-red-400 to-pink-500' },
  { emoji: '🧘', label: 'Peaceful', color: 'from-purple-400 to-indigo-500' },
  { emoji: '❤️', label: 'Loving', color: 'from-rose-400 to-pink-600' },
  { emoji: '🌟', label: 'Inspired', color: 'from-amber-400 to-yellow-500' },
];

export const EnergyAuraScanner = () => {
  const [name, setName] = useState('');
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [scanning, setScanning] = useState(false);
  const [showAura, setShowAura] = useState(false);

  const scanAura = () => {
    if (!name || !selectedMood) return;
    
    setScanning(true);
    setShowAura(false);
    
    setTimeout(() => {
      setScanning(false);
      setShowAura(true);
    }, 3000);
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-galaxy opacity-50" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-primary animate-pulse" />
            Energy Aura Scanner
            <Sparkles className="w-10 h-10 text-accent animate-pulse" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover your cosmic energy signature through name vibrations and emotional frequency
          </p>
        </div>

        <Card className="bg-card/80 backdrop-blur-xl border-primary/30 p-8 shadow-cosmic">
          <div className="space-y-6">
            <div>
              <label className="block text-foreground mb-2 font-semibold">Enter Your Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your sacred name..."
                className="bg-background/50 border-primary/30 text-foreground text-lg"
              />
            </div>

            <div>
              <label className="block text-foreground mb-4 font-semibold">Select Your Current Mood</label>
              <div className="grid grid-cols-3 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => setSelectedMood(mood)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedMood?.label === mood.label
                        ? 'border-primary bg-primary/20 shadow-glow'
                        : 'border-border bg-background/30'
                    }`}
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className="text-foreground text-sm">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={scanAura}
              disabled={!name || !selectedMood || scanning}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-6 text-lg font-bold hover:shadow-glow transition-all duration-300"
            >
              <Zap className="w-5 h-5 mr-2" />
              {scanning ? 'Scanning Your Energy...' : 'Scan My Aura'}
            </Button>
          </div>

          {scanning && (
            <div className="mt-8 flex flex-col items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-cosmic animate-spin-slow" />
                <div className="absolute inset-2 rounded-full bg-card" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
              </div>
              <p className="mt-4 text-foreground animate-pulse">Analyzing your energy field...</p>
            </div>
          )}

          {showAura && selectedMood && (
            <div className="mt-8 text-center">
              <div className="relative inline-block">
                <div className={`absolute inset-0 blur-3xl bg-gradient-to-r ${selectedMood.color} animate-pulse opacity-60`} />
                <div className={`absolute inset-0 blur-2xl bg-gradient-to-r ${selectedMood.color} animate-pulse opacity-80`} />
                <div className={`absolute inset-0 blur-xl bg-gradient-to-r ${selectedMood.color} animate-pulse`} />
                
                <div className="relative z-10 w-64 h-64 mx-auto rounded-full border-4 border-primary/50 bg-card/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{selectedMood.emoji}</div>
                    <p className="text-2xl font-bold text-foreground">{name}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold text-primary">Your Aura Color: {selectedMood.label}</h3>
                <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${selectedMood.color} text-white font-semibold shadow-glow`}>
                  Vibrating at {Math.floor(Math.random() * 50 + 450)} Hz
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your energy signature reveals a {selectedMood.label.toLowerCase()} frequency. 
                  This aura color resonates with your current emotional state and cosmic alignment.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};