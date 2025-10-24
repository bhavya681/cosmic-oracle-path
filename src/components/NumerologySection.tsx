import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles, Star, Moon, Heart, Brain, Shield } from "lucide-react";

interface NumerologyData {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  maturity: number;
  challenge: number;
  pinnacle: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
}

interface NumerologyInterpretation {
  lifePath: {
    number: number;
    meaning: string;
    traits: string[];
    challenges: string[];
    advice: string;
  };
  destiny: {
    number: number;
    meaning: string;
    career: string[];
    purpose: string;
  };
  soulUrge: {
    number: number;
    meaning: string;
    desires: string[];
    motivation: string;
  };
  personality: {
    number: number;
    meaning: string;
    traits: string[];
    appearance: string;
  };
}

// Card/board color spec remains similar (purple, blue, green, etc)
const numerologyCells = [
  {
    key: "lifePath",
    label: "Life Path",
    icon: Star,
    bg: "from-purple-900/70 to-black border-purple-700",
    text: "text-purple-300",
    desc: "Your life's purpose",
  },
  {
    key: "destiny",
    label: "Destiny",
    icon: Moon,
    bg: "from-blue-900/70 to-black border-blue-700",
    text: "text-blue-300",
    desc: "Your life's mission",
  },
  {
    key: "soulUrge",
    label: "Soul Urge",
    icon: Heart,
    bg: "from-pink-900/70 to-black border-pink-700",
    text: "text-pink-300",
    desc: "Your inner desires",
  },
  {
    key: "personality",
    label: "Personality",
    icon: Brain,
    bg: "from-green-900/70 to-black border-green-700",
    text: "text-green-300",
    desc: "How others see you",
  },
];

export default function NumerologySection() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
  });
  const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null);
  const [interpretation, setInterpretation] = useState<NumerologyInterpretation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  // Life Path Calculation - Modern, component-based reduction
  const calculateLifePath = (dateOfBirth: string): number => {
    // Expects YYYY-MM-DD
    if (!dateOfBirth || typeof dateOfBirth !== 'string') return 1;
    const parts = dateOfBirth.split("-");
    if (parts.length !== 3) return 1;
    const [yearStr, monthStr, dayStr] = parts;

    const reduceComponent = (component: string): number => {
      // Reduce each component to a single/master number
      let n = component
        .split('')
        .map(Number)
        .filter(v => !isNaN(v))
        .reduce((sum, d) => sum + d, 0);
      while (n !== 11 && n !== 22 && n !== 33 && n > 9) {
        n = n
          .toString()
          .split("")
          .reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return n;
    };
    const month = reduceComponent(monthStr);
    const day = reduceComponent(dayStr);
    const year = reduceComponent(yearStr);

    let total = month + day + year;
    // Final reduction according to master number rules
    while (total !== 11 && total !== 22 && total !== 33 && total > 9) {
      total = total.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return total;
  };

  const reduceToSingleDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateDestiny = (fullName: string): number => {
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };
    const name = fullName.replace(/\s/g, '').toUpperCase();
    let sum = 0;
    for (let char of name) {
      if (letterValues[char]) {
        sum += letterValues[char];
      }
    }
    return reduceToSingleDigit(sum);
  };

  const calculateSoulUrge = (fullName: string): number => {
    const vowelValues: { [key: string]: number } = {
      'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3, 'Y': 7
    };
    const name = fullName.replace(/\s/g, '').toUpperCase();
    let sum = 0;
    for (let char of name) {
      if (vowelValues[char]) {
        sum += vowelValues[char];
      }
    }
    return reduceToSingleDigit(sum);
  };

  const calculatePersonality = (fullName: string): number => {
    const consonantValues: { [key: string]: number } = {
      'B': 2, 'C': 3, 'D': 4, 'F': 6, 'G': 7, 'H': 8, 'J': 1, 'K': 2, 'L': 3,
      'M': 4, 'N': 5, 'P': 7, 'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'V': 4, 'W': 5, 'X': 6, 'Z': 8
    };
    const name = fullName.replace(/\s/g, '').toUpperCase();
    let sum = 0;
    for (let char of name) {
      if (consonantValues[char]) {
        sum += consonantValues[char];
      }
    }
    return reduceToSingleDigit(sum);
  };

  const getInterpretation = (data: NumerologyData): NumerologyInterpretation => {
    // interpret logic as original
    const interpretations: { [key: number]: any } = {
      1: {
        lifePath: {...{number: 1, meaning: "The Leader - You are a natural-born leader with strong willpower and determination.", traits: ["Independent", "Ambitious", "Pioneering", "Courageous", "Original"], challenges: ["Impatience", "Dominance", "Self-centeredness"], advice: "Focus on collaboration and consider others' perspectives. Your leadership will be most effective when you inspire rather than command."}},
        destiny: {...{number: 1, meaning: "You are destined to be a pioneer and leader in your chosen field.", career: ["Entrepreneur", "CEO", "Manager", "Inventor", "Politician"], purpose: "To lead and inspire others through your innovative ideas and strong determination."}},
        soulUrge: {...{number: 1, meaning: "You desire independence, recognition, and the ability to lead others.", desires: ["Success", "Recognition", "Independence", "Leadership"], motivation: "The drive to be first, to lead, and to achieve something significant."}},
        personality: {...{number: 1, meaning: "You appear confident, strong-willed, and naturally authoritative.", traits: ["Confident", "Determined", "Ambitious", "Direct"], appearance: "Strong presence, confident posture, direct eye contact"}}},
      2: {
        lifePath: {...{number: 2, meaning: "The Diplomat - You are a natural peacemaker with strong intuitive abilities.", traits: ["Cooperative", "Intuitive", "Diplomatic", "Patient", "Supportive"], challenges: ["Over-sensitivity", "Indecisiveness", "Dependency"], advice: "Trust your intuition and don't be afraid to make decisions. Your diplomatic skills are valuable, but don't lose yourself in others' needs."}},
        destiny: {...{number: 2, meaning: "You are destined to work in partnership and help others achieve their goals.", career: ["Counselor", "Mediator", "Teacher", "Healer", "Artist"], purpose: "To bring harmony and balance to relationships and situations."}},
        soulUrge: {...{number: 2, meaning: "You desire harmony, partnership, and meaningful relationships.", desires: ["Love", "Partnership", "Harmony", "Peace"], motivation: "The need to create balance and harmony in all relationships."}},
        personality: {...{number: 2, meaning: "You appear gentle, caring, and approachable.", traits: ["Gentle", "Caring", "Patient", "Understanding"], appearance: "Soft features, gentle demeanor, warm smile"}}},
      3: {
        lifePath: {...{number: 3, meaning: "The Creative - You are naturally artistic and expressive with a gift for communication.", traits: ["Creative", "Expressive", "Optimistic", "Social", "Artistic"], challenges: ["Scattered energy", "Superficiality", "Self-doubt"], advice: "Focus your creative energy and don't be afraid to express your true self. Your creativity is a gift that can inspire others."}},
        destiny: {...{number: 3, meaning: "You are destined to inspire others through your creative expression.", career: ["Artist", "Writer", "Performer", "Communicator", "Designer"], purpose: "To inspire and uplift others through creative expression and joyful communication."}},
        soulUrge: {...{number: 3, meaning: "You desire creative expression, joy, and social recognition.", desires: ["Creativity", "Joy", "Recognition", "Social connection"], motivation: "The need to express yourself creatively and bring joy to others."}},
        personality: {...{number: 3, meaning: "You appear vibrant, creative, and full of life.", traits: ["Vibrant", "Creative", "Optimistic", "Charming"], appearance: "Expressive face, colorful style, animated gestures"}}},
      4: {
        lifePath: {...{number: 4, meaning: "The Builder - You are practical, reliable, and methodical in your approach to life.", traits: ["Practical", "Reliable", "Hardworking", "Organized", "Stable"], challenges: ["Rigidity", "Stubbornness", "Resistance to change"], advice: "While structure is important, be open to new ideas and changes. Your reliability is valuable, but flexibility can lead to growth."}},
        destiny: {...{number: 4, meaning: "You are destined to build solid foundations and create lasting structures.", career: ["Engineer", "Architect", "Manager", "Accountant", "Builder"], purpose: "To create order, stability, and lasting value through systematic work."}},
        soulUrge: {...{number: 4, meaning: "You desire security, stability, and tangible results.", desires: ["Security", "Stability", "Order", "Achievement"], motivation: "The need to build something lasting and meaningful."}},
        personality: {...{number: 4, meaning: "You appear dependable, organized, and trustworthy.", traits: ["Dependable", "Organized", "Practical", "Reliable"], appearance: "Neat appearance, organized style, confident posture"}}},
      5: {
        lifePath: {...{number: 5, meaning: "The Adventurer - You are freedom-loving, adventurous, and adaptable to change.", traits: ["Adventurous", "Freedom-loving", "Versatile", "Curious", "Energetic"], challenges: ["Restlessness", "Impulsiveness", "Commitment issues"], advice: "Embrace your adventurous spirit but learn to commit when it matters. Your versatility is a strength, but focus can lead to greater success."}},
        destiny: {...{number: 5, meaning: "You are destined to experience life fully and share your adventures with others.", career: ["Traveler", "Journalist", "Salesperson", "Explorer", "Communicator"], purpose: "To experience and share the diversity of life through adventure and communication."}},
        soulUrge: {...{number: 5, meaning: "You desire freedom, variety, and new experiences.", desires: ["Freedom", "Adventure", "Variety", "Experience"], motivation: "The need for freedom and the excitement of new experiences."}},
        personality: {...{number: 5, meaning: "You appear energetic, dynamic, and always ready for the next adventure.", traits: ["Energetic", "Dynamic", "Spontaneous", "Enthusiastic"], appearance: "Active style, energetic movements, bright expression"}}},
      6: {
        lifePath: {...{number: 6, meaning: "The Nurturer - You are caring, responsible, and have a natural ability to help others.", traits: ["Caring", "Responsible", "Nurturing", "Compassionate", "Family-oriented"], challenges: ["Over-responsibility", "Perfectionism", "Self-sacrifice"], advice: "Take care of others but don't forget to care for yourself. Your nurturing nature is beautiful, but boundaries are important for your well-being."}},
        destiny: {...{number: 6, meaning: "You are destined to care for and nurture others in meaningful ways.", career: ["Teacher", "Nurse", "Counselor", "Parent", "Healer"], purpose: "To nurture, heal, and care for others while creating harmony in relationships."}},
        soulUrge: {...{number: 6, meaning: "You desire to love, nurture, and create harmony in relationships.", desires: ["Love", "Family", "Harmony", "Service"], motivation: "The need to love and be loved, to nurture and care for others."}},
        personality: {...{number: 6, meaning: "You appear warm, caring, and maternal/paternal.", traits: ["Warm", "Caring", "Protective", "Loving"], appearance: "Warm smile, caring eyes, comfortable style"}}},
      7: {
        lifePath: {...{number: 7, meaning: "The Seeker - You are analytical, spiritual, and have a deep need to understand life's mysteries.", traits: ["Analytical", "Spiritual", "Introspective", "Intuitive", "Perfectionist"], challenges: ["Isolation", "Skepticism", "Over-analysis"], advice: "Trust your intuition and don't overthink everything. Your analytical mind is powerful, but sometimes the heart knows what the mind cannot understand."}},
        destiny: {...{number: 7, meaning: "You are destined to seek truth and share your spiritual insights with others.", career: ["Researcher", "Philosopher", "Scientist", "Spiritual teacher", "Analyst"], purpose: "To seek truth, understand life's mysteries, and share spiritual wisdom."}},
        soulUrge: {...{number: 7, meaning: "You desire knowledge, spiritual understanding, and inner peace.", desires: ["Knowledge", "Spirituality", "Truth", "Peace"], motivation: "The need to understand life's deeper meanings and spiritual truths."}},
        personality: {...{number: 7, meaning: "You appear thoughtful, mysterious, and spiritually aware.", traits: ["Thoughtful", "Mysterious", "Wise", "Contemplative"], appearance: "Thoughtful expression, spiritual aura, calm demeanor"}}},
      8: {
        lifePath: {...{number: 8, meaning: "The Achiever - You are ambitious, material-minded, and have strong business instincts.", traits: ["Ambitious", "Material-minded", "Authoritative", "Efficient", "Goal-oriented"], challenges: ["Workaholism", "Materialism", "Power struggles"], advice: "Balance material success with spiritual growth. Your ambition is admirable, but remember that true success includes personal fulfillment and relationships."}},
        destiny: {...{number: 8, meaning: "You are destined to achieve material success and lead others in business.", career: ["CEO", "Entrepreneur", "Executive", "Manager", "Financier"], purpose: "To achieve material success and use your power to help others succeed."}},
        soulUrge: {...{number: 8, meaning: "You desire material success, power, and recognition.", desires: ["Success", "Power", "Recognition", "Material wealth"], motivation: "The drive to achieve material success and gain recognition for your accomplishments."}},
        personality: {...{number: 8, meaning: "You appear confident, successful, and authoritative.", traits: ["Confident", "Successful", "Authoritative", "Ambitious"], appearance: "Professional style, confident posture, success-oriented"}}},
      9: {
        lifePath: {...{number: 9, meaning: "The Humanitarian - You are compassionate, generous, and have a strong desire to help humanity.", traits: ["Compassionate", "Generous", "Idealistic", "Creative", "Spiritual"], challenges: ["Idealism", "Self-sacrifice", "Perfectionism"], advice: "Your compassion is beautiful, but remember to help yourself too. Your idealism can change the world, but start with small, achievable steps."}},
        destiny: {...{number: 9, meaning: "You are destined to serve humanity and make a positive impact on the world.", career: ["Humanitarian", "Artist", "Healer", "Teacher", "Philosopher"], purpose: "To serve humanity and make a positive impact through compassion and creativity."}},
        soulUrge: {...{number: 9, meaning: "You desire to help others, create beauty, and make a difference.", desires: ["Service", "Beauty", "Love", "Impact"], motivation: "The need to serve others and make a positive difference in the world."}},
        personality: {...{number: 9, meaning: "You appear compassionate, wise, and spiritually evolved.", traits: ["Compassionate", "Wise", "Spiritual", "Generous"], appearance: "Warm presence, spiritual aura, compassionate eyes"}}},
    };
    return {
      lifePath: interpretations[data.lifePath]?.lifePath || interpretations[1].lifePath,
      destiny: interpretations[data.destiny]?.destiny || interpretations[1].destiny,
      soulUrge: interpretations[data.soulUrge]?.soulUrge || interpretations[1].soulUrge,
      personality: interpretations[data.personality]?.personality || interpretations[1].personality,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setSelectedDetail(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // shimmer delay
      const data: NumerologyData = {
        lifePath: calculateLifePath(formData.dateOfBirth),
        destiny: calculateDestiny(formData.fullName),
        soulUrge: calculateSoulUrge(formData.fullName),
        personality: calculatePersonality(formData.fullName),
        maturity: calculateLifePath(formData.dateOfBirth) + 9,
        challenge: Math.abs(calculateLifePath(formData.dateOfBirth) - calculateDestiny(formData.fullName)),
        pinnacle: calculateLifePath(formData.dateOfBirth) + calculateDestiny(formData.fullName),
        personalYear: (new Date().getFullYear() + calculateLifePath(formData.dateOfBirth)) % 9 || 9,
        personalMonth: ((new Date().getMonth() + 1) + calculateLifePath(formData.dateOfBirth)) % 9 || 9,
        personalDay: (new Date().getDate() + calculateLifePath(formData.dateOfBirth)) % 9 || 9,
      };
      setNumerologyData(data);
      setInterpretation(getInterpretation(data));
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -- GALAXY ASTROLOGICAL SPACE EFFECT: inject more layers and animated elements to feel cosmic/energized --
  return (
    <section
      className="py-20 relative overflow-hidden"
      // Layered galaxy/nebula, stars, faint streaks, animated points
      style={{
        background:
          "radial-gradient(ellipse 120% 120% at 50% 20%, #141027 68%, #190034 88%, #090017 100%)"
      }}
    >
      {/* -- Multi-Layer Galaxy Energy Background -- */}
      {/* Cosmic nebula gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%,rgba(184,63,254,0.18),transparent 60%),radial-gradient(circle at 30% 80%,rgba(57,180,255,0.09),transparent 70%)"
          }}
        />
        {/* Faint purple/pink/blue clouds */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 30%,rgba(255,150,255,.13) 0%,transparent 57%),radial-gradient(ellipse at 80% 80%,rgba(90,30,135,.11) 0%,transparent 65%),radial-gradient(ellipse at 7% 52%,rgba(120,214,255,.06) 0%,transparent 75%)"
          }}
        />
        {/* Subtle space dust/fog */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(-18deg,rgba(90,50,155,.045) 0 1px,transparent 1px 22px)"
          }}
        />
        {/* Occasional nebula highlights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 25%,rgba(250,85,255,0.10) 0 35%,transparent 50%)"
          }}
        />
      </div>
      {/* Astral Points & Stars */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(105deg,rgba(255,255,255,0.048) 0 1px,transparent 1px 23px),radial-gradient(ellipse at 40% 3%,rgba(230,80,255,0.10) 0%,transparent 62%),radial-gradient(ellipse at 75% 60%,rgba(100,225,255,0.10) 0%,transparent 75%)"
        }}
      />
      {/* SVG bright random stars for extra energy */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle opacity='.22' cx='87' cy='33' r='2.5' fill='%23fff8f4'/%3E%3Ccircle opacity='.13' cx='55' cy='102' r='1.2' fill='white'/%3E%3Ccircle opacity='.22' cx='25' cy='90' r='2' fill='white'/%3E%3Ccircle opacity='.12' cx='99' cy='111' r='1' fill='white'/%3E%3Ccircle opacity='.09' cx='61' cy='43' r='2.2' fill='white'/%3E%3Ccircle opacity='.10' cx='70' cy='12' r='1.1' fill='white'/%3E%3Ccircle opacity='.07' cx='13' cy='13' r='1.8' fill='white'/%3E%3C/svg%3E\") repeat"
        }}
      />
      {/* Animate moving "stars": simple spark points, visually energetic */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute w-1 h-1 rounded-full bg-white/70 blur-sm left-[22%] top-[36%] animate-astro-blink"></div>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-400/60 blur-md left-[73%] top-[12%] animate-astro-blink2"></div>
        <div className="absolute w-1 h-1 rounded-full bg-blue-400/50 left-[81%] top-[77%] blur-[1.5px] animate-astro-blink3"></div>
        <div className="absolute w-[3px] h-[3px] rounded-full bg-purple-200/60 left-[39%] top-[87%] blur-sm animate-astro-blink4"></div>
        <div className="absolute w-[2px] h-[2px] rounded-full bg-pink-200/60 left-[30%] top-[53%] animate-astro-blink5"></div>
      </div>
      {/* Animate streaking shooting star */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[12%] top-[17%] w-28 h-[2px] bg-gradient-to-r from-white/70 to-transparent rounded-full blur-sm opacity-40 animate-astro-streak"></div>
      </div>
      {/* End: BG */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-6 py-2 mb-6 shadow-sm ring-1 ring-purple-900">
            <Calculator className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 font-medium">Numerology Analysis</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow galaxy-title-glow">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 animate-gradient-sheen">Numerological Path</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the mystical power of numbers to reveal your life path, destiny, and soul's purpose.<br />
            <span className="text-purple-400 block mt-2 text-base">
              (Life Path calculated: reduce birth <b>month, day, year</b> separately, add, reduce, and honor master numbers.)
            </span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/85 backdrop-blur-2xl border-purple-900 shadow-[0_0_140px_0_rgba(149,70,255,0.18)] ring-2 ring-purple-900/40">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse animate-astro-shine" />
                Numerology Calculator
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter your full name and date of birth to discover your numerological profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                    <Input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-black/30 border-purple-900 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400/60"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Date of Birth</label>
                    <Input
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="bg-black/30 border-purple-900 text-white focus:ring-2 focus:ring-purple-400/60"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-[0_0_35px_0_rgba(153,50,255,0.26)] transition-all duration-300 transform hover:scale-105"
                  disabled={isCalculating}
                >
                  {isCalculating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Calculating Your Numbers...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      Calculate My Numerology
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {numerologyData && interpretation && (
            <div className="mt-12 space-y-8">
              {/* Number Dashboard Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {numerologyCells.map((cell) => {
                  const NumIcon = cell.icon;
                  return (
                    <button
                      key={cell.key}
                      type="button"
                      onClick={() => setSelectedDetail(cell.key)}
                      className={`w-full rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500
                                  hover:scale-105 group relative overflow-hidden shadow-lg
                                  bg-gradient-to-br ${cell.bg} border-2 py-6`}
                      style={{
                        boxShadow: selectedDetail === cell.key
                          ? "0 0 42px 3px rgba(184,70,255,0.28)"
                          : undefined,
                        zIndex: selectedDetail === cell.key ? 2 : 1,
                        position: "relative"
                      }}
                    >
                      {/* Animate subtle aurora/flare on selection */}
                      {selectedDetail === cell.key && (
                        <div className="absolute -inset-1 pointer-events-none bg-gradient-radial from-white/10 to-transparent animate-astro-glow rounded-xl"></div>
                      )}
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                                    bg-black/40 border ${selectedDetail === cell.key ? "border-purple-400" : "border-black/30"}
                                    transition`}>
                        <NumIcon className={`w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{cell.label}</h3>
                      <div className={`text-3xl font-bold ${cell.text} mb-1`}>
                        {(numerologyData as any)[cell.key]}
                      </div>
                      <p className={`text-xs ${cell.text} opacity-70 leading-tight`}>{cell.desc}</p>
                      <div
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent blur-sm opacity-0 group-hover:opacity-80 group-hover:h-2 transition-all duration-300"
                      ></div>
                    </button>
                  );
                })}
              </div>

              {/* DETAILED INTERPRETATION */}
              {selectedDetail && (
                <div className="space-y-6 animate-fade-in">
                  {selectedDetail === "lifePath" && (
                    <Card className="bg-black/90 border-purple-900 shadow-cosmic backdrop-blur-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2 galaxy-title-glow">
                          <Star className="w-5 h-5 text-purple-400" />
                          Life Path Number {numerologyData.lifePath}
                        </CardTitle>
                        <CardDescription className="text-purple-400">
                          {interpretation.lifePath.meaning}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Your Traits</h4>
                          <div className="flex flex-wrap gap-2">
                            {interpretation.lifePath.traits.map((trait, index) => (
                              <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-200 border-purple-700">
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Challenges to Overcome</h4>
                          <div className="flex flex-wrap gap-2">
                            {interpretation.lifePath.challenges.map((challenge, index) => (
                              <Badge key={index} variant="outline" className="border-orange-400 text-orange-200">
                                {challenge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/60 rounded-lg p-4 border border-purple-900">
                          <h4 className="text-lg font-semibold text-white mb-2">Spiritual Guidance</h4>
                          <p className="text-purple-200">{interpretation.lifePath.advice}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {selectedDetail === "destiny" && (
                    <Card className="bg-black/90 border-blue-900 shadow-cosmic backdrop-blur-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2 galaxy-title-glow">
                          <Moon className="w-5 h-5 text-blue-400" />
                          Destiny Number {numerologyData.destiny}
                        </CardTitle>
                        <CardDescription className="text-blue-300">
                          {interpretation.destiny.meaning}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Career Paths</h4>
                          <div className="flex flex-wrap gap-2">
                            {interpretation.destiny.career.map((career, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700">
                                {career}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/60 rounded-lg p-4 border border-blue-900">
                          <h4 className="text-lg font-semibold text-white mb-2">Your Life's Purpose</h4>
                          <p className="text-blue-200">{interpretation.destiny.purpose}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {selectedDetail === "soulUrge" && (
                    <Card className="bg-black/90 border-pink-900 shadow-cosmic backdrop-blur-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2 galaxy-title-glow">
                          <Heart className="w-5 h-5 text-pink-400" />
                          Soul Urge Number {numerologyData.soulUrge}
                        </CardTitle>
                        <CardDescription className="text-pink-300">
                          {interpretation.soulUrge.meaning}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Your Deepest Desires</h4>
                          <div className="flex flex-wrap gap-2">
                            {interpretation.soulUrge.desires.map((desire, index) => (
                              <Badge key={index} variant="secondary" className="bg-pink-900/50 text-pink-200 border-pink-700">
                                {desire}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/60 rounded-lg p-4 border border-pink-900">
                          <h4 className="text-lg font-semibold text-white mb-2">Inner Motivation</h4>
                          <p className="text-pink-200">{interpretation.soulUrge.motivation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {selectedDetail === "personality" && (
                    <Card className="bg-black/90 border-green-900 shadow-cosmic backdrop-blur-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl text-white flex items-center gap-2 galaxy-title-glow">
                          <Brain className="w-5 h-5 text-green-400" />
                          Personality Number {numerologyData.personality}
                        </CardTitle>
                        <CardDescription className="text-green-300">
                          {interpretation.personality.meaning}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">How Others See You</h4>
                          <div className="flex flex-wrap gap-2">
                            {interpretation.personality.traits.map((trait, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-900/50 text-green-200 border-green-700">
                                {trait}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/60 rounded-lg p-4 border border-green-900">
                          <h4 className="text-lg font-semibold text-white mb-2">Your Appearance</h4>
                          <p className="text-green-200">{interpretation.personality.appearance}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  <Button
                    variant="ghost"
                    className="block mx-auto mt-3 text-purple-400 hover:text-white"
                    onClick={() => setSelectedDetail(null)}
                  >
                    Back to Overview
                  </Button>
                </div>
              )}

              {/* ADDITIONAL INSIGHTS */}
              {selectedDetail === null && (
                <Card className="bg-black/85 border-yellow-900 shadow-cosmic backdrop-blur-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-300 flex items-center gap-2 galaxy-title-glow">
                      <Shield className="w-5 h-5 text-yellow-400" />
                      Additional Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalYear}</div>
                        <div className="text-sm text-yellow-200/80">Personal Year</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalMonth}</div>
                        <div className="text-sm text-yellow-200/80">Personal Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalDay}</div>
                        <div className="text-sm text-yellow-200/80">Personal Day</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-200 mb-2">{numerologyData.challenge}</div>
                        <div className="text-sm text-yellow-200/80">Life Challenge</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS Animations for space (if using Tailwind, else drop here, else reference global styles) */}
      <style jsx global>{`
        @keyframes astro-blink { 0%,100%{opacity:.76;} 10%{opacity:.5;} 20%{opacity:1;} 40%{opacity:.6;} 60%{opacity:.95;} 80%{opacity:.52;} }
        @keyframes astro-blink2 { 0%,100%{opacity:.88;} 15%{opacity:.7;} 30%{opacity:1;} 55%{opacity:.4;} 70%{opacity:.9;} }
        @keyframes astro-blink3 { 0%,100%{opacity:.5;} 25%{opacity:.98;} 50%{opacity:.3;} 83%{opacity:1;} }
        @keyframes astro-blink4 { 0%,100%{opacity:.98;} 33%{opacity:.2;} 50%{opacity:.95;} 80%{opacity:.55;} }
        @keyframes astro-blink5 { 0%,100%{opacity:.82;} 45%{opacity:.65;} 75%{opacity:1;} }
        @keyframes astro-streak { 0%{transform:translateX(0);} 70%{opacity:1;} 95%{transform:translateX(250px) scaleX(1.1);opacity:.13;} 100%{transform:translateX(350px) scaleX(.7);opacity:0;} }
        .animate-astro-blink { animation: astro-blink 2.3s infinite; }
        .animate-astro-blink2 { animation: astro-blink2 3.2s infinite; }
        .animate-astro-blink3 { animation: astro-blink3 2.6s infinite; }
        .animate-astro-blink4 { animation: astro-blink4 3.6s infinite; }
        .animate-astro-blink5 { animation: astro-blink5 4.4s infinite; }
        .animate-astro-streak { animation: astro-streak 5.5s cubic-bezier(.1,.9,.7,1) infinite; }
        .galaxy-title-glow { text-shadow: 0 1px 24px #d488ee44, 0 0px 8px #c8bfc344, 0 0 1.5px #fff; }
        /* Gradient shimmer for big Numerological Path title */
        @keyframes gradientSheen {
          0% { background-position: 0% 50%; }
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-gradient-sheen {
          background-size: 250% 250%;
          animation: gradientSheen 8s linear infinite;
        }
        /* Slight star glow effect for active card */
        .animate-astro-glow { animation: astro-blink2 2.5s infinite; }
        .animate-astro-shine { filter: drop-shadow(0 0 10px #fff4) drop-shadow(0 0 18px #d14bff44); }
      `}
      </style>
    </section>
  );
}
