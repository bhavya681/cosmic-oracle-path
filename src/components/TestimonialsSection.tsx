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
    <section className="py-14 sm:py-20 md:py-24 px-2 xs:px-3 sm:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic opacity-20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 animate-fade-in px-2">
          <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-foreground leading-tight">
            Energy Flow of Wisdom
          </h2>
          <p className="font-body text-base xs:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories from souls touched by cosmic guidance
          </p>
        </div>

        <div
          className="
            grid
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-5 
            sm:gap-8
          "
        >
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="
                p-5 
                xs:p-6 
                sm:p-7 
                md:p-8 
                bg-card/80 
                backdrop-blur-sm 
                border-primary/30 
                hover:border-primary
                transition-all 
                duration-500 
                hover:scale-[1.025]
                hover:shadow-glow 
                animate-float
                rounded-xl
                shadow
                flex flex-col min-h-[270px] sm:min-h-[260px] justify-between
              "
              style={{ 
                animationDelay: `${index * 0.18}s`,
                animationDuration: `${6 + index}s`
              }}
            >
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <div className="flex gap-1 mb-2 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 xs:w-5 xs:h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="font-body text-foreground/80 leading-relaxed italic text-sm xs:text-base md:text-[1.06rem]">
                  "{testimonial.text}"
                </p>
              </div>
              <p className="font-heading text-base xs:text-lg font-semibold text-primary mt-4 sm:mt-6">
                — {testimonial.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
