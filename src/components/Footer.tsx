import { Facebook, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import HiddenAstrologer from "../../public/hiddenastrologerlogo.jpg";
import { useState } from "react";

export const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="relative py-16 px-4 border-t border-border/50 overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />
      <div className="absolute inset-0 opacity-25 pointer-events-none select-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
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
          <div className="space-y-4 flex flex-col items-center md:items-start">
            {/* Professional Logo */}
            <div
              className="logo-container w-32 h-32 mb-8 rounded-full shadow-cosmic bg-card/90 border-4 border-gradient-to-br from-primary via-accent to-cosmic-purple overflow-hidden flex items-center justify-center ring-2 ring-cosmic-lavender/50
                transition-shadow transition-transform duration-700"
              style={{ position: "relative" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={HiddenAstrologer}
                alt="The Hidden Astrologer"
                className={`object-cover w-full h-full transition-all duration-700 drop-shadow-lg`}
                style={{
                  objectPosition: "center 92%",
                  transform: isHovered
                    ? "scale(1.45) rotate(-2deg)"
                    : "scale(1.36) rotate(0deg)",
                  filter: isHovered
                    ? "drop-shadow(0 6px 40px hsla(var(--cosmic-purple),0.23)) saturate(1.20) brightness(1.07) blur(0.5px)"
                    : "drop-shadow(0 6px 28px hsla(var(--primary),0.14)) saturate(1.13) brightness(1.11)",
                  transition:
                    "transform 0.8s cubic-bezier(.77,0,.18,1), filter 0.8s cubic-bezier(.77,0,.18,1)",
                }}
                loading="eager"
              />
              {/* Mystic Aura Glow Overlay */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 rounded-full z-10 transition-all duration-800 ease-[cubic-bezier(.7,0,.18,1)] ${
                  isHovered
                    ? "opacity-70 animate-mystic-glow"
                    : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse at 55% 60%, hsla(var(--cosmic-purple, 255, 140, 255),0.18) 0%, transparent 80%), radial-gradient(ellipse at 45% 40%, hsla(var(--primary, 250,180,100),0.16) 15%, transparent 70%)",
                  mixBlendMode: "screen",
                  pointerEvents: "none"
                }}
              />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground text-center md:text-left">
              The Hidden Astrologer
            </h3>
            <p className="font-body text-foreground/70 leading-relaxed text-center md:text-left">
              Step beyond the veil of the ordinary. Explore <strong>Tarot, Past Life insights,</strong> and
              <strong> Vedic Astrology</strong> to uncover your soul’s journey, hidden energies, and divine purpose.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Explore
            </h3>
            <ul className="space-y-2 font-body text-foreground/70">
              <li>
                <a href="#tarrot" className="hover:text-primary transition-colors cursor-pointer">
                  Tarot Readings
                </a>
              </li>
              <li>
                <a href="#pastlife" className="hover:text-primary transition-colors cursor-pointer">
                  Past Life Analysis
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors cursor-pointer">
                  Astrology Consultation
                </a>
              </li>
              <li>
                <a href="#numerology" className="hover:text-primary transition-colors cursor-pointer">
                  Numerology
                </a>
              </li>
              <li>
                <a href="#nakshatra" className="hover:text-primary transition-colors cursor-pointer">
                  Nakshatra Insights
                </a>
              </li>
              <li>
                <a href="#palmistry" className="hover:text-primary transition-colors cursor-pointer">
                  Palmistry
                </a>
              </li>
              <li>
                <a
                  href="https://hanuman-mantra-scroll.vercel.app/"
                  className="hover:text-primary transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spirituality & Mantras
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold text-foreground">
              Connect With Us
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:thehiddenastrologer03@gmail.com"
                className="flex items-center gap-3 font-body text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                thehiddenastrologer03@gmail.com
              </a>
              <a
                href="tel:+917798807904"
                className="flex items-center gap-3 font-body text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91 77988 07904
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://facebook.com/thehiddenastrologer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/thehiddenastrologer/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://www.youtube.com/@thehiddenastrologer-g9r8b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="font-body text-foreground/60 italic">
            ✨ “Guiding You Through Time, Stars & Past Lives” ✨
          </p>
          <p className="font-body text-sm text-foreground/40 mt-2">
            © 2025 The Hidden Astrologer. All rights reserved.
          </p>
        </div>
      </div>
      {/* Custom glow animation for mystic effect */}
      <style>
        {`
          @keyframes mystic-glow {
            0% { opacity: 0.6; box-shadow: 0 0 36px 12px hsla(262,94%,76%,0.11); filter: blur(0.5px);}
            33% { opacity: 1;   box-shadow: 0 0 44px 18px hsla(250,85%,70%,0.21); filter: blur(1px);}
            66% { opacity: 0.85; box-shadow: 0 0 38px 14px hsla(278,92%,54%,0.13); filter: blur(0.6px);}
            100%{ opacity: 0.6; box-shadow: 0 0 36px 12px hsla(262,94%,76%,0.11); filter: blur(0.5px);}
          }
          .animate-mystic-glow {
            animation: mystic-glow 2.5s cubic-bezier(.79,0,.21,1) infinite;
          }
        `}
      </style>
    </footer>
  );
};
