// Major Arcana Imports
import tarotFoolImage from '@/assets/tarot-fool.jpg';
import tarotMagicianImage from '@/assets/tarot-magician.jpg';
import tarotPriestessImage from '@/assets/tarot-priestess.jpg';
import tarotEmpressImage from '@/assets/tarot-empress.jpg';
import tarotEmperorImage from '@/assets/tarot-emperor.jpg';
import tarotHierophantImage from '@/assets/tarot-hierophant.jpg';
import tarotLoversImage from '@/assets/tarot-lovers.jpg';
import tarotChariotImage from '@/assets/tarot-chariot.jpg';
import tarotStrengthImage from '@/assets/tarot-strength.jpg';
import tarotHermitImage from '@/assets/tarot-hermit.jpg';
import tarotWheelImage from '@/assets/tarot-wheel.jpg';
import tarotJusticeImage from '@/assets/tarot-justice.jpg';
import tarotHangedManImage from '@/assets/tarot-hangedman.jpg';
import tarotDeathImage from '@/assets/tarot-death.jpg';
import tarotTemperanceImage from '@/assets/tarot-temperance.jpg';
import tarotDevilImage from '@/assets/tarot-devil.jpg';
import tarotTowerImage from '@/assets/tarot-tower.jpg';
import tarotStarImage from '@/assets/tarot-star.jpg';
import tarotMoonImage from '@/assets/tarot-moon.jpg';
import tarotSunImage from '@/assets/tarot-sun.jpg';
import tarotJudgementImage from '@/assets/tarot-judgement.jpg';
import tarotWorldImage from '@/assets/tarot-world.jpg';

// Wands Suit Imports
import tarotWandsAceImage from '@/assets/tarot-wands-ace.jpg';
import tarotWands2Image from '@/assets/tarot-wands-2.jpg';
import tarotWands3Image from '@/assets/tarot-wands-3.jpg';
import tarotWands4Image from '@/assets/tarot-wands-4.jpg';
import tarotWands5Image from '@/assets/tarot-wands-5.jpg';
import tarotWands6Image from '@/assets/tarot-wands-6.jpg';
import tarotWands7Image from '@/assets/tarot-wands-7.jpg';
import tarotWands8Image from '@/assets/tarot-wands-8.jpg';
import tarotWands9Image from '@/assets/tarot-wands-9.jpg';
import tarotWands10Image from '@/assets/tarot-wands-10.jpg';
import tarotWandsPageImage from '@/assets/tarot-wands-page.jpg';
import tarotWandsKnightImage from '@/assets/tarot-wands-knight.jpg';
import tarotWandsQueenImage from '@/assets/tarot-wands-queen.jpg';
import tarotWandsKingImage from '@/assets/tarot-wands-king.jpg';

// Cups Suit Imports
import tarotCupsAceImage from '@/assets/tarot-cups-ace.jpg';
import tarotCups2Image from '@/assets/tarot-cups-2.jpg';
import tarotCups3Image from '@/assets/tarot-cups-3.jpg';
import tarotCups4Image from '@/assets/tarot-cups-4.jpg';
import tarotCups5Image from '@/assets/tarot-cups-5.jpg';
import tarotCups6Image from '@/assets/tarot-cups-6.jpg';
import tarotCups7Image from '@/assets/tarot-cups-7.jpg';
import tarotCups8Image from '@/assets/tarot-cups-8.jpg';
import tarotCups9Image from '@/assets/tarot-cups-9.jpg';
import tarotCups10Image from '@/assets/tarot-cups-10.jpg';
import tarotCupsPageImage from '@/assets/tarot-cups-page.jpg';
import tarotCupsKnightImage from '@/assets/tarot-cups-knight.jpg';
import tarotCupsQueenImage from '@/assets/tarot-cups-queen.jpg';
import tarotCupsKingImage from '@/assets/tarot-cups-king.jpg';

// Swords Suit Imports
import tarotSwordsAceImage from '@/assets/tarot-swords-ace.jpg';
import tarotSwords2Image from '@/assets/tarot-swords-2.jpg';
import tarotSwords3Image from '@/assets/tarot-swords-3.jpg';
import tarotSwords4Image from '@/assets/tarot-swords-4.jpg';
import tarotSwords5Image from '@/assets/tarot-swords-5.jpg';
import tarotSwords6Image from '@/assets/tarot-swords-6.jpg';
import tarotSwords7Image from '@/assets/tarot-swords-7.jpg';
import tarotSwords8Image from '@/assets/tarot-swords-8.jpg';
import tarotSwords9Image from '@/assets/tarot-swords-9.jpg';
import tarotSwords10Image from '@/assets/tarot-swords-10.jpg';
import tarotSwordsPageImage from '@/assets/tarot-swords-page.jpg';
import tarotSwordsKnightImage from '@/assets/tarot-swords-knight.jpg';
import tarotSwordsQueenImage from '@/assets/tarot-swords-queen.jpg';
import tarotSwordsKingImage from '@/assets/tarot-swords-king.jpg';

// Pentacles Suit Imports
import tarotPentaclesAceImage from '@/assets/tarot-pentacles-ace.jpg';
import tarotPentacles2Image from '@/assets/tarot-pentacles-2.jpg';
import tarotPentacles3Image from '@/assets/tarot-pentacles-3.jpg';
import tarotPentacles4Image from '@/assets/tarot-pentacles-4.jpg';
import tarotPentacles5Image from '@/assets/tarot-pentacles-5.jpg';
import tarotPentacles6Image from '@/assets/tarot-pentacles-6.jpg';
import tarotPentacles7Image from '@/assets/tarot-pentacles-7.jpg';
import tarotPentacles8Image from '@/assets/tarot-pentacles-8.jpg';
import tarotPentacles9Image from '@/assets/tarot-pentacles-9.jpg';
import tarotPentacles10Image from '@/assets/tarot-pentacles-10.jpg';
import tarotPentaclesPageImage from '@/assets/tarot-pentacles-page.jpg';
import tarotPentaclesKnightImage from '@/assets/tarot-pentacles-knight.jpg';
import tarotPentaclesQueenImage from '@/assets/tarot-pentacles-queen.jpg';
import tarotPentaclesKingImage from '@/assets/tarot-pentacles-king.jpg';

export interface TarotCard {
  id: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  uprightMeaning: string;
  reversedMeaning: string;
  uprightGuidance: string;
  reversedGuidance: string;
  narratorMessage: string;
  narratorReversed: string;
  image: string;
}

export const tarotDeck: TarotCard[] = [
  // MAJOR ARCANA (22 cards)
  {
    id: 0,
    name: "The Fool",
    arcana: 'major',
    uprightMeaning: "New beginnings, innocence, spontaneity, and free spirit guide your journey.",
    reversedMeaning: "Recklessness, risk-taking without thought, and fear of commitment hold you back.",
    uprightGuidance: "Embrace the unknown with childlike wonder. Your adventure begins now.",
    reversedGuidance: "Pause before leaping. Consider consequences before taking that next step.",
    narratorMessage: "Ah, dear seeker... I see the universe has blessed you with infinite possibilities. Like a soul standing at the edge of eternity, you're ready to leap into the unknown. Trust your journey.",
    narratorReversed: "My child, I sense hesitation in your spirit. The cosmos whispers caution - not all who wander are ready to be lost. Ground yourself before you fly.",
    image: tarotFoolImage
  },
  {
    id: 1,
    name: "The Magician",
    arcana: 'major',
    uprightMeaning: "Manifestation, power, skill, and resourcefulness flow through you.",
    reversedMeaning: "Manipulation, poor planning, untapped talents, and trickery cloud your path.",
    uprightGuidance: "You have all the tools needed. Channel your will into reality now.",
    reversedGuidance: "Beware of using your gifts for selfish gain. Realign with your higher purpose.",
    narratorMessage: "Blessed one, the stars have aligned in your favor! I witness the divine spark within you - you are the alchemist of your own destiny. As above, so below. What you imagine, you shall become.",
    narratorReversed: "Dear traveler, I must warn you... the shadows whisper of illusions and false promises. Your power is real, but are you wielding it with wisdom or ego?",
    image: tarotMagicianImage
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: 'major',
    uprightMeaning: "Intuition, sacred knowledge, divine feminine, and subconscious mind awaken.",
    reversedMeaning: "Secrets, disconnected from intuition, withdrawal, and silence block you.",
    uprightGuidance: "Look beyond the veil. Secret knowledge is being revealed to you.",
    reversedGuidance: "You're ignoring your inner voice. Listen to what your soul is trying to tell you.",
    narratorMessage: "Listen closely, precious soul... I hear the whispers of the cosmos speaking through you. Your intuition is your greatest oracle. The mysteries of the universe are unveiling themselves to your inner eye.",
    narratorReversed: "My dear, you've closed the gates to your inner temple. The divine feminine calls to you, but you've turned away. What are you afraid to know?",
    image: tarotPriestessImage
  },
  {
    id: 3,
    name: "The Empress",
    arcana: 'major',
    uprightMeaning: "Abundance, nature, nurturing, and feminine power surround you.",
    reversedMeaning: "Creative block, dependence on others, empty nest, and neglect appear.",
    uprightGuidance: "Embrace your creative power. Prosperity flows naturally to you.",
    reversedGuidance: "Reconnect with your nurturing essence. Don't deplete yourself for others.",
    narratorMessage: "Oh radiant being! Mother Earth herself smiles upon you. I see gardens blooming in your wake, abundance multiplying, and love overflowing. You are the creator of life and beauty.",
    narratorReversed: "Gentle spirit, I sense you've forgotten to water your own garden. The universe asks: who nurtures the nurturer? It's time to fill your own cup.",
    image: tarotEmpressImage
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: 'major',
    uprightMeaning: "Authority, structure, control, and leadership define your current path.",
    reversedMeaning: "Domination, excessive control, lack of discipline, and inflexibility arise.",
    uprightGuidance: "Take charge with confidence. Your leadership is needed now.",
    reversedGuidance: "Soften your approach. True power comes from wisdom, not force.",
    narratorMessage: "Noble soul, I perceive the throne of destiny before you. The cosmos has appointed you to lead with strength and wisdom. Command your realm with justice and clarity.",
    narratorReversed: "Mighty one, I must caution you... the scepter you wield grows heavy with tyranny. Leadership without compassion is merely control. Rule with your heart.",
    image: tarotEmperorImage
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: 'major',
    uprightMeaning: "Tradition, conformity, spiritual wisdom, and institutions guide you.",
    reversedMeaning: "Rebellion, subversiveness, new approaches, and personal beliefs emerge.",
    uprightGuidance: "Seek wisdom from established teachings. Honor tradition while learning.",
    reversedGuidance: "Break free from limiting beliefs. Your path is uniquely yours.",
    narratorMessage: "Sacred seeker, the ancient mysteries call to you through timeless traditions. I see you standing at the threshold of great teachings, ready to become both student and master.",
    narratorReversed: "Free spirit, the old ways no longer serve your highest path. I witness your rebellion against dogma - this is your sacred revolution. Trust your own divinity.",
    image: tarotHierophantImage
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: 'major',
    uprightMeaning: "Love, harmony, partnerships, and meaningful choices shape your destiny.",
    reversedMeaning: "Disharmony, imbalance, misalignment of values, and difficult decisions arise.",
    uprightGuidance: "Important choices await. Follow your heart's true calling.",
    reversedGuidance: "Examine your relationships. Are they aligned with your authentic self?",
    narratorMessage: "Beloved child of Venus, your heart sings a cosmic love song! The universe conspires to unite souls. Whether in romance or choice, divine alignment is yours.",
    narratorReversed: "Dear heart, I sense discord in your sacred unions. The stars ask: are you honoring your truth in love? Realignment is necessary before harmony returns.",
    image: tarotLoversImage
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: 'major',
    uprightMeaning: "Control, willpower, success, determination, and forward movement drive you.",
    reversedMeaning: "Opposition, lack of direction, scattered energy, and aggression block progress.",
    uprightGuidance: "Stay focused on your goal. Victory is within reach through determination.",
    reversedGuidance: "Reevaluate your direction. Are you fighting the right battles?",
    narratorMessage: "Triumphant warrior! I behold your chariot racing toward victory! The celestial winds propel you forward. Your will is unshakeable, your path clear. Onward to glory!",
    narratorReversed: "Brave soul, your chariot has veered off course. I see scattered energies pulling you in opposing directions. Center yourself before continuing the journey.",
    image: tarotChariotImage
  },
  {
    id: 8,
    name: "Strength",
    arcana: 'major',
    uprightMeaning: "Inner strength, courage, patience, and compassionate power guide you.",
    reversedMeaning: "Self-doubt, weakness, insecurity, and raw emotion overwhelm you.",
    uprightGuidance: "Your gentle strength moves mountains. Patience and compassion win.",
    reversedGuidance: "Reclaim your inner power. You're stronger than you believe.",
    narratorMessage: "Magnificent being, I witness the lion and lamb dancing within you! True strength is not force, but gentle courage. You tame beasts with love, not chains.",
    narratorReversed: "Tender heart, you've forgotten your own courage. The universe reminds you: weakness is temporary, but your spirit is eternal. Rise again.",
    image: tarotStrengthImage
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: 'major',
    uprightMeaning: "Soul searching, introspection, inner guidance, and solitude bring wisdom.",
    reversedMeaning: "Isolation, loneliness, withdrawal, and paranoia separate you from others.",
    uprightGuidance: "Seek wisdom in solitude. Your answers lie within, not without.",
    reversedGuidance: "Don't isolate too long. Balance inner work with human connection.",
    narratorMessage: "Wise wanderer, I see you climbing the mountain of enlightenment, lantern in hand. Your solitude is sacred - within silence, the loudest truths are heard.",
    narratorReversed: "Solitary soul, your isolation has become a prison, not a sanctuary. The cosmos gently urges you to return to the world. Share your light.",
    image: tarotHermitImage
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: 'major',
    uprightMeaning: "Change, cycles, fate, destiny, and turning points arrive in your life.",
    reversedMeaning: "Bad luck, resistance to change, breaking cycles, and external forces challenge you.",
    uprightGuidance: "Embrace the cycles of life. Change brings opportunity and growth.",
    reversedGuidance: "Stop fighting the inevitable. Flow with life's natural rhythms.",
    narratorMessage: "Destined one, the great cosmic wheel spins in your favor! I see fortune's hand upon you. What goes around comes around - and blessings are circling back.",
    narratorReversed: "Patient traveler, the wheel turns slowly now. I sense resistance to life's natural flow. Remember: even in darkness, the wheel keeps turning toward light.",
    image: tarotWheelImage
  },
  {
    id: 11,
    name: "Justice",
    arcana: 'major',
    uprightMeaning: "Fairness, truth, cause and effect, and law bring balance to your situation.",
    reversedMeaning: "Unfairness, lack of accountability, dishonesty, and legal issues appear.",
    uprightGuidance: "The truth will set you free. Stand in your integrity.",
    reversedGuidance: "Examine your role in this situation. Take accountability for your actions.",
    narratorMessage: "Righteous soul, the scales of Ma'at weigh your deeds! I perceive perfect balance manifesting. Truth is your sword, fairness your shield. Justice prevails.",
    narratorReversed: "Troubled spirit, the scales tip unfavorably. The universe asks: have you been honest with yourself? Karma adjusts itself - examine your conscience.",
    image: tarotJusticeImage
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: 'major',
    uprightMeaning: "Surrender, letting go, new perspective, and sacrifice bring enlightenment.",
    reversedMeaning: "Stalling, needless sacrifice, resistance, and fear of sacrifice hold you.",
    uprightGuidance: "See things from a new angle. Sometimes surrender is the answer.",
    reversedGuidance: "Stop sacrificing unnecessarily. Your martyrdom serves no one.",
    narratorMessage: "Suspended between worlds, I see you hanging in sacred pause. The universe gifts you divine perspective - what seemed down is up, what seemed lost is found.",
    narratorReversed: "Restless being, you struggle against necessary stillness. I observe your resistance to the pause. Sometimes the greatest action is inaction.",
    image: tarotHangedManImage
  },
  {
    id: 13,
    name: "Death",
    arcana: 'major',
    uprightMeaning: "Transformation, endings, change, transition, and letting go create new beginnings.",
    reversedMeaning: "Resistance to change, fear of endings, stagnation, and inability to move on persist.",
    uprightGuidance: "Embrace transformation. What dies makes room for rebirth.",
    reversedGuidance: "Release what's already gone. Clinging to the past prevents your future.",
    narratorMessage: "Brave transformer! I witness the phoenix within you preparing to rise from ashes. Death is not an end, but a glorious metamorphosis. You are reborn!",
    narratorReversed: "Fearful soul, you grasp at shadows of what was. The cosmos whispers: let the dead rest. Your resurrection awaits, but first you must release.",
    image: tarotDeathImage
  },
  {
    id: 14,
    name: "Temperance",
    arcana: 'major',
    uprightMeaning: "Balance, moderation, patience, purpose, and divine timing harmonize your path.",
    reversedMeaning: "Imbalance, excess, lack of vision, and rushing disrupt your flow.",
    uprightGuidance: "Find the middle way. Patience and balance bring success.",
    reversedGuidance: "You've lost your center. Restore equilibrium before proceeding.",
    narratorMessage: "Harmonious being, I observe the angel of balance pouring blessings between worlds! Your life finds its perfect rhythm. Patience yields divine results.",
    narratorReversed: "Imbalanced traveler, your cup runneth over - or perhaps runs empty. The universe calls for moderation. Too much, too fast leads to spilling gifts.",
    image: tarotTemperanceImage
  },
  {
    id: 15,
    name: "The Devil",
    arcana: 'major',
    uprightMeaning: "Bondage, materialism, addiction, sexuality, and playfulness tempt you.",
    reversedMeaning: "Release, breaking free, detachment, and reclaiming power liberate you.",
    uprightGuidance: "Acknowledge your shadow. What chains you also teaches you.",
    reversedGuidance: "The chains are an illusion. You have the power to walk away.",
    narratorMessage: "Seeker of truth, I must show you uncomfortable wisdom - you are chained only by choice. Your bondage is self-created. But knowledge of this is freedom itself!",
    narratorReversed: "Liberating spirit! I celebrate your breaking of chains! The cosmos rejoices as you reclaim your sovereignty. You are free - truly free at last!",
    image: tarotDevilImage
  },
  {
    id: 16,
    name: "The Tower",
    arcana: 'major',
    uprightMeaning: "Sudden change, upheaval, chaos, revelation, and awakening shake your foundations.",
    reversedMeaning: "Avoiding disaster, fear of change, delaying the inevitable, and resisting upheaval.",
    uprightGuidance: "The old must fall for the new to rise. Trust this destruction.",
    reversedGuidance: "Stop delaying the inevitable collapse. Sometimes things must break.",
    narratorMessage: "Resilient soul, I witness lightning striking your tower! Yes, it's chaos - but divine chaos! From rubble, you'll build something far greater. This is your awakening!",
    narratorReversed: "Frightened one, you sense the trembling but deny the quake. I see you shoring up crumbling walls. The cosmos says: let it fall. New foundations await.",
    image: tarotTowerImage
  },
  {
    id: 17,
    name: "The Star",
    arcana: 'major',
    uprightMeaning: "Hope, faith, renewal, spirituality, and healing guide your journey forward.",
    reversedMeaning: "Despair, faithlessness, disconnection, and lack of inspiration darken your path.",
    uprightGuidance: "Trust in the universe's plan. Your dreams align with divine timing.",
    reversedGuidance: "Rekindle your hope. The stars still shine, even when you can't see them.",
    narratorMessage: "Blessed starlight! I behold celestial radiance pouring into your being! Your wishes are heard by the cosmos. Hope is reborn, faith restored. You are blessed!",
    narratorReversed: "Dimmed light, your inner star has clouded over. I feel your despair, but I must remind you: even in darkest night, stars still exist. Look up again.",
    image: tarotStarImage
  },
  {
    id: 18,
    name: "The Moon",
    arcana: 'major',
    uprightMeaning: "Illusion, fear, anxiety, subconscious, and intuition reveal hidden truths.",
    reversedMeaning: "Confusion released, inner clarity, overcoming fear, and finding truth emerge.",
    uprightGuidance: "Trust your intuition through uncertainty. Not all is as it seems.",
    reversedGuidance: "The fog is clearing. Trust what you now see with clarity.",
    narratorMessage: "Mysterious traveler, I see you walking the moonlit path where shadows dance! Trust your instincts through illusion. The subconscious speaks truth the mind cannot.",
    narratorReversed: "Awakening soul, the lunar fog lifts at last! I witness your emergence from confusion into clarity. The false has revealed itself as false. Truth dawns.",
    image: tarotMoonImage
  },
  {
    id: 19,
    name: "The Sun",
    arcana: 'major',
    uprightMeaning: "Joy, success, celebration, positivity, and vitality illuminate your life.",
    reversedMeaning: "Temporary depression, lack of success, sadness, and pessimism cloud you.",
    uprightGuidance: "Celebrate! Success is yours. Let your authentic light shine.",
    reversedGuidance: "The clouds are temporary. Your inner sun still burns bright.",
    narratorMessage: "Radiant being! I am blinded by the glory surrounding you! The Sun itself bows to your brilliance! Success, joy, vitality - all yours! This is your golden moment!",
    narratorReversed: "Eclipsed spirit, I see clouds obscuring your natural radiance. But hear this truth: clouds pass, the sun remains. Your light is eternal, this shadow temporary.",
    image: tarotSunImage
  },
  {
    id: 20,
    name: "Judgement",
    arcana: 'major',
    uprightMeaning: "Rebirth, inner calling, absolution, and higher purpose awaken within you.",
    reversedMeaning: "Self-doubt, harsh judgment, inability to forgive, and ignoring the call.",
    uprightGuidance: "Answer your higher calling. This is your moment of awakening.",
    reversedGuidance: "Release self-judgment. Forgive yourself and hear your true calling.",
    narratorMessage: "Resurrected soul! The cosmic trumpet sounds your awakening! I witness your rising from the ashes of who you were. Your higher purpose calls - answer it!",
    narratorReversed: "Judged one, you are your own harshest critic. The universe offers absolution, but you refuse it. I say unto you: forgive yourself. The angels await.",
    image: tarotJudgementImage
  },
  {
    id: 21,
    name: "The World",
    arcana: 'major',
    uprightMeaning: "Completion, achievement, fulfillment, success, and cosmic consciousness arrive.",
    reversedMeaning: "Incomplete goals, lack of closure, seeking personal closure, and delays appear.",
    uprightGuidance: "You've come full circle. Celebrate this completion and prepare for new beginnings.",
    reversedGuidance: "What remains unfinished? Complete this chapter before starting the next.",
    narratorMessage: "Cosmic achiever! I behold you dancing at the center of the universe itself! All is complete, all is won, all is perfectly balanced. You are The World!",
    narratorReversed: "Almost there, beloved! I see the finish line mere steps away, yet you hesitate. The cosmos asks: what holds you from completion? Finish what you started.",
    image: tarotWorldImage
  },

  // MINOR ARCANA - Wands (14 cards)
  {
    id: 22,
    name: "Ace of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Inspiration, new opportunities, growth, and creative potential ignite.",
    reversedMeaning: "Delays, lack of direction, poor timing, and creative blocks appear.",
    uprightGuidance: "Seize this creative opportunity. The spark of inspiration is divine timing.",
    reversedGuidance: "Wait for better timing. Nurture your idea before launching.",
    narratorMessage: "Creative spark! A wand of pure potential appears in your hands! The universe hands you fire - what will you create?",
    narratorReversed: "Patient creator, the flame flickers but hasn't caught yet. Protect this spark until conditions are right for the blaze.",
    image: tarotWandsAceImage
  },
  {
    id: 23,
    name: "Two of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Planning, progress, decisions, and future possibilities unfold before you.",
    reversedMeaning: "Fear of unknown, lack of planning, bad planning, and avoidance block you.",
    uprightGuidance: "The world is yours to explore. Make bold plans and follow through.",
    reversedGuidance: "Don't let fear stop you. Create a solid plan before moving forward.",
    narratorMessage: "Visionary soul, I see you standing at the threshold holding your dreams! The world awaits your conquest.",
    narratorReversed: "Hesitant planner, fear clouds your vision. The map exists - you must trust yourself to follow it.",
    image: tarotWands2Image
  },
  {
    id: 24,
    name: "Three of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Expansion, foresight, overseas opportunities, and progress manifest.",
    reversedMeaning: "Obstacles, lack of foresight, delays, and frustration appear.",
    uprightGuidance: "Your vision is expanding. Look beyond your current horizons.",
    reversedGuidance: "Reassess your strategy. Remove obstacles before expanding further.",
    narratorMessage: "Far-seeing explorer! Your ships come sailing home laden with treasure! Expansion is blessed.",
    narratorReversed: "Frustrated merchant, your ships are delayed. Patience - sometimes storms must pass before treasures arrive.",
    image: tarotWands3Image
  },
  {
    id: 25,
    name: "Four of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Celebration, harmony, homecoming, and joyful community surround you.",
    reversedMeaning: "Lack of support, instability, home conflicts, and cancelled celebrations.",
    uprightGuidance: "Celebrate your achievements! Gather your loved ones and rejoice.",
    reversedGuidance: "Heal conflicts at home first. Create stable foundations.",
    narratorMessage: "Joyful celebrant! I hear the cosmic music of your victory dance! Gather your tribe and feast!",
    narratorReversed: "Troubled home-keeper, discord disrupts your sanctuary. Restore harmony before celebration can begin.",
    image: tarotWands4Image
  },
  {
    id: 26,
    name: "Five of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Competition, conflict, tension, diversity of opinion create challenges.",
    reversedMeaning: "Inner conflict, resolution, avoiding conflict, and agreement emerge.",
    uprightGuidance: "Healthy competition drives growth. Stand your ground with confidence.",
    reversedGuidance: "Choose your battles wisely. Not every conflict deserves your energy.",
    narratorMessage: "Spirited warrior! I see you in the arena of competition! This conflict sharpens your skills.",
    narratorReversed: "Weary fighter, you realize some battles aren't worth fighting. Wise choice, dear one.",
    image: tarotWands5Image
  },
  {
    id: 27,
    name: "Six of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Victory, recognition, success, and public reward come your way.",
    reversedMeaning: "Failure, lack of recognition, excess pride, and fall from grace appear.",
    uprightGuidance: "Accept the recognition you deserve. Your success inspires others.",
    reversedGuidance: "Check your ego. Success without humility leads to downfall.",
    narratorMessage: "Triumphant hero! The crowd cheers your name! Wear your laurels with grace and gratitude.",
    narratorReversed: "Humbled victor, pride preceded your stumble. The cosmos teaches: glory is fleeting, character eternal.",
    image: tarotWands6Image
  },
  {
    id: 28,
    name: "Seven of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Challenge, perseverance, defending position, and maintaining control.",
    reversedMeaning: "Exhaustion, giving up, overwhelmed, and yielding to pressure.",
    uprightGuidance: "Stand firm in your convictions. You have the high ground.",
    reversedGuidance: "Know when to retreat. Exhaustion serves no one.",
    narratorMessage: "Brave defender! You hold the hilltop against all comers! Your conviction is your fortress.",
    narratorReversed: "Weary guardian, you've fought valiantly but exhaustion takes its toll. Sometimes retreat is wisdom.",
    image: tarotWands7Image
  },
  {
    id: 29,
    name: "Eight of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Speed, action, air travel, swift change, and rapid progress accelerate.",
    reversedMeaning: "Delays, frustration, resisting change, and slowing down.",
    uprightGuidance: "Things are moving fast! Stay alert and ready to act.",
    reversedGuidance: "Forced slowdowns have purpose. Don't fight necessary delays.",
    narratorMessage: "Swift messenger! Your prayers fly like arrows to the heavens! Rapid manifestation is yours!",
    narratorReversed: "Frustrated traveler, cosmic traffic slows your journey. The universe has its timing - trust it.",
    image: tarotWands8Image
  },
  {
    id: 30,
    name: "Nine of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Resilience, persistence, boundaries, courage despite adversity.",
    reversedMeaning: "Paranoia, stubbornness, rigidity, and struggling on.",
    uprightGuidance: "You're almost there. One last push brings victory.",
    reversedGuidance: "Your defenses have become walls. Let them soften.",
    narratorMessage: "Resilient warrior! Battle-worn but unbroken! The finish line appears - gather your final strength!",
    narratorReversed: "Paranoid defender, you see enemies in every shadow. The battle is over - you can lower your shield.",
    image: tarotWands9Image
  },
  {
    id: 31,
    name: "Ten of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Burden, responsibility, hard work, stress, and obligation weigh heavily.",
    reversedMeaning: "Release, delegation, lightening load, and letting go bring relief.",
    uprightGuidance: "The burden is heavy but temporary. Delegate what you can.",
    reversedGuidance: "Put down some of these wands. Not everything is yours to carry.",
    narratorMessage: "Burdened soul, I see you bearing the weight of worlds! Your dedication is noble - but is it sustainable?",
    narratorReversed: "Liberated one! You finally release what was never yours to carry! Feel the lightness return!",
    image: tarotWands10Image
  },
  {
    id: 32,
    name: "Page of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Exploration, excitement, freedom, adventure, and new ideas spark.",
    reversedMeaning: "Lack of direction, procrastination, bad news, and scattered energy.",
    uprightGuidance: "Follow your curiosity. Adventure calls to your free spirit.",
    reversedGuidance: "Focus scattered energy. Choose one adventure at a time.",
    narratorMessage: "Curious wanderer! A message of adventure arrives! The universe invites you to play and explore!",
    narratorReversed: "Distracted youth, too many paths confuse your feet. Choose one direction and commit.",
    image: tarotWandsPageImage
  },
  {
    id: 33,
    name: "Knight of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Energy, passion, adventure, impulsiveness, and action drive forward.",
    reversedMeaning: "Recklessness, impatience, scattered energy, and lack of follow-through.",
    uprightGuidance: "Channel your passion into purposeful action. Your energy is electric!",
    reversedGuidance: "Slow down. Reckless speed leads to careless mistakes.",
    narratorMessage: "Passionate adventurer! You ride the lightning of pure enthusiasm! Your energy is contagious!",
    narratorReversed: "Reckless rider, your horse runs wild without direction. Rein in before you crash.",
    image: tarotWandsKnightImage
  },
  {
    id: 34,
    name: "Queen of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Confidence, independence, social butterfly, determination, and warmth shine.",
    reversedMeaning: "Self-respect, jealousy, insecurity, demanding, and temperamental.",
    uprightGuidance: "Own your power. Your confidence inspires and attracts.",
    reversedGuidance: "Jealousy dims your light. Return to self-love.",
    narratorMessage: "Radiant queen! You command the room with warmth and charisma! Your throne is earned!",
    narratorReversed: "Insecure sovereign, jealousy has dimmed your natural brilliance. Remember who you are!",
    image: tarotWandsQueenImage
  },
  {
    id: 35,
    name: "King of Wands",
    arcana: 'minor',
    suit: 'wands',
    uprightMeaning: "Leadership, vision, entrepreneur, honor, and natural-born leader emerge.",
    reversedMeaning: "Impulsiveness, domineering, overbearing, and forceful behavior.",
    uprightGuidance: "Lead with vision and passion. Others will follow your inspired example.",
    reversedGuidance: "Leadership has become tyranny. Lead with heart, not force.",
    narratorMessage: "Visionary king! Your realm flourishes under inspired leadership! Command with confidence!",
    narratorReversed: "Tyrannical ruler, power has corrupted your once-noble vision. Remember: kings serve their kingdom.",
    image: tarotWandsKingImage
  },

  // MINOR ARCANA - Cups (14 cards)
  {
    id: 36,
    name: "Ace of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Love, new relationships, compassion, creativity, and emotional renewal flow.",
    reversedMeaning: "Self-love, emotional loss, blocked creativity, and emptiness appear.",
    uprightGuidance: "Open your heart to love. Divine blessings overflow for you.",
    reversedGuidance: "Fill your own cup first. You can't pour from empty reserves.",
    narratorMessage: "Beloved! The Holy Grail overflows with divine love just for you! Receive this blessing!",
    narratorReversed: "Empty vessel, your cup has run dry. The cosmos reminds you: self-love fills all other loves.",
    image: tarotCupsAceImage
  },
  {
    id: 37,
    name: "Two of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Unity, partnership, connection, attraction, and mutual respect blossom.",
    reversedMeaning: "Imbalance, broken relationship, tension, and lack of harmony.",
    uprightGuidance: "A sacred partnership forms. Honor this divine connection.",
    reversedGuidance: "Imbalance disrupts union. Heal yourself before merging with another.",
    narratorMessage: "United souls! I witness a cosmic marriage of hearts! Two become one in perfect harmony!",
    narratorReversed: "Divided pair, the sacred union fractures. Individual wholeness must precede partnership.",
    image: tarotCups2Image
  },
  {
    id: 38,
    name: "Three of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Friendship, community, celebration, creativity, and collaboration bring joy.",
    reversedMeaning: "Overindulgence, gossip, isolation, and lack of community.",
    uprightGuidance: "Celebrate with your tribe! Joy multiplies when shared.",
    reversedGuidance: "Excess celebration becomes escapism. Find balance.",
    narratorMessage: "Joyful celebrant! I see circles of friendship dancing in divine revelry! Your cup runneth over!",
    narratorReversed: "Lonely heart, you've isolated from your tribe. Or perhaps revelry has become excess. Find center.",
    image: tarotCups3Image
  },
  {
    id: 39,
    name: "Four of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Meditation, contemplation, apathy, and reevaluation create pause.",
    reversedMeaning: "Sudden awareness, depression lifted, new opportunities, and motivation.",
    uprightGuidance: "Take time to reflect. Not every opportunity requires immediate action.",
    reversedGuidance: "Wake from apathy. Life offers gifts you've been ignoring.",
    narratorMessage: "Contemplative soul, you sit beneath the wisdom tree considering. The universe honors your pause.",
    narratorReversed: "Awakening spirit! The fog of apathy lifts! I see you finally notice the chalice offered!",
    image: tarotCups4Image
  },
  {
    id: 40,
    name: "Five of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Loss, grief, disappointment, and focusing on the negative bring sorrow.",
    reversedMeaning: "Acceptance, moving on, finding peace, and forgiveness heal.",
    uprightGuidance: "Grieve what's lost, but don't miss the cups still standing.",
    reversedGuidance: "You're healing! The past loosens its grip. Turn toward remaining blessings.",
    narratorMessage: "Grieving heart, I honor your sorrow. Yes, cups have spilled - but two remain full. Do you see them?",
    narratorReversed: "Healing soul! You finally turn from what was lost to what remains! The past releases you!",
    image: tarotCups5Image
  },
  {
    id: 41,
    name: "Six of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Nostalgia, childhood memories, innocence, and reunion with past.",
    reversedMeaning: "Living in past, stuck, forgetting past, moving forward.",
    uprightGuidance: "Honor your past but don't live there. Innocence can be reclaimed.",
    reversedGuidance: "Release nostalgia's grip. The present needs you here, now.",
    narratorMessage: "Nostalgic dreamer, I see you visiting memory gardens! The past offers gifts when honored, not inhabited.",
    narratorReversed: "Time-traveler, you've returned to the present! The past is a teacher, not a home. Well done.",
    image: tarotCups6Image
  },
  {
    id: 42,
    name: "Seven of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Choices, fantasy, illusion, wishful thinking, and imagination run wild.",
    reversedMeaning: "Clarity, values alignment, making choices, and avoiding temptation.",
    uprightGuidance: "Many options appear. Look beyond glamour to find true value.",
    reversedGuidance: "Illusions fall away. Choose based on truth, not fantasy.",
    narratorMessage: "Dreamy visionary! Seven chalices float before you, each holding promises! But which are real?",
    narratorReversed: "Clear-sighted chooser! The illusions dissolve! Now you see which cup holds true treasure!",
    image: tarotCups7Image
  },
  {
    id: 43,
    name: "Eight of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Walking away, seeking truth, leaving behind, and spiritual journey.",
    reversedMeaning: "Fear of moving on, avoidance, staying in bad situation.",
    uprightGuidance: "It's time to walk away. Higher ground awaits your climbing.",
    reversedGuidance: "Fear keeps you in what no longer serves. Courage calls you forward.",
    narratorMessage: "Brave wanderer! You turn from the known toward the mountain of unknowing! This is courage!",
    narratorReversed: "Fearful settler, you know you should leave but fear pins your feet. The mountain still waits.",
    image: tarotCups8Image
  },
  {
    id: 44,
    name: "Nine of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Satisfaction, contentment, wishes fulfilled, luxury, and emotional stability.",
    reversedMeaning: "Greed, dissatisfaction, materialism, and seeking deeper meaning.",
    uprightGuidance: "Your wishes manifest! Enjoy this period of satisfaction.",
    reversedGuidance: "Material success feels empty. Seek emotional fulfillment.",
    narratorMessage: "Satisfied soul! The wish-granting card appears! Nine cups overflow with blessings! Enjoy!",
    narratorReversed: "Unfulfilled seeker, you have everything yet feel nothing. The heart wants what gold can't buy.",
    image: tarotCups9Image
  },
  {
    id: 45,
    name: "Ten of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Harmony, happy family, alignment, and divine love create paradise.",
    reversedMeaning: "Disharmony, broken family, disconnection, and misalignment.",
    uprightGuidance: "Emotional fulfillment arrives! Your heart's home is found.",
    reversedGuidance: "Heal family wounds. True home comes from within first.",
    narratorMessage: "Blessed one! I behold the rainbow of divine love arching over your home! Complete joy is yours!",
    narratorReversed: "Fractured family, the rainbow fades as hearts disconnect. Healing must begin with forgiveness.",
    image: tarotCups10Image
  },
  {
    id: 46,
    name: "Page of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Creative opportunities, curiosity, intuitive messages, and new emotions.",
    reversedMeaning: "Emotional immaturity, creative block, insecurity.",
    uprightGuidance: "A message from your heart arrives. Trust your intuitive whispers.",
    reversedGuidance: "Emotional maturity calls. Don't let insecurity block your creativity.",
    narratorMessage: "Sweet messenger! A fish of intuition swims in your cup! What does your heart tell you?",
    narratorReversed: "Insecure youth, you doubt your inner voice. Trust yourself - your intuition is valid.",
    image: tarotCupsPageImage
  },
  {
    id: 47,
    name: "Knight of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Romance, charm, imagination, beauty, and following the heart.",
    reversedMeaning: "Moodiness, unrealistic, jealousy, and overactive imagination.",
    uprightGuidance: "Follow your heart's romantic calling. Let beauty guide you.",
    reversedGuidance: "Distinguish fantasy from reality. Ground your romantic dreams.",
    narratorMessage: "Romantic knight! You ride forth on wings of love and beauty! Your heart leads the way!",
    narratorReversed: "Moody dreamer, fantasy has unseated reality. Come back to earth without losing your dreams.",
    image: tarotCupsKnightImage
  },
  {
    id: 48,
    name: "Queen of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Compassion, calm, comfort, intuition, and emotional security reign.",
    reversedMeaning: "Insecurity, giving too much, needy, and co-dependency.",
    uprightGuidance: "Lead with compassion. Your emotional wisdom heals others.",
    reversedGuidance: "You've depleted yourself caring for others. Restore your own well.",
    narratorMessage: "Compassionate queen! Your emotional wisdom creates sanctuary! You are the safe harbor!",
    narratorReversed: "Depleted nurturer, you've given until empty. The cosmos says: receive before giving more.",
    image: tarotCupsQueenImage
  },
  {
    id: 49,
    name: "King of Cups",
    arcana: 'minor',
    suit: 'cups',
    uprightMeaning: "Emotional balance, diplomacy, compassion, wisdom, and emotional maturity.",
    reversedMeaning: "Manipulation, emotional volatility, moodiness, and repression.",
    uprightGuidance: "Master your emotions without suppressing them. Lead with heart wisdom.",
    reversedGuidance: "Repressed emotions erupt as volatility. Feel to heal.",
    narratorMessage: "Wise king! You rule the emotional realm with maturity and balance! Your court is stable!",
    narratorReversed: "Unstable ruler, suppressed emotions destabilize your kingdom. True strength feels, not represses.",
    image: tarotCupsKingImage
  },

  // MINOR ARCANA - Swords (14 cards)
  {
    id: 50,
    name: "Ace of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Mental clarity, breakthrough, new ideas, truth, and intellectual power.",
    reversedMeaning: "Confusion, chaos, lack of clarity, and misinformation.",
    uprightGuidance: "Truth cuts through illusion. Your mind is sharp and clear.",
    reversedGuidance: "Confusion clouds judgment. Wait for clarity before deciding.",
    narratorMessage: "Truth-bearer! The sword of divine wisdom appears in your grasp! Cut through all illusion!",
    narratorReversed: "Confused thinker, the blade is dull with doubt. Clear your mind before wielding truth.",
    image: tarotSwordsAceImage
  },
  {
    id: 51,
    name: "Two of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Difficult choices, stalemate, avoidance, and denial create impasse.",
    reversedMeaning: "Indecision resolved, truth revealed, overwhelming choices.",
    uprightGuidance: "Remove the blindfold. Face the difficult choice before you.",
    reversedGuidance: "The stalemate breaks! Information arrives to guide your choice.",
    narratorMessage: "Blindfolded seeker, you balance between two truths. The cosmos waits for your decision.",
    narratorReversed: "Seeing clearly now! The blindfold falls! Finally, you can choose with open eyes!",
    image: tarotSwords2Image
  },
  {
    id: 52,
    name: "Three of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Heartbreak, grief, pain, betrayal, and emotional wounds pierce deep.",
    reversedMeaning: "Healing, forgiveness, recovery, and releasing pain begin.",
    uprightGuidance: "Honor your heartbreak. This pain is part of your healing.",
    reversedGuidance: "The worst is over. Your heart begins to mend.",
    narratorMessage: "Wounded heart, I witness your pain. Three swords pierce, but know this: scars make us who we are.",
    narratorReversed: "Healing soul! The swords withdraw! Your heart mends stronger than before!",
    image: tarotSwords3Image
  },
  {
    id: 53,
    name: "Four of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Rest, recovery, meditation, contemplation, and peaceful pause.",
    reversedMeaning: "Exhaustion, restlessness, burnout, and refusal to rest.",
    uprightGuidance: "Rest is not weakness. Restore yourself before continuing.",
    reversedGuidance: "Your body demands rest. Ignoring it leads to collapse.",
    narratorMessage: "Weary warrior, lay down your swords and rest. The universe grants you sanctuary.",
    narratorReversed: "Exhausted fighter, you refuse the rest you desperately need. Burnout serves no cause.",
    image: tarotSwords4Image
  },
  {
    id: 54,
    name: "Five of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Conflict, defeat, winning at all costs, and hollow victory appear.",
    reversedMeaning: "Reconciliation, making amends, past resentment, and moving on.",
    uprightGuidance: "Question if this victory is worth the cost. Some wins are losses.",
    reversedGuidance: "Make amends. Winning at all costs has left you empty.",
    narratorMessage: "Hollow victor, you stand alone with your stolen swords. Was this victory worth the cost?",
    narratorReversed: "Reconciling soul, you realize some battles should never be fought. Wisdom arrives late but arrives.",
    image: tarotSwords5Image
  },
  {
    id: 55,
    name: "Six of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Transition, change, moving forward, and leaving behind troubles.",
    reversedMeaning: "Resistance to change, unfinished business, and unable to move on.",
    uprightGuidance: "You're moving toward calmer waters. Trust this transition.",
    reversedGuidance: "You're stuck in rough waters by choice. Let go and drift toward peace.",
    narratorMessage: "Traveling soul, I see you crossing from storm to calm! Better shores await!",
    narratorReversed: "Stuck traveler, you refuse to board the boat to peace. What holds you in suffering?",
    image: tarotSwords6Image
  },
  {
    id: 56,
    name: "Seven of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Deception, betrayal, strategy, stealth, and getting away with something.",
    reversedMeaning: "Coming clean, rethinking approach, confession.",
    uprightGuidance: "Strategy is smart. Deception has consequences. Choose wisely.",
    reversedGuidance: "The truth emerges. Coming clean brings relief.",
    narratorMessage: "Sneaky one, I see you creeping with stolen swords! Clever, yes - but at what cost to your soul?",
    narratorReversed: "Confessing thief, you return what wasn't yours. The burden lifts! Honesty heals!",
    image: tarotSwords7Image
  },
  {
    id: 57,
    name: "Eight of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Restriction, imprisonment, victim mentality, and self-imposed limitations.",
    reversedMeaning: "Freedom, release, new perspective, and self-acceptance.",
    uprightGuidance: "The bindings are looser than they seem. You have more freedom than you think.",
    reversedGuidance: "You're freeing yourself! The blindfold and ropes were always removable!",
    narratorMessage: "Trapped soul, the swords cage you - but I see gaps! The binds are looser than you believe!",
    narratorReversed: "Liberating spirit! You remove the blindfold and realize - you were free all along!",
    image: tarotSwords8Image
  },
  {
    id: 58,
    name: "Nine of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Anxiety, worry, nightmares, fear, and mental anguish plague you.",
    reversedMeaning: "Hope, reaching out, despair ending, and light at end of tunnel.",
    uprightGuidance: "Your fears are worse than reality. Seek help. You're not alone.",
    reversedGuidance: "The darkest hour passes. Dawn approaches. Hope returns.",
    narratorMessage: "Anxious mind, I see you tormented by thoughts! But know: most fears never manifest. Breathe.",
    narratorReversed: "Recovering warrior! The nightmares end! You reach out and find the help you needed!",
    image: tarotSwords9Image
  },
  {
    id: 59,
    name: "Ten of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Rock bottom, defeat, crisis, ending, and betrayal bring painful conclusion.",
    reversedMeaning: "Recovery, regeneration, resisting end, and refusing to give up.",
    uprightGuidance: "You've hit bottom. The only way now is up. This cycle ends.",
    reversedGuidance: "You're rising from the ashes! The worst is over!",
    narratorMessage: "Defeated one, ten swords mark the end of a painful cycle. But see the dawn? Resurrection comes.",
    narratorReversed: "Phoenix rising! You thought that was your end, but you're being reborn! The worst is over!",
    image: tarotSwords10Image
  },
  {
    id: 60,
    name: "Page of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Curiosity, new ideas, vigilance, communication, and mental energy.",
    reversedMeaning: "Hurtful communication, gossip, lack of planning.",
    uprightGuidance: "Your curious mind discovers new ideas. Communicate them clearly.",
    reversedGuidance: "Words can wound. Think before speaking.",
    narratorMessage: "Curious youth! Your mind races with brilliant ideas! But ensure words build, not destroy!",
    narratorReversed: "Reckless speaker, your words cut deeper than you intended. Apologize and learn.",
    image: tarotSwordsPageImage
  },
  {
    id: 61,
    name: "Knight of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Action, impulsiveness, defending beliefs, direct communication.",
    reversedMeaning: "Impulsive, rude, scattered, lack of direction.",
    uprightGuidance: "Charge forward with your truth! But maintain some diplomacy.",
    reversedGuidance: "Your directness has become cruelty. Soften your approach.",
    narratorMessage: "Charging warrior! You race toward battle with absolute conviction! Admirable, but mind the cliff!",
    narratorReversed: "Reckless rider, speed without direction leads to crashes. Slow down and think.",
    image: tarotSwordsKnightImage
  },
  {
    id: 62,
    name: "Queen of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Independent, clear thinking, direct, perceptive, and unbiased judgment.",
    reversedMeaning: "Cold-hearted, cruel, bitterness, harsh judgment.",
    uprightGuidance: "Speak your truth with clarity and kindness. Your perception is sharp.",
    reversedGuidance: "Wisdom has become harshness. Soften truth with compassion.",
    narratorMessage: "Discerning queen! Your sword cuts through illusion with precision! Your court values truth!",
    narratorReversed: "Bitter ruler, your sharp tongue has isolated you. Truth without love is just cruelty.",
    image: tarotSwordsQueenImage
  },
  {
    id: 63,
    name: "King of Swords",
    arcana: 'minor',
    suit: 'swords',
    uprightMeaning: "Clear thinking, intellectual power, authority, truth, and ethical leadership.",
    reversedMeaning: "Manipulative, tyrannical, abusive power, and cold judgment.",
    uprightGuidance: "Lead with logic and fairness. Your judgment is sound and ethical.",
    reversedGuidance: "Logic without heart becomes tyranny. Balance mind with compassion.",
    narratorMessage: "Wise king! Your realm flourishes under fair, intellectual leadership! Justice prevails!",
    narratorReversed: "Tyrannical mind-king, your logic has lost its heart. Remember: you judge humans, not equations.",
    image: tarotSwordsKingImage
  },

  // MINOR ARCANA - Pentacles (14 cards)
  {
    id: 64,
    name: "Ace of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "New financial opportunity, prosperity, abundance, and manifestation.",
    reversedMeaning: "Lost opportunity, missed chance, bad investment.",
    uprightGuidance: "Seize this material opportunity. The universe provides abundance.",
    reversedGuidance: "Poor timing or bad planning blocks prosperity. Reassess.",
    narratorMessage: "Prosperous one! A golden pentacle appears in your palm! Material blessings manifest!",
    narratorReversed: "Missed fortune, the golden coin slips through your fingers. Next time, grasp it firmly.",
    image: tarotPentaclesAceImage
  },
  {
    id: 65,
    name: "Two of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Balance, adaptability, time management, priorities, and juggling resources.",
    reversedMeaning: "Over-committed, disorganization, financial stress, and imbalance.",
    uprightGuidance: "Keep juggling. Your balance impresses even yourself.",
    reversedGuidance: "You're dropping balls. Simplify before everything falls.",
    narratorMessage: "Skilled juggler! You dance between worlds, balancing it all! The universe applauds your grace!",
    narratorReversed: "Overwhelmed balancer, too many coins in the air! Drop some before you drop all!",
    image: tarotPentacles2Image
  },
  {
    id: 66,
    name: "Three of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Teamwork, collaboration, learning, and implementation bring success.",
    reversedMeaning: "Lack of teamwork, disharmony, poor motivation.",
    uprightGuidance: "Collaboration amplifies success. Your skills shine in teamwork.",
    reversedGuidance: "Team discord sabotages progress. Realign or work solo.",
    narratorMessage: "Master builder! I see you co-creating with skilled allies! Together you build cathedrals!",
    narratorReversed: "Fractured team, your collaboration crumbles. Either mend fences or work alone.",
    image: tarotPentacles3Image
  },
  {
    id: 67,
    name: "Four of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Saving, frugality, security, conservatism, and holding on tightly.",
    reversedMeaning: "Greed, materialism, self-protection to extreme.",
    uprightGuidance: "Security is wise. But don't let fear close your heart and hands.",
    reversedGuidance: "Greed has become your master. Loosen your grip.",
    narratorMessage: "Careful guardian, you protect your resources wisely. But are you hoarding or saving?",
    narratorReversed: "Miser soul, your grip is so tight you strangle your own abundance! Open your hands!",
    image: tarotPentacles4Image
  },
  {
    id: 68,
    name: "Five of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Financial loss, poverty, insecurity, worry, and feeling left out.",
    reversedMeaning: "Recovery, charity, improvement in finances.",
    uprightGuidance: "In hardship, remember: help exists. Ask for it.",
    reversedGuidance: "The worst passes. Assistance arrives. Accept it with grace.",
    narratorMessage: "Struggling soul, you walk in snow past a warm church. Pride or shame? Help waits inside.",
    narratorReversed: "Recovering spirit! You finally enter the church! Help was always there, waiting for you!",
    image: tarotPentacles5Image
  },
  {
    id: 69,
    name: "Six of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Generosity, charity, giving, sharing wealth, and balanced exchange.",
    reversedMeaning: "Strings attached, inequality, debt, and one-sided charity.",
    uprightGuidance: "Give freely. What flows out flows back multiplied.",
    reversedGuidance: "Beware gifts with strings. Ensure exchange is truly balanced.",
    narratorMessage: "Generous benefactor! I witness your open-handed giving! The cosmos multiplies what you share!",
    narratorReversed: "Manipulative giver, your charity has hooks attached. True generosity expects nothing back.",
    image: tarotPentacles6Image
  },
  {
    id: 70,
    name: "Seven of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Long-term view, perseverance, investment, patience, and sustainable results.",
    reversedMeaning: "Lack of long-term vision, limited success, impatience.",
    uprightGuidance: "Seeds planted yield harvest. Continue tending your garden.",
    reversedGuidance: "Impatience sabotages crops. Give investments time to grow.",
    narratorMessage: "Patient farmer, your seeds sprout! Not yet harvest, but growth is visible! Continue tending!",
    narratorReversed: "Impatient gardener, you dig up seeds to check if they're growing! Trust the process!",
    image: tarotPentacles7Image
  },
  {
    id: 71,
    name: "Eight of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Skill development, mastery, dedication, craftsmanship, and detail work.",
    reversedMeaning: "Lack of focus, mediocrity, lack of ambition.",
    uprightGuidance: "Mastery comes through dedicated practice. Keep perfecting your craft.",
    reversedGuidance: "Shortcuts lead to mediocrity. Recommit to excellence.",
    narratorMessage: "Devoted craftsperson! I watch you perfect your art with loving dedication! Mastery is near!",
    narratorReversed: "Distracted apprentice, you seek shortcuts to mastery. None exist. Return to focused work.",
    image: tarotPentacles8Image
  },
  {
    id: 72,
    name: "Nine of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Abundance, luxury, self-sufficiency, success, and financial independence.",
    reversedMeaning: "Financial dependence, reckless spending, superficiality.",
    uprightGuidance: "Enjoy the fruits of your labor. You've earned this luxury.",
    reversedGuidance: "Your independence is threatened. Reassess your spending.",
    narratorMessage: "Prosperous soul! You stand in your garden of abundance! Self-made success is sweet!",
    narratorReversed: "Dependent one, you've lost your self-sufficiency. Rebuild your independence.",
    image: tarotPentacles9Image
  },
  {
    id: 73,
    name: "Ten of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Wealth, inheritance, family, establishment, and long-term success.",
    reversedMeaning: "Financial failure, family disputes, bankruptcy.",
    uprightGuidance: "Generational wealth and wisdom are yours. Build lasting legacy.",
    reversedGuidance: "Family financial discord needs healing. Money isn't worth broken bonds.",
    narratorMessage: "Legacy builder! I see multi-generational wealth and wisdom! Your family tree is blessed!",
    narratorReversed: "Fractured dynasty, money disputes tear family fabric. Remember: relationship over riches.",
    image: tarotPentacles10Image
  },
  {
    id: 74,
    name: "Page of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Manifestation, opportunity, new career, learning, and practical approach.",
    reversedMeaning: "Lack of progress, bad news, poor prospects.",
    uprightGuidance: "A practical opportunity arrives. Approach it with curious diligence.",
    reversedGuidance: "Your approach is too theoretical. Ground ideas in practical action.",
    narratorMessage: "Studious youth! You hold the seed of future prosperity! Plant it with intention!",
    narratorReversed: "Distracted student, dreams without action remain dreams. Apply yourself practically.",
    image: tarotPentaclesPageImage
  },
  {
    id: 75,
    name: "Knight of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Efficiency, routine, conservatism, methodical, and hard work pay off.",
    reversedMeaning: "Laziness, boredom, stuck in rut, perfectionism.",
    uprightGuidance: "Slow and steady wins. Your methodical approach succeeds.",
    reversedGuidance: "Perfectionism has become paralysis. Or laziness masquerades as caution.",
    narratorMessage: "Dependable knight! Slow but unstoppable! Your steady progress builds empires!",
    narratorReversed: "Stuck knight, your horse stands still. Is it perfectionism or fear? Move forward!",
    image: tarotPentaclesKnightImage
  },
  {
    id: 76,
    name: "Queen of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Nurturing, practical, providing, sensible, and down-to-earth wisdom.",
    reversedMeaning: "Materialism, self-care neglect, work-home imbalance.",
    uprightGuidance: "Your practical magic creates abundance. Nurture while providing.",
    reversedGuidance: "You've neglected yourself while caring for all. Self-care is not selfish.",
    narratorMessage: "Abundant mother! Your kingdom is a garden of prosperity! You nurture all you touch!",
    narratorReversed: "Depleted provider, you've given all away. Remember: you can't pour from empty cup.",
    image: tarotPentaclesQueenImage
  },
  {
    id: 77,
    name: "King of Pentacles",
    arcana: 'minor',
    suit: 'pentacles',
    uprightMeaning: "Abundance, prosperity, security, control, and successful leader.",
    reversedMeaning: "Greed, materialism, wasteful, stubborn.",
    uprightGuidance: "Your Midas touch brings prosperity. Lead with practical wisdom.",
    reversedGuidance: "Wealth without wisdom is fleeting. Don't let gold become your god.",
    narratorMessage: "Prosperous king! Your realm flourishes under wise financial leadership! Well done!",
    narratorReversed: "Greedy monarch, you've forgotten: you can't take it with you. Share the wealth.",
    image: tarotPentaclesKingImage
  }
];
