import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Moon, Eye } from 'lucide-react';

const dreamSymbols: Record<string, string> = {
  water: 'emotions, subconscious, purification, or the flow of life',
  fire: 'transformation, passion, destruction, or enlightenment',
  flying: 'freedom, transcendence, or escape from limitations',
  falling: 'loss of control, fear, or a need to ground yourself',
  snake: 'transformation, healing, hidden knowledge, or primal energy',
  death: 'endings, transformation, rebirth, or major life changes',
  house: 'your psyche, different aspects of self, or security',
  forest: 'the unconscious, unknown territory, or spiritual journey',
  ocean: 'vast emotions, the collective unconscious, or infinite potential',
  mountain: 'obstacles, spiritual ascent, or higher perspective',
  mirror: 'self-reflection, truth, or confronting your shadow',
  door: 'opportunity, transition, or new beginnings',
  key: 'solutions, unlocking potential, or hidden knowledge',
  bridge: 'transition, connection, or crossing into new territory',
  animal: 'instincts, primal nature, or spirit guides',
  light: 'awareness, divine guidance, or illumination',
  darkness: 'unknown, fear, unconscious, or mystery',
  chase: 'avoidance, running from something, or unresolved issues',
  naked: 'vulnerability, authenticity, or fear of exposure',
  teeth: 'power, confidence, communication, or loss of control',
};

const generateInterpretation = (dream: string): { symbols: string[], interpretation: string, guidance: string } => {
  const lowerDream = dream.toLowerCase();
  const foundSymbols: string[] = [];
  
  Object.keys(dreamSymbols).forEach(symbol => {
    if (lowerDream.includes(symbol)) {
      foundSymbols.push(symbol);
    }
  });

  // Create interpretation based on found symbols
  let interpretation = '';
  let guidance = '';

  if (foundSymbols.length === 0) {
    interpretation = `Your dream speaks of inner mysteries that transcend common symbols. The soul weaves narratives unique to each seeker. What you experienced holds personal significance that only your heart can fully decode.`;
    guidance = `Trust your intuition about this dream's meaning. Journal about the emotions it stirred within you. The unconscious speaks in a language beyond words—feel into the dream's essence.`;
  } else {
    const symbolMeanings = foundSymbols.map(s => `${s} (${dreamSymbols[s]})`).join(', ');
    interpretation = `I perceive the sacred symbols woven through your dream: ${symbolMeanings}. These archetypal energies dance together in your unconscious, revealing a tapestry of transformation. `;
    
    if (foundSymbols.includes('water') || foundSymbols.includes('ocean')) {
      interpretation += `The waters speak of emotional currents moving through your being. You are being called to dive deep into feelings you may have been avoiding. `;
      guidance = `Allow yourself to feel fully. Tears are sacred—let them flow. Emotional release brings purification and renewal.`;
    } else if (foundSymbols.includes('fire') || foundSymbols.includes('light')) {
      interpretation += `The flames of transformation illuminate your path. Old patterns are burning away to make space for your rebirth. `;
      guidance = `Embrace the changes occurring within you. What burns away was meant to be released. Trust the transformative fire.`;
    } else if (foundSymbols.includes('flying') || foundSymbols.includes('bridge')) {
      interpretation += `Your spirit yearns for transcendence and freedom. You stand at a threshold between worlds, ready to cross into new possibilities. `;
      guidance = `Take the leap your soul is urging you toward. Trust that you have wings, even when you cannot see them.`;
    } else if (foundSymbols.includes('death') || foundSymbols.includes('snake')) {
      interpretation += `The ancient dance of death and rebirth calls to you. Transformation is not to be feared but welcomed as sacred evolution. `;
      guidance = `Release what no longer serves you. Death in dreams is rarely literal—it speaks of necessary endings that birth new beginnings.`;
    } else {
      interpretation += `These symbols converge to illuminate your inner landscape. Your unconscious is speaking—are you listening? `;
      guidance = `Meditate on these symbols. Ask yourself: What part of me does each represent? How are they interacting in my waking life?`;
    }
  }

  return { symbols: foundSymbols, interpretation, guidance };
};

export const DreamOracle = () => {
  const [dream, setDream] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ symbols: string[], interpretation: string, guidance: string } | null>(null);

  const analyzeDream = () => {
    if (!dream.trim()) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const analysis = generateInterpretation(dream);
      setResult(analysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const reset = () => {
    setDream('');
    setResult(null);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950">
      {/* Dreamy floating clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 rounded-full blur-3xl animate-float"
            style={{
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 150 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 20}s`,
            }}
          />
        ))}
      </div>

      {/* Flowing light patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-glow" 
          style={{ animationDuration: '8s' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white flex items-center justify-center gap-4">
            <Moon className="w-12 h-12 text-cyan-300 animate-pulse" />
            Dream Oracle
            <Eye className="w-12 h-12 text-purple-300 animate-pulse" />
          </h2>
          <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            🌙 Unveil the hidden wisdom of your nocturnal visions 🌙
          </p>
        </div>

        {!result && !isAnalyzing && (
          <Card className="p-8 md:p-12 bg-white/10 backdrop-blur-md border-white/20 shadow-cosmic animate-scale-in">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/50 to-purple-500/50 rounded-full animate-pulse-glow" />
                  <div className="absolute inset-4 bg-indigo-900/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-16 h-16 text-cyan-300 animate-pulse" />
                  </div>
                </div>
                
                <p className="text-white text-xl font-semibold">
                  The priestess awaits your dream...
                </p>
                <p className="text-white/80 text-sm">
                  Describe your dream in detail. Include any symbols, emotions, or vivid imagery.
                </p>
              </div>

              <div className="space-y-4">
                <Textarea
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  placeholder="I dreamed that I was walking through a misty forest when I encountered a glowing door..."
                  className="min-h-[200px] bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-cyan-400 focus:ring-cyan-400/50 resize-none"
                />
                
                <Button
                  onClick={analyzeDream}
                  disabled={!dream.trim()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Consult the Oracle
                </Button>
              </div>
            </div>
          </Card>
        )}

        {isAnalyzing && (
          <Card className="p-12 bg-white/10 backdrop-blur-md border-white/20 shadow-cosmic animate-scale-in">
            <div className="text-center space-y-8">
              <div className="relative w-40 h-40 mx-auto">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-cyan-400/30 animate-spin"
                    style={{
                      margin: `${i * 15}px`,
                      animationDuration: `${(i + 1) * 2}s`,
                      animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="w-20 h-20 text-cyan-300 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4 text-white">
                <p className="text-2xl font-semibold animate-pulse">
                  The priestess channels ancient wisdom...
                </p>
                <p className="text-lg opacity-80">
                  Decoding the symbols of your unconscious
                </p>
              </div>
            </div>
          </Card>
        )}

        {result && !isAnalyzing && (
          <div className="space-y-8 animate-scale-in">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-cyan-900/40 to-purple-900/40 backdrop-blur-md border-cyan-400/30 shadow-cosmic relative overflow-hidden">
              {/* Mystical avatar glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl animate-pulse-glow" />
              
              <div className="relative z-10 space-y-8">
                {/* Priestess Avatar */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full animate-pulse-glow" />
                    <div className="absolute inset-2 bg-indigo-950 rounded-full flex items-center justify-center">
                      <Eye className="w-12 h-12 text-cyan-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">The Oracle Speaks</h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
                </div>

                {/* Symbols Found */}
                {result.symbols.length > 0 && (
                  <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <h4 className="text-lg font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Sacred Symbols Detected
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.symbols.map((symbol, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full text-white text-sm font-medium border border-cyan-400/30"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interpretation */}
                <div className="p-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl border border-cyan-400/20 space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-300 mb-4">Dream Interpretation</h4>
                    <p className="text-white/90 text-lg leading-relaxed italic">
                      "{result.interpretation}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-xl font-semibold text-purple-300 mb-4">Divine Guidance</h4>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {result.guidance}
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-white/60 text-sm italic">
                    ✨ May your dreams continue to illuminate your path ✨
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={reset}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
              >
                <Moon className="w-5 h-5 mr-2" />
                Interpret Another Dream
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
