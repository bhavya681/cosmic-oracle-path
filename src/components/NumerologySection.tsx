
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles, Star, Moon, Heart, Brain, Shield } from "lucide-react";

// --- Type Definitions ---
interface NumerologyData {
  lifePath: number;
  destiny: number;
  soulUrge: number;
  personality: number;
  maturity?: number;
  pinnacles?: number[];
  challenges?: number[];
  personalYear?: number;
  personalMonth?: number;
  personalDay?: number;
  challenge?: number;
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

// --- New: Vedic Numerology, with more detailed predictions ---
const vedicPredictDict: { [key: number]: { label: string; desc: string } } = {
  1: {
    label: "Mulank 1 – Leader (Surya/Sun)",
    desc: `You are a born leader, guided by the radiance of the Sun. Mulank 1 brings strong will, self-reliance, and courage. You have the power to inspire those around you, but must watch for tendencies towards ego, impatience, or dominance. People with Mulank 1 often prosper when embracing new challenges and taking initiative in both personal and professional spheres. Cultivating humility and sensitivity will magnify your impact.

Connection: Surya gives you a dynamic purpose—trust your inner light, but remember teamwork is just as vital as individual glory.`,
  },
  2: {
    label: "Mulank 2 – Diplomat (Chandra/Moon)",
    desc: `Your nature is empathetic and adaptive, ruled by the Moon’s changing light. You possess emotional intelligence, a calm presence, and a diplomatic spirit. Mulank 2s build bridges and harmonize relationships. However, moodiness or indecisiveness can cause inner conflict. Your gentle approach and ability to relate make you a cherished partner and friend.

Connection: Chandra guides you to trust intuition, nurture bonds, and see the subtle beauty in cooperation.`,
  },
  3: {
    label: "Mulank 3 – Creative (Jupiter/Guru)",
    desc: `Blessed by Jupiter, you exude optimism, creativity, and enthusiasm. Communication and artistic talents come naturally, making you a source of inspiration to others. You love to encourage and uplift, but avoid overextending or scattering your energies. Mulank 3 is about joy, learning, and self-expression.

Connection: Guru expands your wisdom—use creativity to illuminate, teach, and bring happiness, while grounding your dreams in reality.`,
  },
  4: {
    label: "Mulank 4 – Builder (Rahu/Uranus)",
    desc: `Steadfast and practical, you have the power to manifest lasting structures. Mulank 4’s gift is discipline, reliability, and strong work ethic. Rahu’s energy can sometimes make you feel restricted or stuck, yet your tenacity always prevails. Be open to new perspectives and guard against rigidity.

Connection: Rahu inspires hard work and innovation—embrace systems but remain flexible to achieve breakthroughs.`,
  },
  5: {
    label: "Mulank 5 – Communicator (Mercury/Budh)",
    desc: `Versatile, quick-witted, and adventurous, you thrive on change and excitement. Mercury’s influence brings adaptability and expressiveness. You are a natural networker; however, restlessness and inconsistency can hold you back. Travel, learning, and communication are your strengths—use them wisely.

Connection: Mercury helps you connect the world—explore, adapt, and channel curiosity into growth without losing focus.`,
  },
  6: {
    label: "Mulank 6 – Harmonizer (Venus/Shukra)",
    desc: `Ruled by Venus, you radiate warmth, care, and artistic appreciation. Family, love, and harmony hold great importance to you, but take care not to over-sacrifice for others. You are ideal for nurturing roles at home, work, or in the arts.

Connection: Shukra’s touch brings beauty—foster balance in giving and receiving, and let love be the foundation of all you create.`,
  },
  7: {
    label: "Mulank 7 – Thinker (Ketu/Neptune)",
    desc: `Spiritual, analytical, and intuitive, you seek meaning beyond the obvious. Ketu’s energy draws you inward to contemplate and question life’s mysteries. Solitude rejuvenates you, yet excessive withdrawal can lead to isolation. Mulank 7s excel in research, healing, and spiritual pursuits.

Connection: Ketu inspires self-reflection—embrace introspection, blend science and spirit, and trust your inner knowing.`,
  },
  8: {
    label: "Mulank 8 – Achiever (Saturn/Shani)",
    desc: `With Saturn’s discipline, you possess strength, ambition, and the will to overcome obstacles. You are drawn to power and responsibility, working hard for recognition and material security. Patience is your powerful ally—life’s rewards may be delayed, but are assured with persistence.

Connection: Shani teaches through effort—use your resilience for higher good, and learn to release what you cannot control.`,
  },
  9: {
    label: "Mulank 9 – Humanitarian (Mars/Mangal)",
    desc: `Fiery Mars grants you passion, drive, and a deep desire to help others. Compassion and idealism define you, but watch for the pitfalls of anger or over-giving. Mulank 9’s path is one of service, creativity, and courage.

Connection: Mangal energizes your purpose—lead through compassion, heal, and transform challenges into beauty for all.`,
  },
};

function vedicMulank(dob: string): number {
  if (!dob) return 1;
  const parts = dob.split("-");
  const day = parts.length === 3 ? parts[2] : "";
  if (!day) return 1;
  return reduceVedic(day);
}
function vedicBhagyank(dob: string): number {
  if (!dob) return 1;
  // dd-mm-yyyy all digits summed till 1-9
  const digits = dob.replace(/-/g, "").split("");
  return reduceVedic(digits.reduce((a, b) => a + parseInt(b, 10), 0));
}
function reduceVedic(n: string | number): number {
  let num = typeof n === "number" ? n : parseInt(n, 10);
  while (num > 9) { num = num.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0); }
  return num;
}

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

const MASTER_NUMBERS = [11, 22, 33];
const reduceNumber = (num: number): number => {
  while (!MASTER_NUMBERS.includes(num) && num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b, 10), 0);
  }
  return num;
};

const calculateLifePath = (dob: string): number => {
  if (!dob || typeof dob !== "string" || dob.split("-").length !== 3) return 1;
  const [yearStr, monthStr, dayStr] = dob.split("-");
  if (!yearStr || !monthStr || !dayStr) return 1;
  const sumMonth = reduceNumber(Number(monthStr));
  const sumDay = reduceNumber(Number(dayStr));
  const sumYear = reduceNumber(
    yearStr.split("").reduce((a, b) => a + parseInt(b, 10), 0)
  );
  return reduceNumber(sumMonth + sumDay + sumYear);
};

const calculateDestiny = (fullName: string): number => {
  const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  if (!fullName) return 1;
  const parts = fullName.trim().split(/\s+/);
  const partTotals = parts.map(part =>
    part
      .toUpperCase()
      .split("")
      .reduce((sum, ch) => sum + (letterValues[ch] || 0), 0)
  );
  const total = partTotals.reduce((a, b) => a + reduceNumber(b), 0);
  return reduceNumber(total);
};

const calculateSoulUrge = (fullName: string): number => {
  if (!fullName) return 1;
  const vowels = new Set(["A", "E", "I", "O", "U"]);
  const vowelValues: Record<string, number> = { A: 1, E: 5, I: 9, O: 6, U: 3 };
  const name = fullName.toUpperCase();
  const letters = name.replace(/[^A-Z]/g, '').split("");
  let sum = 0;
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (char === "Y") {
      const prev = letters[i - 1] || "";
      const next = letters[i + 1] || "";
      const isVowelY =
        (!vowels.has(prev) && !vowels.has(next)) ||
        (i === letters.length - 1 && !vowels.has(prev));
      if (isVowelY) sum += 7;
    } else if (vowels.has(char)) {
      sum += vowelValues[char];
    }
  }
  return reduceNumber(sum);
};

const calculatePersonality = (fullName: string): number => {
  if (!fullName) return 1;
  const vowels = new Set(["A", "E", "I", "O", "U", "Y"]);
  const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, "");
  const sum = name
    .split("")
    .filter(ch => !vowels.has(ch))
    .reduce((a, ch) => a + (letterValues[ch] || 0), 0);
  return reduceNumber(sum);
};

const calculateMaturity = (lifePath: number, destiny: number): number => (
  reduceNumber(lifePath + destiny)
);

const calculatePinnaclesAndChallenges = (dob: string) => {
  const [yearStr, monthStr, dayStr] = dob.split("-");
  if (!yearStr || !monthStr || !dayStr) {
    return { pinnacles: [1,1,1,1], challenges: [0,0,0,0] };
  }
  const month = reduceNumber(+monthStr);
  const day = reduceNumber(+dayStr);
  const year = reduceNumber(
    yearStr.split("").reduce((a, b) => a + parseInt(b, 10), 0)
  );
  const firstPinnacle = reduceNumber(month + day);
  const secondPinnacle = reduceNumber(day + year);
  const thirdPinnacle = reduceNumber(firstPinnacle + secondPinnacle);
  const fourthPinnacle = reduceNumber(month + year);
  const firstChallenge = Math.abs(month - day);
  const secondChallenge = Math.abs(day - year);
  const thirdChallenge = Math.abs(firstChallenge - secondChallenge);
  const fourthChallenge = Math.abs(month - year);
  return {
    pinnacles: [
      reduceNumber(firstPinnacle),
      reduceNumber(secondPinnacle),
      reduceNumber(thirdPinnacle),
      reduceNumber(fourthPinnacle)
    ],
    challenges: [
      reduceNumber(firstChallenge),
      reduceNumber(secondChallenge),
      reduceNumber(thirdChallenge),
      reduceNumber(fourthChallenge)
    ]
  };
};

const calculatePersonalYear = (dob: string): number => {
  if (!dob || dob.split("-").length !== 3) return 1;
  const [, monthStr, dayStr] = dob.split("-");
  const currentYear = new Date().getFullYear();
  const total = Number(monthStr) + Number(dayStr) + currentYear;
  return reduceNumber(total);
};
const calculatePersonalMonth = (personalYear: number): number => {
  const currentMonth = new Date().getMonth() + 1;
  return reduceNumber(personalYear + currentMonth);
};
const calculatePersonalDay = (personalMonth: number): number => {
  const currentDay = new Date().getDate();
  return reduceNumber(personalMonth + currentDay);
};

// Tabs - mode state! ("western" / "vedic")
// Default mode is VEDIC & tab "Vedic" shows first!
export default function NumerologySection() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
  });
  const [numerologyData, setNumerologyData] = useState<NumerologyData | null>(null);
  const [interpretation, setInterpretation] = useState<NumerologyInterpretation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [mode, setMode] = useState<"western" | "vedic">("vedic"); // Default to vedic, and tab appears first

  // Interpretations remain unchanged for Western
  const getInterpretation = (data: NumerologyData): NumerologyInterpretation => {
    // ...interpretations block...
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
    setShowAnimation(true);
    setAnimationFinished(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      if (mode === "western") {
        const lifePath = calculateLifePath(formData.dateOfBirth);
        const destiny = calculateDestiny(formData.fullName);
        const soulUrge = calculateSoulUrge(formData.fullName);
        const personality = calculatePersonality(formData.fullName);
        const maturity = calculateMaturity(lifePath, destiny);
        const { pinnacles, challenges } = calculatePinnaclesAndChallenges(formData.dateOfBirth);

        const personalYear = calculatePersonalYear(formData.dateOfBirth);
        const personalMonth = calculatePersonalMonth(personalYear);
        const personalDay = calculatePersonalDay(personalMonth);

        const data: NumerologyData = {
          lifePath,
          destiny,
          soulUrge,
          personality,
          maturity,
          challenge: challenges[0] ?? 0,
          pinnacles,
          personalYear,
          personalMonth,
          personalDay,
        };

        setNumerologyData(data);
        setInterpretation(getInterpretation(data));
      } else {
        // Vedic: mulank (day reduced), bhagyank (full dob digits reduced)
        const mulank = vedicMulank(formData.dateOfBirth);
        const bhagyank = vedicBhagyank(formData.dateOfBirth);

        setNumerologyData({
          lifePath: mulank,
          destiny: bhagyank,
          soulUrge: 0,
          personality: 0,
          maturity: 0,
          challenge: 0,
          pinnacles: [],
          personalYear: 0,
          personalMonth: 0,
          personalDay: 0,
        });
        setInterpretation(null); // not using "Western" object interpretation
      }

      setTimeout(() => {
        setAnimationFinished(true);
      }, 450);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function CalculationOverlay() {
    return (
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center space-y-3 py-12">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-300 opacity-30 filter blur-xl animate-calc-glow z-0"></div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-4xl font-black text-white/40 animate-calc-drift1 select-none">3</div>
            <div className="absolute right-2 top-4 text-3xl font-black text-purple-300/70 animate-calc-drift2 select-none">7</div>
            <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 text-2xl font-black text-pink-200/70 animate-calc-drift3 select-none">9</div>
            <div className="absolute left-1/3 top-4 text-2xl font-black text-blue-300/60 animate-calc-drift4 select-none">5</div>
            <span className="relative z-[1]">
              <Calculator className="w-12 h-12 mx-auto text-white/80 animate-calc-spin-move drop-shadow-lg" />
            </span>
            <Sparkles className="w-6 h-6 text-purple-300 absolute left-[68%] top-5 animate-calc-sparkle2" />
            <Sparkles className="w-6 h-6 text-pink-300 absolute left-[14%] bottom-4 animate-calc-sparkle3" />
            <Sparkles className="w-6 h-6 text-cyan-300 absolute left-[46%] top-1 animate-calc-sparkle1" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-wide mt-3 animate-calc-fadeup whitespace-nowrap">
            Calculating Your Numbers…
          </div>
        </div>
      </div>
    );
  }

  function ResultReveal({ children }: { children: React.ReactNode }) {
    return <div className="animate-calc-resultReveal">{children}</div>;
  }

  // --- BEGIN UI ---

  return (
    <section
      className="pt-7 pb-8 md:py-20 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 120% 120% at 50% 20%, #141027 68%, #190034 88%, #090017 100%)"
      }}
    >
      {/* Galaxy BG unchanged */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%,rgba(184,63,254,0.18),transparent 60%),radial-gradient(circle at 30% 80%,rgba(57,180,255,0.09),transparent 70%)"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 30%,rgba(255,150,255,.13) 0%,transparent 57%),radial-gradient(ellipse at 80% 80%,rgba(90,30,135,.11) 0%,transparent 65%),radial-gradient(ellipse at 7% 52%,rgba(120,214,255,.06) 0%,transparent 75%)"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(-18deg,rgba(90,50,155,.045) 0 1px,transparent 1px 22px)"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 25% 25%,rgba(250,85,255,0.10) 0 35%,transparent 50%)"
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(105deg,rgba(255,255,255,0.048) 0 1px,transparent 1px 23px),radial-gradient(ellipse at 40% 3%,rgba(230,80,255,0.10) 0%,transparent 62%),radial-gradient(ellipse at 75% 60%,rgba(100,225,255,0.10) 0%,transparent 75%)"
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle opacity='.22' cx='87' cy='33' r='2.5' fill='%23fff8f4'/%3E%3Ccircle opacity='.13' cx='55' cy='102' r='1.2' fill='white'/%3E%3Ccircle opacity='.22' cx='25' cy='90' r='2' fill='white'/%3E%3Ccircle opacity='.12' cx='99' cy='111' r='1' fill='white'/%3E%3Ccircle opacity='.09' cx='61' cy='43' r='2.2' fill='white'/%3E%3Ccircle opacity='.10' cx='70' cy='12' r='1.1' fill='white'/%3E%3Ccircle opacity='.07' cx='13' cy='13' r='1.8' fill='white'/%3E%3C/svg%3E\") repeat"
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute w-1 h-1 rounded-full bg-white/70 blur-sm left-[22%] top-[36%] animate-astro-blink"></div>
        <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-400/60 blur-md left-[73%] top-[12%] animate-astro-blink2"></div>
        <div className="absolute w-1 h-1 rounded-full bg-blue-400/50 left-[81%] top-[77%] blur-[1.5px] animate-astro-blink3"></div>
        <div className="absolute w-[3px] h-[3px] rounded-full bg-purple-200/60 left-[39%] top-[87%] blur-sm animate-astro-blink4"></div>
        <div className="absolute w-[2px] h-[2px] rounded-full bg-pink-200/60 left-[30%] top-[53%] animate-astro-blink5"></div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[12%] top-[17%] w-28 h-[2px] bg-gradient-to-r from-white/70 to-transparent rounded-full blur-sm opacity-40 animate-astro-streak"></div>
      </div>

      {/* HEADER */}
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 mb-5 shadow-sm ring-1 ring-purple-900">
            <Calculator className="w-5 h-5 text-purple-300" />
            <span className="text-purple-300 font-medium">Numerology Analysis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow galaxy-title-glow">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 animate-gradient-sheen">
              Numerological Path
            </span>
          </h2>
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the mystical power of numbers to reveal your {mode === "vedic" ? "Mulank &amp; Bhagyank (Vedic)" : "Life Path, Destiny, and Soul's Purpose (Western)"}.
            <br />
            <span className="text-purple-400 block mt-2 text-xs sm:text-base">
              {mode === "western"
                ? "(Life Path calculated: reduce birth month, day, year separately, add, reduce, and honor master numbers.)"
                : "(Vedic: Mulank = sum of birth day digits; Bhagyank = sum of all digits in DOB; reduced to 1-9 each. Mulank, your source energy; Bhagyank, your fate and major transitions.)"}
            </span>
          </p>
        </div>

        {/* Tabs for Mode: Vedic first, default selected */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="flex gap-2 rounded-lg bg-black/50 p-1 ring-1 ring-purple-900/60 max-w-sm mx-auto">
            <button
              type="button"
              className={`px-4 py-2 text-base rounded-md font-semibold transition-all ${mode === "vedic" ? "bg-gradient-to-r from-yellow-500 to-orange-400 text-black shadow-md" : "text-yellow-300 hover:bg-black/30"}`}
              onClick={() => setMode("vedic")}
              disabled={mode === "vedic"}
            >
              Vedic Numerology
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-base rounded-md font-semibold transition-all ${mode === "western" ? "bg-gradient-to-r from-purple-700 to-pink-500 text-white shadow-md" : "text-purple-300 hover:bg-black/30"}`}
              onClick={() => setMode("western")}
              disabled={mode === "western"}
            >
              Western Numerology
            </button>
          </div>
        </div>

        <div className="max-w-md sm:max-w-2xl md:max-w-4xl mx-auto relative">
          {showAnimation && isCalculating && <CalculationOverlay />}
          <Card className="bg-black/85 backdrop-blur-2xl border-purple-900 shadow-[0_0_140px_0_rgba(149,70,255,0.18)] ring-2 ring-purple-900/40 relative overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl text-white flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse animate-astro-shine" />
                Numerology Calculator{mode === "vedic" ? " (Vedic)" : ""}
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter your full name and date of birth to discover your numerological profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                    <Input
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-black/30 border-purple-900 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400/60"
                      required={mode === "western"}
                      disabled={mode === "vedic"}
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
                  className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-[0_0_35px_0_rgba(153,50,255,0.26)] transition-all duration-300 transform hover:scale-105 text-base sm:text-lg"
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
                      {mode === "vedic" ? "Calculate My Vedic Numerology" : "Calculate My Numerology"}
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          {/* Result: animated reveal after calculation */}
          {(numerologyData && animationFinished) && (
            <ResultReveal>
              <div className="mt-8 sm:mt-10 space-y-6">
                {/* -- VEDIC MODE: Mulank + Bhagyank Only -- */}
                {mode === "vedic" && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Mulank Card */}
                      <Card className="bg-black/80 border-yellow-800 shadow-cosmic backdrop-blur-2xl">
                        <CardHeader>
                          <CardTitle className="text-lg sm:text-xl text-yellow-300 flex items-center gap-2 galaxy-title-glow">
                            <Star className="w-5 h-5 text-yellow-300" />
                            Mulank (Birth Number): {numerologyData.lifePath}
                          </CardTitle>
                          <CardDescription className="text-yellow-200">
                            {vedicPredictDict[numerologyData.lifePath]?.label}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2 text-yellow-100 text-sm">
                            {vedicPredictDict[numerologyData.lifePath]?.desc}
                          </div>
                        </CardContent>
                      </Card>
                      {/* Bhagyank Card */}
                      <Card className="bg-black/80 border-orange-700 shadow-cosmic backdrop-blur-2xl">
                        <CardHeader>
                          <CardTitle className="text-lg sm:text-xl text-orange-300 flex items-center gap-2 galaxy-title-glow">
                            <Moon className="w-5 h-5 text-orange-300" />
                            Bhagyank (Destiny Number): {numerologyData.destiny}
                          </CardTitle>
                          <CardDescription className="text-orange-200">
                            {vedicPredictDict[numerologyData.destiny]?.label}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-2 text-orange-100 text-sm">
                            {/* Explanation with more detail and connection */}
                            <b>Deeper Insight:</b> {vedicPredictDict[numerologyData.destiny]?.desc}
                            <div className="mt-3 text-orange-200 text-xs">
                              The Bhagyank reveals how your overall destiny and life lessons will unfold—where fate calls and major turning points arise along your journey. Observe both Mulank and Bhagyank to understand how your personality and life path combine for holistic growth.
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="text-center pt-4 text-xs text-slate-400">
                      <span className="block font-semibold text-yellow-200 pb-0.5">Mulank</span>
                      Derived from your birth day. Represents your soul’s core energy, vital strengths, and the way you initiate life’s experiences.<br />
                      <span className="block font-semibold text-orange-200 pt-3 pb-0.5">Bhagyank</span>
                      The sum of all digits of your complete birth date (DDMMYYYY). It uncovers your destiny, overall journey, and fateful opportunities—often pointing to your greatest life transitions and soul lessons.
                    </div>
                  </div>
                )}
                {/* -- WESTERN DASHBOARD & INTERPRETATION -- */}
                {mode === "western" && (
                  <>
                    {/* Number Dashboard Overview */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      {numerologyCells.map((cell) => {
                        const NumIcon = cell.icon;
                        return (
                          <button
                            key={cell.key}
                            type="button"
                            onClick={() => setSelectedDetail(cell.key)}
                            className={`w-full rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500
                              hover:scale-105 group relative overflow-hidden shadow-lg
                              bg-gradient-to-br ${cell.bg} border-2 py-5 sm:py-6`}
                            style={{
                              boxShadow: selectedDetail === cell.key
                                ? "0 0 42px 3px rgba(184,70,255,0.28)"
                                : undefined,
                              zIndex: selectedDetail === cell.key ? 2 : 1,
                              position: "relative"
                            }}
                          >
                            {selectedDetail === cell.key && (
                              <div className="absolute -inset-1 pointer-events-none bg-gradient-radial from-white/10 to-transparent animate-astro-glow rounded-xl"></div>
                            )}
                            <div className={`w-11 h-11 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full flex items-center justify-center
                                  bg-black/40 border ${selectedDetail === cell.key ? "border-purple-400" : "border-black/30"}
                                  transition`}>
                              <NumIcon className={`w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300`} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">{cell.label}</h3>
                            <div className={`text-2xl sm:text-3xl font-bold ${cell.text} mb-1`}>
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
                    {selectedDetail && interpretation && (
                      <div className="space-y-6 animate-fade-in">
                        {selectedDetail === "lifePath" && (
                          <Card className="bg-black/90 border-purple-900 shadow-cosmic backdrop-blur-2xl">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2 galaxy-title-glow">
                                <Star className="w-5 h-5 text-purple-400" />
                                Life Path Number {numerologyData.lifePath}
                              </CardTitle>
                              <CardDescription className="text-purple-400">
                                {interpretation.lifePath.meaning}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Your Traits</h4>
                                <div className="flex flex-wrap gap-2">
                                  {interpretation.lifePath.traits.map((trait, index) => (
                                    <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-200 border-purple-700">{trait}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Challenges to Overcome</h4>
                                <div className="flex flex-wrap gap-2">
                                  {interpretation.lifePath.challenges.map((challenge, index) => (
                                    <Badge key={index} variant="outline" className="border-orange-400 text-orange-200">{challenge}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/60 rounded-lg p-4 border border-purple-900">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Spiritual Guidance</h4>
                                <p className="text-purple-200">{interpretation.lifePath.advice}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {selectedDetail === "destiny" && (
                          <Card className="bg-black/90 border-blue-900 shadow-cosmic backdrop-blur-2xl">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2 galaxy-title-glow">
                                <Moon className="w-5 h-5 text-blue-400" />
                                Destiny Number {numerologyData.destiny}
                              </CardTitle>
                              <CardDescription className="text-blue-300">
                                {interpretation.destiny.meaning}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Career Paths</h4>
                                <div className="flex flex-wrap gap-2">
                                  {interpretation.destiny.career.map((career, index) => (
                                    <Badge key={index} variant="secondary" className="bg-blue-900/50 text-blue-200 border-blue-700">{career}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/60 rounded-lg p-4 border border-blue-900">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Your Life's Purpose</h4>
                                <p className="text-blue-200">{interpretation.destiny.purpose}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {selectedDetail === "soulUrge" && (
                          <Card className="bg-black/90 border-pink-900 shadow-cosmic backdrop-blur-2xl">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2 galaxy-title-glow">
                                <Heart className="w-5 h-5 text-pink-400" />
                                Soul Urge Number {numerologyData.soulUrge}
                              </CardTitle>
                              <CardDescription className="text-pink-300">
                                {interpretation.soulUrge.meaning}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Your Deepest Desires</h4>
                                <div className="flex flex-wrap gap-2">
                                  {interpretation.soulUrge.desires.map((desire, index) => (
                                    <Badge key={index} variant="secondary" className="bg-pink-900/50 text-pink-200 border-pink-700">{desire}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/60 rounded-lg p-4 border border-pink-900">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Inner Motivation</h4>
                                <p className="text-pink-200">{interpretation.soulUrge.motivation}</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {selectedDetail === "personality" && (
                          <Card className="bg-black/90 border-green-900 shadow-cosmic backdrop-blur-2xl">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2 galaxy-title-glow">
                                <Brain className="w-5 h-5 text-green-400" />
                                Personality Number {numerologyData.personality}
                              </CardTitle>
                              <CardDescription className="text-green-300">
                                {interpretation.personality.meaning}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div>
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">How Others See You</h4>
                                <div className="flex flex-wrap gap-2">
                                  {interpretation.personality.traits.map((trait, index) => (
                                    <Badge key={index} variant="secondary" className="bg-green-900/50 text-green-200 border-green-700">{trait}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="bg-black/60 rounded-lg p-4 border border-green-900">
                                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Your Appearance</h4>
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
                          <CardTitle className="text-lg sm:text-xl text-yellow-300 flex items-center gap-2 galaxy-title-glow">
                            <Shield className="w-5 h-5 text-yellow-400" />
                            Additional Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalYear}</div>
                              <div className="text-xs sm:text-sm text-yellow-200/80">Personal Year</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalMonth}</div>
                              <div className="text-xs sm:text-sm text-yellow-200/80">Personal Month</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl font-bold text-yellow-200 mb-2">{numerologyData.personalDay}</div>
                              <div className="text-xs sm:text-sm text-yellow-200/80">Personal Day</div>
                            </div>
                            <div className="text-center">
                              <div className="text-xl sm:text-2xl font-bold text-yellow-200 mb-2">{numerologyData.challenge}</div>
                              <div className="text-xs sm:text-sm text-yellow-200/80">Life Challenge</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </div>
            </ResultReveal>
          )}
        </div>
      </div>

    </section>
  );
}
