
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import egyptImage from "@/assets/pastlife-egypt.jpg";
import medievalImage from "@/assets/pastlife-medieval.jpg";
import vedicImage from "@/assets/pastlife-vedic.jpg";
import silkroadImage from "@/assets/pastlife-silkroad.jpg";
import groveImage from "@/assets/pastlife-grove.jpg";
import renaissanceImage from "@/assets/pastlife-renaissance.jpg";
import { MysticalNarrator } from './MysticalNarrator';

// --- Ascendant-based past life astrology (Simplified language) ---
const ascendantData = {
  Aries: {
    image: vedicImage,
    karma: "You lived a spiritual past life, maybe as a monk, healer, or thinker.",
    lesson: "You are here to balance being calm with taking action.",
    carry: "You have wisdom and intuition, but sometimes you want to escape.",
  },
  Taurus: {
    image: medievalImage,
    karma: "In your past life, you were a brave warrior or a protector who faced many struggles.",
    lesson: "You need to learn to be more peaceful and patient now.",
    carry: "You bring courage, leadership, and sometimes, strong reactions.",
  },
  Gemini: {
    image: silkroadImage,
    karma: "You enjoyed arts or trading and loved nice things in your past life.",
    lesson: "Try not to get too attached to material things this time.",
    carry: "You have charm and are good with words, but can be indulgent.",
  },
  Cancer: {
    image: groveImage,
    karma: "Your past life was about learning and sharing wisdom — maybe as a writer or messenger.",
    lesson: "You are meant to feel and care more this life.",
    carry: "You think deeply and have lessons in communication.",
  },
  Leo: {
    image: renaissanceImage,
    karma: "You were a leader or someone people admired in a past life.",
    lesson: "Learning to manage your pride and emotions matters now.",
    carry: "You have leadership qualities, but sometimes feel attached to recognition.",
  },
  Virgo: {
    image: egyptImage,
    karma: "You had power or authority, perhaps as a priest, and sometimes used it too strongly.",
    lesson: "Now, be humble and let go of ego.",
    carry: "You have wisdom and like control, but focus mostly on yourself.",
  },
  Libra: {
    image: renaissanceImage,
    karma: "You were a thinker or critic, always looking for perfection.",
    lesson: "Open up to love and enjoy being spontaneous.",
    carry: "You have a sharp mind but can worry or overthink.",
  },
  Scorpio: {
    image: groveImage,
    karma: "You loved deeply and felt things strongly in your past life.",
    lesson: "Turn strong attachments into wisdom this time.",
    carry: "You are passionate and private, and you have powerful desires.",
  },
  Sagittarius: {
    image: silkroadImage,
    karma: "You searched for hidden knowledge or tried to improve the world, but may have felt betrayed.",
    lesson: "You are here to be open-hearted and honest.",
    carry: "You bring mysterious power and strong inner memories.",
  },
  Capricorn: {
    image: vedicImage,
    karma: "You shared wisdom or taught others how to live rightly.",
    lesson: "Now, use your knowledge in real life.",
    carry: "You value honesty and discipline, but sometimes keep distance.",
  },
  Aquarius: {
    image: medievalImage,
    karma: "In your last life, you tried to help society and make things better.",
    lesson: "This time, you must learn to connect more and care about others.",
    carry: "You feel responsible for others and humanity.",
  },
  Pisces: {
    image: vedicImage,
    karma: "You were a mystic or monk and lived quietly, away from the world.",
    lesson: "Bring your dreams and ideals into everyday life now.",
    carry: "You feel deeply but sometimes want to escape reality.",
  },
};

// --- Nakshatra-based past life readings (Simplified language) ---
const nakshatraData = {
  Ashwini: "You helped people heal or cared for horses; you were quick, courageous, and wanted to do good.",
  Bharani: "You dealt with big changes and helped others through tough times.",
  Krittika: "You stood for truth and were strong, like a protector.",
  Rohini: "You loved beauty, art, and caring for others.",
  Mrigashira: "You were curious, a traveler or someone always looking for answers.",
  Ardra: "You went through hard times to learn how to handle emotions and grow.",
  Punarvasu: "You got a second chance at life and taught hope to others.",
  Pushya: "You served as a priest, teacher, or helped in a community.",
  Ashlesha: "You were interested in secrets or spirituality, and sometimes felt wrapped up in complications.",
  Magha: "You came from a strong family background and were proud of your roots.",
  PurvaPhalguni: "You loved music, performed, and enjoyed life's pleasures.",
  UttaraPhalguni: "You gave to others and spent your life helping people.",
  Hasta: "You were good with your hands like a craftsman or magician.",
  Chitra: "You built beautiful things or were an artist who made things look better.",
  Swati: "You wanted freedom, moved a lot, and are here to learn about settling down.",
  Vishakha: "You were spiritual, but often felt torn between different choices.",
  Anuradha: "You were a loyal friend and cared deeply about relationships.",
  Jyeshtha: "You were wise and respected, but may have had too much power.",
  Mula: "You helped remove problems for others and went through big changes.",
  PurvaAshadha: "You fought for what was right and tried to help society.",
  UttaraAshadha: "You were a wise leader or teacher who followed high morals.",
  Shravana: "You spread messages and liked sharing stories or important news.",
  Dhanishta: "You loved music and were generous with others.",
  Shatabhisha: "You have a healer’s touch and liked to understand how things work.",
  PurvaBhadrapada: "You helped guide others through difficult times.",
  UttaraBhadrapada: "You gave people hope and taught them about faith.",
  Revati: "You cared for travelers and helped those in need.",
};

// --- 12th House Rashi Past Life Karma (Simplified language) ---
const twelfthHouseData = {
  Aries: "You had a life full of action and fights; memories of bravery remain.",
  Taurus: "You enjoyed comfort and nice things; sometimes you felt too attached.",
  Gemini: "You liked talking and sharing knowledge in ancient times.",
  Cancer: "Family and strong emotions played a big part in your past life.",
  Leo: "You were seen as a leader; learning to be humble is still important.",
  Virgo: "You worked hard to help or heal others and have lessons from serving.",
  Libra: "Relationships and love were central; old love stories may return.",
  Scorpio: "You explored mysteries and deep changes that still affect you.",
  Sagittarius: "You shared beliefs or taught spiritual lessons.",
  Capricorn: "You led strictly or followed rules tightly in a past life.",
  Aquarius: "You helped groups or society and cared about the world.",
  Pisces: "You were a dreamer or spiritual person and still have unfinished goals.",
};

// All 12 Rashi in order, so 12th from any ascendant can be calculated:
const rashiOrder = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

// This calculates the 12th sign from a given ascendant sign
function getTwelfthRashiFromAscendant(asc: string): string | undefined {
  const idx = rashiOrder.indexOf(asc);
  if (idx === -1) return undefined;
  // 12th from ascendant: index - 1 (with wraparound)
  return rashiOrder[(idx + 11) % 12];
}

export const PastLifePortal = () => {
  const [isExploring, setIsExploring] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [portalActive, setPortalActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [ascendant, setAscendant] = useState("");
  const [nakshatra, setNakshatra] = useState("");

  // Twelfth rashi is now computed automatically
  const twelfthRashi = getTwelfthRashiFromAscendant(ascendant);

  // Remove twelfthRashi input from validity check
  const validInput =
    userName.trim().length > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(userDOB) &&
    ascendant &&
    nakshatra;

  useEffect(() => {
    if (isExploring) setPortalActive(true);
    else if (showMessage) setTimeout(() => setPortalActive(false), 1000);
  }, [isExploring, showMessage]);

  const explorePastLife = () => {
    setIsExploring(true);
    setShowMessage(false);

    setTimeout(() => {
      const asc = ascendantData[ascendant];
      const nak = nakshatraData[nakshatra];
      const tw12 = twelfthRashi ? twelfthHouseData[twelfthRashi] : undefined;

      if (asc && nak && tw12) {
        const combinedMessage = `✨ In a past life, ${
          userName || "you"
        } ${asc.karma}
🌙 Nakshatra (${nakshatra}): ${nak}
🔥 12th House (${twelfthRashi}): ${tw12}
🕉️ Lesson for you now: ${asc.lesson}
💫 Gifts & challenges that remain: ${asc.carry}`;
        setMessage(combinedMessage);
        setImage(asc.image);
      }

      setShowMessage(true);
      setIsExploring(false);
    }, 3500);
  };

  // Reset function for start new
  const resetPastLife = () => {
    setShowMessage(false);
    setMessage("");
    setImage("");
    // Note: You could also clear input values if you wish, but we keep them for "start new"
  };

  return (
    <section id="pastlife" className="py-16 md:py-24 px-2 md:px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* ---- Cosmic Animation Layer ---- */}
      <div
        className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${
          portalActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Spiral Tunnel */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full border-2 md:border-4 border-purple-500/30 ${
                isExploring ? "animate-spiral-in" : ""
              }`}
              style={{
                width: `clamp(120px, ${(i + 1) * 15}vw, ${(i + 1) * 120}px)`,
                height: `clamp(120px, ${(i + 1) * 15}vw, ${(i + 1) * 120}px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Particle Streams */}
        {isExploring && (
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-300 rounded-full animate-particle-stream"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${i * 0.05}s`,
                  ["--angle" as any]: `${(i * 360) / 50}deg`,
                }}
              />
            ))}
          </div>
        )}

        {/* Cosmic Rays */}
        {isExploring && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute h-0.5 md:h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-cosmic-ray"
                style={{
                  width: "60%",
                  transform: `rotate(${(i * 360) / 12}deg)`,
                  transformOrigin: "center",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Vortex Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-[180px] h-[180px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-cosmic blur-2xl md:blur-3xl ${
              isExploring ? "animate-pulse-glow" : ""
            }`}
          />
        </div>
      </div>

      {/* ---- Portal Content ---- */}
      <div className="max-w-full md:max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-foreground">
            Past Life Portal 🔮
          </h2>
          <p className="font-body text-base md:text-xl text-muted-foreground max-w-md md:max-w-2xl mx-auto">
            Reveal your past life story through Ascendant, Nakshatra, and 12th
            House Rashi astrology.
          </p>
        </div>

        <Card className="p-4 sm:p-6 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          <div className="text-center space-y-8">
            {/* Input, Loading, and Result Sections */}
            {!showMessage && !isExploring && (
              <div className="space-y-8 animate-fade-in">
                {/* Inputs */}
                <div>
                  <label className="block text-left text-base md:text-lg mb-1 md:mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                  />
                  <label className="block mt-4 md:mt-6 text-left text-base md:text-lg mb-1 md:mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={userDOB}
                    onChange={(e) => setUserDOB(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <label className="block mt-4 md:mt-6 text-left text-base md:text-lg mb-1 md:mb-2">Ascendant Sign (Lagna)</label>
                  <select
                    value={ascendant}
                    onChange={(e) => setAscendant(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                  >
                    <option value="">Select Ascendant</option>
                    {Object.keys(ascendantData).map((sign) => (
                      <option key={sign} value={sign}>
                        {sign}
                      </option>
                    ))}
                  </select>
                  <label className="block mt-4 md:mt-6 text-left text-base md:text-lg mb-1 md:mb-2">Birth Nakshatra</label>
                  <select
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                  >
                    <option value="">Select Nakshatra</option>
                    {Object.keys(nakshatraData).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {/* 12th House Rashi display removed */}
                </div>
                <p className="text-base md:text-lg text-foreground/80 mt-4 md:mt-6">
                  Enter your birth details to unlock the hidden memories of your soul.
                </p>
              </div>
            )}

            {isExploring && (
              <div className="space-y-6 animate-scale-in">
                <p className="text-xl md:text-2xl font-semibold animate-pulse-glow">
                  Accessing Karmic Records...
                </p>
                <p className="text-muted-foreground text-base md:text-lg">
                  Aligning Nakshatra, Ascendant & 12th House vibrations
                </p>
              </div>
            )}

            {showMessage && (
              <div className="space-y-8 animate-scale-in">
                <div className="relative">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-cosmic border-4 md:border-8 border-amber-900/30 aspect-[16/9]">
                    {/* Vintage image layers remain the same */}
                    <img 
                      src={image} 
                      alt="Past Life Vision" 
                      className="w-full h-full object-cover sepia-[0.6] contrast-[1.1] brightness-[0.9]"
                    />
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={image} 
                        alt="Spirit Echo" 
                        className="w-full h-full object-cover animate-pulse"
                        style={{ filter: 'blur(3px) brightness(1.5) contrast(0.8)', mixBlendMode: 'screen' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center">
                    {userName ? `${userName}'s Past Life` : 'Your Past Life Revealed'}
                  </h3>

                  <div className="w-full animate-fade-in space-y-8">
                    <MysticalNarrator 
                      message={message}
                      tone="pastlife"
                      avatar="oracle"
                      intro="Let me peer into your soul’s echoes across time..."
                    />
                  </div>

                  <p className="font-body text-xs md:text-sm text-muted-foreground italic text-center">
                    ✨ This wisdom whispers through lifetimes{userDOB ? ` since ${userDOB}` : ''}.
                  </p>
                </div>
                {/* Reset Button to start new after one prediction */}
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetPastLife}
                    className="shadow-glow border-primary/40 rounded-full px-8 py-3 font-semibold text-primary"
                  >
                    Start New
                  </Button>
                </div>
              </div>
            )}

            {/* Only allow reveal/explore before a result is shown or while exploring */}
            {!showMessage && (
              <Button
                size="lg"
                onClick={explorePastLife}
                disabled={isExploring || (!showMessage && !validInput)}
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-4 md:px-12 md:py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 animate-pulse-glow"
              >
                <Clock className="w-5 h-5 mr-2" />
                {isExploring
                  ? "Traveling..."
                  : "Reveal Past Life"}
              </Button>
            )}

            {!showMessage && !isExploring && !validInput && (
              <div className="text-xs md:text-sm text-red-600 animate-fade-in">
                Please fill all fields (Name, DOB, Ascendant, Nakshatra).
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* --- Animations CSS --- */}
      <style>{`
        @keyframes spiral-in {
          0% { transform: scale(2) rotate(0deg); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: scale(0.5) rotate(720deg); opacity: 0; }
        }

        @keyframes particle-stream {
          0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(240px); opacity: 0; }
        }

        @keyframes cosmic-ray {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(2); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 10px rgba(168,85,247,0.8)); }
          50% { opacity: 1; filter: drop-shadow(0 0 25px rgba(192,132,252,1)); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-spiral-in {
          animation: spiral-in 2.2s ease-in-out infinite;
        }

        .animate-particle-stream {
          animation: particle-stream 2.4s linear infinite;
        }

        .animate-cosmic-ray {
          animation: cosmic-ray 2.5s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 1s ease-out forwards;
        }

        .bg-gradient-cosmic {
          background: radial-gradient(circle at center, rgba(168,85,247,0.3) 0%, rgba(0,0,0,0.9) 80%);
        }

        .shadow-cosmic {
          box-shadow: 0 0 20px rgba(147,51,234,0.18), inset 0 0 25px rgba(255,255,255,0.05);
        }

        .shadow-glow {
          box-shadow: 0 0 12px rgba(192,132,252,0.29);
        }

        .bg-card {
          background: rgba(20, 10, 30, 0.7);
        }

        /* Responsive custom tweaks for this portal */
        @media (max-width: 640px) {
          .aspect-\[16\/9\] {
            aspect-ratio: 16/10 !important;
          }
          .shadow-cosmic {
            box-shadow: 0 0 10px rgba(147,51,234,0.14), inset 0 0 13px rgba(255,255,255,0.04);
          }
          .rounded-2xl {
            border-radius: 1rem;
          }
          .border-8, .border-4 {
            border-width: 2px !important;
          }
          .w-[400px], .h-[400px], .md\\:w-\\[400px\\], .md\\:h-\\[400px\\] {
            width: 180px !important;
            height: 180px !important;
            min-width: unset;
            min-height: unset;
          }
          .p-8, .md\\:p-12, .sm\\:p-6 {
            padding: 1rem !important;
          }
          .max-w-4xl, .max-w-md {
            max-width: 100vw !important;
          }
          h2, .text-4xl, .md\\:text-6xl {
            font-size: 2rem !important;
          }
          .w-full, .w-\\[400px\\] {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PastLifePortal;
