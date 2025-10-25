import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------------------------------
// 🔮 NUMEROLOGY LOGIC
// ----------------------------------------------
const reduceNumber = (num: number): number => {
  while (![11, 22, 33].includes(num) && num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return num;
};

const calculateLifePath = (dob: string): number => {
  const [yearStr, monthStr, dayStr] = dob.split("-");
  const sumMonth = reduceNumber(+monthStr);
  const sumDay = reduceNumber(+dayStr);
  const sumYear = reduceNumber(
    yearStr.split("").reduce((a, b) => a + parseInt(b), 0)
  );
  return reduceNumber(sumMonth + sumDay + sumYear);
};

const calculateDestiny = (fullName: string): number => {
  const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };
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
  const vowels = new Set(["A", "E", "I", "O", "U"]);
  const name = fullName.toUpperCase();
  const letters = name.split("");
  let sum = 0;

  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (char === "Y") {
      const prev = letters[i - 1] || "";
      const next = letters[i + 1] || "";
      const vowel = !vowels.has(prev) && !vowels.has(next);
      if (vowel) sum += 7;
    } else if (vowels.has(char)) {
      const values: Record<string, number> = { A: 1, E: 5, I: 9, O: 6, U: 3 };
      sum += values[char];
    }
  }
  return reduceNumber(sum);
};

const calculatePersonality = (fullName: string): number => {
  const vowels = new Set(["A", "E", "I", "O", "U", "Y"]);
  const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
  };
  const name = fullName.toUpperCase().replace(/\s+/g, "");
  const sum = name
    .split("")
    .filter(ch => !vowels.has(ch))
    .reduce((a, ch) => a + (letterValues[ch] || 0), 0);
  return reduceNumber(sum);
};

const calculateMaturity = (lifePath: number, destiny: number): number =>
  reduceNumber(lifePath + destiny);

const calculatePinnaclesAndChallenges = (dob: string) => {
  const [yearStr, monthStr, dayStr] = dob.split("-");
  const month = reduceNumber(+monthStr);
  const day = reduceNumber(+dayStr);
  const year = reduceNumber(
    yearStr.split("").reduce((a, b) => a + parseInt(b), 0)
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
      reduceNumber(fourthPinnacle),
    ],
    challenges: [
      reduceNumber(firstChallenge),
      reduceNumber(secondChallenge),
      reduceNumber(thirdChallenge),
      reduceNumber(fourthChallenge),
    ],
  };
};

const calculatePersonalYear = (dob: string): number => {
  const [yearStr, monthStr, dayStr] = dob.split("-");
  const currentYear = new Date().getFullYear();
  const total = +monthStr + +dayStr + currentYear;
  return reduceNumber(total);
};

// ----------------------------------------------
// ✨ MAIN COMPONENT
// ----------------------------------------------
export default function NumerologyCalculator  ()  {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const lifePath = calculateLifePath(dob);
      const destiny = calculateDestiny(fullName);
      const soulUrge = calculateSoulUrge(fullName);
      const personality = calculatePersonality(fullName);
      const maturity = calculateMaturity(lifePath, destiny);
      const { pinnacles, challenges } = calculatePinnaclesAndChallenges(dob);
      const personalYear = calculatePersonalYear(dob);

      setResult({
        lifePath,
        destiny,
        soulUrge,
        personality,
        maturity,
        pinnacles,
        challenges,
        personalYear,
      });
      setLoading(false);
    }, 3000);
  };

  // 🪄 Smooth scroll to result when ready
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-start p-4 sm:p-6 overflow-y-auto">
      <Card className="bg-gray-900/70 p-6 sm:p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-700 relative overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400 animate-pulse" /> Numerology Reading
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-gray-800 text-white border-gray-600 text-sm sm:text-base"
          />
          <Input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            className="bg-gray-800 text-white border-gray-600 text-sm sm:text-base"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-sm sm:text-base py-2 sm:py-3"
          >
            {loading ? "Calculating..." : "Reveal My Numerology"}
          </Button>
        </form>

        {/* 🔮 Mystic Loader */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-2xl backdrop-blur-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                className="w-14 h-14 sm:w-16 sm:h-16 border-t-4 border-yellow-400 border-solid rounded-full mb-4"
              />
              <motion.p
                className="text-yellow-300 text-sm sm:text-lg font-medium tracking-wide"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Calculating your cosmic blueprint...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🌟 Results */}
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              ref={resultRef}
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-col gap-4"
            >
              {[
                { title: "Life Path", value: result.lifePath },
                { title: "Destiny (Expression)", value: result.destiny },
                { title: "Soul Urge", value: result.soulUrge },
                { title: "Personality", value: result.personality },
                { title: "Maturity", value: result.maturity },
                { title: "Personal Year", value: result.personalYear },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-gray-800/70 border border-yellow-400/20 rounded-xl p-4 text-center shadow-md"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm sm:text-base mt-1">
                    {item.value}
                  </p>
                </motion.div>
              ))}

              <motion.div
                className="bg-gray-800/70 border border-yellow-400/20 rounded-xl p-4 shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">Pinnacle Cycles</h3>
                <p className="text-white mt-1 text-sm sm:text-base">{result.pinnacles.join(" • ")}</p>
              </motion.div>

              <motion.div
                className="bg-gray-800/70 border border-yellow-400/20 rounded-xl p-4 shadow-md mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">Challenge Cycles</h3>
                <p className="text-white mt-1 text-sm sm:text-base">{result.challenges.join(" • ")}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};
