import { HeroSection } from '@/components/features/hero/HeroSection';
import { ValueSection } from '@/components/features/value/ValueSection';
import { ServicesSection } from '@/components/features/services/ServicesSection';
import { ContactSection } from '@/components/features/contact/ContactSection';
import { StructuredData } from '@/components/seo/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main id="main-content">
        <HeroSection />
        <ValueSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}