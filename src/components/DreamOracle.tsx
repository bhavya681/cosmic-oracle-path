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
    <section className="py-32 px-4 relative overflow-hidden bg-gradient-divine">
      {/* Dreamy floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl bg-mystic-gold/10"
            style={{
              width: `${Math.random() * 130 + 100}px`,
              height: `${Math.random() * 60 + 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Moon className="w-16 h-16 text-mystic-gold drop-shadow-[0_0_20px_hsl(43,74%,52%)] animate-pulse" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            Dream Oracle
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Unveil the hidden wisdom encoded in your nocturnal visions
          </p>
        </div>

        {!result && !isAnalyzing && (
          <Card className="p-12 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic animate-scale-in">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-mystic-gold/40 to-mystic-purple/40 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center backdrop-blur-sm border border-mystic-gold/30">
                    <Eye className="w-16 h-16 text-mystic-gold animate-pulse" />
                  </div>
                </div>
                
                <p className="text-foreground text-xl font-heading">
                  The Oracle awaits your dream...
                </p>
                <p className="text-muted-foreground">
                  Describe your dream in detail. Include any symbols, emotions, or vivid imagery.
                </p>
              </div>

              <div className="space-y-4">
                <Textarea
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  placeholder="I dreamed that I was walking through a misty forest when I encountered a glowing door..."
                  className="min-h-[200px] backdrop-blur-sm bg-muted/30 border-mystic-gold/30 text-foreground placeholder:text-muted-foreground focus:border-mystic-gold focus:ring-mystic-gold/50 resize-none text-lg"
                />
                
                <Button
                  onClick={analyzeDream}
                  disabled={!dream.trim()}
                  className="w-full bg-gradient-to-r from-mystic-gold to-mystic-purple hover:from-mystic-purple hover:to-mystic-gold text-lg py-8 font-heading tracking-wider shadow-gold transition-all duration-500 disabled:opacity-50"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Consult the Oracle
                </Button>
              </div>
            </div>
          </Card>
        )}

        {isAnalyzing && (
          <Card className="p-12 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic animate-scale-in">
            <div className="text-center space-y-8">
              <div className="relative w-40 h-40 mx-auto">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-mystic-gold/30"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: (i + 1) * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      margin: `${i * 10}px`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Eye className="w-20 h-20 text-mystic-gold animate-pulse" />
                </div>
              </div>

              <div className="space-y-4 text-foreground">
                <p className="text-2xl font-heading animate-pulse">
                  Consulting ancient wisdom...
                </p>
                <p className="text-lg text-muted-foreground">
                  Decoding the symbols of your unconscious
                </p>
              </div>
            </div>
          </Card>
        )}

        {result && !isAnalyzing && (
          <div className="space-y-8 animate-scale-in">
            <Card className="p-12 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 backdrop-blur-xl border-mystic-gold/40 shadow-divine relative overflow-hidden">
              {/* Mystical glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-mystic-gold/30 rounded-full blur-3xl animate-pulse-glow" />
              
              <div className="relative z-10 space-y-8">
                {/* Oracle Avatar */}
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-mystic-gold to-mystic-purple rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                      <Eye className="w-12 h-12 text-mystic-gold" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading text-mystic-gold mb-2">The Oracle Speaks</h3>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-mystic-gold to-transparent mx-auto" />
                </div>

                {/* Symbols Found */}
                {result.symbols.length > 0 && (
                  <div className="p-6 backdrop-blur-sm bg-muted/20 rounded-2xl border border-mystic-gold/30">
                    <h4 className="text-lg font-heading text-mystic-gold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Sacred Symbols Detected
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.symbols.map((symbol, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-mystic-gold/20 to-mystic-purple/20 rounded-full text-foreground text-sm font-medium border border-mystic-gold/40"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interpretation */}
                <div className="p-8 bg-gradient-to-br from-mystic-purple/20 to-card/50 rounded-2xl border border-mystic-gold/30 space-y-6 backdrop-blur-sm">
                  <div>
                    <h4 className="text-xl font-heading text-mystic-gold mb-4">Dream Interpretation</h4>
                    <p className="text-foreground/90 text-lg leading-relaxed italic">
                      "{result.interpretation}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-mystic-gold/20">
                    <h4 className="text-xl font-heading text-mystic-purple mb-4">Divine Guidance</h4>
                    <p className="text-foreground/90 text-lg leading-relaxed">
                      {result.guidance}
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm italic">
                    ✨ May your dreams continue to illuminate your sacred path ✨
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center">
              <Button
                onClick={reset}
                className="bg-muted/40 hover:bg-muted/60 backdrop-blur-sm border border-mystic-gold/30 font-heading px-12 py-6 shadow-gold transition-all duration-500 hover:scale-105 text-lg"
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
