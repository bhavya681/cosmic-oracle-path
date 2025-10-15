import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative py-16 px-4 border-t border-border/50 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Cosmic Wisdom
            </h3>
            <p className="font-body text-foreground/70 leading-relaxed">
              Guiding souls through mystical dimensions of self-discovery, healing, and spiritual awakening.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Services
            </h3>
            <ul className="space-y-2 font-body text-foreground/70">
              <li className="hover:text-primary transition-colors cursor-pointer">Palmistry</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Tarot Reading</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Astrology</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Reiki Healing</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Past-Life Regression</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Vastu Shastra</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Connect
            </h3>
            <div className="space-y-3">
              <a href="mailto:cosmic@mystic.com" className="flex items-center gap-3 font-body text-foreground/70 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                cosmic@mystic.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 font-body text-foreground/70 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300">
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="font-body text-foreground/60 italic">
            ✨ Guiding You Beyond Time, Through Energy and Stars ✨
          </p>
          <p className="font-body text-sm text-foreground/40 mt-2">
            © 2025 Cosmic Mystic Master. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
