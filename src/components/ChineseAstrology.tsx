import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Calendar } from 'lucide-react';
import chineseZodiacImg from '@/assets/chinese-zodiac.jpg';

const chineseZodiac = [
  { animal: 'Rat', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020], traits: 'Quick-witted, resourceful, versatile, kind', element: 'Water' },
  { animal: 'Ox', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021], traits: 'Diligent, dependable, strong, determined', element: 'Earth' },
  { animal: 'Tiger', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022], traits: 'Brave, confident, competitive, unpredictable', element: 'Wood' },
  { animal: 'Rabbit', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023], traits: 'Quiet, elegant, kind, responsible', element: 'Wood' },
  { animal: 'Dragon', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024], traits: 'Confident, intelligent, enthusiastic', element: 'Earth' },
  { animal: 'Snake', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025], traits: 'Enigmatic, intelligent, wise', element: 'Fire' },
  { animal: 'Horse', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014], traits: 'Animated, active, energetic', element: 'Fire' },
  { animal: 'Goat', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015], traits: 'Calm, gentle, sympathetic', element: 'Earth' },
  { animal: 'Monkey', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016], traits: 'Sharp, smart, curiosity', element: 'Metal' },
  { animal: 'Rooster', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017], traits: 'Observant, hardworking, courageous', element: 'Metal' },
  { animal: 'Dog', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018], traits: 'Lovely, honest, prudent', element: 'Earth' },
  { animal: 'Pig', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019], traits: 'Compassionate, generous, diligent', element: 'Water' },
];

export const ChineseAstrology = () => {
  const [birthYear, setBirthYear] = useState('');
  const [result, setResult] = useState<typeof chineseZodiac[0] | null>(null);

  const findZodiac = () => {
    const year = parseInt(birthYear);
    if (year < 1900 || year > 2030) return;
    
    const zodiac = chineseZodiac.find(z => z.years.includes(year));
    if (zodiac) setResult(zodiac);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-background to-background" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-red-500 mx-auto" />
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl mb-4 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
            Chinese Astrology & Face Reading
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover your Chinese zodiac animal and the ancient wisdom of your birth year
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src={chineseZodiacImg} 
              alt="Chinese Zodiac" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 backdrop-blur-md bg-card/60 border-red-500/30 shadow-mystic">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Enter Your Birth Year</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="e.g., 1990"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={findZodiac} className="bg-gradient-to-r from-red-500 to-yellow-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reveal
                    </Button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key={result.animal}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="text-center p-6 bg-gradient-to-br from-red-500/20 to-mystic-gold/10 rounded-xl border border-red-500/30 shadow-divine backdrop-blur-sm">
                        <h3 className="font-heading text-3xl mb-2 text-red-500">
                          {result.animal}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">Element: {result.element}</p>
                        <p className="text-foreground/80">{result.traits}</p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">Your Years</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.years.map(year => (
                            <span key={year} className="px-3 py-1 bg-red-500/20 rounded-full text-xs">
                              {year}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
