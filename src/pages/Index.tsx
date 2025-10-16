import { StarField } from '@/components/StarField';
import { HeroSection } from '@/components/HeroSection';
import { TarotSection } from '@/components/TarotSection';
import { ZodiacSection } from '@/components/ZodiacSection';
import { PastLifePortal } from '@/components/PastLifePortal';
import { EnergyAuraScanner } from '@/components/EnergyAuraScanner';
import { CrystalMatchGame } from '@/components/CrystalMatchGame';
import { SoulmateCardDraw } from '@/components/SoulmateCardDraw';
import { NakshatraJourney } from '@/components/NakshatraJourney';
import { OccultTruthDice } from '@/components/OccultTruthDice';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background font-body overflow-x-hidden">
      <StarField />
      <HeroSection />
      <TarotSection />
      <ZodiacSection />
      <PastLifePortal />
      <EnergyAuraScanner />
      <CrystalMatchGame />
      <SoulmateCardDraw />
      <NakshatraJourney />
      <OccultTruthDice />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
