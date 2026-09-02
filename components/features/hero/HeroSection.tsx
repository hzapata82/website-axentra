import { heroData } from '@/data/hero';
import { HeroContent } from '@/components/features/hero/HeroContent';
import { GpsVisualizer } from '@/components/features/hero/GpsVisualizer';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-navy text-white overflow-hidden"
    >
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-4rem)] py-20 lg:py-24">
        <HeroContent />
        <div className="order-first lg:order-last">
          <GpsVisualizer
            animationUrl={heroData.gpsVisualizer.animationUrl}
            fallbackImage={heroData.gpsVisualizer.fallbackImage}
            altText={heroData.gpsVisualizer.altText}
          />
        </div>
      </div>
    </section>
  );
}