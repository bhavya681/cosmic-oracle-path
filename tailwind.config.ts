import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mystic: {
          midnight: "hsl(var(--midnight-blue))",
          purple: "hsl(var(--royal-purple))",
          gold: "hsl(var(--metallic-gold))",
          white: "hsl(var(--crystal-white))",
          deep: "hsl(var(--deep-mystic))",
          glow: "hsl(var(--mystic-glow))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Cinzel Decorative', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-mystic': 'var(--gradient-mystic)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-sacred': 'var(--gradient-sacred)',
        'gradient-divine': 'var(--gradient-divine)',
      },
      boxShadow: {
        'gold': 'var(--shadow-gold)',
        'mystic': 'var(--shadow-mystic)',
        'divine': 'var(--shadow-divine)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        "pulse-glow": {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        "shimmer": {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        "rotate-slow": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        "fade-in": {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "scale-in": {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        "mystic-glow": {
          '0%, 100%': { boxShadow: '0 0 20px hsl(43 74% 52% / 0.3)' },
          '50%': { boxShadow: '0 0 60px hsl(43 74% 52% / 0.8)' },
        },
        "sacred-pulse": {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        "particle-rise": {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-50px)' },
        },
        "orbit": {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "mystic-glow": "mystic-glow 3s ease-in-out infinite",
        "sacred-pulse": "sacred-pulse 2s ease-in-out infinite",
        "particle-rise": "particle-rise 4s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
