import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    text: "The past-life regression session was transformative. I finally understand patterns that have been affecting me for years.",
    rating: 5
  },
  {
    name: "Rajesh K.",
    text: "The Vastu consultation brought incredible peace to our home. The energy shift was felt immediately by the entire family.",
    rating: 5
  },
  {
    name: "Emily R.",
    text: "The tarot reading was remarkably accurate and provided clarity during a challenging time in my life. Truly gifted.",
    rating: 5
  },
  {
    name: "Michael T.",
    text: "Reiki healing sessions helped me overcome chronic stress. The master's wisdom and energy work is profound.",
    rating: 5
  },
  {
    name: "Priya S.",
    text: "The astrological insights were incredibly detailed and have guided major life decisions with remarkable accuracy.",
    rating: 5
  },
  {
    name: "David L.",
    text: "Palmistry reading revealed aspects of my personality and future that resonated deeply. A truly enlightening experience.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Energy Flow of Wisdom
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground">
            Stories from souls touched by cosmic guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-glow animate-float"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${6 + index}s`
              }}
            >
              <div className="space-y-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-body text-foreground/80 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <p className="font-heading text-lg font-semibold text-primary">
                  — {testimonial.name}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
