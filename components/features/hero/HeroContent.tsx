import { heroData } from '@/data/hero';
import { HeroCTAs } from '@/components/features/hero/HeroCTAs';

export function HeroContent() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1
        id="hero-heading"
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white text-balance"
      >
        {heroData.title}
      </h1>
      <p className="text-base sm:text-lg text-slate-light leading-relaxed max-w-xl text-pretty">
        {heroData.subtitle}
      </p>
      <HeroCTAs
        ctaPrimary={heroData.ctaPrimary}
        ctaSecondary={heroData.ctaSecondary}
      />
    </div>
  );
}