import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Wind, Sparkles } from 'lucide-react';
import fengShuiImg from '@/assets/feng-shui.jpg';

const baguaAreas = [
  { name: 'Wealth & Prosperity', element: 'Wood', color: 'Purple/Green', direction: 'Southeast', tip: 'Add water features and purple accents' },
  { name: 'Fame & Reputation', element: 'Fire', color: 'Red', direction: 'South', tip: 'Use candles and red items to boost recognition' },
  { name: 'Love & Relationships', element: 'Earth', color: 'Pink/Red', direction: 'Southwest', tip: 'Place pairs of items and fresh flowers' },
  { name: 'Family & Health', element: 'Wood', color: 'Green', direction: 'East', tip: 'Add plants and family photos' },
  { name: 'Children & Creativity', element: 'Metal', color: 'White', direction: 'West', tip: 'Display creative works and metal objects' },
  { name: 'Knowledge & Wisdom', element: 'Earth', color: 'Blue/Black', direction: 'Northeast', tip: 'Create a peaceful study space' },
  { name: 'Career & Life Path', element: 'Water', color: 'Black/Blue', direction: 'North', tip: 'Add water elements and dark colors' },
  { name: 'Helpful People', element: 'Metal', color: 'Gray/Silver', direction: 'Northwest', tip: 'Display images of mentors and helpers' },
];

export const FengShui = () => {
  const [selectedArea, setSelectedArea] = useState<typeof baguaAreas[0] | null>(null);

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-divine">
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-mystic-gold/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-20">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Wind className="w-16 h-16 text-mystic-gold mx-auto drop-shadow-[0_0_20px_hsl(43,74%,52%)]" />
          </motion.div>
          <h2 className="font-heading text-5xl md:text-7xl mb-6 bg-gradient-to-r from-mystic-gold via-mystic-white to-mystic-gold bg-clip-text text-transparent tracking-wide">
            Vastu & Feng Shui
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Harmonize your sacred space with ancient wisdom for prosperity and peace
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <img 
              src={fengShuiImg} 
              alt="Feng Shui Bagua" 
              className="rounded-2xl shadow-mystic w-full h-auto"
            />
            
            <Card className="p-8 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
              <h3 className="font-heading text-2xl mb-6 flex items-center gap-3 text-mystic-gold">
                <Home className="w-6 h-6" />
                Bagua Map Areas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {baguaAreas.map((area) => (
                  <Button
                    key={area.name}
                    onClick={() => setSelectedArea(area)}
                    variant={selectedArea?.name === area.name ? "default" : "outline"}
                    className={`text-sm h-auto py-3 px-4 font-heading ${
                      selectedArea?.name === area.name
                        ? 'bg-gradient-to-r from-mystic-gold to-mystic-purple shadow-gold'
                        : 'border-mystic-gold/30 hover:border-mystic-gold/60'
                    }`}
                  >
                    {area.name.split('&')[0]}
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {selectedArea ? (
              <motion.div
                key={selectedArea.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-10 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic">
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-3xl text-mystic-gold mb-3 tracking-wide">
                        {selectedArea.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Sparkles className="w-5 h-5 text-mystic-gold" />
                        <span className="text-lg">Direction: {selectedArea.direction}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-xl border border-mystic-gold/30">
                        <p className="text-sm text-muted-foreground mb-2">Element</p>
                        <p className="font-heading text-xl text-mystic-gold">{selectedArea.element}</p>
                      </div>
                      <div className="p-6 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-xl border border-mystic-gold/30">
                        <p className="text-sm text-muted-foreground mb-2">Color</p>
                        <p className="font-heading text-xl text-mystic-gold">{selectedArea.color}</p>
                      </div>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-mystic-purple/20 to-mystic-gold/10 rounded-2xl border border-mystic-gold/40 shadow-divine backdrop-blur-sm">
                      <p className="text-sm font-heading text-mystic-gold mb-4">Enhancement Tip</p>
                      <p className="text-foreground/90 text-lg leading-relaxed">{selectedArea.tip}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-10 backdrop-blur-xl bg-card/40 border-mystic-gold/30 shadow-mystic h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Wind className="w-20 h-20 mx-auto mb-6 text-mystic-gold/40" />
                  <p className="text-lg font-light">Select a Bagua area to see harmonization tips</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
