import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

/**
 * Predefined Questions (used for suggestions)
 */
const questions = [
  "Is this the right path for me?",
  "Should I trust this opportunity?",
  "Will this decision bring positive change?",
  "Is now the right time to act?",
  "Should I follow my intuition?",
];

// Updated answer choices: Left side = No, Right side = Yes, Center = Maybe
const answers = [
  { text: "No", color: "from-red-500 to-rose-500", angle: -30, voice: "No" },         // left = no
  { text: "Yes", color: "from-green-500 to-emerald-500", angle: 30, voice: "Yes" },   // right = yes
  { text: "Maybe", color: "from-yellow-500 to-amber-500", angle: 0, voice: "Maybe" }, // center = maybe
];

// For dowsing sound effect while swinging
const DOWSING_LOOP_AUDIO = "/assets/pendulum_dowsing_loop.mp3";
const SWOOSH_AUDIO = "/assets/pendulum_swing.mp3";
const TINK_AUDIO = "/assets/pendulum_tink.mp3";
const SWINGING_SOUND_AUDIO = "/assets/pendulum_swinging.mp3"; // <--- swinging sound effect

/**
 * RubyPendulumJointed - professional simple/realistic pendulum swing (damped oscillation)
 */
const RubyPendulumJointed = ({
  isSwinging,
  angle = 0,
  swingWidth = 32,
  swingDuration = 1.55,
  threadLength = 210,
  onDowsingSoundState,
  onSwingingState,
}: {
  isSwinging: boolean;
  angle?: number;
  swingWidth?: number;
  swingDuration?: number;
  threadLength?: number;
  onDowsingSoundState?: (playing: boolean) => void;
  onSwingingState?: (playing: boolean) => void;
}) => {
  // To sync with sound
  const [lastSwinging, setLastSwinging] = useState(false);
  useEffect(() => {
    if (onDowsingSoundState) {
      onDowsingSoundState(isSwinging);
    }
    if (onSwingingState) {
      onSwingingState(isSwinging);
    }
    setLastSwinging(isSwinging);
  }, [isSwinging, onDowsingSoundState, onSwingingState]);

  /**
   * Professional pendulum physics swing (damped oscillation)
   * theta(t) = A * exp(-b t) * cos(w t) + C
   */
  function getPendulumKeyframes() {
    const START_ANGLE = -90;
    if (isSwinging) {
      const nFrames = 40;
      const frameAngles: number[] = [];
      const duration = swingDuration + 0.2 * Math.random(); // humanize
      // Physical parameters (damping, frequency)
      const Amplitude = swingWidth;
      const Damping = 1.75 / duration; // b
      const Freq = 2.0 * Math.PI / duration; // omega
      const ToAngle = angle ?? 0;
      // Damped oscillation centered between start and target
      const eqCenter = (ToAngle - START_ANGLE) * 0.88 + START_ANGLE;
      for (let i = 0; i <= nFrames; i++) {
        const t = (i / nFrames) * duration;
        // Start at -90, settle at ToAngle = result angle
        // The swing is always around eqCenter but ends at angle
        const decay = Math.exp(-Damping * t);
        const theta =
          eqCenter +
          (Amplitude * decay * Math.cos(Freq * t)) +
          (ToAngle - eqCenter) * ((i / nFrames) ** 3.7); // ease to exact answer
        frameAngles.push(theta);
      }
      frameAngles[frameAngles.length - 1] = ToAngle;
      return {
        rotate: frameAngles,
        transition: {
          duration,
          ease: (t: number) => t,
          times: frameAngles.map((_, idx) => idx / (frameAngles.length - 1)),
        },
      };
    }
    // At rest, point to the result angle
    return {
      rotate: angle ?? -90,
      transition: { duration: 0.49, type: "spring", bounce: 0.17 },
    };
  }

  // Chain geometry (starts at top center!)
  const svgWidth = 88;
  const chainStartX = svgWidth / 2;
  const chainStartY = 2;
  const bobWidth = 49;
  const bobHeight = 72;
  const bobX = svgWidth / 2 - bobWidth / 2;
  const chainEndY = chainStartY + threadLength;
  const svgHeight = chainEndY + bobHeight + 24;
  const shadowY = chainEndY + bobHeight - 6;

  return (
    <div
      className="flex flex-col items-center justify-start select-none touch-none"
      style={{
        width: "min(90vw,340px)",
        minWidth: 128,
        height: "min(97vw,465px)",
        minHeight: "260px",
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          zIndex: 8,
          pointerEvents: "none",
        }}
        initial={false}
        animate={getPendulumKeyframes()}
      >
        <defs>
          <linearGradient id="chainSilv2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f7fafd" />
            <stop offset="60%" stopColor="#acb8e3" />
            <stop offset="100%" stopColor="#262e4d" />
          </linearGradient>
          <radialGradient id="chainShimmer2" cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.27" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          {/* Ruby Gradients */}
          <linearGradient id="rubyTop2" x1="0.35" y1="1" x2="0.8" y2="0">
            <stop offset="0%" stopColor="#ff7ca3" />
            <stop offset="40%" stopColor="#f93b5c" />
            <stop offset="95%" stopColor="#a10627" />
          </linearGradient>
          <linearGradient id="rubyMain2" x1="0.48" y1="0.1" x2="0.41" y2="1">
            <stop offset="0%" stopColor="#ffe7eb" />
            <stop offset="30%" stopColor="#ff357a" />
            <stop offset="80%" stopColor="#7a0633" />
            <stop offset="100%" stopColor="#340e18" />
          </linearGradient>
          <linearGradient id="rubyEdge2" x1="0.85" y1="0.1" x2="0.25" y2="1">
            <stop offset="0%" stopColor="#ff99b1" stopOpacity="0.92" />
            <stop offset="48%" stopColor="#dc407c" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#6d0028" stopOpacity="0.07" />
          </linearGradient>
          <radialGradient id="rubyGlowInner2" cx="50%" cy="56%" r="69%">
            <stop offset="8%" stopColor="#f86f9d" stopOpacity="0.66" />
            <stop offset="95%" stopColor="#ff307a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e0003665" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rubyGlass2" cx="42%" cy="35%" r="90%">
            <stop offset="6%" stopColor="#fff6f8" stopOpacity="0.61" />
            <stop offset="96%" stopColor="#fff" stopOpacity="0.0" />
          </radialGradient>
          <linearGradient id="rubyFacet12" x1="0.41" y1="0.7" x2="0.69" y2="0">
            <stop offset="0%" stopColor="#fff8f4" stopOpacity="0.60" />
            <stop offset="79%" stopColor="#ff357a" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#ff6791" stopOpacity="0.02" />
          </linearGradient>
          {/* Glow under bob */}
          <radialGradient id="floorGlow2" cx="55%" cy="70%" r="100%">
            <stop offset="0%" stopColor="#ff307a" stopOpacity="0.27" />
            <stop offset="53%" stopColor="#e20051" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2a0a23" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rubyShadow2">
            <stop offset="0%" stopColor="#de136c" stopOpacity="0.29" />
            <stop offset="60%" stopColor="#ed6068" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#fff6e3" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Chain */}
        <g>
          {[...Array(Math.floor(threadLength / 13.2))].map((_, i) => (
            <ellipse
              key={i}
              cx={chainStartX}
              cy={chainStartY + i * 13.2}
              rx={2.5 - 0.06 * i}
              ry={4.8 - 0.13 * i}
              fill="url(#chainSilv2)"
              opacity={0.96 - 0.022 * i}
              style={i === 0 ? { filter: "blur(0.7px)" } : {}}
            />
          ))}
          {/* Subtle chain line */}
          <rect
            x={chainStartX - 0.75}
            y={chainStartY}
            width={1.5}
            height={threadLength - 4}
            rx="0.52"
            fill="url(#chainSilv2)"
            opacity={0.88}
          />
          {/* Glint/shimmer */}
          <rect
            x={chainStartX + 1.1}
            y={chainStartY + 7}
            width={0.53}
            height={threadLength - 13}
            rx="0.22"
            fill="url(#chainShimmer2)"
            opacity={0.16}
          />
        </g>
        {/* Bob + Glow group */}
        <g>
          {/* Drop shadow below bob */}
          <ellipse
            cx={svgWidth / 2}
            cy={shadowY + bobHeight - 12}
            rx={16}
            ry={7}
            fill="url(#floorGlow2)"
            opacity="0.41"
            style={{ filter: "blur(8px)" }}
          />
          {/* Ruby inner shadow */}
          <ellipse
            cx={svgWidth / 2}
            cy={shadowY + bobHeight - 18}
            rx={13}
            ry={4.9}
            fill="url(#rubyShadow2)"
            opacity="0.22"
            style={{ filter: "blur(2.2px)" }}
          />
          {/* Faceted Ruby */}
          <g
            style={{
              transform: `translate(${bobX}px,${chainEndY}px)`,
              filter: isSwinging
                ? "brightness(1.16) drop-shadow(0px 7px 38px #ea175baa)"
                : "brightness(1.09) drop-shadow(0px 3px 18px #c90036bb)",
            }}
          >
            {/* Ruby base ellipse */}
            <ellipse
              cx={bobWidth / 2}
              cy={bobHeight - 12}
              rx={11}
              ry={3}
              fill="url(#rubyGlowInner2)"
              opacity="0.39"
              style={{ filter: "blur(3.4px)" }}
            />
            {/* Main faceted ruby diamond */}
            <polygon
              points={`${bobWidth / 2},7 43,36 ${bobWidth / 2},61 6,36`}
              fill="url(#rubyMain2)"
              opacity="0.97"
              style={{ filter: "blur(0.09px)" }}
            />
            {/* Top facet (highlights) */}
            <polygon
              points={`${bobWidth / 2},14 37,36 ${bobWidth / 2},57 13,36`}
              fill="url(#rubyTop2)"
              opacity="0.78"
            />
            {/* Facet1 glow left */}
            <polygon
              points={`${bobWidth / 2},14 13,36 ${bobWidth / 2},57 ${bobWidth / 2},36`}
              fill="url(#rubyFacet12)"
              opacity="0.25"
            />
            {/* Facet2 glow right */}
            <polygon
              points={`${bobWidth / 2},14 37,36 ${bobWidth / 2},57 ${bobWidth / 2},36`}
              fill="url(#rubyEdge2)"
              opacity="0.17"
            />
            {/* Inner & glass highlights */}
            <polygon
              points={`${bobWidth / 2},22 40,36 ${bobWidth / 2},51 10,36`}
              fill="url(#rubyGlowInner2)"
              opacity="0.43"
            />
            <ellipse
              cx={18}
              cy={24}
              rx={2.9}
              ry={1.1}
              fill="url(#rubyGlass2)"
              opacity="0.36"
              transform="rotate(-15 18 24)"
            />
            <ellipse
              cx={30}
              cy={15}
              rx={1.3}
              ry={0.7}
              fill="#fff"
              opacity="0.14"
              transform="rotate(-13 30 15)"
            />
            {/* Gleaming polyline */}
            <polyline
              points={`${bobWidth / 2},7 43,36 ${bobWidth / 2},61 6,36 ${bobWidth / 2},7`}
              fill="none"
              stroke="url(#rubyEdge2)"
              strokeWidth={2.6}
              opacity="0.07"
              style={{ filter: "blur(0.6px)" }}
            />
          </g>
        </g>
      </motion.svg>
    </div>
  );
};

function playSound(src: string, volume = 1) {
  try {
    const audio = new window.Audio(src);
    audio.volume = volume;
    audio.play();
  } catch {}
}

function speak(text: string) {
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.2;
    utter.rate = 1.02;
    utter.volume = 1;
    utter.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function playLoopAudio(ref: React.RefObject<HTMLAudioElement>, shouldPlay: boolean) {
  if (!ref.current) return;
  if (shouldPlay) {
    ref.current.currentTime = 0;
    ref.current.volume = 0.19;
    ref.current.loop = true;
    void ref.current.play();
  } else {
    ref.current.pause();
    ref.current.currentTime = 0;
  }
}

// --- Swinging sound effect handler ---
// This will keep a reference to an <audio> element for swinging effect
function playSwingingSound(ref: React.RefObject<HTMLAudioElement>, shouldPlay: boolean) {
  // Only plays when shouldPlay is true, and pauses/stops when false
  if (!ref.current) return;
  if (shouldPlay) {
    ref.current.currentTime = 0;
    ref.current.volume = 0.12;
    ref.current.loop = true;
    void ref.current.play();
  } else {
    ref.current.pause();
    ref.current.currentTime = 0;
  }
}

// ---- NEW FUNCTION: Decide answer by left/right/center ----
/**
 * If pendulum goes to right side then Yes, if goes to left side then No, else as it is ("Maybe").
 * Here, right is angle > 0, left is angle < 0, center is 0.
 */
function getAnswerByAngle(angle: number) {
  // Accept a small range around 0 as "Maybe"
  if (Math.abs(angle) <= 9) return answers[2]; // center (maybe)
  if (angle > 0) return answers[0];   // right (yes)
  if (angle < 0) return answers[1];   // left (no)
  return answers[2];
}

// -- Main Component Rewrite: Pendulum Centered Smoothly --
export const PendulumDowsing = () => {
  const [isSwinging, setIsSwinging] = useState(false);
  const [answer, setAnswer] = useState<typeof answers[0] | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // Sound for dowsing loop
  const dowsingLoopRef = useRef<HTMLAudioElement>(null);
  // Sound effect for swinging
  const swingingSoundRef = useRef<HTMLAudioElement>(null);

  // Responsive
  let circlePx = 350;
  let swingWidth = 28;
  let swingDuration = 1.25;
  let threadLength = 210;
  if (typeof window !== "undefined") {
    if (window.matchMedia("(max-width: 520px)").matches) {
      circlePx = 220;
      swingWidth = 18;
      swingDuration = 0.97;
      threadLength = 128;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      circlePx = 270;
      swingWidth = 22;
      swingDuration = 1.09;
      threadLength = 170;
    }
  }

  // Current question filled
  const currentQuestion = typedQuestion.trim()
    ? typedQuestion.trim()
    : selectedQuestion;

  // New: Control dowsing sound while swinging
  const [isDowsingAudioPlaying, setIsDowsingAudioPlaying] = useState(false);
  useEffect(() => {
    playLoopAudio(dowsingLoopRef, isDowsingAudioPlaying);
  }, [isDowsingAudioPlaying]);

  // Control swinging sound effect (subtle real pendulum sound)
  const [isSwingingSoundPlaying, setIsSwingingSoundPlaying] = useState(false);
  useEffect(() => {
    playSwingingSound(swingingSoundRef, isSwingingSoundPlaying);
  }, [isSwingingSoundPlaying]);

  // New: Use left/right for No/Yes, but center/near-zero is Maybe
  const swingPendulum = async () => {
    if (!currentQuestion) {
      setError("Please type or select a question.");
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    setError("");
    setIsSwinging(true);
    setAnswer(null);
    setIsDowsingAudioPlaying(true);
    setIsSwingingSoundPlaying(true);

    playSound(SWOOSH_AUDIO, 0.17);

    // Let the pendulum "swing" for a random time.
    const waiting = 1500 + Math.round(Math.random() * 700);
    await new Promise((resolve) => setTimeout(resolve, waiting));

    // Randomize: pick either left (No), center (Maybe), or right (Yes)
    const outcomes = [
      { idx: 0, min: -38, max: -18 }, // left (no): angle -38 to -18
      { idx: 1, min: 18, max: 38 },   // right (yes): angle 18 to 38
      { idx: 2, min: -9, max: 9 }     // center (maybe): angle -9 to 9
    ];
    const chosenIndex = Math.floor(Math.random() * outcomes.length);
    const { min, max } = outcomes[chosenIndex];

    let angle = min + Math.random() * (max - min);
    if (chosenIndex === 0) angle = -Math.abs(angle); // force negative for left
    if (chosenIndex === 1) angle = Math.abs(angle);  // force positive for right
    // center: random in [-9,9] (could be 0)

    const deducedAnswer = getAnswerByAngle(angle);

    setAnswer({ ...deducedAnswer, angle });

    setTimeout(() => {
      playSound(TINK_AUDIO, 0.33);
      speak(deducedAnswer.voice);
    }, 330);

    setIsSwinging(false);
    setTimeout(() => {
      setIsDowsingAudioPlaying(false);
      setIsSwingingSoundPlaying(false);
    }, 350);
  };

  return (
    <section
      className="relative py-7 sm:py-12 md:py-18 lg:py-22 px-1 sm:px-2 md:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1a1138 0%, #3d1669 38%, #0a0320 97%)",
      }}
    >
      {/* Deep Indigo Starfield */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="starg" fy="30%" r="60%">
              <stop offset="0%" stopColor="#ffe4f590" />
              <stop offset="100%" stopColor="#60004600" />
            </radialGradient>
          </defs>
          {Array.from({ length: 24 }).map((_, idx) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const r = Math.random() * 1.08 + 0.33;
            return (
              <circle
                key={idx}
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                fill="url(#starg)"
                opacity={Math.random() * 0.7 + 0.3}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "40%",
            background:
              "radial-gradient(circle at 48% 90%, #a504ee3f 0%, #000 94%)",
            pointerEvents: "none",
            opacity: 0.5
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl relative z-10 px-1 sm:px-3"
      >
        <div className="text-center mb-6 sm:mb-8 md:mb-14">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 bg-gradient-to-r from-rose-200 via-fuchsia-700 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_5px_30px_#e64e8666]">
            Pendulum Dowsing
          </h2>
          <p className="text-muted-foreground text-xs sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Seek guidance from the ancient art of pendulum divination
          </p>
        </div>
        {/* Centered Layout for Pendulum */}
        <div className="w-full flex flex-col-reverse md:flex-row md:items-stretch gap-8 lg:gap-14 justify-center max-w-5xl mx-auto">
          {/* Controls on bottom (mobile) or left (desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-[380px] md:pr-2 flex-shrink-0 flex-grow-0"
            style={{ maxWidth: 460, margin: "0 auto" }}
          >
            <Card className="p-4 sm:p-6 md:p-8 backdrop-blur-xl bg-card/40 border-fuchsia-300/30 shadow-2xl">
              <div className="space-y-4 sm:space-y-6">
                {/* New: Type or select question */}
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 block flex items-center gap-2">
                    <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-fuchsia-500" />
                    Ask Any Question Or Choose
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={typedQuestion}
                    onChange={(e) => {
                      setTypedQuestion(e.target.value);
                      setError("");
                      setSelectedQuestion("");
                    }}
                    placeholder="Type a question to the pendulum…"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") swingPendulum();
                    }}
                    className="w-full p-2 sm:p-2.5 md:p-3 rounded-lg border border-fuchsia-400/30 focus:border-fuchsia-400/80 bg-muted/30 text-base mb-2 mt-1 focus:outline-none transition"
                    maxLength={120}
                  />
                  <div className="text-xs text-red-500 h-4">{error}</div>
                  <div className="space-y-2 mt-2">
                    {questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setSelectedQuestion(q);
                          setTypedQuestion("");
                          setError("");
                        }}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all duration-300 text-xs sm:text-sm md:text-base ${
                          selectedQuestion === q && !typedQuestion
                            ? "bg-pink-400/20 border-fuchsia-500/50 border shadow-[0_0_20px_#ea187b33]"
                            : "bg-muted/30 hover:bg-muted/50 border border-transparent"
                        }`}
                        aria-selected={selectedQuestion === q && !typedQuestion}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={swingPendulum}
                  disabled={isSwinging || !currentQuestion}
                  className="w-full bg-gradient-to-r from-fuchsia-200 to-rose-700 hover:shadow-lg text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 transition-all duration-500"
                >
                  {isSwinging ? "Pendulum Swinging..." : "Consult Pendulum"}
                </Button>
                <AnimatePresence mode="wait">
                  {answer && (
                    <motion.div
                      key={answer.text + currentQuestion}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className={`p-4 sm:p-5 md:p-6 bg-gradient-to-br ${answer.color} bg-opacity-20 rounded-xl border border-current/30 text-center shadow-[0_0_30px_currentColor] backdrop-blur-sm`}
                    >
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl mb-2">
                        {answer.text}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-800 break-words">
                        Your question: {currentQuestion}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>

          {/* Mystical Board & Ruby Crystal Pendulum, centered */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col items-center justify-center min-w-[260px] min-h-[350px] relative mx-auto md:mx-0"
            style={{
              alignItems: "center",
              justifyContent: "center",
              minWidth: 260,
              minHeight: 350,
              width: "100%",
              position: "relative",
              zIndex: 2
            }}
          >
            <div
              className="relative flex flex-col items-center w-full"
              style={{
                width: `min(99vw,${circlePx}px)`,
                minHeight: `min(92vw,${circlePx + 90}px)`,
                maxWidth: "99vw",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              {/* Medium-Size Responsive Circle Board */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 shadow-md"
                style={{
                  width: circlePx,
                  height: circlePx,
                  borderRadius: "50%",
                  border: "2.7px solid #f865a245",
                  overflow: "visible",
                  background:
                    "radial-gradient(circle at 50% 38%, #24082c 0%, #91006821 70%, #100023 98%)",
                  boxShadow:
                    "0 0 35px 10px #ea307a14, 0 0 90px 5px #e14c9b30 inset",
                  maxWidth: "100vw"
                }}
              >
                <svg
                  width={circlePx}
                  height={circlePx}
                  viewBox={`0 0 ${circlePx} ${circlePx}`}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <circle cx={circlePx / 2} cy={circlePx / 2} r={circlePx / 2 - 14} fill="none" stroke="#ea88ce88" strokeWidth={circlePx * 0.0042} opacity="0.19" />
                  <circle cx={circlePx / 2} cy={circlePx / 2} r={circlePx * 0.32} fill="none" stroke="#ffe5ba30" strokeWidth={circlePx * 0.004} opacity="0.11" />
                  <circle cx={circlePx / 2} cy={circlePx / 2} r={circlePx * 0.19} fill="none" stroke="#eb64ba77" strokeWidth={circlePx * 0.0031} opacity="0.13" />
                  {/* 4 cross lines */}
                  <line x1={circlePx / 2} y1={circlePx * 0.085} x2={circlePx / 2} y2={circlePx - circlePx * 0.085} stroke="#eb91a466" strokeWidth={circlePx * 0.0027} opacity="0.16" />
                  <line x1={circlePx * 0.085} y1={circlePx / 2} x2={circlePx - circlePx * 0.085} y2={circlePx / 2} stroke="#f5498a44" strokeWidth={circlePx * 0.0023} opacity="0.13" />
                  <line x1={circlePx * 0.167} y1={circlePx * 0.167} x2={circlePx * 0.833} y2={circlePx * 0.833} stroke="#891be997" strokeWidth={circlePx * 0.0017} opacity="0.09" />
                  <line x1={circlePx * 0.833} y1={circlePx * 0.167} x2={circlePx * 0.167} y2={circlePx * 0.833} stroke="#891be997" strokeWidth={circlePx * 0.0017} opacity="0.09" />
                </svg>
                {/* YES/NO/MAYBE labels - left/right/center */}
                <div
                  className="absolute"
                  style={{
                    top: "50%",
                    left: circlePx * 0.11,
                    transform: "translateY(-50%)",
                    color: "#f26c9b",
                    fontWeight: "bold",
                    fontSize: `clamp(1.08rem,1.38vw,1.36rem)`,
                    fontFamily: "serif",
                    textShadow: "0 2px 16px #e7003672",
                    letterSpacing: "1px",
                    userSelect: "none",
                    lineHeight: 1.54,
                    textAlign: "center",
                  }}
                >NO<br /><span style={{ fontSize: "0.76em", color: "#d9bcca" }}>(left)</span></div>
                <div
                  className="absolute"
                  style={{
                    top: "50%",
                    right: circlePx * 0.11,
                    transform: "translateY(-50%)",
                    color: "#47e776",
                    fontWeight: "bold",
                    fontSize: `clamp(1.08rem,1.38vw,1.36rem)`,
                    fontFamily: "serif",
                    textShadow: "0 2px 15px #11e5727c",
                    letterSpacing: "1px",
                    userSelect: "none",
                    lineHeight: 1.54,
                    textAlign: "center",
                  }}
                >YES<br /><span style={{ fontSize: "0.76em", color: "#afe7bb" }}>(right)</span></div>
                <div
                  className="absolute"
                  style={{
                    top: "48%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#ffe0f1",
                    fontWeight: "bold",
                    fontSize: `clamp(1.09rem,1.4vw,1.39rem)`,
                    fontFamily: "serif",
                    textShadow: "0 2px 13px #e391e19e",
                    letterSpacing: "1px",
                    userSelect: "none",
                    lineHeight: 1.54,
                    textAlign: "center"
                  }}
                >MAYBE<br /><span style={{ fontSize: "0.76em", color: "#ffdada" }}>(center)</span></div>
                {/* Subtle galaxy ellipsoid */}
                <svg
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "75%",
                    transform: "translate(-50%,0)",
                    zIndex: 0,
                  }}
                  width={Math.max(circlePx * 0.53, 90)}
                  height={Math.max(circlePx * 0.18, 26)}
                >
                  <ellipse
                    cx={Math.max(circlePx * 0.53, 90) / 2}
                    cy={Math.max(circlePx * 0.18, 26) * 0.89}
                    rx={Math.max(circlePx * 0.53, 90) * 0.83 / 2}
                    ry={Math.max(circlePx * 0.18, 26) * 0.33}
                    fill="#ea217b14"
                  />
                </svg>
              </div>
              {/* Pendulum pivots from top center */}
              <div className="absolute left-1/3 top-0 z-10"
                style={{
                  transform: "translateX(-50%)",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "none"
                }}
              >
                {/* Pass the deduced answer's angle */}
                <RubyPendulumJointed
                  isSwinging={isSwinging}
                  angle={answer?.angle}
                  swingWidth={swingWidth}
                  swingDuration={swingDuration}
                  threadLength={threadLength}
                  onDowsingSoundState={setIsDowsingAudioPlaying}
                  onSwingingState={setIsSwingingSoundPlaying}
                />
              </div>
              {/* Answer Reveal */}
              {answer && !isSwinging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.67, y: -32 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 192,
                    damping: 16,
                    duration: 0.85,
                  }}
                  className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 40px #f82d70cc, 0 0 65px #c8004a84",
                        "0 0 44px #f72e81cc, 0 0 86px #c7004a78",
                        "0 0 48px #fc6fcfbb, 0 0 55px #ea2088cc",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className={`px-5 py-3 sm:px-8 sm:py-5 md:px-12 md:py-8 rounded-full bg-gradient-to-r ${answer.color} backdrop-blur-md border-[2.1px] sm:border-[2.8px] border-white/25 shadow-[0_5px_18px_rgba(240,117,175,0.16),inset_0_2px_8px_rgba(255,255,255,0.15)]`}
                  >
                    <span className="font-heading text-lg sm:text-xl md:text-2xl lg:text-3xl text-white drop-shadow-[0_2px_15px_rgba(255,108,219,0.17)] font-bold tracking-wide">
                      {answer.text}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Audio Preload for iOS (tiny, muted, invisible) */}
      <audio src={SWOOSH_AUDIO} preload="auto" style={{ display: "none" }} />
      <audio src={TINK_AUDIO} preload="auto" style={{ display: "none" }} />
      {/* Dowsing pendulum ambient sound (looped while swinging) */}
      <audio ref={dowsingLoopRef} src={DOWSING_LOOP_AUDIO} preload="auto" style={{ display: "none" }} />
      {/* Realistic pendulum swinging sound effect (looped while swinging) */}
      <audio ref={swingingSoundRef} src={SWINGING_SOUND_AUDIO} preload="auto" style={{ display: "none" }} />
    </section>
  );
};
