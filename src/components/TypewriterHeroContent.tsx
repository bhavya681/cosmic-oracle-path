import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';

interface TypewriterHeroContentProps {
  scrollToJourney: () => void;
}

export const TypewriterHeroContent = ({ scrollToJourney }: TypewriterHeroContentProps) => {
  return (
    <div className="relative z-20 text-center px-4 max-w-5xl mx-auto animate-fade-in">
      <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-cosmic-lavender to-accent bg-clip-text text-transparent animate-pulse-glow">
        <TypeAnimation
          sequence={[
            'The Hidden Astrologer',
            1000,
            'Awaken the Mysteries of Your Soul',
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ display: 'inline-block' }}
          repeat={Infinity}
        />
      </h1>
      
      <p className="font-body text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
        Discover your divine story through Tarot cards, explore your Past Life journey, and receive personalized astrological consultations rooted in ancient Vedic wisdom.
      </p>

      <div className="mt-16 animate-bounce">
        <button
          onClick={scrollToJourney}
          className="text-primary/70 hover:text-primary transition-colors duration-300"
          aria-label="Scroll to journey section"
        >
          <ChevronDown className="w-8 h-8 mx-auto" />
        </button>
      </div>
    </div>
  );
};
