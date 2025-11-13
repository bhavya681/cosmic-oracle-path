import { StarField } from '@/components/StarField';
import { HeroSection } from '@/components/HeroSection';
import { TarotSection } from '@/components/TarotSection';
import { ZodiacSection } from '@/components/ZodiacSection';
import { PastLifePortal } from '@/components/PastLifePortal';
import { NakshatraJourney } from '@/components/NakshatraJourney';
import { Palmistry } from '@/components/Palmistry';
import { SpiritAnimalSummoner } from '@/components/SpiritAnimalSummoner';
import { DreamOracle } from '@/components/DreamOracle';
import { ElementalAlchemy } from '@/components/ElementalAlchemy';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import NumerologySection from '@/components/NumerologySection';
import { MysticExperience } from '@/components/MysticExperience';
import { ContactUs } from '@/components/ContactUs';
import { Footer } from '@/components/Footer';
import { ChineseAstrology } from '@/components/ChineseAstrology';
import { IChing } from '@/components/IChing';
import { PendulumDowsing } from '@/components/PendulumDowsing';
import { AngelCards } from '@/components/AngelCards';
import { CrystalBallScrying } from '@/components/CrystalBallScrying';
import { FengShui } from '@/components/FengShui';
import { KabbalahDivination } from '@/components/KabbalahDivination';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background font-body overflow-x-hidden">
      <StarField />
      <HeroSection />
      <TarotSection />
      {/* <ZodiacSection /> */}
      <PastLifePortal />
      <NumerologySection />
      <NakshatraJourney />
      <MysticExperience />
     
      <ChineseAstrology />
      <IChing />
      <PendulumDowsing />
      <AngelCards />
      
      <CrystalBallScrying />
      <FengShui />
      <KabbalahDivination />
      {/* <SpiritAnimalSummoner /> 
      <DreamOracle />
      <ElementalAlchemy />
       <ServicesSection />  
       <TestimonialsSection /> */}
        <Palmistry />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
