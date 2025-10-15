import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/cosmic-hero.jpg';

export const HeroSection = () => {
  const scrollToJourney = () => {
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-cosmic-lavender to-accent bg-clip-text text-transparent animate-pulse-glow">
          Journey Through the Mystical
          <br />
          Dimensions of the Self
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Experience mastery in Palmistry, Tarot, Astrology, Reiki, Vastu & Past-Life Regression
        </p>

        <Button
          size="lg"
          onClick={scrollToJourney}
          className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
        >
          <span className="relative z-10">Begin Your Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-cosmic-lavender to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Button>

        <div className="mt-16 animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-primary" />
        </div>
      </div>
    </section>
  );
};
