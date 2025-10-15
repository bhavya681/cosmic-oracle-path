import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Hand, Sparkles, Moon, Heart, Home, Eye } from 'lucide-react';
import masterPortrait from '@/assets/master-portrait.jpg';

const services = [
  {
    icon: Hand,
    title: "Palmistry",
    description: "Unlock the secrets written in your hands, revealing your life's path and hidden potential."
  },
  {
    icon: Sparkles,
    title: "Tarot Reading",
    description: "Divine guidance through ancient cards, illuminating answers to your deepest questions."
  },
  {
    icon: Moon,
    title: "Astrology",
    description: "Navigate life's journey with celestial wisdom from planetary alignments and cosmic energies."
  },
  {
    icon: Heart,
    title: "Reiki Healing",
    description: "Experience profound energy healing that restores balance and awakens your inner vitality."
  },
  {
    icon: Eye,
    title: "Past-Life Regression",
    description: "Journey through time to heal karmic patterns and understand your soul's eternal evolution."
  },
  {
    icon: Home,
    title: "Vastu Shastra",
    description: "Harmonize your living spaces with ancient architectural wisdom for prosperity and peace."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Master Introduction */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-cosmic blur-xl animate-pulse-glow" />
            <img 
              src={masterPortrait} 
              alt="Master of Mystical Arts" 
              className="relative w-full h-full rounded-full object-cover border-4 border-primary shadow-glow"
            />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Master of Mystical Arts
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            With decades of experience across multiple spiritual disciplines, I guide seekers on their path to enlightenment, healing, and self-discovery through time-honored sacred practices.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.title}
                className="group p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-glow cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-cosmic flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-500">
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-foreground/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105"
          >
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  );
};
