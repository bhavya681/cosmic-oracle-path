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
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-emerald-950/10 to-background">
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-emerald-500/10 rounded-full"
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
        <div className="text-center mb-16">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Wind className="w-12 h-12 text-emerald-500 mx-auto" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 bg-clip-text text-transparent">
            Vastu & Feng Shui
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Harmonize your space with ancient wisdom for prosperity and peace
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <img 
              src={fengShuiImg} 
              alt="Feng Shui Bagua" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            <Card className="p-6 backdrop-blur-sm bg-card/50 border-emerald-500/20">
              <h3 className="font-heading text-xl mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-emerald-500" />
                Bagua Map Areas
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {baguaAreas.map((area) => (
                  <Button
                    key={area.name}
                    onClick={() => setSelectedArea(area)}
                    variant={selectedArea?.name === area.name ? "default" : "outline"}
                    className="text-xs h-auto py-2 px-3"
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
          >
            {selectedArea ? (
              <motion.div
                key={selectedArea.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-8 backdrop-blur-sm bg-card/50 border-emerald-500/20">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-heading text-2xl text-emerald-400 mb-2">
                        {selectedArea.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="w-4 h-4" />
                        <span>Direction: {selectedArea.direction}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Element</p>
                        <p className="font-semibold text-emerald-400">{selectedArea.element}</p>
                      </div>
                      <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Color</p>
                        <p className="font-semibold text-emerald-400">{selectedArea.color}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
                      <p className="text-sm font-semibold text-emerald-400 mb-2">Enhancement Tip</p>
                      <p className="text-foreground/90">{selectedArea.tip}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-emerald-500/20 h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Wind className="w-16 h-16 mx-auto mb-4 text-emerald-500/30" />
                  <p>Select a Bagua area to see harmonization tips</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
