
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

// --- Ascendant-based past life astrology ---
const ascendantData = {
  Aries: {
    image: vedicImage,
    karma: "Highly spiritual life, possibly as a monk, healer, or philosopher.",
    lesson: "Balance detachment with action and responsibility.",
    carry: "Wisdom, intuition, but escapism.",
  },
  Taurus: {
    image: medievalImage,
    karma: "Warrior or protector; lived with power and conflict.",
    lesson: "Learn peace and patience.",
    carry: "Courage, aggression, leadership.",
  },
  Gemini: {
    image: silkroadImage,
    karma: "Artistic or merchant soul; indulged in luxury and pleasure.",
    lesson: "Detach from material attachments.",
    carry: "Charm, eloquence, indulgence.",
  },
  Cancer: {
    image: groveImage,
    karma: "Scholar, writer, messenger.",
    lesson: "Learn empathy and emotional intelligence.",
    carry: "Analytical mind, communication karma.",
  },
  Leo: {
    image: renaissanceImage,
    karma: "Ruler or beloved leader.",
    lesson: "Manage ego and emotions.",
    carry: "Leadership, pride, attachment.",
  },
  Virgo: {
    image: egyptImage,
    karma: "Authority or priest; may have misused power.",
    lesson: "Serve humbly, refine ego.",
    carry: "Wisdom, control, self-focus.",
  },
  Libra: {
    image: renaissanceImage,
    karma: "Scholar or critic, seeking perfection.",
    lesson: "Embrace spontaneity and love.",
    carry: "Sharp intellect, worry, overthinking.",
  },
  Scorpio: {
    image: groveImage,
    karma: "Intense lover or artist, deep romantic karma.",
    lesson: "Transform attachment into wisdom.",
    carry: "Passion, secrecy, desire.",
  },
  Sagittarius: {
    image: silkroadImage,
    karma: "Occultist or reformer betrayed by allies.",
    lesson: "Develop faith and honesty.",
    carry: "Power, mystery, psychic memory.",
  },
  Capricorn: {
    image: vedicImage,
    karma: "Philosopher or moral teacher.",
    lesson: "Apply wisdom practically.",
    carry: "Integrity, strictness, detachment.",
  },
  Aquarius: {
    image: medievalImage,
    karma: "Social reformer or humanitarian.",
    lesson: "Relearn empathy and connection.",
    carry: "Burdened by collective karma.",
  },
  Pisces: {
    image: vedicImage,
    karma: "Mystic or ascetic; withdrew from life.",
    lesson: "Manifest ideals in real world.",
    carry: "Deep sensitivity, escapism.",
  },
};

// --- Nakshatra-based past life readings ---
const nakshatraData = {
  Ashwini: "You were a healer or horseman; swift, brave, and driven by divine duty.",
  Bharani: "You carried karmic weight of life and death; responsible for transformation.",
  Krittika: "You wielded sacred fire — purifier, warrior, or protector of truth.",
  Rohini: "Sensual artist or nurturer; attachment to beauty and creation.",
  Mrigashira: "Restless seeker of truth, traveler or philosopher.",
  Ardra: "Lived through suffering to purify emotions — karmic cleansing soul.",
  Punarvasu: "Returned from exile or loss; reborn to teach hope and restoration.",
  Pushya: "Priest, monk, or teacher serving divine institutions.",
  Ashlesha: "Occultist or tantric master, faced karmic entanglements.",
  Magha: "Royal ancestry; carried pride of past lineage.",
  PurvaPhalguni: "Musician or performer; enjoyed worldly pleasures.",
  UttaraPhalguni: "Philanthropist, supported others; karma of service.",
  Hasta: "Craftsman or magician; skilled in manifestation.",
  Chitra: "Architect or artist who shaped civilization aesthetics.",
  Swati: "Wanderer soul; freedom-seeker learning grounding.",
  Vishakha: "Devoted spiritual aspirant; tested by dual desires.",
  Anuradha: "Devoted companion, loyalty karma; rebirth of devotion.",
  Jyeshtha: "Elder soul; powerful, wise, may have misused authority.",
  Mula: "Root-digger, destroyer of ignorance; intense transformative karma.",
  PurvaAshadha: "Fighter for truth, social reformer with moral zeal.",
  UttaraAshadha: "Sage or king who upheld dharma.",
  Shravana: "Messenger, chronicler of divine words.",
  Dhanishta: "Musician, wealth-bearer; karma tied to rhythm and charity.",
  Shatabhisha: "Healer, mystic scientist, detached soul.",
  PurvaBhadrapada: "Visionary mystic; guided souls through chaos.",
  UttaraBhadrapada: "Spiritual anchor, taught stability in faith.",
  Revati: "Guardian of travelers and souls, compassionate ancient being.",
};

// --- 12th House Rashi Past Life Karma ---
const twelfthHouseData = {
  Aries: "Past life full of battles and assertion; carried warrior memories.",
  Taurus: "Materially rich past; attached to comfort and possessions.",
  Gemini: "Communicator, teacher, or scribe in ancient eras.",
  Cancer: "Family and motherly karmas; emotional attachments still persist.",
  Leo: "Royal or leadership karma; ego refinement continues.",
  Virgo: "Servant, scholar, or healer; karmic debts from service roles.",
  Libra: "Artist or lover; partnership-based karmas return.",
  Scorpio: "Occult master; deep karmic transformation carried over.",
  Sagittarius: "Preacher or philosopher; spiritual knowledge continues.",
  Capricorn: "Strict ruler or disciplined ascetic; rigid karmic tendencies.",
  Aquarius: "Social reformer, karma with collective humanity.",
  Pisces: "Mystic, monk, or seer; spiritual unfinished business.",
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
        const combinedMessage = `✨ In a previous incarnation, ${
          userName || "you"
        } ${asc.karma}
🌙 Nakshatra (${nakshatra}) Influence: ${nak}
🔥 12th House (${twelfthRashi}) Karma: ${tw12}
🕉️ Lesson for this life: ${asc.lesson}
💫 Carryover gifts & challenges: ${asc.carry}`;
        setMessage(combinedMessage);
        setImage(asc.image);
      }

      setShowMessage(true);
      setIsExploring(false);
    }, 3500);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* ---- Cosmic Animation Layer ---- */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          portalActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Spiral Tunnel */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full border-4 border-purple-500/30 ${
                isExploring ? "animate-spiral-in" : ""
              }`}
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
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
                className="absolute w-2 h-2 bg-purple-300 rounded-full animate-particle-stream"
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
                className="absolute h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-cosmic-ray"
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
            className={`w-[400px] h-[400px] rounded-full bg-gradient-cosmic blur-3xl ${
              isExploring ? "animate-pulse-glow" : ""
            }`}
          />
        </div>
      </div>

      {/* ---- Portal Content ---- */}
      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Past Life Portal 🔮
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Reveal your past life story through Ascendant, Nakshatra, and 12th
            House Rashi astrology.
          </p>
        </div>

        <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-primary/30 shadow-cosmic">
          <div className="text-center space-y-8">
            {/* Input, Loading, and Result Sections */}
            {!showMessage && !isExploring && (
              <div className="space-y-8 animate-fade-in">
                {/* Inputs */}
                <div>
                  <label className="block text-left text-lg mb-2">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                  />
                  <label className="block mt-6 text-left text-lg mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={userDOB}
                    onChange={(e) => setUserDOB(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                    max={new Date().toISOString().slice(0, 10)}
                  />
                  <label className="block mt-6 text-left text-lg mb-2">Ascendant Sign (Lagna)</label>
                  <select
                    value={ascendant}
                    onChange={(e) => setAscendant(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
                  >
                    <option value="">Select Ascendant</option>
                    {Object.keys(ascendantData).map((sign) => (
                      <option key={sign} value={sign}>
                        {sign}
                      </option>
                    ))}
                  </select>
                  <label className="block mt-6 text-left text-lg mb-2">Birth Nakshatra</label>
                  <select
                    value={nakshatra}
                    onChange={(e) => setNakshatra(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-primary/20 bg-background/70 text-foreground/80"
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
                <p className="text-lg text-foreground/80 mt-6">
                  Enter your birth details to unlock the hidden memories of your soul.
                </p>
              </div>
            )}

            {isExploring && (
              <div className="space-y-6 animate-scale-in">
                <p className="text-2xl font-semibold animate-pulse-glow">
                  Accessing Karmic Records...
                </p>
                <p className="text-muted-foreground">
                  Aligning Nakshatra, Ascendant & 12th House vibrations
                </p>
              </div>
            )}

            {showMessage && (
              <div className="space-y-8 animate-scale-in">
                <div className="relative">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-cosmic border-8 border-amber-900/30">
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
                  <h3 className="font-heading text-3xl font-bold text-primary text-center">
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

                  <p className="font-body text-sm text-muted-foreground italic text-center">
                    ✨ This wisdom whispers through lifetimes{userDOB ? ` since ${userDOB}` : ''}.
                  </p>
                </div>
              </div>
            )}

            <Button
              size="lg"
              onClick={explorePastLife}
              disabled={isExploring || (!showMessage && !validInput)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-12 py-6 rounded-full shadow-glow transition-all duration-500 hover:scale-105 animate-pulse-glow"
            >
              <Clock className="w-5 h-5 mr-2" />
              {isExploring
                ? "Traveling..."
                : showMessage
                ? "Explore Another Life"
                : "Reveal Past Life"}
            </Button>

            {!showMessage && !isExploring && !validInput && (
              <div className="text-sm text-red-600 animate-fade-in">
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
          100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(400px); opacity: 0; }
        }

        @keyframes cosmic-ray {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(2); }
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
          box-shadow: 0 0 30px rgba(147,51,234,0.3), inset 0 0 40px rgba(255,255,255,0.05);
        }

        .shadow-glow {
          box-shadow: 0 0 20px rgba(192,132,252,0.4);
        }

        .bg-card {
          background: rgba(20, 10, 30, 0.7);
        }
      `}</style>
    </section>
  );
};

export default PastLifePortal;